// src/ui/components/checkout/OrderSummary.tsx
import { useSelector } from "react-redux";

export default function OrderSummary() {
    const items = useSelector((state: any) => state.cart.items);
    const total = items.reduce((sum: number, i: any) => sum + (i.price ?? 0) * i.quantity, 0);

    return (
        <div className="border rounded p-4 space-y-3">
            <h2 className="text-lg font-bold">خلاصه سفارش</h2>
            <ul className="space-y-2">
                {items.map((i: any) => (
                    <li key={i.id + (i.variant?.id ?? "")} className="flex justify-between text-sm">
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
