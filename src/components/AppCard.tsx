import React from 'react';
import { AppItem } from '../types';
import { useApp } from '../context/AppContext';
import { cleanImageUrl, FALLBACK_APP_LOGO } from '../utils/imageUtils';
import { Gift, Star, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface AppCardProps {
  app: AppItem;
}

export const AppCard: React.FC<AppCardProps> = ({ app }) => {
  const { setSelectedAppForClaim } = useApp();

  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="group relative bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-card hover:shadow-soft border border-slate-100 hover:border-orange-200/80 transition-all flex flex-col justify-between overflow-hidden"
    >
      {/* Top Highlight Badge if featured */}
      {app.isFeatured && (
        <div className="absolute top-0 right-0 bg-gradient-to-l from-[#FF8C00] to-[#FF6B00] text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-md shadow-xs flex items-center gap-0.5">
          <Star className="w-2.5 h-2.5 fill-white" />
          <span>Top Verified</span>
        </div>
      )}

      <div>
        {/* App Logo & Title Header */}
        <div className="flex items-start gap-2 mb-1.5">
          <img
            src={cleanImageUrl(app.logo)}
            alt={app.name}
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback to default placeholder if ImgBB link or external link fails
              (e.target as HTMLImageElement).src = FALLBACK_APP_LOGO;
            }}
            className="w-10 h-10 rounded-lg object-cover ring-1 ring-slate-100 shadow-xs group-hover:scale-105 transition-transform bg-slate-100 shrink-0"
          />
          <div className="flex-1 min-w-0 pr-8">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#FF8C00] transition-colors truncate">
              {app.name}
            </h3>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-slate-500">
                <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                {app.rating || 4.8}
              </span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-0.5 text-[9px] font-medium text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded-md border border-emerald-200">
                <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" />
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Highlighted Reward Badge */}
        <div className="mb-1.5">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-emerald-500/10 border border-orange-200 text-[#FF8C00] font-extrabold text-xs shadow-xs">
            <Gift className="w-3 h-3 text-[#FF8C00]" />
            <span>₹{app.rewardAmount} Reward</span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-[10px] sm:text-[11px] text-slate-600 leading-snug line-clamp-2 mb-1.5 font-normal">
          {app.shortDescription}
        </p>
      </div>

      {/* Card Footer: Estimated Time + Claim Button */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>{app.estimatedTime || '3 mins'}</span>
        </div>

        <button
          onClick={() => setSelectedAppForClaim(app)}
          className="py-1 px-2.5 rounded-md btn-saffron-gradient font-bold text-[10px] sm:text-[11px] flex items-center gap-1 shadow-xs active-scale cursor-pointer"
        >
          <span>Claim Reward</span>
          <ArrowRight className="w-2.5 h-2.5" />
        </button>
      </div>
    </motion.div>
  );
};
