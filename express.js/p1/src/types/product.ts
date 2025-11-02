// src/types/product.ts
export type ProductImageRow = {
  id: string;
  image_url: string | null;
  alt_text?: string | null;
  sort_order?: number | null;
};

export type ProductVariantRow = {
  id: string;
  sku?: string | null;
  color?: string | null;
  size?: string | null;
  stock?: number | null;
  created_at?: Date | string | null;
};

export type ProductCategoryMapRow = {
  category_id: string;
  is_primary: boolean;
  position?: number | null;
};

export type ProductCategoryRow = {
  id: string;
  name: string;
  slug: string;
  path?: string | null;
  image_url?: string | null;
  is_active: boolean;
  product_count?: number | null;
};

export type BreadcrumbRow = {
  id: string;
  name: string;
  slug: string
};