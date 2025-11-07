// src/routes/product.ts
import { Router } from 'express';
import { validateParams, validateQuery } from '../middlewares/validateQuery.js';
import { paramsSchema, productQuerySchema } from '../schemas/product.js';
import { getProductHandler } from '../controllers/productController.js';

const router = Router();

/**
 * GET /api/v1/product/:idOrSlug
 * Example:
 *   https://localhost/api/v1/product/00000000-0000-0000-0000-000000000010
 *   https://localhost/api/v1/product/Pama_Darvin_2-G1326
 *   https://localhost/api/v1/product/00000000-0000-0000-0000-000000000010?category=d67a4daf-03f0-4cae-8f80-139bb660e683
 *
 * Path parameter:
 *   :idOrSlug  -> Either a product UUID (`products.id`) OR a product slug (`products.slug`).
 *
 * Query parameters:
 *   category (optional, UUID) -> If provided, the response will validate that the product
 *       belongs to that category and will build a breadcrumb for that category; otherwise,
 *       the product's `primary_category_id` or a `product_categories.is_primary` mapping is used to form the breadcrumb.
 *
 * Behavior:
 *  - Resolves the product by `id` (UUID) or `slug`.
 *  - Loads full product details (id, name, slug, description, price, stock, flags, timestamps).
 *  - Loads **all** product images (ordered by sort_order asc, then created_at asc) and returns them as an array.
 *  - Loads **all** product variants (ordered by created_at asc).
 *  - Loads product -> category mappings (product_categories), then resolves category details for those mappings.
 *  - Builds a breadcrumb (root → leaf) according to priority:
 *      1) If `?category=` is passed and product is a member of that category → use it.
 *      2) Else if product.primary_category_id exists → use it.
 *      3) Else use the mapping marked `is_primary = true`.
 *      4) Else breadcrumb = null.
 *    The breadcrumb is built using a recursive DB query (CTE) for correct parent chain.
 *
 * Response structure:
 *  {
 *    error: false,
 *    data: {
 *      product: { id, name, slug, description, price, stock, is_active, created_at, updated_at },
 *      images: [{ id, url, alt_text, sort_order }, ...],
 *      variants: [{ id, sku, color, size, stock, created_at }, ...],
 *      categories: [{ id, name, slug, path, image_url, is_active, product_count }, ...],
 *      breadcrumb: [{ id, name, slug }, ...] | null
 *    }
 *  }
 *
 * Technical details:
 *  - Uses Prisma models where possible (typed model access). For hierarchical breadcrumb queries,
 *    a parameterized `prisma.$queryRaw` with a recursive CTE is used for efficiency.
 *  - Image paths stored in DB are normalized to public URLs using `buildPublicImageUrl`.
 *  - All DB calls are parameterized to avoid SQL injection.
 *
 * Error handling:
 *  - 400 BAD REQUEST for invalid params or invalid `category` membership.
 *  - 404 NOT FOUND if product does not exist.
 *  - 500 INTERNAL SERVER ERROR for unexpected failures; errors are logged server-side.
 *
 * Performance & scaling notes:
 *  - Loading all images and variants is fine for typical product sizes; if products have dozens/hundreds of images
 *    or variants, consider adding pagination or limiting images returned (e.g., first N + metadata).
 *  - Breadcrumb is computed with a single recursive DB query (efficient), but if category depth is huge or requests are frequent,
 *    consider caching breadcrumbs or materializing category paths.
 *
 * Extensibility:
 *  - Optionally accept extra query params (e.g., fields=..., include=...) to control payload size.
 *  - Optionally return stock availability per variant consolidated by size/color, or include pricing rules/promotions.
 *  - Consider returning `related_products` or `upsell` arrays in the same endpoint if the UI requires it.
 */

router.get('/:idOrSlug', validateParams(paramsSchema), validateQuery(productQuerySchema), getProductHandler);

export default router;
