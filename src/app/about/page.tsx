import type { Metadata } from "next";
import AboutClient from "@/components/about/AboutClient"
// On utilise getAllPosts car c'est le nom de la fonction dans votre lib/mdx
import { getAllPosts } from "@/lib/mdx" 

export const metadata: Metadata = {
  title: "À Propos | Notre Histoire & Vision - Artichaud Studio Paris",
  description: "Découvrez Artichaud Studio : une agence de branding et création web parisienne qui accompagne les marques ambitieuses dans leur transformation digitale et visuelle.",
  keywords: [
    "agence branding Paris",
    "équipe créative Paris",
    "studio design Paris",
    "agence web Paris équipe",
    "qui sommes-nous Artichaud",
    "histoire agence Paris"
  ],
  openGraph: {
    title: "À Propos - Artichaud Studio Paris",
    description: "L'équipe, notre vision et notre approche pour faire grandir votre marque.",
    url: "https://artichaud-studio.com/about",
    images: [
      {
        url: "https://artichaud-studio.com/icon.png",
        width: 1200,
        height: 630,
        alt: "À Propos Artichaud Studio"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  alternates: {
    canonical: "https://artichaud-studio.com/about"
  }
}

export default async function AboutPage() {
  // Récupération des données côté serveur
  const posts = await getAllPosts()

  // On passe les données au client
  return <AboutClient posts={posts} />
}