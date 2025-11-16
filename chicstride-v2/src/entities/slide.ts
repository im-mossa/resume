// src/entities/slide.ts

export interface Slide {
    id: string;
    title?: string;
    subtitle?: string;
    image?: string | null;        // normalized public URL via buildPublicImageUrl
    targetType?: "product" | "category" | "url" | null;
    targetValue?: string | null;  // slug/UUID or URL depending on targetType
    productId?: string | null;
    position: string;             // e.g., "home_hero", "category_banner"
    sortOrder?: number | null;
    weight?: number | null;
    metadata?: Record<string, unknown>;
}
