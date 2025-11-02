// src/schemas/product.ts
import { z } from 'zod';
import { uuidRegex } from '../utils/validateUUID.js';


export const paramsSchema = z.object({
    idOrSlug: z.string().min(1),
});

export const productQuerySchema = z.object({
    category: z.string().regex(uuidRegex, { message: 'Invalid UUID' }).optional(),
});
