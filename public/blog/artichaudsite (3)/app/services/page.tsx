import type { Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Nos Services - Artichaud Studio | Branding, Webdesign & Marketing',
  description: 'Découvrez nos services : Brand Strategy, Visual Identity, Webdesign, Webmarketing et Shooting Produit. Des solutions créatives sur mesure pour votre entreprise.',
  keywords: ['branding', 'webdesign', 'marketing digital', 'identité visuelle', 'stratégie de marque'],
  openGraph: {
    title: 'Nos Services - Artichaud Studio',
    description: 'Brand Strategy, Visual Identity, Webdesign, Webmarketing et Shooting Produit.',
    url: 'https://artichaud.studio/services',
    siteName: 'Artichaud Studio',
    locale: 'fr_FR',
    type: 'website',
  },
};
const services = [
    {
      number: '01',
      title: 'Brand strategy',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
      image1: '/img/services/brandstrategy1.jpg',
      image2: '/img/services/brandstrategy2.jpg',
    },
    {
      number: '02',
      title: 'Visual identity',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        image1: '/img/services/brandstrategy1.jpg',
        image2: '/img/services/brandstrategy2.jpg',
    },
    {
      number: '03',
      title: 'Webdesign',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        image1: '/img/services/brandstrategy1.jpg',
        image2: '/img/services/brandstrategy2.jpg',
    },
    {
      number: '04',
      title: 'Webmarketing',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        image1: '/img/services/brandstrategy1.jpg',
        image2: '/img/services/brandstrategy2.jpg',
    },
    {
      number: '05',
      title: 'Shooting produit',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        image1: '/img/services/brandstrategy1.jpg',
        image2: '/img/services/brandstrategy2.jpg',
    },
  ];
export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="relative bg-noir text-blanc overflow-hidden">
        {/* Dégradé en haut à gauche - Eclipse ROUGE */}
        <div 
          className="absolute top-0 left-0 pointer-events-none z-0"
          style={{
            width: '800px',
            height: '800px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 0, 0, 0.6) 0%, rgba(255, 0, 0, 0.3) 40%, transparent 70%)',
            filter: 'blur(60px)',
            transform: 'translate(-30%, -30%)',
          }}
        />

        {/* Dégradé en haut à gauche - Eclipse ORANGE */}
        <div 
          className="absolute top-0 left-0 pointer-events-none z-0"
          style={{
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 111, 0, 0.5) 0%, rgba(255, 157, 0, 0.3) 40%, transparent 70%)',
            filter: 'blur(50px)',
            transform: 'translate(-10%, 10%)',
          }}
        />

        {/* Carré dégradé rotaté 1 - ROUGE en haut à droite */}
        <div 
          className="absolute hidden lg:block pointer-events-none z-0"
          style={{
            top: '350px',
            right: '-25%',
            width: '611.144px',
            height: '611.144px',
            transform: 'rotate(-75.773deg)',
            flexShrink: 0,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 0, 0, 0.7) 0%, rgba(255, 0, 0, 0.4) 50%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />

        {/* Carré dégradé rotaté 2 - ORANGE plus bas à droite */}
        <div 
          className="absolute hidden lg:block pointer-events-none z-0"
          style={{
            top: '800px',
            right: '-20%',
            width: '499.052px',
            height: '499.052px',
            transform: 'rotate(-26.56deg)',
            flexShrink: 0,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 111, 0, 0.6) 0%, rgba(255, 157, 0, 0.4) 50%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />

        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20">
          <div className="container-custom relative z-10">
            <div className="max-w-2xl">
              <p 
                className="text-blanc/90 leading-relaxed"
                style={{ 
                  fontFamily: 'var(--font-inter)',
                  fontSize: 'clamp(20px, 2.5vw, 36px)',
                  lineHeight: '1.5',
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </p>
            </div>
          </div>
        </section>

        {/* WHEN SECTION */}
        <section className="relative section-padding border-t border-blanc/10">
          <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Colonne gauche - Description */}
              <div>
                <h2 
                  className="text-blanc font-bold mb-8 uppercase"
                  style={{ 
                    fontFamily: 'var(--font-inter)',
                    fontSize: 'clamp(16px, 1.8vw, 24px)',
                  }}
                >
                  WHEN ?
                </h2>
                <p 
                  className="text-blanc/70 leading-relaxed"
                  style={{ 
                    fontFamily: 'var(--font-inter)',
                    fontSize: 'clamp(14px, 1.2vw, 16px)',
                    lineHeight: '1.6',
                  }}
                >
                  We were tasked with creating a website for Monist, a boutique hotel located in Palanga. Our primary objective was to attract career-focused individuals aged 30-50 seeking a high-quality, peaceful escape. To achieve this, we aimed to ensure full occupancy during.
                </p>
              </div>

              {/* Colonne droite - 3 catégories */}
              <div className="space-y-12">
                {/* Sprint */}
                <div>
                  <h3 
                    className="text-blanc font-normal italic mb-4"
                    style={{ 
                      fontFamily: 'var(--font-instrument)',
                      fontSize: 'clamp(20px, 2.2vw, 32px)',
                    }}
                  >
                    ( Sprint )
                  </h3>
                  <p 
                    className="text-blanc/70 leading-relaxed"
                    style={{ 
                      fontFamily: 'var(--font-inter)',
                      fontSize: 'clamp(14px, 1.2vw, 16px)',
                      lineHeight: '1.6',
                    }}
                  >
                    We were tasked with creating a website for Monist, a boutique hotel located in Palanga. Our primary objective was to attract career-focused individuals aged 30-50 seeking a high-quality, peaceful escape. To achieve this, we aimed to ensure full occupancy during.
                  </p>
                </div>

                {/* Branding */}
                <div>
                  <h3 
                    className="text-blanc font-normal italic mb-4"
                    style={{ 
                      fontFamily: 'var(--font-instrument)',
                      fontSize: 'clamp(20px, 2.2vw, 32px)',
                    }}
                  >
                    ( Branding )
                  </h3>
                  <p 
                    className="text-blanc/70 leading-relaxed"
                    style={{ 
                      fontFamily: 'var(--font-inter)',
                      fontSize: 'clamp(14px, 1.2vw, 16px)',
                      lineHeight: '1.6',
                    }}
                  >
                    We were tasked with creating a website for Monist, a boutique hotel located in Palanga. Our primary objective was to attract career-focused individuals aged 30-50 seeking a high-quality, peaceful escape. To achieve this, we aimed to ensure full occupancy during.
                  </p>
                </div>

                {/* Venture */}
                <div>
                  <h3 
                    className="text-blanc font-normal italic mb-4"
                    style={{ 
                      fontFamily: 'var(--font-instrument)',
                      fontSize: 'clamp(20px, 2.2vw, 32px)',
                    }}
                  >
                    ( Venture )
                  </h3>
                  <p 
                    className="text-blanc/70 leading-relaxed"
                    style={{ 
                      fontFamily: 'var(--font-inter)',
                      fontSize: 'clamp(14px, 1.2vw, 16px)',
                      lineHeight: '1.6',
                    }}
                  >
                    We were tasked with creating a website for Monist, a boutique hotel located in Palanga. Our primary objective was to attract career-focused individuals aged 30-50 seeking a high-quality, peaceful escape. To achieve this, we aimed to ensure full occupancy during.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section SERVICES - À ajouter ici avec la liste des services */}
      {/* SERVICES */}
<section className="relative section-padding  overflow-hidden">



  <div className="container-custom relative z-10">
    {/* Titre */}
    <div className="mb-12 lg:mb-20">
      <h2 className="inline">
        <span 
          className="text-blanc font-bold"
          style={{ fontSize: 'clamp(63px, 6.25vw, 90px)', fontFamily: 'var(--font-inter)' }}
        >
          Services
        </span>
        <span 
          className="text-blanc font-light italic ml-4"
          style={{ fontSize: 'clamp(49px, 4.86vw, 70px)', fontFamily: 'var(--font-instrument)' }}
        >
          (yeah)
        </span>
      </h2>
    </div>

    {/* Liste des services */}
    <div className="space-y-0">
      {services.map((service, index) => (
        <div
          key={service.number}
          className="group relative cursor-pointer transition-all duration-500 border-t border-blanc/20 hover:border-transparent"
          
        >
          {/* Fond hover avec dégradé */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(90deg, #FF0000 0%, #FF6F00 50%, #FF9D00 100%)'
            }}
          />

          {/* Contenu */}
          <div className="relative">
            {/* Layout Desktop - Grid 4 colonnes */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-0 min-h-[200px]">
              {/* Numéro - Zone 1 (0-25%) */}
              <div className="col-span-1 flex items-start py-12 pl-8">
                <span 
                  style={{
                    color: '#F2F2F2',
                    fontFamily: 'var(--font-inter)',
                    fontSize: 'clamp(11.2px, 1.11vw, 16px)',
                    fontWeight: 700,
                    lineHeight: '140%',
                    textTransform: 'uppercase'
                  }}
                >
                  ( {service.number} )
                </span>
              </div>

              {/* Titre et description - Zone 2 (25-50%) */}
              <div className="col-span-1 pr-8 flex flex-col justify-start py-12">
                <h3 
                  className="mb-4"
                  style={{
                    color: '#F2F2F2',
                    fontFamily: 'var(--font-inter)',
                    fontSize: 'clamp(15.4px, 1.53vw, 22px)',
                    fontWeight: 700,
                    lineHeight: '140%',
                    textTransform: 'uppercase'
                  }}
                >
                  {service.title}
                </h3>
                <p 
                  style={{
                    color: 'rgba(255, 255, 255, 0.70)',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '14px',
                    fontWeight: 300,
                    lineHeight: '140%'
                  }}
                >
                  {service.description}
                </p>
              </div>

              {/* Image 1 - Zone 3 (50-75%) - Apparaît au hover */}
              <div className="col-span-1 relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {service.image1 && (
                    <img 
                      src={service.image1} 
                      alt={`${service.title} 1`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Image 2 - Zone 4 (75-100%) - Apparaît au hover */}
              <div className="col-span-1 relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {service.image2 && (
                    <img 
                      src={service.image2} 
                      alt={`${service.title} 2`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Layout Mobile - Empilement vertical */}
            <div className="lg:hidden py-8 px-4">
              {/* Numéro et Titre sur la même ligne */}
              <div className="flex items-start gap-4 mb-4">
                <span 
                  style={{
                    color: '#F2F2F2',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '14px',
                    fontWeight: 700,
                    lineHeight: '140%',
                    textTransform: 'uppercase',
                    flexShrink: 0
                  }}
                >
                  ( {service.number} )
                </span>
                <h3 
                  style={{
                    color: '#F2F2F2',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '16px',
                    fontWeight: 700,
                    lineHeight: '140%',
                    textTransform: 'uppercase'
                  }}
                >
                  {service.title}
                </h3>
              </div>

              {/* Description */}
              <p 
                className="pl-0"
                style={{
                  color: 'rgba(255, 255, 255, 0.70)',
                  fontFamily: 'var(--font-inter)',
                  fontSize: '14px',
                  fontWeight: 300,
                  lineHeight: '140%'
                }}
              >
                {service.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
      
      </main>
      <Footer />
    </>
  );
}