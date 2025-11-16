// src/ui/components/categories/CategoryNode.tsx
"use client";
import { useState } from "react";
import { Category } from "../../../entities/category";
import Link from "next/link";

export default function CategoryNode({ category }: { category: Category }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="ml-4">
            <div className="flex items-center gap-2">
                {category.children && category.children.length > 0 && (
                    <button
                        onClick={() => setOpen(!open)}
                        className="text-sm text-blue-600"
                    >
                        {open ? "-" : "+"}
                    </button>
                )}
                <Link href={`/category/${category.id}`} className="text-gray-800 hover:underline">
                    {category.name}
                </Link>
            </div>
            {open && category.children && (
                <div className="ml-6 mt-2 space-y-1">
                    {category.children.map((child) => (
                        <CategoryNode key={child.id} category={child} />
                    ))}
                </div>
            )}
        </div>
    );
}
