import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { LoginScreen } from './components/LoginScreen';
import { TelegramModal } from './components/TelegramModal';
import { SearchBar } from './components/SearchBar';
import { CategorySection } from './components/CategorySection';
import { ClaimBottomSheet } from './components/ClaimBottomSheet';
import { BottomNav } from './components/BottomNav';
import { AppCard } from './components/AppCard';
import { AdminSecretModal } from './components/AdminSecretModal';
import { cleanImageUrl, FALLBACK_APP_LOGO } from './utils/imageUtils';

// Admin imports
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminAppsManager } from './components/admin/AdminAppsManager';
import { AdminUserManagement } from './components/admin/AdminUserManagement';
import { AdminTelegramManager } from './components/admin/AdminTelegramManager';
import { AdminAnalytics } from './components/admin/AdminAnalytics';
import { AdminRewards } from './components/admin/AdminRewards';
import { AdminSettings } from './components/admin/AdminSettings';

import { Sparkles, Send, Shield, Gift, Zap, TrendingUp, Award, Clock, ArrowRight, CheckCircle2, Search } from 'lucide-react';
import { motion } from 'motion/react';

function AppContent() {
  const { 
    isLoggedIn, 
    viewMode, 
    setViewMode,
    activeTab, 
    setActiveTab, 
    apps, 
    searchQuery, 
    selectedCategory,
    toggleTelegramModal,
    currentUser,
    activities
  } = useApp();

  const [adminTab, setAdminTab] = useState('dashboard');

  // If not logged in, render LoginScreen
  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  // If in Admin Mode, render Admin Panel Layout
  if (viewMode === 'admin') {
    return (
      <AdminLayout currentTab={adminTab} onSelectTab={setAdminTab}>
        {adminTab === 'dashboard' && <AdminDashboard />}
        {adminTab === 'apps' && <AdminAppsManager />}
        {adminTab === 'categories' && <AdminAppsManager />}
        {adminTab === 'users' && <AdminUserManagement />}
        {adminTab === 'analytics' && <AdminAnalytics />}
        {adminTab === 'telegram' && <AdminTelegramManager />}
        {adminTab === 'rewards' && <AdminRewards />}
        {adminTab === 'reports' && <AdminRewards />}
        {adminTab === 'settings' && <AdminSettings />}
      </AdminLayout>
    );
  }

  // Filter apps based on search query & category selection
  const publishedApps = apps.filter(a => a.status === 'published');
  
  const latestApps = publishedApps.filter(a => a.category === 'latest');
  const dailyApps = publishedApps.filter(a => a.category === 'daily');
  const bonusApps = publishedApps.filter(a => a.category === 'bonus');

  const searchFilteredApps = publishedApps.filter(a => {
    const matchesQuery = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         a.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || a.category === selectedCategory;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-20 md:pb-12 font-sans selection:bg-[#FF8C00]/20 selection:text-[#FF8C00]">
      {/* Top Header */}
      <Header />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* User View Tabs Switcher */}
        {activeTab === 'profile' ? (
          /* Profile & Earnings View */
          <div className="max-w-2xl mx-auto space-y-6 my-6">
            <div className="p-6 rounded-3xl bg-white shadow-card border border-slate-100 text-center relative overflow-hidden">
              <div className="h-2 w-full bg-gradient-to-r from-[#FF8C00] via-[#0A66C2] to-[#138808] absolute top-0 left-0 right-0" />
              
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                alt={currentUser?.name}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-[#FF8C00]/30 mx-auto mb-3"
              />
              <h2 className="text-xl font-extrabold text-slate-900">{currentUser?.name}</h2>
              <p className="text-xs text-slate-500">{currentUser?.email}</p>
              
              <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/80 inline-flex items-center gap-3 text-center">
                <div>
                  <span className="block text-[11px] text-slate-500 font-medium">Total Rewards Earned</span>
                  <span className="text-2xl font-extrabold text-[#FF8C00]">₹{currentUser?.totalEarned || 0}</span>
                </div>
                <div className="w-px h-8 bg-orange-200" />
                <div>
                  <span className="block text-[11px] text-slate-500 font-medium">Completed Claims</span>
                  <span className="text-2xl font-extrabold text-slate-800">{currentUser?.claimsCount || 0}</span>
                </div>
              </div>


            </div>

            {/* My Claims History */}
            <div className="p-6 rounded-3xl bg-white shadow-card border border-slate-100">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#FF8C00]" />
                My Claim History
              </h3>

              <div className="space-y-3">
                {activities.filter(act => act.userId === currentUser?.id).length > 0 ? (
                  activities.filter(act => act.userId === currentUser?.id).map(act => (
                    <div key={act.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <img 
                          src={cleanImageUrl(act.appLogo)} 
                          alt={act.appName} 
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = FALLBACK_APP_LOGO;
                          }}
                          className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200" 
                        />
                        <div>
                          <h4 className="font-bold text-slate-900">{act.appName}</h4>
                          <span className="text-[10px] text-slate-400">{act.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-emerald-600 block">+₹{act.rewardAmount}</span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                          {act.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-400">
                    <p className="text-xs font-semibold text-slate-500">Abhi tak koi claim history nahi hai.</p>
                    <p className="text-[11px] text-slate-400 mt-1">Apps claim karke cashback earning track karein!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Home Screen Main Content */
          <>
            {/* Hero Banner Section with Tricolor Ambient Accents */}
            <div className="relative rounded-xl overflow-hidden bg-slate-900 text-white p-3 sm:p-4 shadow-lg border border-slate-800 my-2">
              {/* Abstract Tricolor Background Glows */}
              <div className="absolute top-0 left-0 w-36 h-36 bg-[#FF8C00]/20 rounded-full blur-[50px] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-36 h-36 bg-[#138808]/15 rounded-full blur-[50px] pointer-events-none" />

              <div className="relative z-10 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    Best Buy Sell Applications
                  </h1>
                  <span className="text-xs sm:text-sm font-bold text-[#FF8C00]">
                    ★ Instant Cashback & Rewards
                  </span>
                </div>

                {/* Half & Half Row */}
                <div className="flex items-center gap-2 pt-0.5">
                  <button
                    onClick={() => toggleTelegramModal(true)}
                    className="flex-1 py-1.5 px-2.5 rounded-lg bg-[#0A66C2] hover:bg-[#08529c] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-sky-500/20 transition-all cursor-pointer whitespace-nowrap overflow-hidden"
                  >
                    <Send className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Join Telegram</span>
                  </button>

                  <div className="flex-1 py-1.5 px-2.5 rounded-lg bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-center gap-1.5 text-xs font-bold text-[#FF8C00] whitespace-nowrap overflow-hidden">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF8C00] shrink-0" />
                    <span className="truncate">100% Direct Payouts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar & Category Filters */}
            <SearchBar />

            {/* If no published apps exist at all */}
            {publishedApps.length === 0 ? (
              <div className="my-10 p-8 sm:p-12 text-center bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-card max-w-md mx-auto">
                <div className="w-14 h-14 bg-orange-100 text-[#FF8C00] rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Gift className="w-7 h-7" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900">Koi application available nahi hai</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Admin ke dwaara naye applications publish kiye jaane par yahan live dikhenge.
                </p>
                {currentUser?.role === 'admin' && (
                  <button
                    onClick={() => setViewMode('admin')}
                    className="mt-4 px-4 py-2 rounded-xl btn-saffron-gradient text-white font-bold text-xs shadow-md cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Admin Panel M Naye Apps Add Karein</span>
                  </button>
                )}
              </div>
            ) : searchQuery || selectedCategory !== 'all' ? (
              /* If user is searching or filtering, display matched results directly */
              <div className="my-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <Search className="w-5 h-5 text-[#FF8C00]" />
                    <span>Search Results ({searchFilteredApps.length})</span>
                  </h2>
                </div>

                {searchFilteredApps.length === 0 ? (
                  <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
                    <p className="text-sm font-semibold text-slate-600">
                      No applications matched "{searchQuery}".
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Try searching for "Angel One", "Groww", "Navi", or "Fi".
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {searchFilteredApps.map(app => (
                      <AppCard key={app.id} app={app} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Default Categorized Layout showing the 3 core sections */
              <>
                {/* Category 1: Latest Applications */}
                <CategorySection
                  title="Latest Applications"
                  categoryKey="latest"
                  apps={latestApps}
                  subtitle="New high-reward demat & stock trading launches with instant signup cashback."
                  badgeText="High Cashback"
                />

                {/* Category 2: Daily Buy Sell Apps */}
                <CategorySection
                  title="Daily Buy Sell Apps"
                  categoryKey="daily"
                  apps={dailyApps}
                  subtitle="Top brokerages for daily stock & F&O trades with trading bonus vouchers."
                  badgeText="Daily Trading Rewards"
                />

                {/* Category 3: Bonus Claim Only */}
                <CategorySection
                  title="Bonus Claim Only"
                  categoryKey="bonus"
                  apps={bonusApps}
                  subtitle="Instant UPI scan & pay cashback, zero balance accounts, and SIP gift cards."
                  badgeText="Instant Bonus"
                />
              </>
            )}
          </>
        )}
      </main>

      {/* Telegram Popup Modal */}
      <TelegramModal />

      {/* Claim Offer Bottom Sheet */}
      <ClaimBottomSheet />

      {/* Secret Admin Modal (Triggered by /admin or #admin or Ctrl+Shift+A) */}
      <AdminSecretModal />

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
