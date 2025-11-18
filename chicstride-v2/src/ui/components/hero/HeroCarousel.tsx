// src/ui/components/hero/HeroCarousel.tsx
'use client';
import { Slide } from '../../../entities/slide';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroCarousel({ slides }: { slides: Slide[] }) {
  if (!slides.length) return <div className="h-48 bg-gray-100 rounded" />;
  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {slides.map((s) => {
          const href =
            s.targetType === 'product'
              ? `/product/${s.targetValue}`
              : s.targetType === 'category'
                ? `/category/${s.targetValue}`
                : s.targetType === 'url'
                  ? (s.targetValue ?? '#')
                  : '#';

          return (
            <Link key={s.id} href={href} className="block rounded overflow-hidden border">
              {s.image ? (
                <div className="w-full h-64 relative">
                  <Image
                    src={s.image}
                    alt={s.title ?? ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ) : (
                <div className="h-64 bg-gray-200" />
              )}
              <div className="p-3">
                <h3 className="font-semibold">{s.title}</h3>
                {s.subtitle && <p className="text-sm text-gray-600">{s.subtitle}</p>}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
