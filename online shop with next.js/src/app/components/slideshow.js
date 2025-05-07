// src/components/Slideshow.jsx
"use client";

import React, { useState, useEffect } from "react";
import useSliderApi from "../api/sliderApi";

export default function Slideshow() {
  const { getAll } = useSliderApi();
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load data
  useEffect(() => {
    getAll((data) => setSlides(data));
  }, [getAll]);

  // Auto slide
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentIndex, slides.length]);

  if (slides.length === 0) return null; // or loader

  return (
    <section>
      <div
        className="relative w-[98%] h-[500px] bg-black my-[20px] mx-auto shadow-[0_3px_6px_rgba(0,0,0,0.4)] rounded-[15px]
          max-[471px]:w-[350px] max-[471px]:h-[300px] overflow-hidden"
      >
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="w-full flex-shrink-0 relative h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover rounded-[15px]"
              />
              <div
                className="absolute bg-white/60 py-[30px] px-[60px] text-left text-[26px] font-bold rounded-[15px_0_15px_0]"
              >
                {slide.title}
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          onClick={() =>
            setCurrentIndex((currentIndex - 1 + slides.length) % slides.length)
          }
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-2xl p-[10px] bg-black/50 rounded-full hover:bg-black/70"
        >
          &larr;
        </button>
        <button
          onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-2xl p-[10px] bg-black/50 rounded-full hover:bg-black/70"
        >
          &rarr;
        </button>
      </div>
    </section>
  );
}