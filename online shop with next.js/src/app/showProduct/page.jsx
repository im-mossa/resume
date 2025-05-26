// src/app/panel/page.jsx
import React, { Suspense } from "react";
import ShowProductSection from "@/app/components/ShowProductSection";

export default function PanelPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading product...</div>}>
      <ShowProductSection />
    </Suspense>
  );
}
