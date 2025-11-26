'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Navbar() {
  const container = useRef(null);
  const pathname = usePathname();

  useGSAP(() => {
    gsap.from(".nav-island", {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out", // Plus doux, moins "rebondissant", plus premium
      stagger: 0.1,
      delay: 0.2
    });
  }, { scope: container });

  const isActive = (path: string) => pathname === path;

  return (
    <nav ref={container} className="fixed top-6 left-0 w-full z-50 pointer-events-none">
      
      {/* Container principal centré */}
      <div className="w-full flex justify-center items-start px-6">
        
        {/* ÎLOT CENTRAL (Navigation) */}
        <div className="nav-island pointer-events-auto">
          <div className="bg-black/90 backdrop-blur-md border border-white/10 h-[54px] px-2 rounded-full flex items-center gap-1 shadow-2xl">
            
            {[
              { name: 'Works', path: '/works' },
              { name: 'Services', path: '/services' },
              { name: 'About', path: '/about' },
              { name: 'Blog', path: '/blog' },
            ].map((link) => (
              <Link 
                key={link.name} 
                href={link.path}
                className={`
                  relative px-6 py-2.5 rounded-full text-[14px] font-medium transition-all duration-300
                  ${isActive(link.path) 
                    ? 'text-white bg-white/10' // État Actif : fond léger gris
                    : 'text-white/60 hover:text-white hover:bg-white/5' // État Inactif : gris, devient blanc au survol
                  }
                `}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* ÎLOT DROITE (CTA) - Positionné en absolu à droite pour ne pas décentrer le menu */}
        <div className="nav-island pointer-events-auto absolute right-6 md:right-10 top-0">
          <Link 
            href="/contact" 
            className="group bg-black text-white h-[54px] px-6 rounded-full flex items-center gap-3 transition-transform duration-300 hover:scale-105 shadow-xl border border-white/10"
          >
             {/* Flèche animée */}
            <span className="text-white/50 group-hover:text-white transition-colors text-lg duration-300 group-hover:translate-x-1 inline-block">→</span>
            <span className="text-[14px] font-medium">Let's talk</span>
          </Link>
        </div>

      </div>
    </nav>
  );
}