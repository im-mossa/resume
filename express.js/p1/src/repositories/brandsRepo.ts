// src/repositories/brandsRepo.ts
import { prisma } from '../prisma.js';

type Row = {
  brand_id: string | null;
  brand_name: string | null;
  brand_slug: string | null;
  id: string | null;
  name: string | null;
  product_slug: string | null;
  description: string | null;
  price: string | null;
  created_at: string | null;
  image: string | null;
  total: number | null;
};

type BrandRow = { id: string; name: string; slug: string };

/**
 * Fetch brand + paginated products + total in a single, parameterized query.
 * Safe: uses prisma.$queryRaw with template literals (Prisma parameterizes values).
 */
export async function fetchBrandProductsSingleQuery(
  slug: string,
  page = 1,
  limit = 24,
  sort: 'manual' | 'price_asc' | 'price_desc' | 'newest' = 'newest'
): Promise<{
  brand: { id: string; name: string; slug: string } | null;
  items: Array<{ id: string; name: string; slug: string; description: string | null; price: string | null; created_at: string | null; image: string | null }>;
  total: number;
}> {
  const offset = (page - 1) * limit;

  // Build different query bodies depending on 'sort'. Each uses parameter placeholders via template literal.
  let rows: Row[] = [];

  try {
    if (sort === 'manual') {
      rows = await prisma.$queryRaw`
        WITH brand_row AS (
          SELECT id, name, slug FROM catalog.brands WHERE slug = ${slug}
        ),
        prod_agg AS (
          SELECT p.id,
                 ROW_NUMBER() OVER (ORDER BY MIN(p.sort) ASC NULLS LAST, MAX(p.created_at) DESC) AS rn
          FROM catalog.products p
          WHERE p.brand_id = (SELECT id FROM brand_row)::uuid AND p.is_active = true
          GROUP BY p.id
          ORDER BY MIN(p.sort) ASC NULLS LAST, MAX(p.created_at) DESC
          LIMIT ${limit} OFFSET ${offset}
        ),
        total_cte AS (
          SELECT COUNT(*)::int AS total_count
          FROM catalog.products p
          WHERE p.brand_id = (SELECT id FROM brand_row)::uuid AND p.is_active = true
        )
        SELECT (SELECT id::text FROM brand_row) AS brand_id,
               (SELECT name FROM brand_row) AS brand_name,
               (SELECT slug FROM brand_row) AS brand_slug,
               p.id::text AS id,
               p.name,
               p.slug AS product_slug,
               p.description,
               p.price::text AS price,
               p.created_at,
               (SELECT image_url FROM catalog.product_images WHERE product_id = p.id ORDER BY sort_order ASC LIMIT 1) AS image,
               (SELECT total_count FROM total_cte) AS total
        FROM prod_agg pa
        JOIN catalog.products p ON p.id = pa.id
        ORDER BY pa.rn;
      ` as Row[];
    } else if (sort === 'price_asc') {
      rows = await prisma.$queryRaw`
        WITH brand_row AS (
          SELECT id, name, slug FROM catalog.brands WHERE slug = ${slug}
        ),
        prod_agg AS (
          SELECT p.id,
                 ROW_NUMBER() OVER (ORDER BY MIN(p.price) ASC NULLS LAST) AS rn
          FROM catalog.products p
          WHERE p.brand_id = (SELECT id FROM brand_row)::uuid AND p.is_active = true
          GROUP BY p.id
          ORDER BY MIN(p.price) ASC NULLS LAST
          LIMIT ${limit} OFFSET ${offset}
        ),
        total_cte AS (
          SELECT COUNT(*)::int AS total_count
          FROM catalog.products p
          WHERE p.brand_id = (SELECT id FROM brand_row)::uuid AND p.is_active = true
        )
        SELECT (SELECT id::text FROM brand_row) AS brand_id,
               (SELECT name FROM brand_row) AS brand_name,
               (SELECT slug FROM brand_row) AS brand_slug,
               p.id::text AS id,
               p.name,
               p.slug AS product_slug,
               p.description,
               p.price::text AS price,
               p.created_at,
               (SELECT image_url FROM catalog.product_images WHERE product_id = p.id ORDER BY sort_order ASC LIMIT 1) AS image,
               (SELECT total_count FROM total_cte) AS total
        FROM prod_agg pa
        JOIN catalog.products p ON p.id = pa.id
        ORDER BY pa.rn;
      ` as Row[];
    } else if (sort === 'price_desc') {
      rows = await prisma.$queryRaw`
        WITH brand_row AS (
          SELECT id, name, slug FROM catalog.brands WHERE slug = ${slug}
        ),
        prod_agg AS (
          SELECT p.id,
                 ROW_NUMBER() OVER (ORDER BY MIN(p.price) DESC NULLS LAST) AS rn
          FROM catalog.products p
          WHERE p.brand_id = (SELECT id FROM brand_row)::uuid AND p.is_active = true
          GROUP BY p.id
          ORDER BY MIN(p.price) DESC NULLS LAST
          LIMIT ${limit} OFFSET ${offset}
        ),
        total_cte AS (
          SELECT COUNT(*)::int AS total_count
          FROM catalog.products p
          WHERE p.brand_id = (SELECT id FROM brand_row)::uuid AND p.is_active = true
        )
        SELECT (SELECT id::text FROM brand_row) AS brand_id,
               (SELECT name FROM brand_row) AS brand_name,
               (SELECT slug FROM brand_row) AS brand_slug,
               p.id::text AS id,
               p.name,
               p.slug AS product_slug,
               p.description,
               p.price::text AS price,
               p.created_at,
               (SELECT image_url FROM catalog.product_images WHERE product_id = p.id ORDER BY sort_order ASC LIMIT 1) AS image,
               (SELECT total_count FROM total_cte) AS total
        FROM prod_agg pa
        JOIN catalog.products p ON p.id = pa.id
        ORDER BY pa.rn;
      ` as Row[];
    } else {
      // newest
      rows = await prisma.$queryRaw`
        WITH brand_row AS (
          SELECT id, name, slug FROM catalog.brands WHERE slug = ${slug}
        ),
        prod_agg AS (
          SELECT p.id,
                 ROW_NUMBER() OVER (ORDER BY MAX(p.created_at) DESC) AS rn
          FROM catalog.products p
          WHERE p.brand_id = (SELECT id FROM brand_row)::uuid AND p.is_active = true
          GROUP BY p.id
          ORDER BY MAX(p.created_at) DESC
          LIMIT ${limit} OFFSET ${offset}
        ),
        total_cte AS (
          SELECT COUNT(*)::int AS total_count
          FROM catalog.products p
          WHERE p.brand_id = (SELECT id FROM brand_row)::uuid AND p.is_active = true
        )
        SELECT (SELECT id::text FROM brand_row) AS brand_id,
               (SELECT name FROM brand_row) AS brand_name,
               (SELECT slug FROM brand_row) AS brand_slug,
               p.id::text AS id,
               p.name,
               p.slug AS product_slug,
               p.description,
               p.price::text AS price,
               p.created_at,
               (SELECT image_url FROM catalog.product_images WHERE product_id = p.id ORDER BY sort_order ASC LIMIT 1) AS image,
               (SELECT total_count FROM total_cte) AS total
        FROM prod_agg pa
        JOIN catalog.products p ON p.id = pa.id
        ORDER BY pa.rn;
      ` as Row[];
    }
  } catch (err) {
    // If the SQL fails, rethrow to let higher layer log/handle
    throw err;
  }

  // If no rows returned, check whether brand exists at all
  if (!rows || rows.length === 0) {
    const brandCheck = await prisma.$queryRaw`
      SELECT id::text AS id, name, slug FROM catalog.brands WHERE slug = ${slug}
    ` as BrandRow[];

    if (!brandCheck || brandCheck.length === 0) {
      return { brand: null, items: [], total: 0 };
    }

    return { brand: { id: brandCheck[0].id, name: brandCheck[0].name, slug: brandCheck[0].slug }, items: [], total: 0 };
  }

  // Extract brand info and total from first row
  const first = rows[0];
  const brand = first.brand_id ? { id: first.brand_id, name: first.brand_name ?? '', slug: first.brand_slug ?? '' } : null;
  const total = Number(first.total ?? 0);

  // Build items (filter null ids)
  const items = rows
    .filter(r => r.id != null)
    .map(r => ({
      id: String(r.id),
      name: r.name ?? '',
      slug: r.product_slug ?? '',
      description: r.description ?? null,
      price: r.price ?? null,
      created_at: r.created_at ?? null,
      image: r.image ?? null,
    }));

  return { brand, items, total };
}
