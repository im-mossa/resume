// src/app/layout.tsx
// @ts-ignore: allow side-effect css import without type declarations
import "../ui/styles/globals.css";
import Providers from "./providers";
import Header from "../ui/components/header/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fa" dir="rtl">
            <body>
                <Providers>
                    <Header showSearch />
                    <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
                </Providers>
            </body>
        </html>
    );
}
