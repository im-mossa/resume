// src/types/category.ts
export type CategoryRow = {
    id: string;
    name: string;
    slug: string;
    parent_id?: string | null;
    image_url?: string | null;
    path?: string | null;
    sort_order?: number | null;
    product_count?: number | null;
    is_active: boolean;
};

export type CategoryNode = CategoryRow & {
    children: CategoryNode[];
};
