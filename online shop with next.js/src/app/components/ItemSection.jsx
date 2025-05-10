// src/components/ItemSection.jsx
"use client";

import React from "react";
import Link from "next/link";

export default function ItemSection({ id, title, image, href }) {
    // اگر href پاس داده نشده، به صفحهٔ محصول هدایت کند
    const link = href ?? `/products/${id}`;

    return (
        <div
            className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[205px] h-[250px] relative overflow-hidden
                 rounded-[15px] shadow-[1px_1px_5px_0_#bbb]
                 transition-all duration-300 ease-in-out
                 hover:shadow-[1px_1px_5px_0_#000] hover:scale-[1.03]"
        >
            <Link href={link} className="block w-full h-full">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <h3
                    className="absolute bottom-0 left-0 w-full bg-black/50 text-white
                     text-[16px] sm:text-[18px] md:text-[20px] text-center
                     py-[10px] sm:py-[12px] md:py-[15px]"
                >
                    {title}
                </h3>
            </Link>
        </div>
    );
}
