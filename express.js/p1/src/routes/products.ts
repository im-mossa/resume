// src/routes/products.ts
import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma.js';
import { resolveBrandIds } from '../lib/brandFilter.js';

const router = Router();

const querySchema = z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().optional().default(20),
    search: z.string().trim().optional(),
    category_id: z.string().uuid().optional(),
    brand: z.string().trim().optional(), // comma separated slugs or uuids
    sort_by: z.enum(['createdAt', 'price', 'name']).optional().default('createdAt'),
    order: z.enum(['asc', 'desc']).optional().default('desc'),
});

const BASE_URL = process.env.APP_URL ?? 'https://localhost';

function buildPublicImageUrl(stored: string | null) {
    if (!stored) return null;
    const s = stored.trim();
    if (!s) return null;
    if (s.startsWith('http://') || s.startsWith('https://')) return s;
    const withoutLeading = s.replace(/^\/+/, '');
    return `${BASE_URL.replace(/\/+$/, '')}/static/${withoutLeading}`;
}

function detectPrismaProductModel(prismaAny: any) {
    const candidates = ['product', 'products', 'Product', 'Products'];
    for (const c of candidates) {
        if (prismaAny[c]) return { modelName: c, model: prismaAny[c] };
    }
    return null;
}

router.get('/', async (req, res) => {
    const parsed = querySchema.safeParse(req.query);
    if (!parsed.success) {
        return res.status(400).json({ error: true, code: 'INVALID_QUERY', message: 'Invalid query', details: parsed.error.format() });
    }
    const { page, limit, search, category_id, brand, sort_by, order } = parsed.data;
    const skip = (page - 1) * limit;

    const prismaAny = prisma as any;

    try {
        // resolve brand param (slugs or uuids) -> array of brand UUIDs
        const brandIds = await resolveBrandIds(prisma, brand);

        // Build Prisma-compatible where object
        const wherePrisma: any = { is_active: true }; // only active products by default
        if (search) {
            wherePrisma.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (category_id) {
            // support both possible field namings
            wherePrisma.category_id = category_id;
            wherePrisma.categoryId = category_id;
        }
        if (brandIds.length > 0) {
            wherePrisma.brand_id = { in: brandIds };
            wherePrisma.brandId = { in: brandIds };
        }

        // Try Prisma model-based query if product model exists
        const detected = detectPrismaProductModel(prismaAny);

        if (detected) {
            const model = detected.model;
            // common image relation candidates (pick the first that works)
            const imageRelationCandidates = ['product_images', 'productImages', 'images', 'product_images'];

            // build orderBy for Prisma (try to map sort_by to model fields)
            const orderDir = order.toLowerCase() === 'asc' ? 'asc' : 'desc';
            const orderByPrisma: any = (sort_by === 'createdAt') ? { createdAt: orderDir } : { [sort_by]: orderDir };

            for (const rel of imageRelationCandidates) {
                try {
                    const items = await model.findMany({
                        where: wherePrisma,
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                            price: true,
                            description: true,
                            createdAt: true,
                            // If the relation doesn't exist Prisma will throw before returning
                            [rel]: { select: { image_url: true }, orderBy: [{ sort_order: 'asc' }], take: 1 } as any,
                        } as any,
                        orderBy: orderByPrisma,
                        take: limit,
                        skip,
                    });

                    const total = await model.count({ where: wherePrisma });

                    // Normalize output
                    const normalized = items.map((it: any) => {
                        // extract image if relation present
                        let img: string | null = null;
                        if (it && rel in it && Array.isArray(it[rel]) && it[rel].length > 0) {
                            img = it[rel][0]?.image_url ?? null;
                        }
                        // remove relation props to keep response clean
                        if (it && rel in it) {
                            try { delete it[rel]; } catch (e) { /* ignore */ }
                        }
                        return {
                            id: String(it.id),
                            name: it.name,
                            slug: it.slug,
                            price: it.price !== undefined && it.price !== null ? String(it.price) : null,
                            description: it.description,
                            created_at: it.createdAt ?? it.created_at ?? null,
                            image: buildPublicImageUrl(img),
                        };
                    });

                    return res.json({
                        error: false,
                        data: { items: normalized, meta: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) } },
                    });
                } catch (e) {
                    // include failed (relation might not exist) — try next candidate
                    // continue loop
                }
            }

            // If Prisma model exists but none of the relation candidates worked,
            // fall back to a model-only findMany without include (still using Prisma)
            try {
                const items = await model.findMany({
                    where: wherePrisma,
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        price: true,
                        description: true,
                        createdAt: true,
                    },
                    orderBy: orderByPrisma,
                    take: limit,
                    skip,
                });
                const total = await model.count({ where: wherePrisma });

                const normalized = items.map((it: any) => ({
                    id: String(it.id),
                    name: it.name,
                    slug: it.slug,
                    price: it.price !== undefined && it.price !== null ? String(it.price) : null,
                    description: it.description,
                    created_at: it.createdAt ?? it.created_at ?? null,
                    image: null,
                }));

                return res.json({
                    error: false,
                    data: { items: normalized, meta: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) } },
                });
            } catch (e) {
                // fallback to raw SQL below
            }
        }

        // === Fallback: raw SQL (also supports brand filter via brandIds) ===
        const whereClauses: string[] = [];
        const params: any[] = [];

        if (search) {
            params.push(`%${search}%`);
            const idx = params.length;
            whereClauses.push(`(p.name ILIKE $${idx} OR p.description ILIKE $${idx})`);
        }
        if (category_id) {
            params.push(category_id);
            const idx = params.length;
            whereClauses.push(`p.category_id::text = $${idx}`);
        }
        if (brandIds.length > 0) {
            params.push(brandIds);
            const idx = params.length;
            whereClauses.push(`p.brand_id = ANY($${idx}::uuid[])`);
        }

        const whereSql = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';
        const sortColumn = sort_by === 'price' ? 'p.price' : sort_by === 'name' ? 'p.name' : 'p.created_at';
        const orderSql = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

        const itemsSql = `
      SELECT
        p.id::text AS id,
        p.name,
        p.slug,
        p.price::text AS price,
        p.description,
        p.created_at,
        img.image_url
      FROM catalog.products p
      LEFT JOIN LATERAL (
        SELECT pi.image_url
        FROM catalog.product_images pi
        WHERE pi.product_id = p.id AND pi.sort_order = 0
        ORDER BY pi.sort_order ASC
        LIMIT 1
      ) img ON true
      ${whereSql}
      ORDER BY ${sortColumn} ${orderSql}
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;
        params.push(limit);
        params.push(skip);

        const itemsRaw: any[] = await prisma.$queryRawUnsafe(itemsSql, ...params);

        const countSql = `SELECT COUNT(*)::int as cnt FROM catalog.products p ${whereSql}`;
        const countParams = params.slice(0, params.length - 2);
        const countRes: any[] = await prisma.$queryRawUnsafe(countSql, ...countParams);
        const total = parseInt(countRes[0]?.cnt ?? '0', 10);

        const items = itemsRaw.map((r) => ({
            id: r.id,
            name: r.name,
            slug: r.slug,
            price: r.price,
            description: r.description,
            created_at: r.created_at,
            image: buildPublicImageUrl(r.image_url),
        }));

        return res.json({
            error: false,
            data: { items, meta: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) } },
        });
    } catch (err) {
        console.error('GET /api/v1/products error', err);
        return res.status(500).json({ error: true, code: 'SERVER_ERROR', message: 'Internal server error' });
    }
});

export default router;
