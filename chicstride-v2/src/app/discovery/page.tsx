// src/app/discovery/page.tsx
import { getCategoriesTree } from '../../lib/api/categories';
import DiscoveryCategories from '../../ui/components/discovery/DiscoveryCategories';
import DiscoveryBrands from '../../ui/components/discovery/DiscoveryBrands';
import { Brand } from '../../entities/brand';

export const revalidate = 120;

export default async function DiscoveryPage() {
  const categories = await getCategoriesTree(false);

  // چون endpoint لیست برندها نداری، فعلاً mock یا config
  const brands: Brand[] = [
    { id: '1', name: 'Pama', slug: 'pama' },
    { id: '2', name: 'Nazari', slug: 'nazari' },
    { id: '3', name: 'ChicStride', slug: 'chicstride' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">اکتشاف برندها و دسته‌ها</h1>
      <DiscoveryCategories categories={categories.slice(0, 8)} />
      <DiscoveryBrands brands={brands} />
    </div>
  );
}
