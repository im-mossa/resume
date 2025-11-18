import { Product } from '../../../entities/product';
import Link from 'next/link';
import { formatPrice } from '../../../lib/utils/format';
import Image from 'next/image';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="border rounded overflow-hidden block">
      {product.image ? (
        <div className="w-full h-48 relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        </div>
      ) : (
        <div className="h-48 bg-gray-200" />
      )}
      <div className="p-3">
        <div className="text-sm text-gray-500">{product.slug}</div>
        <h3 className="font-semibold">{product.name}</h3>
        <div className="mt-1">{formatPrice(product.price ?? null)}</div>
      </div>
    </Link>
  );
}
