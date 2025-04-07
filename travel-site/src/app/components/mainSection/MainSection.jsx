import React from "react";
import Button from "../Ui/Button";

function MainSection() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center shadow-[inset_0_0_0_1000px_rgba(0,0,0,0.2)] font-[Yekan] text-center relative">
      {/* ویدیو در پس‌زمینه */}
      <video className="absolute top-0 left-0 object-cover w-full h-full z-[-1]" autoPlay loop muted>
        <source src="/videos/1.mp4" type="video/mp4" />
        مرورگر شما از ویدیو پشتیبانی نمی‌کند.
      </video>
      <div className="mt-8 px-4 py-8 bg-white rounded shadow-lg">
        <input
          type="text"
          name="search"
          id="search-bar"
          placeholder="جست و جوی مکان, شهر, کشور و ..."
          className="w-full max-w-[400px] md:max-w-[544px] lg:max-w-[744px] py-3.5 px-4 border border-[#e1e5ee] rounded-md shadow-[0_6px_20px_rgba(24,104,188,0.07)] pr-4 text-[#666] text-[17px] focus:outline-none"
        />
        <div className="mt-4">
          <Button to="/AboutUs" buttonStyle="search">
            جستجو
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MainSection;

