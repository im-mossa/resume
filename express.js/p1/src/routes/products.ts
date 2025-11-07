// src/routes/products.ts
import { Router } from 'express';
import { validateQuery } from '../middlewares/validateQuery.js';
import { listProductsController } from '../controllers/productsController.js';
import { listProductsQuerySchema } from '../schemas/products.js';

const router = Router();

/**
 * GET /api/v1/products
 * Example:
 *   https://localhost/api/v1/products
 *   https://localhost/api/v1/products?page=1&limit=24&search=hiking&brand=pama,nazari&sort_by=price&order=asc
 *
 * Query parameters:
 *   page      (int, default: 1)                     → Pagination page number (1-based)
 *   limit     (int, default: 20)                    → Number of products per page
 *   search    (string, optional)                    → Case-insensitive substring search applied to name and description
 *   category_id (UUID, optional)                    → Filter products by primary_category_id (or category relationship depending on service logic)
 *   brand     (string, optional)                    → Comma-separated brand slugs or UUIDs (resolved to brand IDs via resolveBrandIds)
 *   sort_by   ('created_at'|'price'|'name', default:'created_at') → Which column to sort by
 *   order     ('asc'|'desc', default: 'desc')       → Sort direction
 *
 * Behavior:
 *  - Returns a paginated list of active products (service defaults to `is_active = true`).
 *  - Supports text search (name, description), simple category filtering, and multi-brand filtering (brand param can be slugs or uuids).
 *  - Sorting is supported by created_at, price, or name; direction via `order`.
 *  - Images: the response includes a single "representative" image per product (the first product_images record ordered by `sort_order`) **via Prisma relation include**.
 *
 * Implementation details (important):
 *  - THIS SERVICE RELIES EXCLUSIVELY ON THE PRISMA `products` MODEL.
 *    There is no raw-SQL fallback. If the Prisma client does not expose a `products`
 *    model (i.e. your Prisma schema does not contain `model products { ... }`),
 *    repository functions will throw an error (`Prisma products model not found.`).
 *  - The code expects a Prisma relation named `product_images` on the `products` model
 *    to fetch the representative image via `.include({ product_images: { orderBy: { sort_order: 'asc' }, take: 1 } })`.
 *  - All database access is performed with Prisma model methods (typed `findMany` / `count`).
 *
 * Response structure:
 *  {
 *    error: false,
 *    data: {
 *      items: [
 *        { id, name, slug, price, description, created_at, image }
 *      ],
 *      meta: { page, limit, total, totalPages }
 *    }
 *  }
 *
 * Security & correctness:
 *  - Prisma model-based queries are typed and parameterized.
 *  - Image paths stored in DB are normalized to public URLs via `buildPublicImageUrl`.
 *
 * Performance notes & recommendations:
 *  - For large catalogs consider:
 *      • Adding database indexes on: products(is_active), products(created_at), product_images(product_id, sort_order), product_categories(category_id).
 *      • Using a dedicated search engine (Elasticsearch/Meilisearch/Typesense) for advanced/super-fast search and faceting.
 *      • Caching heavy queries or frequently viewed pages (Redis / HTTP cache).
 *      • Returning fewer fields on list endpoints (avoid loading full descriptions or large arrays) and fetching full details on product detail endpoints.
 *  - When search is expected to be frequent/complex, move from ILIKE substring searches to full-text search or an external search service.
 *
 * Extensibility (easy next steps):
 *  - Add `sort` presets (e.g., manual, price_asc, price_desc, newest) and expose them to UI.
 *  - Add filters: brand, price_range, in_stock, attributes (color/size), tag, rating.
 *  - Add facets/aggregation for counts per brand/category to support faceted navigation.
 *  - Add `fields` or `include` query param to let clients control payload size (e.g., `?fields=id,name,price,image`).
 *
 * Notes for maintainers:
 *  - Keep the repository and service in sync with your Prisma schema. If you change relation names
 *    (e.g., rename `product_images`), update `src/repositories/productsRepo.ts` accordingly.
 */

router.get('/', validateQuery(listProductsQuerySchema), listProductsController);

export default router;
