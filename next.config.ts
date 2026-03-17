import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable static export for Vercel CDN deployment
  output: 'export',

  // Disable persistent webpack cache to prevent stale cache crashes in dev
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },

  // Image optimization settings
  images: {
    unoptimized: true, // Required for static export — images pre-optimised at build time
  },

  // Trailing slashes for cleaner URLs
  trailingSlash: false,

  // Enable typed routes
  typedRoutes: true,

  // Prevent stale route cache in development
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
};

export default nextConfig;
