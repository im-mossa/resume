import { notFound } from 'next/navigation';
import { getCategoryById, getCategoriesTree } from '../../../lib/api/categories';
import { getProducts } from '../../../lib/api/products';
import CategoryHeader from '../../../ui/components/category/CategoryHeader';
import CategoryProductGrid from '../../../ui/components/category/CategoryProductGrid';
import Pagination from '../../../ui/components/catalog/Pagination';
import { Category } from '../../../entities/category';
import { Product } from '../../../entities/product';

export const revalidate = 60;

function findCategoryInTree(categories: Category[], id: string): Category | null {
  for (const category of categories) {
    if (category.id === id) return category;

    if (category.children?.length) {
      const found = findCategoryInTree(category.children, id);
      if (found) return found;
    }
  }
  return null;
}

type PageProps = {
  params: { id: string } | Promise<{ id: string }>;
  searchParams:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>;
};

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { id } = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);

  const page = Number(resolvedSearchParams.page ?? 1);
  const limit = Number(resolvedSearchParams.limit ?? 20);

  let category: Category | null = null;
  let items: Product[] = [];
  let totalPages = 0;
  let hasError = false;

  try {
    // گرفتن دسته‌بندی
    try {
      category = await getCategoryById(id);
    } catch {
      const categories = await getCategoriesTree(false);
      category = findCategoryInTree(categories, id);
    }

    if (!category) {
      notFound();
    }

    // گرفتن محصولات (destructure برای حفظ type)
    const { items: productItems, meta } = await getProducts({
      page,
      limit,
      category_id: id,
    });

    items = productItems;
    totalPages = meta.totalPages;
  } catch (error: unknown) {
    console.error('Category page error:', error);
    hasError = true;
  }

  if (hasError) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-4">خطا در بارگذاری دسته‌بندی</h1>
        <p className="text-gray-600">لطفاً دوباره تلاش کنید.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CategoryHeader category={category!} />
      <CategoryProductGrid items={items} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
