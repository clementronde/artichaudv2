import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Navbar2 from "@/components/layout/Navbarv2";
import ScrollToTop from "@/components/ScrollToTop";

import JsonLd from "@/components/seo/JsonLD";

// CHARGEMENT DES POLICES
const helvetica = localFont({
  src: [
    { path: '../../public/fonts/HelveticaNowDisplay-Light.woff2', weight: '300', style: 'normal' },
    { path: '../../public/fonts/HelveticaNowDisplay-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/HelveticaNowDisplay-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/HelveticaNowDisplay-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/HelveticaNowDisplay-ExtraBold.woff2', weight: '800', style: 'normal' },
  ],
  variable: "--font-helvetica",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://artichaud.studio'), 
  title: {
    default: "Artichaud Studio | Agence Web & Branding Paris",
    template: "%s | Artichaud Studio"
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  description: "Artichaud est une agence de design et création de sites web basée à Paris.",
  // ... tes autres métadonnées restent identiques
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={helvetica.variable}>
      <link rel="icon" href="/favicon.ico" sizes="48x48" type="image/x-icon" />
      <link rel="icon" href="/icon.png" sizes="512x512" type="image/png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      
      {/* 1. On enlève bg-white du body pour éviter qu'il ne cache le footer si z-index < 0.
         On laisse le body neutre.
      */}
      <body className="text-arti-black font-sans antialiased overflow-x-hidden">
        <JsonLd />
        <ScrollToTop />
        <Navbar2 />

        <SmoothScroll>
          {/* 2. LE FIX EST ICI :
             On enveloppe le contenu dans un 'main' avec :
             - relative : pour le placer dans le flux
             - z-10 : pour qu'il soit AU-DESSUS du footer (qui sera z-1)
             - bg-white : pour qu'il soit opaque et cache le footer avant le scroll
          */}
          <main className="relative z-10 bg-white min-h-screen">
            {children}
          </main>
          
          <Footer />
        </SmoothScroll>

        {process.env.NEXT_PUBLIC_GA_ID && (
           <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        {process.env.NEXT_PUBLIC_GTM_ID && (
           <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
      </body>
    </html>
  );
}