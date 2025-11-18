// src/app/product/[idOrSlug]/page.tsx
import { getProduct } from '../../../../lib/api/products';
import ProductGallery from '../../../../ui/components/product/ProductGallery';
import Breadcrumb from '../../../../ui/components/product/Breadcrumb';
import { formatPrice } from '../../../../lib/utils/format';

export const revalidate = 120;

export default async function ProductDetailPage({
  params,
  searchParams,
}: {
  params: { idOrSlug: string };
  searchParams: { category?: string };
}) {
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const pd = await getProduct(params.idOrSlug, category);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Breadcrumb trail={pd.breadcrumb} />
        <ProductGallery images={pd.images} />
      </div>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{pd.name}</h1>
        <div className="text-lg">{formatPrice(pd.price)}</div>
        <div className="text-sm text-gray-600">موجودی: {pd.stock}</div>
        {/* VariantSelector client-side could be mounted via a Client Component wrapper */}
        <p className="text-gray-700 whitespace-pre-line">{pd.description ?? ''}</p>
        <button className="px-4 py-2 rounded bg-black text-white">افزودن به سبد</button>
      </div>
    </div>
  );
}
