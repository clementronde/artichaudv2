'use client'

import { useEffect, useState } from 'react'
import { useLenis } from '@studio-freight/react-lenis'
import type { TocHeading } from '@/lib/toc'

// Marge sous la barre de navigation fixe quand on saute à une section
const SCROLL_OFFSET = -120

// Sommaire collant de l'article : suit la lecture et surligne la section en cours
export default function TableOfContents({ headings }: { headings: TocHeading[] }) {
  const lenis = useLenis()
  const [activeId, setActiveId] = useState(headings[0]?.id ?? '')

  useEffect(() => {
    const elements = headings
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    // La section active est le dernier titre passé sous le premier tiers de l'écran
    const update = () => {
      const limit = window.innerHeight / 3
      let current = elements[0]?.id ?? ''
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= limit) current = el.id
      }
      setActiveId(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [headings])

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id)
    if (!target) return
    e.preventDefault()
    // Empêche le gestionnaire d'ancres global (sans décalage) de prendre le relais
    e.stopPropagation()

    if (lenis) lenis.scrollTo(target, { offset: SCROLL_OFFSET, duration: 1.2 })
    else window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY + SCROLL_OFFSET, behavior: 'smooth' })

    history.replaceState(null, '', `#${id}`)
    setActiveId(id)
  }

  return (
    <nav aria-label="Sommaire de l'article">
      <p className="mb-4 text-sm text-[#767676]">Sommaire</p>
      <ol className="flex flex-col border-l border-black/10">
        {headings.map(({ id, text }) => {
          const isActive = id === activeId
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => goTo(e, id)}
                aria-current={isActive ? 'location' : undefined}
                className={`-ml-px block border-l-2 py-2 pl-4 text-sm leading-snug transition-colors duration-300
                  ${isActive ? 'border-[#F70046] text-arti-black' : 'border-transparent text-[#767676] hover:text-arti-black'}`}
              >
                {text}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
