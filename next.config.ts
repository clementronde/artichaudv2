import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Le Google tag gateway attend /metrics/ avec slash : la redirection du slash final est gérée dans src/proxy.ts
  skipTrailingSlashRedirect: true,
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
            { key: 'X-XSS-Protection', value: '1; mode=block' },
            { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
            { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
            {
              key: 'Content-Security-Policy',
              value: [
                "default-src 'self'",
                `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV !== 'production' ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://*.google-analytics.com https://va.vercel-scripts.com https://challenges.cloudflare.com https://connect.facebook.net https://www.googleadservices.com https://googleads.g.doubleclick.net`,
                "style-src 'self' 'unsafe-inline'",
                "img-src 'self' data: blob: https:",
                "font-src 'self' data:",
                "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://challenges.cloudflare.com https://www.facebook.com https://connect.facebook.net https://*.doubleclick.net https://www.google.com https://www.googleadservices.com",
                "frame-src https://maps.google.com https://www.google.com https://challenges.cloudflare.com",
                "object-src 'none'",
                "base-uri 'self'",
                "frame-ancestors 'self'",
              ].join('; '),
            },
          ],
        },
      ]
    },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Optimisations pour mobile
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Optimisation du bundling
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Compression
  compress: true,
  typescript: {
    // Ignore les erreurs TypeScript lors du déploiement Vercel
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
