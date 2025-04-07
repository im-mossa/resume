import React from "react";
import CardItem from "./CardItem";
function Cards() {
  return (
    <div className="p-16 bg-white">
      <h1 className="text-center text-2xl">مقاصد برتر</h1>
      <div className="flex flex-col items-center max-w-[1120px] w-[90%] mx-auto">
        <div className="relative my-[45px] mt-[50px]">
          <ul className="lg:flex">
            <CardItem
              path="/"
              label="ناشناخته ها"
              src="/images/9.jpg"
              text="دیدن آبشار ناشناخته در دل جنگل آمازون"
            />
            <CardItem
              path="/AboutUs"
              label="ناشناخته ها"
              src="/images/8.jpg"
              text="کویری زیبا در قلب ایران"
            />
            <CardItem path='/AboutUs' label="لاکچری" src='/images/2.jpg' text='سفری خاطر انگیز در جزایر کارییب' />
            <CardItem path='/AboutUs' label="لاکچری" src='/images/1.jpg' text='آرامشی عمیق در رشته کوه های آلپ' />
            <CardItem path='/AboutUs' label="ناشناخته ها" src='/images/6.jpg' text='تجربه ای متفاوت از گردش در یک شهر' />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
