"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { FaBars, FaTimes } from "react-icons/fa";
// import Button from "./Ui/Button";

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
        {/* می‌تونی اینجا آیکون هم بزاری */}
        {menuState ? (
          // <FaTimes className="text-white text-2xl" />
          <h1 className="text-white">بستن</h1>
        ) : (
          // <FaBars className="text-white text-2xl" />
          <h1 className="text-white">منو</h1>
        )}
      </div>

      {/* لیست آیتم‌های منو */}
      <ul
        data-testid="menu"
        className={`fixed top-20 left-0 w-full h-[90vh] flex flex-col justify-center items-center
          bg-[#a31621] text-white z-[1] transition-all duration-500 ease-in-out
          ${menuState ? "translate-x-0" : "translate-x-[-100%]"}
          md:static md:translate-x-0 md:w-[60vw] md:flex-row md:h-auto md:bg-transparent md:justify-end`}
      >
        {navItems.map((item) => (
          <li
            key={item.path}
            className={`list-none p-4 border-b-4 border-transparent transition-all duration-200 ease-out
              w-full text-center hover:bg-white hover:text-[#a31621]
              md:hover:bg-transparent md:hover:text-current md:hover:border-b-white
              ${isActive(item.path)
                ? "text-black font-bold bg-white md:bg-transparent"
                : ""
              }`}
          >
            <Link href={item.path} onClick={() => setMenuState(false)}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* اگر خواستی دکمه ثبت‌نام اضافه کنی */}
      {/* <Button to="/signIn" buttonStyle="outline">ثبت‌نام</Button> */}
    </>
  );
}
