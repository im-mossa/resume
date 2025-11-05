// src/schemas/categories.ts
import { z } from 'zod';

export const treeQuerySchema = z.object({
    include_inactive: z.coerce.boolean().optional().default(false),
});
