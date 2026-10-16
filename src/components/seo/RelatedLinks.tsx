import Link from 'next/link'
import type { RelatedLink } from './relatedLinksData'

type RelatedLinksProps = {
  title?: string
  eyebrow?: string
  links: RelatedLink[]
}

export default function RelatedLinks({
  title = 'À découvrir aussi',
  eyebrow = 'Liens utiles',
  links,
}: RelatedLinksProps) {
  const uniqueLinks = links.filter((link, i, arr) => arr.findIndex(l => l.href === link.href) === i)

  // Une carte seule sur sa ligne prend toute la largeur au lieu de laisser des cases vides
  const lastSpan = (index: number) => {
    if (index !== uniqueLinks.length - 1) return ''
    return [
      uniqueLinks.length % 2 === 1 ? 'md:col-span-2' : '',
      uniqueLinks.length % 4 === 1 ? 'lg:col-span-4' : '',
    ].join(' ')
  }

  return (
    <section aria-labelledby="related-links-title" className="bg-white px-6 py-20 text-black md:px-10 md:py-28">
      <div className="mx-auto max-w-[1600px]">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-black/45">
          {eyebrow}
        </p>
        <h2 id="related-links-title" className="max-w-4xl text-4xl font-normal leading-tight tracking-tight md:text-6xl">
          {title}
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-black/10 md:grid-cols-2 lg:grid-cols-4">
          {uniqueLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group bg-[#F6F6F3] p-6 transition-colors hover:bg-[#F70046] hover:text-white md:p-8 ${lastSpan(index)}`}
            >
              <h3 className="text-xl font-medium">{link.label}</h3>
              <p className="mt-3 leading-relaxed text-black/55 transition-colors group-hover:text-white/75">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
