import React from "react";
import Slideshow from "@/app/components/slideshow";
import CategorySection from "@/app/components/categorySection";
import ProductSection from "@/app/components/productSection";
export default function Home() {
    return (
        <div className="py-2">
        {/* slider */}
        <Slideshow />
        <CategorySection />
        <ProductSection />
        </div>
    )
}