"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTimes, FaBars } from "react-icons/fa";
// import Button from "./Ui/Button";

export default function MenuItems() {
  const [menuState, setMenuState] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <>
      <div
        data-testid="button"
        className="block md:hidden absolute top-4 left-4 cursor-pointer z-20"
        onClick={() => setMenuState(!menuState)}
      >
        {menuState ? (
          <FaTimes className="text-white" />
        ) : (
          <FaBars className="text-white" />
        )}
      </div>

      <ul
        data-testid="menu"
        className={`fixed top-20 left-0 w-full h-[90vh] flex flex-col justify-center items-center bg-[#a31621] text-white z-[1] transition-all duration-500 ease-in-out ${
          menuState ? "translate-x-0" : "translate-x-[-100%]"
        } md:static md:translate-x-0 md:w-[60vw] md:flex-row md:h-auto md:bg-transparent md:justify-end`}
      >
        {[
          { name: "صفحه اصلی", path: "/" },
          { name: "گردشگری", path: "/Tourism" },
          { name: "تور", path: "/Tour" },
          { name: "درباره ما", path: "/AboutUs" },
          { name: "ثبت نام", path: "/SignUp" },
        ].map((item) => (
          <li
            key={item.path}
            className={`list-none p-4 border-b-4 border-transparent transition-all duration-200 ease-out w-full text-center hover:bg-white hover:text-[#a31621] md:hover:bg-transparent md:hover:text-current md:hover:border-b-white active:text-blue-700 md:active:text-red-700 ${
              isActive(item.path) ? "text-black font-bold" : ""
            }`}
          >
            <Link href={item.path} onClick={() => setMenuState(false)}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      {/* <Button to='/signIn' buttonStyle='outline' >ثبت نام</Button> */}
    </>
  );
}
