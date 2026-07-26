import React from 'react';
import { useApp } from '../context/AppContext';
import { Send, X, ExternalLink } from 'lucide-react';
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
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
        onClick={() => toggleTelegramModal(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[420px] bg-white rounded-[28px] shadow-2xl border border-slate-100 overflow-hidden"
        >
          {/* Sky Blue Top Header */}
          <div className="bg-gradient-to-b from-sky-500 via-sky-600 to-sky-700 pt-10 pb-8 px-6 text-center text-white relative rounded-t-[28px] shadow-inner">
            {/* Close Button Top Right */}
            <button
              onClick={() => toggleTelegramModal(false)}
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all border border-white/30 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Title Only */}
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight text-center leading-snug drop-shadow-md">
              {telegramConfig.title || 'Welcome To All Buy Sell Aplication + Upi Reward'}
            </h2>
          </div>

          {/* Modal Body & Action Button */}
          <div className="p-6 bg-white space-y-4">
            <button
              onClick={handleJoinTelegram}
              className="w-full py-4 px-6 rounded-full btn-3d-sky text-white font-black text-base sm:text-lg tracking-wide flex items-center justify-center gap-2.5 cursor-pointer transition-all shadow-xl shadow-sky-600/30 active:scale-95 group"
            >
              <Send className="w-5 h-5 text-white fill-white/20 group-hover:translate-x-0.5 transition-transform shrink-0" />
              <span className="text-center">{telegramConfig.buttonText || 'Join Our Telegram Community'}</span>
              <ExternalLink className="w-4 h-4 text-white/80 shrink-0" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

