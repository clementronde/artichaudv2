import type { Metadata } from "next";
import { getAllPosts } from '@/lib/mdx'
import ServicesClient from '@/components/services/ServicesClient'
import RelatedLinks from '@/components/seo/RelatedLinks'
import { relatedLinkGroups } from '@/components/seo/relatedLinksData'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: {
    absolute: "Agence Web, Branding & SEO à Boulogne-Billancourt | Artichaud Studio"
  },
  description: "Création de site internet, identité visuelle, branding et SEO à Boulogne-Billancourt. Une agence créative 360 qui réunit tous les métiers de la marque et du web en Île-de-France.",
  keywords: [
    "agence web Boulogne-Billancourt",
    "création site internet Boulogne-Billancourt",
    "branding identité visuelle",
    "webdesign Île-de-France",
    "agence SEO Boulogne-Billancourt",
    "refonte site internet",
    "stratégie digitale",
    "agence créative 92"
  ],
  openGraph: {
    title: "Agence Web, Branding & SEO — Artichaud Studio Boulogne-Billancourt",
    description: "Création de site internet, identité visuelle, branding et SEO à Boulogne-Billancourt. Nos expertises pour faire grandir votre marque.",
    url: `${SITE_URL}/services`,
    images: [
      {
        url: `${SITE_URL}/icon.png`,
        width: 1200,
        height: 630,
        alt: "Services Artichaud Studio Boulogne-Billancourt"
      }
    ],
    locale: "fr_FR",
    type: "website"
  },
  alternates: {
    canonical: `${SITE_URL}/services`
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

  return (
    <>
      <ServicesClient posts={posts} />
      <RelatedLinks
        title="Choisir le bon point d’entrée"
        links={[
          ...relatedLinkGroups.serviceWeb.slice(0, 2),
          ...relatedLinkGroups.serviceSeo.slice(0, 1),
          ...relatedLinkGroups.serviceBranding.slice(0, 1),
        ]}
      />
    </>
  )
}
