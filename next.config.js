/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placedog.net', 'scontent-iad3-1.cdninstagram.com', 'scontent-iad3-2.cdninstagram.com', 'cdninstagram.com'],
    unoptimized: process.env.NODE_ENV === 'production' ? false : true,
  },
  // Set reasonable production defaults
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  // Optional: Add trailing slash to URLs
  trailingSlash: false,
  // Optional: Enable built-in React performance tracking
  reactStrictMode: true,
  // Additional configuration options can be added here
};

module.exports = nextConfig; 