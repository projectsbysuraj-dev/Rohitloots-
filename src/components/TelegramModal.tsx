import React from 'react';
import { useApp } from '../context/AppContext';
import { Send, X, Gift, CheckCircle2, Users, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const TelegramModal: React.FC = () => {
  const { showTelegramModal, toggleTelegramModal, telegramConfig } = useApp();

  if (!showTelegramModal) return null;

  const handleJoinTelegram = () => {
    window.open(telegramConfig.channelLink, '_blank', 'noopener,noreferrer');
    toggleTelegramModal(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-[24px] shadow-2xl border border-slate-100 overflow-hidden"
        >
          {/* Top Banner Accent with Tricolor Gradient */}
          <div className="h-32 bg-gradient-to-r from-[#FF8C00] via-[#0A66C2] to-[#138808] p-4 relative flex items-center justify-between text-white overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl" />
            
            {/* Close X button */}
            <button
              onClick={() => toggleTelegramModal(false)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer z-10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Telegram Icon Badge */}
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg">
                <Send className="w-7 h-7 text-white fill-white/20" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-bold tracking-wider uppercase border border-white/30">
                  Official Channel
                </span>
                <p className="text-xs text-slate-100 mt-1 font-medium flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{telegramConfig.memberCount || '145,000+ Members'}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 text-center">
            <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold mb-3 border border-amber-200">
              <Gift className="w-3.5 h-3.5 text-[#FF8C00]" />
              <span>Exclusive Member Rewards</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
              {telegramConfig.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 px-2">
              {telegramConfig.description}
            </p>

            {/* Feature Bullets */}
            <div className="bg-slate-50 p-3 rounded-2xl mb-6 text-left space-y-2 border border-slate-100 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#138808] shrink-0" />
                <span>Instant notifications for ₹500+ referral loots</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#138808] shrink-0" />
                <span>Daily free cashback codes & promo vouchers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#138808] shrink-0" />
                <span>100% Verified, Safe & Instant Bank Payouts</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-2.5">
              <button
                onClick={handleJoinTelegram}
                className="w-full py-3 px-5 rounded-2xl bg-[#0A66C2] hover:bg-[#08529c] text-white font-bold text-sm shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer group"
              >
                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                <span>{telegramConfig.buttonText || 'Join Telegram'}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </button>

              <button
                onClick={() => toggleTelegramModal(false)}
                className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs transition-colors cursor-pointer"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
