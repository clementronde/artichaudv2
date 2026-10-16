import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import Footer from "@/components/layout/Footer";
import Navbar2 from "@/components/layout/Navbarv2";
import ScrollToTop from "@/components/ScrollToTop"
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import ConsentScripts from "@/components/consent/ConsentScripts";
import CookieBanner from "@/components/consent/CookieBanner";
import ContactClickTracker from "@/components/ContactClickTracker";
import CustomCursor from "@/components/CustomCursor";
import JsonLd from "@/components/seo/JsonLD";
import { LocaleProvider } from "@/context/LocaleContext";
import type { Locale } from "@/lib/i18n/translations";
import { SITE_URL } from "@/lib/seo";
import { consentDefaultsScript } from "@/lib/consent";

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
        {/* Consent Mode v2 : doit s'exécuter avant GA et GTM */}
        <Script id="consent-defaults" strategy="beforeInteractive">
          {consentDefaultsScript}
        </Script>
        <LocaleProvider locale={locale}>
          <ConsentProvider>
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

          <CookieBanner />
          <ConsentScripts />
          <ContactClickTracker />
          </ConsentProvider>
        </LocaleProvider>

        <Analytics />
        <Script
          src="https://www.lafabriquedunet.fr/agences/badge/artichaud-studio/badge.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
