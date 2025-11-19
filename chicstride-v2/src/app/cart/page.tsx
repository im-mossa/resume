// src/app/cart/page.tsx
'use client';

import { useSelector } from 'react-redux';
import CartItem from '../../ui/components/cart/CartItem';
import CartSummary from '../../ui/components/cart/CartSummary';
import { RootState } from '../../store';

// جلوگیری از prerender در زمان build
export const dynamic = 'force-dynamic';

export default function CartPage() {
  const items = useSelector((state: RootState) => state.cart.items);

  if (!items.length) {
    return <div className="text-gray-600">سبد خرید شما خالی است.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        {items.map((item) => (
          <CartItem key={item.id + (item.variant?.id ?? '')} item={item} />
        ))}
      </div>
      <CartSummary />
    </div>
  );
}
