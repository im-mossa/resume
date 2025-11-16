"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "../lib/query/client";
import { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../store";

export default function Providers({ children }: { children: ReactNode }) {
    const [client] = useState(() => createQueryClient());

    return (
        <Provider store={store}>
            <QueryClientProvider client={client}>
                {children}
            </QueryClientProvider>
        </Provider>
    );
}
