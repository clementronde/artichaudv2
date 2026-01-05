'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquer le scroll quand le menu est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Fonction pour savoir si on est sur la page
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  // Fermer le menu quand on clique sur un lien
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-noir backdrop-blur-lg py-6' : 'bg-transparent py-6'
        }`}
      >
        <div className="container-custom">
          <div className="flex justify-between items-center">
            {/* BURGER MENU MOBILE - À GAUCHE */}
            <button
              className="lg:hidden text-blanc z-50 relative order-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? (
                // Icône X
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                // Icône Burger (3 lignes)
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 7H21M3 12H21M3 17H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>

            {/* LOGO - CENTRÉ SUR DESKTOP, À DROITE SUR MOBILE */}
            <Link href="/" className="group relative z-50 lg:order-1 order-2">
              <img
                src="/img/logonavbar.png"
                alt="Artichaud Studio"
                className="h-14 w-auto transition-transform duration-300 group-hover:scale-110"
              />
              {/* Point blanc sous le logo si on est sur la home */}
              {isActive('/') && pathname === '/' && !isMenuOpen && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                  <div className="w-1.5 h-1.5 bg-blanc rounded-full"></div>
                </div>
              )}
            </Link>

            {/* NAVIGATION DESKTOP avec points indicateurs */}
            <nav className="hidden lg:flex items-center gap-10 order-2">
              {/* WORKS */}
              <Link
                href="/works"
                className={`relative text-[15px] transition-colors duration-300 ${
                  isActive('/works')
                    ? 'text-orange'
                    : 'text-blanc hover:text-orange'
                }`}
              >
                Works
                {isActive('/works') && (
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                    <div className="w-1.5 h-1.5 bg-blanc rounded-full animate-pulse"></div>
                  </div>
                )}
              </Link>

              {/* SERVICES */}
              <Link
                href="/services"
                className={`relative text-[15px] transition-colors duration-300 ${
                  isActive('/services')
                    ? 'text-orange'
                    : 'text-blanc hover:text-orange'
                }`}
              >
                Services
                {isActive('/services') && (
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                    <div className="w-1.5 h-1.5 bg-blanc rounded-full animate-pulse"></div>
                  </div>
                )}
              </Link>

              {/* ABOUT */}
              <Link
                href="/about"
                className={`relative text-[15px] transition-colors duration-300 ${
                  isActive('/about')
                    ? 'text-orange'
                    : 'text-blanc hover:text-orange'
                }`}
              >
                About
                {isActive('/about') && (
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                    <div className="w-1.5 h-1.5 bg-blanc rounded-full animate-pulse"></div>
                  </div>
                )}
              </Link>

              {/* BLOG */}
              <Link
                href="/blog"
                className={`relative text-[15px] transition-colors duration-300 ${
                  isActive('/blog')
                    ? 'text-orange'
                    : 'text-blanc hover:text-orange'
                }`}
              >
                Blog
                {isActive('/blog') && (
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                    <div className="w-1.5 h-1.5 bg-blanc rounded-full animate-pulse"></div>
                  </div>
                )}
              </Link>

              {/* CONTACT */}
              <Link
                href="/contact"
                className={`relative text-[15px] transition-colors duration-300 ${
                  isActive('/contact')
                    ? 'text-orange'
                    : 'text-blanc hover:text-orange'
                }`}
              >
                Contact
                {isActive('/contact') && (
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                    <div className="w-1.5 h-1.5 bg-blanc rounded-full animate-pulse"></div>
                  </div>
                )}
              </Link>
            </nav>

            {/* BOUTON "LET'S TALK" DESKTOP */}
            <Link
              href="/contact"
              className="hidden lg:flex items-center gap-2 text-blanc hover:text-orange transition-colors duration-300 text-[15px] group order-3"
            >
              <span>Let's talk</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M1 15L15 1M15 1H8M15 1V8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            {/* BOUTON "LET'S TALK" MOBILE - À DROITE EN HAUT DANS LE MENU */}
          </div>
        </div>
      </header>

      {/* MENU MOBILE FULLSCREEN */}
      <div
        className={`lg:hidden fixed inset-0 z-[100] transition-all duration-500 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Fond avec dégradé noir vers rouge-orange - opacité 100% pour cacher la page */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #000000 0%, #1a0000 40%, #FF0000 70%, #FF6F00 90%, #FF9D00 100%)',
          }}
        />

        {/* Header du menu avec burger et let's talk */}
        <div className="relative z-[110] px-6 py-6 flex justify-between items-center">
          {/* Burger (X) à gauche */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-blanc"
            aria-label="Fermer le menu"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Let's talk à droite */}
          <Link
            href="/contact"
            onClick={handleLinkClick}
            className="flex items-center gap-2 text-blanc hover:text-orange transition-colors"
          >
            <span className="text-sm font-medium">Let's talk</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M1 15L15 1M15 1H8M15 1V8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* Contenu du menu */}
        <div className="relative h-full flex flex-col pt-8">
          {/* Navigation centrée */}
          <nav className="flex-1 flex flex-col items-center justify-center gap-8 px-8">
            <Link
              href="/works"
              onClick={handleLinkClick}
              className="text-blanc text-4xl font-light hover:text-orange transition-colors"
              style={{ fontFamily: 'var(--font-instrument)' }}
            >
              WORKS
            </Link>
            <Link
              href="/services"
              onClick={handleLinkClick}
              className="text-blanc text-4xl font-light hover:text-orange transition-colors"
              style={{ fontFamily: 'var(--font-instrument)' }}
            >
              SERVICES
            </Link>
            <Link
              href="/about"
              onClick={handleLinkClick}
              className="text-blanc text-4xl font-light hover:text-orange transition-colors"
              style={{ fontFamily: 'var(--font-instrument)' }}
            >
              ABOUT
            </Link>
            <Link
              href="/blog"
              onClick={handleLinkClick}
              className="text-blanc text-4xl font-light hover:text-orange transition-colors"
              style={{ fontFamily: 'var(--font-instrument)' }}
            >
              BLOG
            </Link>
            <Link
              href="/contact"
              onClick={handleLinkClick}
              className="text-blanc text-4xl font-light hover:text-orange transition-colors"
              style={{ fontFamily: 'var(--font-instrument)' }}
            >
              CONTACT
            </Link>
          </nav>

          
        </div>
      </div>
    </>
  );
}