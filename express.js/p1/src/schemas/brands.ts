// src/schemas/brands.ts
import { z } from 'zod';

export const paramsSchema = z.object({
    slug: z.string().min(1),
});

export const querySchema = z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().optional().default(24),
    sort: z.enum(['manual', 'price_asc', 'price_desc', 'newest']).optional().default('newest'),
});
