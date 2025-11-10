// src/schemas/slides.ts
import { z } from 'zod';

export const slidesQuerySchema = z.object({
    position: z.string().optional().default('home_hero'),
    device: z.enum(['mobile', 'desktop']).optional(),
    country: z.string().optional(),
    limit: z.coerce.number().int().positive().optional().default(10),
});
