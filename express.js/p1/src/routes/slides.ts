// src/routes/slides.ts
import { Router } from 'express';
import { validateQuery } from '../middlewares/validateQuery.js';
import { slidesQuerySchema } from '../schemas/slides.js';
import { getSlidesHandler } from '../controllers/slidesController.js';

const router = Router();

/**
 * GET /api/v1/slides
 *
 * Purpose
 * -------
 * Returns an array of marketing slides for a given "position" (e.g. home hero carousel).
 * Slides are fetched from the `marketing.slides` table, filtered by activation/start/end timestamps,
 * optionally filtered by device and country (simple, JS-side fallback targeting), then ordered and limited.
 *
 * Query parameters
 * ----------------
 * - position (string, default: "home_hero")
 *     Logical slot where the slide is shown (e.g. home_hero, category_banner, mobile_promo).
 * - device (enum: "mobile" | "desktop", optional)
 *     Hint about the client device; used by JS-side targeting fallback to filter slides that declare allowed devices.
 * - country (string, optional)
 *     ISO country code or other region identifier; used by JS-side targeting fallback to filter slides that declare allowed countries.
 * - limit (int, default: 10)
 *     Maximum number of slides to return.
 *
 * Behavior / Implementation notes
 * --------------------------------
 * 1. DB-level selection:
 *    - The route performs a SQL SELECT from marketing.slides with these conditions:
 *        - position = <position>
 *        - is_active = true
 *        - (start_at IS NULL OR start_at <= now())
 *        - (end_at IS NULL OR end_at >= now())
 *    - Results are ordered by sort_order ASC, weight DESC, created_at DESC (as implemented in the code).
 *    - The query is limited by `limit`.
 *
 * 2. JS-side targeting (fallback):
 *    - Each slide has a `targeting` JSONB column (free-form JSON).
 *    - After fetching rows from DB, the server applies a lightweight JS filter that:
 *        - Parses `targeting` if it is a string (try/catch — tolerant to malformed JSON).
 *        - If `targeting.countries` is present and non-empty, only keep slides that include the requested `country`.
 *        - If `targeting.devices` is present and non-empty, only keep slides that include the requested `device`.
 *    - This JS fallback is intentionally permissive: if `targeting` is missing or malformed, the slide is kept.
 *    - Rationale: databases can run complex targeting, but JSONB can be messy; the JS filter is a safe fallback.
 *
 * 3. Image URL normalization:
 *    - `image_url` stored in the DB can be a local path or an absolute URL.
 *    - `buildPublicImageUrl()` is used to convert local storage paths into a public URL (BASE_URL + /static/...)
 *
 * Response shape
 * --------------
 * Returns JSON: { error: false, data: Slide[] }
 * Slide object:
 * {
 *   id: string,
 *   title?: string,
 *   subtitle?: string,
 *   image?: string | null,        // normalized public URL
 *   target_type?: string | null,  // e.g. "product" | "category" | "url"
 *   target_value?: string | null,
 *   product_id?: string | null,
 *   position: string,
 *   sort_order?: number | null,
 *   weight?: number | null,
 *   metadata?: object
 * }
 *
 * Examples
 * --------
 * curl -k "https://localhost/api/v1/slides?position=home_hero&device=mobile&country=IR&limit=5"
 *
 * SQL-equivalent (simplified)
 * ---------------------------
 * SELECT id, title, subtitle, image_url, target_type, target_value, product_id,
 *        position, sort_order, weight, targeting, metadata
 * FROM marketing.slides
 * WHERE position = $1
 *   AND is_active = true
 *   AND (start_at IS NULL OR start_at <= now())
 *   AND (end_at IS NULL OR end_at >= now())
 * ORDER BY sort_order ASC, weight DESC, created_at DESC
 * LIMIT $2;
 *
 * Performance & operational notes
 * -------------------------------
 * - Indexes: ensure `marketing.slides(position)`, `marketing.slides(is_active)` and possibly a partial index
 *   for active time windows exist. If you filter by targeting at DB-level frequently, consider a GIN index on `targeting`.
 * - For heavy targeting logic it's better to move the filtering into SQL (JSONB operators) or create precomputed
 *   views to avoid fetching many rows and filtering in application code.
 * - Caching: slides are typically cacheable. Consider caching by `position` (and device/country if targeting differs).
 *   Use short TTL or cache invalidation when slides change.
 * - Timezones: `start_at` / `end_at` should be `timestamptz` and comparisons rely on DB `now()`. Make sure times are
 *   inserted in UTC or that your business logic accounts for timezone differences.
 * - Validation: the route uses Zod (query schema). Prefer a validateQuery middleware so the controller receives
 *   already-validated `req.validatedQuery`.
 *
 * Security & Safety
 * -----------------
 * - `metadata` and `targeting` can contain free-form JSON. Don't expose sensitive internal IDs/values in the API response.
 * - Rate-limit this endpoint if it's used directly from client apps to prevent abuse.
 *
 * Tests & debugging
 * -----------------
 * - If `rows.length === 0` while DB has slides, inspect `position`, `is_active`, `start_at`/`end_at` and timezone.
 * - Add temporary logs for `rows.length` and `filtered.length` to verify whether DB filtering or JS-side targeting removed items.
 *
 * Extensibility
 * -------------
 * - If you later require complex multi-criteria targeting (audience segments, A/B, experiments), consider:
 *     - Adding explicit columns for common filters (countries, devices) for faster SQL filtering, or
 *     - Building a small targeting-service that precomputes eligible slide IDs per audience and caches them.
 *
 * Implementation tip
 * ------------------
 * Put thin logic in the route: compose a repository -> service -> controller structure.
 * - repository: SQL query (single efficient query)
 * - service: apply JS-side fallback targeting + URL normalization
 * - controller/route: validate inputs and call service, return JSON
 */

router.get('/', validateQuery(slidesQuerySchema), getSlidesHandler);

export default router;
