export type Prediction = '1' | 'N' | '2' | '1X' | '2X' | 'BTTS' | 'Over 1.5' | 'Over 2.5';
export type MatchStatus = 'upcoming' | 'live' | 'finished';

export interface GeomancyAnalysis {
  signName: string; // e.g., Latourou, Turabu
  elements: string[];
  interpretation: string;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  competition: string;
  dateTime: string;
  basicPrediction: Prediction;
  exactScore?: string;
  vipAnalysis?: GeomancyAnalysis;
  isVip: boolean;
  status: MatchStatus;
}
