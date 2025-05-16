// src/app/components/CheckoutForm.jsx
"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import BasketDB from "../db/BasketDB";
import { getCookie } from "../utils/helpers";
import useTransactionApi from "../hooks/useTransactionApi";

export default function CheckoutForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
    postalCode: "",
    address: "",
  });
  const { goToPayment } = useTransactionApi(); // ⚠️ هوک را اینجا صدا می‌زنیم

  // پر کردن فرم از کوکی
  useEffect(() => {
    const json = getCookie("currentUser");
    if (!json) return;
    try {
      const user = JSON.parse(json);
      setFormData((p) => ({
        ...p,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username || "",
        phone: user.phone || "",
        postalCode: user.postalCode || "",
        address: user.address || "",
      }));
    } catch {
      // اگر کوکی خراب بود
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleGoToPayment = async () => {
    // اعتبارسنجی
    const allFilled = Object.values(formData).every((v) => v.trim() !== "");
    if (!allFilled) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "لطفاً همه‌ی فیلدها را پر کنید.",
      });
    }

    // آماده‌سازی آیتم‌های سبد
    const basketList = BasketDB.load() || [];
    const items = basketList.map((b) => ({
      id: b.id,
      product: {
        id: b.id,
        title: b.title || "string",
        image: b.image || "string",
        description: "string",
        addDate: "string",
        visitCount: 0,
        price: b.price || 0,
        category: { id: 0, title: "string", image: "string" },
        colors: [
          {
            id: b.colorId,
            title: b.colorTitle?.trim() || "string",
            hexValue: b.colorHex || "string",
          },
        ],
        sizes: [{ id: b.sizeId, title: b.sizeTitle || "string" }],
      },
      quantity: b.qty,
      unitPrice: b.price,
    }));

    const payload = { user: formData, items };
    const token = getCookie("token") || "";

    try {
      const resp = await goToPayment(payload, token);
      if (Array.isArray(resp) && resp[0]) {
        window.location.href = resp[0];
      } else {
        throw new Error("Invalid server response");
      }
    } catch (err) {
      console.error("Payment failed", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "پرداخت ناموفق بود.",
      });
    }
  };

  return (
    <section className="max-w-md mx-auto my-6 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-6">Check Out</h2>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {[
          { label: "First Name", name: "firstName" },
          { label: "Last Name", name: "lastName" },
          { label: "User Name", name: "username" },
          { label: "Password", name: "password", type: "password" },
          { label: "Phone", name: "phone" },
          { label: "Postal Code", name: "postalCode" },
          { label: "Address", name: "address" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name} className="flex flex-col">
            <label htmlFor={name} className="mb-1">
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              value={formData[name]}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 rounded"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={handleGoToPayment}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Go To Payment
        </button>
      </form>
    </section>
  );
}
