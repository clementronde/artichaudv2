'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import BlogSection from '@/components/home/BlogSection'
import PackAccordion from '@/components/services/PackAccordion'
import OfferCard from '@/components/services/OfferCard'
import { useLocale } from '@/context/LocaleContext'

// On enregistre le plugin GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const serviceContent = {
  fr: {
    label: 'Services',
    heroTitle: "Création de site internet, branding & SEO à Boulogne-Billancourt. Tous les métiers de la création réunis.",
    heroText: "Soyons honnêtes. Vous avez construit quelque chose de génial. Mais depuis peu, il est devenu plus difficile de capter l'attention.",
    cta: 'Parlons-en',
    expertiseTitle: 'Nos expertises',
    whyLabel: 'Pourquoi',
    whyTitle: <>Pourquoi travailler <br /> avec Artichaud</>,
    packCta: 'Je choisis cette offre',
    offersTitle: "Nos offres",
    offers: [
      {
        name: "L’offre [ Flash ]",
        offerId: 'site-pro',
        details: {
          intro: "Tu démarres ton activité et tu veux une image crédible dès le premier jour, sans perdre des mois en allers-retours ? On pose des fondations visuelles solides et on met en ligne ton premier site professionnel pour lancer tes ventes sans attendre.",
          includesLabel: "Description du pack",
          includes: [
            "Un questionnaire de cadrage express",
            "Un logo principal et ses déclinaisons",
            "Une palette de couleurs et une sélection typographique",
            "Un mini-guide de marque (brandboard)",
            "La conception et développement d'un site vitrine",
            "L'optimisation pour mobile et le paramétrage SEO",
            "Une phase d'ajustements groupés",
            "La livraison des fichiers sources et la mise en ligne",
          ],
          priceLabel: "Tarif",
          price: "1500€",
          durationLabel: "Durée",
          duration: "7 jours ouvrés",
        },
      },
      {
        name: "L’offre [ Refresh ]",
        offerId: 'refonte',
        details: {
          intro: "Ton activité a évolué mais ton site date d'il y a plusieurs années ? Une image vieillissante te fait perdre des clients qualifiés. On modernise ton identité et on repense ton site pour refléter enfin la valeur réelle de tes services.",
          includesLabel: "Description du pack",
          includes: [
            "Un audit rapide de l'existant",
            "La modernisation du logo et révision de la charte",
            "La refonte complète du design de ton site actuel",
            "Une structure pensée pour convertir tes visiteurs",
            "L'adaptation responsive (mobile et tablette)",
            "La redirection des anciens liens et conservation du référencement",
            "Une phase d'ajustements ciblés",
            "La mise en production et prise en main",
          ],
          priceLabel: "Tarif",
          price: "1500€",
          durationLabel: "Durée",
          duration: "7 jours ouvrés",
        },
      },
      {
        name: "L’offre [ Visibilité & Sérénité ]",
        offerId: 'presence',
        details: {
          intro: "Tu as déjà un site, mais tu manques de temps pour le maintenir à jour et tu n'apparais pas sur Google ? On s'occupe de la partie technique et de ton référencement local chaque mois pendant que tu te concentres sur tes clients.",
          includesLabel: "Description du pack",
          includes: [
            "Un audit technique et SEO de départ",
            "Les mises à jour mensuelles du site et des extensions",
            "Une sauvegarde mensuelle",
            "La surveillance de la sécurité et de la disponibilité",
            "L'optimisation de ta fiche Google Business Profile",
            "Le suivi de ton référencement local",
            "Jusqu'à 1 heure de petites modifications par mois",
            "Un rapport mensuel",
          ],
          priceLabel: "Tarif",
          price: "350€/mois",
        },
      },
    ],
    capabilities: [
      {
        category: 'Identité de marque',
        items: [
          { title: 'Stratégie de marque & Identité verbale', description: 'Ateliers de marque, stratégie & positionnement, baseline, slogan, storytelling, ton de voix et rédaction.' },
          { title: 'Identité visuelle', description: 'Logo, palette de couleurs, typographie, graphismes, illustrations de marque et design system.' },
          { title: 'Levée de fonds & Go-to-Market', description: 'Pitch deck, vidéo produit, support événementiel, merchandising, contenu digital et assets commerciaux.' },
        ],
        packs: [
          {
            name: "Le pack [ Essentiel ]",
            offerId: 'pack-essentiel',
            details: {
              intro: "Conçu pour donner vie à ton projet rapidement avec un rendu propre, lisible et professionnel. L’essentiel du design graphique réuni dans une formule légère, idéale pour valider ton lancement.",
              includesLabel: "Description du pack",
              includes: [
                "Une visioconférence d'onboarding",
                "Deux concepts visuels distincts",
                "Un logo responsive",
                "Une palette chromatique",
                "Système typographique",
                "Pack iconographique",
                "Le guide complet d'utilisation (Brand Book)",
                "Deux séries d’ajustements",
                "Le dossier complet des fichiers prêts à l'emploi (PNG, SVG, PDF)",
              ],
              priceLabel: "Tarif",
              price: "1000€",
              durationLabel: "Durée",
              duration: "2 semaines",
            },
          },
          {
            name: "Le pack [ Signature ]",
            offerId: 'pack-signature',
            details: {
              intro: "Pour les projets prêts à franchir un cap visuel. Un écosystème graphique plus riche qui matérialise ton identité dans le monde réel, sur tes supports papier comme sur tes supports promotionnels.",
              includesLabel: "Description du pack",
              includes: [
                "Une visioconférence d'onboarding",
                "Un échange stratégique et planche d'inspiration",
                "Deux pistes graphiques abouties",
                "Un système de logos et monogramme",
                "Une gamme de teintes enrichie",
                "Une sélection typographique hiérarchisée",
                "Pack iconographique",
                "Une collection d'illustrations ou motifs sur mesure",
                "La création graphique de deux supports papier (cartes, papeterie...)",
                "La déclinaison visuelle sur deux objets dérivés (tote bag, goodies...)",
                "Le guide complet d'utilisation de la marque (Brand Book)",
                "Deux séries d’ajustements",
                "L'ensemble des fichiers vectoriels et d'impression haute définition",
              ],
              priceLabel: "Tarif",
              price: "1500€",
              durationLabel: "Durée",
              duration: "3 semaines",
            },
          },
          {
            name: "Le pack [ Écosystème ]",
            offerId: 'pack-ecosysteme',
            details: {
              intro: "La solution globale pour bâtir une présence forte, harmonieuse et immédiatement reconnaissable sur l'ensemble de vos canaux. Un univers visuel clé en main pour communiquer au quotidien sans perdre en cohérence.",
              includesLabel: "Description du pack",
              includes: [
                "Un atelier complet d'analyse et de positionnement",
                "Trois pistes créatives approfondies",
                "Un système de logos et monogramme",
                "Un nuancier complet avec règles de contraste",
                "Le corpus typographique et ses règles de mise en page",
                "Un catalogue de motifs, textures et assets graphiques",
                "Pack iconographique",
                "Trois supports imprimés et deux objets promotionnels",
                "9 modèles de publications et 3 modèles de stories",
                "L'habillage complet des profils sociaux (bannières, avatars)",
                "Le guide complet d'utilisation de la marque (Brand Book)",
                "Trois séries d’ajustements",
                "La totalité des fichiers sources et gabarits éditables",
              ],
              priceLabel: "Tarif",
              price: "2000€",
              durationLabel: "Durée",
              duration: "3 à 4 semaines",
            },
          },
        ],
      },
      {
        category: 'Création de site web',
        items: [
          { title: 'UX & Rédaction', description: 'Structure du site, navigation, wireframes, cartographie des contenus, messages clés et rédaction.' },
          { title: 'Design de site web', description: 'Direction artistique, UI design, design system, graphismes de marque, iconographie et illustrations.' },
          { title: 'Développement web', description: 'Développement, SEO technique, intégrations API, configuration CMS, animations, interactions et QA.' },
        ],
        packs: [
          {
            name: "Le pack [ Vitrine ]",
            offerId: 'pack-vitrine',
            details: {
              intro: "Pour présenter ton activité avec un site clair, rapide et pensé pour transformer tes visiteurs en clients. Un site vitrine sur-mesure, simple à mettre à jour et prêt à être trouvé sur Google dès sa mise en ligne.",
              includesLabel: "Description du pack",
              includes: [
                "Une visioconférence de lancement",
                "L'arborescence et le parcours de tes visiteurs",
                "Des maquettes sur-mesure, desktop et mobile",
                "Le développement d'un site responsive et rapide",
                "Un formulaire de contact relié à ta boîte mail",
                "Le paramétrage SEO de base (balises, sitemap, données structurées)",
                "Un CMS pour modifier tes contenus en autonomie",
                "Deux séries d’ajustements",
                "La mise en ligne et une formation à la prise en main",
              ],
              priceLabel: "Tarif",
              price: "à partir de 2000€",
              durationLabel: "Durée",
              duration: "1 à 2 semaines",
            },
          },
          {
            name: "Le pack [ E-commerce ]",
            offerId: 'pack-ecommerce',
            details: {
              intro: "Pour vendre en ligne avec une boutique qui inspire confiance et fluidifie l'achat. On conçoit ton e-commerce de la fiche produit jusqu'au paiement, prêt à encaisser tes premières commandes.",
              includesLabel: "Description du pack",
              includes: [
                "Une visioconférence de lancement",
                "L'arborescence du catalogue et le parcours d'achat",
                "Des maquettes sur-mesure, desktop et mobile",
                "Le développement d'une boutique responsive et rapide",
                "La mise en place du catalogue et des fiches produits",
                "Le paiement sécurisé et la configuration des livraisons",
                "Le paramétrage SEO des pages produits et catégories",
                "Un back-office pour gérer commandes, stocks et produits",
                "Deux séries d’ajustements",
                "La mise en ligne et une formation à la prise en main",
              ],
              priceLabel: "Tarif",
              price: "à partir de 2500€",
              durationLabel: "Durée",
              duration: "2 à 4 semaines",
            },
          },
        ],
      },
      {
        category: 'Réseaux sociaux',
        items: [
          { title: 'Stratégie social media', description: 'Choix des plateformes, lignes éditoriales, calendrier de publication, piliers de contenu et objectifs par canal.' },
          { title: 'Création de contenu', description: 'Posts, carrousels, stories, reels, templates de marque, déclinaisons de campagnes et contenus courts.' },
          { title: 'Pilotage & reporting', description: 'Suivi des performances, analyse des formats qui engagent, recommandations mensuelles et ajustements éditoriaux.' },
        ],
        packs: [],
      },
      {
        category: 'Webmarketing',
        items: [
          { title: 'Acquisition & conversion', description: 'SEO, SEA, landing pages, tunnels de conversion, campagnes email et optimisation des points de contact clés.' },
          { title: 'Tracking & analytics', description: 'Plan de mesure, événements, tableaux de bord, lecture des parcours utilisateurs et priorisation des actions.' },
          { title: 'Contenus marketing', description: 'Pages de vente, lead magnets, séquences email, contenus SEO et supports conçus pour générer des demandes qualifiées.' },
        ],
        packs: [
          {
            name: "Le pack [ Maintenance ]",
            offerId: 'pack-maintenance',
            details: {
              intro: "Ton site est en ligne, mais tu n'as ni le temps ni l'envie de t'en occuper ? Une mise à jour oubliée ou un bug passé inaperçu suffit à faire fuir tes visiteurs. On veille sur ton site chaque mois pour qu'il reste rapide, sécurisé et toujours à jour.",
              includesLabel: "Description du pack",
              includes: [
                "Un audit technique de départ",
                "Les mises à jour mensuelles du CMS, du thème et des extensions",
                "Une sauvegarde mensuelle",
                "La surveillance de la sécurité et de la disponibilité du site",
                "La correction des bugs et des liens cassés",
                "L'optimisation continue de la vitesse de chargement",
                "Jusqu'à 2 heures de petites modifications par mois",
                "Un rapport mensuel d'intervention",
                "Une visioconférence mensuelle de suivi",
              ],
              priceLabel: "Tarif",
              price: "300€/mois",
            },
          },
          {
            name: "Le pack [ SEO ]",
            offerId: 'pack-seo',
            details: {
              intro: "Ton site est beau, mais personne ne le trouve sur Google ? Sans visibilité, ce sont tes concurrents qui récupèrent tes clients. On travaille ton référencement chaque mois pour te faire monter dans les résultats et attirer des visiteurs vraiment intéressés par tes services.",
              includesLabel: "Description du pack",
              includes: [
                "Une visioconférence de lancement",
                "Un audit SEO complet de ton site",
                "Une étude des mots-clés et de tes concurrents",
                "L'optimisation technique (balises, structure, maillage interne)",
                "L'optimisation de ta fiche Google Business Profile",
                "La rédaction ou l'optimisation d'un contenu par mois",
                "Le suivi de ton positionnement sur tes mots-clés",
                "L'analyse de ton trafic et de tes conversions",
                "Un rapport mensuel avec les prochaines actions",
              ],
              priceLabel: "Tarif",
              price: "350€/mois",
            },
          },
          {
            name: "Le pack [ Duo ]",
            offerId: 'pack-duo',
            details: {
              intro: "Tu veux un site qui tourne sans accroc et qui gagne en visibilité, sans jongler entre plusieurs prestataires ? On réunit maintenance et référencement dans un seul accompagnement mensuel. Ton site reste entretenu pendant qu'il grimpe sur Google et t'amène de nouveaux clients.",
              includesLabel: "Description du pack",
              includes: [
                "Une visioconférence de lancement",
                "Un audit technique et SEO complet",
                "Les mises à jour mensuelles du CMS, du thème et des extensions",
                "Une sauvegarde complète chaque semaine",
                "La surveillance de la sécurité et de la disponibilité du site",
                "Une stratégie de mots-clés adaptée à ton activité",
                "L'optimisation technique et de ta fiche Google Business Profile",
                "La rédaction ou l'optimisation de deux contenus par mois",
                "Jusqu'à 3 heures de petites modifications par mois",
                "Un point stratégique et un rapport complet chaque mois",
              ],
              priceLabel: "Tarif",
              price: "500€/mois",
            },
          },
        ],
      },
    ],
    values: [
      { id: '1', title: 'Un cadrage clair', text: "Avant de designer, nous clarifions vos objectifs, vos cibles et les messages à faire passer. Le site part d'une vraie direction, pas d'une simple envie graphique." },
      { id: '2', title: 'Un design qui sert la marque', text: "Nous cherchons l'équilibre entre impact visuel, lisibilité et conversion. Chaque page doit aider vos visiteurs à comprendre votre offre et à passer à l'action." },
      { id: '3', title: 'Une base technique solide', text: 'Performance, responsive, structure propre, CMS ou stack sur mesure : nous construisons des sites pensés pour durer, être maintenus et évoluer avec votre activité.' },
      { id: '4', title: 'Le SEO intégré dès le départ', text: 'Arborescence, contenus, balises, maillage interne et vitesse de chargement sont pris en compte dès la conception pour éviter de corriger après coup.' },
    ],
  },
  en: {
    label: 'Services',
    heroTitle: 'Web design, branding & SEO in Boulogne-Billancourt. Every creative discipline under one roof.',
    heroText: 'You have built something strong. Now the challenge is clearer: earning attention, explaining your value and turning interest into action.',
    cta: "Let's talk",
    expertiseTitle: 'Our expertise',
    whyLabel: 'Why',
    whyTitle: <>Why work <br /> with Artichaud</>,
    packCta: 'I choose this offer',
    offersTitle: "Our offers",
    offers: [
      {
        name: "The [ Flash ] offer",
        offerId: 'site-pro',
        details: {
          intro: "Starting your business and want a credible image from day one, without months of back-and-forth? We lay solid visual foundations and launch your first professional website so you can start selling right away.",
          includesLabel: "What’s included",
          includes: [
            "A quick briefing questionnaire",
            "A main logo and its variations",
            "A colour palette and type selection",
            "A mini brand guide (brandboard)",
            "Design and development of a showcase website",
            "Mobile optimisation and SEO setup",
            "One grouped round of adjustments",
            "Delivery of source files and launch",
          ],
          priceLabel: "Price",
          price: "€1,500",
          durationLabel: "Duration",
          duration: "7 working days",
        },
      },
      {
        name: "The [ Refresh ] offer",
        offerId: 'refonte',
        details: {
          intro: "Your business has grown but your website is years old? An outdated image is costing you qualified clients. We modernise your identity and rethink your website so it finally reflects the real value of your services.",
          includesLabel: "What’s included",
          includes: [
            "A quick audit of your current site",
            "Logo modernisation and brand guidelines review",
            "A complete redesign of your current website",
            "A structure built to convert your visitors",
            "Responsive adaptation (mobile and tablet)",
            "Redirection of old links to preserve your SEO",
            "One targeted round of adjustments",
            "Go-live and hands-on onboarding",
          ],
          priceLabel: "Price",
          price: "€1,500",
          durationLabel: "Duration",
          duration: "7 working days",
        },
      },
      {
        name: "The [ Visibility & Peace of Mind ] offer",
        offerId: 'presence',
        details: {
          intro: "You already have a website, but no time to keep it up to date and you don't show up on Google? We take care of the technical side and your local SEO every month while you focus on your clients.",
          includesLabel: "What’s included",
          includes: [
            "An initial technical and SEO audit",
            "Monthly website and plugin updates",
            "A monthly backup",
            "Security and uptime monitoring",
            "Google Business Profile optimisation",
            "Local SEO tracking",
            "Up to 1 hour of small changes per month",
            "A monthly report",
          ],
          priceLabel: "Price",
          price: "€350/month",
        },
      },
    ],
    capabilities: [
      {
        category: 'Brand identity',
        items: [
          { title: 'Brand strategy & verbal identity', description: 'Brand workshops, strategy, positioning, baseline, tagline, storytelling, tone of voice and copywriting.' },
          { title: 'Visual identity', description: 'Logo, colour palette, typography, brand graphics, illustrations and design system.' },
          { title: 'Fundraising & go-to-market', description: 'Pitch decks, product videos, event materials, merchandising, digital content and sales assets.' },
        ],
        packs: [
          {
            name: "The [ Essentiel ] pack",
            offerId: 'pack-essentiel',
            details: {
              intro: "Designed to bring your project to life quickly with a clean, readable and professional result. The graphic design essentials in a light package, ideal for validating your launch.",
              includesLabel: "What’s included",
              includes: [
                "An onboarding video call",
                "Two distinct visual concepts",
                "A responsive logo",
                "A colour palette",
                "A typographic system",
                "An icon pack",
                "The complete usage guide (Brand Book)",
                "Two rounds of adjustments",
                "The complete set of ready-to-use files (PNG, SVG, PDF)",
              ],
              priceLabel: "Price",
              price: "€1,000",
              durationLabel: "Duration",
              duration: "2 weeks",
            },
          },
          {
            name: "The [ Signature ] pack",
            offerId: 'pack-signature',
            details: {
              intro: "For projects ready to take a visual step up. A richer graphic ecosystem that brings your identity into the real world, on your print materials as well as your promotional items.",
              includesLabel: "What’s included",
              includes: [
                "An onboarding video call",
                "A strategy session and mood board",
                "Two fully developed design directions",
                "A logo system and monogram",
                "An extended colour range",
                "A hierarchical type selection",
                "An icon pack",
                "A custom collection of illustrations or patterns",
                "Graphic design for two print items (cards, stationery...)",
                "Visual adaptation on two branded goods (tote bag, merchandise...)",
                "The complete brand usage guide (Brand Book)",
                "Two rounds of adjustments",
                "All vector and high-definition print files",
              ],
              priceLabel: "Price",
              price: "€1,500",
              durationLabel: "Duration",
              duration: "3 weeks",
            },
          },
          {
            name: "The [ Écosystème ] pack",
            offerId: 'pack-ecosysteme',
            details: {
              intro: "The all-in-one solution to build a strong, harmonious and instantly recognisable presence across all your channels. A turnkey visual universe to communicate every day without losing consistency.",
              includesLabel: "What’s included",
              includes: [
                "A complete analysis and positioning workshop",
                "Three in-depth creative directions",
                "A logo system and monogram",
                "A full colour chart with contrast rules",
                "The type family and its layout rules",
                "A library of patterns, textures and graphic assets",
                "An icon pack",
                "Three print items and two promotional goods",
                "9 post templates and 3 story templates",
                "Complete social profile branding (banners, avatars)",
                "The complete brand usage guide (Brand Book)",
                "Three rounds of adjustments",
                "All source files and editable templates",
              ],
              priceLabel: "Price",
              price: "€2,000",
              durationLabel: "Duration",
              duration: "3 to 4 weeks",
            },
          },
        ],
      },
      {
        category: 'Website creation',
        items: [
          { title: 'UX & copywriting', description: 'Website structure, navigation, wireframes, content mapping, key messages and copywriting.' },
          { title: 'Web design', description: 'Art direction, UI design, design systems, brand graphics, iconography and illustrations.' },
          { title: 'Web development', description: 'Development, technical SEO, API integrations, CMS setup, animations, interactions and QA.' },
        ],
        packs: [
          {
            name: "The [ Vitrine ] pack",
            offerId: 'pack-vitrine',
            details: {
              intro: "To present your business with a clear, fast website designed to turn visitors into clients. A custom showcase site, easy to update and ready to be found on Google from launch day.",
              includesLabel: "What’s included",
              includes: [
                "A kick-off video call",
                "The site structure and visitor journey",
                "Custom desktop and mobile mock-ups",
                "Development of a fast, responsive website",
                "A contact form connected to your inbox",
                "Core SEO setup (tags, sitemap, structured data)",
                "A CMS to update your content on your own",
                "Two rounds of adjustments",
                "Launch and a hands-on training session",
              ],
              priceLabel: "Price",
              price: "from €2,000",
              durationLabel: "Duration",
              duration: "4 to 6 weeks",
            },
          },
          {
            name: "The [ E-commerce ] pack",
            offerId: 'pack-ecommerce',
            details: {
              intro: "To sell online with a shop that inspires trust and makes buying effortless. We design your e-commerce site from product page to checkout, ready to take your first orders.",
              includesLabel: "What’s included",
              includes: [
                "A kick-off video call",
                "The catalogue structure and purchase journey",
                "Custom desktop and mobile mock-ups",
                "Development of a fast, responsive shop",
                "Catalogue and product page setup",
                "Secure payment and shipping configuration",
                "SEO setup for product and category pages",
                "A back office to manage orders, stock and products",
                "Two rounds of adjustments",
                "Launch and a hands-on training session",
              ],
              priceLabel: "Price",
              price: "from €8,000",
              durationLabel: "Duration",
              duration: "8 to 12 weeks",
            },
          },
        ],
      },
      {
        category: 'Social media',
        items: [
          { title: 'Social media strategy', description: 'Platform choices, editorial lines, publishing calendar, content pillars and channel objectives.' },
          { title: 'Content creation', description: 'Posts, carousels, stories, reels, branded templates, campaign variations and short-form content.' },
          { title: 'Management & reporting', description: 'Performance tracking, format analysis, monthly recommendations and editorial calendar adjustments.' },
        ],
        packs: [],
      },
      {
        category: 'Digital marketing',
        items: [
          { title: 'Acquisition & conversion', description: 'SEO, SEA, landing pages, conversion funnels, email campaigns and optimisation of key touchpoints.' },
          { title: 'Tracking & analytics', description: 'Measurement plans, event setup, dashboards, user journey analysis and action prioritisation.' },
          { title: 'Marketing content', description: 'Sales pages, lead magnets, email sequences, SEO content and campaign assets designed to generate qualified leads.' },
        ],
        packs: [
          {
            name: "The [ Maintenance ] pack",
            offerId: 'pack-maintenance',
            details: {
              intro: "Your website is live, but you have neither the time nor the desire to look after it? One missed update or unnoticed bug is enough to drive visitors away. We look after your site every month so it stays fast, secure and up to date.",
              includesLabel: "What’s included",
              includes: [
                "An initial technical audit",
                "Monthly CMS, theme and plugin updates",
                "A monthly backup",
                "Security and uptime monitoring",
                "Bug and broken link fixes",
                "Ongoing page speed optimisation",
                "Up to 2 hours of small changes per month",
                "A monthly maintenance report",
                "A monthly follow-up video call",
              ],
              priceLabel: "Price",
              price: "€300/month",
            },
          },
          {
            name: "The [ SEO ] pack",
            offerId: 'pack-seo',
            details: {
              intro: "Your website looks great, but nobody finds it on Google? Without visibility, your competitors win your clients. We work on your SEO every month to move you up the results and attract visitors genuinely interested in your services.",
              includesLabel: "What’s included",
              includes: [
                "A kick-off video call",
                "A full SEO audit of your website",
                "Keyword and competitor research",
                "Technical optimisation (tags, structure, internal linking)",
                "Google Business Profile optimisation",
                "One piece of content written or optimised per month",
                "Ranking tracking on your target keywords",
                "Traffic and conversion analysis",
                "A monthly report with next actions",
              ],
              priceLabel: "Price",
              price: "€350/month",
            },
          },
          {
            name: "The [ Duo ] pack",
            offerId: 'pack-duo',
            details: {
              intro: "You want a website that runs smoothly and keeps gaining visibility, without juggling several providers? We combine maintenance and SEO in a single monthly plan. Your site stays well maintained while it climbs on Google and brings you new clients.",
              includesLabel: "What’s included",
              includes: [
                "A kick-off video call",
                "A full technical and SEO audit",
                "Monthly CMS, theme and plugin updates",
                "A full weekly backup",
                "Security and uptime monitoring",
                "A keyword strategy tailored to your business",
                "Technical and Google Business Profile optimisation",
                "Two pieces of content written or optimised per month",
                "Up to 3 hours of small changes per month",
                "A monthly strategy call and full report",
              ],
              priceLabel: "Price",
              price: "€500/month",
            },
          },
        ],
      },
    ],
    values: [
      { id: '1', title: 'Clear framing', text: 'Before designing, we clarify your goals, audiences and key messages. The website starts from a real direction, not just a visual mood.' },
      { id: '2', title: 'Design that serves the brand', text: 'We balance visual impact, readability and conversion. Every page should help visitors understand your offer and take action.' },
      { id: '3', title: 'A solid technical base', text: 'Performance, responsive design, clean structure, CMS or custom stack: we build websites designed to last, evolve and be maintained.' },
      { id: '4', title: 'SEO built in from the start', text: 'Structure, content, tags, internal linking and loading speed are considered from day one to avoid costly corrections later.' },
    ],
  },
} as const

interface ServicesClientProps {
  posts: any[]
}

export default function ServicesClient({ posts }: ServicesClientProps) {
  const containerRef = useRef(null) // Le wrapper (blanc)
  const blackBoxRef = useRef(null)  // La boîte noire qui s'anime
  const { locale } = useLocale()
  const [openOffer, setOpenOffer] = useState<string | null>(null)
  const [openPack, setOpenPack] = useState<string | null>(null)
  const content = serviceContent[locale]

  // --- ANIMATION GSAP (COPIÉE DE PROJECT INTRO) ---
  useGSAP(() => {
    if (!blackBoxRef.current || !containerRef.current) return;

    // 1. Expansion de largeur (85% -> 100%)
    gsap.fromTo(blackBoxRef.current,
      { width: "85%" },
      {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // Commence quand le haut du container touche le bas de l'écran
          end: "top 60%",      // Finit quand le haut du container est à 60% de l'écran
          scrub: 0.5,
        }
      }
    )

    // 2. Fermeture en miroir (100% -> 85%) : même distance de scroll, uniquement en fin de section
    gsap.fromTo(blackBoxRef.current,
      { width: "100%" },
      {
        width: "85%",
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom 40%", // Commence quand le bas du container passe à 40% de l'écran
          end: "bottom top",   // Finit quand le bas du container sort par le haut
          scrub: 0.5,
        }
      }
    )

    // 3. Catégories : apparition par le bas avec fondu, une seule fois
    gsap.utils.toArray<HTMLElement>(".capability-row").forEach((row) => {
      gsap.set(row, { y: 80, opacity: 0 })
      ScrollTrigger.create({
        trigger: row,
        start: "top 85%", // le haut de la catégorie passe à 85% de l'écran
        once: true,
        onEnter: () => gsap.to(row, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }),
      })
    })

    // L'ouverture d'un pack change la hauteur du bloc : on recalcule les déclencheurs
    let refreshTimeout: ReturnType<typeof setTimeout>
    const observer = new ResizeObserver(() => {
      clearTimeout(refreshTimeout)
      refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 150)
    })
    observer.observe(blackBoxRef.current)

    return () => {
      observer.disconnect()
      clearTimeout(refreshTimeout)
    }
  }, { scope: containerRef })

  return (
    <main className="w-full bg-white min-h-screen pt-40 pb-32 overflow-x-clip">

      {/* 1. HERO SECTION */}
      <div className="w-full px-[40px] mb-32">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-12 items-start">
          <div className="hidden md:block col-span-1 pt-2">
            <span className="text-sm font-medium text-arti-black block">{content.label}</span>
          </div>
          <div className="col-span-1 md:col-span-4">
            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[32px] md:text-[48px] lg:text-[56px] leading-[1.1] font-normal text-arti-black tracking-tight"
            >
              {content.heroTitle}
            </motion.h1>
          </div>
          <div className="col-span-1 md:col-span-3 md:col-start-6 flex flex-col gap-8 md:mt-48">
            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-500 font-light leading-relaxed"
            >
              {content.heroText}
            </motion.p>
            <motion.div initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
                <Link href="/contact" className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-black/10 hover:bg-black hover:text-white transition-all duration-300">
                    <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    <span className="relative z-10 font-medium text-sm">{content.cta}</span>
                </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 2. EXPERTISES (ANIMÉ) */}
      {/* ContainerRef sert de repère pour le ScrollTrigger */}
      <section ref={containerRef} className="relative z-0 w-full mb-32 flex justify-center overflow-x-clip">
        <div
            ref={blackBoxRef}
            className="bg-arti-black text-white rounded-[20px] px-6 pt-14 pb-8 md:px-10 md:pt-[82px] md:pb-10 mx-auto will-change-transform"
        >
            {/* EN-TÊTE */}
            <div className="grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-4 mb-16 md:mb-[100px]">
                <div className="md:col-span-1 md:pt-[15px]">
                    <span className="text-base text-white">{content.label}</span>
                </div>
                <div className="md:col-span-5">
                    <h2 className="text-[34px] md:text-[45px] leading-[1.4] font-normal">{content.expertiseTitle}</h2>
                </div>
            </div>

            {/* LISTE SERVICES */}
            <div className="flex flex-col">
                {content.capabilities.map((cap) => (
                    <div
                        key={cap.category}
                        className="capability-row grid grid-cols-1 md:grid-cols-8 gap-x-5 gap-y-8 py-10 md:py-[50px] border-t border-white/20"
                    >
                        {/* Titre de la catégorie : suit le scroll tant que ses prestations défilent */}
                        <div className="md:col-span-5 md:sticky md:top-10 md:self-start">
                            <h3 className="text-[28px] md:text-[32px] leading-[1.4] font-normal text-white">{cap.category}</h3>
                        </div>
                        <div className="md:col-span-3 flex flex-col gap-[35px]">
                            {cap.items.map((item) => (
                                <div key={item.title} className="flex flex-col gap-2 leading-[1.4]">
                                    <h4 className="text-[20px] md:text-[22px] font-normal text-white">{item.title}</h4>
                                    <p className="text-base text-[#767676]">{item.description}</p>
                                </div>
                            ))}
                            {cap.packs.length > 0 && (
                                <div className="flex flex-col gap-[14px]">
                                    {cap.packs.map((pack) => (
                                        <PackAccordion
                                            key={pack.name}
                                            pack={pack}
                                            ctaLabel={content.packCta}
                                            isOpen={openPack === pack.name}
                                            onToggle={() => setOpenPack(openPack === pack.name ? null : pack.name)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 3. NOS OFFRES */}
      <section className="w-full px-[40px] mb-32">
        <h2 className="text-[34px] md:text-[45px] leading-[1.4] font-normal text-arti-black mb-6">{content.offersTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[5px] md:gap-y-0">
          {content.offers.map((offer) => (
            <OfferCard
              key={offer.offerId}
              offer={offer}
              ctaLabel={content.packCta}
              isOpen={openOffer === offer.offerId}
              onToggle={() => setOpenOffer(openOffer === offer.offerId ? null : offer.offerId)}
            />
          ))}
        </div>
      </section>

    {/* 4. WHY ARTICHAUD (LAYOUT FLUIDE 8 COLUMNS) */}
      {/* w-full + px-[40px] assure que le site prend toute la largeur moins les 40px de bord */}
      <section className="w-full px-[40px] mb-32">

        {/* Grille de 8 colonnes avec gouttière de 20px */}
        <div className="grid grid-cols-1 md:grid-cols-8 gap-[20px]">

            {/* --- GAUCHE (Col 1 à 4) --- */}
            {/* On utilise col-span-4 pour prendre la moitié gauche exacte */}
            <div className="md:col-span-4 mb-16 md:mb-0 relative">
                
                {/* Sticky Wrapper : On recrée une sous-grille de 4 colonnes pour aligner le texte */}
                <div className="sticky top-32 grid grid-cols-4 gap-[20px]">
                    
                    {/* Col 1 : Label */}
                    <div className="col-span-1 pt-2 border-t border-transparent">
                        <span className="text-sm font-medium text-arti-black">{content.whyLabel}</span>
                    </div>

                    {/* Col 2-3 : Titre (Le titre prend 2 colonnes, donc col-span-2) */}
                    {/* Note: Col 4 est laissée vide ici implicitement */}
                    <div className="col-span-2 md:col-span-3">
                        <h2 className="text-[40px] md:text-[60px] leading-[1.1] font-normal text-arti-black tracking-tight">
                            {content.whyTitle}
                        </h2>
                    </div>
                </div>
            </div>

            {/* --- DROITE (Col 5 à 8) --- */}
            {/* md:col-start-5 force le démarrage à la 5ème colonne */}
            <div className="md:col-span-4 md:col-start-5 flex flex-col">
                {content.values.map((val, index) => (
                    
                    // Ligne item : On recrée une grille de 4 colonnes (qui correspondent aux colonnes 5, 6, 7, 8 globales)
                    <div 
                        key={val.id} 
                        className={`grid grid-cols-1 md:grid-cols-4 gap-[20px] py-12 border-t border-black/10 group hover:bg-gray-50 transition-colors duration-500 ${index === content.values.length - 1 ? 'border-b' : ''}`}
                    >

                        {/* COLONNES 5 & 6 (Globales) -> Col 1 & 2 (Locales) : ID + TITRE */}
                        <div className="md:col-span-2 flex items-start">
                            
                            {/* ID : Placé au début de la colonne 5 */}
                            {/* w-[20%] ou une largeur fixe permet de simuler l'espace avant le titre "milieu colonne 5" */}
                            <span className="text-sm font-bold text-arti-black shrink-0 w-12 md:w-16 pt-1">
                                {val.id}
                            </span>
                            
                            {/* Titre : Commence après l'ID (milieu col 5) et s'étend vers col 6 */}
                            <h3 className="text-xl md:text-2xl font-medium text-arti-black group-hover:text-amber-600 transition-colors leading-tight">
                                {val.title}
                            </h3>
                        </div>

                        {/* COLONNES 7 & 8 (Globales) -> Col 3 & 4 (Locales) : TEXTE */}
                        <div className="md:col-span-2">
                            <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed">
                                {val.text}
                            </p>
                        </div>

                    </div>
                ))}
            </div>

        </div>
      </section>

     

      <BlogSection posts={posts} />

    </main>
  )
}
