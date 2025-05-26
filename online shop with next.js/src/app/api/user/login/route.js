// src/app/api/auth/login/route.js
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import useUserApi from "@/app/hooks/useUserApi";
import { setCookie } from "@/app/utils/helpers";
import Swal from "sweetalert2";



export async function POST(request) {
  const { username, password, recaptchaToken } = await request.json();

  // ۱) اعتبارسنجی reCAPTCHA در گوگل
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const verifyRes = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchaToken}`,
    { method: "POST" }
  );
  const verifyJson = await verifyRes.json();
  const router = useRouter();
  const { login } = useUserApi();
  if (!verifyJson.success) {
    return NextResponse.json(
      { success: false, message: "reCAPTCHA validation failed." },
      { status: 400 }
    );
  }

  // ۲) اگر reCAPTCHA اوکی بود، درخواست را به API اصلی‌تان ارسال کنید
  //    فرض می‌کنیم API اصل شما یک endpoint POST روی https://api.example.com/login دارد

  try {
    await login({ username, password }, (data) => {
      const user = data[0];
      setCookie("currentUser", JSON.stringify(user), 5);
      setCookie("token", user.token, 5);
      Swal.fire({ icon: "success", title: "Welcome!" });
      router.push("/pages/panel");
    });
  } catch {
    // errors handled by useBaseApi
  }
  //   const apiRes = await fetch("https://api.example.com/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ username, password }),
  //   });

  // پاسخی که از API اصلی می‌آید را عینا برگردانید
  const apiJson = await apiRes.json();
  if (!apiRes.ok) {
    return NextResponse.json(
      { success: false, message: apiJson.message || "Login failed." },
      { status: apiRes.status }
    );
  }

  // ۳) لاگین موفق
  return NextResponse.json(
    { success: true, user: apiJson.user, token: apiJson.token },
    { status: 200 }
  );
}
