// src/ui/components/categories/CategoriesTree.tsx
import { Category } from "../../../entities/category";
import CategoryNode from "./CategoryNode";

export default function CategoriesTree({ categories }: { categories: Category[] }) {
    if (!categories.length) return <div className="text-gray-600">هیچ دسته‌ای یافت نشد.</div>;
    return (
        <div className="space-y-2">
            {categories.map((c) => (
                <CategoryNode key={c.id} category={c} />
            ))}
        </div>
    );
}
