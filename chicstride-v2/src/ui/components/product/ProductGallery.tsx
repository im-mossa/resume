// src/ui/components/product/ProductGallery.tsx
import { ProductImage } from "../../../entities/product";

export default function ProductGallery({ images }: { images: ProductImage[] }) {
    if (!images.length) return <div className="h-64 bg-gray-200 rounded" />;
    const main = images[0];
    return (
        <div className="space-y-3">
            <img src={main.url ?? ""} alt={main.altText ?? ""} className="w-full h-80 object-cover rounded border" />
            <div className="grid grid-cols-5 gap-2">
                {images.map((img) => (
                    <img key={img.id} src={img.url ?? ""} alt={img.altText ?? ""} className="h-20 object-cover rounded border" />
                ))}
            </div>
        </div>
    );
}
