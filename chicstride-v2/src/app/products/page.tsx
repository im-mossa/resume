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
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const page = Number(searchParams.page ?? 1);
  const limit = Number(searchParams.limit ?? 24);
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;
  const brand = typeof searchParams.brand === 'string' ? searchParams.brand : undefined;
  const category_id =
    typeof searchParams.category_id === 'string' ? searchParams.category_id : undefined;
  const sort_by = (
    typeof searchParams.sort_by === 'string' ? searchParams.sort_by : 'created_at'
  ) as 'created_at' | 'price' | 'name';
  const order = (typeof searchParams.order === 'string' ? searchParams.order : 'desc') as
    | 'asc'
    | 'desc';

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
