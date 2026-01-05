import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Contact - Artichaud Studio | Parlons de votre projet',
  description:
    'Contactez Artichaud Studio pour discuter de votre projet digital. Nous sommes à Paris et répondons sous 24h. Transformons vos idées ensemble.',
  keywords: ['contact', 'devis', 'projet digital', 'agence Paris', 'nous contacter'],
  openGraph: {
    title: 'Contact - Artichaud Studio',
    description: 'Contactez-nous pour discuter de votre projet digital.',
    url: 'https://artichaud.studio/contact',
    siteName: 'Artichaud Studio',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />

      <main className="pt-24 min-h-screen bg-[#ffffff] text-[#F2F2F2]">
        {/* Titre */}
        <section className="section-padding pb-10">
          <div className="max-w-[1400px] mx-auto px-[clamp(1rem,3vw,3rem)]">
            <h1
              className="mb-8 leading-none"
              style={{
                fontFamily: 'var(--font-inter)',
                fontWeight: 800,
                fontSize: 'clamp(36px, 5.2vw, 72px)',
                letterSpacing: '-0.02em',
                color: '#000000',
              }}
            >
              Let’s talk{' '}
              <span
                className="italic opacity-100"
                style={{
                  fontFamily: 'var(--font-instrument)',
                  fontWeight: 400,
                  color: '#000000',
                }}
              >
                (hot…)
              </span>
            </h1>

            {/* Card foncée */}
            <div className="rounded-sm bg-[#171717] border border-white/5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Col gauche : polaroid */}
                <div className="p-[clamp(16px,2.5vw,32px)] lg:p-12 flex items-center">
                  <div className="w-full">
                    <div
                      className="mx-auto w-[min(320px,80%)] rotate-[-6deg] shadow-2xl"
                      aria-hidden
                    >
                      <div className="bg-white p-3 pb-10">
                        <div className="w-full aspect-[1/1] bg-gradient-to-br from-[#FF3B00] to-[#FF8A00] grid place-items-center">
                          {/* logo centra l (remplace l’emoji par ton SVG si tu veux) */}
                          <img
                            src="/img/logonavbar.png"
                            alt=""
                            className="w-[38%] h-auto opacity-95"
                          />
                        </div>
                        {/* petite punaise */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black/80" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Col droite : formulaire */}
                <div className="p-[clamp(16px,2.5vw,32px)] lg:p-12">
                  <h2
                    className="mb-8 tracking-wide"
                    style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                  >
                    CONTACT
                  </h2>

                  <form className="space-y-10">
                    {/* Ligne 1 : Nom / Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs uppercase tracking-wider mb-3 opacity-70"
                        >
                          Nom
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder=""
                          className="w-full bg-transparent outline-none border-0 border-b border-white/15 focus:border-white/50 transition-colors py-2"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs uppercase tracking-wider mb-3 opacity-70"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="w-full bg-transparent outline-none border-0 border-b border-white/15 focus:border-white/50 transition-colors py-2"
                        />
                      </div>
                    </div>

                    {/* Ligne 2 : Téléphone / Sujet */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs uppercase tracking-wider mb-3 opacity-70"
                        >
                          Téléphone
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          className="w-full bg-transparent outline-none border-0 border-b border-white/15 focus:border-white/50 transition-colors py-2"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-xs uppercase tracking-wider mb-3 opacity-70"
                        >
                          Sujet
                        </label>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          className="w-full bg-transparent outline-none border-0 border-b border-white/15 focus:border-white/50 transition-colors py-2"
                        />
                      </div>
                    </div>

                    {/* Message (ligne bleue style maquette = focus-visible) */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs uppercase tracking-wider mb-3 opacity-70"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        className="w-full bg-transparent outline-none border-0 border-b border-white/15 focus:border-[#1DA1F2] transition-colors py-2 resize-y"
                      />
                      {/* aide visuelle “ligne” */}
                      <div className="h-[3px] w-full bg-white/5 mt-2 rounded"></div>
                    </div>

                    {/* Bouton envoyer */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="group inline-flex items-center gap-3 bg-[#FF6F00] hover:bg-[#FF6F00]/90 text-white text-xs tracking-wider uppercase px-5 py-3"
                        style={{ fontFamily: 'var(--font-inter)', fontWeight: 700 }}
                      >
                        <span className="inline-flex w-5 h-5 items-center justify-center bg-white text-[#FF6F00]">
                          {/* flèche */}
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M5 12h14M13 5l7 7-7 7"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        Envoyer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bande orange = gérée par ton Footer, on garde ton composant */}
      </main>

      <Footer />
    </>
  );
}
