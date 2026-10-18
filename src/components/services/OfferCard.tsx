'use client'

import { useId } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { OfferId } from '@/data/offers'
import { EASE, panel, list, line, type PackDetails } from '@/components/services/PackAccordion'

export interface Offer {
  name: string
  offerId: OfferId
  details: PackDetails
}

// Flèche de la maquette, teintée via mask-image pour suivre la couleur du texte
const arrowMask = {
  WebkitMaskImage: 'url(/services/icons/pack-arrow.svg)',
  maskImage: 'url(/services/icons/pack-arrow.svg)',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskSize: '100% 100%',
  maskSize: '100% 100%',
} as const

interface OfferCardProps {
  offer: Offer
  ctaLabel: string
  // Une seule offre ouverte à la fois : l'état est porté par la section
  isOpen: boolean
  onToggle: () => void
}

export default function OfferCard({ offer, ctaLabel, isOpen, onToggle }: OfferCardProps) {
  const panelId = useId()
  const { details } = offer

  // Fond et contour portés par les deux blocs : l'en-tête s'aligne sur les autres cartes (subgrid),
  // le bas ne grandit que pour la carte ouverte
  const surface = `border-[#411120]/40 transition-colors duration-500 ${isOpen ? 'bg-[#411120]' : 'bg-white group-hover:bg-[#FCFAFB]'}`

  return (
    <motion.div
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      className="group md:row-span-2 md:grid md:grid-rows-subgrid"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={`flex w-full cursor-pointer flex-col gap-[19px] border-x-[0.5px] border-t-[0.5px] px-6 pt-7 text-left md:px-[35px] md:pt-[35px] ${surface}`}
      >
        <span className={`text-[20px] md:text-[22px] leading-[1.4] transition-[color,transform] duration-500 group-hover:translate-x-1 ${isOpen ? 'text-white' : 'text-[#411120]'}`}>
          {offer.name}
        </span>
        <span className={`text-base leading-[1.4] transition-colors duration-500 ${isOpen ? 'text-white/60' : 'text-[#767676]'}`}>
          {details.intro}
        </span>
      </button>

      <div className={`border-x-[0.5px] border-b-[0.5px] md:self-start ${surface}`}>
        <motion.div id={panelId} variants={panel} className="overflow-hidden">
          <motion.div variants={list} className="px-6 pt-[22px] text-base leading-[1.4] text-white/60 md:px-[35px]">
            <motion.p variants={line}>[ {details.includesLabel} ]</motion.p>
            <ul className="mt-[22px]">
              {details.includes.map((item) => (
                <motion.li key={item} variants={line}>{item}</motion.li>
              ))}
            </ul>
            <motion.p variants={line} className="mt-[22px]">{details.priceLabel} : {details.price}</motion.p>
            {details.duration && (
              <motion.p variants={line} className="mt-[22px]">{details.durationLabel} : {details.duration}</motion.p>
            )}
            <motion.div variants={line} className="mt-[22px]">
              <Link
                href={`/contact?offre=${offer.offerId}`}
                tabIndex={isOpen ? 0 : -1}
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-[21px] py-3 text-base font-bold leading-[1.44] text-white transition-colors duration-300 hover:border-[#F70046] hover:bg-[#F70046]"
              >
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                {ctaLabel}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Flèche dans une pastille, cliquable comme l'en-tête : se remplit au survol de la carte */}
        <motion.button
          type="button"
          onClick={onToggle}
          tabIndex={-1}
          aria-hidden="true"
          whileTap={{ scale: 0.92 }}
          className="flex w-full cursor-pointer justify-end px-6 pb-6 pt-5 md:px-[35px] md:pb-[30px]"
        >
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-500
              ${isOpen ? 'border-white/40 bg-white' : 'border-[#411120]/30 group-hover:border-[#411120] group-hover:bg-[#411120]'}`}
          >
            {/* Décalage au survol sur un conteneur : le transform de la flèche est piloté par framer-motion */}
            <span className="transition-transform duration-300 group-hover:translate-y-0.5">
              <motion.span
                className={`block h-[11px] w-[15px] transition-colors duration-500
                  ${isOpen ? 'bg-[#411120]' : 'bg-[#411120] group-hover:bg-white'}`}
                style={arrowMask}
                initial={false}
                animate={{ scaleY: isOpen ? -1 : 1 }}
                transition={{ duration: 0.5, ease: EASE }}
              />
            </span>
          </span>
        </motion.button>
      </div>
    </motion.div>
  )
}
