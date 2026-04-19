import { useState } from 'react';
import { MOCK_MATCHES } from './data/mockMatches';
import MatchCard from './components/MatchCard';
import { LayoutGrid, Crown, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isVipUser, setIsVipUser] = useState(false);

  return (
    <div className="min-h-screen pb-20">
      {/* Navigation / Header */}
      <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center rotate-3 shadow-lg shadow-brand/20">
              <Zap className="text-zinc-950 w-6 h-6 fill-current" />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold leading-none tracking-tight">Geomancy <span className="text-brand italic">Tips</span></h1>
              <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-medium">Turabu & Latourou Analysis</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsVipUser(!isVipUser)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 border ${
                isVipUser 
                  ? 'bg-vip text-zinc-950 border-vip' 
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Crown className={`w-4 h-4 ${isVipUser ? 'fill-current' : ''}`} />
              {isVipUser ? 'Mode VIP Activé' : 'Devenir VIP'}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        {/* Welcome Section */}
        <section className="mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-display font-black leading-tight">
                PROCHAINS <br />
                <span className="text-zinc-700 italic">MATCHS.</span>
              </h2>
              <p className="text-zinc-500 max-w-md text-sm leading-relaxed">
                Découvrez nos prévisions exclusives basées sur la géomancie traditionnelle. Les analyses Latourou et Turabu révèlent les forces invisibles du terrain.
              </p>
            </div>
            
            <div className="flex gap-4">
              <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 flex flex-col items-center justify-center min-w-[80px]">
                <span className="text-2xl font-bold font-mono">24</span>
                <span className="text-[10px] uppercase text-zinc-500 font-bold">Avr</span>
              </div>
              <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 flex flex-col items-center justify-center min-w-[80px]">
                <span className="text-2xl font-bold font-mono">12</span>
                <span className="text-[10px] uppercase text-zinc-500 font-bold">Matchs</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Filters / Stats Bar */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-zinc-900/50 rounded-2xl border border-zinc-900">
          <div className="flex bg-zinc-950 p-1 rounded-xl">
            <button className="px-6 py-2 rounded-lg bg-zinc-800 text-xs font-bold shadow-sm">Tout</button>
            <button className="px-6 py-2 rounded-lg text-xs font-bold text-zinc-500 hover:text-zinc-300">Ligue des Champions</button>
            <button className="px-6 py-2 rounded-lg text-xs font-bold text-zinc-500 hover:text-zinc-300">Top Ligues</button>
          </div>
          
          <div className="flex items-center gap-6 px-4">
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>92% Précision</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium">
              <LayoutGrid className="w-4 h-4" />
              <span>Vue Grille</span>
            </div>
          </div>
        </div>

        {/* Match List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {MOCK_MATCHES.map((match) => (
              <MatchCard key={match.id} match={match} isVipUser={isVipUser} />
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="mt-24 border-t border-zinc-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="opacity-30 flex items-center gap-3">
             <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center">
              <Zap className="text-zinc-400 w-4 h-4" />
            </div>
            <span className="font-display font-bold text-sm tracking-widest uppercase italic">Geomancy Predictions © 2026</span>
          </div>
          
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-zinc-600">
            <a href="#" className="hover:text-zinc-300 transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Contact</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Termes</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
