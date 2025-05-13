// src/app/panel/page.jsx
"use client";

import React from "react";
import PanelSection from "@/app/components/PanelSection";

export default function PanelPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6">
        Dashboard
      </h2>
      <PanelSection />
    </main>
  );
}
