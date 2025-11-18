// src/entities/product.ts
import { Category } from './category';

/**
 * تصویر محصول (مختصر)
 */
export type ProductImage = {
  id: string;
  url: string;
  altText?: string | null;
  sortOrder?: number | null;
};

/**
 * واریانت محصول
 */
export type ProductVariant = {
  id: string;
  sku: string;
  name?: string | null;
  color?: string | null;
  size?: string | null;
  stock: number;
  price?: number | null;
  createdAt?: string;
};

/**
 * مسیر breadcrumb برای نمایش مسیر دسته‌بندی/ناوبری
 */
export type Breadcrumb = {
  id: string;
  name: string;
  slug?: string;
};

/**
 * نمای کلی از محصول برای صفحات لیست (Catalog)
 */
export type Product = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  /** قیمت پایه محصول؛ ممکن است null باشد اگر قیمت مشخص نشده باشد */
  price?: number | null;
  createdAt?: string;
  /** آدرس تصویر اصلی / thumbnail */
  image?: string | null;
  brandId?: string | null;
  categoryId?: string | null;
};

/**
 * جزییات کامل محصول برای صفحه محصول
 */
export type ProductDetail = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price?: number | null;
  stock?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  images: ProductImage[];
  variants: ProductVariant[];
  categories?: Category[];
  breadcrumb?: Breadcrumb[] | null;
  metadata?: Record<string, unknown>;
};
