import React from 'react';

/**
 * Tente de résoudre l'URL du logo d'une équipe.
 * @param teamName Nom de l'équipe (ex: "Real Madrid")
 * @param manualUrl URL optionnelle fournie manuellement (ex: via Google Sheet)
 */
export function getTeamLogoUrl(teamName: string, manualUrl?: string): string {
  // 1. Si une URL manuelle valide est fournie, on l'utilise en priorité
  if (manualUrl && manualUrl.startsWith('http')) {
    return manualUrl;
  }

  // 2. Sinon, on tente de deviner via Clearbit Logo API
  // On transforme "Real Madrid" en "realmadrid.com" (une approximation souvent correcte)
  const cleanName = teamName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Enlève les accents
    .replace(/fc|sc|afc|cf/g, '') // Enlève les préfixes communs
    .replace(/[^a-z0-9]/g, ''); // Garde uniquement les lettres et chiffres

  // Fallback vers UI Avatars si le nom est vide
  if (!cleanName) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(teamName)}&background=10b981&color=fff`;
  }

  // Tentative Clearbit (nécessite souvent l'URL du site officiel)
  // Comme nous n'avons que le nom, c'est une estimation.
  return `https://logo.clearbit.com/${cleanName}.com`;
}

/**
 * Fallback intelligent en cas d'erreur de chargement d'image
 */
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, teamName: string) => {
  const target = e.target as HTMLImageElement;
  // Si Clearbit échoue, on utilise une version stylisée avec les initiales
  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(teamName)}&background=18181b&color=10b981&bold=true&font-size=0.33`;
  target.onerror = null; // Évite les boucles infinies
};
