'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const essentials = [
  {
    title: 'Positionnement',
    text: 'On clarifie ce que vous vendez, à qui, et pourquoi votre offre mérite d’être choisie.',
  },
  {
    title: 'Parcours',
    text: 'Chaque page guide le visiteur vers une action logique : comprendre, comparer, demander un devis.',
  },
  {
    title: 'SEO technique',
    text: 'Structure Hn, métadonnées, performance, données structurées et maillage interne sont intégrés dès la conception.',
  },
  {
    title: 'Direction artistique',
    text: 'Le site doit être reconnaissable, pas seulement propre. La forme sert la confiance et la mémorisation.',
  },
]

const formats = [
  {
    title: 'Site vitrine',
    description: 'Pour présenter une activité, rassurer et générer des demandes qualifiées.',
    details: ['Pages services', 'Formulaire', 'SEO technique', 'Preuves et réalisations'],
  },
  {
    title: 'Site avec CMS',
    description: 'Pour publier régulièrement sans dépendre du studio à chaque modification.',
    details: ['Blog', 'Pages éditables', 'Formation', 'Structure évolutive'],
  },
  {
    title: 'Refonte',
    description: 'Pour améliorer un site existant sans perdre ce qui fonctionne déjà côté SEO.',
    details: ['Audit', 'Migration', 'Redirections', 'Nouvelle direction UI'],
  },
  {
    title: 'Expérience sur mesure',
    description: 'Pour une marque, un service ou un produit qui demande une interface plus spécifique.',
    details: ['Next.js', 'Interactions', 'API', 'Performance avancée'],
  },
]

const process = [
  ['01', 'Cadrer', 'Objectifs, audience, concurrence, pages prioritaires et contraintes techniques.'],
  ['02', 'Écrire', 'Structure, messages, titres, CTA et maillage interne avant de penser aux effets.'],
  ['03', 'Designer', 'Direction artistique, maquettes, responsive et système visuel cohérent.'],
  ['04', 'Développer', 'Intégration propre, rapide, maintenable et prête pour l’indexation.'],
  ['05', 'Lancer', 'Recette, tracking, Search Console, formation et recommandations post-lancement.'],
]

const proofLinks = [
  {
    href: '/works/lumyn',
    label: 'Lumyn',
    text: 'Plateforme créative, direction artistique et développement.',
  },
  {
    href: '/works/jobmi',
    label: 'Jobmi',
    text: 'Naming et identité pour une plateforme emploi.',
  },
]

const faqItems = [
  {
    question: 'Combien coûte la création d’un site internet ?',
    answer: 'Le budget dépend du nombre de pages, du niveau de direction artistique, du CMS, des contenus et des besoins SEO. Un site vitrine professionnel démarre généralement autour de 3 500 euros.',
  },
  {
    question: 'Combien de temps faut-il prévoir ?',
    answer: 'Un site vitrine demande souvent 4 à 6 semaines. Une refonte ou un site avec CMS peut demander 8 à 12 semaines selon les contenus, les validations et les intégrations.',
  },
  {
    question: 'Le site sera-t-il optimisé pour Google ?',
    answer: 'Oui. Nous travaillons la structure technique, les métadonnées, le responsive, la performance, les données structurées et le maillage interne dès le départ.',
  },
  {
    question: 'Puis-je modifier mon site après livraison ?',
    answer: 'Oui, si le projet le nécessite. Nous pouvons intégrer un CMS adapté et vous former pour gérer les contenus courants en autonomie.',
  },
]

export default function CreationSiteInternetClient() {
  return (
    <main className="w-full overflow-x-hidden bg-white text-black">
      <section className="relative min-h-[92vh] bg-[#050505] px-6 pt-32 pb-10 text-white md:px-10 md:pt-40">
        <div className="flex min-h-[calc(92vh-10rem)] flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/services" className="mb-8 inline-flex text-sm font-medium text-white/45 transition-colors hover:text-white">
              ← Services
            </Link>
            <p className="mb-6 max-w-xl text-sm font-medium uppercase tracking-wide text-white/45">
              Création de site internet · UX/UI · SEO technique
            </p>
            <h1 className="max-w-[1220px] text-[50px] font-normal leading-[0.92] tracking-tight text-balance md:text-[100px] lg:text-[138px]">
              Un site qui travaille autant que votre équipe.
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 grid grid-cols-1 gap-8 border-t border-white/15 pt-8 md:grid-cols-8 md:gap-x-5"
          >
            <p className="max-w-2xl text-lg leading-relaxed text-white/65 md:col-span-4 md:text-xl">
              Nous créons des sites vitrines, refontes et expériences web qui clarifient votre offre, renforcent votre image et transforment les visiteurs en demandes qualifiées.
            </p>
            <div className="flex flex-col gap-3 md:col-span-2 md:col-start-6">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition-colors hover:bg-[#F70046] hover:text-white">
                Demander un devis
              </Link>
              <Link href="/works" className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black">
                Voir les réalisations
              </Link>
            </div>
            <p className="text-sm leading-relaxed text-white/45 md:col-span-1">
              Site vitrine, refonte, CMS, interface sur mesure.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-8 md:gap-x-5">
          <div className="hidden md:block md:col-span-1">
            <span className="text-sm font-medium text-gray-400">Approche</span>
          </div>
          <div className="md:col-span-4 md:col-start-2">
            <h2 className="text-[38px] font-normal leading-[1.02] tracking-tight md:text-[64px]">
              Pas un site vitrine décoratif. Un outil de confiance, de recherche et de conversion.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-gray-600 md:col-span-3">
            <p>
              Une belle interface ne suffit pas. Votre site doit expliquer vite, prouver votre sérieux, charger rapidement, être lisible sur mobile et donner envie de passer à l’action.
            </p>
            <p>
              Notre travail relie stratégie, webdesign, développement et SEO pour éviter les sites jolis mais muets.
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-black/15 md:ml-[calc(12.5%+0.625rem)]">
          {essentials.map((item, index) => (
            <div key={item.title} className="grid grid-cols-1 gap-y-3 border-b border-black/15 py-8 md:grid-cols-7 md:gap-x-5">
              <span className="text-sm text-gray-400 md:col-span-1">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="text-2xl font-normal md:col-span-2">{item.title}</h3>
              <p className="text-lg leading-relaxed text-gray-600 md:col-span-4">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F6F6F3] px-6 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-8 md:gap-x-5">
          <div className="hidden md:block md:col-span-1">
            <span className="text-sm font-medium text-gray-500">Formats</span>
          </div>
          <div className="md:col-span-5 md:col-start-2">
            <h2 className="text-[38px] font-normal leading-[1.02] tracking-tight md:text-[64px]">
              Le bon format dépend de ce que le site doit produire.
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-gray-600 md:col-span-2">
            Crédibilité, génération de leads, autonomie éditoriale ou expérience produit : on choisit le périmètre avant la technologie. Pour une recherche géographique, consultez notre page dédiée à la{' '}
            <Link href="/creation-site-internet-boulogne-billancourt" className="font-medium text-black underline decoration-black/20 underline-offset-4 transition-colors hover:text-[#F70046]">
              création de site internet à Boulogne-Billancourt
            </Link>
            .
          </p>
        </div>

        <div className="mt-16 border-t border-black/15 md:ml-[calc(12.5%+0.625rem)]">
          {formats.map((format) => (
            <div key={format.title} className="grid grid-cols-1 gap-y-6 border-b border-black/15 py-10 md:grid-cols-7 md:gap-x-5">
              <div className="md:col-span-2">
                <h3 className="text-3xl font-normal">{format.title}</h3>
              </div>
              <p className="text-lg leading-relaxed text-gray-600 md:col-span-3">{format.description}</p>
              <ul className="space-y-2 text-sm font-medium md:col-span-2">
                {format.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#050505] px-6 py-20 text-white md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-8 md:gap-x-5">
          <div className="hidden md:block md:col-span-1">
            <span className="text-sm font-medium text-white/40">Méthode</span>
          </div>
          <div className="md:col-span-4 md:col-start-2">
            <h2 className="text-[38px] font-normal leading-[1.02] tracking-tight md:text-[64px]">
              Une création cadrée, pas un empilement de pages.
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-white/60 md:col-span-3">
            Le projet avance par décisions courtes : ce que la page doit dire, ce que l’utilisateur doit comprendre, ce que Google doit identifier.
          </p>
        </div>

        <div className="mt-16 border-t border-white/15 md:ml-[calc(12.5%+0.625rem)]">
          {process.map(([number, title, text]) => (
            <div key={number} className="grid grid-cols-1 gap-y-4 border-b border-white/15 py-9 md:grid-cols-7 md:gap-x-5">
              <span className="text-white/35 md:col-span-1">{number}</span>
              <h3 className="text-2xl font-normal md:col-span-2">{title}</h3>
              <p className="text-lg leading-relaxed text-white/60 md:col-span-4">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-8 md:gap-x-5">
          <div className="hidden md:block md:col-span-1">
            <span className="text-sm font-medium text-gray-400">Preuves</span>
          </div>
          <div className="md:col-span-4 md:col-start-2">
            <h2 className="text-[38px] font-normal leading-[1.02] tracking-tight md:text-[64px]">
              Une page doit donner envie de continuer.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-gray-600 md:col-span-3">
            <p>
              C’est aussi le rôle du maillage interne : orienter vers les bons exemples, la bonne zone géographique ou le bon service complémentaire.
            </p>
            <Link href="/services/seo-referencement-naturel" className="inline-flex text-sm font-medium text-black transition-colors hover:text-[#F70046]">
              Voir notre approche SEO →
            </Link>
          </div>
        </div>

        <div className="mt-16 border-t border-black/15 md:ml-[calc(12.5%+0.625rem)]">
          {proofLinks.map((link) => (
            <Link key={link.href} href={link.href} className="group grid grid-cols-1 gap-y-3 border-b border-black/15 py-8 md:grid-cols-7 md:gap-x-5">
              <h3 className="text-2xl font-normal transition-colors group-hover:text-[#F70046] md:col-span-2">{link.label}</h3>
              <p className="text-lg leading-relaxed text-gray-600 md:col-span-4">{link.text}</p>
              <span className="text-sm font-medium md:col-span-1 md:text-right">Voir →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-black/10 px-6 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-8 md:gap-x-5">
          <div className="hidden md:block md:col-span-1">
            <span className="text-sm font-medium text-gray-400">FAQ</span>
          </div>
          <div className="md:col-span-3 md:col-start-2">
            <h2 className="text-[38px] font-normal leading-[1.02] tracking-tight md:text-[56px]">
              Questions fréquentes.
            </h2>
          </div>
          <div className="md:col-span-4">
            {faqItems.map((item) => (
              <div key={item.question} className="border-t border-black/15 py-7 last:border-b">
                <h3 className="text-xl font-normal">{item.question}</h3>
                <p className="mt-4 text-base leading-relaxed text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#050505] px-6 py-24 text-white md:px-10 md:py-32">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-8 md:gap-x-5">
          <div className="hidden md:block md:col-span-1">
            <span className="text-sm font-medium text-white/40">Contact</span>
          </div>
          <div className="md:col-span-4 md:col-start-2">
            <h2 className="text-[44px] font-normal leading-[0.98] tracking-tight md:text-[82px]">
              On construit quelque chose qui sert vraiment.
            </h2>
          </div>
          <div className="space-y-6 md:col-span-3 md:pt-24">
            <p className="text-lg leading-relaxed text-white/60">
              On peut cadrer votre besoin, identifier les pages prioritaires et vous dire quel format de site a le plus de sens.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition-colors hover:bg-[#F70046] hover:text-white">
                Démarrer le projet
              </Link>
              <Link href="/tarifs" className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black">
                Voir les tarifs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
