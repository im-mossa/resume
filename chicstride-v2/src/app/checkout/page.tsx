// src/app/checkout/page.tsx
"use client";
import CheckoutForm from "../../ui/components/checkout/CheckoutForm";
import OrderSummary from "../../ui/components/checkout/OrderSummary";

export default function CheckoutPage() {
    const handleSubmit = (data: any) => {
        console.log("اطلاعات سفارش:", data);
        alert("سفارش شما ثبت شد! آماده اتصال به درگاه پرداخت...");
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
                <h1 className="text-2xl font-bold mb-4">تسویه حساب</h1>
                <CheckoutForm onSubmit={handleSubmit} />
            </div>
            <OrderSummary />
        </div>
    );
}
