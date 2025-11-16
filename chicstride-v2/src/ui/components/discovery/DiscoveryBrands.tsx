// src/ui/components/discovery/DiscoveryBrands.tsx
import { Brand } from "../../../entities/brand";
import Link from "next/link";

export default function DiscoveryBrands({ brands }: { brands: Brand[] }) {
    if (!brands.length) return <div className="text-gray-600">هیچ برندی یافت نشد.</div>;
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">برندها</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {brands.map((b) => (
                    <Link
                        key={b.id}
                        href={`/brand/${b.slug}`}
                        className="border rounded p-4 flex flex-col items-center gap-2 hover:shadow"
                    >
                        <span className="font-medium">{b.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
