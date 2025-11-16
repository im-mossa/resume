// src/lib/utils/format.ts

/**
 * فرمت کردن قیمت به صورت واحد پولی
 * @param value عدد قیمت (ممکن است null باشد)
 * @param currency واحد پولی (پیش‌فرض IRR)
 */
export function formatPrice(value: number | null, currency = "IRR"): string {
    if (value == null) return "";
    return new Intl.NumberFormat("fa-IR", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
    }).format(value);
}

/**
 * کوتاه کردن متن طولانی با اضافه کردن ...
 * @param text متن ورودی
 * @param maxLength حداکثر طول مجاز
 */
export function truncateText(text: string, maxLength = 100): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "…";
}

/**
 * فرمت کردن تاریخ به صورت خوانا
 * @param isoDate تاریخ به صورت ISO string
 */
export function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(date);
}
