import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Share2, Users, User, ListFilter } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, viewMode, setViewMode, toggleTelegramModal } = useApp();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around max-w-lg mx-auto relative">
        {/* Item 1: Home */}
        <button
          onClick={() => {
            if (viewMode === 'admin') setViewMode('user');
            setActiveTab('home');
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 transition-all cursor-pointer ${
            activeTab === 'home' ? 'text-sky-600 font-extrabold' : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'text-sky-600' : ''}`} />
          <span className="text-[11px] mt-0.5 tracking-tight font-bold">Home</span>
        </button>

        {/* Item 2: Share */}
        <button
          onClick={() => {
            if (viewMode === 'admin') setViewMode('user');
            setActiveTab('share');
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 transition-all cursor-pointer ${
            activeTab === 'share' ? 'text-sky-600 font-extrabold' : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <Share2 className={`w-5 h-5 ${activeTab === 'share' ? 'text-sky-600' : ''}`} />
          <span className="text-[11px] mt-0.5 tracking-tight font-bold">Share</span>
        </button>

        {/* Item 3: Center Floating Sky Blue Action Button */}
        <div className="relative -top-5">
          <button
            onClick={() => toggleTelegramModal(true)}
            className="w-12 h-12 rounded-full bg-gradient-to-b from-sky-400 to-sky-600 text-white flex items-center justify-center shadow-lg shadow-sky-600/40 border-2 border-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Action Menu"
          >
            <ListFilter className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Item 4: Team */}
        <button
          onClick={() => {
            if (viewMode === 'admin') setViewMode('user');
            setActiveTab('team');
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 transition-all cursor-pointer ${
            activeTab === 'team' ? 'text-sky-600 font-extrabold' : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <Users className={`w-5 h-5 ${activeTab === 'team' ? 'text-sky-600' : ''}`} />
          <span className="text-[11px] mt-0.5 tracking-tight font-bold">Team</span>
        </button>

        {/* Item 5: Profile */}
        <button
          onClick={() => {
            if (viewMode === 'admin') setViewMode('user');
            setActiveTab('profile');
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 transition-all cursor-pointer ${
            activeTab === 'profile' ? 'text-sky-600 font-extrabold' : 'text-slate-400 hover:text-slate-600 font-medium'
          }`}
        >
          <User className={`w-5 h-5 ${activeTab === 'profile' ? 'text-sky-600' : ''}`} />
          <span className="text-[11px] mt-0.5 tracking-tight font-bold">Profile</span>
        </button>
      </div>
    </nav>
  );
};

