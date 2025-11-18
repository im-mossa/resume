// src/ui/components/product/VariantSelector.tsx
'use client';
import { ProductVariant } from '../../../entities/product';
import { useState } from 'react';

export default function VariantSelector({
  variants,
  onSelect,
}: {
  variants: ProductVariant[];
  onSelect: (v: ProductVariant | null) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const pick = (id: string) => {
    setSelected(id);
    onSelect(variants.find((v) => v.id === id) ?? null);
  };
  if (!variants.length) return null;
  return (
    <div className="space-y-2">
      <div className="text-sm text-gray-700">انتخاب واریانت:</div>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => (
          <button
            key={v.id}
            onClick={() => pick(v.id)}
            className={`px-3 py-1 border rounded ${selected === v.id ? 'bg-black text-white' : ''}`}
          >
            {v.size ?? v.color ?? v.sku}
          </button>
        ))}
      </div>
    </div>
  );
}
