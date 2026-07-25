import React from 'react';
import { useApp } from '../context/AppContext';
import { cleanImageUrl, FALLBACK_APP_LOGO } from '../utils/imageUtils';
import { X, Gift, ExternalLink, CheckCircle2, Clock, ShieldCheck, FileText, ChevronRight, Award } from 'lucide-react';
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
          <div className="p-4 sm:p-6 bg-gradient-to-r from-orange-50/50 via-sky-50/30 to-emerald-50/50 border-b border-slate-100 relative">
            <button
              onClick={() => setSelectedAppForClaim(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-200/60 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
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
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                  {selectedAppForClaim.categoryLabel || 'Verified Buy & Sell App'}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  {selectedAppForClaim.name}
                </h2>
                
                {/* Big Reward Tag */}
                <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-gradient-to-r from-[#FF8C00] to-[#E07B00] text-white rounded-xl font-extrabold text-base shadow-sm">
                  <Gift className="w-4 h-4" />
                  <span>₹{selectedAppForClaim.rewardAmount} Cashback Reward</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sheet Body Scrollable Content */}
          <div className="p-4 sm:p-6 space-y-6 overflow-y-auto flex-1 text-slate-800">
            {/* Quick Meta Stats Row */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-2xl text-center border border-slate-100">
              <div>
                <span className="block text-[10px] text-slate-400 font-medium">Rating</span>
                <span className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
                  <Award className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  {selectedAppForClaim.rating || 4.8}/5
                </span>
              </div>
              <div className="border-x border-slate-200">
                <span className="block text-[10px] text-slate-400 font-medium">Est. Time</span>
                <span className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-sky-600" />
                  {selectedAppForClaim.estimatedTime || '3-5 Mins'}
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-400 font-medium">Total Claims</span>
                <span className="text-xs font-bold text-emerald-600 mt-0.5 block">
                  {selectedAppForClaim.totalClaims.toLocaleString()}+ Users
                </span>
              </div>
            </div>

            {/* App Description */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#FF8C00]" />
                About {selectedAppForClaim.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedAppForClaim.fullDescription || selectedAppForClaim.shortDescription}
              </p>
            </div>

            {/* Eligibility */}
            <div className="p-3.5 bg-sky-50/60 rounded-2xl border border-sky-100">
              <h4 className="text-xs font-bold text-sky-900 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0A66C2]" />
                Eligibility Criteria
              </h4>
              <p className="text-xs text-sky-800 font-medium">
                {selectedAppForClaim.eligibility || 'Open for all new registrations.'}
              </p>
            </div>

            {/* How it Works Step-by-Step */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">
                How to Claim Reward (4 Simple Steps)
              </h3>
              <div className="space-y-2.5">
                {(selectedAppForClaim.howItWorks || [
                  'Click "Open Website" button below.',
                  'Register using your mobile number.',
                  'Complete initial account setup & KYC.',
                  'Receive your ₹' + selectedAppForClaim.rewardAmount + ' reward directly in your bank!'
                ]).map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="w-6 h-6 rounded-full bg-[#FF8C00] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            {selectedAppForClaim.requirements && selectedAppForClaim.requirements.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  Prerequisites / Requirements
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedAppForClaim.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#138808] shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Footer Open Website Button */}
          <div className="p-4 bg-white border-t border-slate-100">
            <button
              onClick={handleOpenReferralWebsite}
              className="w-full py-3.5 px-6 rounded-2xl btn-saffron-gradient text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg cursor-pointer group"
            >
              <span>Open Website & Claim ₹{selectedAppForClaim.rewardAmount}</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-2 font-medium">
              🔒 100% Secure Referral Link provided by Rohit Loots
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
