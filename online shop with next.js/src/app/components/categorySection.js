// src/components/CategorySection.jsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import useCategoryApi from "../api/categoryApi";

export default function CategorySection() {
    const { getAllCategories } = useCategoryApi();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // اجرا فقط یک بار بعد از ماونت
        getAllCategories(setCategories);
    }, []);  // دپیندنسی خالی

    return (
        <section>
            <h2 className="pt-4 text-center text-lg sm:text-xl md:text-2xl font-semibold">
                Product Categories
            </h2>

            <div className="w-[98%] mx-auto my-6 pt-2 h-[280px] overflow-x-auto overflow-y-hidden">
                <div className="flex gap-4">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[205px] h-[250px] relative overflow-hidden
                         rounded-[15px] shadow-[1px_1px_5px_0_#bbb]
                         transition-all duration-300 ease-in-out
                         hover:shadow-[1px_1px_5px_0_#000] hover:scale-[1.03]"
                        >
                            <Link
                                href={`/products?catId=${cat.id}&catName=${encodeURIComponent(
                                    cat.title
                                )}`}
                                className="block w-full h-full"
                            >
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="w-full h-full object-cover"
                                />
                                <h3
                                    className="absolute bottom-0 left-0 w-full bg-black/50 text-white
                             text-[16px] sm:text-[18px] md:text-[20px] text-center
                             py-[10px] sm:py-[12px] md:py-[15px]"
                                >
                                    {cat.title}
                                </h3>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
