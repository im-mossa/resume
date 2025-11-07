// src/services/brandsService.ts
import * as repo from '../repositories/brandsRepo.js';
import { buildPublicImageUrl } from '../utils/image.js';
import type { ProductRow } from '../types/brands.js';

export async function listProductsByBrand(slug: string, page = 1, limit = 24, sort: 'manual' | 'price_asc' | 'price_desc' | 'newest' = 'newest') {
    const offset = (page - 1) * limit;

    const brand = await repo.findBrandBySlug(slug);
    if (!brand) return { notFound: true };

    const ids = await repo.selectProductIdsForBrand(brand.id, sort, limit, offset);
    const itemsRaw: ProductRow[] = await repo.fetchProductsByIdsOrdered(ids);
    const total = await repo.countProductsForBrand(brand.id);

    // normalize image urls
    const items = itemsRaw.map(it => ({
        id: it.id,
        name: it.name,
        slug: it.slug,
        description: it.description ?? null,
        price: it.price ?? null,
        created_at: it.created_at ?? null,
        image: buildPublicImageUrl(it.image ?? null),
    }));

    return {
        notFound: false,
        brand: { id: brand.id, name: brand.name, slug: brand.slug },
        items,
        meta: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) }
    };
}
