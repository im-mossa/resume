// src/ui/components/product/Breadcrumb.tsx
import { Breadcrumb as BC } from '../../../entities/product';
import Link from 'next/link';

export default function Breadcrumb({ trail }: { trail: BC[] | null }) {
  if (!trail?.length) return null;
  return (
    <nav className="text-sm text-gray-600">
      {trail.map((b, i) => (
        <span key={b.id}>
          <Link href={`/category/${b.id}`}>{b.name}</Link>
          {i < trail.length - 1 && ' / '}
        </span>
      ))}
    </nav>
  );
}
