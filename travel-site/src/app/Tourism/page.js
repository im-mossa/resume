"use client"; 

import Button from "app/components/Ui/Button";
import CardsGuid from "app/components/CardsGuid/CardsGuid";
import React from "react";

function Tourism() {
  const handleSubmit = (e) => {
    e.preventDefault(); // جلوگیری از رفرش
    // می‌تونی بعداً درخواست جستجو رو اینجا هندل کنی
  };

  return (
    <>
      <section
        className="relative w-full h-screen flex flex-col items-center justify-center text-center px-4 bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/images/tourism.jpg')" }}
        aria-label="بنر پورتال گردشگری"
      >
        <h1 className="text-3xl sm:text-4xl font-bold">پورتال جامع گردشگری و سفر</h1>
        <p className="text-lg sm:text-2xl mt-2">پورتال جامع گردشگری و سفر</p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2 sm:gap-3"
        >
          <input
            type="text"
            placeholder="جستجوی کشور، شهر و ..."
            className="w-full bg-white sm:w-[280px] h-16 px-4 rounded-md text-black placeholder:text-gray-500"
            aria-label="جستجوی مقصد سفر"
          />
          <Button
            buttonSize="medium"
            buttonStyle="searchPlace"
            to="/"
            className="h-16 w-full sm:w-auto"
          >
            جستجو
          </Button>
        </form>

        <div className="absolute inset-0 bg-black/30 -z-10" />
      </section>

      <CardsGuid />
    </>
  );
}

export default Tourism;
