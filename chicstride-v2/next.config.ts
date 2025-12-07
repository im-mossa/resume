// next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev.local',
        port: '', // اگر روی 443 است خالی بگذار، اگر روی 3000 است بنویس '3000'
        pathname: '/static/**',
      },
    ],
    // غیرفعال کردن بهینه‌سازی تصاویر برای حل مشکل IP خصوصی
    // Next.js به‌صورت پیش‌فرض تصاویر از IP های خصوصی را مسدود می‌کند
    unoptimized: true,
  },
};

module.exports = nextConfig;
