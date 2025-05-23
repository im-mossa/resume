// import "react-loading-skeleton/dist/skeleton.css";
import "./globals.css";
import MenuItems from "./components/MenuItems";
import FooterSection from "./components/FooterSection";
import ThemeToggle from "./components/ThemeToggle";
// import Link from "next/link";

export const metadata = {
  title: "Travel Site",
  description: "A simple travel site built with Next.js",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="rtl">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
          crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/react-loading-skeleton@3.5.0/dist/skeleton.css"
        />
      </head>
      <body className="transition-colors duration-300">
        {/* نوار ناوبری به صورت fixed */}
        <header
          data-testid="header"
          className="border-b border-gray-200 fixed top-0 left-0 w-full z-20 transition-transform duration-70 ease-out animate-slide-down"
        >
          <nav className="h-20 flex justify-center items-center text-xl bg-cover bg-center header-section">
            <div className="flex justify-center items-center h-20 max-w-[1500px] mx-auto">
              {/* <Link
                href="/"
                className="text-black leading-10 ml-5 cursor-pointer no-underline text-2xl flex items-center"
              >
                Travel &nbsp;
              </Link> */}
              <ThemeToggle />
              <MenuItems />
            </div>
          </nav>
        </header>

        {/* افزودن padding-top به main به دلیل وجود نوار ناوبری fixed */}
        <main className="flex-1 pt-20" data-testid="main">
          {children}
        </main>

        <footer data-testid="footer">
          <FooterSection />
        </footer>
      </body>
    </html>
  );
}
