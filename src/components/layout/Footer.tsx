"use client"; 

import React, { useEffect, useState } from 'react';
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
  { label: 'TikTok', href: 'https://www.tiktok.com/@artichaud.studio' },
];

const isColorDark = (color: string): boolean => {
  let r: number, g: number, b: number;
  const rgbSpaceMatch = color.match(/rgba?\((\d+)\s+(\d+)\s+(\d+)/);
  if (rgbSpaceMatch) {
    r = parseInt(rgbSpaceMatch[1]); g = parseInt(rgbSpaceMatch[2]); b = parseInt(rgbSpaceMatch[3]);
  } else if (color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)) {
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) { r = parseInt(match[1]); g = parseInt(match[2]); b = parseInt(match[3]); } 
    else { return true; }
  } else if (color.startsWith('#')) {
    const hex = color.slice(1);
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16); g = parseInt(hex[1] + hex[1], 16); b = parseInt(hex[2] + hex[2], 16);
    } else {
      r = parseInt(hex.slice(0, 2), 16); g = parseInt(hex.slice(2, 4), 16); b = parseInt(hex.slice(4, 6), 16);
    }
  } else {
    const namedColors: Record<string, [number, number, number]> = { 'black': [0, 0, 0], 'white': [255, 255, 255], 'transparent': [255, 255, 255] };
    if (namedColors[color.toLowerCase()]) { [r, g, b] = namedColors[color.toLowerCase()]; } else { return true; }
  }
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
};

const getEffectiveBackgroundColor = (): string => {
  if (typeof window === 'undefined') return 'rgb(255, 255, 255)';
  const main = document.querySelector('main'); // Va maintenant cibler notre <main> dans le layout
  const body = document.body;
  const html = document.documentElement;
  const elementsToCheck = [main, body, html].filter(Boolean) as Element[];
  for (const element of elementsToCheck) {
    const computedStyle = window.getComputedStyle(element);
    const bgColor = computedStyle.backgroundColor;
    if (bgColor && bgColor !== 'transparent' && !bgColor.includes('0, 0, 0, 0')) {
      return bgColor;
    }
  }
  return 'rgb(255, 255, 255)';
};

const Footer: React.FC = () => {
  const [isDarkFooter, setIsDarkFooter] = useState(true);
  
  useEffect(() => {
    const detectBackgroundColor = () => {
      const bgColor = getEffectiveBackgroundColor();
      const pageIsDark = isColorDark(bgColor);
      setIsDarkFooter(!pageIsDark);
    };
    const timeoutId = setTimeout(detectBackgroundColor, 100);
    const observer = new MutationObserver(() => { setTimeout(detectBackgroundColor, 50); });
    observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'], childList: true, subtree: true });
    return () => { clearTimeout(timeoutId); observer.disconnect(); };
  }, []);
  
  return (
    <>
      {/* SPACER :
         On ajoute 'pointer-events-none' pour que les clics traversent ce bloc vide
         et atteignent le footer en dessous une fois scrollé.
      */}
      <div className="footer-spacer pointer-events-none" />
      
      <footer 
        className="footer-container"
        style={{
          // Z-INDEX FIX : On force 1 pour être au-dessus du body mais sous le main (z-10)
          zIndex: 1, 
          backgroundColor: isDarkFooter ? '#000' : '#fff',
          color: isDarkFooter ? '#fff' : '#000',
          transition: 'background-color 0.4s ease, color 0.4s ease'
        }}
      >
        <div 
          className="background-text"
          style={{ 
            color: isDarkFooter ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)' 
          }}
        >
          Artichaud
        </div>
        
        <div className="content-wrapper">
          <div className="column">
            <h2 className="text-[12vw] md:text-[8vw] lg:text-[7vw] leading-[0.9] tracking-tighter font-medium mb-8 md:mb-12">
              Let's work<br />together
            </h2>
            <Link href="/contact" suppressHydrationWarning={true}> 
              <motion.span 
                className="contact-button cursor-pointer" // Ajout explicite de cursor-pointer
                style={{
                  borderColor: isDarkFooter ? '#fff' : '#000',
                  color: isDarkFooter ? '#fff' : '#000',
                  position: 'relative', // S'assurer que le bouton a un contexte
                  zIndex: 20 // Pour être sûr qu'il est au dessus du texte de fond
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="arrow">→</span> Get in touch
              </motion.span>
            </Link>
          </div>
          
          <div className="column">
            <h3 className="subtitle">Contact Me</h3>
            <a 
              href="mailto:artichaud.studio@gmail.com" 
              className="link relative z-20" 
              suppressHydrationWarning={true}
              style={{ color: isDarkFooter ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
            >
              artichaud.studio@gmail.com
            </a>
            <a 
              href="tel:0697538017" 
              className="link relative z-20"
              style={{ color: isDarkFooter ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
            >
              06 97 53 80 17
            </a>
          </div>

          <div className="column">
            <h3 className="subtitle">Follow Me</h3>
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                suppressHydrationWarning={true}
                target="_blank"
                className="link relative z-20"
                style={{ color: isDarkFooter ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
              >
                {social.label}
              </Link>
            ))}
          </div>

          <div className="column">
            <h3 className="subtitle">Overview</h3>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                suppressHydrationWarning={true}
                className="link relative z-20"
                style={{ color: isDarkFooter ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="copyright">©</div>
        </div>
      </footer>
    </>
  );
};

export default Footer;