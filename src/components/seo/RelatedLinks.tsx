'use client'

import Link from 'next/link'
import { useLocale } from '@/context/LocaleContext'
import type { RelatedLink } from './relatedLinksData'

type RelatedLinkTranslation = {
  label: string
  description: string
}

type RelatedLinksProps = {
  title?: string
  eyebrow?: string
  links: RelatedLink[]
}

const englishTitles: Record<string, string> = {
  'Choisir le bon point d’entrée': 'Choose the right starting point',
}

const englishLinks: Record<string, RelatedLinkTranslation> = {
  '/services/creation-site-internet': {
    label: 'Bespoke website creation',
    description: 'Our complete approach to planning, designing and developing a high-performing website.',
  },
  '/creation-site-vitrine-wordpress-webflow-wix': {
    label: 'WordPress, Webflow or Wix',
    description: 'A practical comparison before choosing the CMS for your future showcase website.',
  },
  '/services/seo-referencement-naturel': {
    label: 'Prepare your organic search strategy',
    description: 'Technical structure, content and internal linking to improve visibility.',
  },
  '/tarifs': {
    label: 'Understand pricing',
    description: 'Typical budgets depending on design, content and feature requirements.',
  },
  '/refonte-site-internet': {
    label: 'Website redesign or migration',
    description: 'Modernise an existing website while protecting your SEO equity.',
  },
  '/blog/webflow-avantages-inconvenients-pme': {
    label: 'Webflow advantages and limits',
    description: 'A guide for SMEs before choosing a no-code platform.',
  },
  '/blog/prix-site-vitrine-iledefrance-2025': {
    label: 'Showcase website pricing',
    description: 'Budget benchmarks to compare WordPress, Webflow and Wix options.',
  },
  '/blog/refonte-site-internet-quand-et-comment': {
    label: 'Website redesign guide',
    description: 'When to redesign, how to plan it and which mistakes to avoid.',
  },
  '/contact': {
    label: 'Request a diagnosis',
    description: 'Review your current website before starting a redesign or new project.',
  },
  '/creation-site-internet-paris': {
    label: 'Website creation in Paris',
    description: 'A local page for companies based in Paris and the Île-de-France region.',
  },
  '/creation-site-internet-boulogne-billancourt': {
    label: 'Website creation in Boulogne-Billancourt',
    description: 'Local support for companies in western Paris.',
  },
  '/simulateur': {
    label: 'Estimate a budget',
    description: 'Quickly estimate the budget range for your website project.',
  },
  '/blog/piliers-seo-2026': {
    label: 'The pillars of SEO in 2026',
    description: 'The basics to know to improve a website’s visibility.',
  },
  '/blog/choisir-nom-de-domaine': {
    label: 'Choose a domain name',
    description: 'A simple-looking topic that can be strategic for SEO.',
  },
  '/works': {
    label: 'View our projects',
    description: 'Browse web design, branding and digital experience projects.',
  },
  '/blog/guide-rebranding-2025': {
    label: 'Choose a branding agency',
    description: 'Understand how a creative studio can support a brand.',
  },
}

const getLinkCopy = (link: RelatedLink, locale: 'fr' | 'en'): RelatedLink => {
  if (locale !== 'en') return link

  const translation = englishLinks[link.href]
  if (!translation) return link

  return {
    ...link,
    label: translation.label,
    description: translation.description,
  }
}

export default function RelatedLinks({
  eyebrow = 'Pour aller plus loin',
  title = 'Pages utiles à consulter ensuite',
  links,
}: RelatedLinksProps) {
  const { locale } = useLocale()
  const displayedEyebrow = locale === 'en' && eyebrow === 'Pour aller plus loin'
    ? 'Go further'
    : eyebrow
  const displayedTitle = locale === 'en' && title === 'Pages utiles à consulter ensuite'
    ? 'Useful pages to explore next'
    : locale === 'en'
      ? englishTitles[title] || title
      : title
  const displayedLinks = links.map((link) => getLinkCopy(link, locale))

  return (
    <section className="bg-[#F6F6F3] border-y border-black/10">
      <div className="px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-10">
          <div className="md:col-span-2">
            <span className="text-sm font-medium text-gray-500">{displayedEyebrow}</span>
            <h2 className="mt-4 text-3xl md:text-4xl leading-tight font-normal tracking-tight text-black">
              {displayedTitle}
            </h2>
          </div>

          <div className="md:col-span-6 grid grid-cols-1 md:grid-cols-2 border-y border-black/15 md:border-y-0">
            {displayedLinks.map((link, index) => (
              <Link
                key={`${link.href}-${index}`}
                href={link.href}
                className="group block border-b border-black/15 py-6 md:border-b-0 md:border-t md:border-black/15 md:pr-10 lg:min-h-[150px]"
              >
                <span className="text-xl font-semibold text-black transition-colors group-hover:text-[#7A9600]">
                  {link.label}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
