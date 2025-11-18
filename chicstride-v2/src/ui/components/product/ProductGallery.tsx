// src/ui/components/product/ProductGallery.tsx
import { ProductImage } from '../../../entities/product';
import Image from 'next/image';

export default function ProductGallery({ images }: { images: ProductImage[] }) {
  if (!images.length) return <div className="h-64 bg-gray-200 rounded" />;
  const main = images[0];

  return (
    <div className="space-y-3">
      <div className="w-full h-80 relative rounded border overflow-hidden">
        <Image
          src={main.url ?? ''}
          alt={main.altText ?? ''}
          fill
          className="object-cover rounded"
          sizes="100vw"
        />
      </div>
      <div className="grid grid-cols-5 gap-2">
        {images.map((img) => (
          <div key={img.id} className="h-20 relative rounded border overflow-hidden">
            <Image
              src={img.url ?? ''}
              alt={img.altText ?? ''}
              fill
              className="object-cover rounded"
              sizes="20vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
