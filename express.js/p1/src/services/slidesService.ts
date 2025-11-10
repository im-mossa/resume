// src/services/slidesService.ts
import { fetchSlides } from '../repositories/slidesRepo.js';
import { buildPublicImageUrl } from '../utils/image.js';
import type { SlideDto } from '../types/slides.js';

export async function listSlides(position: string, device?: string, country?: string, limit = 10): Promise<SlideDto[]> {
    const rows = await fetchSlides(position, device, country, limit);

    // If you want to apply extra JS-side targeting (fallback for malformed JSON), do small filter here.
    const filtered = rows.filter(r => {
        if (!r.targeting) return true;
        try {
            const t = typeof r.targeting === 'string' ? JSON.parse(r.targeting) : r.targeting;
            if (country && Array.isArray(t.countries) && t.countries.length > 0 && !t.countries.includes(country)) return false;
            if (device && Array.isArray(t.devices) && t.devices.length > 0 && !t.devices.includes(device)) return false;
            return true;
        } catch {
            return true;
        }
    });

    return filtered.map(r => ({
        id: String(r.id),
        title: r.title ?? null,
        subtitle: r.subtitle ?? null,
        image: buildPublicImageUrl(r.image_url ?? null),
        target_type: r.target_type ?? null,
        target_value: r.target_value ?? null,
        product_id: r.product_id ?? null,
        position: r.position ?? null,
        sort_order: r.sort_order ?? null,
        weight: r.weight ?? null,
        metadata: r.metadata ?? {},
    }));
}
