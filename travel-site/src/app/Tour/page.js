"use client";

import React from "react";
import Button from "app/components/Ui/Button";
import CategoryCards from "app/components/CategoryCards/CategoryCards";

function Tour() {
  return (
    <>
      <section className="h-screen w-full flex flex-col items-center justify-center text-center text-white bg-[url('/images/8.jpg')] bg-cover bg-center px-4 shadow-[inset_0_0_0_1000px_rgba(0,0,0,0.2)]">
        <div className="max-w-xl w-full flex flex-col sm:flex-row items-center gap-4 mt-6">
          <input
            type="text"
            placeholder="نام کشور، شهر و ..."
            className="w-full h-16 px-4 rounded text-black bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <Button
            buttonSize="medium"
            buttonStyle="searchPlace"
            to="/"
            className="h-16 w-full sm:w-auto px-6 rounded bg-blue-600 hover:bg-blue-700 transition text-white"
          >
            جستجو
          </Button>
        </div>
      </section>

      <CategoryCards />
    </>
  );
}

export default Tour;
