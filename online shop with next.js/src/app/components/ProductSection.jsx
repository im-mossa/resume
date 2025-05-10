"use client";

import React, { useEffect, useState } from "react";
import { useProductApi } from "../hooks/useProductApi";
import ItemSection from "./ItemSection";



export default function ProductSection({
  defaultType = "Popular",
  pageIndex = 0,
  pageSize = 10,
  catId = null,
  catName = ""
}) {
  const {
    getPopularProducts,
    getNewProducts,
    getAll,
    getByCategoryId
  } = useProductApi();

  const [products, setProducts] = useState([]);
  const [activeTag, setActiveTag] = useState(defaultType);

  const sectionTitle = catName
    ? `${catName} Products`
    : `${activeTag} Products`;

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

  useEffect(() => {
    loadProducts(defaultType);
  }, [defaultType]);

  return (
    <section className="my-8 px-4">
      {/* دکمه‌های فیلتر */}
      <div className="flex gap-4 justify-center mb-4">
        {["Popular", "New"].map((type) => (
          <button
            key={type}
            onClick={() => loadProducts(type)}
            className={`px-4 py-1.5 rounded-xl mr-1 mb-1 cursor-pointer
            ${activeTag === type ? "bg-gray-300" : "hover:bg-gray-100"}`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* عنوان بخش */}
      <h2 className="text-center text-2xl font-bold mb-6">
        {sectionTitle}
      </h2>

      {/* لیست محصولات */}
      <div className="flex flex-wrap gap-6 justify-center">
        {products.map(({ id, title, image }) => (
          <ItemSection key={id} id={id} title={title} image={image} />
        ))}
      </div>
    </section>
  );
}
