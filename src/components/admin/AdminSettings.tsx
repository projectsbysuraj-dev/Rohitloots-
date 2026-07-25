import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, RefreshCw, Palette, ShieldCheck, CheckCircle2, KeyRound, Save } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { resetToDefaults, adminPassword, saveAdminPassword } = useApp();
  const [resetMessage, setResetMessage] = useState(false);
  const [newPassword, setNewPassword] = useState(adminPassword || 'Rohitloots@123');
  const [passwordSaved, setPasswordSaved] = useState(false);

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim()) {
      saveAdminPassword(newPassword.trim());
      setPasswordSaved(true);
      setTimeout(() => setPasswordSaved(false), 3000);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all applications, users, and settings to original factory defaults in Firebase?')) {
      resetToDefaults();
      setNewPassword('Rohitloots@123');
      setResetMessage(true);
      setTimeout(() => setResetMessage(false), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          System Settings & Security
          <Settings className="w-5 h-5 text-[#FF8C00]" />
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Custom admin security password, brand color palette, and system reset controls.
        </p>
      </div>

      {resetMessage && (
        <div className="p-4 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-2xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>System successfully restored to default seed state!</span>
        </div>
      )}

      {/* Admin Password Change Form */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-4">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-[#FF8C00]" />
          Change Admin Secret Password
        </h3>
        <p className="text-xs text-slate-400">
          Set a strong custom password for unlocking the Admin Panel on mobile or desktop.
        </p>

        {passwordSaved && (
          <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Naya Admin Password successfully save ho gaya hai!</span>
          </div>
        )}

        <form onSubmit={handleSavePassword} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center max-w-md">
          <input
            type="text"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="Enter new admin password"
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-[#FF8C00]"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl btn-saffron-gradient text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer whitespace-nowrap"
          >
            <Save className="w-4 h-4" />
            <span>Save Password</span>
          </button>
        </form>
      </div>

      {/* Tricolor Palette Specification */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-4">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#FF8C00]" />
          Brand Color Palette (India's Tricolor Theme)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold">
          <div className="p-3 rounded-2xl bg-[#FF8C00] text-white">
            <span className="block text-[10px] opacity-80">Primary Saffron</span>
            <span>#FF8C00</span>
          </div>
          <div className="p-3 rounded-2xl bg-white text-slate-900 border border-slate-200">
            <span className="block text-[10px] opacity-70">Pure White</span>
            <span>#FFFFFF</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#138808] text-white">
            <span className="block text-[10px] opacity-80">Tricolor Green</span>
            <span>#138808</span>
          </div>
          <div className="p-3 rounded-2xl bg-[#0A66C2] text-white">
            <span className="block text-[10px] opacity-80">Ashoka Blue</span>
            <span>#0A66C2</span>
          </div>
        </div>
      </div>

      {/* Database Reset Section */}
      <div className="p-6 rounded-3xl bg-rose-950/40 border border-rose-900/50 text-white space-y-3">
        <h3 className="font-bold text-sm text-rose-300">Reset System State</h3>
        <p className="text-xs text-slate-400">
          Restore all 9 default buy/sell applications, initial user accounts, and clear custom localStorage edits.
        </p>

        <button
          onClick={handleReset}
          className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Restore Factory Seed Data</span>
        </button>
      </div>
    </div>
  );
};
