import React from "react";
import Slideshow from "@/app/components/Slideshow";
import CategorySection from "@/app/components/CategorySection";
import ProductSection from "@/app/components/ProductSection";
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