// src/ui/components/brand/BrandHeader.tsx
import { Brand } from "../../../entities/brand";

export default function BrandHeader({ brand }: { brand: Brand }) {
    return (
        <div className="mb-6">
            <h1 className="text-2xl font-bold">برند: {brand.name}</h1>
            <p className="text-sm text-gray-600 mt-2">شناسه: {brand.slug}</p>
        </div>
    );
}
