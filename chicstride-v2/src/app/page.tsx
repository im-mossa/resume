// src/app/page.tsx
import HeroCarousel from "../ui/components/hero/HeroCarousel";
import ProductGrid from "../ui/components/catalog/ProductGrid";
import { getSlides } from "../lib/api/slides";
import { getProducts } from "../lib/api/products";
import { getCategoriesTree } from "../lib/api/categories";

export default async function HomePage() {
    const [slides, latest, categories] = await Promise.all([
        getSlides({ position: "home_hero", device: "desktop", country: "IR", limit: 6 }),
        getProducts({ page: 1, limit: 8, sort_by: "created_at", order: "desc" }),
        getCategoriesTree(false),
    ]);

    return (
        <div className="space-y-8">
            <HeroCarousel slides={slides} />
            <section>
                <h2 className="text-xl font-bold mb-3">جدیدترین محصولات</h2>
                <ProductGrid items={latest.items} />
            </section>
            <section>
                <h2 className="text-xl font-bold mb-3">دسته‌بندی‌ها</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.slice(0, 8).map((c) => (
                        <a key={c.id} href={`/category/${c.id}`} className="border rounded p-4 flex items-center gap-3">
                            {c.imageUrl ? <img src={c.imageUrl} alt={c.name} className="w-12 h-12 object-cover rounded" /> : <div className="w-12 h-12 bg-gray-200 rounded" />}
                            <span>{c.name}</span>
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}
