import type { Metadata } from "next";
import AboutClient from "@/components/about/AboutClient"
import { getAllPosts } from "@/lib/mdx"
import { OG_IMAGE_URL, SITE_URL } from "@/lib/seo"

export const metadata: Metadata = {
  title: {
    absolute: "À propos d'Artichaud Studio, agence créative indépendante"
  },
  description: "Artichaud Studio : l'agence créative indépendante qui pense la marque avant le design. Branding, création web et SEO pour marques ambitieuses.",
  keywords: [
    "agence créative indépendante",
    "studio design Île-de-France",
    "agence branding indépendante",
    "qui sommes-nous Artichaud Studio",
    "agence web équipe",
    "histoire agence créative"
  ],
  openGraph: {
    title: "À Propos — Artichaud Studio, agence créative indépendante",
    description: "L'agence créative indépendante qui pense la marque avant le design. Notre équipe, notre vision, notre approche.",
    url: `${SITE_URL}/about`,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "À Propos Artichaud Studio"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  alternates: {
    canonical: `${SITE_URL}/about`
  }
}

export default async function AboutPage() {
  // Récupération des données côté serveur
  const posts = await getAllPosts()

  return <AboutClient posts={posts} />
}
