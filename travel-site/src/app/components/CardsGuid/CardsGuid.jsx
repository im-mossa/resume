"use client";

import React from "react";
import CardItemTourism from "./CardItemTourism";

const cards = [
  {
    title: "دانستنی‌ها",
    text: "معرفی جذابیت‌های ایران و جهان",
  },
  {
    title: "جستجوی پیشرفته",
    text: "جستجوی تمامی مقاصد سفرهای شما",
  },
  {
    title: "راهنمای جامع گردش و تفریح",
    text: "راهنمای سفر به شهرهای ایران و جهان",
  },
];

function CardsGuid() {
  return (
    <section className="px-4 py-10 md:px-16 md:py-16 bg-white text-[#666]">
      <div className="max-w-[1120px] mx-auto flex flex-col items-center text-center">
        <h1 className="text-xl md:text-[26px] leading-relaxed">
          بهترین راهنمای، ایرانگردی، جهانگردی، خرید بلیط هواپیما، اخذ ویزا، رزرو هتل و مکان‌های اقامتی، مکان‌های گردشگری
        </h1>
        <p className="text-base md:text-[20px] font-bold mt-4">
          پورتال جامع گردش و سفر
        </p>

        <div className="mt-10 w-full">
          <ul className="flex flex-wrap justify-center gap-6">
            {cards.map((card, index) => (
              <CardItemTourism
                key={index}
                title={card.title}
                text={card.text}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default CardsGuid;
