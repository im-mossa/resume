// src/ui/components/cart/CartSummary.tsx
'use client';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store'; // فرض بر این است که RootState در store تعریف شده است

type CartItem = {
  id: string;
  name: string;
  price?: number;
  quantity: number;
  image?: string;
  variant?: {
    id?: string;
    size?: string;
    color?: string;
    sku?: string;
  };
};

export default function CartSummary() {
  // استفاده از RootState برای تایپ state
  const items = useSelector((state: RootState) => state.cart.items as CartItem[]);
  const total = items.reduce((sum: number, i: CartItem) => sum + (i.price ?? 0) * i.quantity, 0);

  return (
    <div className="border rounded p-4 space-y-3">
      <h2 className="text-lg font-bold">خلاصه سفارش</h2>
      <p>تعداد اقلام: {items.length}</p>
      <p>جمع کل: {total} ریال</p>
      <button className="w-full bg-black text-white py-2 rounded">ادامه به پرداخت</button>
    </div>
  );
}
