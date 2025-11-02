// src/services/productsService.ts
import { resolveBrandIds } from './brandFilter.js';
import { buildPublicImageUrl } from '../utils/image.js';
import { findProducts, countProducts } from '../repositories/productsRepo.js';

export type ListProductsParams = {
    page?: number;
    limit?: number;
    search?: string | undefined;
    category_id?: string | undefined;
    brand?: string | undefined; // comma separated slugs or uuids
    sort_by?: 'created_at' | 'price' | 'name';
    order?: 'asc' | 'desc';
};

export async function listProducts(params: ListProductsParams): Promise<{
    items: any[];
    meta: { page: number; limit: number; total: number; totalPages: number };
}> {
    try {
        const page = params.page ?? 1;
        const limit = params.limit ?? 20;
        const skip = (page - 1) * limit;
        const { search, category_id, brand, sort_by = 'created_at', order = 'desc' } = params;

        // resolve brand slugs -> ids (keeps prisma dependency inside service level)
        const brandIds = await resolveBrandIds((await import('../prisma.js')).prisma, brand);

        // build where for Prisma
        const wherePrisma: any = { is_active: true };
        if (search) {
            wherePrisma.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (category_id) {
            wherePrisma.primary_category_id = category_id;
        }
        if (brandIds.length > 0) {
            wherePrisma.brand_id = { in: brandIds };
        }

        // build order
        const orderDir = order === 'asc' ? 'asc' : 'desc';
        const orderBy: any =
            sort_by === 'price' ? { price: orderDir } : sort_by === 'name' ? { name: orderDir } : { created_at: orderDir };

        // call repository
        const itemsRaw = await findProducts(wherePrisma, { skip, take: limit, orderBy });
        const total = await countProducts(wherePrisma);

        const normalized = itemsRaw.map((it: any) => {
            const img = it.product_images?.[0]?.image_url ?? null;
            return {
                id: String(it.id),
                name: it.name,
                slug: it.slug,
                price: it.price !== undefined && it.price !== null ? String(it.price) : null,
                description: it.description,
                created_at: it.created_at ?? null,
                image: buildPublicImageUrl(img),
            };
        });

        return {
            items: normalized,
            meta: { page, limit, total: Number(total ?? 0), totalPages: Math.max(1, Math.ceil(Number(total ?? 0) / limit)) },
        };
    } catch (err) {
        console.error('productsService.listProducts error:', err);
        throw err instanceof Error ? err : new Error('Failed to list products');
    }
}
