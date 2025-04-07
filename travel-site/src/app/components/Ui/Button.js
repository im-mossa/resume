"use client";

// import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';

const styles = {
    primary: "bg-primary text-[#242424] border border-primary",
    outline: "bg-transparent text-white px-5 py-2 border border-primary transition-all duration-300 ease-out",
    special: "bg-primary text-[#666666] border border-[#cccccc]",
    search: "bg-[#ffc52b] text-white border border-[#ffc52b] shadow-[2px_2px_30px_rgba(255,197,43,0.35)]",
    searchPlace: "border-0 px-5 py-5 rounded-[5px] bg-[#7ec856] text-white text-sm border border-[#7ec856] shadow-[0_0_20px_rgba(24,104,188,0.07)]",
    tour: "px-14 py-5 bg-[#4186f7] inline-block text-white rounded-[5px] text-sm break-all",
};

const size = {
  medium: "px-5 py-2 text-base",
  large: "px-6 py-3 text-lg",
};

function Button({ to, children, buttonStyle, buttonSize }) {
  const router = useRouter();

  const currentBtnStyle = styles[buttonStyle] || styles.primary;
  const currentBtnSize = size[buttonSize] || size.medium;

  return (
    // <Link href={to}>
      <button
        onClick={() => router.push(to)}
        className={`${currentBtnStyle} ${currentBtnSize}`}>
        {children}
      </button>
    // </Link>
  );
}

export default Button;