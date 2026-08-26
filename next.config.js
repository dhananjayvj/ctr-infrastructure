const repoBasePath = '/ctr-infrastructure';
const isProduction = process.env.NODE_ENV === 'production';
const enableCustomDomain = process.env.ENABLE_CUSTOM_DOMAIN === 'true';
const siteUrl = enableCustomDomain
  ? 'https://ctrinfrastructure.com'
  : `https://dhananjayvj.github.io${repoBasePath}`;

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
    ],
    unoptimized: true,
  },
  // Enable static export for SSG
  output: 'export',
  trailingSlash: true,
  basePath: isProduction && !enableCustomDomain ? repoBasePath : '',
  assetPrefix: isProduction && !enableCustomDomain ? repoBasePath : '',
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  
  // Environment variables
  env: {
    SITE_URL: process.env.SITE_URL || siteUrl,
    ENABLE_CUSTOM_DOMAIN: process.env.ENABLE_CUSTOM_DOMAIN || 'false',
  },
};

module.exports = nextConfig;
