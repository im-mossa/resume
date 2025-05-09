// src/components/AllProducts.jsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useProductApi } from "../api/useProductApi";

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
        /* گرید محصولات */
        <div className="flex flex-wrap gap-6 justify-center">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[205px] h-[250px] relative overflow-hidden
                         rounded-[15px] shadow-[1px_1px_5px_0_#bbb]
                         transition-all duration-300 ease-in-out
                         hover:shadow-[1px_1px_5px_0_#000] hover:scale-[1.03]"
            >
              <Link href={`/products/${prod.id}`} className="block w-full h-full">
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-full h-full object-cover"
                />
                <h3 className="absolute bottom-0 left-0 w-full bg-black/50 text-white
                               text-[16px] sm:text-[18px] md:text-[20px] text-center
                               py-[10px] sm:py-[12px] md:py-[15px]">
                  {prod.title}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
