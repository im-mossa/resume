// src/routes/categoriesProducts.ts
import { Router } from 'express';
import { validateParams, validateQuery } from '../middlewares/validateQuery.js';
import { paramsSchema, querySchema } from '../schemas/categoriesProducts.js';
import { getCategoryProductsHandler } from '../controllers/categoriesProductsController.js';

const router = Router();

/**
 * GET /api/v1/categories/:id/products
 * Query: ?page=1&limit=20
 * Example:
 *   https://localhost/api/v1/categories/d67a4daf-03f0-4cae-8f80-139bb660e683/products?page=1&limit=20
 *
 * Behavior:
 *  - Path parameter:
 *      :id → UUID of a category (`catalog.categories.id`).
 *        The endpoint returns all products belonging to that category
 *        and its entire subtree (child categories, recursively).
 *
 *  - Query parameters:
 *      page  (int, default: 1)   → Pagination page number (1-based)
 *      limit (int, default: 20)  → Number of products per page
 *
 *  - Logic:
 *    1) Uses a recursive CTE (`WITH RECURSIVE`) to collect all category IDs
 *       in the subtree of the given :id (including itself).
 *    2) Joins `catalog.product_categories` and `catalog.products` to fetch
 *       all active products (`p.is_active = true`) that belong to any of those categories.
 *    3) For ordering, the query uses:
 *         ORDER BY pc.position ASC NULLS LAST, p.created_at DESC
 *       where `pc.position` defines manual ordering in that category.
 *    4) The query applies pagination using LIMIT/OFFSET and returns the
 *       final product list enriched with:
 *         - product details (id, name, slug, description, price, created_at)
 *         - the first image (lowest `sort_order`) from `product_images`
 *
 *  - Response structure:
 *    {
 *      error: false,
 *      data: {
 *        items: [
 *          { id, name, slug, description, price, created_at, image }
 *        ],
 *        meta: { page, limit, total, totalPages }
 *      }
 *    }
 *
 *  - Technical details:
 *    • Uses `prisma.$queryRaw` with parameterized template literals for SQL-injection safety.
 *    • DISTINCT and aggregation are used to avoid duplicate products
 *      when a product appears in multiple subcategories.
 *    • Only products with `is_active = true` are returned.
 *    • If a category or product doesn’t exist, the controller handles the appropriate HTTP error.
 *
 *  - Performance notes:
 *    • Works efficiently for small to medium category trees.
 *      For large catalogs:
 *        - consider caching subtree IDs or using materialized views,
 *        - ensure proper DB indexes exist:
 *            - product_categories(category_id)
 *            - product_categories(product_id, position)
 *            - products(is_active)
 *            - product_images(product_id, sort_order)
 *
 *  - Future extensions:
 *    • Add more filters (e.g., brand, price range, stock availability).
 *    • Add a `sort` parameter (e.g., manual | price_asc | price_desc | newest).
 *    • Add a search term to filter products by name or description.
 */

router.get('/:id/products', validateParams(paramsSchema), validateQuery(querySchema), getCategoryProductsHandler);

export default router;
