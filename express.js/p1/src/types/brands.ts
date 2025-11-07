// src/types/brands.ts
export type BrandRow = {
    id: string;
    name: string;
    slug: string;
};

export type ProductAggRow = {
    id: string;
    min_sort?: number | null;
    min_price?: number | null;
    latest_created?: string | Date | null;
};

export type ProductRow = {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    price?: string | null;
    created_at?: string | Date | null;
    image?: string | null;
};
