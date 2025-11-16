// src/lib/api/categories.ts
import { apiClient } from "./client";
import { Category } from "../../entities/category";
import { buildPublicImageUrl } from "../utils/images";

export async function getCategoriesTree(includeInactive = false): Promise<Category[]> {
    const { data } = await apiClient.get<{ error: false; data: Category[] }>("/categories/tree", {
        params: { include_inactive: includeInactive },
    });
    const normalize = (node: any): Category => ({
        id: node.id,
        name: node.name,
        slug: node.slug,
        parentId: node.parent_id ?? null,
        imageUrl: buildPublicImageUrl(node.image_url),
        path: node.path ?? null,
        sortOrder: node.sort_order ?? null,
        productCount: node.product_count ?? null,
        isActive: !!node.is_active,
        children: Array.isArray(node.children) ? node.children.map(normalize) : [],
    });
    return (data.data ?? []).map(normalize);
}
