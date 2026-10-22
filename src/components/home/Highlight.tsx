'use client'
import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from '@/context/LocaleContext'
import { useHighlightReveal } from '@/hooks/useHighlightReveal'

// --- 1. DONNÉES ---
// Grille de la maquette Figma : 2 tuiles / 1 pleine largeur / 2 tuiles
interface HighlightProject {
  id: string
  client: string
  cover: string
  gallery: string[]
}

const rows: { layout: 'pair' | 'full'; projects: HighlightProject[] }[] = [
  {
    layout: 'pair',
    projects: [
      {
        id: "rockstar",
        client: "Rockstar",
        cover: "/projects/highlight/rockstar.avif",
        gallery: [
          "/projects/rockstar/rockstarprojet2.avif",
          "/projects/rockstar/rockstarprojet3.avif",
          "/projects/rockstar/rockstarprojet5.avif"
        ]
      },
      {
        id: "caisse-epargne",
        client: "Caisse d'Épargne",
        cover: "/projects/highlight/generation-impact.avif",
        gallery: [
          "/projects/caisse-epargne/caisseepargneprojet2.avif",
          "/projects/caisse-epargne/caisseepargneprojet4.avif",
          "/projects/caisse-epargne/caisseepargneprojet5.avif"
        ]
      }
    ]
  },
  {
    layout: 'full',
    projects: [
      {
        id: "yumdeal",
        client: "Yumdeal",
        cover: "/projects/highlight/yumdeal.avif",
        gallery: [
          "/projects/yumdeal/yumdealprojet2.avif",
          "/projects/yumdeal/yumdealprojet3.avif",
          "/projects/yumdeal/yumdealprojet4.avif"
        ]
      }
    ]
  },
  {
    layout: 'pair',
    projects: [
      {
        id: "keleti",
        client: "Keleti",
        cover: "/projects/highlight/keleti.avif",
        gallery: [
          "/projects/keleti/keletiprojet1.avif",
          "/projects/keleti/keletiprojet2.avif",
          "/projects/keleti/keletiprojet4.avif"
        ]
      },
      {
        id: "remembraance",
        client: "Remembraance",
        cover: "/projects/highlight/remembraance.avif",
        gallery: [
          "/projects/remembraance/remembraanceprojet2.webp",
          "/projects/remembraance/remembraanceprojet4.webp",
          "/projects/remembraance/remembraanceprojet5.webp"
        ]
      }
    ]
  }
]

// --- 2. LE SOUS-COMPOSANT ProjectCard ---
// L'aperçu au survol est mis de côté dans components/ui/HoverGalleryPreview (galeries conservées dans les données)
const ProjectCard = ({ project, full }: { project: HighlightProject; full: boolean }) => {
  return (
    <Link
      href={`/works/${project.id}`}
      aria-label={`Voir le projet ${project.client}`}
      suppressHydrationWarning={true}
      data-hl-tile
      className={`group relative block w-full overflow-hidden bg-gray-100 ${full ? 'aspect-[1432/676]' : 'aspect-[713/500]'}`}
    >
      {/* IMAGE DE FOND : le calque parallaxe déborde de 10% en haut et en bas */}
      <div data-hl-parallax className="absolute inset-x-0 -top-[10%] h-[120%]">
        <div data-hl-zoom className="relative h-full w-full">
          <Image
            src={project.cover}
            alt={project.client}
            fill
            sizes={full ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
            // Mini zoom au survol, porté par l'image pour ne pas entrer en conflit avec le zoom GSAP du parent
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        </div>
      </div>
    </Link>
  )
}

// --- 3. LE COMPOSANT PRINCIPAL (Exporté) ---
// title : remplace « À la une » quand le bloc est réutilisé ailleurs (page À propos)
export default function Highlight({ title }: { title?: string }) {
  const container = useRef<HTMLElement>(null)
  const { t } = useLocale()

  useHighlightReveal(container)

  return (
    <section ref={container} className="relative w-full bg-white py-20 md:py-32 px-6 md:px-[40px] cursor-none">

      <div className="flex justify-between items-center mb-[5px]">
        <h2 className="text-[40px] md:text-[60px] font-normal tracking-tight text-arti-black">
          {title ?? t.highlight.title}
        </h2>
        <Link href="/works" suppressHydrationWarning={true} className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border border-black/15 text-arti-black hover:bg-black hover:border-black hover:text-white transition-all duration-300 cursor-none">
          <span>→</span>
          <span className="text-sm font-bold">{t.highlight.viewAll}</span>
        </Link>
      </div>

      {/* GRILLE : gouttière de 5px comme sur la maquette */}
      <div className="flex flex-col gap-[5px]">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            data-hl-row={row.layout}
            className={`grid gap-[5px] ${row.layout === 'pair' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}
          >
            {row.projects.map((project) => (
              <ProjectCard key={project.id} project={project} full={row.layout === 'full'} />
            ))}
          </div>
        ))}
      </div>

      <Link href="/works" suppressHydrationWarning={true} className="md:hidden mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/15 text-arti-black">
        <span>→</span>
        <span className="text-sm font-bold">{t.highlight.viewAll}</span>
      </Link>

    </section>
  )
}
