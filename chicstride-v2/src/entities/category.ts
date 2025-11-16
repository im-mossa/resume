// src/entities/category.ts

export interface Category {
    id: string;
    name: string;
    slug: string;
    parentId?: string | null;
    imageUrl?: string | null;
    path?: string | null;
    sortOrder?: number | null;
    productCount?: number | null;
    isActive: boolean;
    children?: Category[];
}
