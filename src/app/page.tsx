import type { Metadata } from "next";
import { getAllPosts } from '@/lib/mdx';
import HomeClient from '@/components/home/HomeClient';

export const metadata: Metadata = {
  title: {
    absolute: "Agence Web & Branding Paris - Design, Stratégie | Artichaud Studio",
  },
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
    title: "Agence Web & Branding Paris - Artichaud Studio",
    description: "Nous accompagnons les marques de là où elles sont, vers là où elles méritent d'être. Branding, webdesign et stratégie digitale à Paris.",
    url: "https://www.artichaud-studio.com",
    siteName: "Artichaud Studio",
    images: [
      {
        url: "https://www.artichaud-studio.com/icon.png",
        width: 512,
        height: 512,
        alt: "Artichaud Studio - Agence Branding Paris"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Agence Web & Branding Paris - Artichaud Studio",
    description: "Design d'identité visuelle et création de sites web sur mesure à Paris.",
    images: ["https://www.artichaud-studio.com/icon.png"]
  },
  alternates: {
    canonical: "https://www.artichaud-studio.com"
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
