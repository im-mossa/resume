// src/types/brands.ts
export type Row = {
  brand_id: string | null;
  brand_name: string | null;
  brand_slug: string | null;
  id: string | null;
  name: string | null;
  product_slug: string | null;
  description: string | null;
  price: string | null;
  created_at: string | null;
  image: string | null;
  total: number | null;
};

export type BrandRow = { id: string; name: string; slug: string };
