// src/app/checkout/page.tsx
'use client';
import React from 'react';
import CheckoutForm from '../../ui/components/checkout/CheckoutForm';
import OrderSummary from '../../ui/components/checkout/OrderSummary';

/**
 * نوع پیشنهادی برای داده‌های فرم تسویه.
 * فیلدها را بر اساس ساختار واقعی فرم‌تان تنظیم کن.
 */
export type OrderFormData = {
  fullName: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  items?: { productId: string; quantity: number; price?: number }[];
  paymentMethod?: 'online' | 'cod' | string;
  [key: string]: unknown;
};

export default function CheckoutPage() {
  const handleSubmit = (data: OrderFormData) => {
    console.log('اطلاعات سفارش:', data);
    // اینجا می‌تونی فراخوانی API برای ایجاد سفارش، اعتبارسنجی بیشتر یا ناوبری بعد از پرداخت را انجام بدی
    alert('سفارش شما ثبت شد! آماده اتصال به درگاه پرداخت...');
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
