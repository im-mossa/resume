// src/repositories/categoriesRepo.ts
import { prisma } from '../prisma.js';
import type { CategoryRow } from '../types/category.js';

export async function fetchAllCategories(includeInactive = false): Promise<CategoryRow[]> {
  const where = includeInactive ? undefined : { is_active: true };

  const rows = await prisma.categories.findMany({
    where,
    orderBy: [
      { sort_order: 'asc' }, // NULLS LAST behavior depends on DB; prisma maps to ORDER BY sort_order ASC
      { name: 'asc' }
    ],
    select: {
      id: true,
      name: true,
      slug: true,
      parent_id: true,
      image_url: true,
      path: true,
      sort_order: true,
      product_count: true,
      is_active: true,
    },
  });

  // ensure id is string etc. (Prisma usually returns string for uuid)
  return (rows ?? []).map(r => ({
    id: String(r.id),
    name: r.name,
    slug: r.slug,
    parent_id: r.parent_id ?? null,
    image_url: r.image_url ?? null,
    path: r.path ?? null,
    sort_order: r.sort_order ?? null,
    product_count: typeof r.product_count === 'number' ? r.product_count : null,
    is_active: Boolean(r.is_active),
  }));
}
