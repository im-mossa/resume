// src/schemas/products/listQuery.ts
import { z } from 'zod';
import { uuidRegex } from '../utils/validateUUID.js';

export const listProductsQuerySchema = z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().optional().default(20),
    search: z.string().trim().optional(),
    category_id: z.string().regex(uuidRegex, { message: 'Invalid UUID' }).optional(),
    brand: z.string().trim().optional(),
    sort_by: z.enum(['created_at', 'price', 'name']).optional().default('created_at'),
    order: z.enum(['asc', 'desc']).optional().default('desc'),
});