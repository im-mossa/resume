"use client";

import React from "react";
import Image from "next/image";

function CardItemTourism({ title, text }) {
  return (
    <li className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-6 cursor-pointer">
      <div className="w-full h-full border border-[#e2dddb] rounded-md p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
        <Image
          src="/images/compare.png"
          alt={title || "Tourism Icon"}
          width={120}
          height={60}
          className="mx-auto -mt-10 mb-4"
        />
        <h3 className="text-[#4285f4] text-base font-semibold mb-2">{title}</h3>
        <p className="text-[#8d8d8d] text-sm leading-relaxed">{text}</p>
      </div>
    </li>
  );
}

export default CardItemTourism;
