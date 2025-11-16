// src/ui/components/category/CategoryHeader.tsx
import { Category } from "../../../entities/category";

export default function CategoryHeader({ category }: { category: Category }) {
    return (
        <div className="mb-6">
            <h1 className="text-2xl font-bold">{category.name}</h1>
            {category.imageUrl && (
                <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-48 object-cover rounded mt-3"
                />
            )}
            {category.productCount != null && (
                <p className="text-sm text-gray-600 mt-2">
                    تعداد محصولات: {category.productCount}
                </p>
            )}
        </div>
    );
}
