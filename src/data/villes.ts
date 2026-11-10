// Landings locales « création de site internet + ville » : Saint-Nazaire, presqu'île guérandaise, Côte de Jade, Brière et Nantes.
// Chaque ville a un texte propre (intro, métiers, angle SEO, FAQ) : des pages identiques à un nom de ville près
// seraient vues comme des pages satellites par Google et ne rankeraient pas.

export type Secteur = "estuaire" | "presquile" | "jade" | "briere" | "nantes";

export const SECTEURS: Record<Secteur, { name: string; text: string }> = {
  estuaire: {
    name: "Saint-Nazaire et l'estuaire",
    text: "Le bassin industriel et portuaire de la Loire : chantiers navals, aéronautique et un tissu dense d'artisans du bâtiment.",
  },
  presquile: {
    name: "La Baule et la presqu'île guérandaise",
    text: "Stations balnéaires, ports et marais salants : une clientèle locale à l'année et des résidents secondaires qui cherchent leurs artisans sur Google.",
  },
  jade: {
    name: "Pornic et la Côte de Jade",
    text: "Du pont de Saint-Nazaire à la baie de Bourgneuf : tourisme, maisons secondaires et artisans qui travaillent sur tout le Pays de Retz.",
  },
  briere: {
    name: "La Brière",
    text: "Le Parc naturel régional de Brière et ses communes : chaumières, rénovation du bâti ancien et artisans du patrimoine.",
  },
  nantes: {
    name: "Nantes et la métropole",
    text: "La capitale régionale et son agglomération : une concurrence forte en ligne, où un site rapide et bien référencé fait la différence.",
  },
};

export type Ville = {
  slug: string;
  name: string;
  // « à Saint-Nazaire », « au Croisic »
  in: string;
  // « de Saint-Nazaire », « du Croisic »
  of: string;
  postalCode: string;
  secteur: Secteur;
  geo: { lat: number; lng: number };
  // Deux paragraphes propres à la ville : son économie, sa clientèle, ce que ça change pour le site
  intro: [string, string];
  // Métiers les plus représentés ou les plus recherchés sur place
  metiers: string[];
  // Ce qui se joue en référencement local sur cette commune
  seo: string;
  // Recherches types que l'on vise pour nos clients
  requetes: string[];
  voisines: string[];
  faq: { q: string; a: string }[];
};

export const villes: Ville[] = [
  {
    slug: "saint-nazaire",
    name: "Saint-Nazaire",
    in: "à Saint-Nazaire",
    of: "de Saint-Nazaire",
    postalCode: "44600",
    secteur: "estuaire",
    geo: { lat: 47.2735, lng: -2.2138 },
    intro: [
      "Saint-Nazaire vit au rythme des Chantiers de l'Atlantique, d'Airbus et de son port : des milliers de salariés, de sous-traitants et de familles qui cherchent chaque semaine un plombier, un électricien, un menuisier ou un paysagiste. Entre le centre-ville reconstruit, Penhoët, Méan, Saint-Marc-sur-Mer et les quartiers résidentiels, la demande est forte et la concurrence aussi.",
      "Votre site doit donc faire mieux que vos concurrents sur un point précis : être trouvé quand un Nazairien tape votre métier sur son téléphone, puis lui donner envie d'appeler vous plutôt que le suivant. C'est exactement ce qu'on construit, en 7 jours.",
    ],
    metiers: ["Plombier chauffagiste", "Électricien", "Menuisier", "Couvreur", "Peintre en bâtiment", "Serrurier", "Paysagiste", "Garagiste", "Coiffeur"],
    seo: "À Saint-Nazaire, les recherches locales se jouent quartier par quartier : on ne cherche pas seulement « plombier Saint-Nazaire » mais aussi « plombier Saint-Marc-sur-Mer » ou « électricien Trignac ». On structure votre site pour couvrir la ville et sa périphérie, on optimise votre fiche Google Business Profile et on prépare les pages qui vous positionnent sur l'agglomération de la CARENE.",
    requetes: ["création site internet Saint-Nazaire", "agence web Saint-Nazaire", "site internet artisan Saint-Nazaire", "plombier Saint-Nazaire", "électricien Saint-Nazaire"],
    voisines: ["trignac", "montoir-de-bretagne", "pornichet", "saint-andre-des-eaux", "donges", "saint-brevin-les-pins"],
    faq: [
      {
        q: "Combien coûte la création d'un site internet à Saint-Nazaire ?",
        a: "Nos formules démarrent à 1 500 € pour un site vitrine sur mesure, et 2 000 € avec le logo et l'identité graphique. Le prix est fixe, annoncé avant de commencer, sans abonnement caché : vous savez exactement ce que vous payez.",
      },
      {
        q: "Travaillez-vous avec les sous-traitants des chantiers navals et de l'aéronautique ?",
        a: "Oui. Pour une entreprise qui travaille en B2B avec les donneurs d'ordre du bassin nazairien, on met en avant les certifications, les références et les capacités de production, avec un site sobre et rassurant pour les acheteurs.",
      },
    ],
  },
  {
    slug: "la-baule-escoublac",
    name: "La Baule-Escoublac",
    in: "à La Baule",
    of: "de La Baule",
    postalCode: "44500",
    secteur: "presquile",
    geo: { lat: 47.2866, lng: -2.3906 },
    intro: [
      "La Baule, c'est une baie de neuf kilomètres, des villas Belle Époque, une clientèle exigeante et une population qui double l'été. Les résidents secondaires arrivent avec une liste de travaux et cherchent leurs artisans en ligne, souvent depuis Paris ou Nantes, avant même d'être sur place.",
      "Pour un artisan, un commerce ou un professionnel baulois, le site internet est donc la première visite de chantier : il doit montrer un travail soigné, des réalisations haut de gamme et une vraie réactivité. On conçoit des sites à la hauteur de l'image de la station.",
    ],
    metiers: ["Rénovation de villas", "Menuisier ébéniste", "Architecte d'intérieur", "Paysagiste", "Piscinier", "Conciergerie", "Agent immobilier", "Esthéticienne", "Caviste"],
    seo: "À La Baule, une partie de vos clients vous cherche à distance : « rénovation maison La Baule », « paysagiste La Baule-Escoublac », « entretien villa La Baule ». On travaille donc le référencement sur les deux noms de la commune, sur les quartiers (Escoublac, La Baule-les-Pins, le Guézy) et sur les communes de la presqu'île, avec des pages qui parlent aussi aux propriétaires non résidents.",
    requetes: ["création site internet La Baule", "agence web La Baule", "site internet artisan La Baule", "paysagiste La Baule", "rénovation villa La Baule"],
    voisines: ["pornichet", "le-pouliguen", "guerande", "saint-andre-des-eaux", "batz-sur-mer", "saint-nazaire"],
    faq: [
      {
        q: "Pouvez-vous créer un site pour une clientèle de résidents secondaires ?",
        a: "C'est même une spécialité de la presqu'île. On met en avant ce qui rassure un propriétaire à distance : photos avant-après, suivi de chantier, devis en ligne, réponse rapide et, si besoin, une version anglaise pour la clientèle étrangère.",
      },
      {
        q: "Mon site peut-il ressortir sur « La Baule » et sur « La Baule-Escoublac » ?",
        a: "Oui. Google comprend les deux appellations, à condition que votre site, votre fiche Google Business Profile et vos annuaires utilisent des informations cohérentes. On s'en occupe pendant la mise en ligne.",
      },
    ],
  },
  {
    slug: "pornic",
    name: "Pornic",
    in: "à Pornic",
    of: "de Pornic",
    postalCode: "44210",
    secteur: "jade",
    geo: { lat: 47.1155, lng: -2.1027 },
    intro: [
      "Avec son château, son vieux port et ses criques, Pornic est la porte d'entrée de la Côte de Jade. Depuis la fusion avec Le Clion-sur-Mer et Sainte-Marie-sur-Mer, la commune s'étend loin sur la côte et regroupe une clientèle à l'année, des retraités qui s'installent et de nombreuses maisons secondaires.",
      "Artisans, commerçants, thérapeutes, gîtes et restaurants pornicais ont tous le même enjeu : être visibles quand on cherche « près de Pornic », aussi bien l'hiver que pendant la saison. Un site rapide, clair et bien référencé, c'est un carnet de commandes qui se remplit sans démarchage.",
    ],
    metiers: ["Maçon", "Couvreur", "Charpentier", "Menuisier", "Électricien", "Paysagiste", "Gîte et chambre d'hôtes", "Ostéopathe", "Restaurant"],
    seo: "À Pornic, les recherches mélangent la ville et ses anciens bourgs : « couvreur Sainte-Marie-sur-Mer », « maçon Le Clion-sur-Mer », « électricien Pornic ». On prévoit une zone d'intervention claire qui couvre aussi La Bernerie-en-Retz, Préfailles, La Plaine-sur-Mer et Chauvé, pour capter tout le Pays de Retz.",
    requetes: ["création site internet Pornic", "agence web Pornic", "site internet artisan Pornic", "couvreur Pornic", "maçon Pornic"],
    voisines: ["la-plaine-sur-mer", "prefailles", "saint-michel-chef-chef", "saint-brevin-les-pins"],
    faq: [
      {
        q: "Je suis artisan à Pornic, mon site peut-il couvrir tout le Pays de Retz ?",
        a: "Oui. On définit avec vous votre zone d'intervention réelle et on l'inscrit dans le site, la fiche Google et les données structurées. Vous pouvez ainsi ressortir sur les communes voisines sans créer de fausses adresses.",
      },
      {
        q: "Est-ce que vous faites aussi les sites de gîtes et de locations saisonnières ?",
        a: "Oui. Pour un hébergement, on met en avant les photos, les disponibilités et un lien vers votre outil de réservation, afin de récupérer des réservations directes sans commission.",
      },
    ],
  },
  {
    slug: "pornichet",
    name: "Pornichet",
    in: "à Pornichet",
    of: "de Pornichet",
    postalCode: "44380",
    secteur: "presquile",
    geo: { lat: 47.2484, lng: -2.3411 },
    intro: [
      "Coincée entre Saint-Nazaire et La Baule, Pornichet profite des deux : son port de plaisance, son hippodrome et son marché attirent une clientèle fidèle, tandis que Sainte-Marguerite et Bonne-Source accueillent résidents à l'année et vacanciers.",
      "Pour un professionnel pornichétin, la difficulté est d'exister entre deux grandes voisines : sur Google, les résultats de Saint-Nazaire et de La Baule prennent souvent la place. Un site bien construit vous redonne votre terrain de jeu et vous fait apparaître sur les trois communes.",
    ],
    metiers: ["Plombier", "Électricien", "Menuisier", "Peintre", "Nautisme et accastillage", "Paysagiste", "Conciergerie", "Coiffeur", "Commerce de bouche"],
    seo: "À Pornichet, on vise à la fois la commune et ses voisines : « électricien Pornichet », « plombier La Baule », « menuisier Saint-Nazaire ». On travaille aussi les quartiers recherchés comme Sainte-Marguerite et Bonne-Source, et la fiche Google Business Profile, décisive sur les recherches « près de moi ».",
    requetes: ["création site internet Pornichet", "agence web Pornichet", "site artisan Pornichet", "électricien Pornichet", "plombier Pornichet"],
    voisines: ["la-baule-escoublac", "saint-nazaire", "saint-andre-des-eaux", "le-pouliguen"],
    faq: [
      {
        q: "Comment ressortir sur Google face aux entreprises de La Baule et de Saint-Nazaire ?",
        a: "En étant plus précis qu'elles : une fiche Google complète et active, des avis réguliers, des pages qui parlent de votre zone exacte et un site rapide sur mobile. Sur une recherche locale, la proximité et la pertinence comptent autant que la taille.",
      },
      {
        q: "Combien de temps faut-il pour que mon site soit en ligne ?",
        a: "7 jours ouvrés entre l'appel découverte et la mise en ligne, à condition d'avoir vos photos et vos textes ou de nous laisser les rédiger. Le référencement, lui, monte progressivement dans les semaines qui suivent.",
      },
    ],
  },
  {
    slug: "le-pouliguen",
    name: "Le Pouliguen",
    in: "au Pouliguen",
    of: "du Pouliguen",
    postalCode: "44510",
    secteur: "presquile",
    geo: { lat: 47.2716, lng: -2.4296 },
    intro: [
      "Le Pouliguen, c'est le port de la baie, le marché, les rues commerçantes et la côte sauvage qui file vers Batz-sur-Mer. Une petite commune très vivante où la clientèle se fait beaucoup au bouche-à-oreille… et désormais sur Google, où l'on vérifie un artisan avant de l'appeler.",
      "Pour un commerce, un artisan ou un professionnel de santé pouliguennais, un site simple et soigné suffit souvent à transformer une recommandation en rendez-vous : on vous trouve, on voit votre travail, on vous contacte.",
    ],
    metiers: ["Menuisier", "Peintre", "Charpentier de marine", "Électricien", "Plombier", "Restaurant et crêperie", "Boutique", "Kinésithérapeute"],
    seo: "Au Pouliguen, les recherches débordent naturellement sur La Baule et Batz-sur-Mer. On construit votre site pour couvrir ce triangle, avec des contenus qui parlent du port, de la côte et des maisons anciennes de la presqu'île, et une fiche Google qui renvoie directement vers vos réalisations.",
    requetes: ["création site internet Le Pouliguen", "site internet artisan Le Pouliguen", "menuisier Le Pouliguen", "peintre Le Pouliguen"],
    voisines: ["la-baule-escoublac", "batz-sur-mer", "le-croisic", "guerande"],
    faq: [
      {
        q: "Un petit commerce du Pouliguen a-t-il vraiment besoin d'un site ?",
        a: "Oui, car vos clients vérifient en ligne vos horaires, votre adresse et vos avis avant de venir. Un site propre, relié à votre fiche Google, rassure les visiteurs de passage et fidélise les habitués.",
      },
      {
        q: "Pouvez-vous rédiger les textes de mon site ?",
        a: "Oui. Lors de l'appel découverte, on récupère tout ce qu'il faut sur votre activité et on rédige des textes optimisés pour Google. Vous relisez et validez avant la mise en ligne.",
      },
    ],
  },
  {
    slug: "batz-sur-mer",
    name: "Batz-sur-Mer",
    in: "à Batz-sur-Mer",
    of: "de Batz-sur-Mer",
    postalCode: "44740",
    secteur: "presquile",
    geo: { lat: 47.2777, lng: -2.4808 },
    intro: [
      "Entre marais salants et côte sauvage, Batz-sur-Mer garde un caractère unique : son clocher de Saint-Guénolé, ses paludiers, ses maisons de granit et ses plages comme la Govelle ou Saint-Michel. Une commune où l'authenticité est une valeur, y compris pour choisir ses artisans.",
      "Paludier, artisan du bâti ancien, producteur, commerce ou hébergement : votre site doit raconter ce savoir-faire avec des photos fortes et des textes justes. C'est aussi un moyen de vendre en ligne ou de faire connaître votre activité bien au-delà de la presqu'île.",
    ],
    metiers: ["Paludier et producteur de sel", "Maçon pierre", "Couvreur", "Menuisier", "Chambre d'hôtes", "Artisan d'art", "Restaurant", "Paysagiste"],
    seo: "À Batz-sur-Mer, les recherches mêlent local et tourisme : « sel de Guérande producteur », « maçon pierre presqu'île guérandaise », « chambre d'hôtes Batz-sur-Mer ». On positionne votre site sur la commune et sur la presqu'île entière, avec des contenus qui valorisent le patrimoine et votre savoir-faire.",
    requetes: ["création site internet Batz-sur-Mer", "site internet artisan Batz-sur-Mer", "maçon Batz-sur-Mer", "paludier Batz-sur-Mer"],
    voisines: ["le-croisic", "le-pouliguen", "guerande", "la-baule-escoublac"],
    faq: [
      {
        q: "Peut-on vendre ses produits en ligne depuis le site ?",
        a: "Oui. Pour un paludier, un producteur ou un artisan d'art, on peut ajouter une petite boutique en ligne ou un catalogue avec commande par message, selon le volume et votre organisation.",
      },
      {
        q: "Mon site sera-t-il visible par les touristes de la presqu'île ?",
        a: "C'est l'objectif. On travaille les recherches qu'ils font avant et pendant leur séjour, et on soigne votre fiche Google, qui apparaît sur Google Maps quand ils cherchent autour d'eux.",
      },
    ],
  },
  {
    slug: "le-croisic",
    name: "Le Croisic",
    in: "au Croisic",
    of: "du Croisic",
    postalCode: "44490",
    secteur: "presquile",
    geo: { lat: 47.2925, lng: -2.5101 },
    intro: [
      "Port de pêche, maisons d'armateurs, criée et Océarium : Le Croisic attire toute l'année une clientèle de visiteurs et de propriétaires attachés à son patrimoine. Au bout de la presqu'île, on fait volontiers appel aux artisans du coin… à condition de les trouver.",
      "Pour un artisan, un commerce du port ou un restaurant croisicais, un site internet clair et rapide fait la différence : c'est lui qui apparaît quand on cherche un professionnel au Croisic, et lui qui convainc de vous appeler.",
    ],
    metiers: ["Couvreur ardoisier", "Maçon", "Menuisier", "Électricien", "Mareyeur et poissonnier", "Restaurant de fruits de mer", "Location saisonnière", "Commerce du port"],
    seo: "Au Croisic, la zone de chalandise s'étend vers Batz-sur-Mer, Le Pouliguen et Guérande. On structure votre site pour ces communes, on soigne votre présence sur Google Maps, décisive pour les visiteurs, et on rédige des contenus qui parlent du patrimoine et des maisons anciennes du port.",
    requetes: ["création site internet Le Croisic", "site internet artisan Le Croisic", "couvreur Le Croisic", "restaurant Le Croisic"],
    voisines: ["batz-sur-mer", "le-pouliguen", "guerande", "la-turballe"],
    faq: [
      {
        q: "Je suis couvreur au Croisic, comment avoir plus de demandes de devis ?",
        a: "Avec une galerie de chantiers, un formulaire de devis simple, un bouton d'appel visible sur mobile et une fiche Google bien remplie. Les propriétaires de maisons anciennes veulent voir des réalisations comparables avant d'appeler.",
      },
      {
        q: "Le site peut-il être bilingue pour les visiteurs étrangers ?",
        a: "Oui, on peut prévoir une version anglaise. C'est utile pour un restaurant, un hébergement ou un commerce qui reçoit une clientèle touristique.",
      },
    ],
  },
  {
    slug: "guerande",
    name: "Guérande",
    in: "à Guérande",
    of: "de Guérande",
    postalCode: "44350",
    secteur: "presquile",
    geo: { lat: 47.3283, lng: -2.4292 },
    intro: [
      "Ville médiévale aux remparts intacts, capitale du sel et cœur de la presqu'île, Guérande concentre commerces, artisans et entreprises qui travaillent sur toute la côte, de La Turballe à La Baule. Ses zones d'activités et ses villages, de Saillé à Clis, forment un territoire étendu.",
      "Pour une entreprise guérandaise, le site internet doit porter à la fois l'ancrage local et la capacité à intervenir sur toute la presqu'île. On construit des sites qui inspirent confiance et qui ressortent sur Guérande comme sur les communes voisines.",
    ],
    metiers: ["Maçon et rénovation", "Couvreur", "Charpentier", "Menuisier", "Électricien", "Plombier chauffagiste", "Paysagiste", "Producteur de sel", "Commerce de la cité"],
    seo: "Guérande sert de point d'ancrage à toute la presqu'île : on vise « maçon Guérande », mais aussi « rénovation presqu'île guérandaise », « couvreur La Turballe » ou « charpentier La Baule ». On organise votre site par services et par zone pour couvrir Cap Atlantique sans diluer votre référencement.",
    requetes: ["création site internet Guérande", "agence web Guérande", "site internet artisan Guérande", "maçon Guérande", "couvreur Guérande"],
    voisines: ["la-turballe", "la-baule-escoublac", "saint-andre-des-eaux", "herbignac", "batz-sur-mer", "piriac-sur-mer"],
    faq: [
      {
        q: "Mon entreprise est à Guérande, mais je travaille sur toute la presqu'île : comment le montrer ?",
        a: "Avec une zone d'intervention explicite sur le site, des réalisations localisées par commune et des données structurées qui indiquent à Google les villes que vous couvrez. C'est plus efficace qu'une liste de villes en bas de page.",
      },
      {
        q: "Peut-on refaire uniquement l'identité graphique de mon entreprise ?",
        a: "Oui, la formule Identité graphique à 1 000 € comprend le logo, la charte, les cartes de visite, les devis à vos couleurs et le marquage du véhicule. Elle peut être complétée par le site plus tard.",
      },
    ],
  },
  {
    slug: "la-turballe",
    name: "La Turballe",
    in: "à La Turballe",
    of: "de La Turballe",
    postalCode: "44420",
    secteur: "presquile",
    geo: { lat: 47.3466, lng: -2.5079 },
    intro: [
      "Grand port de pêche de la presqu'île, La Turballe vit de la mer : criée, sardine et anchois, chantiers, plages de Pen Bron et des Bretons. Une économie maritime et touristique où les artisans et les commerces travaillent fort toute l'année et plus encore l'été.",
      "Pour un professionnel turballais, un site efficace permet de capter les demandes des résidents comme des vacanciers, et de ne plus dépendre uniquement du bouche-à-oreille ou des plateformes payantes.",
    ],
    metiers: ["Mécanique marine", "Électricien", "Plombier", "Menuisier", "Maçon", "Poissonnerie et conserverie", "Camping et location", "Restaurant"],
    seo: "À La Turballe, on vise la commune, Piriac-sur-Mer et Guérande, avec des recherches très saisonnières. On prépare votre site et votre fiche Google pour les pics d'été, et des contenus qui continuent à générer des demandes l'hiver auprès des habitants.",
    requetes: ["création site internet La Turballe", "site internet artisan La Turballe", "électricien La Turballe", "mécanique marine La Turballe"],
    voisines: ["piriac-sur-mer", "guerande", "le-croisic", "herbignac"],
    faq: [
      {
        q: "Mon activité est très saisonnière, un site vaut-il le coup ?",
        a: "Oui, justement : les recherches commencent bien avant l'été. Un site bien référencé capte les réservations et les demandes en amont, et vous pouvez mettre à jour vos horaires et vos offres vous-même selon la saison.",
      },
      {
        q: "Puis-je modifier mon site sans connaissances techniques ?",
        a: "Oui. On vous livre un site modifiable en quelques clics et on vous montre comment ajouter une photo, changer un texte ou annoncer une fermeture.",
      },
    ],
  },
  {
    slug: "piriac-sur-mer",
    name: "Piriac-sur-Mer",
    in: "à Piriac-sur-Mer",
    of: "de Piriac-sur-Mer",
    postalCode: "44420",
    secteur: "presquile",
    geo: { lat: 47.3791, lng: -2.5453 },
    intro: [
      "Petite Cité de Caractère au bout de la presqu'île, Piriac-sur-Mer charme par son bourg de granit, son port et sa côte découpée. Ici, les maisons anciennes, les résidences secondaires et le tourisme font vivre une économie de proximité exigeante sur la qualité.",
      "Artisans du bâti ancien, commerces, restaurants ou hébergements : votre site doit refléter le soin que vous mettez dans votre travail, et vous rendre trouvable par les propriétaires qui cherchent un professionnel de confiance à Piriac.",
    ],
    metiers: ["Maçon pierre", "Couvreur", "Menuisier", "Paysagiste", "Entretien de résidences secondaires", "Chambre d'hôtes", "Restaurant", "Artisan d'art"],
    seo: "À Piriac, les propriétaires cherchent souvent depuis chez eux, loin de la côte : « entretien maison Piriac-sur-Mer », « maçon Piriac ». On vous positionne sur Piriac, La Turballe, Mesquer et Guérande, avec des contenus qui parlent du patrimoine et du suivi de chantier à distance.",
    requetes: ["création site internet Piriac-sur-Mer", "site internet artisan Piriac", "maçon Piriac-sur-Mer", "entretien maison Piriac"],
    voisines: ["la-turballe", "guerande", "herbignac", "le-croisic"],
    faq: [
      {
        q: "Comment rassurer un propriétaire qui ne vit pas à Piriac toute l'année ?",
        a: "En montrant des chantiers terminés, en expliquant votre suivi (photos, compte rendu, délais) et en proposant un devis en ligne. Le site devient votre meilleur commercial auprès des clients à distance.",
      },
      {
        q: "Faites-vous les sites des hébergements et restaurants ?",
        a: "Oui, avec des formules adaptées : menu ou chambres en ligne, photos d'ambiance, lien de réservation et référencement local.",
      },
    ],
  },
  {
    slug: "saint-brevin-les-pins",
    name: "Saint-Brevin-les-Pins",
    in: "à Saint-Brevin-les-Pins",
    of: "de Saint-Brevin-les-Pins",
    postalCode: "44250",
    secteur: "jade",
    geo: { lat: 47.2465, lng: -2.1667 },
    intro: [
      "Au pied du pont de Saint-Nazaire, Saint-Brevin-les-Pins réunit plages, forêt de pins, le Serpent d'océan de Mindin et une population qui ne cesse de grandir. Beaucoup de Brévinois travaillent de l'autre côté de l'estuaire, et les artisans interviennent sur les deux rives.",
      "Votre site doit refléter cette double zone : visible sur Saint-Brevin et la Côte de Jade, mais aussi sur Saint-Nazaire, à quelques minutes par le pont. Un vrai levier pour remplir votre agenda toute l'année.",
    ],
    metiers: ["Maçon", "Plombier", "Électricien", "Menuisier", "Paysagiste", "Élagueur", "Piscinier", "Agent immobilier", "Camping"],
    seo: "À Saint-Brevin, on travaille un référencement sur les deux rives : « paysagiste Saint-Brevin », « élagueur Saint-Brevin-les-Pins », « plombier Saint-Nazaire ». On ajoute Saint-Michel-Chef-Chef, Corsept et Paimbœuf pour couvrir tout le nord du Pays de Retz.",
    requetes: ["création site internet Saint-Brevin-les-Pins", "site internet artisan Saint-Brevin", "paysagiste Saint-Brevin", "élagueur Saint-Brevin"],
    voisines: ["saint-michel-chef-chef", "saint-nazaire", "pornic", "la-plaine-sur-mer"],
    faq: [
      {
        q: "Je travaille à Saint-Brevin et à Saint-Nazaire, peut-on cibler les deux ?",
        a: "Oui. On construit votre site et votre fiche Google autour de votre adresse réelle à Saint-Brevin, et on crée des contenus qui vous positionnent sur Saint-Nazaire et l'agglomération, sans tricher sur votre localisation.",
      },
      {
        q: "Que se passe-t-il après la mise en ligne ?",
        a: "Le site vous appartient. On vous forme à sa prise en main, et vous pouvez nous solliciter ensuite pour des évolutions ou un accompagnement en référencement si vous voulez aller plus loin.",
      },
    ],
  },
  {
    slug: "saint-michel-chef-chef",
    name: "Saint-Michel-Chef-Chef",
    in: "à Saint-Michel-Chef-Chef",
    of: "de Saint-Michel-Chef-Chef",
    postalCode: "44730",
    secteur: "jade",
    geo: { lat: 47.1808, lng: -2.1486 },
    intro: [
      "Connue dans toute la France pour ses galettes, Saint-Michel-Chef-Chef réunit le bourg et la station de Tharon-Plage, entre Saint-Brevin et Pornic. Une commune résidentielle et balnéaire où les artisans et commerces locaux sont très sollicités.",
      "Pour un professionnel michelois, être visible en ligne permet de capter les demandes de toute la Côte de Jade, des résidents comme des propriétaires de maisons de vacances qui préparent leurs travaux à distance.",
    ],
    metiers: ["Maçon", "Couvreur", "Plombier", "Électricien", "Peintre", "Paysagiste", "Commerce de Tharon-Plage", "Location saisonnière"],
    seo: "À Saint-Michel-Chef-Chef, on n'oublie pas Tharon-Plage, souvent recherché à part : « couvreur Tharon-Plage », « peintre Saint-Michel-Chef-Chef ». On couvre aussi Saint-Brevin, La Plaine-sur-Mer et Pornic pour élargir votre zone.",
    requetes: ["création site internet Saint-Michel-Chef-Chef", "site internet artisan Tharon-Plage", "couvreur Saint-Michel-Chef-Chef", "peintre Tharon"],
    voisines: ["saint-brevin-les-pins", "la-plaine-sur-mer", "pornic", "prefailles"],
    faq: [
      {
        q: "Mon site peut-il ressortir sur Tharon-Plage ?",
        a: "Oui. Tharon-Plage fait partie de la commune, mais les internautes le recherchent souvent par son nom. On l'intègre dans vos contenus et votre zone d'intervention.",
      },
      {
        q: "Combien coûte un site avec le logo ?",
        a: "Le Pack complet, avec logo, mini-charte et site vitrine sur mesure, est à 2 000 €, livré en 7 jours ouvrés.",
      },
    ],
  },
  {
    slug: "la-plaine-sur-mer",
    name: "La Plaine-sur-Mer",
    in: "à La Plaine-sur-Mer",
    of: "de La Plaine-sur-Mer",
    postalCode: "44770",
    secteur: "jade",
    geo: { lat: 47.1394, lng: -2.1925 },
    intro: [
      "Entre le port de la Gravette, ses plages et ses campings, La Plaine-sur-Mer est une commune familiale de la Côte de Jade, voisine de Préfailles et de Pornic. Une population qui grandit l'été, et des résidents à l'année qui cherchent des artisans fiables.",
      "Pour un professionnel plainais, un site internet est le moyen le plus simple de se faire connaître des nouveaux arrivants et des propriétaires de maisons secondaires, qui comparent tout en ligne avant de demander un devis.",
    ],
    metiers: ["Maçon", "Menuisier", "Plombier", "Électricien", "Paysagiste", "Ostréiculteur", "Camping", "Commerce"],
    seo: "À La Plaine-sur-Mer, on vise la commune et sa voisine Préfailles, très liées, puis Pornic et Saint-Michel-Chef-Chef. Les recherches sont courtes et locales, une fiche Google irréprochable et un site rapide sur mobile font la différence.",
    requetes: ["création site internet La Plaine-sur-Mer", "site internet artisan La Plaine-sur-Mer", "maçon La Plaine-sur-Mer", "plombier La Plaine-sur-Mer"],
    voisines: ["prefailles", "pornic", "saint-michel-chef-chef", "saint-brevin-les-pins"],
    faq: [
      {
        q: "Je n'ai pas de photos professionnelles, est-ce un problème ?",
        a: "Non. On peut travailler avec vos photos de chantiers prises au téléphone, on les sélectionne et on les met en valeur. On vous donne aussi des conseils pour photographier vos prochaines réalisations.",
      },
      {
        q: "Le site est-il adapté aux téléphones ?",
        a: "Oui, il est pensé d'abord pour le mobile : c'est là que la majorité de vos clients vous cherchent.",
      },
    ],
  },
  {
    slug: "prefailles",
    name: "Préfailles",
    in: "à Préfailles",
    of: "de Préfailles",
    postalCode: "44770",
    secteur: "jade",
    geo: { lat: 47.1323, lng: -2.2187 },
    intro: [
      "Au bout de la pointe Saint-Gildas, Préfailles est une station balnéaire intime, entre criques, sentier côtier et villas de bord de mer. Une commune où les résidences secondaires sont nombreuses et où l'entretien, la rénovation et les services aux propriétaires sont très demandés.",
      "Pour un artisan ou un prestataire, un site internet bien référencé sur Préfailles et la Côte de Jade, c'est l'assurance d'être appelé par des propriétaires qui cherchent un professionnel de confiance sur place.",
    ],
    metiers: ["Entretien de villas", "Paysagiste", "Maçon", "Menuisier", "Peintre", "Conciergerie", "Restaurant", "Location saisonnière"],
    seo: "À Préfailles, les recherches sont peu nombreuses mais très qualifiées. On vous positionne sur Préfailles, La Plaine-sur-Mer et Pornic, avec des contenus qui parlent aux propriétaires : entretien à l'année, ouverture et fermeture de maisons, suivi à distance.",
    requetes: ["création site internet Préfailles", "site internet artisan Préfailles", "conciergerie Préfailles", "paysagiste Préfailles"],
    voisines: ["la-plaine-sur-mer", "pornic", "saint-michel-chef-chef"],
    faq: [
      {
        q: "Je lance une conciergerie à Préfailles, pouvez-vous m'aider ?",
        a: "Oui. On crée votre identité et votre site, avec vos services, vos tarifs et un formulaire de contact, pour que les propriétaires vous trouvent dès le lancement.",
      },
      {
        q: "Est-ce que je reste propriétaire de mon site ?",
        a: "Oui, le site et le nom de domaine sont à vous. Il n'y a pas d'engagement de durée.",
      },
    ],
  },
  {
    slug: "trignac",
    name: "Trignac",
    in: "à Trignac",
    of: "de Trignac",
    postalCode: "44570",
    secteur: "estuaire",
    geo: { lat: 47.3178, lng: -2.1886 },
    intro: [
      "Porte de la Brière et première zone commerciale de l'agglomération nazairienne, Trignac accueille de nombreuses entreprises, artisans et commerces le long de la voie express. Une commune dynamique où la concurrence se joue aussi sur Google.",
      "Pour une entreprise trignacaise, le site internet doit capter les clients de Trignac, de Saint-Nazaire, de Montoir et de la Brière : une zone large, accessible, que votre référencement doit couvrir.",
    ],
    metiers: ["Garagiste", "Carrossier", "Plombier chauffagiste", "Électricien", "Menuisier PVC et alu", "Cuisiniste", "Commerce", "Entreprise de services"],
    seo: "À Trignac, on vous positionne sur la commune et sur Saint-Nazaire, où se font la majorité des recherches, ainsi que sur Montoir-de-Bretagne et Saint-Joachim. Pour un commerce de zone, la fiche Google et les avis sont prioritaires.",
    requetes: ["création site internet Trignac", "site internet artisan Trignac", "garage Trignac", "menuisier Trignac"],
    voisines: ["saint-nazaire", "montoir-de-bretagne", "saint-joachim", "saint-andre-des-eaux"],
    faq: [
      {
        q: "J'ai un commerce en zone commerciale, un site est-il utile ?",
        a: "Oui : vos clients vérifient horaires, produits et avis avant de se déplacer. Un site relié à votre fiche Google augmente les visites en magasin et les appels.",
      },
      {
        q: "Pouvez-vous intégrer un catalogue de produits ?",
        a: "Oui, on peut présenter vos gammes, vos marques et vos réalisations, avec un formulaire de demande de devis ou de rendez-vous.",
      },
    ],
  },
  {
    slug: "montoir-de-bretagne",
    name: "Montoir-de-Bretagne",
    in: "à Montoir-de-Bretagne",
    of: "de Montoir-de-Bretagne",
    postalCode: "44550",
    secteur: "estuaire",
    geo: { lat: 47.3277, lng: -2.1497 },
    intro: [
      "Avec son site Airbus, son terminal méthanier et sa zone industrialo-portuaire, Montoir-de-Bretagne est un pôle économique majeur de l'estuaire. Une commune où cohabitent industriels, sous-traitants, artisans et commerces de proximité.",
      "Que vous travailliez pour les grands donneurs d'ordre ou pour les particuliers de l'agglomération, votre site doit présenter clairement votre savoir-faire, vos références et votre zone d'intervention.",
    ],
    metiers: ["Sous-traitant industriel", "Chaudronnier", "Électricien industriel", "Plombier", "Menuisier", "Maçon", "Transport et logistique", "Entreprise de nettoyage"],
    seo: "À Montoir, on combine deux cibles : les recherches B2B (« chaudronnerie Saint-Nazaire », « maintenance industrielle Loire-Atlantique ») et les recherches particulières (« plombier Montoir-de-Bretagne »). On structure le site pour parler aux deux sans brouiller le message.",
    requetes: ["création site internet Montoir-de-Bretagne", "site internet entreprise Montoir", "plombier Montoir-de-Bretagne", "chaudronnerie Saint-Nazaire"],
    voisines: ["trignac", "saint-nazaire", "donges", "saint-joachim"],
    faq: [
      {
        q: "Faites-vous des sites pour des entreprises industrielles ?",
        a: "Oui. On met en avant vos capacités, vos certifications, vos références et vos secteurs, avec un site sobre et professionnel qui rassure les acheteurs et les services achats.",
      },
      {
        q: "Combien de pages contient le site ?",
        a: "Cela dépend de votre activité : en général une page d'accueil, vos services, vos réalisations, une page à propos et un contact. On en discute lors de l'appel découverte.",
      },
    ],
  },
  {
    slug: "donges",
    name: "Donges",
    in: "à Donges",
    of: "de Donges",
    postalCode: "44480",
    secteur: "estuaire",
    geo: { lat: 47.3187, lng: -2.0752 },
    intro: [
      "Sur la rive nord de l'estuaire, Donges est connue pour sa raffinerie et ses activités portuaires, mais aussi pour ses marais et son bourg en plein développement. Les familles qui s'y installent cherchent artisans et services de proximité.",
      "Un site internet bien construit permet à une entreprise dongeoise d'être visible sur Donges, Montoir, Savenay et Saint-Nazaire, et de répondre aux demandes des nouveaux habitants comme des entreprises de la zone.",
    ],
    metiers: ["Électricien", "Plombier", "Maçon", "Menuisier", "Paysagiste", "Sous-traitant industriel", "Coiffeur", "Commerce de proximité"],
    seo: "À Donges, les recherches sont surtout faites sur Saint-Nazaire et Savenay : on vous positionne donc sur la commune et ses grandes voisines, avec une fiche Google qui met en avant votre proximité.",
    requetes: ["création site internet Donges", "site internet artisan Donges", "électricien Donges", "plombier Donges"],
    voisines: ["montoir-de-bretagne", "savenay", "saint-nazaire", "trignac"],
    faq: [
      {
        q: "Je viens de créer mon entreprise à Donges, par quoi commencer ?",
        a: "Par une identité claire et un site simple, relié à une fiche Google. Le Pack complet à 2 000 € réunit logo, mini-charte et site, en ligne en 7 jours ouvrés.",
      },
      {
        q: "Les échanges se font-ils à distance ?",
        a: "L'appel découverte et les validations peuvent se faire en visio ou par téléphone, ce qui permet de livrer en 7 jours sans vous faire perdre de temps sur vos chantiers.",
      },
    ],
  },
  {
    slug: "saint-andre-des-eaux",
    name: "Saint-André-des-Eaux",
    in: "à Saint-André-des-Eaux",
    of: "de Saint-André-des-Eaux",
    postalCode: "44117",
    secteur: "briere",
    geo: { lat: 47.3141, lng: -2.3108 },
    intro: [
      "Aux portes de la Brière et à deux pas de La Baule, Saint-André-des-Eaux allie cadre naturel, golf et lotissements récents. La commune attire de nombreuses familles, et avec elles des besoins en construction, aménagement et services.",
      "Pour un artisan andréanais, le site internet est le meilleur moyen d'être trouvé par les nouveaux propriétaires du secteur, qui cherchent un professionnel à la fois proche et sérieux.",
    ],
    metiers: ["Constructeur et maçon", "Plombier", "Électricien", "Menuisier", "Paysagiste", "Piscinier", "Cuisiniste", "Coach sportif"],
    seo: "À Saint-André-des-Eaux, on vous positionne sur la commune, La Baule, Guérande et Saint-Nazaire, et sur les recherches liées aux maisons neuves : « aménagement extérieur », « terrasse bois », « cuisine sur mesure ».",
    requetes: ["création site internet Saint-André-des-Eaux", "site internet artisan Saint-André-des-Eaux", "paysagiste Saint-André-des-Eaux", "maçon Saint-André-des-Eaux"],
    voisines: ["la-baule-escoublac", "guerande", "saint-nazaire", "pornichet", "saint-joachim"],
    faq: [
      {
        q: "Puis-je montrer mes réalisations par type de chantier ?",
        a: "Oui. On organise votre galerie par prestation (terrasses, extensions, cuisines…) pour que chaque visiteur trouve vite des exemples proches de son projet.",
      },
      {
        q: "Le site est-il optimisé pour Google dès la livraison ?",
        a: "Oui : structure, balises, vitesse, données structurées et fiche Google sont travaillées dès la mise en ligne.",
      },
    ],
  },
  {
    slug: "herbignac",
    name: "Herbignac",
    in: "à Herbignac",
    of: "d'Herbignac",
    postalCode: "44410",
    secteur: "briere",
    geo: { lat: 47.4486, lng: -2.3186 },
    intro: [
      "Entre Brière et presqu'île, Herbignac est une commune rurale et dynamique, connue pour le château de Ranrouët et sa tradition de potiers. Ses artisans interviennent sur un large territoire, jusqu'à Guérande, La Roche-Bernard et Pontchâteau.",
      "Pour une entreprise herbignacaise, être visible sur Google, c'est capter des demandes sur toute cette zone, souvent mal couverte par les grandes agences des villes.",
    ],
    metiers: ["Maçon", "Charpentier", "Couvreur chaumier", "Menuisier", "Électricien", "Plombier", "Paysagiste", "Potier et artisan d'art"],
    seo: "À Herbignac, la zone d'intervention est large : on vous positionne sur Herbignac, Guérande, La Turballe, Saint-Lyphard et Assérac, et sur les recherches liées à la rénovation du bâti ancien et des chaumières.",
    requetes: ["création site internet Herbignac", "site internet artisan Herbignac", "maçon Herbignac", "charpentier Herbignac"],
    voisines: ["guerande", "saint-andre-des-eaux", "la-turballe", "piriac-sur-mer", "saint-joachim"],
    faq: [
      {
        q: "Je travaille en milieu rural, est-ce que les clients me cherchent vraiment en ligne ?",
        a: "Oui, de plus en plus. Même hors des villes, les particuliers comparent les artisans sur Google avant d'appeler, et ceux qui ont un site clair sont contactés en priorité.",
      },
      {
        q: "Pouvez-vous refaire un site existant ?",
        a: "Oui. On reprend vos contenus utiles, on modernise le design et on conserve votre référencement acquis lors de la refonte.",
      },
    ],
  },
  {
    slug: "saint-joachim",
    name: "Saint-Joachim",
    in: "à Saint-Joachim",
    of: "de Saint-Joachim",
    postalCode: "44720",
    secteur: "briere",
    geo: { lat: 47.3833, lng: -2.1931 },
    intro: [
      "Au cœur du Parc naturel régional de Brière, Saint-Joachim et ses îles, de Fédrun à Pendille, comptent parmi les plus beaux ensembles de chaumières de France. Un patrimoine qui fait vivre des savoir-faire rares : chaumiers, charpentiers, maçons du bâti ancien.",
      "Pour ces artisans comme pour les commerces et hébergements du marais, un site soigné permet de montrer un savoir-faire unique et d'attirer des clients bien au-delà de la Brière.",
    ],
    metiers: ["Chaumier", "Charpentier", "Maçon bâti ancien", "Menuisier", "Guide et balade en chaland", "Gîte", "Restaurant", "Artisan d'art"],
    seo: "À Saint-Joachim, on combine le local (Saint-Joachim, Trignac, Saint-Nazaire) et des recherches de niche à l'échelle régionale : « chaumier Loire-Atlantique », « rénovation chaumière Brière ». Un contenu expert peut vous faire ressortir loin de la commune.",
    requetes: ["création site internet Saint-Joachim", "site internet artisan Brière", "chaumier Brière", "rénovation chaumière Loire-Atlantique"],
    voisines: ["trignac", "montoir-de-bretagne", "saint-andre-des-eaux", "herbignac"],
    faq: [
      {
        q: "Je suis chaumier, mon site peut-il attirer des clients hors de la Brière ?",
        a: "Oui. Sur un métier rare, on travaille des contenus experts (techniques, entretien, rénovation) qui se positionnent sur des recherches régionales voire nationales.",
      },
      {
        q: "Proposez-vous un site pour un gîte ou une activité touristique ?",
        a: "Oui, avec photos, présentation des activités, lien de réservation et une fiche Google optimisée pour les visiteurs du Parc de Brière.",
      },
    ],
  },
  {
    slug: "savenay",
    name: "Savenay",
    in: "à Savenay",
    of: "de Savenay",
    postalCode: "44260",
    secteur: "estuaire",
    geo: { lat: 47.3612, lng: -1.9424 },
    intro: [
      "À mi-chemin entre Nantes et Saint-Nazaire, Savenay profite de sa gare et de la voie express pour attirer de nombreuses familles. La commune et l'Estuaire et Sillon forment un territoire en croissance où les artisans ont du travail… à condition d'être visibles.",
      "Un site internet bien référencé permet à une entreprise savenaisienne de couvrir à la fois sa commune, les communes voisines et une partie des deux agglomérations.",
    ],
    metiers: ["Maçon", "Plombier", "Électricien", "Menuisier", "Paysagiste", "Garagiste", "Coiffeur", "Profession de santé"],
    seo: "À Savenay, on vous positionne sur la commune, Donges, Malville, Campbon et Bouée, puis sur les recherches plus larges « Estuaire et Sillon » et « nord Loire-Atlantique ».",
    requetes: ["création site internet Savenay", "site internet artisan Savenay", "plombier Savenay", "électricien Savenay"],
    voisines: ["donges", "montoir-de-bretagne", "nantes", "saint-nazaire"],
    faq: [
      {
        q: "Mon entreprise intervient entre Nantes et Saint-Nazaire, comment le valoriser ?",
        a: "En définissant une zone d'intervention claire, mise en avant sur le site et la fiche Google, et en créant des contenus sur les communes où vous travaillez le plus.",
      },
      {
        q: "Puis-je ajouter un blog plus tard ?",
        a: "Oui. Le site est évolutif : vous pouvez ajouter des actualités ou des articles pour renforcer votre référencement au fil du temps.",
      },
    ],
  },
  {
    slug: "nantes",
    name: "Nantes",
    in: "à Nantes",
    of: "de Nantes",
    postalCode: "44000",
    secteur: "nantes",
    geo: { lat: 47.2184, lng: -1.5536 },
    intro: [
      "Capitale régionale, Nantes concentre des milliers d'artisans, de TPE et d'indépendants, de l'île de Nantes à Chantenay, de Doulon aux quartiers Zola et Procé. Sur Google, la concurrence y est forte : chaque métier compte des dizaines d'entreprises qui veulent la même place.",
      "Pour se démarquer, il faut un site rapide, un design qui ne ressemble pas aux autres et un référencement local travaillé quartier par quartier et commune par commune, de Rezé à Saint-Herblain. C'est ce qu'on livre, en 7 jours.",
    ],
    metiers: ["Plombier chauffagiste", "Électricien", "Menuisier", "Peintre", "Rénovation d'appartements", "Cuisiniste", "Coiffeur et barbier", "Restaurant", "Thérapeute"],
    seo: "À Nantes, viser seulement « plombier Nantes » ne suffit pas : on travaille les quartiers et les communes de la métropole (Rezé, Saint-Herblain, Orvault, Saint-Sébastien-sur-Loire, Carquefou), là où la concurrence est moins forte et les clients plus proches.",
    requetes: ["création site internet Nantes", "agence web Nantes", "site internet artisan Nantes", "plombier Nantes", "électricien Rezé"],
    voisines: ["savenay", "saint-nazaire", "pornic"],
    faq: [
      {
        q: "Comment se démarquer des nombreuses agences et concurrents à Nantes ?",
        a: "Par un design sur mesure, un site très rapide, des contenus localisés par quartier et une fiche Google active. Sur une ville concurrentielle, ce sont ces détails qui font passer devant.",
      },
      {
        q: "Travaillez-vous aussi sur la métropole nantaise ?",
        a: "Oui : Rezé, Saint-Herblain, Orvault, Carquefou, Saint-Sébastien-sur-Loire, Vertou… On adapte votre référencement à votre zone réelle.",
      },
    ],
  },
];

export const villeBySlug = (slug: string) => villes.find((v) => v.slug === slug);

export const villesBySecteur = (secteur: Secteur) => villes.filter((v) => v.secteur === secteur);

// Questions communes à toutes les villes, ajoutées après celles propres à la commune
export const faqCommune = (ville: Ville) => [
  {
    q: `Pourquoi choisir Artichaud Studio pour mon site ${ville.in} ?`,
    a: `Un prix fixe dès 1 500 €, un site sur mesure (pas un thème générique), une mise en ligne en 7 jours ouvrés et un référencement local pensé pour ${ville.name} et ses environs. On travaille aussi la visibilité sur les IA comme ChatGPT, de plus en plus utilisées pour trouver un professionnel.`,
  },
  {
    q: "Comment se passe la création de mon site ?",
    a: "Trois étapes : un appel découverte gratuit de 30 minutes, la maquette que vous validez, puis la mise en ligne avec une prise en main. Vous n'avez rien de technique à gérer.",
  },
];
