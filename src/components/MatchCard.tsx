import { Match } from '../types';
import { Lock, Sparkles, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

export interface MatchCardProps {
  key?: string | number;
  match: Match;
  isVipUser: boolean;
}

export default function MatchCard({ match, isVipUser }: MatchCardProps) {
  const date = new Date(match.dateTime).toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-brand/30 transition-colors group"
    >
      {/* Header */}
      <div className="px-4 py-3 bg-zinc-900/80 border-bottom border-zinc-800 flex justify-between items-center">
        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{match.competition}</span>
        <span className="text-xs font-mono text-brand">{date}</span>
      </div>

      {/* Teams */}
      <div className="p-6 flex items-center justify-between gap-4">
        <div className="flex flex-col items-center gap-2 flex-1">
          <img src={match.homeLogo} alt={match.homeTeam} className="w-12 h-12 rounded-full border-2 border-zinc-800 p-1" referrerPolicy="no-referrer" />
          <span className="text-sm font-semibold text-center leading-tight">{match.homeTeam}</span>
        </div>
        
        <div className="text-xl font-bold text-zinc-700 italic px-4">VS</div>

        <div className="flex flex-col items-center gap-2 flex-1">
          <img src={match.awayLogo} alt={match.awayTeam} className="w-12 h-12 rounded-full border-2 border-zinc-800 p-1" referrerPolicy="no-referrer" />
          <span className="text-sm font-semibold text-center leading-tight">{match.awayTeam}</span>
        </div>
      </div>

      {/* Prediction Area */}
      <div className="px-6 pb-6 space-y-4">
        <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-xl border border-zinc-800/50">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-brand" />
            <span className="text-sm font-medium text-zinc-400">Pronostic de base</span>
          </div>
          <span className="text-lg font-mono font-bold text-brand bg-brand/10 px-3 py-1 rounded-lg">
            {match.basicPrediction === '1' ? '1' : match.basicPrediction === 'N' ? 'N' : '2'}
          </span>
        </div>

        {/* VIP Section */}
        <div className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-300 ${match.isVip ? 'border-vip/20 bg-vip/5' : 'border-zinc-800 bg-zinc-900/30'}`}>
          {!match.isVip ? (
            <div className="flex items-center justify-between text-zinc-500">
              <span className="text-xs italic">Pas d'analyse VIP disponible</span>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 font-display text-vip">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-bold tracking-tight">Analyse Géomantique VIP</span>
                </div>
                {!isVipUser && (
                  <div className="bg-vip text-zinc-950 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Débloquer</div>
                )}
              </div>

              {isVipUser ? (
                <div className="space-y-2">
                  <div className="flex gap-2 mb-2">
                    {match.vipAnalysis?.elements.map(el => (
                      <span key={el} className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 font-mono text-zinc-300 uppercase">
                        {el}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-serif italic">
                    <span className="font-bold text-vip not-italic mr-1">{match.vipAnalysis?.signName}:</span>
                    {match.vipAnalysis?.interpretation}
                  </p>
                </div>
              ) : (
                <div className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center z-10 rounded">
                    <div className="flex flex-col items-center gap-1 group-hover:scale-110 transition-transform">
                      <Lock className="w-5 h-5 text-vip" />
                      <span className="text-[10px] uppercase font-bold tracking-widest text-vip/80">Premium</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-zinc-600 blur-[2px] select-none">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
