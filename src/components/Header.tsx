import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Shield, User as UserIcon, LogOut, Send, CheckCircle2, ChevronDown, Sparkles, LayoutDashboard, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import logoImg from '../assets/images/rohit_tricks_logo_1785071369631.jpg';

export const Header: React.FC = () => {
  const { 
    currentUser, 
    notifications, 
    viewMode, 
    setViewMode, 
    logout, 
    toggleTelegramModal, 
    markNotificationAsRead, 
    clearAllNotifications,
    setActiveTab
  } = useApp();

  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: RL Logo & Brand Name */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          {/* Logo Badge */}
          <div className="relative group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 p-0.5 shadow-md group-hover:scale-105 transition-transform overflow-hidden">
              <img 
                src={logoImg} 
                alt="Rohit Tricks Logo" 
                className="w-full h-full object-cover rounded-[10px]"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Ambient Glow */}
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 opacity-40 blur-sm group-hover:opacity-70 transition-opacity -z-10" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight flex items-center gap-1.5">
                Rohit Tricks
                <Sparkles className="w-5 h-5 text-sky-500 fill-sky-500/20" />
              </h1>
            </div>
            <p className="text-sm sm:text-base text-slate-600 font-bold line-clamp-1">
              Find Best Buy & Sell Applications
            </p>
          </div>
        </div>

        {/* Center / Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Join Telegram Button */}
          <button
            onClick={() => toggleTelegramModal(true)}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full btn-3d-blue text-sm sm:text-base font-extrabold transition-all cursor-pointer"
            title="Join Telegram Channel"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            <span>Join Telegram</span>
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
          </button>

          {/* Notification Icon */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifDropdown(!showNotifDropdown);
                setShowProfileDropdown(false);
              }}
              className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifs.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#FF8C00] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {unreadNotifs.length}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            <AnimatePresence>
              {showNotifDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden"
                >
                  <div className="p-3 bg-slate-900 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-[#FF8C00]" />
                      <h3 className="text-sm font-semibold">Notifications</h3>
                    </div>
                    {notifications.length > 0 && (
                      <button
                        onClick={clearAllNotifications}
                        className="text-[11px] text-slate-300 hover:text-white underline"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-slate-400 text-xs">
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationAsRead(n.id)}
                          className={`p-3 text-xs transition-colors cursor-pointer hover:bg-slate-50 ${
                            !n.read ? 'bg-orange-50/50 font-medium' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-semibold text-slate-800">{n.title}</span>
                            <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                          </div>
                          <p className="text-slate-600 line-clamp-2">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileDropdown(!showProfileDropdown);
                setShowNotifDropdown(false);
              }}
              className="flex items-center gap-2 p-1 sm:p-1.5 rounded-full sm:rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
            >
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                alt={currentUser?.name || 'User Avatar'}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#FF8C00]/30"
              />
              <span className="hidden sm:inline-block text-xs font-semibold text-slate-800 max-w-[100px] truncate">
                {currentUser?.name || 'User'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline-block" />
            </button>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {showProfileDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden"
                >
                  <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                    <div className="flex items-center gap-3">
                      <img
                        src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-[#FF8C00]"
                      />
                      <div className="overflow-hidden">
                        <h4 className="font-semibold text-sm truncate">{currentUser?.name || 'Guest'}</h4>
                        <p className="text-[11px] text-slate-300 truncate">{currentUser?.email || 'guest@rohittricks.com'}</p>
                        <span className="inline-block mt-1 px-2 py-0.2 text-[9px] font-bold rounded-full bg-[#FF8C00] text-white uppercase tracking-wider">
                          {currentUser?.role || 'User'}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs">
                      <span className="text-slate-300">Total Earned:</span>
                      <span className="font-bold text-sky-400 text-sm">₹{currentUser?.totalEarned || 0}</span>
                    </div>
                  </div>

                  <div className="p-2 space-y-1">
                    {currentUser?.role === 'admin' ? (
                      <button
                        onClick={() => {
                          setShowProfileDropdown(false);
                          setViewMode('admin');
                        }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-xl transition-colors"
                      >
                        <Shield className="w-4 h-4 text-sky-600" />
                        <span>#</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setShowProfileDropdown(false);
                          window.dispatchEvent(new Event('openAdminLoginModal'));
                        }}
                        className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
                      >
                        <Shield className="w-4 h-4 text-sky-600" />
                        <span>#</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setShowProfileDropdown(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-slate-500" />
                      <span>My Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        toggleTelegramModal(true);
                        setShowProfileDropdown(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
                    >
                      <Send className="w-4 h-4 text-[#0A66C2]" />
                      <span>Telegram Community</span>
                    </button>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setShowProfileDropdown(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};
