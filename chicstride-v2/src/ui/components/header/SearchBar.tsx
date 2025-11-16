// src/ui/components/header/SearchBar.tsx
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ placeholder = "جستجو..." }: { placeholder?: string }) {
    const router = useRouter();
    const [q, setQ] = useState("");

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const query = q.trim();
        if (!query) return;
        router.push(`/search?query=${encodeURIComponent(query)}`);
    };

    return (
        <form onSubmit={onSubmit} className="flex gap-2 w-full max-w-xl">
            <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={placeholder}
                className="flex-1 border rounded px-3 py-2"
            />
            <button type="submit" className="px-4 py-2 rounded bg-black text-white">جستجو</button>
        </form>
    );
}
