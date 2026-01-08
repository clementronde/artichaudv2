import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Nos Réalisations - Artichaud Studio | Portfolio et Projets',
  description: 'Explorez nos projets : Charit.io, Multiface, Disobey, Com\'on et plus encore. Découvrez notre expertise en branding et design digital.',
  keywords: ['portfolio', 'réalisations', 'projets design', 'case studies', 'branding exemples'],
  openGraph: {
    title: 'Nos Réalisations - Artichaud Studio',
    description: 'Explorez nos projets et découvrez notre expertise en branding et design digital.',
    url: 'https://artichaud.studio/works',
    siteName: 'Artichaud Studio',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function WorksPage() {
  return (
    <>
      <Header />
      <main className="pt-24 bg-noir text-blanc">
        {/* WORKS SECTION */}
        <section className="relative section-padding overflow-hidden">
         {/* Traits verticaux - Cachés sur mobile */}
  <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
    <div className="relative h-full max-w-[1400px] mx-auto px-[clamp(1rem,3vw,3rem)]">
      <div 
        className="absolute top-0 bottom-0 w-[1px] bg-blanc/10"
        style={{ left: '26.5%' }}
      />
      <div 
        className="absolute top-0 bottom-0 w-[1px] bg-blanc/10"
        style={{ left: '50%' }}
      />
      <div 
        className="absolute top-0 bottom-0 w-[1px] bg-blanc/10"
        style={{ left: '73.5%' }}
      />
    </div>
  </div>

          <div className="container-custom relative z-10">
            {/* Titre */}
            <div className="mb-20">
              <h1 className="inline">
                <span 
                  className="text-blanc font-bold"
                  style={{ fontSize: 'clamp(63px, 6.25vw, 90px)', fontFamily: 'var(--font-inter)' }}
                >
                  Works
                </span>
                <span 
                  className="text-blanc font-normal italic ml-4"
                  style={{ fontSize: 'clamp(49px, 4.86vw, 70px)', fontFamily: 'var(--font-instrument)' }}
                >
                  (hot...)
                </span>
              </h1>
            </div>

            {/* CHARIT.IO + JOBMI - 50% chacun */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-0">
              {/* CHARIT.IO - 50% gauche (0-50%) */}
              <article className="relative group cursor-pointer">
                <Link href="/selectedworks/charitio" className="block">
                  <div className="relative">
                    <div className="pb-4">
                      <h3 
                        className="text-blanc font-bold uppercase"
                        style={{ 
                          fontSize: 'clamp(14px, 1.39vw, 20px)', 
                          fontFamily: 'var(--font-inter)' 
                        }}
                      >
                        CHARIT.IO
                      </h3>
                    </div>
                    <div className="relative overflow-hidden bg-blanc/5 aspect-[4/3]">
                      <img 
                        src="/img/selectedworks/charitio.jpg" 
                        alt="Charit.io"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </Link>
              </article>

              {/* JOBMI - 50% droite (50-100%) */}
              <article className="relative group cursor-pointer">
                <Link href="/selectedworks/jobmi" className="block">
                  <div className="relative">
                    <div className="pb-4">
                      <h3 
                        className="text-blanc font-bold uppercase"
                        style={{ 
                          fontSize: 'clamp(14px, 1.39vw, 20px)', 
                          fontFamily: 'var(--font-inter)' 
                        }}
                      >
                        JOBMI
                      </h3>
                    </div>
                    <div className="relative overflow-hidden bg-blanc/5 aspect-[4/3]">
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-blanc/20" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            </div>

            {/* DISOBEY - Entre le 2ème et 3ème trait (25-75%) */}
            <article className="relative group cursor-pointer mt-20">
              <Link href="/selectedworks/disobey" className="block">
                <div className="grid grid-cols-4 gap-0">
                  <div className="col-span-1"></div>
                  <div className="col-span-1">
                    <img 
                      src="/img/selectedworks/disobey.jpg" 
                      alt="Disobey"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="col-span-1 pl-6 pr-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-auto">
                        <h3 
                          style={{
                            color: '#F2F2F2', 
                            fontFamily: 'var(--font-inter)', 
                            fontSize: 'clamp(11.2px, 1.11vw, 16px)', 
                            fontWeight: 700, 
                            lineHeight: '140%', 
                            textTransform: 'uppercase'
                          }}
                        >
                          DISOBEY
                        </h3>
                        <span 
                          style={{
                            color: '#F2F2F2', 
                            fontFamily: 'var(--font-inter)', 
                            fontSize: 'clamp(11.2px, 1.11vw, 16px)', 
                            fontWeight: 700, 
                            lineHeight: '140%', 
                            textTransform: 'uppercase', 
                            marginLeft: 'clamp(12px, 1.11vw, 16px)', 
                            flexShrink: 0
                          }}
                        >
                          ( 01 )
                        </span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <p className="mb-3" style={{color: 'rgba(255, 255, 255, 0.70)', fontFamily: 'var(--font-inter)', fontSize: 'clamp(8.4px, 0.83vw, 12px)', fontWeight: 300, lineHeight: '140%'}}>
                        Delivrables
                      </p>
                      <ul className="space-y-2">
                        <li style={{color: '#F2F2F2', fontFamily: 'var(--font-inter)', fontSize: 'clamp(8.4px, 0.83vw, 12px)', fontWeight: 400, lineHeight: '140%', textTransform: 'uppercase'}}>WEBDESIGN</li>
                        <li style={{color: '#F2F2F2', fontFamily: 'var(--font-inter)', fontSize: 'clamp(8.4px, 0.83vw, 12px)', fontWeight: 400, lineHeight: '140%', textTransform: 'uppercase'}}>SOCIAL MEDIA</li>
                        <li style={{color: '#F2F2F2', fontFamily: 'var(--font-inter)', fontSize: 'clamp(8.4px, 0.83vw, 12px)', fontWeight: 400, lineHeight: '140%', textTransform: 'uppercase'}}>BRAND IDENTITY</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-span-1"></div>
                </div>
              </Link>
            </article>

            {/* MULTIFACE - Image 50% gauche (0-50%), Texte zone 3 (50-75%) */}
            <article className="relative group cursor-pointer mt-20">
              <Link href="/selectedworks/multiface" className="block">
                <div className="grid grid-cols-4 gap-0">
                  <div className="col-span-2">
                    <img 
                      src="/img/selectedworks/multiface.jpg" 
                      alt="Multiface"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="col-span-1 pl-6 pr-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-auto">
                        <h3 style={{color: '#F2F2F2', fontFamily: 'var(--font-inter)', fontSize: 'clamp(11.2px, 1.11vw, 16px)', fontWeight: 700, lineHeight: '140%', textTransform: 'uppercase'}}>MULTIFACE</h3>
                        <span style={{color: '#F2F2F2', fontFamily: 'var(--font-inter)', fontSize: 'clamp(11.2px, 1.11vw, 16px)', fontWeight: 700, lineHeight: '140%', textTransform: 'uppercase', marginLeft: 'clamp(12px, 1.11vw, 16px)', flexShrink: 0}}>( 02 )</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <p className="mb-3" style={{color: 'rgba(255, 255, 255, 0.70)', fontFamily: 'var(--font-inter)', fontSize: 'clamp(8.4px, 0.83vw, 12px)', fontWeight: 300, lineHeight: '140%'}}>Delivrables</p>
                      <ul className="space-y-2">
                        <li style={{color: '#F2F2F2', fontFamily: 'var(--font-inter)', fontSize: 'clamp(8.4px, 0.83vw, 12px)', fontWeight: 400, lineHeight: '140%', textTransform: 'uppercase'}}>WEBDESIGN</li>
                        <li style={{color: '#F2F2F2', fontFamily: 'var(--font-inter)', fontSize: 'clamp(8.4px, 0.83vw, 12px)', fontWeight: 400, lineHeight: '140%', textTransform: 'uppercase'}}>BRAND STRATEGY</li>
                        <li style={{color: '#F2F2F2', fontFamily: 'var(--font-inter)', fontSize: 'clamp(8.4px, 0.83vw, 12px)', fontWeight: 400, lineHeight: '140%', textTransform: 'uppercase'}}>BRAND IDENTITY</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-span-1"></div>
                </div>
              </Link>
            </article>

            {/* KELETI TAUTU - Image 0-25%, Texte 25-50% */}
            <article className="relative group cursor-pointer mt-20">
              <Link href="/selectedworks/keleti" className="block">
                <div className="grid grid-cols-4 gap-0">
                  <div className="col-span-1">
                    <img 
                      src="/img/selectedworks/keleti.jpg" 
                      alt="Keleti Tautu"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="col-span-1 pl-6 pr-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-auto">
                        <h3 style={{color: '#F2F2F2', fontFamily: 'var(--font-inter)', fontSize: 'clamp(11.2px, 1.11vw, 16px)', fontWeight: 700, lineHeight: '140%', textTransform: 'uppercase'}}>KELETI TAUTU</h3>
                        <span style={{color: '#F2F2F2', fontFamily: 'var(--font-inter)', fontSize: 'clamp(11.2px, 1.11vw, 16px)', fontWeight: 700, lineHeight: '140%', textTransform: 'uppercase', marginLeft: 'clamp(12px, 1.11vw, 16px)', flexShrink: 0}}>( 03 )</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <p className="mb-3" style={{color: 'rgba(255, 255, 255, 0.70)', fontFamily: 'var(--font-inter)', fontSize: 'clamp(8.4px, 0.83vw, 12px)', fontWeight: 300, lineHeight: '140%'}}>Delivrables</p>
                      <ul className="space-y-2">
                        <li style={{color: '#F2F2F2', fontFamily: 'var(--font-inter)', fontSize: 'clamp(8.4px, 0.83vw, 12px)', fontWeight: 400, lineHeight: '140%', textTransform: 'uppercase'}}>WEBDESIGN</li>
                        <li style={{color: '#F2F2F2', fontFamily: 'var(--font-inter)', fontSize: 'clamp(8.4px, 0.83vw, 12px)', fontWeight: 400, lineHeight: '140%', textTransform: 'uppercase'}}>BRAND STRATEGY</li>
                        <li style={{color: '#F2F2F2', fontFamily: 'var(--font-inter)', fontSize: 'clamp(8.4px, 0.83vw, 12px)', fontWeight: 400, lineHeight: '140%', textTransform: 'uppercase'}}>BRAND IDENTITY</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-span-2"></div>
                </div>
              </Link>
            </article>

            {/* CHERICO - Image 0-25%, Texte 25-50% */}
            <article className="relative group cursor-pointer mt-20">
              <Link href="/selectedworks/cherico" className="block">
                <div className="grid grid-cols-4 gap-0">
                  <div className="col-span-1">
                    <img 
                      src="/img/selectedworks/cherico.jpg" 
                      alt="Cherico"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="col-span-1 pl-6 pr-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-auto">
                        <h3 style={{color: '#F2F2F2', fontFamily: 'var(--font-inter)', fontSize: 'clamp(11.2px, 1.11vw, 16px)', fontWeight: 700, lineHeight: '140%', textTransform: 'uppercase'}}>CHERICO</h3>
                        <span style={{color: '#F2F2F2', fontFamily: 'var(--font-inter)', fontSize: 'clamp(11.2px, 1.11vw, 16px)', fontWeight: 700, lineHeight: '140%', textTransform: 'uppercase', marginLeft: 'clamp(12px, 1.11vw, 16px)', flexShrink: 0}}>( 04 )</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <p className="mb-3" style={{color: 'rgba(255, 255, 255, 0.70)', fontFamily: 'var(--font-inter)', fontSize: 'clamp(8.4px, 0.83vw, 12px)', fontWeight: 300, lineHeight: '140%'}}>Delivrables</p>
                      <ul className="space-y-2">
                        <li style={{color: '#F2F2F2', fontFamily: 'var(--font-inter)', fontSize: 'clamp(8.4px, 0.83vw, 12px)', fontWeight: 400, lineHeight: '140%', textTransform: 'uppercase'}}>WEBDESIGN</li>
                        <li style={{color: '#F2F2F2', fontFamily: 'var(--font-inter)', fontSize: 'clamp(8.4px, 0.83vw, 12px)', fontWeight: 400, lineHeight: '140%', textTransform: 'uppercase'}}>BRAND STRATEGY</li>
                        <li style={{color: '#F2F2F2', fontFamily: 'var(--font-inter)', fontSize: 'clamp(8.4px, 0.83vw, 12px)', fontWeight: 400, lineHeight: '140%', textTransform: 'uppercase'}}>BRAND IDENTITY</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-span-2"></div>
                </div>
              </Link>
            </article>

            {/* COM'ON - Image 25-75%, Texte 75-100% */}
            <article className="relative group cursor-pointer mt-20">
              <Link href="/selectedworks/comon" className="block">
                <div className="grid grid-cols-4 gap-0">
                  <div className="col-span-1"></div>
                  <div className="col-span-2">
                    <img 
                      src="/img/selectedworks/comon.jpg" 
                      alt="Com'on"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="col-span-1 pl-6 pr-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-auto">
                        <h3 style={{color: '#F2F2F2', fontFamily: 'var(--font-inter)', fontSize: 'clamp(11.2px, 1.11vw, 16px)', fontWeight: 700, lineHeight: '140%', textTransform: 'uppercase'}}>COM'ON</h3>
                        <span style={{color: '#F2F2F2', fontFamily: 'var(--font-inter)', fontSize: 'clamp(11.2px, 1.11vw, 16px)', fontWeight: 700, lineHeight: '140%', textTransform: 'uppercase', marginLeft: 'clamp(12px, 1.11vw, 16px)', flexShrink: 0}}>( 05 )</span>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <p className="mb-3" style={{color: 'rgba(255, 255, 255, 0.70)', fontFamily: 'var(--font-inter)', fontSize: 'clamp(8.4px, 0.83vw, 12px)', fontWeight: 300, lineHeight: '140%'}}>Delivrables</p>
                      <ul className="space-y-2">
                        <li style={{color: '#F2F2F2', fontFamily: 'var(--font-inter)', fontSize: 'clamp(8.4px, 0.83vw, 12px)', fontWeight: 400, lineHeight: '140%', textTransform: 'uppercase'}}>SOCIAL MEDIA</li>
                        <li style={{color: '#F2F2F2', fontFamily: 'var(--font-inter)', fontSize: 'clamp(8.4px, 0.83vw, 12px)', fontWeight: 400, lineHeight: '140%', textTransform: 'uppercase'}}>BRAND STRATEGY</li>
                        <li style={{color: '#F2F2F2', fontFamily: 'var(--font-inter)', fontSize: 'clamp(8.4px, 0.83vw, 12px)', fontWeight: 400, lineHeight: '140%', textTransform: 'uppercase'}}>BRAND IDENTITY</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Link>
            </article>

            {/* UTOPIA + OLEHENRIKSEN - 50% chacun */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-20">
              {/* UTOPIA - 50% gauche */}
              <article className="relative group cursor-pointer">
                <Link href="/selectedworks/utopia.jpg" className="block">
                  <div className="relative">
                    <div className="pb-4">
                      <h3 className="text-blanc font-bold uppercase" style={{ fontSize: 'clamp(14px, 1.39vw, 20px)', fontFamily: 'var(--font-inter)' }}>UTOPIA</h3>
                    </div>
                    <div className="relative overflow-hidden bg-blanc/5 aspect-[4/3]">
                      <img 
                        src="/img/selectedworks/utopia.jpg" 
                        alt="Charit.io"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </Link>
              </article>

              {/* OLEHENRIKSEN - 50% droite */}
              <article className="relative group cursor-pointer">
                <Link href="/selectedworks/olehenriksen" className="block">
                  <div className="relative">
                    <div className="pb-4">
                      <h3 className="text-blanc font-bold uppercase" style={{ fontSize: 'clamp(14px, 1.39vw, 20px)', fontFamily: 'var(--font-inter)' }}>OLEHENRIKSEN</h3>
                    </div>
                    <div className="relative overflow-hidden bg-blanc/5 aspect-[4/3]">
                      <img 
                        src="/img/selectedworks/olehenriksen.jpg" 
                        alt="Charit.io"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </Link>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}