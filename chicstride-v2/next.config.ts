// next.config.js
const path = require('path');

// Get API base URL from environment, with fallback
// IMPORTANT: Make sure NEXT_PUBLIC_API_BASE points to an accessible API server URL
// If using IP address (e.g., 192.168.137.1), use http://192.168.137.1:PORT
// If dev.local doesn't resolve, update this to use the actual accessible URL
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || process.env.NEXT_PUBLIC_BASE_URL || 'https://dev.local';

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async rewrites() {
    return [
      {
        source: '/static/:path*',
        destination: `${API_BASE}/static/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev.local',
        port: '',
        pathname: '/static/**',
      },
      {
        protocol: 'http',
        hostname: 'dev.local',
        port: '',
        pathname: '/static/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.137.1',
        port: '3000',
        pathname: '/static/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/static/**',
      },
    ],
    // غیرفعال کردن بهینه‌سازی تصاویر برای حل مشکل IP خصوصی
    // Next.js به‌صورت پیش‌فرض تصاویر از IP های خصوصی را مسدود می‌کند
    unoptimized: true,
  },
};

module.exports = nextConfig;
