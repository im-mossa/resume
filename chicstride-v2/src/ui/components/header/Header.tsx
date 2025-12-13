// src/ui/components/header/Header.tsx

'use client';

import Link from 'next/link';
import SearchBar from './SearchBar';

interface HeaderProps {
  showSearch?: boolean; // کنترل نمایش سرچ بار
}

export default function Header({ showSearch = true }: HeaderProps) {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-6">
        {/* لوگو / نام برند */}
        <Link href="/" className="font-bold text-lg text-gray-900">
          ChicStride
        </Link>

        {/* ناوبری اصلی */}
        <nav className="flex items-center gap-4 text-sm text-gray-700">
          <Link href="/products">محصولات</Link>
          <Link href="/discovery">برندها</Link>
          <Link href="/categories">دسته‌بندی‌ها</Link>
          <Link href="/cart">سبد خرید</Link>
        </nav>

        {/* سرچ بار (اختیاری) */}
        {showSearch && (
          <div className="ml-auto w-full max-w-md">
            <SearchBar placeholder="جستجو در محصولات..." />
          </div>
        )}
      </div>
    </header>
  );
}
