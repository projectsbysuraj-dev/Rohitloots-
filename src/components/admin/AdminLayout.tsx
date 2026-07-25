import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Smartphone, 
  Layers, 
  Send, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentTab, onSelectTab }) => {
  const { setViewMode, logout, currentUser } = useApp();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: 'Live' },
    { id: 'apps', label: 'Manage Applications', icon: Smartphone },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'telegram', label: 'Telegram Popup', icon: Send },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Top Mobile Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF8C00] via-[#0A66C2] to-[#138808] p-0.5">
            <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center font-bold text-xs text-white">
              RL
            </div>
          </div>
          <span className="font-bold text-sm tracking-tight text-white">Admin Panel</span>
        </div>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Desktop Sidebar & Mobile Drawer Overlay */}
      <AnimatePresence>
        {(isMobileOpen || true) && (
          <aside
            className={`
              fixed md:static inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800/80 p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out
              ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}
          >
            <div>
              {/* Sidebar Header */}
              <div className="flex items-center justify-between pb-6 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF8C00] via-[#0A66C2] to-[#138808] p-0.5 shadow-md">
                    <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-extrabold text-sm text-white">
                      RL
                    </div>
                  </div>
                  <div>
                    <h2 className="font-extrabold text-sm text-white tracking-tight flex items-center gap-1">
                      Rohit Loots
                      <ShieldCheck className="w-3.5 h-3.5 text-[#FF8C00]" />
                    </h2>
                    <p className="text-[11px] text-slate-400 font-medium">Admin Control Room</p>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                {menuItems.map(item => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        setIsMobileOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-[#FF8C00] to-[#E07B00] text-white shadow-md shadow-orange-500/20'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${
                          isActive ? 'bg-white/20 text-white' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Sidebar Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <button
                onClick={() => setViewMode('user')}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to User App</span>
              </button>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                    alt="Admin"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-[#FF8C00]"
                  />
                  <div className="truncate">
                    <p className="text-xs font-bold text-white truncate">{currentUser?.name || 'Rohit Admin'}</p>
                    <p className="text-[10px] text-slate-400 truncate">Super Admin</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </aside>
        )}
      </AnimatePresence>

      {/* Main Content Workspace */}
      <main className="flex-1 bg-slate-950 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
