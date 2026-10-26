import type { Metadata } from "next";
import { getAllPosts } from '@/lib/mdx';
import HomeClient from '@/components/home/HomeClient';
import { OG_IMAGE_URL, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Artichaud Studio | Agence web, branding & SEO",
  },
  description: "Artichaud Studio accompagne les marques ambitieuses en branding, création de sites web, webdesign et SEO, partout en France.",
  keywords: [
    "agence web",
    "agence branding",
    "création site internet",
    "identité visuelle Île-de-France",
    "webdesign",
    "agence digitale remote",
    "création logo",
    "refonte site web"
  ],
  openGraph: {
    title: "Artichaud Studio - Web & branding",
    description: "Branding, sites web sur mesure, webdesign et SEO pour marques ambitieuses, partout en France.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Artichaud Studio - Agence web et branding"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Artichaud Studio - Web & branding",
    description: "Branding, sites web sur mesure, webdesign et SEO, partout en France.",
    images: [OG_IMAGE_URL]
  },
  alternates: {
    canonical: SITE_URL
  }
};

export default async function Home() {

  // 1. Récupération des données
  // getAllPosts retourne maintenant directement le format attendu (sans .meta)
  const posts = getAllPosts();

  // 2. On envoie les données directement au Client Component
  return (
    <HomeClient posts={posts} />
  );
}
