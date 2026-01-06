import type { Metadata } from "next";
import { getAllPosts } from '@/lib/mdx'
import ServicesClient from '@/components/services/ServicesClient'

export const metadata: Metadata = {
  title: "Nos Services | Branding, Webdesign & Stratégie Digitale - Artichaud",
  description: "Découvrez nos services : Stratégie de marque, Identité visuelle, Webdesign, Webmarketing et Shooting Produit. Une agence 360 qui réunit tous les métiers de la création à Paris.",
  keywords: [
    "services agence web Paris",
    "stratégie de marque",
    "création identité visuelle",
    "webdesign Paris",
    "refonte site internet",
    "webmarketing Paris",
    "shooting produit Paris",
    "agence 360 Paris"
  ],
  openGraph: {
    title: "Services - Artichaud Studio Paris",
    description: "Stratégie de marque, identité visuelle, webdesign, webmarketing et shooting produit. Nos expertises pour faire grandir votre marque.",
    url: "https://artichaud-studio.com/services",
    images: [
      {
        url: "https://artichaud-studio.com/icon.png",
        width: 1200,
        height: 630,
        alt: "Services Artichaud Studio Paris"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  alternates: {
    canonical: "https://artichaud-studio.com/services"
  }
};

export default function ServicesPage() {
  // 1. On récupère les articles (Serveur)
  const rawPosts = getAllPosts()

  // 2. On formate les données pour qu'elles correspondent à ce qu'attend BlogSection
  const posts = rawPosts.map((post) => ({
    id: post.slug,
    slug: post.slug,
    title: post.meta.title,
    excerpt: post.meta.excerpt,
    image: post.meta.image,
    readTime: post.meta.readingTime,
    tags: post.meta.tags || []
  }))

  // 3. On passe le tout au composant Client
  return <ServicesClient posts={posts} />
}
