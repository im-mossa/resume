// src/repositories/slidesRepo.ts
import { prisma } from '../prisma.js';
import type { SlideRow } from '../types/slides.js';

/**
 * Fetch slides with DB-side targeting filters (country/device) as much as possible.
 * Returns array of raw rows from DB.
 */
export async function fetchSlides(
    position: string,
    device: string | undefined,
    country: string | undefined,
    limit = 10
): Promise<SlideRow[]> {
    // Note: using prisma.$queryRaw tagged template for parameterization (safe)
    const rows = await prisma.$queryRaw`
    SELECT
      id::text AS id,
      title,
      subtitle,
      image_url,
      target_type,
      target_value,
      product_id::text,
      position,
      sort_order,
      weight,
      targeting,
      metadata,
      created_at
    FROM marketing.slides
    WHERE position = ${position}
      AND is_active = true
      AND (start_at IS NULL OR start_at <= now())
      AND (end_at IS NULL OR end_at >= now())
      /* country targeting: if country param provided, require that either
         targeting is null OR targeting->'countries' is null OR the array contains country */
      AND (
        ${country} IS NULL
        OR targeting IS NULL
        OR (targeting->'countries' IS NULL)
        OR (targeting->'countries') ? ${country}
      )
      /* device targeting */
      AND (
        ${device} IS NULL
        OR targeting IS NULL
        OR (targeting->'devices' IS NULL)
        OR (targeting->'devices') ? ${device}
      )
    ORDER BY sort_order ASC NULLS LAST, weight DESC, created_at DESC
    LIMIT ${limit}
  `;

    return rows as SlideRow[];
}
