// src/ui/components/category/CategoryHeader.tsx
import { Category } from '../../../entities/category';
import Image from 'next/image';

export default function CategoryHeader({ category }: { category: Category }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold">{category.name}</h1>
      {category.imageUrl && (
        <div className="w-full h-48 relative rounded mt-3 overflow-hidden">
          <Image
            src={category.imageUrl}
            alt={category.name}
            fill
            className="object-cover rounded"
            sizes="100vw"
          />
        </div>
      )}
      {category.productCount != null && (
        <p className="text-sm text-gray-600 mt-2">تعداد محصولات: {category.productCount}</p>
      )}
    </div>
  );
}
