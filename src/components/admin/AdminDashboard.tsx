import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Smartphone, 
  Send, 
  CheckCircle2, 
  Sparkles,
  RefreshCw,
  Plus,
  Layers,
  Settings,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { cleanImageUrl, FALLBACK_APP_LOGO } from '../../utils/imageUtils';

export const AdminDashboard: React.FC = () => {
  const { apps, setActiveTab } = useApp();

  const totalAppsCount = apps.length;
  const latestAppsCount = apps.filter(a => a.category === 'latest').length;
  const dailyAppsCount = apps.filter(a => a.category === 'daily').length;
  const bonusAppsCount = apps.filter(a => a.category === 'bonus').length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800/80 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-0.5 rounded-full bg-[#FF8C00]/20 text-[#FF8C00] border border-[#FF8C00]/30 text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF8C00]" /> Admin Control Center
            </span>
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Firebase Database Live
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your offer applications, referral links, logo images, and Telegram settings.
          </p>
        </div>

        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#FF8C00]" />
          <span>Refresh Page</span>
        </button>
      </div>

      {/* Real Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Total Applications</span>
            <Smartphone className="w-4 h-4 text-[#FF8C00]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {totalAppsCount}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1">
            Active in Database
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Latest Applications</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">
            {latestAppsCount}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">
            High Reward Offers
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Daily Buy & Sell</span>
            <Layers className="w-4 h-4 text-[#0A66C2]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#0A66C2]">
            {dailyAppsCount}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">
            Daily Trade Offers
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Bonus Claim Apps</span>
            <CheckCircle2 className="w-4 h-4 text-[#138808]" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
            {bonusAppsCount}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">
            Instant Bonus Offers
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setActiveTab('apps')}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-[#FF8C00] text-left transition-all cursor-pointer group hover:bg-slate-800/80 shadow-md"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-[#FF8C00] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Plus className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-white text-sm group-hover:text-[#FF8C00] transition-colors">
            Manage & Add Applications
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Naye app add karein, referral link, image logo change karein ya apps delete karein.
          </p>
        </button>

        <button
          onClick={() => setActiveTab('telegram')}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500 text-left transition-all cursor-pointer group hover:bg-slate-800/80 shadow-md"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-[#0A66C2] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Send className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-white text-sm group-hover:text-[#0A66C2] transition-colors">
            Telegram Channel Settings
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Telegram channel link change karein aur user popup configuration manage karein.
          </p>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500 text-left transition-all cursor-pointer group hover:bg-slate-800/80 shadow-md"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#138808] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Settings className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-white text-sm group-hover:text-emerald-400 transition-colors">
            Admin Password & System
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Admin login password update karein aur database configurations customize karein.
          </p>
        </button>
      </div>

      {/* Real Active Applications Summary List */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-extrabold text-white">
              Live Applications Summary
            </h3>
            <p className="text-xs text-slate-400">Total {apps.length} offer apps published in your system</p>
          </div>
          <button
            onClick={() => setActiveTab('apps')}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-[#FF8C00] flex items-center gap-1 border border-slate-700 transition-colors cursor-pointer"
          >
            <span>Manage All ({apps.length})</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {apps.length === 0 ? (
          <div className="p-8 text-center bg-slate-950 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-xs font-semibold">Abhi koi app database me nahi hai.</p>
            <button
              onClick={() => setActiveTab('apps')}
              className="mt-3 px-4 py-2 rounded-xl btn-saffron-gradient text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add First App
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {apps.slice(0, 6).map(app => (
              <div 
                key={app.id} 
                className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center gap-3"
              >
                <img
                  src={cleanImageUrl(app.logo)}
                  alt={app.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_APP_LOGO;
                  }}
                  className="w-10 h-10 rounded-xl object-cover bg-slate-800 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-extrabold text-white truncate">{app.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] font-bold text-emerald-400">₹{app.rewardAmount}</span>
                    <span className="text-[10px] text-slate-400 capitalize bg-slate-800 px-1.5 py-0.2 rounded">
                      {app.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
