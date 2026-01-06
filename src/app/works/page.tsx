import type { Metadata } from "next";
import { getAllPosts } from '@/lib/mdx'
import WorkClient from '@/components/works/WorkClient'

export const metadata: Metadata = {
  title: "Portfolio | Nos Projets Web & Branding - Artichaud Studio Paris",
  description: "Découvrez nos réalisations : branding, sites web et stratégies digitales pour Charit.io, Disobey, Paradox, Lumyn et autres marques ambitieuses.",
  keywords: [
    "portfolio agence web Paris",
    "projets branding",
    "réalisations webdesign",
    "case studies design",
    "portfolio identité visuelle",
    "références clients agence Paris"
  ],
  openGraph: {
    title: "Portfolio - Artichaud Studio Paris",
    description: "Nos projets de branding et webdesign pour des marques qui osent se démarquer.",
    url: "https://artichaud-studio.com/works",
    images: [
      {
        url: "https://artichaud-studio.com/icon.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Artichaud Studio"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  alternates: {
    canonical: "https://artichaud-studio.com/works"
  }
};

export default function WorkPage() {
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
  return <WorkClient posts={posts} />
}