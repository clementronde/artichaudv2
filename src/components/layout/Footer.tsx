"use client"; 

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const navItems = ['Work', 'Services', 'About', "Let's talk"];

const Footer: React.FC = () => {
  return (
    <>
      {/* Spacer pour créer l'espace de scroll */}
      <div className="footer-spacer" />
      
      {/* Footer fixe */}
      <footer className="footer-container">
        <div className="background-text">Artichaud</div>
        
        <div className="content-wrapper">
          {/* Colonne 1: Let's talk & Button */}
          <div className="column">
            <h2 className="title">Let's talk</h2>
            <Link href="/contact">
              <motion.span 
                className="contact-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="arrow">→</span> Get in touch
              </motion.span>
            </Link>
          </div>
          
          {/* Colonne 2: Contact Me */}
          <div className="column">
            <h3 className="subtitle">Contact Me</h3>
            <a href="mailto:artichaud.studio@gmail.com" className="link">
              artichaud.studio@gmail.com
            </a>
            <a href="tel:0697538017" className="link">06 97 53 80 17</a>
          </div>

          {/* Colonne 3: Follow Me */}
          <div className="column">
            <h3 className="subtitle">Follow Me</h3>
            <Link href="https://instagram.com" target="_blank" className="link">
              Instagram
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="link">
              Linkedin
            </Link>
            <Link href="https://tiktok.com" target="_blank" className="link">
              Tiktok
            </Link>
          </div>

          {/* Colonne 4: Overview */}
          <div className="column">
            <h3 className="subtitle">Overview</h3>
            {navItems.map((item, index) => (
              <Link 
                key={index} 
                href={`/${item.toLowerCase().replace("'", "").replace(/\s+/g, "-")}`}
                className="link"
              >
                {item}
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