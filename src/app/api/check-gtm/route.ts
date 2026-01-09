import { NextResponse } from 'next/server';

/**
 * Route API de diagnostic pour vérifier la configuration GTM
 *
 * Accès : https://artichaud-studio.com/api/check-gtm
 *
 * ⚠️ ATTENTION : Supprimez cette route en production après vérification
 * Elle expose vos IDs GTM/GA (bien qu'ils soient publics dans le code source)
 */
export async function GET() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  // Liste toutes les variables NEXT_PUBLIC_*
  const publicVars = Object.keys(process.env)
    .filter(key => key.startsWith('NEXT_PUBLIC_'))
    .reduce((acc, key) => {
      acc[key] = process.env[key] || 'undefined';
      return acc;
    }, {} as Record<string, string>);

  const response = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    gtm: {
      configured: !!gtmId,
      value: gtmId || 'NOT_CONFIGURED',
      isValid: gtmId ? gtmId.startsWith('GTM-') : false,
    },
    googleAnalytics: {
      configured: !!gaId,
      value: gaId || 'NOT_CONFIGURED',
      isValid: gaId ? gaId.startsWith('G-') : false,
    },
    allPublicVariables: publicVars,
    diagnostics: {
      gtmWillLoad: !!gtmId && gtmId.startsWith('GTM-'),
      gaWillLoad: !!gaId && gaId.startsWith('G-'),
    },
    recommendations: [] as string[],
  };

  // Générer des recommandations
  if (!gtmId) {
    response.recommendations.push(
      '❌ NEXT_PUBLIC_GTM_ID is not configured. Add it in Vercel Environment Variables.'
    );
  } else if (!gtmId.startsWith('GTM-')) {
    response.recommendations.push(
      `⚠️ GTM ID "${gtmId}" is invalid. It should start with "GTM-" (e.g., GTM-XXXXXXX)`
    );
  } else {
    response.recommendations.push(
      '✅ GTM is correctly configured!'
    );
  }

  if (!gaId) {
    response.recommendations.push(
      'ℹ️ NEXT_PUBLIC_GA_ID is not configured (optional if using GTM only).'
    );
  } else if (!gaId.startsWith('G-')) {
    response.recommendations.push(
      `⚠️ GA ID "${gaId}" might be invalid. GA4 IDs should start with "G-" (e.g., G-XXXXXXXXXX)`
    );
  } else {
    response.recommendations.push(
      '✅ Google Analytics is correctly configured!'
    );
  }

  // Si aucun n'est configuré
  if (!gtmId && !gaId) {
    response.recommendations.push(
      '🚨 Neither GTM nor GA is configured. Your analytics are not working!'
    );
  }

  return NextResponse.json(response, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
