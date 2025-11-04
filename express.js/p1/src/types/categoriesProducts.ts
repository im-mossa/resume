// src/types/categoriesProducts.ts

export type ProductItemRow = {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    price?: string | null;
    created_at?: string | Date | null;
    image?: string | null;
};
