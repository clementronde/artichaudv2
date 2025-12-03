'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Bloquer le scroll pendant le chargement
    document.body.style.overflow = 'hidden';

    // Logique du compteur (0 à 100)
    const duration = 2000; // 2 secondes de chargement
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    // Une fois fini, on attend un tout petit peu et on lance la sortie
    const timeout = setTimeout(() => {
      setIsVisible(false);
      // Réactiver le scroll après l'animation de sortie (0.8s plus tard)
      setTimeout(() => {
        document.body.style.overflow = '';
        onComplete();
      }, 800); 
    }, duration + 500); // 2s + 0.5s de pause à 100%

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }} // L'effet "Slide vers le haut"
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Courbe "Expo" très fluide
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#111] text-white"
        >
          {/* Conteneur du chiffre */}
          <div className="relative overflow-hidden">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10vw] md:text-[120px] font-bold font-sans tabular-nums tracking-tighter"
            >
              {Math.round(count)}%
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}