// next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // حالت سخت‌گیرانه React (مطالب مفید برای توسعه و تشخیص مشکلات)
  reactStrictMode: true,

  // minify با SWC برای خروجی‌های کوچکتر و سریع‌تر
  swcMinify: true,

  // اگر می‌خواهی lint در زمان build غیرفعال شود (اختیاری)
  eslint: {
    // هشدارها را هنوز نشان می‌دهد اما build را نمی‌شکند
    ignoreDuringBuilds: true,
  },

  // تنظیمات مربوط به Turbopack (در صورت فعال بودن توسط Next)
  experimental: {
    // تعیین ریشه؛ برای Turbopack/ابزارهای مبتنی بر ریشه پروژه مفید است
    turbo: {
      // اگر Next نسخه‌ای متفاوت نیاز دارد، این مسیر را مطابق مستندات نسخه تنظیم کن
      root: path.resolve(__dirname),
    },
  },

  // مثال‌های مفید که ممکن است اضافه کنی (هم‌اکنون غیرفعال/نظر)
  // images: {
  //   domains: ['cdn.example.com'],
  // },
  // basePath: '/app',

  // نمونه‌ی نحوه افزودن headerهای پیش‌فرض یا rewrites در صورت نیاز
  // async headers() { return [ { source: '/(.*)', headers: [ { key: 'X-Frame-Options', value: 'DENY' } ] } ] },
  // async rewrites() { return [ { source: '/api/:path*', destination: '/api/:path*' } ] },

  // اگر می‌خواهی متغیرهای محیطی را در جاوااسکریپت وارد کنی:
  // env: { NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL },
};

module.exports = nextConfig;
