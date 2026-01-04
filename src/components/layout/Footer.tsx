"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const navItems = [
  { label: 'Work', href: '/works' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: "Let's talk", href: '/contact' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/artichaud.studio/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/artichaud-studio' },
  { label: 'Tiktok', href: 'https://www.tiktok.com/@artichaud.studio' },
];

const Footer: React.FC = () => {
  return (
    <>
      {/* SPACER */}
      <div className="footer-spacer pointer-events-none" />

      <footer
        className="footer-container relative"
        style={{
          zIndex: 1,
          backgroundColor: '#000000',
          color: '#fff',
          padding: '80px 40px',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden'
        }}
      >
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto w-full">

          {/* Colonne 1 - Let's talk */}
          <div className="flex flex-col gap-8">
            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight"
              style={{ color: '#D0FF00' }}
            >
              Let's talk
            </h2>
            <Link href="/contact" suppressHydrationWarning={true}>
              <motion.span
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 cursor-pointer text-base font-medium"
                style={{
                  borderColor: '#D0FF00',
                  color: '#D0FF00',
                }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(208, 255, 0, 0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span>→</span> Get in touch
              </motion.span>
            </Link>
          </div>

          {/* Colonne 2 - Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-medium text-white mb-2">Contact Me</h3>
            <a
              href="mailto:artichaud.studio@gmail.com"
              className="text-white/60 hover:text-white transition-colors text-sm"
              suppressHydrationWarning={true}
            >
              artichaud.studio@gmail.com
            </a>
            <a
              href="tel:0697538017"
              className="text-white/60 hover:text-white transition-colors text-sm"
            >
              06 97 53 80 17
            </a>
          </div>

          {/* Colonne 3 - Social */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-medium text-white mb-2">Follow Me</h3>
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                suppressHydrationWarning={true}
                target="_blank"
                className="text-white/60 hover:text-white transition-colors text-sm"
              >
                {social.label}
              </Link>
            ))}
          </div>

          {/* Colonne 4 - Overview + Légal */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-medium text-white mb-2">Overview</h3>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                suppressHydrationWarning={true}
                className="text-white/60 hover:text-white transition-colors text-sm"
              >
                {item.label}
              </Link>
            ))}
            
            {/* --- AJOUT MENTIONS LÉGALES --- */}
            <Link
              href="/mentions-legales"
              suppressHydrationWarning={true}
              className="text-white/40 hover:text-[#D0FF00] transition-colors text-xs uppercase tracking-wider mt-2"
            >
              Mentions Légales
            </Link>

            {/* Lien SEO Boulogne */}
            <Link
              href="/creation-site-internet-boulogne-billancourt"
              suppressHydrationWarning={true}
              className="text-white/40 hover:text-white transition-colors text-xs"
            >
              Création de site internet à Boulogne-Billancourt
            </Link>
          </div>
        </div>

        {/* BOTTOM SECTION - Giant Artichaud text */}
        <div 
          className="relative w-full mt-auto"
          style={{
             marginLeft: '-40px', 
             marginRight: '-40px', 
             width: 'calc(100% + 80px)' 
          }}
        >
          <div
            className="font-bold leading-none select-none text-center"
            style={{
              color: '#ffffff',
              opacity: 1,
              fontSize: '13.5vw', // CORRECTION: Utiliser vw pur au lieu de clamp pour remplir la largeur
              lineHeight: 0.8,
              letterSpacing: '-0.04em',
              paddingBottom: '20px'
            }}
          >
            Artichaud
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;