import React, { useState, useEffect } from 'react';
import { Match, Prediction, MatchStatus } from '../types';
import { MatchService } from '../services/matchService';
import { Plus, Trash2, ShieldAlert, ArrowLeft, Save, X } from 'lucide-react';
import { motion } from 'motion/react';

export default function AdminPage({ onBack }: { onBack: () => void }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [matches, setMatches] = useState<Match[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    homeTeam: '',
    awayTeam: '',
    competition: '',
    dateTime: '',
    basicPrediction: '1' as Prediction,
    exactScore: '',
    status: 'upcoming' as MatchStatus,
    isVip: false,
    vipSign: '',
    vipElements: '',
    vipInterpretation: ''
  });

  const ADMIN_PASSWORD = "VOTRE_MOT_DE_PASSE"; // A configurer ici

  useEffect(() => {
    if (isAuthenticated) {
      setMatches(MatchService.getMatches());
    }
  }, [isAuthenticated]);

  const [loginError, setLoginError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleAddMatch = (e: React.FormEvent) => {
    e.preventDefault();
    const newMatch: Match = {
      id: crypto.randomUUID(),
      homeTeam: formData.homeTeam,
      awayTeam: formData.awayTeam,
      homeLogo: '', // Sera géré par la résolution automatique par nom
      awayLogo: '',
      competition: formData.competition,
      dateTime: formData.dateTime,
      basicPrediction: formData.basicPrediction,
      exactScore: formData.isVip ? formData.exactScore : '',
      status: formData.status,
      isVip: formData.isVip,
      vipAnalysis: formData.isVip ? {
        signName: formData.vipSign,
        elements: formData.vipElements.split(',').map(e => e.trim()),
        interpretation: formData.vipInterpretation
      } : undefined
    };

    MatchService.addMatch(newMatch);
    setMatches(MatchService.getMatches());
    setIsAdding(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    MatchService.deleteMatch(id);
    setMatches(MatchService.getMatches());
  };

  const resetForm = () => {
    setFormData({
      homeTeam: '',
      awayTeam: '',
      competition: '',
      dateTime: '',
      basicPrediction: '1',
      exactScore: '',
      status: 'upcoming',
      isVip: false,
      vipSign: '',
      vipElements: '',
      vipInterpretation: ''
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 w-full max-w-md"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center">
              <ShieldAlert className="text-zinc-400 w-6 h-6" />
            </div>
            <h2 className="text-2xl font-display font-bold">Admin Login</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Mot de Passe</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-brand outline-none transition-colors"
                placeholder="••••••••"
              />
              {loginError && (
                <p className="text-red-500 text-[10px] uppercase font-bold mt-2">Mot de passe incorrect</p>
              )}
            </div>
            <button 
              type="submit"
              className="w-full bg-brand text-zinc-950 font-bold py-3 rounded-xl hover:bg-emerald-400 transition-colors"
            >
              Accéder au Panneau
            </button>
            <button 
              type="button"
              onClick={onBack}
              className="w-full text-zinc-500 text-sm font-bold py-2"
            >
              Retour à l'accueil
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-12">
        <button onClick={onBack} className="text-zinc-500 hover:text-zinc-300 flex items-center gap-2 text-sm">
          <ArrowLeft className="w-4 h-4" /> Retour
        </button>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-brand text-zinc-950 px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-400 transition-colors"
        >
          <Plus className="w-4 h-4" /> Nouveau Match
        </button>
      </div>

      <h2 className="text-4xl font-display font-black mb-8">GESTION <span className="text-zinc-500 italic">PRONOSTICS.</span></h2>

      {/* Grid List */}
      <div className="space-y-4">
        {matches.map(match => (
          <div key={match.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-10 h-10 bg-zinc-950 rounded-lg flex items-center justify-center font-bold text-brand">
                {match.basicPrediction}
              </div>
              <div>
                <p className="font-bold">{match.homeTeam} vs {match.awayTeam}</p>
                {match.isVip && match.exactScore && <p className="text-[10px] text-brand font-mono font-bold">Score VIP: {match.exactScore}</p>}
                <div className="flex items-center gap-2">
                  <p className="text-xs text-zinc-500 uppercase">{match.competition} • {new Date(match.dateTime).toLocaleDateString()}</p>
                  <span className={`text-[8px] uppercase px-1.5 py-0.5 rounded border ${
                    match.status === 'live' ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/10' :
                    match.status === 'finished' ? 'border-red-500/30 text-red-500 bg-red-500/10' :
                    'border-zinc-700 text-zinc-500'
                  }`}>
                    {match.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {match.isVip && <span className="bg-vip/20 text-vip text-[10px] font-bold px-2 py-1 rounded uppercase">VIP</span>}
              <button 
                onClick={() => handleDelete(match.id)}
                className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {matches.length === 0 && <p className="text-center py-12 text-zinc-600 italic">Aucun match enregistré localement.</p>}
      </div>

      {/* Adding Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md"
              onClick={() => setIsAdding(false)}
            />
            <motion.div 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
              className="relative bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-3xl p-8 shadow-2xl h-fit"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Nouveau Pronostic</h3>
                <button onClick={() => setIsAdding(false)} className="text-zinc-500"><X /></button>
              </div>

              <form onSubmit={handleAddMatch} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase">Équipe Domicile</label>
                  <input required value={formData.homeTeam} onChange={e => setFormData({...formData, homeTeam: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl mt-1 outline-none focus:border-brand" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase">Équipe Extérieur</label>
                  <input required value={formData.awayTeam} onChange={e => setFormData({...formData, awayTeam: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl mt-1 outline-none focus:border-brand" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase">Compétition</label>
                  <input required value={formData.competition} onChange={e => setFormData({...formData, competition: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl mt-1 outline-none focus:border-brand" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase">Date & Heure</label>
                  <input required type="datetime-local" value={formData.dateTime} onChange={e => setFormData({...formData, dateTime: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl mt-1 outline-none focus:border-brand" />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase">Pronostic</label>
                  <select value={formData.basicPrediction} onChange={e => setFormData({...formData, basicPrediction: e.target.value as Prediction})} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl mt-1 outline-none focus:border-brand">
                    <option value="1">Victoire 1</option>
                    <option value="N">Match Nul</option>
                    <option value="2">Victoire 2</option>
                    <option value="1X">1X (Double chance)</option>
                    <option value="2X">2X (Double chance)</option>
                    <option value="BTTS">BTTS (Les deux équipes marquent)</option>
                    <option value="Over 1.5">Plus de 1.5 buts</option>
                    <option value="Over 2.5">Plus de 2.5 buts</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase">Statut</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as MatchStatus})} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl mt-1 outline-none focus:border-brand">
                    <option value="upcoming">À venir</option>
                    <option value="live">En direct</option>
                    <option value="finished">Terminé</option>
                  </select>
                </div>
                <div className="flex items-end h-full py-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={formData.isVip} onChange={e => setFormData({...formData, isVip: e.target.checked})} className="w-5 h-5 rounded accent-vip" />
                    <span className="font-bold text-vip uppercase text-sm">Contenu VIP</span>
                  </label>
                </div>

                {formData.isVip && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-800">
                    <div className="col-span-full"><h4 className="text-vip font-display font-bold">Analyse Géomantique</h4></div>
                    <div>
                      <label className="text-xs font-bold text-zinc-500 uppercase">Nom du Signe</label>
                      <input value={formData.vipSign} onChange={e => setFormData({...formData, vipSign: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl mt-1 outline-none focus:border-brand" placeholder="Latourou" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-zinc-500 uppercase">Éléments (séparé par virgule)</label>
                      <input value={formData.vipElements} onChange={e => setFormData({...formData, vipElements: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl mt-1 outline-none focus:border-brand" placeholder="Feu, Air" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-zinc-500 uppercase">Score Exact VIP</label>
                      <input value={formData.exactScore} onChange={e => setFormData({...formData, exactScore: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl mt-1 outline-none focus:border-brand" placeholder="ex: 2-1" />
                    </div>
                    <div className="col-span-full">
                      <label className="text-xs font-bold text-zinc-500 uppercase">Interprétation</label>
                      <textarea rows={3} value={formData.vipInterpretation} onChange={e => setFormData({...formData, vipInterpretation: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 p-3 rounded-xl mt-1 outline-none focus:border-brand" placeholder="..." />
                    </div>
                  </motion.div>
                )}

                <div className="col-span-full pt-4">
                  <button type="submit" className="w-full bg-brand text-zinc-950 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-400 transition-all">
                    <Save className="w-5 h-5" /> Enregistrer le Pronostic
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AnimatePresence({ children }: { children: React.ReactNode }) {
    // Helper wrapper for layout
    return <motion.div>{children}</motion.div>;
}
