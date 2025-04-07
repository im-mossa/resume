import React from "react";
import Button from "../Ui/Button";

function CategoryCards() {
  const info = [
    { text: "همه ی تور ها", key: "01" },
    { text: "تورهای داخلی", key: "02" },
    { text: "تورهای خارجی", key: "03" },
    { text: "تور یک روزه", key: "04" },
    { text: "تور چند روزه", key: "05" },
    { text: "تور طبیعت گردی", key: "06" },
    { text: "تور ماجراجویانه", key: "07" },
    { text: "تور لوکس", key: "08" },
    { text: "تور آفر دار", key: "09" },
    { text: "تور لحظه ی آخری", key: "10" },
    { text: "تور آموزشی", key: "11" },
    { text: "تور نمایشگاهی", key: "12" },
    { text: "تور سافاری", key: "13" },
    { text: "تور کودکان", key: "14" },
    { text: "تور تاریخی و فرهنگی", key: "15" },
    { text: "تور کوه نوردی", key: "16" },
    { text: "تور کویر گردی", key: "17" },
    { text: "تور زیارتی", key: "18" },
  ];

  return (
    <>
      <div className="bg-[#7ec856] p-4 md:p-16">
        <div className="max-w-[1120px] w-full md:w-[90%] mx-auto flex flex-col items-center">
          <div className="relative my-6 md:my-[50px]">
            <ul className="flex flex-wrap justify-center gap-3 md:gap-6 w-full mx-auto">
              {info.map((item) => (
                <li
                  key={item.key}
                  className="w-full sm:w-[45%] md:w-[30%] lg:w-[20%] p-3 text-center bg-[#66a83f] 
                    rounded-lg transition-all duration-300 hover:cursor-pointer 
                    hover:shadow-[inset_0_0_0_1000px_rgba(0,0,0,0.2)]"
                >
                  <a href="/" className="block py-3 text-white no-underline">
                    <h5 className="text-sm md:text-lg">{item.text}</h5>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* تورها */}
      <div className="flex flex-col items-center max-w-[1120px] w-[90%] mx-auto my-6">
        <div className="bg-white rounded-lg shadow-lg">
          <header className="flex justify-between items-center bg-[#f6f7fb] px-4 py-6 border-b border-[#eceffa] rounded-t-lg shadow">
            <div className="text-[#666] text-lg font-bold">تور</div>
            <div className="flex items-center text-[#666] text-sm">
              مرتب شده بر اساس
              <select className="ml-2 px-4 py-2 border border-[#e1e1e1] rounded-full">
                <option value="newest">جدیدترین</option>
                <option value="cheapest">ارزان‌ترین</option>
                <option value="viewCount">پربازدیدترین</option>
              </select>
            </div>
          </header>

          <div className="p-6 text-center">
            <ul className="list-none">
              <li className="p-4 mb-4 border border-transparent shadow-md hover:border-[#11a4d2] hover:shadow-lg transition">
                <a
                  href="/"
                  className="flex flex-col md:flex-row justify-between items-center text-[#666] no-underline"
                >
                  <span className="text-blue-600">تور کیش 2 روز و 3 شب</span>
                  <p className="mt-2 md:mt-0">از 1/600/000 هزار تومان</p>
                  <p className="mt-2 md:mt-0">شرکت خدمات سفر کیوان</p>
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <Button buttonSize="large" buttonStyle="tour" to="/">
                تورهای بیشتر
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryCards;
