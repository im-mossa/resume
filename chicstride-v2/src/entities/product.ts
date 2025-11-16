// src/entities/product.ts
export interface Product {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    price: number | null;
    createdAt: string;
    image?: string | null;
}

export interface ProductDetail {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    price: number | null;
    stock: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    images: ProductImage[];
    variants: ProductVariant[];
    categories: Category[];
    breadcrumb: Breadcrumb[] | null;
}

export interface ProductImage {
    id: string;
    url: string;
    altText?: string | null;
    sortOrder?: number | null;
}

export interface ProductVariant {
    id: string;
    sku: string;
    color?: string | null;
    size?: string | null;
    stock: number;
    createdAt: string;
}

export interface Breadcrumb {
    id: string;
    name: string;
    slug: string;
}

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

// src/entities/brand.ts
export interface Brand {
    id: string;
    name: string;
    slug: string;
}

// src/entities/slide.ts
export interface Slide {
    id: string;
    title?: string;
    subtitle?: string;
    image?: string | null;
    targetType?: "product" | "category" | "url" | null;
    targetValue?: string | null;
    productId?: string | null;
    position: string;
    sortOrder?: number | null;
    weight?: number | null;
    metadata?: Record<string, unknown>;
}
