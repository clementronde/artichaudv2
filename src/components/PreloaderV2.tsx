'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageLoading } from '@/hooks/usePageLoading';

interface PreloaderV2Props {
  onComplete?: () => void;
}

/**
 * Preloader amélioré avec tracking des ressources réelles
 *
 * Fonctionnalités :
 * - Track le chargement des images, fonts et DOM
 * - S'affiche uniquement au premier chargement (sessionStorage)
 * - Ne se réaffiche pas lors de la navigation entre pages
 * - Progression fluide et réaliste
 */
export default function PreloaderV2({ onComplete }: PreloaderV2Props) {
  const { progress, isLoading } = usePageLoading({
    minDuration: 1500, // Durée minimale de 1.5s (évite un flash trop rapide)
    maxDuration: 4000, // Durée maximale de 4s (sécurité)
  });

  useEffect(() => {
    if (isLoading) {
      // Bloquer le scroll pendant le chargement
      document.body.style.overflow = 'hidden';
    } else {
      // Réactiver le scroll
      document.body.style.overflow = '';

      // Callback quand le preloader est terminé
      if (onComplete) {
        onComplete();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 0.8,
            ease: [0.76, 0, 0.24, 1], // Courbe Expo fluide
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#111] text-white"
        >
          {/* Conteneur du chiffre */}
          <div className="relative overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[10vw] md:text-[120px] font-bold font-sans tabular-nums tracking-tighter"
            >
              {Math.round(progress)}%
            </motion.h1>

            {/* Indicateur de progression (optionnel) */}
            <motion.div
              className="absolute bottom-[-20px] left-0 right-0 h-[2px] bg-white/20 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="h-full bg-white"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.3, ease: "linear" }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.div>
          </div>

          {/* Texte de chargement (optionnel) */}
          <motion.p
            className="absolute bottom-12 text-sm md:text-base text-white/60 font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {progress < 30 && "Chargement des ressources..."}
            {progress >= 30 && progress < 70 && "Chargement des images..."}
            {progress >= 70 && progress < 100 && "Finalisation..."}
            {progress === 100 && "Prêt !"}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
