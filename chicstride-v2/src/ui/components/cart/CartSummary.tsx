// src/ui/components/cart/CartSummary.tsx
import { useSelector } from "react-redux";

export default function CartSummary() {
    const items = useSelector((state: any) => state.cart.items);
    const total = items.reduce((sum: number, i: any) => sum + (i.price ?? 0) * i.quantity, 0);

    return (
        <div className="border rounded p-4 space-y-3">
            <h2 className="text-lg font-bold">خلاصه سفارش</h2>
            <p>تعداد اقلام: {items.length}</p>
            <p>جمع کل: {total} ریال</p>
            <button className="w-full bg-black text-white py-2 rounded">ادامه به پرداخت</button>
        </div>
    );
}
