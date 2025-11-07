// src/routes/categories.ts
import { Router } from 'express';
import { validateQuery } from '../middlewares/validateQuery.js';
import { treeQuerySchema } from '../schemas/categories.js';
import { getCategoriesTreeHandler } from '../controllers/categoriesController.js';

const router = Router();

/**
 * GET /api/v1/categories/tree
 * Example:
 *   https://localhost/api/v1/categories/tree?include_inactive=false
 *   https://localhost/api/v1/categories/tree
 *
 * Query:
 *   ?include_inactive=false
 *
 * Behavior:
 *  - Returns all categories as a **hierarchical tree structure**
 *    (an array of root nodes, each containing a `children[]` array).
 *
 *  - Query parameters:
 *      include_inactive (boolean, default: false)
 *        → If true, includes inactive categories (`is_active = false`) in the output.
 *
 *  - Sorting:
 *      Nodes at each level are sorted by:
 *        1) `sort_order ASC NULLS LAST`
 *        2) then `name ASC`
 *
 *  - Each node includes the following fields:
 *      { id, name, slug, parent_id, image_url, path, sort_order, product_count, is_active, children }
 *
 *  - `image_url` values are normalized using `buildPublicImageUrl`,
 *    which converts local file paths into full public URLs.
 *
 *  - Defensive behavior:
 *      If a node references a `parent_id` that does not exist in the dataset,
 *      that node is treated as a root node (to prevent data loss in tree construction).
 *
 *  - Read-only operation:
 *      This endpoint performs only `SELECT` queries — no side effects on the database.
 *
 * Notes / Performance:
 *  - For very large trees (thousands of nodes), this endpoint may become heavy.
 *    Consider the following optimizations:
 *      • Use a `max_depth` parameter to limit recursion depth.
 *      • Implement lazy loading (fetch children via AJAX as needed).
 *      • Cache the full tree in a database view or Redis/memory cache.
 *
 *  - For advanced filtering (e.g. returning only categories with `product_count > 0`),
 *    apply such filters in the repository layer.
 */

router.get('/tree', validateQuery(treeQuerySchema), getCategoriesTreeHandler);

export default router;
