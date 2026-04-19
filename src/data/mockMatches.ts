import { Match } from '../types';

export const MOCK_MATCHES: Match[] = [
  {
    id: '1',
    homeTeam: 'Real Madrid',
    awayTeam: 'FC Barcelone',
    homeLogo: 'https://picsum.photos/seed/realmadrid/100/100',
    awayLogo: 'https://picsum.photos/seed/barca/100/100',
    competition: 'La Liga',
    dateTime: '2026-04-20T20:00:00Z',
    basicPrediction: '1',
    isVip: true,
    vipAnalysis: {
      signName: 'Latourou',
      elements: ['Feu', 'Air'],
      interpretation: 'Les signes indiquent une domination territoriale forte pour l\'équipe à domicile. L\'élément Feu suggère une intensité offensive élevée dès le début du match.'
    }
  },
  {
    id: '2',
    homeTeam: 'Manchester City',
    awayTeam: 'Liverpool',
    homeLogo: 'https://picsum.photos/seed/mancity/100/100',
    awayLogo: 'https://picsum.photos/seed/liverpool/100/100',
    competition: 'Premier League',
    dateTime: '2026-04-21T19:45:00Z',
    basicPrediction: 'N',
    isVip: false
  },
  {
    id: '3',
    homeTeam: 'PSG',
    awayTeam: 'Marseille',
    homeLogo: 'https://picsum.photos/seed/psg/100/100',
    awayLogo: 'https://picsum.photos/seed/om/100/100',
    competition: 'Ligue 1',
    dateTime: '2026-04-22T21:00:00Z',
    basicPrediction: '1',
    isVip: true,
    vipAnalysis: {
      signName: 'Turabu',
      elements: ['Terre', 'Eau'],
      interpretation: 'Une structure défensive solide (Terre) rencontrera une fluidité offensive (Eau). Le résultat final sera probablement serré mais favorable à l\'hôte.'
    }
  },
  {
    id: '4',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Dortmund',
    homeLogo: 'https://picsum.photos/seed/bayern/100/100',
    awayLogo: 'https://picsum.photos/seed/dortmund/100/100',
    competition: 'Bundesliga',
    dateTime: '2026-04-23T18:30:00Z',
    basicPrediction: '1',
    isVip: false
  }
];
