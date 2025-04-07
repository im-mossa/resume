import React from "react";
import Button from "../Ui/Button";
import Link from "next/link";
import { FaTypo3 } from "react-icons/fa";

function Footer() {
  const footerLinks = [
    {
      title: "درباره ما",
      links: [
        { label: "موقعیت های شغلی", href: "/" },
        { label: "تماس با ما", href: "/" },
        { label: "همکاری با ما", href: "/" },
      ],
    },
    {
      title: "راهنما",
      links: [
        { label: "نقشه ی سایت", href: "/" },
        { label: "سوال های متداول", href: "/" },
        { label: "حریم شخصی", href: "/" },
      ],
    },
    {
      title: "رزرو",
      links: [
        { label: "رزرو هتل", href: "/" },
        { label: "رزرو بلیط هواپیما", href: "/" },
        { label: "رزرو بلیط قطار", href: "/" },
      ],
    },
    {
      title: "شبکه های اجتماعی",
      links: [
        { label: "اینستاگرام", href: "/" },
        { label: "توییتر", href: "/" },
        { label: "لینکدین", href: "/" },
      ],
    },
  ];

  return (
    <div className="bg-[#a31621] py-4 flex flex-col items-center">
      <section className="w-full max-w-xl text-center mb-6 px-6 text-white">
        <h2 className="mb-6 text-xl">
          به خبرنامه ی ما بپیوندید تا از آفر های تور های ایرانگردی و جهانگردی با
          خبر شوید
        </h2>
        <p className="mb-6 text-lg">
          هر زمان که بخواهید می‌توانید عضویت خود را لغو نمایید
        </p>
        <form action="" method="post" className="flex flex-col items-center">
          <input
            type="email"
            placeholder="لطفا ایمیل خود را وارد کنید"
            className="w-full px-5 py-2 mb-4 border border-[#cccccc] rounded outline-none placeholder-[#b1b1b1]"
          />
          <Button buttonStyle="outline" to="/" buttonSize="medium">
            عضویت
          </Button>
        </form>
      </section>
      <div className="w-full max-w-[1000px] flex flex-wrap justify-center">
        {footerLinks.map((section, index) => (
          <div key={index} className="m-4 w-[160px] text-left">
            <h2 className="mb-4 text-white">{section.title}</h2>
            <ul>
              {section.links.map((link, idx) => (
                <li key={idx} className="mb-2">
                  <Link
                    href={link.href}
                    className="text-white no-underline hover:text-black transition duration-300 ease-out"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <section className="w-full max-w-[1000px]">
        <div className="flex flex-col justify-between items-center w-[90%] max-w-[1000px] mt-10 mx-auto">
          <div>
            <Link
              href="/"
              className="text-white ml-5 cursor-pointer no-underline text-2xl flex items-center mb-1"
            >
              Travel &nbsp;<FaTypo3 />
            </Link>
          </div>
          <small className="text-white mb-4 ml-8">Travel &copy; 2025</small>
          {/* <div className="flex justify-between items-center w-[240px]">
            <Link href='/' className="text-[#666] text-[24px]">
            <i className="fab fa-facebook-f"></i></Link>
          </div> */}
        </div>
      </section>
    </div>
  );
}

export default Footer;
