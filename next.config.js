/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'media.storezy.shop',
      },
    ],
    unoptimized: true,
  },
  // Enable static export for SSG
  output: 'export',
  trailingSlash: true,
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Optimize CSS
  experimental: {
    optimizeCss: true,
  },
  
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  
  // Environment variables
  env: {
    SITE_URL: process.env.SITE_URL || 'https://ctrinfrastructure.com',
  },
};

module.exports = nextConfig;
