import type { Metadata } from "next";
import AboutClient from "@/components/about/AboutClient"
// On utilise getAllPosts car c'est le nom de la fonction dans votre lib/mdx
import { getAllPosts } from "@/lib/mdx" 
import RelatedLinks from "@/components/seo/RelatedLinks"
import { relatedLinkGroups } from "@/components/seo/relatedLinksData"

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
    url: "https://www.artichaud-studio.com/about",
    images: [
      {
        url: "https://www.artichaud-studio.com/icon.png",
        width: 1200,
        height: 630,
        alt: "À Propos Artichaud Studio"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  alternates: {
    canonical: "https://www.artichaud-studio.com/about"
  }
}

export default async function AboutPage() {
  // Récupération des données côté serveur
  const posts = await getAllPosts()

  return (
    <>
      <AboutClient posts={posts} />
      <RelatedLinks
        title="Découvrir notre façon de travailler"
        links={[
          ...relatedLinkGroups.serviceBranding.slice(0, 2),
          ...relatedLinkGroups.serviceWeb.slice(0, 1),
          ...relatedLinkGroups.editorial.slice(0, 1),
        ]}
      />
    </>
  )
}
