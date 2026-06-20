import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.vercel.app' },
    ],
    formats: ['image/webp'],
    deviceSizes: [411, 640, 768, 1024, 1280, 1440],
    imageSizes: [240, 384],
    minimumCacheTTL: 31536000,
  },
  async rewrites() {
    return [
      { source: "/about", destination: "/" },
      { source: "/project", destination: "/" },
      { source: "/contact", destination: "/" },
      { source: "/home", destination: "/" },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob:",
              "connect-src 'self' https://api.web3forms.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'none'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
