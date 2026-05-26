import type { Metadata } from "next";
import { getAllPosts } from '@/lib/mdx';
import HomeClient from '@/components/home/HomeClient';
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Artichaud Studio | Agence web, branding & SEO à Paris",
  },
  description: "Artichaud Studio accompagne les marques ambitieuses en branding, création de sites web, webdesign et SEO à Paris et en Île-de-France.",
  keywords: [
    "agence branding Paris",
    "agence web Paris",
    "création site internet Paris",
    "identité visuelle Paris",
    "webdesign Paris",
    "agence digitale Paris",
    "création logo Paris",
    "refonte site web Paris"
  ],
  openGraph: {
    title: "Artichaud Studio - Agence web & branding Paris",
    description: "Branding, sites web sur mesure, webdesign et SEO pour marques ambitieuses à Paris et en Île-de-France.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/icon.png`,
        width: 512,
        height: 512,
        alt: "Artichaud Studio - Agence web et branding Paris"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Artichaud Studio - Agence web & branding Paris",
    description: "Branding, sites web sur mesure, webdesign et SEO à Paris.",
    images: [`${SITE_URL}/icon.png`]
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
