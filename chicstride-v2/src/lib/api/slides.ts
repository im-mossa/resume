// src/lib/api/slides.ts
import { apiClient } from "./client";
import { Slide } from "../../entities/slide";
import { buildPublicImageUrl } from "../utils/images";

export async function getSlides(params: {
    position?: string;
    device?: "mobile" | "desktop";
    country?: string;
    limit?: number;
}): Promise<Slide[]> {
    const { data } = await apiClient.get<{ error: false; data: any[] }>("/slides", {
        params: { position: "home_hero", limit: 10, ...params },
    });
    return (data.data ?? []).map((s) => ({
        id: s.id,
        title: s.title,
        subtitle: s.subtitle,
        image: buildPublicImageUrl(s.image),
        targetType: s.target_type ?? null,
        targetValue: s.target_value ?? null,
        productId: s.product_id ?? null,
        position: s.position,
        sortOrder: s.sort_order ?? null,
        weight: s.weight ?? null,
        metadata: s.metadata ?? undefined,
    }));
}
