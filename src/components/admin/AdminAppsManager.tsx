import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppItem, AppCategory } from '../../types';
import { cleanImageUrl, isImgBbViewerUrl, FALLBACK_APP_LOGO } from '../../utils/imageUtils';
import { uploadToFirebaseStorage } from '../../lib/firebase';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  CheckCircle2, 
  X, 
  Sparkles,
  Gift,
  Clock,
  ShieldCheck,
  FileText,
  Upload,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminAppsManager: React.FC = () => {
  const { apps, addApp, updateApp, deleteApp, deleteAllApps, toggleAppStatus, resetToDefaults } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<AppItem | null>(null);
  const [appToDelete, setAppToDelete] = useState<AppItem | null>(null);
  const [showDeleteAllConfirm, setShowDeleteAllConfirm] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  const handleLogoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingLogo(true);
      const firebaseUrl = await uploadToFirebaseStorage(file, 'app_logos');
      setFormData(prev => ({ ...prev, logo: firebaseUrl }));
    } catch (err) {
      alert('Firebase Storage Image Upload Failed. Please check internet or use image URL.');
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleDeleteAllApps = () => {
    if (apps.length === 0) return;
    setShowDeleteAllConfirm(true);
  };

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'latest' as AppCategory,
    logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=150&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80',
    rewardAmount: 350,
    rewardType: 'Instant Cashback',
    shortDescription: '',
    fullDescription: '',
    referralUrl: '',
    status: 'published' as 'published' | 'draft',
    rating: 4.8,
    requirements: 'Aadhaar Card, PAN Card, Bank Account',
    eligibility: 'New Users Only',
    howItWorks: 'Click link, Complete KYC, Perform 1st transaction, Receive cashback',
    estimatedTime: '3 - 5 Minutes',
    isFeatured: false
  });

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAddModal = () => {
    setEditingApp(null);
    setFormData({
      name: '',
      category: 'latest',
      logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=150&auto=format&fit=crop&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80',
      rewardAmount: 350,
      rewardType: 'Instant Cashback',
      shortDescription: 'Free account opening with ₹350 instant cashback.',
      fullDescription: 'Complete quick 2-minute KYC onboarding to claim instant cash directly in your bank account.',
      referralUrl: 'https://example.com/referral?code=ROHIT350',
      status: 'published',
      rating: 4.8,
      requirements: 'Aadhaar Card, PAN Card, Bank Account',
      eligibility: 'New Users Only',
      howItWorks: 'Click referral website button, Register mobile number, Complete KYC verification, Get ₹350 credited!',
      estimatedTime: '3 - 5 Minutes',
      isFeatured: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (app: AppItem) => {
    setEditingApp(app);
    setFormData({
      name: app.name,
      category: app.category,
      logo: app.logo,
      bannerUrl: app.bannerUrl || '',
      rewardAmount: app.rewardAmount,
      rewardType: app.rewardType || 'Instant Cashback',
      shortDescription: app.shortDescription,
      fullDescription: app.fullDescription,
      referralUrl: app.referralUrl,
      status: app.status,
      rating: app.rating || 4.8,
      requirements: (app.requirements || []).join(', '),
      eligibility: app.eligibility || 'New Users Only',
      howItWorks: (app.howItWorks || []).join(', '),
      estimatedTime: app.estimatedTime || '3 - 5 Minutes',
      isFeatured: !!app.isFeatured
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedRequirements = formData.requirements.split(',').map(s => s.trim()).filter(Boolean);
    const formattedHowItWorks = formData.howItWorks.split(',').map(s => s.trim()).filter(Boolean);

    if (editingApp) {
      updateApp(editingApp.id, {
        name: formData.name,
        category: formData.category,
        logo: formData.logo,
        bannerUrl: formData.bannerUrl,
        rewardAmount: Number(formData.rewardAmount),
        rewardType: formData.rewardType,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        referralUrl: formData.referralUrl,
        status: formData.status,
        rating: Number(formData.rating),
        requirements: formattedRequirements,
        eligibility: formData.eligibility,
        howItWorks: formattedHowItWorks,
        estimatedTime: formData.estimatedTime,
        isFeatured: formData.isFeatured
      });
    } else {
      addApp({
        name: formData.name,
        category: formData.category,
        logo: formData.logo,
        bannerUrl: formData.bannerUrl,
        rewardAmount: Number(formData.rewardAmount),
        rewardType: formData.rewardType,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        referralUrl: formData.referralUrl,
        status: formData.status,
        rating: Number(formData.rating),
        requirements: formattedRequirements,
        eligibility: formData.eligibility,
        howItWorks: formattedHowItWorks,
        estimatedTime: formData.estimatedTime,
        isFeatured: formData.isFeatured
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Application Management
            <span className="px-2.5 py-0.5 rounded-full bg-[#FF8C00]/20 text-[#FF8C00] text-xs font-bold border border-[#FF8C00]/30">
              {apps.length} Listed
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Add new buy & sell apps, update referral links, set reward amounts and published status.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleOpenAddModal}
            className="py-2.5 px-4 rounded-2xl btn-saffron-gradient text-white font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Application</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search applications..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF8C00]"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['all', 'latest', 'daily', 'bonus'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#FF8C00] text-white shadow-xs'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat === 'latest' ? 'Latest' : cat === 'daily' ? 'Daily Buy Sell' : 'Bonus Only'}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">App Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Reward</th>
                <th className="p-4">Claims</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-slate-400 text-xs">
                    <div className="flex flex-col items-center justify-center gap-2 max-w-md mx-auto py-2">
                      <div className="p-3 rounded-2xl bg-slate-800 text-[#FF8C00]">
                        <Plus className="w-6 h-6" />
                      </div>
                      <p className="font-bold text-white text-sm">Koi app nahi mila ya sare delete ho gaye hain</p>
                      <p className="text-slate-400 text-xs">
                        Apne custom referral links, reward amounts aur ImgBB logo link ke sath naye apps add karne ke liye button par click karein.
                      </p>
                      <button
                        onClick={handleOpenAddModal}
                        className="mt-2 py-2 px-4 rounded-xl btn-saffron-gradient text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Your Application</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredApps.map(app => (
                  <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img 
                        src={cleanImageUrl(app.logo)} 
                        alt={app.name} 
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_APP_LOGO;
                        }}
                        className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-700 bg-slate-800" 
                      />
                      <div>
                        <div className="font-bold text-white text-sm flex items-center gap-1.5">
                          {app.name}
                          {app.isFeatured && (
                            <span className="text-[9px] bg-orange-500/20 text-[#FF8C00] border border-orange-500/30 px-1.5 py-0.2 rounded font-semibold">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 max-w-xs truncate">{app.shortDescription}</p>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-medium text-[11px] capitalize border border-slate-700">
                        {app.category}
                      </span>
                    </td>

                    <td className="p-4 font-extrabold text-[#FF8C00] text-sm">
                      ₹{app.rewardAmount}
                    </td>

                    <td className="p-4 font-semibold text-emerald-400">
                      {app.totalClaims.toLocaleString()}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => toggleAppStatus(app.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                          app.status === 'published'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {app.status === 'published' ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span className="capitalize">{app.status}</span>
                      </button>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(app)}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-xs border border-slate-700 hover:border-amber-500/40 transition-colors flex items-center gap-1 cursor-pointer"
                          title="Edit Application"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => setAppToDelete(app)}
                          className="px-2.5 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-semibold text-xs border border-rose-500/20 hover:border-rose-500/40 transition-colors flex items-center gap-1 cursor-pointer"
                          title="Delete Application"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit App Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-800 text-white max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <h3 className="text-lg font-extrabold text-white">
                  {editingApp ? 'Edit Application' : 'Add New Application'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">App Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Angel One Pro"
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#FF8C00]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value as AppCategory })}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#FF8C00]"
                    >
                      <option value="latest">Latest Applications</option>
                      <option value="daily">Daily Buy Sell Apps</option>
                      <option value="bonus">Bonus Claim Only</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Reward Amount (₹)</label>
                    <input
                      type="number"
                      required
                      value={formData.rewardAmount}
                      onChange={e => setFormData({ ...formData, rewardAmount: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#FF8C00]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Estimated Time</label>
                    <input
                      type="text"
                      value={formData.estimatedTime}
                      onChange={e => setFormData({ ...formData, estimatedTime: e.target.value })}
                      placeholder="e.g. 3 - 5 Minutes"
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#FF8C00]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Referral / Offer Link URL</label>
                  <input
                    type="url"
                    required
                    value={formData.referralUrl}
                    onChange={e => setFormData({ ...formData, referralUrl: e.target.value })}
                    placeholder="https://example.com/referral?code=ROHIT350"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#FF8C00]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-semibold text-slate-300">
                      App Logo Image (Firebase Storage / URL)
                    </label>
                    <span className="text-[10px] text-amber-400 font-medium">
                      ★ Upload or Paste Link
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        required
                        value={formData.logo}
                        onChange={e => {
                          const raw = e.target.value;
                          const cleaned = cleanImageUrl(raw);
                          setFormData({ ...formData, logo: cleaned });
                        }}
                        placeholder="Paste ImgBB link, Firebase Storage URL, or any image link"
                        className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#FF8C00] text-xs"
                      />

                      <label className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors">
                        {isUploadingLogo ? (
                          <Loader2 className="w-4 h-4 animate-spin text-[#FF8C00]" />
                        ) : (
                          <Upload className="w-4 h-4 text-[#FF8C00]" />
                        )}
                        <span>{isUploadingLogo ? 'Uploading...' : 'Upload File'}</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleLogoFileUpload} 
                          disabled={isUploadingLogo}
                          className="hidden" 
                        />
                      </label>

                      {formData.logo && (
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 shrink-0 flex items-center justify-center p-0.5" title="Live Logo Preview">
                          <img
                            src={cleanImageUrl(formData.logo)}
                            alt="Logo Preview"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = FALLBACK_APP_LOGO;
                            }}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>

                    {isImgBbViewerUrl(formData.logo) ? (
                      <p className="text-[11px] text-amber-300 bg-amber-500/10 border border-amber-500/30 p-2 rounded-lg leading-tight font-medium">
                        ⚠️ ImgBB Tip: Direct image URL (<code className="text-emerald-400 font-bold">i.ibb.co/...</code>) ya Firebase Storage par direct image upload karein!
                      </p>
                    ) : (
                      <p className="text-[10px] text-slate-400">
                        File picker se direct image <span className="text-amber-400 font-semibold">Firebase Storage</span> par upload karein, ya ImgBB link / direct URL paste karein.
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Short Description</label>
                  <input
                    type="text"
                    required
                    value={formData.shortDescription}
                    onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                    placeholder="Brief 1-line overview"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#FF8C00]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Full Offer Details</label>
                  <textarea
                    rows={3}
                    value={formData.fullDescription}
                    onChange={e => setFormData({ ...formData, fullDescription: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#FF8C00]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Eligibility Criteria</label>
                  <input
                    type="text"
                    value={formData.eligibility}
                    onChange={e => setFormData({ ...formData, eligibility: e.target.value })}
                    placeholder="e.g. New Users Only, Ages 18+"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#FF8C00]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Prerequisites (Comma separated)</label>
                  <input
                    type="text"
                    value={formData.requirements}
                    onChange={e => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="PAN Card, Aadhaar OTP, Bank Account"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#FF8C00]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">How it Works Steps (Comma separated)</label>
                  <input
                    type="text"
                    value={formData.howItWorks}
                    onChange={e => setFormData({ ...formData, howItWorks: e.target.value })}
                    placeholder="Step 1 link, Step 2 register, Step 3 KYC, Step 4 cashback"
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#FF8C00]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-300">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="rounded bg-slate-950 border-slate-800 text-[#FF8C00] focus:ring-0"
                    />
                    <span>Mark as Featured Application</span>
                  </label>

                  <div className="flex items-center justify-end gap-2">
                    {editingApp && (
                      <button
                        type="button"
                        onClick={() => setAppToDelete(editingApp)}
                        className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-xs border border-rose-500/20 hover:border-rose-500/40 flex items-center gap-1 transition-colors cursor-pointer mr-auto sm:mr-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete App</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl btn-saffron-gradient text-white font-bold text-xs shadow-md cursor-pointer"
                    >
                      Save Application
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom Delete Confirmation Modal */}
      <AnimatePresence>
        {appToDelete && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center relative overflow-hidden"
            >
              <div className="w-12 h-12 bg-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Delete Application?</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Kya aap sach me <span className="text-white font-bold">"{appToDelete.name}"</span> ko delete karna chahte hain? Ye list se turant aur hamesha ke liye hat jayega.
              </p>
              <div className="flex items-center justify-center gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setAppToDelete(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deleteApp(appToDelete.id);
                    if (editingApp?.id === appToDelete.id) {
                      setIsModalOpen(false);
                    }
                    setAppToDelete(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Haan, Delete Karein</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showDeleteAllConfirm && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center relative overflow-hidden"
            >
              <div className="w-12 h-12 bg-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Delete All Apps?</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Kya aap sabhi ({apps.length}) applications ko delete karna chahte hain? Isse sabhi dummy apps hat jayenge.
              </p>
              <div className="flex items-center justify-center gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setShowDeleteAllConfirm(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deleteAllApps();
                    setShowDeleteAllConfirm(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Haan, Sabhi Delete Karein</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
