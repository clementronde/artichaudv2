# Visual audit - artichaud-studio.fr
Screenshots: artichaud-studio.fr-audit/screenshots/{home,services,contact}/artichaud-studio_fr_{desktop,laptop,tablet,mobile}.png
(Mobile captures are 750x1624, i.e. 375x812 at 2x DPR.)

## Above the fold
- Home desktop: H1 visible, CTAs "On en discute" (dark) and "Voir nos projets" (outline) visible at y~920. Right half of hero is empty on desktop (thumbnails seem absent/not yet animated at capture). H1 wraps awkwardly ("Boulogne-" / "Billancourt" split on hyphen).
- Services desktop: H1 visible, but primary CTAs ("Demander un ..." / "Voir les realisations") sit at y~900-970, at the very bottom of the fold, and are partly hidden by the cookie banner. Eyebrow text and "Services" back-link are small, low-contrast grey on black.
- Contact desktop: H1 + step 1 form cards visible. Clear. Light-grey helper text (card sub-labels, subtitle) has low contrast.

## Cookie banner (biggest issue)
- Mobile: banner covers ~25% of the viewport on every page, hides the home primary CTA "On en discute" (overlaps its lower edge) and the services CTAs and the first form cards on contact.
- Desktop: bottom-right banner overlaps the services CTAs.
- Banner text is muted pink on dark maroon, small; "Personnaliser" and "En savoir plus" are text links with small tap area.
- Refuser/Accepter buttons are equal prominence (good for consent), height ~50px on mobile (OK).

## Mobile
- Header: logo, Contact pill, burger are large (~100px @2x = ~50px CSS): tap targets OK.
- Home mobile: hero thumbnail images (phone mockup, Keleti cover) overlap the H1 text ("l'agence", "web & branding"), harming legibility. Layout bug.
- No horizontal scroll visible. H1 sizes readable. Body text 16px+ equivalent.
- Services mobile: CTAs are below the fold (not visible at first view), pushed down by large H1 and spacing; text paragraph is cut by banner.
- Contact mobile: form is pushed below the fold by large heading, subtitle and progress block (~60% of the viewport before the first option).
- Small text links (back "Services", "Personnaliser", "En savoir plus") are under 48px tall tap targets.

## Other
- Nav on desktop is compact and centered; good. Dark/light theme switches between pages (services is dark), consistent within page.
- Contrast: grey-on-white subtitles and grey-on-black eyebrow likely under WCAG AA 4.5:1; verify.

## Recommendations
1. Make cookie banner smaller on mobile (compact bar) or non-overlapping; ensure it does not cover the hero CTA.
2. Fix hero thumbnail/H1 overlap on mobile (z-index, positioning, or reduce size).
3. Move services-page CTAs higher on mobile/desktop (above the fold, not at the edge).
4. Increase contrast of muted text; enlarge small text-link tap areas to >=48px.
5. Use a non-breaking hyphen for "Boulogne-Billancourt" in H1.
6. Reduce vertical spacing in contact header on mobile so form starts above the fold.
