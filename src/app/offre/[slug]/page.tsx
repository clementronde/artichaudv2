import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import OfferLanding from '@/components/offer/OfferLanding'
import { offerPages, getOfferPage } from '@/data/offerPages'
import { projects as allProjects, type Project } from '@/data/project'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return offerPages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = getOfferPage(slug)
  if (!page) return {}

  const url = `${SITE_URL}/offre/${page.slug}`
  return {
    title: page.seo.title,
    description: page.seo.description,
    alternates: { canonical: url },
    // Pages d'atterrissage publicitaires : hors index pour ne pas concurrencer les pages services
    robots: { index: false, follow: true },
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      url,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      type: 'website',
      images: [{ url: `${SITE_URL}${page.image.src}`, width: 1080, height: 1350, alt: page.image.alt }],
    },
  }
}

export default async function OfferPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = getOfferPage(slug)
  if (!page) notFound()

  const projects = page.projects
    .map((projectSlug) => allProjects.find((project) => project.slug === projectSlug))
    .filter((project): project is Project => Boolean(project))

  return <OfferLanding page={page} projects={projects} />
}
