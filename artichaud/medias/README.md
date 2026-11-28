# Médias du vault

- `videos/` : exemples vidéo (références d'autres studios, nos propres rendus).
- `captures/` : captures d'écran, GIF, images fixes ; un sous-dossier par projet (`captures/aquapure/`).

## Nommage

`AAAA-MM-JJ_auteur_sujet.mp4` — ex. `2026-11-26_studio-x_transition-rideau.mp4`

Chaque fichier a sa fiche dans `03-References-sites/` ou `04-References-videos/` (champ `media:`).

## Droits

Les vidéos d'autres studios sont gardées **pour étude interne uniquement** : ne pas les republier, ne pas les monter dans nos propres vidéos. Préférer un lien + des captures quand c'est suffisant.

## Poids des fichiers

Git n'aime pas les grosses vidéos : au-delà de quelques Mo, utiliser **Git LFS** (`git lfs track "artichaud/medias/**/*.mp4"`) ou garder les vidéos dans un dossier partagé (Drive) et ne mettre ici que le lien dans la fiche.
