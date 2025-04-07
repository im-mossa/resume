import "./globals.css";
import { FaTypo3 } from "react-icons/fa";
import MenuItems from "./components/MenuItems";
import Footer from "./components/Footer/Footer";
import Link from "next/link";

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
      <body>
        {/* نوار ناوبری به صورت fixed */}
        <header data-testid="header" className="fixed top-0 left-0 w-full z-20">
          <nav className="bg-[#a31621] h-20 flex justify-center items-center text-xl bg-cover bg-center">
            <div className="flex justify-center items-center h-20 max-w-[1500px] mx-auto">
              <Link
                href="/"
                className="text-white leading-10 ml-5 cursor-pointer no-underline text-2xl flex items-center"
              >
                Travel &nbsp;<FaTypo3 />
              </Link>
              <MenuItems />
            </div>
          </nav>
        </header>

        {/* افزودن padding-top به main به دلیل وجود نوار ناوبری fixed */}
        <main className="flex-1 pt-20" data-testid="main">
          {children}
        </main>

        <footer data-testid="footer">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
