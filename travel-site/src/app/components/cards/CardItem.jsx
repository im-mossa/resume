import Image from "next/image";
import Link from "next/link";
import React from "react";

function CardItem({ path = "/", label = "", src = "", text = "" }) {
  return (
    <div className="flex flex-1 mb-6 mx-4 rounded-lg lg:mb-6">
      <Link
        href={path}
        className="flex flex-col w-full shadow-lg drop-shadow-md rounded-lg overflow-hidden no-underline transition-all duration-300 hover:shadow-xl"
      >
        <figure className="relative w-full pt-[67%] overflow-hidden">
          {/* تصویر */}
          {src && (
            <Image
              src={src}
              alt={label || "Image"}
              fill
              className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          )}

          {/* برچسب دسته‌بندی */}
          {label && (
            <span className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
              {label}
            </span>
          )}
        </figure>

        <div className="p-5">
          <h5 className="text-[#252e48] text-base md:text-lg leading-6">
            {text}
          </h5>
        </div>
      </Link>
    </div>
  );
}

export default CardItem;
