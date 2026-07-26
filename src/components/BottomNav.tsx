import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, User, Send } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, viewMode, setViewMode, toggleTelegramModal } = useApp();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-4 py-2 shadow-2xl">
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        {/* Item 1: Home */}
        <button
          onClick={() => {
            if (viewMode === 'admin') setViewMode('user');
            setActiveTab('home');
          }}
          className={`flex flex-col items-center justify-center py-1 px-5 transition-all cursor-pointer ${
            activeTab === 'home' ? 'text-sky-600 font-black scale-105' : 'text-slate-500 hover:text-slate-800 font-bold'
          }`}
        >
          <Home className={`w-6 h-6 ${activeTab === 'home' ? 'text-sky-600' : ''}`} />
          <span className="text-xs mt-1 tracking-tight font-extrabold">Home</span>
        </button>

        {/* Item 2: Center Floating Action (Telegram) */}
        <div className="relative -top-5">
          <button
            onClick={() => toggleTelegramModal(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-b from-[#38BDF8] to-[#0EA5E9] text-white flex items-center justify-center shadow-xl shadow-sky-500/40 border-4 border-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
            aria-label="Telegram Community"
          >
            <Send className="w-7 h-7 text-white" />
          </button>
        </div>

        {/* Item 3: Profile */}
        <button
          onClick={() => {
            if (viewMode === 'admin') setViewMode('user');
            setActiveTab('profile');
          }}
          className={`flex flex-col items-center justify-center py-1 px-5 transition-all cursor-pointer ${
            activeTab === 'profile' ? 'text-sky-600 font-black scale-105' : 'text-slate-500 hover:text-slate-800 font-bold'
          }`}
        >
          <User className={`w-6 h-6 ${activeTab === 'profile' ? 'text-sky-600' : ''}`} />
          <span className="text-xs mt-1 tracking-tight font-extrabold">Profile</span>
        </button>
      </div>
    </nav>
  );
};

