// src/services/brandsService.ts
import { fetchBrandProductsSingleQuery } from '../repositories/brandsRepo.js';
import { buildPublicImageUrl } from '../utils/image.js';

export async function listProductsByBrand(slug: string, page = 1, limit = 24, sort: 'manual' | 'price_asc' | 'price_desc' | 'newest' = 'newest') {
    const res = await fetchBrandProductsSingleQuery(slug, page, limit, sort);

    // if brand not found, preserve that signal
    if (!res.brand) return { notFound: true };

    const items = (res.items ?? []).map(it => ({
        id: String(it.id),
        name: it.name,
        slug: it.slug,
        description: it.description ?? null,
        price: it.price ?? null,
        created_at: it.created_at ?? null,
        image: buildPublicImageUrl(it.image ?? null),
    }));

    return {
        notFound: false,
        brand: res.brand,
        items,
        meta: { page, limit, total: Number(res.total ?? 0), totalPages: Math.max(1, Math.ceil(Number(res.total ?? 0) / limit)) },
    };
}
