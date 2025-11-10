// src/types/slides.ts
export type SlideRow = {
    id: string;
    title: string | null;
    subtitle: string | null;
    image_url: string | null;
    target_type: string | null;
    target_value: string | null;
    product_id: string | null;
    position: string | null;
    sort_order: number | null;
    weight: number | null;
    targeting: any | null; // jsonb raw
    metadata: any | null;  // jsonb
    created_at?: string | null;
};

export type SlideDto = {
    id: string;
    title: string | null;
    subtitle: string | null;
    image: string | null;         // public URL
    target_type: string | null;
    target_value: string | null;
    product_id: string | null;
    position: string | null;
    sort_order: number | null;
    weight: number | null;
    metadata: any;
};
