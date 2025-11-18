// src/app/brand/[slug]/page.tsx
import React from 'react';
import { apiClient } from '../../../lib/api/client';
import { Brand } from '../../../entities/brand';
import { Product } from '../../../entities/product';
import { buildPublicImageUrl } from '../../../lib/utils/images';
import BrandHeader from '../../../ui/components/brand/BrandHeader';
import BrandProductGrid from '../../../ui/components/brand/BrandProductGrid';
import Pagination from '../../../ui/components/catalog/Pagination';

export const revalidate = 60;

type SearchParams = Record<string, string | string[] | undefined>;

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

function mapRawToProduct(raw: unknown): Product {
  const r = (raw ?? {}) as Record<string, unknown>;
  return {
    id: ensureString(r.id),
    name: ensureString(r.name),
    slug: ensureString(r.slug ?? r.code ?? ''),
    description: r.description == null ? undefined : String(r.description),
    price:
      r.price == null ? undefined : Number.isNaN(Number(r.price)) ? undefined : Number(r.price),
    createdAt: r.created_at == null ? '' : String(r.created_at),
    image: ensureImageUrl(r.image ?? r.image_url),
  };
}

export default async function BrandPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: SearchParams;
}) {
  const slug = params.slug;

  const page = Array.isArray(searchParams.page)
    ? Number(searchParams.page[0])
    : Number(searchParams.page ?? 1);
  const limit = Array.isArray(searchParams.limit)
    ? Number(searchParams.limit[0])
    : Number(searchParams.limit ?? 24);
  const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'newest';

  // حالت پیش‌فرض برای render
  let brand: Brand | null = null;
  let items: Product[] = [];
  let totalPages = 0;
  let fetchError: string | null = null;

  try {
    const res = await apiClient.get('/brands/' + encodeURIComponent(slug) + '/products', {
      params: { page, limit, sort },
    });

    const payload = (res.data ?? {}) as Record<string, unknown>;

    if (payload['error']) {
      fetchError = String(payload['error']);
    } else {
      const data = (payload['data'] ?? {}) as Record<string, unknown>;

      const brandRaw = data['brand'] ?? null;
      if (!brandRaw) {
        fetchError = 'brand_not_found';
      } else {
        brand = {
          id: ensureString((brandRaw as Record<string, unknown>)['id']),
          name: ensureString((brandRaw as Record<string, unknown>)['name']),
          slug: ensureString((brandRaw as Record<string, unknown>)['slug'] ?? ''),
          description:
            (brandRaw as Record<string, unknown>)['description'] == null
              ? undefined
              : String((brandRaw as Record<string, unknown>)['description']),
          imageUrl:
            (brandRaw as Record<string, unknown>)['image_url'] == null
              ? undefined
              : buildPublicImageUrl(String((brandRaw as Record<string, unknown>)['image_url'])),
          metadata:
            (brandRaw as Record<string, unknown>)['metadata'] == null
              ? undefined
              : ((brandRaw as Record<string, unknown>)['metadata'] as Record<string, unknown>),
        };

        const rawItems = Array.isArray(data['items']) ? (data['items'] as unknown[]) : [];
        items = rawItems.map(mapRawToProduct);

        const metaRaw = (data['meta'] ?? {}) as Record<string, unknown>;
        totalPages = ensureNumber(metaRaw['totalPages'] ?? metaRaw['total_pages'] ?? 0, 0);
      }
    }
  } catch (err) {
    console.error('BrandPage fetch error:', err);
    fetchError = 'network_error';
  }

  // حالا خارج از try/catch JSX را برمی‌گردانیم
  if (fetchError) {
    if (fetchError === 'brand_not_found') {
      return <div className="text-red-600">برند یافت نشد.</div>;
    }
    return <div className="text-red-600">خطا در بارگذاری اطلاعات. لطفا دوباره تلاش کنید.</div>;
  }

  // اگر برند درست لود شده، رندر معمول
  if (!brand) {
    return <div className="text-red-600">برند یافت نشد.</div>;
  }

  return (
    <div className="space-y-6">
      <BrandHeader brand={brand} />
      <BrandProductGrid items={items} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
