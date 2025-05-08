import React from "react";
import Slideshow from "@/app/components/slideshow";
import CategorySection from "@/app/components/categorySection";
export default function Home() {
    return (
        <div className="pt-2">
        {/* slider */}
        <Slideshow />
        <CategorySection />
            <h1>this page is home</h1>
        </div>
    )
}