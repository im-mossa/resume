// src/ui/components/catalog/SortControl.tsx
'use client';
import { useRouter, useSearchParams } from 'next/navigation';

const sortOptions = [
  { key: 'created_at', label: 'جدیدترین' },
  { key: 'price', label: 'قیمت' },
  { key: 'name', label: 'نام' },
] as const;

export default function SortControl() {
  const router = useRouter();
  const params = useSearchParams();
  const sort_by = params.get('sort_by') ?? 'created_at';
  const order = params.get('order') ?? 'desc';

  const update = (sb: string, ord: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('sort_by', sb);
    url.searchParams.set('order', ord);
    router.push(url.pathname + '?' + url.searchParams.toString());
  };

  return (
    <div className="flex gap-2 items-center">
      <span className="text-sm text-gray-700">مرتب‌سازی:</span>
      <select
        value={sort_by}
        onChange={(e) => update(e.target.value, order)}
        className="border rounded px-2 py-1"
      >
        {sortOptions.map((o) => (
          <option key={o.key} value={o.key}>
            {o.label}
          </option>
        ))}
      </select>
      <select
        value={order}
        onChange={(e) => update(sort_by, e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="asc">صعودی</option>
        <option value="desc">نزولی</option>
      </select>
    </div>
  );
}
