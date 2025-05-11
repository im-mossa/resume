// src/components/ProductSection.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useProductApi } from "../hooks/useProductApi";
import ItemSection from "./ItemSection";

export default function ProductSection({
  type = "Popular",
  pageIndex = 0,
  pageSize = 10,
  catId = null,
  catName = "",
}) {
  const { getPopularProducts, getNewProducts, getAll, getByCategoryId } =
    useProductApi();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const sectionTitle = catName ? `${catName} Products` : `${type} Products`;

  useEffect(() => {
    setLoading(true);
    setProducts([]);
    const callback = (data) => {
      setProducts(Array.isArray(data) ? data : []);
      setLoading(false);
    };

    if (type === "Popular") {
      getPopularProducts(callback);
    } else if (type === "New") {
      getNewProducts(callback);
    } else if (type === "All") {
      getAll(pageIndex, pageSize, callback);
    } else if (type === "Category" && catId != null) {
      getByCategoryId(catId, pageIndex, pageSize, callback);
    } else {
      // fallback load all
      getAll(pageIndex, pageSize, callback);
    }
  }, [
    type,
    pageIndex,
    pageSize,
    catId,
    catName,
    getPopularProducts,
    getNewProducts,
    getAll,
    getByCategoryId,
  ]);

  return (
    <section className="my-8 px-4">
      {/* Section Title */}
      <h2 className="text-center text-2xl font-bold mb-6">{sectionTitle}</h2>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {products.map(({ id, title, image }) => (
            <ItemSection key={id} id={id} title={title} image={image} />
          ))}
        </div>
      )}
    </section>
  );
}
