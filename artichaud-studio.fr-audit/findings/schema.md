# Schema / Structured Data Audit - artichaud-studio.fr

Score: **66/100**
Method: live JSON-LD parsed on 30+ URLs (sitemap has 48), plus source review in src/components/seo and src/app.

## Detection (live)
| Page type | JSON-LD found |
|---|---|
| ALL pages (sitewide, layout.tsx) | Organization+DesignAgency+LocalBusiness (@id /#organization) with AggregateRating, 1 Review, Person, ContactPoint, geo, hours |
| /blog/* | + BlogPosting (WebPage, Person, Organization, ImageObject, BreadcrumbList) - good |
| /works/[slug] | + CreativeWork (creator linked to org @id). No BreadcrumbList |
| /tarifs | + BreadcrumbList, OfferCatalog/Offer/Service |
| /creation-site-internet-paris, /refonte-site-internet | + LocalBusiness/ProfessionalService with OfferCatalog (second LocalBusiness entity, no @id link) ; no BreadcrumbList |
| /creation-site-internet-boulogne-billancourt | + LocalBusiness/ProfessionalService + BreadcrumbList |
| /boulogne-billancourt | + City + BreadcrumbList |
| /creation-site-vitrine-wordpress-webflow-wix | + Service/LocalBusiness |
| /simulateur | + SoftwareApplication/Offer |
| /services (index), /services/creation-site-internet, /branding-identite-visuelle, /seo-referencement-naturel | Org block only: NO Service, NO BreadcrumbList |
| /faq, /about, /contact, /works, /blog index, /mentions-legales | Org block only. FAQPage correctly not emitted (source comment confirms) |

## Findings

### High
1. **Self-serving review markup (risk).** The Organization/LocalBusiness block carries `aggregateRating` (5.0, reviewCount 1) and a `review` (Victoria Lauro, publisher "Google") on the entity's own site, repeated on every page. Google ignores/does not show review stars for self-serving LocalBusiness/Organization reviews, and a 1-review aggregate is weak and can read as manipulative. Recommendation: remove aggregateRating and review from the sitewide block (keep the testimonial visible in the page body only). If kept, show the review on the page, and never on all pages. Also verify the review text is actually visible on-page.
2. **Services pages lack Service schema.** Three core service pages (and /services index) have only the sitewide org. Add Service (provider -> `{"@id":"https://artichaud-studio.fr/#organization"}`, areaServed, serviceType, offers if pricing is public) plus BreadcrumbList.

### Medium
3. **BreadcrumbList missing** on /services/*, /works/*, /about, /faq, /contact, /creation-site-internet-paris, /refonte-site-internet, /simulateur, /blog index, /works index. Present only on blog posts, /tarifs and two Boulogne pages. BreadcrumbsJsonLd component already exists; reuse it.
4. **Duplicate/unlinked business entities.** Local pages emit their own LocalBusiness/ProfessionalService without `@id` referencing the sitewide /#organization, creating competing entities with the same NAP. Replace with Service whose `provider` is the org @id, or reuse the @id.
5. **Triple type on one node** `["Organization","DesignAgency","LocalBusiness"]`: DesignAgency is not a recognized schema.org subtype of LocalBusiness hierarchy usage Google cares for; simplify to `["ProfessionalService"]` (or LocalBusiness + ProfessionalService) with `@id`. Low rich-result impact but cleaner.
6. **Email domain mismatch**: schema email `hello@artichaud-studio.com` vs site domain .fr. Confirm correct address.
7. **/works CreativeWork**: description truncated with "..." ; `dateCreated` is just "2023" (valid but loose). Consider `CreativeWork` -> keep, add `datePublished` ISO 8601 and `about`/`keywords`. Add BreadcrumbList. (ImageObject/Product schema not warranted.)
8. **No WebSite and no standalone Person/founder node with @id**: WebSite (name, url, inLanguage fr-FR) is missing from the home page; blog author "Clément Ronde" points to /about but there is no Person node on /about (ProfilePage + Person with sameAs recommended). Check that the author name matches the Person in the org block.

### Info
9. FAQPage: not present in live markup (removed deliberately). Correct; Google retired FAQ rich results May 2026. Do not re-add; use QAPage only for genuine user Q&A.
10. Blog: BlogPosting is complete (headline, image, author, publisher logo, dates, mainEntityOfPage, inLanguage). Verify `dateModified` reflects real edits (code defaults to datePublished).
11. `geo` latitude/longitude and `ratingValue` are strings; numbers are preferred (accepted though).
12. `openingHoursSpecification` is a single object; fine. `areaServed` lists Paris/IDF while HQ is Boulogne-Billancourt; consistent with local pages.
13. HowTo not recommended (retired). No deprecated types found.

## Recommended JSON-LD (Service page template)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://artichaud-studio.fr/services/creation-site-internet#service",
  "name": "Creation de site internet",
  "serviceType": "Web design and development",
  "provider": {"@id": "https://artichaud-studio.fr/#organization"},
  "areaServed": [{"@type": "AdministrativeArea", "name": "Ile-de-France"}, {"@type": "Country", "name": "France"}],
  "url": "https://artichaud-studio.fr/services/creation-site-internet",
  "inLanguage": "fr-FR"
}
```
Pair with a BreadcrumbList (Accueil > Services > page) per page via BreadcrumbsJsonLd. Add on the home page:
```json
{"@context":"https://schema.org","@type":"WebSite","@id":"https://artichaud-studio.fr/#website","url":"https://artichaud-studio.fr","name":"Artichaud Studio","inLanguage":"fr-FR","publisher":{"@id":"https://artichaud-studio.fr/#organization"}}
```

## Score breakdown
Coverage on blog/tarifs/local good (+), consistent @id graph, no deprecated types, FAQ handled. Deductions: self-serving review/rating sitewide (-12), missing Service on core service pages (-8), breadcrumb gaps (-6), duplicate LocalBusiness entities / no WebSite / Person (-8). = 66.

## Structured (audit-data.json)
{"category":"Schema / Structured Data","score":66,"issues":[{"p":"high","t":"self-serving AggregateRating/Review sitewide"},{"p":"high","t":"no Service schema on /services/*"},{"p":"medium","t":"BreadcrumbList missing on ~20 pages"},{"p":"medium","t":"duplicate LocalBusiness entities without @id"},{"p":"medium","t":"no WebSite/Person nodes"},{"p":"info","t":"FAQPage absent (correct)"}]}
