"use client";

import React, { useEffect, useState } from "react";
import { useProductApi } from "../hooks/useProductApi";
import ItemSection from "./ItemSection";

export default function AllProducts({
  pageIndex = 0,
  pageSize = 100,
}) {
  const { getAll } = useProductApi();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    setProducts([]);

    getAll(pageIndex, pageSize, (data) => {
      if (Array.isArray(data)) setProducts(data);
      else setError("Failed to load products");
      setLoading(false);
    });
  }, [pageIndex, pageSize, getAll]);

  return (
    <section className="my-12 px-4 max-w-7xl mx-auto">
      {/* عنوان */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        All Products
      </h2>

      {/* وضعیت لودینگ / خطا */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-20">{error}</div>
      ) : (
        // گرید محصولات
        <div className="flex flex-wrap gap-6 justify-center">
          {products.map(({ id, title, image }) => (
            <ItemSection key={id} id={id} title={title} image={image} />
          ))}
        </div>
      )}
    </section>
  );
}
