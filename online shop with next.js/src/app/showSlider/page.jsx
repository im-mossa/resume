// src/app/showSlider/page.jsx
"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CategorySection from "@/app/components/CategorySection";
import ItemSection from "@/app/components/ItemSection";
import useSliderApi from "@/app/api/sliderApi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ShowSliderPage() {
  const searchParams = useSearchParams();
  const slideId = searchParams.get("id");

  const { getById } = useSliderApi();
  const [slide, setSlide] = useState(null);
  const [loading, setLoading] = useState(true);

  // بارگذاری اسلاید با id
  useEffect(() => {
    if (!slideId) return;
    let isMounted = true;
    setLoading(true);
    getById(slideId, (dataList) => {
      if (!isMounted) return;
      const data = Array.isArray(dataList) ? dataList[0] : null;
      setSlide(data);
      setLoading(false);
    });
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideId]);

  if (loading) {
    return (
      <Suspense
        fallback={<div className="py-20 text-center">Loading product...</div>}
      >
        <main>
          <CategorySection />
          <section className="max-w-4xl mx-auto px-4 py-6 flex justify-center">
            {/* اسکلتون با کلاس‌های یکسان با ItemSection */}
            <div className="relative flex-shrink-0 w-[160px] sm:w-[180px] md:w-[205px] h-[250px] overflow-hidden rounded-[15px] shadow-[1px_1px_5px_0_#bbb]">
              <Skeleton className="w-full h-[200px] object-cover" />
              <div className="px-2 py-2 text-center">
                <Skeleton width="80%" height={20} />
              </div>
            </div>
          </section>
        </main>
      </Suspense>
    );
  }

  if (!slide) {
    return <div className="py-20 text-center">Slide not found.</div>;
  }

  return (
    <main>
      <CategorySection />
      <section className="max-w-4xl mx-auto px-4 py-6 flex justify-center">
        <ItemSection id={slide.id} title={slide.title} image={slide.image} />
      </section>
    </main>
  );
}
