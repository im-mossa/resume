// src/lib/utils/images.ts
export function buildPublicImageUrl(path?: string | null): string | null {
  if (!path) return null;
  const isAbsolute = /^https?:\/\//i.test(path);
  if (isAbsolute) return path;
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? '';
  return `${base}/static/${path.replace(/^\/+/, '')}`;
}

// src/lib/utils/format.ts
export function formatPrice(value: number | null, currency = 'IRR'): string {
  if (value == null) return '';
  return new Intl.NumberFormat('fa-IR', { style: 'currency', currency }).format(value);
}
