"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CategorySection from "@/app/components/CategorySection";
import ProductSection from "@/app/components/ProductSection";

export default function ProductsPage() {
  const searchParams = useSearchParams();

  // اگر ?type باشد استفاده می‌شود، وگرنه اگر catId باشد به "Category" سوئیچ می‌کنیم، در غیر این صورت "All"
  const type =
    searchParams.get("type") ||
    (searchParams.get("catId") ? "Category" : "All");

  const catId = searchParams.get("catId") || null;
  const catName = searchParams.get("catName") || "";

  return (
    <Suspense
      fallback={<div className="py-20 text-center">Loading product...</div>}
    >
      <div className="py-2">
        {/* دسته‌بندی‌ها */}
        <CategorySection />

        {/* محصولات بر اساس نوع یا دسته */}
        <ProductSection type={type} catId={catId} catName={catName} />
      </div>
    </Suspense>
  );
}
