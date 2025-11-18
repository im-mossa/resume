// src/ui/components/checkout/OrderSummary.tsx
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

export default function OrderSummary() {
  // استفاده از RootState برای تایپ state
  const items = useSelector((state: RootState) => state.cart.items as CartItem[]);
  const total = items.reduce((sum: number, i: CartItem) => sum + (i.price ?? 0) * i.quantity, 0);

  return (
    <div className="border rounded p-4 space-y-3">
      <h2 className="text-lg font-bold">خلاصه سفارش</h2>
      <ul className="space-y-2">
        {items.map((i: CartItem) => (
          <li key={i.id + (i.variant?.id ?? '')} className="flex justify-between text-sm">
            <span>
              {i.name} × {i.quantity}
            </span>
            <span>{i.price ?? 0} ریال</span>
          </li>
        ))}
      </ul>
      <p className="font-semibold">جمع کل: {total} ریال</p>
    </div>
  );
}
