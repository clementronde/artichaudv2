// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

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
  title: "Artichaud Studio",
  description: "Branding and design agency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={helvetica.variable}>
      <body className="bg-white text-arti-black font-sans antialiased">
        <Navbar />
        {/* L'élément qui contient tout le contenu de la page (le contenu défilant) */}
        <SmoothScroll>
          {children}
        </SmoothScroll>

        {/* 👈 2. Placez le Footer en dehors du SmoothScroll */}
        {/* Le Footer utilise 'position: fixed' et se place au-dessus du SmoothScroll */}
        <Footer />
        
      </body>
    </html>
  );
}