import { getProduct } from '../../../lib/api/products';
import ProductGallery from '../../../ui/components/product/ProductGallery';
import Breadcrumb from '../../../ui/components/product/Breadcrumb';
import { formatPrice } from '../../../lib/utils/format';
import { notFound } from 'next/navigation';

export const revalidate = 120;

type PageProps = {
  params: { idOrSlug: string } | Promise<{ idOrSlug: string }>;
  searchParams: { category?: string } | Promise<{ category?: string }>;
};

export default async function ProductDetailPage({ params, searchParams }: PageProps) {
  const { idOrSlug } = await Promise.resolve(params);
  const resolvedSearchParams = await Promise.resolve(searchParams);

  const category =
    typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : undefined;

  let product: Awaited<ReturnType<typeof getProduct>> | null = null;
  let hasError = false;

  try {
    product = await getProduct(idOrSlug, category);
    if (!product) notFound();
  } catch (error: unknown) {
    console.error('Product page error:', error);
    hasError = true;
  }

  if (hasError || !product) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-4">خطا در بارگذاری محصول</h1>
        <p className="text-gray-600">محصول مورد نظر یافت نشد.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Breadcrumb trail={product.breadcrumb ?? null} />
        <ProductGallery images={product.images} />
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="text-lg">{product.price != null ? formatPrice(product.price) : '-'}</div>
        <div className="text-sm text-gray-600">موجودی: {product.stock}</div>
        <p className="text-gray-700 whitespace-pre-line">{product.description ?? ''}</p>
        <button className="px-4 py-2 rounded bg-black text-white">افزودن به سبد</button>
      </div>
    </div>
  );
}
