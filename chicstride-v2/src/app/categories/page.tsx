// src/app/categories/page.tsx
import { getCategoriesTree } from "../../lib/api/categories";
import CategoriesTree from "../../ui/components/categories/CategoriesTree";

export const revalidate = 120;

export default async function CategoriesPage() {
    const categories = await getCategoriesTree(false);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">درخت دسته‌بندی‌ها</h1>
            <CategoriesTree categories={categories} />
        </div>
    );
}
