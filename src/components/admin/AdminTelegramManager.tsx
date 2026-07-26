import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Send, Eye, Save, Sparkles, CheckCircle2 } from 'lucide-react';

export const AdminTelegramManager: React.FC = () => {
  const { telegramConfig, updateTelegramConfig, toggleTelegramModal } = useApp();
  const [formData, setFormData] = useState({ ...telegramConfig });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTelegramConfig(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePreviewPopup = () => {
    updateTelegramConfig(formData);
    toggleTelegramModal(true);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header Bar */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Telegram Popup Configuration
            <Send className="w-5 h-5 text-[#0A66C2]" />
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure the modal popup shown to users immediately after logging in.
          </p>
        </div>

        <button
          onClick={handlePreviewPopup}
          className="py-2.5 px-4 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
        >
          <Eye className="w-4 h-4" />
          <span>Test Popup Preview</span>
        </button>
      </div>

      {/* Form Card */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl text-white">
        {saved && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Telegram popup configuration saved successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          {/* Toggle Enable */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div>
              <h3 className="font-bold text-sm text-white">Enable Auto Telegram Popup</h3>
              <p className="text-slate-400 text-[11px] mt-0.5">Show popup modal immediately when users log in</p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.enabled}
                onChange={e => setFormData({ ...formData, enabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0A66C2]"></div>
            </label>
          </div>

          {/* Title */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Modal Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#FF8C00]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Modal Description Body</label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#FF8C00]"
            />
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Telegram Channel URL</label>
              <input
                type="text"
                required
                placeholder="https://t.me/RohitTricksOfficial"
                value={formData.channelLink}
                onChange={e => setFormData({ ...formData, channelLink: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Customer Service Telegram ID / Link (Service Icon)</label>
              <input
                type="text"
                placeholder="https://t.me/RohitTricksSupport or @RohitTricksSupport"
                value={formData.supportLink || ''}
                onChange={e => setFormData({ ...formData, supportLink: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-sky-500"
              />
              <p className="text-[10px] text-slate-400 mt-1">When users click "Service" on top bar, this support link opens.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Primary Button Text</label>
              <input
                type="text"
                required
                value={formData.buttonText}
                onChange={e => setFormData({ ...formData, buttonText: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Member Count Display Badge</label>
              <input
                type="text"
                value={formData.memberCount}
                onChange={e => setFormData({ ...formData, memberCount: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="py-3 px-6 rounded-2xl btn-saffron-gradient text-white font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Popup Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
