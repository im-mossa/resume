// src/ui/components/brand/BrandProductGrid.tsx
import { Product } from "../../../entities/product";
import ProductCard from "../catalog/ProductCard";

export default function BrandProductGrid({ items }: { items: Product[] }) {
    if (!items.length) return <div className="text-gray-600">محصولی برای این برند یافت نشد.</div>;
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    );
}
