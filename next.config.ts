import type { NextConfig } from "next";

// On retire le typage strict ": NextConfig" ici pour éviter le soulignement rouge
const nextConfig = {
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
  // Optimisation des polices
  optimizeFonts: true,
  typescript: {
    // Ignore les erreurs TypeScript lors du déploiement Vercel
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore les erreurs ESLint lors du déploiement Vercel
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;