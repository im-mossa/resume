// src/ui/components/hero/HeroCarousel.tsx
'use client';
import { Slide } from '../../../entities/slide';
import Link from 'next/link';

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

          // اطمینان از اینکه URL معتبر است
          const imageUrl = s.image || null;
          
          return (
            <Link key={s.id} href={href} className="block rounded overflow-hidden border">
              {imageUrl ? (
                <div className="w-full h-64 relative overflow-hidden bg-gray-100">
                  <img
                    src={imageUrl}
                    alt={s.title ?? ''}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      console.error('HeroCarousel Image load error for slide:', s.id);
                      console.error('Image URL:', imageUrl);
                      console.error('Slide data:', s);
                      // نمایش placeholder در صورت خطا
                      const target = e.target as HTMLImageElement;
                      if (target) {
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">تصویر در دسترس نیست</div>';
                        }
                      }
                    }}
                    onLoad={() => {
                      console.log('HeroCarousel Image loaded successfully:', imageUrl);
                    }}
                  />
                </div>
              ) : (
                <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-400">
                  بدون تصویر
                </div>
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
