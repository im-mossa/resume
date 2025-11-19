// src/ui/components/cart/CartItem.tsx
'use client';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../../../store/cartSlice';
import Image from 'next/image';

type CartItemVariant = {
  id?: string | null;
  size?: string | null;
  color?: string | null;
  sku?: string | null;
};

export type CartItemType = {
  id: string;
  name: string;
  price: number | null;
  quantity: number;
  image?: string | null;
  variant?: CartItemVariant | null;
};

export default function CartItem({ item }: { item: CartItemType }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-4 border-b py-3">
      {item.image ? (
        <div className="w-20 h-20 relative rounded overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            width={80}
            height={80}
            className="object-cover rounded"
          />
        </div>
      ) : (
        <div className="w-20 h-20 bg-gray-200 rounded" />
      )}
      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        {item.variant && (
          <p className="text-sm text-gray-600">
            {item.variant.size ?? item.variant.color ?? item.variant.sku}
          </p>
        )}
        <p className="text-sm text-gray-700">قیمت: {item.price ?? 0} ریال</p>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="number"
            value={item.quantity}
            min={1}
            onChange={(e) =>
              dispatch(
                updateQuantity({
                  id: item.id,
                  variantId: item.variant?.id || undefined,
                  quantity: Number(e.target.value),
                })
              )
            }
            className="w-16 border rounded px-2 py-1"
          />
          <button
            onClick={() =>
              dispatch(removeItem({ id: item.id, variantId: item.variant?.id || undefined }))
            }
            className="text-red-600 text-sm"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
