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
          <h1 className="text-black">بستن</h1>
        ) : (
          // <FaBars className="text-white text-2xl" />
          <h1 className="text-black">منو</h1>
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
              ${isActive(item.path)
                ? "text-black font-bold"
                : ""
              }`}
          >
            <Link href={item.path} onClick={() => setMenuState(false)}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul>
        <li><a href="basket.html"><i className="fa fa-shopping-cart text-black text-[16px] absolute right-[15px] top-1/3 hover:scale-125 transition-transform"></i></a></li>
        <li><a href="#" onClick={() => checkUser()}><i className="fa fa-user text-black text-[16px] absolute right-[45px] top-1/3 hover:scale-125 transition-transform"></i></a></li>
      </ul>

      {/* اگر خواستی دکمه ثبت‌نام اضافه کنی */}
      {/* <Button to="/signIn" buttonStyle="outline">ثبت‌نام</Button> */}
    </>
  );
}
