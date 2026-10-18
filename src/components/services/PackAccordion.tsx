'use client'

import { useId } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import type { OfferId } from '@/data/offers'

export interface PackDetails {
  intro: string
  includesLabel: string
  includes: readonly string[]
  priceLabel: string
  price: string
  durationLabel?: string
  duration?: string
}

export interface Pack {
  name: string
  // Offre pré-remplie dans le formulaire de contact (src/data/offers.ts)
  offerId?: OfferId
  details?: PackDetails
}

export const EASE = [0.22, 1, 0.36, 1] as const

// Le contenu reste dans le DOM (indexable) : seule sa hauteur et son opacité sont animées
export const panel: Variants = {
  open: { height: 'auto', transition: { height: { duration: 0.6, ease: EASE } } },
  closed: { height: 0, transition: { height: { duration: 0.45, ease: EASE, delay: 0.1 } } },
}

export const list: Variants = {
  open: { transition: { staggerChildren: 0.035, delayChildren: 0.15 } },
  closed: { transition: { staggerChildren: 0.015, staggerDirection: -1 } },
}

export const line: Variants = {
  open: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45, ease: EASE } },
  closed: { opacity: 0, y: 10, filter: 'blur(4px)', transition: { duration: 0.2 } },
}

interface PackAccordionProps {
  pack: Pack
  ctaLabel: string
  // Un seul pack ouvert à la fois dans la section : l'état est porté par la page
  isOpen: boolean
  onToggle: () => void
}

export default function PackAccordion({ pack, ctaLabel, isOpen, onToggle }: PackAccordionProps) {
  const panelId = useId()
  const { details } = pack
  const state = isOpen ? 'open' : 'closed'

  // Flèche dans une pastille : se remplit au survol pour signaler que la ligne est cliquable
  const arrow = (
    <span
      aria-hidden="true"
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300
        ${isOpen ? 'border-[#F70046] bg-[#F70046]' : 'border-[#F2F2F2]/30 group-hover/pack:border-[#F70046] group-hover/pack:bg-[#F70046]'}`}
    >
      {/* Décalage au survol sur un conteneur : le transform de la flèche est piloté par framer-motion */}
      <span className="flex transition-transform duration-300 group-hover/pack:translate-y-0.5">
        <motion.span
          className="flex items-center justify-center"
          initial={false}
          animate={{ scaleY: isOpen ? -1 : 1 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Image src="/services/icons/pack-arrow.svg" alt="" width={15} height={11} unoptimized />
        </motion.span>
      </span>
    </span>
  )

  if (!details) {
    return (
      <div className="flex w-full items-center justify-between gap-4 border-[0.5px] border-[#F2F2F2]/20 px-5 py-[10px]">
        <span className="text-[20px] md:text-[22px] leading-[1.4] text-white">{pack.name}</span>
        {arrow}
      </div>
    )
  }

  return (
    <motion.div
      initial={false}
      animate={state}
      className={`group/pack w-full border-[0.5px] transition-colors duration-300
        ${isOpen ? 'border-[#F2F2F2]/50 bg-white/[0.04]' : 'border-[#F2F2F2]/20 hover:border-[#F2F2F2]/50 hover:bg-white/[0.04]'}`}
    >
      <motion.button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        whileTap={{ scale: 0.99 }}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-[10px] text-left focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#F70046]"
      >
        <span className="text-[20px] md:text-[22px] leading-[1.4] text-white transition-transform duration-300 group-hover/pack:translate-x-1">{pack.name}</span>
        {arrow}
      </motion.button>

      <motion.div id={panelId} variants={panel} className="overflow-hidden">
        <motion.div variants={list} className="px-5 pb-5 pt-[9px] text-[16px] leading-[1.4] text-[#767676]">
          <motion.p variants={line}>{details.intro}</motion.p>
          <motion.p variants={line} className="mt-[22px]">[ {details.includesLabel} ]</motion.p>
          <ul className="mt-[22px]">
            {details.includes.map((item) => (
              <motion.li key={item} variants={line}>{item}</motion.li>
            ))}
          </ul>
          <motion.p variants={line} className="mt-[22px]">{details.priceLabel} : {details.price}</motion.p>
          {details.duration && (
            <motion.p variants={line} className="mt-[22px]">{details.durationLabel} : {details.duration}</motion.p>
          )}
          {pack.offerId && (
            <motion.div variants={line} className="mt-[22px]">
              <Link
                href={`/contact?offre=${pack.offerId}`}
                tabIndex={isOpen ? 0 : -1}
                className="group inline-flex items-center gap-2 rounded-full border border-[#F2F2F2]/20 px-[21px] py-3 text-base font-bold leading-[1.44] text-white transition-colors duration-300 hover:border-[#F70046] hover:bg-[#F70046]"
              >
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                {ctaLabel}
              </Link>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
