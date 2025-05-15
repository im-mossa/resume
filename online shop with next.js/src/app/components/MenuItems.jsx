// src/components/MenuItems.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaShoppingCart, FaUser } from "react-icons/fa";
import { checkUser } from "../utils/helpers";

export default function MenuItems() {
  const [menuState, setMenuState] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/pages/products" },
    { name: "Blog", path: "/pages/blog" },
    { name: "About us", path: "/pages/aboutUs" },
  ];

  return (
    <>
      {/* دکمه نمایش/مخفی کردن منو در موبایل */}
      <div
        data-testid="button"
        className="block md:hidden absolute top-4 left-4 cursor-pointer z-20"
        onClick={() => setMenuState(!menuState)}
      >
        {menuState ? (
          <FaTimes className="text-black text-2xl pt-2" />
        ) : (
          <FaBars className="text-black text-2xl pt-2" />
        )}
      </div>

      {/* لیست آیتم‌های منو */}
      <ul
        data-testid="menu"
        className={`bg-white fixed top-20 left-0 text-[16px] w-full h-[90vh] flex flex-col justify-center items-center
         text-black z-[1] transition-all duration-500 ease-in-out
          ${menuState ? "translate-x-0" : "translate-x-[-100%]"}
          md:static md:translate-x-0 md:w-[60vw] md:flex-row md:h-auto md:bg-transparent md:justify-end`}
      >
        {navItems.map((item) => (
          <li
            key={item.path}
            className={`list-none p-4 border-b-4 border-transparent transition-all duration-200 ease-out
              w-full text-center hover:font-bold
              md:hover:bg-transparent md:hover:text-current md:hover:border-b-black
              ${isActive(item.path) ? "text-black font-bold" : ""}`}
          >
            <Link href={item.path} onClick={() => setMenuState(false)}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <ul>
        <li>
          <Link href="/pages/basket">
            <FaShoppingCart className="text-black text-[16px] absolute right-[15px] top-1/3 hover:scale-125 transition-transform" />
          </Link>
        </li>
        <li>
          <div className="hover:cursor-pointer" onClick={() => checkUser()}>
            <FaUser className="text-black text-[16px] absolute right-[45px] top-1/3 hover:scale-125 transition-transform" />
          </div>
        </li>
      </ul>
    </>
  );
}
