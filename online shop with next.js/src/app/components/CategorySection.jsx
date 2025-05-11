// src/components/CategorySection.jsx
"use client";

import React, { useEffect, useState } from "react";
import useCategoryApi from "../api/categoryApi";
import ItemSection from "./ItemSection";

/**
 * نمایش دسته‌بندی‌ها و لینک‌دهی به صفحات محصولات با پارامتر دسته
 */
export default function CategorySection() {
  const { getAllCategories } = useCategoryApi();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories((data) => setCategories(Array.isArray(data) ? data : []));
  }, [getAllCategories]);

  return (
    <section>
      <h2 className="pt-4 text-center text-lg sm:text-xl md:text-2xl font-semibold">
        Product Categories
      </h2>

      <div className="w-[98%] mx-auto my-6 pt-2 h-[280px] overflow-x-auto overflow-y-hidden">
        <div className="flex gap-4">
          {categories.map((cat) => (
            <ItemSection
              key={cat.id}
              id={cat.id}
              title={cat.title}
              image={cat.image}
              // لینک محصول با پارامترهای type=Category و catId, catName
              href={`/pages/products?type=Category&catId=${cat.id}&catName=${encodeURIComponent(
                cat.title
              )}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
