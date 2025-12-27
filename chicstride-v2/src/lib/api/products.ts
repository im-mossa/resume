// src/lib/api/products.ts
import type { AxiosResponse, AxiosError } from 'axios';
import { apiClient } from './client';

import type { Product, ProductDetail, ProductImage, ProductVariant } from '../../entities/product';
import type { Category } from '../../entities/category';

import { buildPublicImageUrl } from '../utils/images';

/* --------------------------------------------------
 * Types
 * -------------------------------------------------- */

export type GetProductsParams = {
  page?: number;
  limit?: number;
  search?: string;
  category_id?: string;
  brand?: string;
  sort_by?: 'created_at' | 'price' | 'name';
  order?: 'asc' | 'desc';
};

/* --------------------------------------------------
 * Safe helpers
 * -------------------------------------------------- */

function ensureString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function ensureNumber(value: unknown, fallback = 0): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function ensureBoolean(value: unknown): boolean | undefined {
  if (value == null) return undefined;
  return Boolean(value);
}

function ensureImageUrl(value: unknown): string | undefined {
  if (value == null) return undefined;
  const url = buildPublicImageUrl(String(value));
  return typeof url === 'string' ? url : undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/* --------------------------------------------------
 * Mappers
 * -------------------------------------------------- */

function mapToProduct(raw: unknown): Product {
  const r = isRecord(raw) ? raw : {};

  return {
    id: ensureString(r.id),
    name: ensureString(r.name),
    slug: ensureString(r.slug ?? r.code ?? ''),
    description: r.description == null ? undefined : String(r.description),
    price: r.price == null ? undefined : ensureNumber(r.price),
    createdAt: ensureString(r.created_at ?? r.createdAt),
    image: ensureImageUrl(r.image ?? r.image_url),
  };
}

function mapToProductImage(raw: unknown): ProductImage {
  const r = isRecord(raw) ? raw : {};
  const url = r.url ?? r.path ?? r.image ?? r.image_url;

  return {
    id: ensureString(r.id),
    url: ensureString(ensureImageUrl(url)),
    altText: r.alt_text == null ? undefined : String(r.alt_text),
    sortOrder: r.sort_order == null ? undefined : ensureNumber(r.sort_order),
  };
}

function mapToProductVariant(raw: unknown): ProductVariant {
  const r = isRecord(raw) ? raw : {};

  return {
    id: ensureString(r.id),
    sku: ensureString(r.sku ?? r.code ?? ''),
    name: r.name == null ? undefined : String(r.name),
    color: r.color == null ? undefined : String(r.color),
    size: r.size == null ? undefined : String(r.size),
    stock: ensureNumber(r.stock, 0),
    price: r.price == null ? undefined : ensureNumber(r.price),
    createdAt: r.created_at == null ? undefined : String(r.created_at),
  };
}

function mapToCategory(raw: unknown): Category {
  const r = isRecord(raw) ? raw : {};

  return {
    id: ensureString(r.id),
    name: ensureString(r.name),
    slug: ensureString(r.slug ?? r.code ?? ''),
    parentId:
      r.parent_id == null && r.parentId == null
        ? undefined
        : ensureString(r.parent_id ?? r.parentId),
    imageUrl: ensureImageUrl(r.image ?? r.image_url),
    path: r.path == null ? undefined : String(r.path),
    sortOrder: r.sort_order == null ? undefined : ensureNumber(r.sort_order),
    productCount: r.product_count == null ? undefined : ensureNumber(r.product_count),
    isActive: ensureBoolean(r.is_active),
    children: Array.isArray(r.children) ? r.children.map(mapToCategory) : undefined,
  };
}

/* --------------------------------------------------
 * API functions
 * -------------------------------------------------- */

export async function getProducts(params: GetProductsParams = {}): Promise<{
  items: Product[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}> {
  try {
    const res: AxiosResponse = await apiClient.get('/products', { params });
    const data = res.data?.data;

    const payload = isRecord(data) ? data : {};
    const rawItems = Array.isArray(payload.items) ? payload.items : [];

    const items = rawItems.map(mapToProduct);

    const page = ensureNumber(payload.page ?? params.page, 1);
    const limit = ensureNumber(payload.limit ?? params.limit, 20);
    const total = ensureNumber(payload.total, 0);
    const totalPages = ensureNumber(payload.totalPages) || Math.ceil(total / (limit || 1));

    return {
      items,
      meta: { page, limit, total, totalPages },
    };
  } catch (error) {
    console.error('getProducts error:', error);
    return {
      items: [],
      meta: {
        page: 1,
        limit: params.limit ?? 20,
        total: 0,
        totalPages: 0,
      },
    };
  }
}

export async function getProduct(idOrSlug: string, category?: string): Promise<ProductDetail> {
  const encoded = encodeURIComponent(idOrSlug);
  let res: AxiosResponse;

  try {
    try {
      res = await apiClient.get(`/product/${encoded}`, {
        params: { category },
      });
    } catch (error: unknown) {
      const err = error as AxiosError | null;
      if (err?.response?.status === 404) {
        res = await apiClient.get(`/products/${encoded}`, {
          params: { category },
        });
      } else {
        throw error;
      }
    }

    const data = res.data?.data ?? res.data;
    const r = isRecord(data) ? data : {};

    const productRaw = isRecord(r.product) ? r.product : {};
    const imagesRaw = Array.isArray(r.images) ? r.images : [];
    const variantsRaw = Array.isArray(r.variants) ? r.variants : [];
    const categoriesRaw = Array.isArray(r.categories) ? r.categories : [];
    const breadcrumb = Array.isArray(r.breadcrumb) ? r.breadcrumb : undefined;

    return {
      id: ensureString(productRaw.id),
      name: ensureString(productRaw.name),
      slug: ensureString(productRaw.slug ?? productRaw.code ?? productRaw.id),
      description: productRaw.description == null ? undefined : String(productRaw.description),
      price: productRaw.price == null ? undefined : ensureNumber(productRaw.price),
      stock: ensureNumber(productRaw.stock, 0),
      isActive: ensureBoolean(productRaw.is_active),
      createdAt: productRaw.created_at == null ? undefined : String(productRaw.created_at),
      updatedAt: productRaw.updated_at == null ? undefined : String(productRaw.updated_at),
      images: imagesRaw.map(mapToProductImage),
      variants: variantsRaw.map(mapToProductVariant),
      categories: categoriesRaw.map(mapToCategory),
      breadcrumb,
      metadata: r.metadata == null ? undefined : (r.metadata as Record<string, unknown>),
    };
  } catch (error) {
    console.error('getProduct error:', error);
    throw error;
  }
}
