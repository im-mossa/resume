// src/ui/components/cart/CartItem.tsx
"use client";
import { useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../../../store/cartSlice";

export default function CartItem({ item }: { item: any }) {
    const dispatch = useDispatch();

    return (
        <div className="flex items-center gap-4 border-b py-3">
            {item.image ? (
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
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
                            dispatch(updateQuantity({ id: item.id, variantId: item.variant?.id, quantity: Number(e.target.value) }))
                        }
                        className="w-16 border rounded px-2 py-1"
                    />
                    <button
                        onClick={() => dispatch(removeItem({ id: item.id, variantId: item.variant?.id }))}
                        className="text-red-600 text-sm"
                    >
                        حذف
                    </button>
                </div>
            </div>
        </div>
    );
}
