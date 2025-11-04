// src/repositories/categoriesProductsRepo.ts
import { prisma } from '../prisma.js';
import type { ProductItemRow } from '../types/categoriesProducts.js';

/**
 * Step B: get full product rows for the selection, preserving ordering
 * We'll re-run the same selection inside a CTE and then join to get image.
 */
export async function fetchProductsForCategorySubtree(categoryId: string, limit: number, offset: number): Promise<ProductItemRow[]> {
    const rows = await prisma.$queryRaw`
    WITH RECURSIVE cats AS (
      SELECT id FROM catalog.categories WHERE id = ${categoryId}::uuid
      UNION ALL
      SELECT c2.id FROM catalog.categories c2 JOIN cats p2 ON c2.parent_id = p2.id
    ),
    selected_agg AS (
      SELECT p.id, MIN(pc.position) AS min_pos, MAX(p.created_at) AS latest_created
      FROM catalog.products p
      JOIN catalog.product_categories pc ON pc.product_id = p.id
      JOIN cats subtree ON pc.category_id = subtree.id
      WHERE p.is_active = true
      GROUP BY p.id
      ORDER BY min_pos ASC NULLS LAST, latest_created DESC
      LIMIT ${limit} OFFSET ${offset}
    )
    SELECT p.id::text AS id,
           p.name,
           p.slug,
           p.description,
           p.price::text AS price,
           p.created_at,
           (SELECT image_url FROM catalog.product_images WHERE product_id = p.id ORDER BY sort_order ASC LIMIT 1) AS image,
           sa.min_pos,
           sa.latest_created
    FROM selected_agg sa
    JOIN catalog.products p ON p.id = sa.id
    ORDER BY sa.min_pos ASC NULLS LAST, sa.latest_created DESC;
  ` as Array<ProductItemRow & { min_pos?: number | null; latest_created?: string | Date | null }>;

    // map to ProductItemRow shape (strip min_pos/latest_created)
    return (rows ?? []).map(r => ({
        id: String(r.id),
        name: r.name,
        slug: r.slug,
        description: r.description ?? null,
        price: r.price ?? null,
        created_at: r.created_at ?? null,
        image: r.image ?? null,
    }));
}

/**
 * Count distinct products in subtree
 */
export async function countProductsInCategorySubtree(categoryId: string): Promise<number> {
    const res = await prisma.$queryRaw`
    WITH RECURSIVE cats AS (
      SELECT id FROM catalog.categories WHERE id = ${categoryId}::uuid
      UNION ALL
      SELECT c.id FROM catalog.categories c JOIN cats p ON c.parent_id = p.id
    )
    SELECT COUNT(DISTINCT p.id)::text as total
    FROM catalog.products p
    JOIN catalog.product_categories pc ON pc.product_id = p.id
    JOIN cats ON pc.category_id = cats.id
    WHERE p.is_active = true
  ` as Array<{ total: string }>;

    const total = parseInt(res?.[0]?.total ?? '0', 10);
    return Number.isFinite(total) ? total : 0;
}
