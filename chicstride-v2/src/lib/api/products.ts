// src/lib/api/products.ts
import { AxiosResponse } from 'axios';
import { apiClient } from './client';
import { Product, ProductDetail, ProductImage, ProductVariant } from '../../entities/product';
import { Category } from '../../entities/category';
import { buildPublicImageUrl } from '../utils/images';

/** پارامترهای تابع getProducts */
export type GetProductsParams = {
  page?: number;
  limit?: number;
  search?: string;
  category_id?: string;
  brand?: string;
  sort_by?: 'created_at' | 'price' | 'name';
  order?: 'asc' | 'desc';
};

/** کمکی‌های نوع‌ایمنی */
function ensureString(v: unknown, fallback = ''): string {
  if (v == null) return fallback;
  return String(v);
}

function ensureNumber(v: unknown, fallback = 0): number {
  if (v == null) return fallback;
  const n = Number(v);
  return Number.isNaN(n) ? fallback : n;
}

function ensureImageUrl(v: unknown): string | undefined {
  if (v == null) return undefined;
  const url = buildPublicImageUrl(String(v));
  return url == null ? undefined : String(url);
}

/** mappers (ورودی unknown، داخل تبدیل به Record) */
function mapToProduct(raw: unknown): Product {
  const r = (raw ?? {}) as Record<string, unknown>;
  return {
    id: ensureString(r.id),
    name: ensureString(r.name),
    slug: ensureString(r.slug ?? r.code ?? ''),
    description: r.description == null ? undefined : String(r.description),
    price:
      r.price == null ? undefined : Number.isNaN(Number(r.price)) ? undefined : Number(r.price),
    createdAt: ensureString(r.created_at ?? r.createdAt ?? ''),
    image: ensureImageUrl(r.image ?? r.image_url),
  };
}

function mapToProductImage(raw: unknown): ProductImage {
  const r = (raw ?? {}) as Record<string, unknown>;
  const url = r.url ?? r.path ?? r.image ?? r.image_url ?? null;
  return {
    id: ensureString(r.id),
    url: ensureString(ensureImageUrl(url) ?? ''),
    altText: r.alt_text == null ? undefined : String(r.alt_text),
    sortOrder:
      r.sort_order == null
        ? undefined
        : Number.isNaN(Number(r.sort_order))
          ? undefined
          : Number(r.sort_order),
  };
}

function mapToProductVariant(raw: unknown): ProductVariant {
  const r = (raw ?? {}) as Record<string, unknown>;
  return {
    id: ensureString(r.id),
    sku: ensureString(r.sku ?? r.code ?? ''),
    name: r.name == null ? undefined : String(r.name),
    color: r.color == null ? undefined : String(r.color),
    size: r.size == null ? undefined : String(r.size),
    stock: r.stock == null ? 0 : Number.isNaN(Number(r.stock)) ? 0 : Number(r.stock),
    price:
      r.price == null ? undefined : Number.isNaN(Number(r.price)) ? undefined : Number(r.price),
    createdAt: r.created_at == null ? undefined : String(r.created_at),
  };
}

function mapRawCategoryToCategory(raw: unknown): Category {
  const r = (raw ?? {}) as Record<string, unknown>;
  return {
    id: ensureString(r.id),
    name: ensureString(r.name),
    slug: ensureString(r.slug ?? r.code ?? ''),
    parentId:
      r.parent_id == null && r.parentId == null
        ? undefined
        : ensureString(r.parent_id ?? r.parentId ?? ''),
    imageUrl: ensureImageUrl(r.image_url ?? r.image) ?? undefined,
    path: r.path == null ? undefined : String(r.path),
    sortOrder:
      r.sort_order == null
        ? undefined
        : Number.isNaN(Number(r.sort_order))
          ? undefined
          : Number(r.sort_order),
    productCount:
      r.product_count == null
        ? undefined
        : Number.isNaN(Number(r.product_count))
          ? undefined
          : Number(r.product_count),
    isActive: r.is_active == null ? undefined : Boolean(r.is_active),
    children: Array.isArray(r.children)
      ? (r.children as unknown[]).map(mapRawCategoryToCategory)
      : undefined,
  };
}

/** دریافت لیست محصولات با صفحه‌بندی */
export async function getProducts(params: GetProductsParams = {}): Promise<{
  items: Product[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}> {
  try {
    const res: AxiosResponse = await apiClient.get('/products', { params });
    const payload = (res.data?.data ?? {}) as unknown;

    const payloadRecord = (payload as Record<string, unknown>) ?? {};
    const metaCandidate = (payloadRecord['meta'] ?? payloadRecord) as Record<string, unknown>;

    const rawItems = Array.isArray(payloadRecord['items'])
      ? (payloadRecord['items'] as unknown[])
      : Array.isArray(payload)
        ? (payload as unknown[])
        : [];
    const items = rawItems.map(mapToProduct);

    const page = ensureNumber(metaCandidate['page'] ?? params.page ?? 1, 1);
    const limit = ensureNumber(metaCandidate['limit'] ?? params.limit ?? 20, 20);
    const total = ensureNumber(metaCandidate['total'] ?? 0, 0);
    const totalPages = ensureNumber(
      metaCandidate['totalPages'] ??
        metaCandidate['total_pages'] ??
        Math.ceil(total / (limit || 1)),
      Math.ceil(total / (limit || 1))
    );

    return { items, meta: { page, limit, total, totalPages } };
  } catch (err) {
    console.error('getProducts error:', err);
    return { items: [], meta: { page: 1, limit: params.limit ?? 20, total: 0, totalPages: 0 } };
  }
}

/** دریافت جزئیات یک محصول بر اساس id یا slug */
export async function getProduct(idOrSlug: string, category?: string): Promise<ProductDetail> {
  const encoded = encodeURIComponent(idOrSlug);
  const res: AxiosResponse = await apiClient.get(`/product/${encoded}`, {
    params: { category },
  });
  const pd = (res.data?.data ?? {}) as Record<string, unknown>;

  const productRaw = (pd['product'] ?? {}) as Record<string, unknown>;
  const imagesRaw = Array.isArray(pd['images']) ? (pd['images'] as unknown[]) : [];
  const variantsRaw = Array.isArray(pd['variants']) ? (pd['variants'] as unknown[]) : [];
  const categoriesRaw = Array.isArray(pd['categories']) ? (pd['categories'] as unknown[]) : [];
  const breadcrumbRaw = Array.isArray(pd['breadcrumb'])
    ? (pd['breadcrumb'] as unknown[])
    : undefined;

  const productDetail: ProductDetail = {
    id: ensureString(productRaw['id']),
    name: ensureString(productRaw['name']),
    slug: ensureString(productRaw['slug'] ?? productRaw['code'] ?? productRaw['id'] ?? ''),
    description: productRaw['description'] == null ? undefined : String(productRaw['description']),
    price:
      productRaw['price'] == null
        ? undefined
        : Number.isNaN(Number(productRaw['price']))
          ? undefined
          : Number(productRaw['price']),
    stock:
      productRaw['stock'] == null
        ? 0
        : Number.isNaN(Number(productRaw['stock']))
          ? 0
          : Number(productRaw['stock']),
    isActive: productRaw['is_active'] == null ? undefined : Boolean(productRaw['is_active']),
    createdAt: productRaw['created_at'] == null ? undefined : String(productRaw['created_at']),
    updatedAt: productRaw['updated_at'] == null ? undefined : String(productRaw['updated_at']),
    images: imagesRaw.map(mapToProductImage),
    variants: variantsRaw.map(mapToProductVariant),
    categories: categoriesRaw.map(mapRawCategoryToCategory),
    breadcrumb: breadcrumbRaw as ProductDetail['breadcrumb'] | undefined,
    metadata: pd['metadata'] == null ? undefined : (pd['metadata'] as Record<string, unknown>),
  };

  return productDetail;
}
