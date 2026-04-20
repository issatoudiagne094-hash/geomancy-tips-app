import { Check, MessageSquare, Phone, Wallet, CreditCard } from 'lucide-react';
import { motion } from 'motion/react';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
}

const PLANS: SubscriptionPlan[] = [
  {
    id: 'weekly',
    name: 'Abonnement Hebdomadaire',
    price: '5 000',
    period: '7 Jours',
    features: [
      'Accès à tous les pronostics VIP',
      'Analyses Latourou & Turabu détaillées',
      'Support Prioritaire WhatsApp',
      'Alertes Matchs en Direct'
    ]
  },
  {
    id: 'monthly',
    name: 'Abonnement Mensuel',
    price: '15 000',
    period: '30 Jours',
    features: [
      'Tout le forfait Hebdomadaire',
      'Économisez 5 000 FCFA',
      'Analyses Combinées Spéciales',
      'Guide de Gestion de Mise'
    ]
  }
];

export default function SubscriptionPage({ onBack }: { onBack: () => void }) {
  const WHATSAPP_NUMBER = "221776113451"; 

  const handlePayment = (plan: string, method: string) => {
    const message = encodeURIComponent(
      `Bonjour, je souhaite souscrire à l'abonnement ${plan} via ${method}. Voici la preuve de paiement.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <button 
        onClick={onBack}
        className="mb-8 text-zinc-500 hover:text-zinc-300 flex items-center gap-2 text-sm transition-colors"
      >
        ← Retour aux pronostics
      </button>

      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-6xl font-display font-black leading-tight">
          ACCÈS <span className="text-vip italic">VIP.</span>
        </h2>
        <p className="text-zinc-500 max-w-xl mx-auto text-sm leading-relaxed">
          Rejoignez le cercle restreint et profitez de la sagesse de la géomancie pour vos paris sportifs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {PLANS.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`relative p-8 rounded-3xl border-2 transition-all ${
              plan.id === 'monthly' ? 'border-vip bg-vip/5' : 'border-zinc-800 bg-zinc-900/30'
            }`}
          >
            {plan.id === 'monthly' && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-vip text-zinc-950 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                Populaire
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-display font-black">{plan.price}</span>
                <span className="text-zinc-500 text-sm font-bold">FCFA / {plan.period}</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                  <Check className="w-5 h-5 text-brand shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="space-y-3">
              <button
                onClick={() => handlePayment(plan.name, 'Wave')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-colors group"
              >
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5" />
                </div>
                Payer avec Wave
              </button>
              
              <button
                onClick={() => handlePayment(plan.name, 'Orange Money')}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-colors group"
              >
                <div className="w-8 h-8 bg-black/20 rounded-lg flex items-center justify-center">
                   <CreditCard className="w-5 h-5" />
                </div>
                Payer avec Orange Money
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-zinc-900/50 border border-zinc-800 border-dashed p-6 rounded-2xl text-center"
      >
        <p className="text-zinc-400 text-sm flex flex-col sm:flex-row items-center justify-center gap-2">
          <MessageSquare className="w-5 h-5 text-vip" />
          <span>Une fois le paiement effectué, envoyez votre capture d'écran sur WhatsApp pour recevoir votre accès.</span>
        </p>
      </motion.div>
    </div>
  );
}
