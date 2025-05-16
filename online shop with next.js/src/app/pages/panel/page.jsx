// src/app/panel/page.jsx
"use client";

import React from "react";
import PanelSection from "@/app/components/PanelSection";

export default function PanelPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <h2 className="text-2xl font-semibold text-gray-700  mb-6">
        Dashboard
      </h2>
      <PanelSection />
    </main>
  );
}
