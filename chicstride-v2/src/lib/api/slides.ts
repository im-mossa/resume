// src/lib/api/slides.ts
import { AxiosResponse } from 'axios';
import { apiClient } from './client';
import { Slide, SlideTargetType } from '../../entities/slide';
import { buildPublicImageUrl } from '../utils/images';

type GetSlidesParams = {
  position?: string;
  device?: 'mobile' | 'desktop';
  country?: string;
  limit?: number;
};

type RawSlide = Record<string, unknown>;

function ensureString(v: unknown, fallback = ''): string {
  if (v == null) return fallback;
  return String(v);
}

function ensureNullableString(v: unknown): string | null {
  if (v == null) return null;
  const s = String(v);
  return s === '' ? null : s;
}

function ensureNumberOrNull(v: unknown): number | null {
  if (v == null) return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}

function mapToSlide(raw: RawSlide): Slide {
  const r = raw ?? {};
  const imageRaw = r.image ?? r.image_url ?? null;
  const imageUrl = imageRaw == null ? null : buildPublicImageUrl(String(imageRaw));

  const targetType = (r.target_type ?? r.targetType) as SlideTargetType | undefined;

  return {
    id: ensureString(r.id),
    title: ensureNullableString(r.title ?? r.title_text ?? null),
    subtitle: ensureNullableString(r.subtitle ?? r.subtitle_text ?? null),
    image: imageUrl ?? null,
    targetType: targetType ?? null,
    targetValue: ensureNullableString(r.target_value ?? r.targetValue ?? null),
    productId: ensureNullableString(r.product_id ?? r.productId ?? null),
    position: ensureString(r.position ?? r.pos ?? ''),
    sortOrder: ensureNumberOrNull(r.sort_order ?? r.sortOrder ?? null),
    weight: ensureNumberOrNull(r.weight ?? null),
    metadata: (r.metadata as Record<string, unknown>) ?? undefined,
  };
}

/**
 * دریافت اسلایدها
 * پارامترهای پیش‌فرض: position='home_hero', limit=10
 */
export async function getSlides(params: GetSlidesParams = {}): Promise<Slide[]> {
  try {
    const res: AxiosResponse<{ error?: boolean; data?: unknown[] }> = await apiClient.get(
      '/slides',
      { params: { position: 'home_hero', limit: 10, ...params } }
    );

    const rawArray = Array.isArray(res.data?.data) ? res.data!.data! : [];
    return rawArray.map((s) => mapToSlide(s as RawSlide));
  } catch (err) {
    console.error('getSlides error:', err);
    return [];
  }
}
