import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import JsonLd from "@/components/seo/JsonLD"; // Assure-toi que le fichier est bien JsonLd.tsx ou JsonLD.tsx



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

// METADONNÉES PAR DÉFAUT (Layout Root)
export const metadata: Metadata = {
  metadataBase: new URL('https://artichaud.studio'), 
  title: {
    default: "Artichaud Studio | Agence Web & Branding Paris",
    template: "%s | Artichaud Studio" // C'est ici que la magie opère pour les autres pages
  },
  description: "Artichaud est une agence de design et création de sites web basée à Paris. Nous transformons vos ambitions en marques fortes.",
  icons: {
    icon: '/favicon.ico', // Ou '/icon.png' si vous préférez une image PNG
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  keywords: ["Agence web Paris", "Création site internet", "Branding studio", "Direction artistique", "Développeur React Paris", "Next.js expert"],
  authors: [{ name: "Clément Ronde", url: "https://artichaud.studio" }],
  creator: "Artichaud Studio",
  publisher: "Artichaud Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Artichaud Studio | Agence Web & Branding Paris",
    description: "Nous créons des marques qui marquent les esprits et des sites web performants.",
    url: 'https://artichaud.studio',
    siteName: 'Artichaud Studio',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Artichaud Studio Hero Image',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Artichaud Studio",
    description: "Agence Web & Branding Paris.",
    images: ['/opengraph-image.png'],
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
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={helvetica.variable}>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/icon.png" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <body className="bg-white text-arti-black font-sans antialiased overflow-x-hidden">
        {/* Composant JSON-LD pour les données structurées */}
        <JsonLd />
        
        {/* Navbar */}
        <Navbar />

        {/* Contenu avec Scroll Lisse */}
        <SmoothScroll>
          {children}
          <Footer />
        </SmoothScroll>

        {/* ANALYTICS : Remplace les ID par les tiens */}
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