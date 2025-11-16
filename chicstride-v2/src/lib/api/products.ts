// src/lib/api/products.ts
import { apiClient } from "./client";
import { Product, ProductDetail } from "../../entities/product";
import { buildPublicImageUrl } from "../utils/images";

export async function getProducts(params: {
    page?: number;
    limit?: number;
    search?: string;
    category_id?: string;
    brand?: string; // comma-separated
    sort_by?: "created_at" | "price" | "name";
    order?: "asc" | "desc";
}): Promise<{ items: Product[]; meta: { page: number; limit: number; total: number; totalPages: number } }> {
    const { data } = await apiClient.get("/products", { params });
    const items: Product[] = (data?.data?.items ?? []).map((p: any) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description ?? null,
        price: p.price ?? null,
        createdAt: p.created_at,
        image: buildPublicImageUrl(p.image),
    }));
    const meta = data?.data?.meta ?? { page: 1, limit: 20, total: 0, totalPages: 0 };
    return { items, meta };
}

export async function getProduct(idOrSlug: string, category?: string): Promise<ProductDetail> {
    const { data } = await apiClient.get(`/product/${idOrSlug}`, { params: { category } });
    const pd = data?.data ?? {};
    return {
        id: pd.product.id,
        name: pd.product.name,
        slug: pd.product.slug,
        description: pd.product.description ?? null,
        price: pd.product.price ?? null,
        stock: pd.product.stock,
        isActive: pd.product.is_active,
        createdAt: pd.product.created_at,
        updatedAt: pd.product.updated_at,
        images: (pd.images ?? []).map((img: any) => ({
            id: img.id,
            url: buildPublicImageUrl(img.url),
            altText: img.alt_text ?? null,
            sortOrder: img.sort_order ?? null,
        })),
        variants: (pd.variants ?? []).map((v: any) => ({
            id: v.id,
            sku: v.sku,
            color: v.color ?? null,
            size: v.size ?? null,
            stock: v.stock,
            createdAt: v.created_at,
        })),
        categories: (pd.categories ?? []).map((c: any) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            path: c.path ?? null,
            imageUrl: buildPublicImageUrl(c.image_url),
            isActive: !!c.is_active,
            productCount: c.product_count ?? null,
        })),
        breadcrumb: pd.breadcrumb ?? null,
    };
}
