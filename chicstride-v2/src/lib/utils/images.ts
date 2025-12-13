// src/lib/utils/images.ts
export function buildPublicImageUrl(path?: string | null): string | null {
  if (!path) return null;
  const isAbsolute = /^https?:\/\//i.test(path);
  if (isAbsolute) return path;

  const cleanPath = path.replace(/^\/+/, '');

  // Always use relative URLs for static images
  // The rewrite rule in next.config.ts will proxy /static/* requests to the API server
  // This works regardless of the API server's hostname
  return `/static/${cleanPath}`;
}

// src/lib/utils/format.ts
export function formatPrice(value: number | null, currency = 'IRR'): string {
  if (value == null) return '';
  return new Intl.NumberFormat('fa-IR', { style: 'currency', currency }).format(value);
}
