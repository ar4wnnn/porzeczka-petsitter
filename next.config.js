/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['placedog.net', 'scontent-iad3-1.cdninstagram.com', 'scontent-iad3-2.cdninstagram.com', 'cdninstagram.com'],
    unoptimized: false, // Always optimize images for consistency
  },
  // Set reasonable production defaults
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  // Optional: Add trailing slash to URLs
  trailingSlash: false,
  // Optional: Enable built-in React performance tracking
  reactStrictMode: true,
  // Ensure consistent style processing
  swcMinify: true
};

module.exports = nextConfig; 