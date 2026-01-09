'use client';

import { useEffect } from 'react';

/**
 * Composant de debug pour Google Tag Manager
 * Affiche des logs dans la console pour faciliter le diagnostic
 *
 * N'affiche les logs qu'en développement
 */
export default function GTMDebug() {
  useEffect(() => {
    // Ne s'exécute que côté client
    if (typeof window === 'undefined') return;

    // Debug GTM uniquement en dev ou avec le query param ?debug=gtm
    const isDev = process.env.NODE_ENV === 'development';
    const hasDebugParam = window.location.search.includes('debug=gtm');

    if (!isDev && !hasDebugParam) return;

    console.group('🔍 GTM Debug Info');

    // Vérifier la présence de l'ID GTM
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
    if (gtmId) {
      console.log('✅ GTM ID configured:', gtmId);

      // Vérifier le format
      if (!gtmId.startsWith('GTM-')) {
        console.error('❌ Invalid GTM ID format! Should start with "GTM-"');
      } else {
        console.log('✅ GTM ID format is valid');
      }
    } else {
      console.error('❌ NEXT_PUBLIC_GTM_ID is not configured!');
      console.log('📝 Add NEXT_PUBLIC_GTM_ID in your Vercel Environment Variables');
    }

    // Vérifier si GTM est chargé
    setTimeout(() => {
      if (window.dataLayer) {
        console.log('✅ GTM dataLayer detected:', window.dataLayer);
        console.log('📊 DataLayer events:', window.dataLayer.length);
      } else {
        console.error('❌ GTM dataLayer not found!');
        console.log('Possible reasons:');
        console.log('1. NEXT_PUBLIC_GTM_ID is not set');
        console.log('2. GTM script is blocked by ad blocker');
        console.log('3. Network error loading GTM');
      }

      // Vérifier si le script GTM est présent dans le DOM
      const gtmScript = document.querySelector(`script[src*="googletagmanager.com/gtm.js"]`);
      if (gtmScript) {
        console.log('✅ GTM script tag found in DOM');
      } else {
        console.error('❌ GTM script tag not found in DOM');
      }
    }, 2000);

    console.groupEnd();
  }, []);

  // Ce composant ne rend rien à l'écran
  return null;
}

// Typage pour window.dataLayer
declare global {
  interface Window {
    dataLayer?: any[];
  }
}
