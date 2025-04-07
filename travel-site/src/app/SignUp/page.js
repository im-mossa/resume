import React from "react";
import SignUpForm from "app/components/signUpForm/SignUpForm";

function SignUp() {
  return (
    <section
      className="relative h-screen w-full flex flex-col items-center justify-center text-center bg-[url('/images/home.jpg')] bg-cover bg-center px-4 shadow-[inset_0_0_0_1000px_rgba(0,0,0,0.2)]"
      aria-label="فرم عضویت"
    >
      {/* لایه تیره برای افزایش کنتراست */}
      <div className="absolute inset-0 bg-black/40 -z-10" />
      <SignUpForm />
    </section>
  );
}

export default SignUp;
