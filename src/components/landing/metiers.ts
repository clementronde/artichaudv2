import type { OfferId } from "@/data/offers";

// Contenu des landings métier (restaurant, artisan) : même mise en page et mêmes animations, textes et photos propres à chaque métier.
// Fichier placé dans components pour que Tailwind voie les classes qu'il contient (pastilles, grille des spécialités)

// Pages servies par MetierLanding : le menu du site y est masqué (Navbarv2) au profit du menu réduit de la landing
export const LANDING_PATHS = ["/creation-site-internet-restaurant", "/creation-site-internet-artisan"];

export type Specialite = { title: string; text: string; icon?: { src: string; size: number }; area: string };
export type Formule = { offerId: OfferId; name: string; price: string; text: string; items: string[]; featured?: boolean };
export type Realisation = { layout: "pair" | "full"; images: { src: string; alt: string; position?: string }[] };

export type MetierContent = {
  // Dossier des photos du métier dans /public
  assets: string;
  whatsappLabel: string;
  // Formulaire de devis partagé avec les pages /offre ; l'offre par défaut est remplacée par la formule choisie
  form: {
    slug: string;
    offerId: OfferId;
    secondField: { label: string; placeholder: string; key: "company" | "website" };
  };
  hero: { title: string; image: string; alt: string };
  // Vignettes du hero, sur deux lignes : la pastille colorée porte l'icône (la vignette WhatsApp ouvre la seconde ligne)
  badges: { label: string; dot: string }[][];
  constat: string;
  // Chiffres clés empilés au scroll (useStatsStack) : la valeur défile de 0 à `value`
  stats: { value: number; text: string; source: string }[];
  realisations: { title: string; rows: Realisation[] };
  // Grille des spécialités : deux cartes à gauche, une haute au centre (sans icône), deux à droite
  specialites: Specialite[];
  formules: { title: string; items: Formule[] };
  avisTitle: [string, string];
  etapes: { title: string; items: { title: string; text: string }[] };
  commander: { title: string; text: string };
};

const SPECIALITE_AREAS = {
  topLeft: "md:col-start-1 md:row-start-1",
  bottomLeft: "md:col-start-1 md:row-start-2",
  center: "md:col-start-2 md:row-span-2",
  topRight: "md:col-start-3 md:row-start-1",
  bottomRight: "md:col-start-3 md:row-start-2",
};

export const restaurant: MetierContent = {
  assets: "/LP/restaurant",
  whatsappLabel: "offre site internet pour restaurant",
  form: {
    slug: "restaurant",
    offerId: "resto",
    secondField: { label: "Nom de votre restaurant", placeholder: "Le Petit Bistrot", key: "company" },
  },
  hero: { title: "Le site de votre restaurant prêt en 7 jours", image: "hero.png", alt: "Table dressée dans un restaurant" },
  badges: [
    [
      { label: "1 500 €", dot: "bg-[#f70046]" },
      { label: "Visible sur les IA", dot: "bg-[#30041b]" },
      { label: "7 jours", dot: "bg-[#b50f66]" },
    ],
    [{ label: "Réservation en ligne", dot: "bg-[#f70046]" }],
  ],
  constat: "Aujourd'hui, on choisit son restaurant sur son téléphone avant de pousser la porte. Votre site est votre première impression : il doit donner faim, rassurer et faire réserver.",
  stats: [
    { value: 77, text: "des clients consultent le site d'un restaurant avant d'y aller ou de commander.", source: "Enquête MGH, 2019" },
    { value: 69, text: "des clients disent que le site d'un restaurant les aide à décider d'y manger.", source: "Enquête MGH, 2019" },
    { value: 59, text: "des clients regardent le menu en ligne avant de choisir où manger.", source: "Étude TouchBistro" },
  ],
  realisations: {
    title: "Des sites internets à toutes les sauces",
    rows: [
      {
        layout: "pair",
        images: [
          { src: "realisation-1.png", alt: "Site de restaurant affiché sur smartphone" },
          { src: "realisation-2.png", alt: "Site de restaurant affiché sur ordinateur portable" },
        ],
      },
      {
        layout: "full",
        images: [{ src: "realisation-3.png", alt: "Identité visuelle Yumdeal déclinée sur affiches et sacs", position: "object-bottom" }],
      },
    ],
  },
  specialites: [
    {
      title: "Pensé pour le mobile",
      text: "Vos clients vous cherchent sur leur téléphone, souvent à deux rues de chez vous. Carte, horaires et adresse s'affichent en un coup d'œil.",
      icon: { src: "icon-desktop.svg", size: 24 },
      area: SPECIALITE_AREAS.topLeft,
    },
    {
      title: "Menu & réservation",
      text: "Une carte toujours à jour et un bouton « Réserver » sur chaque page. Moins d'appels pendant le coup de feu, plus de couverts.",
      icon: { src: "icon-map.svg", size: 35 },
      area: SPECIALITE_AREAS.bottomLeft,
    },
    {
      title: "Un design qui donne faim",
      text: "Photos qui mettent l'eau à la bouche, ambiance fidèle à votre salle, identité qui vous ressemble : on donne envie de pousser la porte avant la première bouchée.",
      area: SPECIALITE_AREAS.center,
    },
    {
      title: "Modifiable sans coder",
      text: "Plat du jour, nouvelle carte, fermeture exceptionnelle : vous mettez votre site à jour vous-même, en quelques clics, entre deux services.",
      icon: { src: "icon-puzzle.svg", size: 30 },
      area: SPECIALITE_AREAS.topRight,
    },
    {
      title: "Visible sur Google & les IA",
      text: "Référencement local, fiche Google soignée, site rapide : vous sortez quand on tape « restaurant près de moi », sur Google comme sur ChatGPT.",
      icon: { src: "icon-rocket.svg", size: 28 },
      area: SPECIALITE_AREAS.bottomRight,
    },
  ],
  formules: {
    title: "Choisissez votre formule, on s'occupe du service",
    items: [
      {
        offerId: "resto-identite",
        name: "Identité graphique",
        price: "1 000 €",
        text: "Une charte graphique qui a du goût, déclinée sur tout ce qui fait vivre votre restaurant.",
        items: ["Logo et charte graphique", "Menu et carte des vins", "Devanture et ardoises", "Cartes de visite et de fidélité", "Visuels réseaux sociaux", "Livrée en 7 jours ouvrés"],
      },
      {
        offerId: "resto-pack",
        name: "Pack complet",
        price: "2 000 €",
        text: "L'identité et le site servis ensemble : votre restaurant en ligne en 7 jours ouvrés.",
        items: ["Logo et mini-charte", "Site vitrine sur mesure", "Menu et réservation", "Optimisé mobile et Google", "En ligne en 7 jours ouvrés"],
        featured: true,
      },
      {
        offerId: "resto-site",
        name: "Site web",
        price: "1 500 €",
        text: "Un site sur mesure pour une adresse qui a déjà son identité et veut aller plus loin.",
        items: ["Maquettes sur mesure", "Site rapide et responsive", "Contenus modifiables", "Référencement de base", "Prise en main incluse", "En ligne en 7 jours ouvrés"],
      },
    ],
  },
  avisTitle: ["Les avis", "de la maison"],
  etapes: {
    title: "De la commande au service en 7 jours",
    items: [
      {
        title: "L'appel découverte",
        text: "30 minutes pour comprendre votre cuisine, votre clientèle et vos envies. On repart avec tout ce qu'il faut pour passer en cuisine.",
      },
      {
        title: "La dégustation",
        text: "On conçoit votre identité et votre site, puis on vous fait goûter la maquette. Vos retours sont intégrés avant le service.",
      },
      {
        title: "L'envoi",
        text: "Votre site est en ligne, référencé et prêt à recevoir ses premières réservations. On vous montre comment le faire vivre vous-même.",
      },
    ],
  },
  commander: {
    title: "Le site de votre restaurant prêt en 7 jours",
    text: "Parlez-nous de votre restaurant : on vous rappelle pour cadrer le projet. Le devis est gratuit.",
  },
};

export const artisan: MetierContent = {
  assets: "/LP/artisan",
  whatsappLabel: "offre site internet pour artisan",
  form: {
    slug: "artisan",
    offerId: "artisan",
    secondField: { label: "Nom de votre entreprise", placeholder: "Atelier Martin", key: "company" },
  },
  hero: { title: "Le site de votre savoir-faire prêt en 7 jours", image: "hero.jpg", alt: "Artisan maroquinier au travail dans son atelier" },
  badges: [
    [
      { label: "1 500 €", dot: "bg-[#f70046]" },
      { label: "Visible sur les IA", dot: "bg-[#30041b]" },
      { label: "7 jours", dot: "bg-[#b50f66]" },
    ],
    [{ label: "Devis en ligne", dot: "bg-[#f70046]" }],
  ],
  constat: "Aujourd'hui, on cherche son artisan sur son téléphone avant de décrocher. Votre site est votre vitrine : il doit montrer votre travail, inspirer confiance et faire appeler.",
  stats: [
    { value: 90, text: "des consommateurs ont utilisé internet pour trouver un professionnel près de chez eux dans l'année.", source: "BrightLocal, Local Consumer Review Survey 2019" },
    { value: 76, text: "des personnes qui cherchent un professionnel à proximité sur leur smartphone s'y rendent dans la journée.", source: "Think with Google" },
    { value: 50, text: "des consommateurs vont sur le site d'un professionnel après avoir lu un avis positif.", source: "BrightLocal, Local Consumer Review Survey 2018" },
  ],
  realisations: {
    title: "Des sites à la hauteur de votre savoir-faire",
    rows: [
      {
        layout: "pair",
        images: [
          { src: "realisation-1.png", alt: "Site d'une boulangerie artisanale affiché sur smartphone" },
          { src: "realisation-2.png", alt: "Site d'un créateur de carnets affiché sur ordinateur portable" },
        ],
      },
      {
        layout: "full",
        images: [{ src: "realisation-3.png", alt: "Site de la créatrice textile Remembraance affiché sur ordinateur portable", position: "object-[center_62%]" }],
      },
    ],
  },
  specialites: [
    {
      title: "Pensé pour le mobile",
      text: "Vos clients vous cherchent depuis leur téléphone, souvent dans l'urgence. Numéro, zone d'intervention et horaires s'affichent en un coup d'œil.",
      icon: { src: "icon-desktop.svg", size: 24 },
      area: SPECIALITE_AREAS.topLeft,
    },
    {
      title: "Devis & prise de contact",
      text: "Un formulaire de demande de devis et un bouton d'appel sur chaque page : les demandes arrivent, même quand vous êtes sur un chantier.",
      icon: { src: "icon-map.svg", size: 35 },
      area: SPECIALITE_AREAS.bottomLeft,
    },
    {
      title: "Votre travail mis en valeur",
      text: "Galerie de réalisations, avant-après, photos d'atelier : on montre la qualité de votre travail avant même le premier rendez-vous.",
      area: SPECIALITE_AREAS.center,
    },
    {
      title: "Modifiable sans coder",
      text: "Nouvelle réalisation, congés, nouveau service : vous mettez votre site à jour vous-même, en quelques clics, entre deux chantiers.",
      icon: { src: "icon-puzzle.svg", size: 30 },
      area: SPECIALITE_AREAS.topRight,
    },
    {
      title: "Visible sur Google & les IA",
      text: "Référencement local, fiche Google soignée, site rapide : vous sortez quand on tape « menuisier près de moi », sur Google comme sur ChatGPT.",
      icon: { src: "icon-rocket.svg", size: 28 },
      area: SPECIALITE_AREAS.bottomRight,
    },
  ],
  formules: {
    title: "Choisissez votre formule, on s'occupe du chantier",
    items: [
      {
        offerId: "artisan-identite",
        name: "Identité graphique",
        price: "1 000 €",
        text: "Une identité aussi solide que votre savoir-faire, déclinée sur tout ce qui fait tourner votre activité.",
        items: ["Logo et charte graphique", "Devis et factures à vos couleurs", "Cartes de visite et flyers", "Marquage du véhicule et tenues", "Visuels réseaux sociaux", "Livrée en 7 jours ouvrés"],
      },
      {
        offerId: "artisan-pack",
        name: "Pack complet",
        price: "2 000 €",
        text: "L'identité et le site livrés ensemble : votre activité en ligne en 7 jours ouvrés.",
        items: ["Logo et mini-charte", "Site vitrine sur mesure", "Galerie de réalisations", "Demande de devis en ligne", "En ligne en 7 jours ouvrés"],
        featured: true,
      },
      {
        offerId: "artisan-site",
        name: "Site web",
        price: "1 500 €",
        text: "Un site sur mesure pour un artisan qui a déjà son identité et veut plus de demandes.",
        items: ["Maquettes sur mesure", "Site rapide et responsive", "Contenus modifiables", "Référencement local", "Prise en main incluse", "En ligne en 7 jours ouvrés"],
      },
    ],
  },
  avisTitle: ["Les avis", "de nos clients"],
  etapes: {
    title: "De la commande à la livraison en 7 jours",
    items: [
      {
        title: "L'appel découverte",
        text: "30 minutes pour comprendre votre métier, vos clients et votre zone d'intervention. On repart avec tout ce qu'il faut pour se mettre à l'ouvrage.",
      },
      {
        title: "La maquette",
        text: "On conçoit votre identité et votre site, puis on vous présente la maquette. Vos retours sont intégrés avant les finitions.",
      },
      {
        title: "La livraison",
        text: "Votre site est en ligne, référencé et prêt à recevoir ses premières demandes de devis. On vous montre comment le faire vivre vous-même.",
      },
    ],
  },
  commander: {
    title: "Le site de votre savoir-faire prêt en 7 jours",
    text: "Parlez-nous de votre activité : on vous rappelle pour cadrer le projet. Le devis est gratuit.",
  },
};
