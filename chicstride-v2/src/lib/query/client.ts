// src/lib/query/client.ts
"use client";
import { QueryClient } from "@tanstack/react-query";

export function createQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60_000,
                retry: (failureCount, error: any) => {
                    const status = error?.response?.status;
                    if (status && status >= 400 && status < 500) return false;
                    return failureCount < 2;
                },
            },
        },
    });
}
