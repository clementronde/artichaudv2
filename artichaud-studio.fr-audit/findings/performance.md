# Performance / Core Web Vitals - artichaud-studio.fr (audit 2026-10-17)

**Performance score: 70/100** (mobile lab 66-79, desktop lab 97-100; no field data)
**Images score: 68/100**

## Method and caveats
- PageSpeed Insights API (no key) returned "rate limit exceeded" for all 3 URLs x 2 strategies, so no CrUX/field data was obtained. Re-run PSI later to confirm with field data.
- Fallback: local Lighthouse 13.5.0 CLI (headless Chrome, simulated Slow 4G / 4x CPU for mobile, desktop preset), plus curl for TTFB/headers/HTML. Lab only; INP cannot be measured in lab (TBT used as proxy). Pages are served from Vercel cache (X-Vercel-Cache HIT, cdg1).

## Lab results

| Page | Device | Perf | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|
| Home | Mobile | 66 | 1.9 s | **8.2 s (poor)** | 240 ms | 0 |
| Home | Desktop | 99 | 0.4 s | 0.8 s | 0 | 0 |
| /services/creation-site-internet | Mobile | 68 | 1.6 s | **7.1 s (poor)** | 230 ms | 0 |
| /services/creation-site-internet | Desktop | 97 | 0.3 s | 1.2 s | 0 | 0 |
| /blog/prix-site-vitrine-iledefrance-2025 | Mobile | 79 | 1.1 s | **4.7 s (poor)** | 200 ms | 0 |
| /blog/prix-site-vitrine-iledefrance-2025 | Desktop | 100 | 0.3 s | 0.8 s | 0 | 0 |

## Core Web Vitals status (lab, mobile)
- **LCP: FAIL** on all 3 pages (4.7 to 8.2 s vs 2.5 s). Desktop passes.
- **INP: not measurable in lab; at risk.** TBT 200-240 ms, max potential interaction delay 170-220 ms, ~1.5 s JS bootup, 2.7-2.8 s main-thread work, forced reflow in main chunk (27 ms). Verify with CrUX/RUM (Vercel Speed Insights is already allowed in the CSP).
- **CLS: PASS** (0 everywhere, lab).
- TTFB: good. curl 0.20-0.30 s; Lighthouse 103-137 ms (blog 691 ms in one cold simulated run). HTML Cache-Control is `public, max-age=0, must-revalidate` (normal on Vercel).

## Bottlenecks

1. **LCP is the h1 text, hidden at first paint by a JS entrance animation** (home, service). LCP breakdown: TTFB 137 ms, **element render delay 2,283 ms** (service: 2,245 ms); no resource delay. The SSR HTML wraps the hero copy in `style="opacity:0;transform:translateY(24px)"` (Framer Motion initial state), so it only becomes visible after ~1 MB of JS downloads, parses and hydrates. Fix: render the h1 and hero copy visible in SSR (no opacity:0 initial state on the LCP element; animate transform only, or use a CSS keyframe that doesn't depend on hydration).
2. **Blog LCP (4.7 s)** is the cover image (AVIF 32 KB, correctly preloaded with imageSrcSet, not lazy). Under throttling: TTFB 691 ms, load delay 42 ms, download 318 ms, render delay 83 ms. Mostly TTFB in that run plus slow-4G; the cover is served at w=750 on mobile and could be smaller. Check field TTFB.
3. **JavaScript weight / unused JS**: unused-javascript 125-149 KiB on mobile. Biggest scripts: 16cdblg.js (738 ms CPU on home), 08aw1k4i07fih.js (70 KB, 610 ms), 0afqr90gd5vjx.js (41 KB, 229 ms). Legacy JS polyfills ~14 KiB. The same ~15 async chunks load on the near-static service and blog pages.
4. **Tag stack served from /metrics (first-party)**: GTM container 126-141 KB (up to 69 KB unused) + gtag/Ads loader 187 KB (49-63 KB unused), 240-320 ms CPU on home. Roughly 330 KB and 0.25-0.3 s main thread. Consent Mode defaults are set inline (good). Load GTM after interaction/idle (or `next/script strategy="lazyOnload"`) for non-critical tags (Meta pixel, Ads remarketing). The Meta pixel (connect.facebook.net) did not appear in lab runs (consent denied), so real-user cost with consent granted is higher than measured.
5. **Fonts: 5 HelveticaNowDisplay woff2 files preloaded on every page** (Bold, ExtraBold, Light, Medium, Regular = ~218 KB). The home h1 uses `Helvetica, Arial` inline so it doesn't wait on them, but they compete with JS/CSS for bandwidth on slow 4G. Preload only the 1-2 weights used above the fold.
6. **Render-blocking CSS**: 1 file (07oqvbzub87dk.css), ~150 ms mobile savings. Consider `experimental.inlineCss` or reducing Tailwind output.
7. **Home payload**: HTML 240 KB uncompressed (63 KB br), 12 hero trail images preloaded via `<link rel=preload as=image>` (~200 KB webp) plus a 48 KB `?_rsc` prefetch. Preload only the first 2-3 hero images. Total transfer 1.25-1.39 MB home, ~1.0-1.1 MB service/blog (mostly JS).
8. **Caching**: `images.minimumCacheTTL: 60` in next.config.ts. Raise to 1 year-ish for optimized images to help repeat visits and cut Vercel image transformations.

## Prioritized recommendations
1. (High, LCP about -2 s mobile) Remove SSR `opacity:0` from the h1 / LCP block on home and service pages; hero text must be visible before hydration.
2. (High, LCP/INP) Cut JS: lazy-load below-fold sections (`next/dynamic`), keep Framer Motion out of first-render paths, defer the home hero animation, drop legacy polyfills (modern browserslist).
3. (Medium, INP/TBT) Defer GTM/Ads/Meta pixel to idle or first interaction; audit tags inside the 126-141 KB container.
4. (Medium) Trim font preloads to weights used in the first viewport; limit hero image preloads on home to 2-3.
5. (Medium) Fix image `sizes` (see below).
6. (Low) Raise `minimumCacheTTL`; confirm everything with PSI/CrUX once the rate limit lifts.

## Images subsection (score 68/100)

**Positives**
- Modern formats: next.config `formats: ['image/avif','image/webp']`; 81 AVIF + 18 WebP in /public; optimizer returns `image/avif` (confirmed). Hero trail files are WebP (4-42 KB each).
- Alt text present and descriptive on all content images (projects, blog cards, cover, author photo). Decorative `sourisartichaud.png` correctly `alt="" aria-hidden="true"`.
- Lazy loading on below-fold images (`loading="lazy"` + `decoding="async"`). The blog cover is not lazy and is preloaded with `imageSrcSet` (correct LCP handling). CLS is 0.

**Issues**
- **Logos lazy-loaded above the fold**: `logonavbar.png` (nav) and `artichaud.png` (1430x297 wordmark) are all `loading="lazy"`; the nav logo is visible at first paint and should be eager/`priority`. Their `src` fallback is `w=3840`; add `sizes` (e.g. `sizes="96px"`).
- **Missing/oversized `sizes`**: `src` of most `next/image` tags points to `w=3840`. Lighthouse image-delivery waste: 24 KiB (home desktop), 35 KiB (home mobile), 19-24 KiB (blog). Examples: charitioprojet1.avif (32 KB served, 16.8 KB wasted), multiface.webp (12 KB wasted), blog cover (24 KB wasted on mobile).
- **Hero trail images are plain `<img>`** (WebP, `alt=""`, no width/height, 12 preloaded). Fine if decorative, but missing dimensions risks CLS if the layout isn't fixed (CLS measured 0). Consider AVIF and fewer preloads.
- **Very large source files in /public** (served raw if referenced by plain URL/OG, and slow the optimizer): `blog/artichaud-ui-design.jpg` 18.6 MB, `blog/artichaud-seo-strategy.jpg` 4.0 MB, `projects/Tautu1.png` 4.1 MB, `projects/Charitio1.png` 1.35 MB, `image_hero_about.png` 0.98 MB, `services/projetkeletitautuservices.png` 0.70 MB (displayed at ~4-5 KB AVIF via the optimizer), `hero/lumyn.jpg` and `hero/lumyncentral.png` ~0.46-0.49 MB. Compress/convert to AVIF/WebP and cap source width (~2400 px).
- Blog cover alt/filename says "2026" while the URL slug says "2025" (consistency, not performance).
- Optimizer cache TTL only 60 s; default q=75 could drop to 60-65 for AVIF (about 15-20% smaller).
- Plain `<img src="/sourisartichaud.png">` (1.5 KB) is preloaded on every page; negligible but unnecessary on non-home pages.

## Raw data
Scratchpad `lh_*.json` (Lighthouse 13.5.0 runs, 6 total) and `psi_*.json` (rate-limit error responses) under the session scratchpad directory.
