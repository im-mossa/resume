// src/app/products/page.tsx
import { Suspense } from 'react';
import { getProducts } from '../../lib/api/products';
import ProductGrid from '../../ui/components/catalog/ProductGrid';
import SortControl from '../../ui/components/catalog/SortControl';
import Pagination from '../../ui/components/catalog/Pagination';

export const revalidate = 60;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams:
    | Promise<Record<string, string | string[] | undefined>>
    | Record<string, string | string[] | undefined>;
}) {
  // Handle searchParams as Promise (Next.js 15+) or direct object
  const resolvedSearchParams = await Promise.resolve(searchParams);

  const page = Number(resolvedSearchParams.page ?? 1);
  const limit = Number(resolvedSearchParams.limit ?? 24);
  const search =
    typeof resolvedSearchParams.search === 'string' ? resolvedSearchParams.search : undefined;
  const brand =
    typeof resolvedSearchParams.brand === 'string' ? resolvedSearchParams.brand : undefined;
  const category_id =
    typeof resolvedSearchParams.category_id === 'string'
      ? resolvedSearchParams.category_id
      : undefined;
  const sort_by = (
    typeof resolvedSearchParams.sort_by === 'string' ? resolvedSearchParams.sort_by : 'created_at'
  ) as 'created_at' | 'price' | 'name';
  const order = (
    typeof resolvedSearchParams.order === 'string' ? resolvedSearchParams.order : 'desc'
  ) as 'asc' | 'desc';

  const { items, meta } = await getProducts({
    page,
    limit,
    search,
    brand,
    category_id,
    sort_by,
    order,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">لیست محصولات</h1>
        <Suspense fallback={<div>بارگذاری...</div>}>
          <SortControl />
        </Suspense>
      </div>
      <ProductGrid items={items} />
      <Suspense fallback={<div>بارگذاری...</div>}>
        <Pagination totalPages={meta.totalPages} />
      </Suspense>
    </div>
  );
}
