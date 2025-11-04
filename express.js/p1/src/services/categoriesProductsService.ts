// src/services/categoriesProductsService.ts
import * as repo from '../repositories/categoriesProductsRepo.js';
import { buildPublicImageUrl } from '../utils/image.js';
import type { ProductItemRow } from '../types/categoriesProducts.js';

export async function listProductsByCategory(categoryId: string, page = 1, limit = 20) {
    const offset = (page - 1) * limit;

    // prefer single-query fetch to get product rows (which also preserves ordering)
    const itemsRaw: ProductItemRow[] = await repo.fetchProductsForCategorySubtree(categoryId, limit, offset);
    const total = await repo.countProductsInCategorySubtree(categoryId);

    // normalize
    const items = itemsRaw.map((it) => ({
        id: String(it.id),
        name: it.name,
        slug: it.slug,
        description: it.description ?? null,
        price: it.price ?? null,
        created_at: it.created_at ?? null,
        image: buildPublicImageUrl(it.image ?? null),
    }));

    return {
        items,
        meta: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) },
    };
}
