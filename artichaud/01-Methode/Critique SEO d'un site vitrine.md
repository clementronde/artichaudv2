---
tags: [methode, integration, seo]
maj: 2026-11-28
---

# Critique SEO d'un site vitrine

La critique est un livrable : elle juge ce que la maquette permet de référencer, propose les mots-clés et dit ce qui
est implémenté dans le code et ce qui reste à fournir par le client. Artichaud vise surtout des sites vitrines de
TPE locales (artisans, restaurants, hébergements) : le SEO local prime.

## 1. Qualifier le site

- Type : vitrine mono-page, vitrine multi-pages, landing de campagne, site de réservation, catalogue.
- Intention de recherche principale : locale transactionnelle (« plombier Versailles urgence »), locale
  informationnelle (« que faire dans le Perche »), marque (« Chez Sophie gîte »).
- Une landing mono-page ne se positionne que sur **un** sujet principal : le dire, et proposer les pages à créer pour
  le reste (une page par prestation, par chambre, par ville desservie, articles de blog).

## 2. Mots-clés ciblés

Partir des notes de l'utilisateur, du métier, de la ville et du texte de la maquette. Proposer :

| Niveau | Exemple (gîte dans le Perche) | Où le placer |
| --- | --- | --- |
| Principal | gîte Perche | title, H1 ou sous-titre, premier paragraphe |
| Secondaires | gîte avec piscine Perche, gîte 4 chambres, location vacances Orne | H2, textes des sections |
| Locaux | Belforêt-en-Perche, Mortagne-au-Perche, Normandie | texte, adresse (NAP), footer, JSON-LD |
| Longue traîne | gîte avec jacuzzi et piscine pour famille dans le Perche | articles de blog, FAQ |

Ne jamais inventer de volumes de recherche : sans outil de données, dire que les volumes sont à vérifier
(Google Search Console, Keyword Planner, Semrush…).

## 3. Critiquer le contenu de la maquette

- **H1** : un seul, qui contient le sujet principal. Un slogan poétique seul (« L'art de vivre au grand air ») ne dit
  rien à Google : proposer un sous-titre ou un texte visible portant le mot-clé, sans casser la maquette.
- **Hiérarchie** : chaque section = un H2 explicite ; cartes = H3.
- **Volume de texte** : moins de ~300 mots utiles sur la page = faible. Lorem ipsum = contenu à fournir (le lister).
- **Textes dupliqués** (même paragraphe sur trois cartes) : à réécrire.
- **NAP** (nom, adresse, téléphone) identique partout, lisible en texte (pas en image).
- **CTA** : un appel clair par écran (appeler, réserver, demander un devis), lien `tel:` sur mobile.
- **Liens** : réseaux sociaux, mentions légales, CGV présents ? Liens « # » à remplacer.
- **Images** : `alt` descriptifs avec contexte (« Piscine du gîte face aux collines du Perche »), poids maîtrisé.
- **Confiance** : avis clients (vrais, avec prénom et date), labels (Gîtes de France, RGE, Qualibat…), photos réelles.

## 4. Ce que le code doit implémenter

- `metadata` : `title` (≤ 60 caractères, mot-clé + ville + marque), `description` (≤ 155 caractères, avec un CTA),
  Open Graph (image du hero), `metadataBase` (variable `NEXT_PUBLIC_SITE_URL`), `lang="fr"`.
- JSON-LD adapté : `LodgingBusiness` / `BedAndBreakfast` (hébergement), `Restaurant`, `Plumber` / `Electrician` /
  `HomeAndConstructionBusiness` (artisan), sinon `LocalBusiness` ; avec `name`, `address`, `telephone`, `email`,
  `image`, `url`, `geo` si connu, `priceRange`, `amenityFeature` (hébergement), `aggregateRating` **uniquement avec de
  vrais avis**.
- `sitemap.ts` et `robots.ts`, une seule URL canonique.
- Performances : images compressées et dimensionnées, `priority` sur l'image du hero seulement, polices en woff2
  auto-hébergées, animations sans blocage du premier affichage.
- Accessibilité qui sert aussi le SEO : contrastes, focus visible, textes de liens explicites, `aria-label` des liens
  icônes.

## 5. Ce qui reste au client (à lister dans le rapport)

Fiche Google Business Profile, vrais avis, textes définitifs, photos réelles, pages complémentaires, nom de domaine,
inscription aux annuaires du métier (Gîtes de France, Pages Jaunes…).

Liens : [[Skill artichaud-maquette]] · [[Audit de maquette]]
