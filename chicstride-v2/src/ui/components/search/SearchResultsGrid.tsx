// src/ui/components/search/SearchResultsGrid.tsx
import { Product } from '../../../entities/product';
import ProductCard from '../catalog/ProductCard';

export default function SearchResultsGrid({ items }: { items: Product[] }) {
  if (!items.length) {
    return <div className="text-gray-600">هیچ محصولی مطابق جستجو یافت نشد.</div>;
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
