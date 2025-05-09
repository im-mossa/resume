"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useProductApi } from "../api/useProductApi";

export default function ProductSection({
  defaultType = "Popular",
  pageIndex = 0,
  pageSize = 10,
  catId = null,
  catName = ""
}) {
  const { getPopularProducts, getNewProducts, getAll, getByCategoryId } = useProductApi();
  const [products, setProducts] = useState([]);
  const [activeTag, setActiveTag] = useState(defaultType);

  // عنوان بخش
  const sectionTitle = catName
    ? `${catName} Product`
    : `${activeTag} Product`;

  // بارگذاری داده بر اساس نوع فعال
  const loadProducts = async (type) => {
    setActiveTag(type);
    setProducts([]);

    const callback = (data) => {
      setProducts(Array.isArray(data) ? data : []);
    };

    if (type === "Popular") {
      await getPopularProducts(callback);
    } else if (type === "New") {
      await getNewProducts(callback);
    } else if (type === "All") {
      await getAll(pageIndex, pageSize, callback);
    } else if (type === "Category") {
      await getByCategoryId(catId, pageIndex, pageSize, callback);
    }
  };

  // بار اول
  useEffect(() => {
    loadProducts(defaultType);
  }, [defaultType]);

  return (
    <section className="my-8 px-4">
      {/* دکمه‌های انتخاب نوع */}
      <div className="flex gap-4 justify-center mb-4">
        {["Popular", "New"].map((type) => (
          <button
            key={type}
            onClick={() => loadProducts(type)}
            className={`px-4 py-1.5 rounded-xl mr-1 mb-1 cursor-pointer ${activeTag === type ? "bg-gray-300" : ""
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* عنوان */}
      <h2 className="main-title text-center text-2xl font-bold mb-6">
        {sectionTitle}
      </h2>

      {/* رندر محصولات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(({ id, title, image }) => (
          <div
            key={id}
            className="w-[205px] h-[250px] inline-block relative overflow-hidden m-[5px] rounded-[15px] shadow-[1px_1px_5px_0_#bbb] transition-all duration-300 ease-in-out hover:shadow-[1px_1px_5px_0_#000] hover:scale-[1.03] max-[471px]:flex max-[471px]:justify-center"
          >
            <Link href={`/products/${id}`} className="block w-full h-full">
              <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <h3 className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-[20px] text-center py-[15px]">
                {title}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
