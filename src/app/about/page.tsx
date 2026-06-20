import type { Metadata } from "next";
import AboutClient from "@/components/about/AboutClient"
import { getAllPosts } from "@/lib/mdx"
import { SITE_URL } from "@/lib/seo"

export const metadata: Metadata = {
  title: {
    absolute: "À Propos | Artichaud Studio — Agence créative à Boulogne-Billancourt"
  },
  description: "Artichaud Studio : l'agence créative indépendante à Boulogne-Billancourt qui pense la marque avant le design. Branding, création web et SEO pour marques ambitieuses.",
  keywords: [
    "agence créative Boulogne-Billancourt",
    "studio design Île-de-France",
    "agence branding indépendante",
    "qui sommes-nous Artichaud Studio",
    "agence web Boulogne-Billancourt équipe",
    "histoire agence créative 92"
  ],
  openGraph: {
    title: "À Propos — Artichaud Studio, agence créative à Boulogne-Billancourt",
    description: "L'agence créative indépendante qui pense la marque avant le design. Notre équipe, notre vision, notre approche.",
    url: `${SITE_URL}/about`,
    images: [
      {
        url: `${SITE_URL}/icon.png`,
        width: 1200,
        height: 630,
        alt: "À Propos Artichaud Studio Boulogne-Billancourt"
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
