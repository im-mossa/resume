"use client";

import React, { useState, useEffect } from "react";
import useSliderApi from "../api/sliderApi";

export default function Slideshow() {
  const { getAll } = useSliderApi();
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getAll((data) => setSlides(data));
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timeoutId = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [current, slides.length]);

  if (!slides.length) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <section className="relative overflow-hidden w-[80vw] mx-auto rounded-2xl">
      {/* رَپِر اسلایدها */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          width: `${slides.length * 80}vw`,
          transform: `translateX(+${current * 80}vw)`
        }}
      >
        {slides.map(({ id, image, title, subTitle }) => (
          <div
            key={id}
            className="relative flex-shrink-0 w-[80vw] h-[500px] max-[471px]:h-[300px]"
          >
            <img
              src={image}
              alt={title}
              title={title}
              className="w-full h-full object-cover"
            />

            {/* باکس عنوان در بالا چپ */}
            <div className="absolute top-0 left-0 bg-white/70 backdrop-blur-sm
                            rounded-br-2xl p-4 flex flex-col justify-start items-start z-20
                            w-[10em] h-[6em]">
              <h2 className="text-[1em] font-bold text-black">{title}</h2>
              <p className="mt-2 text-[1em] text-black">{subTitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* دکمه قبلی */}
      <button
        onClick={() => setCurrent((i) => (i - 1 + slides.length) % slides.length)}
        className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/70 text-white text-2xl z-10"
      >
        ‹
      </button>

      {/* دکمه بعدی */}
      <button
        onClick={() => setCurrent((i) => (i + 1) % slides.length)}
        className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/70 text-white text-2xl z-10"
      >
        ›
      </button>
    </section>
  );
}
