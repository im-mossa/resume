// src/repositories/brandsRepo.ts
import { prisma } from '../prisma.js';
import type { BrandRow, ProductAggRow, ProductRow } from '../types/brands.js';

/**
 * find brand by slug using Prisma model (typed)
 */
export async function findBrandBySlug(slug: string): Promise<BrandRow | null> {
  // use Prisma model if available
  const p: any = prisma as any;
  if (p.brands && typeof p.brands.findFirst === 'function') {
    const b = await p.brands.findFirst({ where: { slug }, select: { id: true, name: true, slug: true } });
    return b ? { id: String(b.id), name: b.name, slug: b.slug } : null;
  }

  // fallback raw (shouldn't be needed if Prisma schema is correct)
  const rows = await prisma.$queryRaw`SELECT id::text AS id, name, slug FROM catalog.brands WHERE slug = ${slug}` as Array<{ id: string }>;
  return Array.isArray(rows) && rows.length ? rows[0] as BrandRow : null;
}

/**
 * select product ids (and aggregation fields) for this brand according to sort option
 * Returns array of { id, ... }
 */
export async function selectProductIdsForBrand(brandId: string, sort: 'manual' | 'price_asc' | 'price_desc' | 'newest', limit: number, offset: number): Promise<string[]> {
  // We use different parameterized raw queries per sort option to avoid injecting SQL fragments.
  if (sort === 'manual') {
    const rows = await prisma.$queryRaw`
      SELECT id::text AS id FROM (
        SELECT p.id, MIN(p.sort) AS min_sort, MAX(p.created_at) AS latest_created
        FROM catalog.products p
        WHERE p.brand_id = ${brandId}::uuid AND p.is_active = true
        GROUP BY p.id
        ORDER BY MIN(p.sort) ASC NULLS LAST, MAX(p.created_at) DESC
        LIMIT ${limit} OFFSET ${offset}
      ) t;
    ` as Array<{ id: string }>;
    return (rows ?? []).map((r: any) => String(r.id));
  } else if (sort === 'price_asc') {
    const rows = await prisma.$queryRaw`
      SELECT id::text AS id FROM (
        SELECT p.id, MIN(p.price) AS min_price
        FROM catalog.products p
        WHERE p.brand_id = ${brandId}::uuid AND p.is_active = true
        GROUP BY p.id
        ORDER BY MIN(p.price) ASC NULLS LAST
        LIMIT ${limit} OFFSET ${offset}
      ) t;
    ` as Array<{ id: string }>;
    return (rows ?? []).map((r: any) => String(r.id));
  } else if (sort === 'price_desc') {
    const rows = await prisma.$queryRaw`
      SELECT id::text AS id FROM (
        SELECT p.id, MIN(p.price) AS min_price
        FROM catalog.products p
        WHERE p.brand_id = ${brandId}::uuid AND p.is_active = true
        GROUP BY p.id
        ORDER BY MIN(p.price) DESC NULLS LAST
        LIMIT ${limit} OFFSET ${offset}
      ) t;
    ` as Array<{ id: string }>;
    return (rows ?? []).map((r: any) => String(r.id));
  } else {
    // newest
    const rows = await prisma.$queryRaw`
      SELECT id::text AS id FROM (
        SELECT p.id, MAX(p.created_at) AS latest_created
        FROM catalog.products p
        WHERE p.brand_id = ${brandId}::uuid AND p.is_active = true
        GROUP BY p.id
        ORDER BY MAX(p.created_at) DESC
        LIMIT ${limit} OFFSET ${offset}
      ) t;
    ` as Array<{ id: string }>;
    return (rows ?? []).map((r: any) => String(r.id));
  }
}

/**
 * fetch full product rows (details + first image) for a list of ids.
 * We'll use Prisma model-based findMany and then reorder to match ids order.
 */
export async function fetchProductsByIdsOrdered(ids: string[]): Promise<ProductRow[]> {
  if (!ids || ids.length === 0) return [];

  const p: any = prisma as any;
  if (!p.products) throw new Error('Prisma products model not found.');

  const rows = await p.products.findMany({
    where: { id: { in: ids } },
    select: {
      id: true, name: true, slug: true, description: true, price: true, created_at: true,
      product_images: { orderBy: [{ sort_order: 'asc' }], take: 1, select: { image_url: true } }
    }
  });

  const byId = new Map<string, any>();
  rows.forEach((r: any) => {
    byId.set(String(r.id), r);
  });

  // preserve original ids order
  return ids.map(id => {
    const r = byId.get(id);
    return {
      id,
      name: r?.name ?? null,
      slug: r?.slug ?? null,
      description: r?.description ?? null,
      price: r?.price !== undefined && r?.price !== null ? String(r.price) : null,
      created_at: r?.created_at ?? null,
      image: (r?.product_images && r.product_images[0]) ? r.product_images[0].image_url ?? null : null,
    } as ProductRow;
  });
}

/**
 * count total products for brand
 */
export async function countProductsForBrand(brandId: string): Promise<number> {
  const row = await prisma.$queryRaw`
    SELECT COUNT(*)::text AS total
    FROM catalog.products p
    WHERE p.brand_id = ${brandId}::uuid AND p.is_active = true
  ` as Array<{ total: string }>;
  const total = parseInt(row?.[0]?.total ?? '0', 10);
  return Number.isFinite(total) ? total : 0;
}
