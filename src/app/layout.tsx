import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next"
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import "./globals.css";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import Footer from "@/components/layout/Footer";
import Navbar2 from "@/components/layout/Navbarv2";
import ScrollToTop from "@/components/ScrollToTop"
import CustomCursor from "@/components/CustomCursor";
import JsonLd from "@/components/seo/JsonLD";
import { LocaleProvider } from "@/context/LocaleContext";
import type { Locale } from "@/lib/i18n/translations";
import { SITE_URL } from "@/lib/seo";

// CHARGEMENT DES POLICES - Optimisé pour mobile
const helvetica = localFont({
  src: [
    { path: '../../public/fonts/HelveticaNowDisplay-Light.woff2', weight: '300', style: 'normal' },
    { path: '../../public/fonts/HelveticaNowDisplay-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/HelveticaNowDisplay-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/HelveticaNowDisplay-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/HelveticaNowDisplay-ExtraBold.woff2', weight: '800', style: 'normal' },
  ],
  variable: "--font-helvetica",
  display: "swap", // Optimise le chargement des polices
  preload: true, // Précharge les polices critiques
  fallback: ['system-ui', '-apple-system', 'Arial', 'sans-serif'], // Fallback natif rapide
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Artichaud Studio | Agence Web & Branding Boulogne-Billancourt",
    template: "%s | Artichaud Studio"
  },
  icons: {
    icon: '/logonavbar.png',
    apple: '/apple-touch-icon.png',
  },
  description: "Artichaud Studio transforme votre marque avec du branding percutant et des sites web sur mesure. Agence créative à Boulogne-Billancourt spécialisée en identité visuelle, webdesign et stratégie digitale.",
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Artichaud Studio',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }}
};

export const viewport = {
  themeColor: '#30041B',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale: Locale = 'fr'

  return (
    <html lang={locale} className={helvetica.variable}>
      <body className="text-arti-black font-sans antialiased overflow-x-hidden" suppressHydrationWarning>
        <LocaleProvider locale={locale}>
          <CustomCursor />
          <JsonLd />
          <ScrollToTop />
          <Navbar2 />

          <SmoothScrollWrapper>
            <main className="relative z-10 bg-white min-h-screen">
              {children}
            </main>
            <Footer />
          </SmoothScrollWrapper>

        </LocaleProvider>

        <Analytics />
        {process.env.NEXT_PUBLIC_GA_ID && (
           <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        {process.env.NEXT_PUBLIC_GTM_ID && (
           <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        <Script
          src="https://www.lafabriquedunet.fr/agences/badge/artichaud-studio/badge.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
