// src/routes/brands.ts
import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma.js';
import logger from '../logger.js';

const router = Router();

/**
 * GET /api/v1/brands/:slug/products
 * Query: ?page=1&limit=24&sort=manual|price_asc|price_desc|newest
 *
 * Behavior:
 *  - finds brand by slug (catalog.brands)
 *  - returns paginated products for that brand (products.brand_id)
 *  - sort:
 *      manual -> ORDER BY p.sort ASC NULLS LAST, p.created_at DESC
 *      price_asc -> ORDER BY p.price ASC
 *      price_desc -> ORDER BY p.price DESC
 *      newest (default) -> ORDER BY p.created_at DESC
 */
const querySchema = z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().optional().default(24),
    sort: z.string().optional().default('newest'),
});

const paramsSchema = z.object({
    slug: z.string().min(1),
});

router.get('/:slug/products', async (req, res) => {
    const p = paramsSchema.safeParse(req.params);
    if (!p.success) return res.status(400).json({ error: true, code: 'INVALID_PARAM', details: p.error.format() });

    const q = querySchema.safeParse(req.query);
    if (!q.success) return res.status(400).json({ error: true, code: 'INVALID_QUERY', details: q.error.format() });

    const { page, limit, sort } = q.data;
    const offset = (page - 1) * limit;
    const slug = p.data.slug;

    try {
        // find brand
        const brandRow: any[] = await prisma.$queryRaw`
      SELECT id, name, slug FROM catalog.brands WHERE slug = ${slug}
    `;
        const brand = Array.isArray(brandRow) && brandRow.length > 0 ? brandRow[0] : null;
        if (!brand) return res.status(404).json({ error: true, code: 'NOT_FOUND', message: 'Brand not found' });

        // build ordering expression (we will use it in prod_agg)
        // manual -> p.sort ASC, newest -> p.created_at DESC, price asc/desc
        let orderClause = 'MAX(p.created_at) DESC';
        if (sort === 'manual') orderClause = 'MIN(p.sort) ASC NULLS LAST, MAX(p.created_at) DESC';
        else if (sort === 'price_asc') orderClause = 'MIN(p.price) ASC NULLS LAST';
        else if (sort === 'price_desc') orderClause = 'MIN(p.price) DESC NULLS LAST';
        // Note: we use aggregates (MIN/MAX) to allow grouping in prod_agg

        // Step 1: select product ids for this brand with ordering
        const prodAgg: any[] = await prisma.$queryRawUnsafe(`
      SELECT id FROM (
        SELECT p.id,
               MIN(p.sort) AS min_sort,
               MIN(p.price) AS min_price,
               MAX(p.created_at) AS latest_created
        FROM catalog.products p
        WHERE p.brand_id = '${brand.id}'::uuid AND p.is_active = true
        GROUP BY p.id
        ORDER BY ${orderClause}
        LIMIT ${limit} OFFSET ${offset}
      ) t
    `);

        const ids = prodAgg.map((r: any) => r.id);
        let items: any[] = [];

        if (ids.length > 0) {
            // fetch details preserving order of ids
            // Use array_position ordering to keep same order as ids
            const idsList = ids.map((id: string) => `'${id}'`).join(',');
            items = await prisma.$queryRawUnsafe(`
        SELECT p.id, p.name, p.slug, p.description, p.price::text AS price, p.created_at,
          (SELECT image_url FROM catalog.product_images WHERE product_id = p.id ORDER BY sort_order ASC LIMIT 1) AS image
        FROM catalog.products p
        WHERE p.id = ANY(ARRAY[${idsList}]::uuid[])
        ORDER BY array_position(ARRAY[${idsList}]::uuid[], p.id)
      `);
        }

        // total count for brand
        const countRes: any[] = await prisma.$queryRaw`
      SELECT COUNT(*)::text AS total
      FROM catalog.products p
      WHERE p.brand_id = ${brand.id}::uuid AND p.is_active = true
    `;
        const total = parseInt(countRes[0]?.total ?? '0', 10);

        return res.json({
            error: false,
            data: {
                brand: { id: brand.id, name: brand.name, slug: brand.slug },
                items: items.map((it: any) => ({
                    id: String(it.id),
                    name: it.name,
                    slug: it.slug,
                    description: it.description,
                    price: it.price ?? null,
                    created_at: it.created_at ?? null,
                    image: it.image ?? null,
                })),
                meta: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) }
            }
        });
    } catch (err: unknown) {
        logger.error({ err, slug, page, limit, sort }, 'GET /brands/:slug/products failed');
        return res.status(500).json({ error: true, code: 'SERVER_ERROR', message: 'Internal server error' });
    }
});

export default router;
