// src/app/search/page.tsx
import { Suspense } from "react";
import { getProducts } from "../../lib/api/products";
import SearchResultsHeader from "../../ui/components/search/SearchResultsHeader";
import SearchResultsGrid from "../../ui/components/search/SearchResultsGrid";
import SortControl from "../../ui/components/catalog/SortControl";
import Pagination from "../../ui/components/catalog/Pagination";

export const revalidate = 30;

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Record<string, string | string[] | undefined>;
}) {
    const query = typeof searchParams.query === "string" ? searchParams.query : "";
    const page = Number(searchParams.page ?? 1);
    const limit = Number(searchParams.limit ?? 24);
    const sort_by = (typeof searchParams.sort_by === "string" ? searchParams.sort_by : "created_at") as "created_at" | "price" | "name";
    const order = (typeof searchParams.order === "string" ? searchParams.order : "desc") as "asc" | "desc";

    const { items, meta } = await getProducts({ page, limit, search: query, sort_by, order });

    return (
        <div className="space-y-6">
            <SearchResultsHeader query={query} />
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">تعداد نتایج: {meta.total}</span>
                <Suspense fallback={<div>بارگذاری...</div>}>
                    <SortControl />
                </Suspense>
            </div>
            <SearchResultsGrid items={items} />
            <Suspense fallback={<div>بارگذاری...</div>}>
                <Pagination totalPages={meta.totalPages} />
            </Suspense>
        </div>
    );
}
