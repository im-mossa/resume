// src/routes/product.ts
import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma.js';

const router = Router();
const BASE_URL = process.env.APP_URL ?? 'https://localhost';

// helper: build public URL for stored image path
function buildPublicImageUrl(stored: string | null) {
    if (!stored) return null;
    const s = stored.trim();
    if (!s) return null;
    if (s.startsWith('http://') || s.startsWith('https://')) return s;
    const withoutLeading = s.replace(/^\/+/, '');
    return `${BASE_URL.replace(/\/+$/, '')}/static/${withoutLeading}`;
}

// validate param (either uuid or slug)
const paramsSchema = z.object({
    idOrSlug: z.string().min(1),
});

const productQuerySchema = z.object({
    category: z.string().uuid().optional(),
});

function isUuid(s: string) {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(s);
}

/**
 * GET /api/v1/product/:idOrSlug
 * - :idOrSlug can be product id (UUID) or product slug
 * - optional query param: ?category=<category-uuid>
 *
 * Response:
 * {
 *   error: false,
 *   data: {
 *     product: { ... },
 *     variants: [...],
 *     images: [...],
 *     categories: [...],         // product -> category mappings
 *     breadcrumb: [...] | null   // if category provided (or primary), root->leaf
 *   }
 * }
 */
router.get('/:idOrSlug', async (req, res) => {
    const paramsParse = paramsSchema.safeParse(req.params);
    if (!paramsParse.success) {
        return res.status(400).json({ error: true, code: 'INVALID_PARAM', message: 'Invalid product identifier', details: paramsParse.error.format() });
    }
    const queryParse = productQuerySchema.safeParse(req.query);
    if (!queryParse.success) {
        return res.status(400).json({ error: true, code: 'INVALID_QUERY', details: queryParse.error.format() });
    }

    const { idOrSlug } = paramsParse.data;
    const { category } = queryParse.data;

    const whereClause = isUuid(idOrSlug) ? { id: idOrSlug } : { slug: idOrSlug };

    try {
        // Load product (basic)
        const product = await prisma.products.findFirst({
            where: whereClause,
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                price: true,
                stock: true,
                is_active: true,
                created_at: true,
                updated_at: true,
                primary_category_id: true,
            },
        });

        if (!product) {
            return res.status(404).json({ error: true, code: 'NOT_FOUND', message: 'Product not found' });
        }

        // Load images (all) ordered by sort_order ascending
        const images: Array<any> = await prisma.product_images.findMany({
            where: { product_id: product.id },
            orderBy: [{ sort_order: 'asc' }, { created_at: 'asc' }],
            select: { id: true, image_url: true, alt_text: true, sort_order: true },
        });

        // Load variants
        const variants: Array<any> = await prisma.product_variants.findMany({
            where: { product_id: product.id },
            orderBy: [{ created_at: 'asc' }],
            select: { id: true, sku: true, color: true, size: true, stock: true, created_at: true },
        });

        // Load product -> categories mappings
        const mappings: Array<any> = await prisma.product_categories.findMany({
            where: { product_id: product.id },
            orderBy: [{ is_primary: 'desc' }, { position: 'asc' }],
            select: { category_id: true, is_primary: true, position: true },
        });

        // Map categories details
        const categoryIds = mappings.map(m => m.category_id);
        const categories: Array<any> = categoryIds.length > 0
            ? await prisma.categories.findMany({
                where: { id: { in: categoryIds } },
                select: { id: true, name: true, slug: true, path: true, image_url: true, is_active: true, product_count: true },
            })
            : [];

        // build breadcrumb: priority
        // 1) if category query param provided -> use that (verify membership)
        // 2) else if product.primary_category_id -> use that
        // 3) else if mappings contain a primary (is_primary) -> use that
        // 4) else null
        let chosenCategoryId: string | null = null;
        if (category) {
            // verify membership
            const rel = await prisma.product_categories.findFirst({
                where: { product_id: product.id, category_id: category },
                select: { product_id: true },
            });
            if (!rel) {
                return res.status(400).json({ error: true, code: 'INVALID_CATEGORY', message: 'Product is not in the requested category' });
            }
            chosenCategoryId = category;
        } else if (product.primary_category_id) {
            chosenCategoryId = product.primary_category_id as string;
        } else {
            const primaryMap = mappings.find(m => m.is_primary);
            if (primaryMap) chosenCategoryId = primaryMap.category_id;
        }

        let breadcrumb: Array<{ id: string; name: string; slug: string }> | null = null;
        if (chosenCategoryId) {
            // build breadcrumb using recursive CTE via $queryRaw
            const crumbRows: Array<any> = await prisma.$queryRaw`
        WITH RECURSIVE b AS (
          SELECT id, name, slug, parent_id FROM catalog.categories WHERE id = ${chosenCategoryId}::uuid
          UNION ALL
          SELECT c.id, c.name, c.slug, c.parent_id
          FROM catalog.categories c
          JOIN b ON c.id = b.parent_id
        )
        SELECT id, name, slug FROM b;
      `;
            // crumbRows will be leaf->root; reverse to root->leaf
            breadcrumb = Array.isArray(crumbRows) ? crumbRows.reverse().map((r: any) => ({ id: String(r.id), name: r.name, slug: r.slug })) : null;
        }

        // normalize product for API
        const normalizedProduct = {
            id: String(product.id),
            name: product.name,
            slug: product.slug,
            description: product.description,
            price: product.price !== null && product.price !== undefined ? String(product.price) : null,
            stock: typeof product.stock === 'number' ? product.stock : null,
            is_active: Boolean(product.is_active),
            created_at: product.created_at ?? null,
            updated_at: product.updated_at ?? null,
        };

        const normalizedImages = images.map(img => ({
            id: String(img.id),
            url: buildPublicImageUrl(img.image_url),
            alt_text: img.alt_text ?? null,
            sort_order: typeof img.sort_order === 'number' ? img.sort_order : null,
        }));

        const normalizedVariants = variants.map(v => ({
            id: String(v.id),
            sku: v.sku,
            color: v.color ?? null,
            size: v.size ?? null,
            stock: typeof v.stock === 'number' ? v.stock : null,
            created_at: v.created_at ?? null,
        }));

        const normalizedCategories = categories.map(c => ({
            id: String(c.id),
            name: c.name,
            slug: c.slug,
            path: c.path ?? null,
            image_url: buildPublicImageUrl(c.image_url),
            is_active: Boolean(c.is_active),
            product_count: typeof c.product_count === 'number' ? c.product_count : null,
        }));

        return res.json({
            error: false,
            data: {
                product: normalizedProduct,
                images: normalizedImages,
                variants: normalizedVariants,
                categories: normalizedCategories,
                breadcrumb,
            },
        });
    } catch (err) {
        console.error('GET /api/v1/product/:idOrSlug error', err);
        return res.status(500).json({ error: true, code: 'SERVER_ERROR', message: 'Internal server error' });
    }
});

export default router;
