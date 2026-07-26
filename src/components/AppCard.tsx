import React from 'react';
import { AppItem } from '../types';
import { useApp } from '../context/AppContext';
import { Gift } from 'lucide-react';
import { motion } from 'motion/react';
import { cleanImageUrl, formatDisplayAmount } from '../utils/imageUtils';
import bktBannerImg from '../assets/images/bkt_tires_banner_1785038054085.jpg';

interface AppCardProps {
  app: AppItem;
}

export const AppCard: React.FC<AppCardProps> = ({ app }) => {
  const { setSelectedAppForClaim } = useApp();

  // Determine card image from admin app uploaded logo or bannerUrl or fallback
  const uploadedImage = cleanImageUrl(app.logo) || cleanImageUrl(app.bannerUrl);
  const bannerSrc = uploadedImage || bktBannerImg;

  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl shadow-md border border-slate-200/90 overflow-hidden flex flex-col justify-between"
    >
      {/* Top Banner Graphic */}
      <div className="relative h-32 sm:h-36 w-full bg-slate-900 overflow-hidden flex items-end p-3">
        {/* Banner Background Image */}
        <img
          src={bannerSrc}
          alt={app.name}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (app.bannerUrl && target.src !== app.bannerUrl) {
              target.src = app.bannerUrl;
            } else if (target.src !== bktBannerImg) {
              target.src = bktBannerImg;
            }
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Product Title Overlay */}
        <div className="relative z-10">
          <h3 className="text-base sm:text-lg font-black text-white tracking-tight drop-shadow-md">
            {app.name}
          </h3>
        </div>
      </div>

      {/* Product Details Grid */}
      <div className="p-3.5 space-y-2 text-xs sm:text-sm">
        {/* Row 1: Sign up bonus */}
        <div className="flex items-center justify-between text-slate-500 font-medium">
          <span>Sign up bonus</span>
          <span className="font-extrabold text-sky-600">{formatDisplayAmount(app.signUpBonus, '20')}</span>
        </div>

        {/* Row 2: Minimum deposit */}
        <div className="flex items-center justify-between text-slate-500 font-medium">
          <span>Minimum deposit</span>
          <span className="font-extrabold text-slate-900">{formatDisplayAmount(app.minDeposit, '1980')}</span>
        </div>

        {/* Row 3: Minimum withdrawal */}
        <div className="flex items-center justify-between text-slate-500 font-medium">
          <span>Minimum withdrawal</span>
          <span className="font-extrabold text-slate-900">{formatDisplayAmount(app.minWithdrawal, '120')}</span>
        </div>

        {/* Row 4: Total earning */}
        <div className="flex items-center justify-between text-slate-500 font-medium">
          <span>Total earning</span>
          <span className="font-extrabold text-sky-600">{formatDisplayAmount(app.totalEarning, '23760')}</span>
        </div>

        {/* Row 5: Rewards */}
        <div className="flex items-center justify-between text-slate-500 font-medium border-t border-slate-100 pt-1.5">
          <span>Rewards</span>
          <span className="font-black text-sky-600 text-sm">{formatDisplayAmount(app.rewardAmount, '350')}</span>
        </div>

        {/* Large 3D Green Pill Action Button */}
        <button
          onClick={() => setSelectedAppForClaim(app)}
          className="w-full py-2.5 px-4 rounded-full btn-3d-green text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md active:scale-95 group mt-2"
        >
          <Gift className="w-4 h-4 text-white shrink-0" />
          <span>Claim Now</span>
        </button>
      </div>
    </motion.div>
  );
};

