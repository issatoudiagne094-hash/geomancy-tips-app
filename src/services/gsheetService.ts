import Papa from 'papaparse';
import { Match } from '../types';

/**
 * Structure attendue dans Google Sheets (Colonnes) :
 * id, homeTeam, awayTeam, homeLogo, awayLogo, competition, dateTime, basicPrediction, isVip, vipSign, vipElements, vipInterpretation
 * 
 * vipElements doit être séparé par des virgules (ex: "Feu, Air")
 */

export async function fetchMatchesFromGSheet(url: string): Promise<Match[]> {
  if (!url) {
    console.warn("URL Google Sheet non fournie. Utilisation des données par défaut.");
    return [];
  }

  try {
    const response = await fetch(url);
    const csvData = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const matches: Match[] = results.data.map((row: any) => ({
            id: row.id,
            homeTeam: row.homeTeam,
            awayTeam: row.awayTeam,
            homeLogo: row.homeLogo,
            awayLogo: row.awayLogo,
            competition: row.competition,
            dateTime: row.dateTime,
            basicPrediction: row.basicPrediction as any,
            exactScore: row.exactScore,
            isVip: row.isVip?.toLowerCase() === 'true',
            status: (row.status as any) || 'upcoming',
            vipAnalysis: row.isVip?.toLowerCase() === 'true' ? {
              signName: row.vipSign,
              elements: row.vipElements ? row.vipElements.split(',').map((e: string) => e.trim()) : [],
              interpretation: row.vipInterpretation
            } : undefined
          }));
          resolve(matches);
        },
        error: (error: any) => reject(error)
      });
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des données Google Sheet :", error);
    return [];
  }
}
