import { Match } from '../types';

const STORAGE_KEY = 'geomancy_matches';

export const MatchService = {
  getMatches: (): Match[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  hasStorage: (): boolean => {
    return localStorage.getItem(STORAGE_KEY) !== null;
  },

  saveMatches: (matches: Match[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
  },

  addMatch: (match: Match): void => {
    const matches = MatchService.getMatches();
    matches.unshift(match); // Add to the beginning
    MatchService.saveMatches(matches);
  },

  deleteMatch: (id: string): void => {
    const matches = MatchService.getMatches();
    const filtered = matches.filter(m => m.id !== id);
    MatchService.saveMatches(filtered);
  }
};
