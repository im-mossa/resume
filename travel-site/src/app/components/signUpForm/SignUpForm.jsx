"use client";

import React from "react";
import Button from "../Ui/Button";

function SignUpForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // هندل ثبت‌نام یا ارسال فرم را اینجا پیاده کن
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded shadow-md p-6 flex flex-col items-center space-y-6"
    >
      <input
        type="text"
        placeholder="نام و نام خانوادگی"
        autoComplete="off"
        required
        className="w-full max-w-md px-4 py-3 border border-[#e1e5ee] rounded shadow-sm text-[#666] text-base outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="tel"
        placeholder="شماره همراه"
        autoComplete="off"
        required
        className="w-full max-w-md px-4 py-3 border border-[#e1e5ee] rounded shadow-sm text-[#666] text-base outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="email"
        placeholder="ایمیل"
        autoComplete="off"
        required
        className="w-full max-w-md px-4 py-3 border border-[#e1e5ee] rounded shadow-sm text-[#666] text-base outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password"
        placeholder="رمز عبور"
        autoComplete="off"
        required
        className="w-full max-w-md px-4 py-3 border border-[#e1e5ee] rounded shadow-sm text-[#666] text-base outline-none focus:ring-2 focus:ring-blue-400"
      />
      <Button buttonSize="medium" buttonStyle="tour" to="/">
        ثبت نام
      </Button>
    </form>
  );
}

export default SignUpForm;
