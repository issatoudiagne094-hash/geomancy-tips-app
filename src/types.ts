export type Prediction = '1' | 'N' | '2';

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
  vipAnalysis?: GeomancyAnalysis;
  isVip: boolean;
}
