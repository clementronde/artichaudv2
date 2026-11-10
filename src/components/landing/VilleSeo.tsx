import Link from "next/link";
import { SECTEURS, faqCommune, villeBySlug, type Ville } from "@/data/villes";

// Bloc local des landings villes, rendu côté serveur dans MetierLanding : texte propre à la commune,
// référencement local, zone d'intervention (maillage vers les villes voisines) et FAQ.
// C'est lui qui distingue chaque page des autres aux yeux de Google.

export const villeFaq = (ville: Ville) => [...ville.faq, ...faqCommune(ville)];

export default function VilleSeo({ ville }: { ville: Ville }) {
  const voisines = ville.voisines.map(villeBySlug).filter((v): v is Ville => Boolean(v));
  const faq = villeFaq(ville);

  return (
    <div className="flex flex-col gap-24 md:gap-[150px] text-[#30041b]">
      {/* ANCRAGE LOCAL */}
      <section data-reveal-group className="grid grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-5 md:px-10">
        <div data-reveal="up" className="flex flex-col gap-[14px] md:col-span-4">
          <p className="text-[16px]">{SECTEURS[ville.secteur].name}</p>
          <h2 className="text-[32px] md:text-[40px] leading-[1.2]">Votre site internet {ville.in}</h2>
        </div>
        <div className="flex flex-col gap-6 text-[18px] md:col-span-7 md:col-start-6 md:text-[22px] leading-[1.4]">
          {ville.intro.map((p) => (
            <p key={p.slice(0, 24)} data-reveal="up">{p}</p>
          ))}
          <div data-reveal="up" className="flex flex-col gap-4 pt-4">
            <h3 className="text-[16px]">Les métiers qu&apos;on accompagne {ville.in}</h3>
            <ul className="flex flex-wrap gap-2">
              {ville.metiers.map((metier) => (
                <li key={metier} className="rounded-full border border-[#30041b]/30 px-4 py-2 text-[15px]">{metier}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* RÉFÉRENCEMENT LOCAL */}
      <section data-reveal-group className="flex flex-col gap-[50px] px-6 md:px-10">
        <div data-reveal="up" className="flex max-w-[760px] flex-col gap-[14px]">
          <p className="text-[16px]">Référencement local</p>
          <h2 className="text-[32px] md:text-[40px] leading-[1.2]">Être trouvé sur Google {ville.in} et aux alentours</h2>
        </div>
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2">
          <div data-reveal="card" className="flex flex-col gap-4 bg-[#f2f2f2] px-[36px] py-[32px]">
            <h3 className="text-[22px] font-medium">Notre méthode {ville.in}</h3>
            <p className="text-[16px] leading-[1.5]">{ville.seo}</p>
          </div>
          <div data-reveal="card" className="flex flex-col gap-4 bg-[#30041b] px-[36px] py-[32px] text-white">
            <h3 className="text-[22px] font-medium">Les recherches qu&apos;on vise pour vous</h3>
            <ul className="flex flex-col gap-2 text-[16px]">
              {ville.requetes.map((r) => (
                <li key={r} className="flex items-center gap-2">
                  <span aria-hidden className="h-px w-3 bg-[#f70046]" />« {r} »
                </li>
              ))}
            </ul>
            <p className="pt-2 text-[14px] text-white/60">
              Fiche Google Business Profile, données structurées, vitesse mobile et avis clients : tout est prêt dès la mise en ligne.
            </p>
          </div>
        </div>
      </section>

      {/* ZONE D'INTERVENTION : maillage interne vers les villes voisines */}
      <section data-reveal-group className="flex flex-col gap-[50px] px-6 md:px-10">
        <div data-reveal="up" className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="flex max-w-[640px] flex-col gap-[14px]">
            <p className="text-[16px]">Zone d&apos;intervention</p>
            <h2 className="text-[32px] md:text-[40px] leading-[1.2]">On crée aussi des sites autour {ville.of}</h2>
          </div>
          <Link href="/creation-site-internet" className="text-[16px] underline underline-offset-4 decoration-[#30041b]/30 transition-colors hover:decoration-[#30041b]">
            Toutes nos villes en Loire-Atlantique
          </Link>
        </div>
        <ul className="grid grid-cols-1 gap-[5px] sm:grid-cols-2 md:grid-cols-3">
          {voisines.map((v) => (
            <li key={v.slug} data-reveal="card">
              <Link
                href={`/creation-site-internet/${v.slug}`}
                className="group flex h-full flex-col gap-2 bg-[#f2f2f2] px-[30px] py-[26px] transition-colors duration-300 hover:bg-[#f70046] hover:text-white"
              >
                <span className="text-[20px] font-medium">Création de site internet {v.in}</span>
                <span className="text-[14px] text-[#30041b]/60 transition-colors group-hover:text-white/80">
                  {v.postalCode} · {SECTEURS[v.secteur].name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section data-reveal-group className="grid grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-5 md:px-10">
        <div data-reveal="up" className="flex flex-col gap-[14px] md:col-span-4">
          <p className="text-[16px]">Questions fréquentes</p>
          <h2 className="text-[32px] md:text-[40px] leading-[1.2]">Votre site {ville.in} en questions</h2>
        </div>
        <div className="flex flex-col md:col-span-7 md:col-start-6">
          {faq.map((item) => (
            <details key={item.q} data-reveal="up" className="group border-b border-[#30041b]/20 py-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[18px] md:text-[22px]">
                <h3>{item.q}</h3>
                <span aria-hidden className="text-[28px] leading-none transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="pt-4 text-[16px] leading-[1.5] text-[#30041b]/75">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
