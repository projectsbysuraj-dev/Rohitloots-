import React from 'react';
import { useApp } from '../context/AppContext';
import { ClipboardList, Headset, Send, Crown, Hourglass, ArrowDownCircle } from 'lucide-react';

interface TopActionBarProps {
  selectedTier: 'normal' | 'vip';
  onSelectTier: (tier: 'normal' | 'vip') => void;
}

export const TopActionBar: React.FC<TopActionBarProps> = ({ selectedTier, onSelectTier }) => {
  const { toggleTelegramModal, setActiveTab, telegramConfig } = useApp();

  const handleOpenSupport = () => {
    let link = telegramConfig.supportLink || telegramConfig.channelLink || 'https://t.me/RohitTricksSupport';
    if (link && !link.startsWith('http://') && !link.startsWith('https://')) {
      if (link.startsWith('@')) {
        link = `https://t.me/${link.substring(1)}`;
      } else {
        link = `https://t.me/${link}`;
      }
    }
    window.open(link, '_blank');
  };

  const handleOpenChannel = () => {
    let link = telegramConfig.channelLink || 'https://t.me/RohitTricksOfficial';
    if (link && !link.startsWith('http://') && !link.startsWith('https://')) {
      if (link.startsWith('@')) {
        link = `https://t.me/${link.substring(1)}`;
      } else {
        link = `https://t.me/${link}`;
      }
    }
    window.open(link, '_blank');
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#0EA5E9] via-[#38BDF8] to-[#7DD3FC] text-white pt-5 pb-5 px-4 sm:px-6 rounded-b-[28px] shadow-xl mb-5">
      {/* 4 Action Pillar Buttons Row */}
      <div className="grid grid-cols-4 gap-3 text-center max-w-lg mx-auto mb-5">
        {/* 1. Task */}
        <button
          onClick={() => toggleTelegramModal(true)}
          className="flex flex-col items-center justify-center group cursor-pointer"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:scale-105 group-active:scale-95 transition-all shadow-md">
            <ClipboardList className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <span className="text-sm sm:text-base font-extrabold text-white mt-2 tracking-tight">
            Task
          </span>
        </button>

        {/* 2. Withdraw */}
        <button
          onClick={() => setActiveTab('profile')}
          className="flex flex-col items-center justify-center group cursor-pointer"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:scale-105 group-active:scale-95 transition-all shadow-md">
            <ArrowDownCircle className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <span className="text-sm sm:text-base font-extrabold text-white mt-2 tracking-tight">
            Withdraw
          </span>
        </button>

        {/* 3. Service (Custom Admin Telegram Link) */}
        <button
          onClick={handleOpenSupport}
          className="flex flex-col items-center justify-center group cursor-pointer"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:scale-105 group-active:scale-95 transition-all shadow-md">
            <Headset className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <span className="text-sm sm:text-base font-extrabold text-white mt-2 tracking-tight">
            Service
          </span>
        </button>

        {/* 4. Channel */}
        <button
          onClick={handleOpenChannel}
          className="flex flex-col items-center justify-center group cursor-pointer"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:scale-105 group-active:scale-95 transition-all shadow-md">
            <Send className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <span className="text-sm sm:text-base font-extrabold text-white mt-2 tracking-tight">
            Channel
          </span>
        </button>
      </div>

      {/* Normal vs VIP Tab Switcher */}
      <div className="max-w-md mx-auto p-1.5 bg-black/20 rounded-full flex items-center border border-white/20 shadow-inner">
        <button
          onClick={() => onSelectTier('normal')}
          className={`flex-1 py-3 px-5 rounded-full font-black text-base sm:text-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
            selectedTier === 'normal'
              ? 'bg-gradient-to-r from-sky-400 to-sky-600 text-white shadow-lg border border-white/40'
              : 'text-white/80 hover:text-white'
          }`}
        >
          <Hourglass className="w-5 h-5 sm:w-6 sm:h-6 text-sky-100" />
          <span>Normal</span>
        </button>

        <button
          onClick={() => onSelectTier('vip')}
          className={`flex-1 py-3 px-5 rounded-full font-black text-base sm:text-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
            selectedTier === 'vip'
              ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-lg border border-amber-200/50'
              : 'text-white/80 hover:text-white'
          }`}
        >
          <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-amber-200" />
          <span>VIP</span>
        </button>
      </div>
    </div>
  );
};
