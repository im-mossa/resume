// src/ui/components/catalog/ProductCard.tsx
import { Product } from "../../../entities/product";
import Link from "next/link";
import { formatPrice } from "../../../lib/utils/format";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link href={`/product/${product.slug}`} className="border rounded overflow-hidden block">
            {product.image ? <img src={product.image} alt={product.name} className="w-full h-48 object-cover" /> : <div className="h-48 bg-gray-200" />}
            <div className="p-3">
                <div className="text-sm text-gray-500">{product.slug}</div>
                <h3 className="font-semibold">{product.name}</h3>
                <div className="mt-1">{formatPrice(product.price)}</div>
            </div>
        </Link>
    );
}
