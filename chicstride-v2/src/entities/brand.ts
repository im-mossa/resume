// src/entities/brand.ts

export type Brand = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  metadata?: Record<string, unknown>;
};
