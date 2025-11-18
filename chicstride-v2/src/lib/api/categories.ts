// src/lib/api/categories.ts
import { AxiosResponse } from 'axios';
import { apiClient } from './client';
import { Category } from '../../entities/category';
import { buildPublicImageUrl } from '../utils/images';

/** mapper ساده برای Category */
function mapToCategory(raw: unknown): Category {
  const r = (raw ?? {}) as Record<string, unknown>;

  return {
    id: String(r.id ?? ''),
    name: String(r.name ?? ''),
    slug: r.slug == null ? '' : String(r.slug),
    parentId: r.parentId == null ? undefined : String(r.parentId),
    imageUrl: r.imageUrl == null ? undefined : buildPublicImageUrl(String(r.imageUrl)),
    path: r.path == null ? undefined : String(r.path),
    sortOrder: r.sortOrder == null ? undefined : Number(r.sortOrder),
    productCount: r.productCount == null ? undefined : Number(r.productCount),
    isActive: r.isActive == null ? undefined : Boolean(r.isActive),
    children: Array.isArray(r.children) ? r.children.map((c) => mapToCategory(c)) : undefined,
  };
}

/**
 * دریافت درخت دسته‌ها
 * برمی‌گرداند: یک آرایه از Category (ممکن است خالی باشد)
 */
export async function getCategoriesTree(): Promise<Category[]> {
  try {
    const res: AxiosResponse = await apiClient.get('/categories/tree');
    const raw = res.data;
    if (!Array.isArray(raw)) return [];
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
