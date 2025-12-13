// src/app/product/[idOrSlug]/page.tsx
import { getProduct } from '../../../lib/api/products';
import ProductGallery from '../../../ui/components/product/ProductGallery';
import Breadcrumb from '../../../ui/components/product/Breadcrumb';
import { formatPrice } from '../../../lib/utils/format';

export const revalidate = 120;

export default async function ProductDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ idOrSlug: string }> | { idOrSlug: string };
  searchParams: Promise<{ category?: string }> | { category?: string };
}) {
  // Handle params as Promise (Next.js 15+) or direct object
  const resolvedParams = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);
  
  const category = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : undefined;
  
  try {
    const pd = await getProduct(resolvedParams.idOrSlug, category);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Breadcrumb trail={pd.breadcrumb ?? null} />
          <ProductGallery images={pd.images} />
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{pd.name}</h1>
          <div className="text-lg">{pd.price != null ? formatPrice(pd.price) : '-'}</div>
          <div className="text-sm text-gray-600">موجودی: {pd.stock}</div>
          {/* VariantSelector client-side could be mounted via a Client Component wrapper */}
          <p className="text-gray-700 whitespace-pre-line">{pd.description ?? ''}</p>
          <button className="px-4 py-2 rounded bg-black text-white">افزودن به سبد</button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-4">خطا در بارگذاری محصول</h1>
        <p className="text-gray-600">
          محصول مورد نظر یافت نشد یا خطایی در بارگذاری آن رخ داده است.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          شناسه یا slug: {resolvedParams.idOrSlug}
        </p>
      </div>
    );
  }
}
