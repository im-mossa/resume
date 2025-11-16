// src/ui/components/discovery/DiscoveryCategories.tsx
import { Category } from "../../../entities/category";
import Link from "next/link";

export default function DiscoveryCategories({ categories }: { categories: Category[] }) {
    if (!categories.length) return <div className="text-gray-600">هیچ دسته‌ای یافت نشد.</div>;
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">دسته‌بندی‌ها</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((c) => (
                    <Link
                        key={c.id}
                        href={`/category/${c.id}`}
                        className="border rounded p-4 flex flex-col items-center gap-2 hover:shadow"
                    >
                        {c.imageUrl ? (
                            <img src={c.imageUrl} alt={c.name} className="w-16 h-16 object-cover rounded" />
                        ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded" />
                        )}
                        <span className="font-medium">{c.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
