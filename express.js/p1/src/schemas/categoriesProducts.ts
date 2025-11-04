// src/schemas/categoriesProducts.ts
import { z } from 'zod';
import { uuidRegex } from '../utils/validateUUID.js';

export const paramsSchema = z.object({
    id: z.string().regex(uuidRegex, { message: 'Invalid UUID' }),
});

export const querySchema = z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().optional().default(20),
});
