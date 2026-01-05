import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative bg-noir">
      {/* Padding externe pour voir le fond noir */}
      <div 
        style={{
          padding: 'clamp(1rem, 3vw, 3rem)',
        }}
      >
        {/* Container orange avec padding interne */}
        <div 
          className="bg-orange text-blanc "
          style={{
            padding: 'clamp(2rem, 4vw, 4rem)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 mb-16">
            
            {/* Colonne 1 - EXPLORE */}
            <div>
              <h4 
                className="text-sm font-bold mb-6 uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Explore
              </h4>
              <nav>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      href="/works" 
                      className="text-2xl font-normal hover:opacity-80 transition-opacity"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      Work
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/about" 
                      className="text-2xl font-normal hover:opacity-80 transition-opacity"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/services" 
                      className="text-2xl font-normal hover:opacity-80 transition-opacity"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/blog" 
                      className="text-2xl font-normal hover:opacity-80 transition-opacity"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/contact" 
                      className="text-2xl font-normal hover:opacity-80 transition-opacity"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Colonne 2 - STALK US */}
            <div>
              <h4 
                className="text-sm font-bold mb-6 uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Stalk us
              </h4>
              <nav>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="https://instagram.com/artichaud.studio" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl font-normal hover:opacity-80 transition-opacity"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://tiktok.com/@artichaud.studio" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl font-normal hover:opacity-80 transition-opacity"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      Tiktok
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://linkedin.com/company/artichaud-studio" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl font-normal hover:opacity-80 transition-opacity"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://pinterest.com/artichaudstudio" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl font-normal hover:opacity-80 transition-opacity"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      Pinterest
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Colonne 3 - SAY HELLO */}
            <div className="lg:text-right">
              <h4 
                className="text-sm font-bold mb-6 uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Say hello
              </h4>
              <a 
                href="mailto:artichaud.studio@gmail.com"
                className="text-2xl font-normal hover:opacity-80 transition-opacity inline-block"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                artichaud.studio@gmail.com
              </a>
            </div>
          </div>

          {/* Bas du footer - Logo et Langue */}
          <div className="flex flex-col lg:flex-row justify-between items-center pt-8 border-t border-blanc/20">
            
            {/* Sélecteur de langue */}
            <div className="mb-8 lg:mb-0 order-2 lg:order-1">
              <button 
                className="text-base font-medium hover:opacity-80 transition-opacity"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                FR/EN
              </button>
            </div>

            {/* Logo et nom */}
            <div className="flex flex-col items-center order-1 lg:order-2 mb-8 lg:mb-0">
              <div className="w-16 h-16 mb-3">
                <Image
                  src="/img/logonavbar.png"
                  alt="Artichaud Logo"
                  width={64}
                  height={64}
                  className="w-full h-full"
                />
              </div>
              <span 
                className="text-2xl font-bold"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Artichaud
              </span>
            </div>

            {/* Espace vide pour équilibrer */}
            <div className="hidden lg:block w-[100px] order-3"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}