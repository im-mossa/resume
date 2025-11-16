// src/ui/components/catalog/Pagination.tsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ totalPages }: { totalPages: number }) {
    const router = useRouter();
    const params = useSearchParams();
    const page = Number(params.get("page") ?? 1);

    const go = (p: number) => {
        const url = new URL(window.location.href);
        url.searchParams.set("page", String(p));
        router.push(url.pathname + "?" + url.searchParams.toString());
    };

    if (totalPages <= 1) return null;

    return (
        <div className="mt-6 flex gap-2">
            <button disabled={page <= 1} onClick={() => go(page - 1)} className="px-3 py-1 border rounded disabled:opacity-50">قبلی</button>
            <span className="px-2 py-1">صفحه {page} از {totalPages}</span>
            <button disabled={page >= totalPages} onClick={() => go(page + 1)} className="px-3 py-1 border rounded disabled:opacity-50">بعدی</button>
        </div>
    );
}
