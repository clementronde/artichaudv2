'use client';

import { useState, useEffect } from 'react';

interface UsePageLoadingOptions {
  minDuration?: number; // Durée minimale d'affichage (pour éviter un flash trop rapide)
  maxDuration?: number; // Durée maximale (fallback de sécurité)
}

/**
 * Hook pour tracker le chargement réel de la page
 *
 * Suit :
 * - Le chargement des images
 * - Le chargement des fonts
 * - Le chargement du DOM
 * - Les ressources critiques
 *
 * @returns {progress, isLoading} - Progression (0-100) et état de chargement
 */
export function usePageLoading(options: UsePageLoadingOptions = {}) {
  const { minDuration = 1500, maxDuration = 4000 } = options;

  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    let animationFrameId: number;
    let timeoutId: NodeJS.Timeout;

    // Vérifier si la session a déjà vu le preloader
    const hasSeenPreloader = sessionStorage.getItem('hasSeenPreloader');

    if (hasSeenPreloader === 'true') {
      // Si déjà vu, on skip le preloader
      setProgress(100);
      setIsLoading(false);
      return;
    }

    // Tracker les ressources
    const resources = {
      dom: false,
      images: false,
      fonts: false,
    };

    const updateProgress = () => {
      const elapsedTime = Date.now() - startTime;
      const timeProgress = Math.min((elapsedTime / maxDuration) * 100, 100);

      // Calculer le progrès basé sur les ressources
      const domProgress = resources.dom ? 30 : 0;
      const imagesProgress = resources.images ? 40 : 0;
      const fontsProgress = resources.fonts ? 30 : 0;

      const resourceProgress = domProgress + imagesProgress + fontsProgress;

      // Utiliser le max entre le temps et les ressources pour une progression fluide
      const currentProgress = Math.max(timeProgress, resourceProgress);

      setProgress(Math.min(currentProgress, 100));

      // Si toutes les ressources sont chargées et durée min atteinte
      const allResourcesLoaded = resources.dom && resources.images && resources.fonts;
      const minTimeReached = elapsedTime >= minDuration;

      if (allResourcesLoaded && minTimeReached) {
        setProgress(100);

        // Petit délai à 100% avant de fermer
        setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem('hasSeenPreloader', 'true');
        }, 300);
      } else if (elapsedTime < maxDuration) {
        // Continue la mise à jour
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        // Fallback de sécurité : forcer la fin après maxDuration
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem('hasSeenPreloader', 'true');
        }, 300);
      }
    };

    // 1. Tracker le DOM
    if (document.readyState === 'complete') {
      resources.dom = true;
    } else {
      const handleDOMLoad = () => {
        resources.dom = true;
      };
      window.addEventListener('load', handleDOMLoad);
    }

    // 2. Tracker les images
    const trackedImages = new Set<HTMLImageElement>();

    const trackImages = () => {
      const images = Array.from(document.images);

      // Ajouter les nouvelles images non encore trackées
      images.forEach((img) => {
        if (trackedImages.has(img)) return;
        trackedImages.add(img);

        if (!img.complete) {
          img.addEventListener('load', () => checkAllImagesLoaded());
          img.addEventListener('error', () => checkAllImagesLoaded());
        }
      });

      checkAllImagesLoaded();
    };

    const checkAllImagesLoaded = () => {
      if (trackedImages.size === 0) {
        resources.images = true;
        return;
      }

      const allLoaded = Array.from(trackedImages).every((img) => img.complete);
      if (allLoaded) {
        resources.images = true;
      }
    };

    // 3. Tracker les fonts
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        resources.fonts = true;
      });
    } else {
      // Fallback si l'API Fonts n'est pas disponible
      setTimeout(() => {
        resources.fonts = true;
      }, 500);
    }

    // Petit délai pour laisser le DOM se construire avant de tracker les images
    setTimeout(() => {
      trackImages();
      updateProgress();
    }, 100);

    // Re-scan après 500ms pour capter les images rendues tardivement (ex: hero trail)
    setTimeout(() => {
      trackImages();
    }, 500);

    // Fallback de sécurité
    timeoutId = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('hasSeenPreloader', 'true');
      }, 300);
    }, maxDuration + 500);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, [minDuration, maxDuration]);

  return { progress, isLoading };
}
