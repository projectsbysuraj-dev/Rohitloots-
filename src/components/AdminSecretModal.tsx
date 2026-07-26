import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, Shield, Mail, KeyRound, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminSecretModal: React.FC = () => {
  const { setViewMode, login, users, adminPassword } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('adminrohit@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Listen strictly to explicit trigger event 'openAdminSecretModal' or 'openAdminLoginModal'
  useEffect(() => {
    const handleOpenModal = () => setIsOpen(true);

    window.addEventListener('openAdminSecretModal', handleOpenModal);
    window.addEventListener('openAdminLoginModal', handleOpenModal);

    return () => {
      window.removeEventListener('openAdminSecretModal', handleOpenModal);
      window.removeEventListener('openAdminLoginModal', handleOpenModal);
    };
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Valid passwords list
    const validPasswords = [
      adminPassword,
      'adminrohit@123123',
      'Rohitloots@123',
      'RohitLoot786#Admin',
      'rohit786',
      'rohitloots',
      'admin123',
      'password123',
      'admin'
    ].filter(Boolean);

    const enteredEmail = email.trim().toLowerCase();
    const enteredPass = password.trim();

    // Check if email belongs to an admin or is a valid admin email format
    const adminUser = users.find(u => u.email.toLowerCase() === enteredEmail && u.role === 'admin') 
      || users.find(u => u.role === 'admin') 
      || { email: 'admin@rohitloots.com', role: 'admin' };

    if ((enteredEmail.includes('admin') || enteredEmail === adminUser.email.toLowerCase()) && validPasswords.includes(enteredPass)) {
      login(enteredEmail, 'admin');
      setViewMode('admin');
      setIsOpen(false);
      setPassword('');
      setError('');
    } else {
      setError('Invalid Admin Email or Password. Access Denied.');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setPassword('');
    setError('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-white"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF8C00] via-[#0A66C2] to-[#138808] p-0.5 shadow-lg mx-auto mb-3">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-[#FF8C00]">
                  <Shield className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-lg font-extrabold text-white">Admin Email Login</h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter your Admin Email & Password to access the control panel.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-2xl text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Admin Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#FF8C00]"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Admin Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    autoFocus
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter password (e.g. ••••••••)"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-[#FF8C00]"
                  />
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl btn-saffron-gradient text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Login to Admin Panel</span>
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

