import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Smartphone, Wallet, Headset, Send, Crown, Hourglass, ArrowDownCircle } from 'lucide-react';

interface TopActionBarProps {
  selectedTier: 'normal' | 'vip';
  onSelectTier: (tier: 'normal' | 'vip') => void;
}

export const TopActionBar: React.FC<TopActionBarProps> = ({ selectedTier, onSelectTier }) => {
  const { toggleTelegramModal, setActiveTab } = useApp();

  return (
    <div className="w-full bg-[#0284c7] text-white pt-4 pb-4 px-4 sm:px-6 rounded-b-[24px] shadow-lg mb-4">
      {/* 4 Action Pillar Buttons Row */}
      <div className="grid grid-cols-4 gap-2 text-center max-w-md mx-auto mb-4">
        {/* 1. Recharge */}
        <button
          onClick={() => toggleTelegramModal(true)}
          className="flex flex-col items-center justify-center group cursor-pointer"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-105 group-active:scale-95 transition-all shadow-xs">
            <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-white mt-1.5 tracking-tight">
            Recharge
          </span>
        </button>

        {/* 2. Withdraw */}
        <button
          onClick={() => setActiveTab('profile')}
          className="flex flex-col items-center justify-center group cursor-pointer"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-105 group-active:scale-95 transition-all shadow-xs">
            <ArrowDownCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-white mt-1.5 tracking-tight">
            Withdraw
          </span>
        </button>

        {/* 3. Service */}
        <button
          onClick={() => toggleTelegramModal(true)}
          className="flex flex-col items-center justify-center group cursor-pointer"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-105 group-active:scale-95 transition-all shadow-xs">
            <Headset className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-white mt-1.5 tracking-tight">
            Service
          </span>
        </button>

        {/* 4. Channel */}
        <button
          onClick={() => toggleTelegramModal(true)}
          className="flex flex-col items-center justify-center group cursor-pointer"
        >
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-105 group-active:scale-95 transition-all shadow-xs">
            <Send className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-white mt-1.5 tracking-tight">
            Channel
          </span>
        </button>
      </div>

      {/* Normal vs VIP Tab Switcher */}
      <div className="max-w-md mx-auto p-1 bg-black/20 rounded-full flex items-center border border-white/15">
        <button
          onClick={() => onSelectTier('normal')}
          className={`flex-1 py-2.5 px-4 rounded-full font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            selectedTier === 'normal'
              ? 'bg-gradient-to-r from-sky-400 to-sky-600 text-white shadow-md border border-white/30'
              : 'text-white/80 hover:text-white'
          }`}
        >
          <Hourglass className="w-4 h-4 text-sky-100" />
          <span>Normal</span>
        </button>

        <button
          onClick={() => onSelectTier('vip')}
          className={`flex-1 py-2.5 px-4 rounded-full font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            selectedTier === 'vip'
              ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-md border border-amber-200/50'
              : 'text-white/80 hover:text-white'
          }`}
        >
          <Crown className="w-4 h-4 text-amber-200" />
          <span>VIP</span>
        </button>
      </div>
    </div>
  );
};
