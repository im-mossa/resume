import { z } from 'zod';

export const ItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  image: z.string().url().optional(),
});

export type ItemSchemaType = z.infer<typeof ItemSchema>;