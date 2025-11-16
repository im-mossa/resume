// src/app/category/[id]/page.tsx
import { getCategoriesTree } from "../../../lib/api/categories";
import { getProducts } from "../../../lib/api/products";
import CategoryHeader from "../../../ui/components/category/CategoryHeader";
import CategoryProductGrid from "../../../ui/components/category/CategoryProductGrid";
import Pagination from "../../../ui/components/catalog/Pagination";

export const revalidate = 60;

export default async function CategoryPage({
    params,
    searchParams,
}: {
    params: { id: string };
    searchParams: Record<string, string | string[] | undefined>;
}) {
    const page = Number(searchParams.page ?? 1);
    const limit = Number(searchParams.limit ?? 20);

    // گرفتن محصولات دسته
    const { items, meta } = await getProducts({ page, limit, category_id: params.id });

    // گرفتن اطلاعات دسته از tree
    const categories = await getCategoriesTree(false);
    const category = categories.find((c) => c.id === params.id);

    if (!category) {
        return <div className="text-red-600">دسته‌بندی یافت نشد.</div>;
    }

    return (
        <div className="space-y-6">
            <CategoryHeader category={category} />
            <CategoryProductGrid items={items} />
            <Pagination totalPages={meta.totalPages} />
        </div>
    );
}
