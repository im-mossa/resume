// src/lib/api/client.ts
import axios, { AxiosInstance } from 'axios';
import https from 'https';

const DEFAULT_BASE = 'http://localhost:3000';
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE ?? DEFAULT_BASE;

/**
 * مشخص می‌کند که آیا در محیط فعلی اجازه نادیده‌گرفتن خطای TLS داده شود.
 * فعال‌سازی فقط زمانی مجاز است که NODE_ENV !== "production" و
 * NEXT_PUBLIC_ALLOW_INSECURE_SSL === "1".
 */
function allowInsecureTls(): boolean {
  return (
    process.env.NODE_ENV !== 'production' &&
    (process.env.NEXT_PUBLIC_ALLOW_INSECURE_SSL === '1' ||
      process.env.NODE_TLS_REJECT_UNAUTHORIZED === '0')
  );
}

/**
 * createApiClient
 * - برای ساختن یک AxiosInstance تایپ‌شده و مرکزی
 * - اگر allowInsecureTls() true باشد، httpsAgent با rejectUnauthorized=false تنظیم می‌شود (فقط برای dev)
 */
export function createApiClient(baseURL: string = BASE_URL): AxiosInstance {
  const insecure = allowInsecureTls();

  const instance = axios.create({
    baseURL,
    timeout: 10_000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    httpsAgent: insecure ? new https.Agent({ rejectUnauthorized: false }) : undefined,
  });

  // request interceptor (مثال: افزودن توکن Authorization)
  instance.interceptors.request.use((config) => {
    // اگر نیاز به افزودن توکن داری، اینجا انجام بده
    // const token = getAuthToken(); // پیاده‌سازی دلخواه
    // if (token) config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
    return config;
  });

  // response interceptor: یکجا کردن خطاها / logging
  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      // می‌توان اینجا خطاها را نرمالایز کرد یا لاگ کرد
      // مثال: unwrap کردن response.data.message اگر موجود باشد
      return Promise.reject(error);
    }
  );

  return instance;
}

/**
 * apiClient پیش‌فرض که ما در پروژه استفاده می‌کنیم.
 * در تست یا migration می‌توانی از createApiClient جایگزین استفاده کنی.
 */
export const apiClient = createApiClient();
