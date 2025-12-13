// src/lib/api/categories.ts
import { AxiosResponse } from 'axios';
import { apiClient } from './client';
import { Category } from '../../entities/category';
import { buildPublicImageUrl } from '../utils/images';

function ensureString(v: unknown, fallback = ''): string {
  if (v == null) return fallback;
  return String(v);
}

function ensureImageUrl(v: unknown): string | undefined {
  if (v == null) return undefined;
  const url = buildPublicImageUrl(String(v));
  return url == null ? undefined : String(url);
}

/** mapper ساده برای Category - handles both snake_case and camelCase */
function mapToCategory(raw: unknown): Category {
  const r = (raw ?? {}) as Record<string, unknown>;

  return {
    id: ensureString(r.id),
    name: ensureString(r.name),
    slug: ensureString(r.slug ?? r.code ?? ''),
    parentId:
      r.parent_id == null && r.parentId == null
        ? undefined
        : ensureString(r.parent_id ?? r.parentId ?? ''),
    imageUrl: ensureImageUrl(r.image_url ?? r.image ?? r.imageUrl) ?? undefined,
    path: r.path == null ? undefined : String(r.path),
    sortOrder:
      r.sort_order == null && r.sortOrder == null
        ? undefined
        : Number.isNaN(Number(r.sort_order ?? r.sortOrder))
          ? undefined
          : Number(r.sort_order ?? r.sortOrder),
    productCount:
      r.product_count == null && r.productCount == null
        ? undefined
        : Number.isNaN(Number(r.product_count ?? r.productCount))
          ? undefined
          : Number(r.product_count ?? r.productCount),
    isActive:
      r.is_active == null && r.isActive == null ? undefined : Boolean(r.is_active ?? r.isActive),
    children: Array.isArray(r.children) ? r.children.map((c) => mapToCategory(c)) : undefined,
  };
}

/**
 * دریافت درخت دسته‌ها
 * برمی‌گرداند: یک آرایه از Category (ممکن است خالی باشد)
 */
export async function getCategoriesTree(includeHidden: boolean): Promise<Category[]> {
  try {
    const res: AxiosResponse = await apiClient.get(
      `/categories/tree?include_inactive=${includeHidden ?? false}`
    );
    // Handle both direct array response and wrapped response { data: [...] }
    const payload = res.data?.data ?? res.data;
    const raw = Array.isArray(payload) ? payload : [];
    if (!Array.isArray(raw)) {
      console.warn('getCategoriesTree: Expected array but got:', typeof raw, raw);
      return [];
    }
    return raw.map(mapToCategory);
  } catch (err) {
    // در اینجا می‌توانی لاگ کنی یا نوع خاصی از خطا را پرتاب کنی.
    // فعلاً به جای شکست ناگهانی، آرایه خالی برمی‌گردانیم تا caller بتواند ادامه دهد.
    console.error('getCategoriesTree error:', err);
    return [];
  }
}

/**
 * دریافت جزئیات یک دسته بر اساس id
 * اگر پاسخ نامعتبر باشد خطا پرتاب می‌شود تا caller آن را هندل کند.
 */
export async function getCategoryById(id: string): Promise<Category> {
  const encoded = encodeURIComponent(id);
  const res: AxiosResponse = await apiClient.get(`/categories/${encoded}`);
  return mapToCategory(res.data);
}
