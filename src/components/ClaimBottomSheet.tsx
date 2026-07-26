import React from 'react';
import { useApp } from '../context/AppContext';
import { cleanImageUrl, FALLBACK_APP_LOGO, formatDisplayAmount } from '../utils/imageUtils';
import { X, Gift, ExternalLink, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

export const ClaimBottomSheet: React.FC = () => {
  const { selectedAppForClaim, setSelectedAppForClaim, claimApp } = useApp();

  if (!selectedAppForClaim) return null;

  const handleOpenReferralWebsite = () => {
    // Fire celebratory confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Record claim
    claimApp(selectedAppForClaim);

    // Open referral link
    window.open(selectedAppForClaim.referralUrl, '_blank', 'noopener,noreferrer');

    // Close bottom sheet after action
    setTimeout(() => {
      setSelectedAppForClaim(null);
    }, 500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 backdrop-blur-sm p-0 sm:p-4">
        {/* Backdrop click to close */}
        <div
          className="absolute inset-0"
          onClick={() => setSelectedAppForClaim(null)}
        />

        {/* Bottom Sheet Box */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative w-full max-w-xl bg-white rounded-t-[28px] sm:rounded-[28px] shadow-2xl border border-slate-200 overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Top Sheet Drag Indicator Handle */}
          <div className="w-full pt-3 pb-1 flex justify-center bg-slate-50 border-b border-slate-100">
            <div className="w-12 h-1.5 rounded-full bg-slate-300" />
          </div>

          {/* Sheet Header */}
          <div className="p-4 sm:p-6 bg-gradient-to-r from-sky-50/70 via-sky-100/40 to-sky-50/70 border-b border-slate-100 relative">
            <button
              onClick={() => setSelectedAppForClaim(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
              <img
                src={cleanImageUrl(selectedAppForClaim.logo)}
                alt={selectedAppForClaim.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_APP_LOGO;
                }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white shadow-md bg-slate-100"
              />
              <div className="flex-1 pr-6">
                <span className="px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 text-sm font-extrabold border border-sky-200">
                  {selectedAppForClaim.categoryLabel || 'Verified Buy & Sell App'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  {selectedAppForClaim.name}
                </h2>
                
                {/* Big Reward Tag */}
                <div className="inline-flex items-center gap-2.5 mt-2.5 px-4 py-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-xl font-black text-lg sm:text-xl shadow-sm">
                  <Gift className="w-6 h-6" />
                  <span>{formatDisplayAmount(selectedAppForClaim.rewardAmount, '350')} Cashback Reward</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sheet Body Scrollable Content */}
          <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 text-slate-800">
            {/* App Description */}
            <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100">
              <h3 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
                <FileText className="w-6 h-6 text-sky-600" />
                Description
              </h3>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold">
                {selectedAppForClaim.fullDescription || selectedAppForClaim.shortDescription}
              </p>
            </div>
          </div>

          {/* Sticky Footer Open Website Button */}
          <div className="p-4 sm:p-5 bg-white border-t border-slate-100 shadow-2xl">
            <button
              onClick={handleOpenReferralWebsite}
              className="w-full py-4 px-6 rounded-full btn-3d-blue text-white font-black text-lg sm:text-2xl flex items-center justify-center gap-3 cursor-pointer group"
            >
              <Gift className="w-7 h-7 text-white shrink-0" />
              <span>Open Website & Claim {formatDisplayAmount(selectedAppForClaim.rewardAmount, '350')}</span>
              <ExternalLink className="w-7 h-7 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
            <p className="text-sm text-center text-slate-600 mt-2.5 font-bold">
              🔒 100% Verified Referral Link • Direct Cashback Guarantee
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
