import type { Metadata } from "next";
import { getAllPosts } from '@/lib/mdx';
import HomeClient from '@/components/home/HomeClient';

export const metadata: Metadata = {
  title: "Artichaud Studio | Agence Web & Branding Paris - Design & Stratégie",
  description: "Agence de branding et création de sites web à Paris. Design d'identité visuelle, développement web sur mesure et stratégie digitale pour marques ambitieuses.",
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
    title: "Artichaud Studio - Agence Web & Branding Paris",
    description: "Nous accompagnons les marques de là où elles sont, vers là où elles méritent d'être. Branding, webdesign et stratégie digitale à Paris.",
    url: "https://artichaud.studio",
    siteName: "Artichaud Studio",
    images: [
      {
        url: "https://artichaud.studio/icon.png",
        width: 1200,
        height: 630,
        alt: "Artichaud Studio - Agence Branding Paris"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Artichaud Studio | Agence Web & Branding Paris",
    description: "Design d'identité visuelle et création de sites web sur mesure à Paris.",
    images: ["https://artichaud.studio/icon.png"]
  },
  alternates: {
    canonical: "https://artichaud.studio"
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