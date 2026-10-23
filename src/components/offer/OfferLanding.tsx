'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { whatsappHref, type OfferPage } from '@/data/offerPages'
import type { Project } from '@/data/project'
import { useLocale } from '@/context/LocaleContext'
import OfferForm from '@/components/offer/OfferForm'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon'

const EASE = [0.22, 1, 0.36, 1] as const
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

// Accordéon FAQ aux codes de la page Services : pastille qui se remplit au survol
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border-t border-black/10">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="group flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-[20px] md:text-[22px] leading-[1.4] text-arti-black transition-transform duration-300 group-hover:translate-x-1">
          {question}
        </span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300
            ${isOpen ? 'border-[#411120] bg-[#411120] text-white' : 'border-[#411120]/30 text-[#411120] group-hover:border-[#411120] group-hover:bg-[#411120] group-hover:text-white'}`}
          aria-hidden="true"
        >
          <motion.svg animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.4, ease: EASE }} className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </motion.svg>
        </span>
      </button>
      <motion.div initial={false} animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
        <p className="pb-6 text-base leading-[1.4] text-[#767676] md:max-w-[80%]">{answer}</p>
      </motion.div>
    </div>
  )
}

export default function OfferLanding({ page, projects }: { page: OfferPage; projects: Project[] }) {
  const { t } = useLocale()
  const testimonial = t.testimonials.items[0]

  return (
    <main className="w-full bg-white overflow-x-clip pb-24 md:pb-0">

      {/* 1. HERO : on retrouve la pub (titre, prix, visuel) dès l'arrivée */}
      <section className="w-full px-6 pt-32 pb-20 md:px-[40px] md:pt-40 md:pb-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-8 md:gap-x-5">

          <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col md:col-span-5">
            <motion.span variants={fadeInUp} className="mb-6 text-base text-arti-black">[ {page.label} ]</motion.span>

            {/* Le H1 reste visible dès le rendu serveur (LCP) : seul le glissement est animé */}
            <h1
              className="font-normal tracking-tight text-arti-black"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: 'clamp(40px, 5vw, 76px)', lineHeight: 1.1 }}
            >
              {page.title}
            </h1>

            <motion.p variants={fadeInUp} className="mt-8 max-w-[560px] text-lg leading-[1.4] text-[#767676]">
              {page.intro}
            </motion.p>

            {/* Prix aux codes des créas : ancien prix barré, prix sur étiquette rose */}
            <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap items-end gap-4">
              {page.oldPrice && (
                <span className="text-[22px] text-[#411120]/50 line-through decoration-[#F70046] decoration-2">{page.oldPrice}</span>
              )}
              <span className="-rotate-2 bg-[#F70046] px-4 py-1 text-[32px] md:text-[40px] font-medium leading-[1.2] text-white">
                {page.price}
              </span>
              <span className="pb-2 text-sm text-[#767676]">{page.priceNote}</span>
            </motion.div>

            <motion.ul variants={fadeInUp} className="mt-8 flex flex-wrap gap-2">
              {page.tags.map((tag) => (
                <li key={tag} className="bg-[#411120] px-3 py-1 text-sm text-white">{tag}</li>
              ))}
            </motion.ul>

            <motion.div variants={fadeInUp} className="mt-10 flex flex-col flex-wrap gap-3 sm:flex-row">
              <a
                href="#devis"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-black px-7 text-base font-medium text-white transition-colors duration-300 hover:bg-[#F70046]"
              >
                <span aria-hidden="true">→</span>
                <span>Demander mon devis gratuit</span>
              </a>
              <a
                href={whatsappHref(page.label)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-black/15 px-7 text-base font-medium text-black transition-colors duration-300 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
              >
                <WhatsAppIcon />
                Contacter sur WhatsApp
              </a>
            </motion.div>

            <motion.ul variants={fadeInUp} className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-arti-black">
              {page.facts.map((fact) => (
                <li key={fact} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F70046]" aria-hidden="true" />
                  {fact}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="relative aspect-[4/5] w-full overflow-hidden md:col-span-3 md:self-start"
          >
            <Image src={page.image.src} alt={page.image.alt} fill priority sizes="(max-width: 768px) 100vw, 38vw" className="object-cover" />
          </motion.div>
        </div>
      </section>

      {/* 2. CE QUI EST INCLUS : bloc bordeaux aux codes de la page Services */}
      <section className="w-full px-4 md:px-[20px]">
        <div className="rounded-[20px] bg-[#411120] px-6 pt-14 pb-8 text-white md:px-10 md:pt-[82px] md:pb-10">
          {/* Titre et liste côte à côte : label col. 1, titre col. 2-3 (fixe au scroll), liste col. 4-8 */}
          <div className="grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-8">
            <div className="md:col-span-1 md:pt-[15px]">
              <span className="text-base text-white">Inclus</span>
            </div>
            <div className="md:col-span-2 md:sticky md:top-32 md:self-start">
              <h2 className="text-[34px] md:text-[45px] leading-[1.3] font-normal">Ce qui est inclus dans votre offre</h2>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="md:col-span-5 md:col-start-4"
            >
              {page.includes.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  className={`grid grid-cols-1 gap-y-2 py-6 md:grid-cols-5 md:gap-x-5 ${index > 0 ? 'border-t border-white/20' : 'md:pt-[15px]'}`}
                >
                  <span className="text-base text-white/40">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="text-[20px] md:text-[22px] leading-[1.4] font-normal md:col-span-2">{item.title}</h3>
                  <p className="text-base leading-[1.4] text-white/60 md:col-span-2">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. POUR QUI + DÉROULÉ */}
      <section className="w-full px-6 py-24 md:px-[40px] md:py-32">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-8 md:gap-x-5">
          <div className="md:col-span-1 md:pt-[15px]">
            <span className="text-base text-arti-black">{page.audience.title}</span>
          </div>
          <div className="md:col-span-5">
            <p className="text-[26px] md:text-[34px] leading-[1.4] text-arti-black">{page.audience.text}</p>
          </div>
        </div>

        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-28 md:grid-cols-5"
        >
          {page.steps.map((step, index) => (
            <motion.li key={step.title} variants={fadeInUp} className="flex flex-col gap-3 border-t border-[#411120] pt-5">
              <span className="text-sm text-[#F70046]">Étape {index + 1}</span>
              <h3 className="text-[22px] leading-[1.4] text-arti-black">{step.title}</h3>
              <p className="text-base leading-[1.4] text-[#767676]">{step.text}</p>
            </motion.li>
          ))}
        </motion.ol>
      </section>

      {/* 4. RÉALISATIONS */}
      {projects.length > 0 && (
        <section className="w-full px-6 pb-24 md:px-[40px] md:pb-32">
          <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
            <h2 className="text-[34px] md:text-[45px] leading-[1.4] font-normal text-arti-black">Ils nous ont fait confiance</h2>
            <Link
              href="/works"
              className="group inline-flex items-center gap-3 self-start rounded-full border border-black/10 px-6 py-3 text-sm font-medium transition-all duration-300 hover:border-black"
            >
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              <span>Voir tous les projets</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-3">
            {projects.map((project) => (
              <Link key={project.slug} href={`/works/${project.slug}`} className="group flex flex-col gap-4">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5">
                  <Image
                    src={project.cover}
                    alt={`Projet ${project.client} par Artichaud Studio`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-3 text-base">
                  <span className="text-arti-black">{project.category}</span>
                  <span className="italic text-[#767676]">pour</span>
                  <span className="font-bold text-arti-black">{project.client}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 5. TÉMOIGNAGE */}
      {testimonial && (
        <section className="w-full px-6 pb-24 md:px-[40px] md:pb-32">
          <div className="grid grid-cols-1 gap-y-6 md:grid-cols-8 md:gap-x-5">
            <div className="md:col-span-1 md:pt-[15px]">
              <span className="text-base text-arti-black">Témoignage</span>
            </div>
            <figure className="md:col-span-6">
              <blockquote className="text-[24px] md:text-[34px] leading-[1.4] text-arti-black">“{testimonial.text}”</blockquote>
              <figcaption className="mt-6 text-base text-[#767676]">
                <span className="text-arti-black">{testimonial.name}</span>, {testimonial.role}
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* 6. FAQ */}
      <section className="w-full px-6 pb-24 md:px-[40px] md:pb-32">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-8 md:gap-x-5">
          <div className="md:col-span-3">
            <h2 className="text-[34px] md:text-[45px] leading-[1.4] font-normal text-arti-black">Questions fréquentes</h2>
          </div>
          <div className="border-b border-black/10 md:col-span-5">
            {page.faq.map((item) => (
              <FaqItem key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. FORMULAIRE : lecture de haut en bas (titre, puis formulaire), fond clair pour la lisibilité */}
      <section id="devis" className="w-full scroll-mt-24 px-4 pb-4 md:px-[20px] md:pb-[20px]">
        <div className="rounded-[20px] bg-[#F6F1F3] px-6 py-14 md:px-10 md:py-[82px]">
          <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-8">
            <div className="md:col-span-1 md:pt-[15px]">
              <span className="text-base text-arti-black">Devis</span>
            </div>
            <div className="flex flex-col gap-6 md:col-span-6">
              <h2 className="text-[34px] md:text-[45px] leading-[1.3] font-normal text-arti-black">{page.form.title}</h2>
              <p className="max-w-[640px] text-lg leading-[1.4] text-arti-black/70">
                {page.label}, {page.price}. Le devis est gratuit et on vous rappelle du lundi au vendredi, de 8 h à 20 h.
              </p>
              <a
                href={whatsappHref(page.label)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 self-start rounded-full border border-black/15 px-7 text-base font-medium text-arti-black transition-colors duration-300 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
              >
                <WhatsAppIcon />
                Contacter sur WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:mt-16 md:grid-cols-8 md:gap-x-5">
            <div className="rounded-[16px] bg-white p-6 md:col-span-6 md:col-start-2 md:p-10">
              <OfferForm page={page} />
            </div>
          </div>
        </div>
      </section>

      {/* Barre d'action fixe sur mobile : le devis et WhatsApp restent à portée de pouce */}
      <div className="fixed inset-x-0 bottom-0 z-[80] flex gap-2 border-t border-black/10 bg-white/95 p-3 backdrop-blur md:hidden">
        <a href="#devis" className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-black text-sm font-medium text-white">
          Demander mon devis
        </a>
        <a
          href={whatsappHref(page.label)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-medium text-white"
        >
          <WhatsAppIcon />
          WhatsApp
        </a>
      </div>
    </main>
  )
}
