// src/routes/brands.ts
import { Router } from 'express';
import { paramsSchema, querySchema } from '../schemas/brands.js';
import { validateParams, validateQuery } from '../middlewares/validateQuery.js';
import { getBrandProductsHandler } from '../controllers/brandsController.js';

const router = Router();

/**
 * GET /api/v1/brands/:slug/products
 * Example:
 *   GET https://localhost/api/v1/brands/nazari/products?page=1&limit=24&sort=manual
 *
 * Query parameters:
 *   - page (int, default 1)       : pagination page
 *   - limit (int, default 24)     : items per page
 *   - sort (string, default newest): one of:
 *       • manual      -> order by product.sort ASC NULLS LAST, then created_at DESC
 *       • price_asc   -> order by product.price ASC
 *       • price_desc  -> order by product.price DESC
 *       • newest      -> order by product.created_at DESC
 *
 * Behavior:
 *   1. Find brand by `slug` in `catalog.brands`. If brand not found -> 404.
 *   2. Return a paginated list of products that belong to that brand
 *      (catalog.products.brand_id) and where products are active (is_active = true).
 *   3. For each product return a single "primary" image (the product_images row with lowest sort_order).
 *   4. Respect the `sort` mode for ordering. Use aggregation (MIN/MAX) when needed so grouping
 *      doesn't break ordering semantics for products with multiple rows.
 *   5. Return total count (distinct products) for meta calculation.
 *
 * Response shape:
 * {
 *   error: false,
 *   data: {
 *     brand: { id, name, slug },
 *     items: [
 *       { id, name, slug, description|null, price|null, created_at|null, image|null },
 *       ...
 *     ],
 *     meta: { page, limit, total, totalPages }
 *   }
 * }
 *
 * Errors:
 *   - 400 INVALID_PARAM / INVALID_QUERY  : when slug / query params are invalid (should validate via Zod)
 *   - 404 NOT_FOUND                      : brand slug does not exist
 *   - 500 SERVER_ERROR                   : unexpected server/db error
 *
 * Security & safety:
 *   - All DB values are parameterized (prisma.$queryRaw with template-literals) so user inputs
 *     (slug, limit, offset) are passed as parameters and are safe from SQL injection.
 *   - `sort` is validated/whitelisted to a fixed set of values — never interpolate raw user input
 *     directly into ORDER BY.
 *
 * Performance notes:
 *   - This endpoint can be implemented as a single DB query that returns brand + page of products + total.
 *     Single-query reduces roundtrips and latency (recommended).
 *   - Ensure appropriate DB indexes: at minimum
 *       • catalog.products (brand_id)
 *       • catalog.products (brand_id, created_at)
 *       • catalog.products (brand_id, price)
 *       • catalog.product_images (product_id, sort_order)
 *   - For very large brands / high traffic consider caching the brand product listing or using
 *     Redis / CDN for repeated requests and to reduce DB load.
 *
 * Implementation hints:
 *   - Validate params with a middleware (Zod) and attach parsed values to req (e.g. req.validatedParams/query)
 *     so controllers can assume parsed types and remain thin.
 *   - Keep SQL ordering logic server-side (repo layer) and expose a small service layer to normalize image URLs.
 *   - Return image URLs via a utility that converts stored paths to `APP_URL/static/...`.
 */

router.get('/:slug/products', validateParams(paramsSchema),validateQuery(querySchema), getBrandProductsHandler);

export default router;
