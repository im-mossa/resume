// utils/image.ts
// helper: build public URL for stored image path

const BASE_URL = process.env.APP_URL ?? 'https://localhost';

export function buildPublicImageUrl(stored: string | null) {
    if (!stored) return null;
    const s = stored.trim();
    if (!s) return null;
    if (s.startsWith('http://') || s.startsWith('https://')) return s;
    const withoutLeading = s.replace(/^\/+/, '');
    return `${BASE_URL.replace(/\/+$/, '')}/static/${withoutLeading}`;
}