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

// Fonction pour déterminer si une couleur est "sombre"
const isColorDark = (color: string): boolean => {
  let r: number, g: number, b: number;
  
  // Format rgb(r g b / alpha) - nouveau format CSS avec espaces (Tailwind)
  const rgbSpaceMatch = color.match(/rgba?\((\d+)\s+(\d+)\s+(\d+)/);
  if (rgbSpaceMatch) {
    r = parseInt(rgbSpaceMatch[1]);
    g = parseInt(rgbSpaceMatch[2]);
    b = parseInt(rgbSpaceMatch[3]);
  }
  // Format rgb(r, g, b) ou rgba(r, g, b, a) - format classique
  else if (color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)) {
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      r = parseInt(match[1]);
      g = parseInt(match[2]);
      b = parseInt(match[3]);
    } else {
      return true;
    }
  }
  // Format hexadécimal
  else if (color.startsWith('#')) {
    const hex = color.slice(1);
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    }
  }
  // Couleurs nommées courantes
  else {
    const namedColors: Record<string, [number, number, number]> = {
      'black': [0, 0, 0],
      'white': [255, 255, 255],
      'transparent': [255, 255, 255],
    };
    if (namedColors[color.toLowerCase()]) {
      [r, g, b] = namedColors[color.toLowerCase()];
    } else {
      return true; // Par défaut sombre
    }
  }
  
  // Calcul de la luminosité relative (formule WCAG)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Seuil ajusté : #0a0a0a (10,10,10) donne ~0.039, donc bien en dessous de 0.5
  return luminance < 0.5;
};

// Fonction pour obtenir la couleur de fond effective
const getEffectiveBackgroundColor = (): string => {
  // Vérifier d'abord les éléments principaux de la page
  const main = document.querySelector('main');
  const body = document.body;
  const html = document.documentElement;
  
  // Liste des éléments à vérifier dans l'ordre de priorité
  const elementsToCheck = [main, body, html].filter(Boolean) as Element[];
  
  for (const element of elementsToCheck) {
    const computedStyle = window.getComputedStyle(element);
    const bgColor = computedStyle.backgroundColor;
    
    // Vérifier si la couleur n'est pas transparente
    if (bgColor && 
        bgColor !== 'transparent' && 
        bgColor !== 'rgba(0, 0, 0, 0)' &&
        !bgColor.includes('0, 0, 0, 0)')) {
      return bgColor;
    }
  }
  
  // Par défaut, considérer fond blanc
  return 'rgb(255, 255, 255)';
};

const Footer: React.FC = () => {
  const [isDarkFooter, setIsDarkFooter] = useState(true);
  
  useEffect(() => {
    const detectBackgroundColor = () => {
      const bgColor = getEffectiveBackgroundColor();
      const pageIsDark = isColorDark(bgColor);
      
      // Debug en dev
      if (process.env.NODE_ENV === 'development') {
        console.log('Background color detected:', bgColor);
        console.log('Page is dark:', pageIsDark);
      }
      
      // Si la page est sombre → footer clair (fond blanc, texte noir)
      // Si la page est claire → footer sombre (fond noir, texte blanc)
      setIsDarkFooter(!pageIsDark);
    };
    
    // Petite attente pour s'assurer que les styles sont appliqués
    const timeoutId = setTimeout(detectBackgroundColor, 100);
    
    // Observer les changements
    const observer = new MutationObserver(() => {
      setTimeout(detectBackgroundColor, 50);
    });
    
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['style', 'class'],
      childList: true,
      subtree: true 
    });
    
    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);
  
  return (
    <>
      <div className="footer-spacer" />
      
      <footer 
        className="footer-container"
        style={{
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
           {/* Modification : Taille responsive + Suppression de text-white pour gérer le thème */}
<h2 className="text-[12vw] md:text-[8vw] lg:text-[7vw] leading-[0.9] tracking-tighter font-medium mb-8 md:mb-12">
  Let's work<br />together
</h2>
            <Link href="/contact" suppressHydrationWarning={true}> 
              <motion.span 
                className="contact-button"
                
                style={{
                  borderColor: isDarkFooter ? '#fff' : '#000',
                  color: isDarkFooter ? '#fff' : '#000',
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
              className="link" suppressHydrationWarning={true}
              style={{ color: isDarkFooter ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}
            >
              artichaud.studio@gmail.com
            </a>
            <a 
              href="tel:0697538017" 
              className="link" 
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
                className="link"
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
                className="link"
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