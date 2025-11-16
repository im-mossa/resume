// src/app/brand/[slug]/page.tsx
import { apiClient } from "../../../lib/api/client";
import { Brand } from "../../../entities/brand";
import { Product } from "../../../entities/product";
import { buildPublicImageUrl } from "../../../lib/utils/images";
import BrandHeader from "../../../ui/components/brand/BrandHeader";
import BrandProductGrid from "../../../ui/components/brand/BrandProductGrid";
import Pagination from "../../../ui/components/catalog/Pagination";

export const revalidate = 60;

export default async function BrandPage({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams: Record<string, string | string[] | undefined>;
}) {
    const page = Number(searchParams.page ?? 1);
    const limit = Number(searchParams.limit ?? 24);
    const sort = typeof searchParams.sort === "string" ? searchParams.sort : "newest";

    const { data } = await apiClient.get("/brands/" + params.slug + "/products", {
        params: { page, limit, sort },
    });

    if (!data || data.error) {
        return <div className="text-red-600">برند یافت نشد.</div>;
    }

    const brand: Brand = data.data.brand;
    const items: Product[] = (data.data.items ?? []).map((p: any) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description ?? null,
        price: p.price ?? null,
        createdAt: p.created_at ?? "",
        image: buildPublicImageUrl(p.image),
    }));
    const meta = data.data.meta;

    return (
        <div className="space-y-6">
            <BrandHeader brand={brand} />
            <BrandProductGrid items={items} />
            <Pagination totalPages={meta.totalPages} />
        </div>
    );
}
