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
import { TopActionBar } from './components/TopActionBar';
import { AdminSecretModal } from './components/AdminSecretModal';
import { cleanImageUrl, FALLBACK_APP_LOGO } from './utils/imageUtils';

// Admin imports
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminAppsManager } from './components/admin/AdminAppsManager';
import { AdminTelegramManager } from './components/admin/AdminTelegramManager';
import { AdminSettings } from './components/admin/AdminSettings';

import { Sparkles, Send, Shield, Gift, Zap, TrendingUp, Award, Clock, ArrowRight, CheckCircle2, Search, Share2, Copy, Check, Users, Wallet, Smartphone } from 'lucide-react';
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
  const [selectedTier, setSelectedTier] = useState<'normal' | 'vip'>('normal');
  const [copiedLink, setCopiedLink] = useState(false);

  const referLink = `https://wssiwwtyre2026.live/register?ref=${currentUser?.id || 'rohit123'}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Always render main user app (or Admin Panel if in Admin mode)
  if (viewMode === 'admin') {
    return (
      <AdminLayout currentTab={adminTab} onSelectTab={setAdminTab}>
        {adminTab === 'dashboard' && <AdminDashboard />}
        {adminTab === 'apps' && <AdminAppsManager />}
        {adminTab === 'categories' && <AdminAppsManager />}
        {adminTab === 'telegram' && <AdminTelegramManager />}
        {adminTab === 'settings' && <AdminSettings />}
      </AdminLayout>
    );
  }

  // Filter apps based on search query & tier / category selection
  const publishedApps = apps.filter(a => a.status === 'published');
  
  // Tier filtering for Normal vs VIP
  const displayedApps = publishedApps.filter(a => {
    if (selectedTier === 'vip') {
      return a.rewardAmount >= 300 || a.isFeatured;
    }
    return true; // Normal shows all
  });

  const searchFilteredApps = displayedApps.filter(a => {
    const matchesQuery = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         a.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || a.category === selectedCategory;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 pb-24 md:pb-12 font-sans">
      {/* Top Header */}
      <Header />

      {/* Top Green Action Bar with Recharge, Withdraw, Service, Channel & Normal/VIP tabs */}
      <TopActionBar selectedTier={selectedTier} onSelectTier={setSelectedTier} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* VIEW 1: Profile Tab (if active) */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto space-y-6 my-4">
            <div className="p-6 rounded-3xl bg-white shadow-card border border-slate-100 text-center relative overflow-hidden">
              <div className="h-2 w-full bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 absolute top-0 left-0 right-0" />
              
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                alt={currentUser?.name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-sky-500/30 mx-auto mb-2"
              />
              <h2 className="text-xl font-extrabold text-slate-900">{currentUser?.name}</h2>
              <p className="text-xs text-slate-500 font-semibold">{currentUser?.email}</p>
              
              <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-cyan-50 border border-sky-200/80 inline-flex items-center gap-4 text-center">
                <div>
                  <span className="block text-xs text-slate-600 font-semibold">Total Rewards Earned</span>
                  <span className="text-2xl font-extrabold text-sky-600">₹{currentUser?.totalEarned || 0}</span>
                </div>
                <div className="w-px h-8 bg-sky-200" />
                <div>
                  <span className="block text-xs text-slate-600 font-semibold">Completed Claims</span>
                  <span className="text-2xl font-extrabold text-slate-800">{currentUser?.claimsCount || 0}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Search Bar & Product Cards Grid (Synced directly with Firebase DB) */}
        <div className="mb-4">
          <SearchBar />
        </div>

        {/* If no published apps exist at all */}
        {publishedApps.length === 0 ? (
          <div className="my-10 p-8 sm:p-12 text-center bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-card max-w-md mx-auto">
            <div className="w-14 h-14 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Gift className="w-7 h-7" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Koi product/app available nahi hai</h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Admin ke dwaara naye products publish kiye jaane par yahan live dikhenge.
            </p>
            {currentUser?.role === 'admin' && (
              <button
                onClick={() => setViewMode('admin')}
                className="mt-4 px-4 py-2 rounded-xl btn-3d-sky text-white font-bold text-xs shadow-md cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Admin Panel M Naye Apps Add Karein</span>
              </button>
            )}
          </div>
        ) : searchFilteredApps.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
            <p className="text-sm font-semibold text-slate-600">
              No applications matched "{searchQuery}".
            </p>
          </div>
        ) : (
          /* BKT Product Grid Layout: 2 Columns on Mobile / 2-4 Columns on Desktop */
          <div id="products-section" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 my-2 scroll-mt-20">
            {searchFilteredApps.map(app => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
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
