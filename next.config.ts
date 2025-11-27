import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: false, // Disable auto-registration to prevent invalid state errors
  scope: "/",
  sw: "service-worker.js",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['three'],
  // Empty turbopack config to silence warnings and use Turbopack defaults
  turbopack: {},
  
  // Custom headers for technology detection and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Powered-By',
            value: 'Next.js',
          },
          {
            key: 'X-Framework',
            value: 'Next.js 16.0.3',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Power headers to preserve Next.js detection
  poweredByHeader: true,
};

export default withPWA(nextConfig);
