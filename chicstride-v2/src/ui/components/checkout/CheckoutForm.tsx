// src/ui/components/checkout/CheckoutForm.tsx
'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  fullName: z.string().min(3, 'نام کامل الزامی است'),
  email: z.string().email('ایمیل معتبر وارد کنید'),
  phone: z.string().min(10, 'شماره تلفن معتبر وارد کنید'),
  address: z.string().min(10, 'آدرس کامل وارد کنید'),
});

type FormData = z.infer<typeof schema>;

export default function CheckoutForm({ onSubmit }: { onSubmit: (data: FormData) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">نام کامل</label>
        <input {...register('fullName')} className="w-full border rounded px-3 py-2" />
        {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">ایمیل</label>
        <input {...register('email')} className="w-full border rounded px-3 py-2" />
        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">شماره تلفن</label>
        <input {...register('phone')} className="w-full border rounded px-3 py-2" />
        {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">آدرس</label>
        <textarea {...register('address')} className="w-full border rounded px-3 py-2" />
        {errors.address && <p className="text-red-600 text-sm">{errors.address.message}</p>}
      </div>
      <button type="submit" className="w-full bg-black text-white py-2 rounded">
        ثبت سفارش
      </button>
    </form>
  );
}
