import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck, Sparkles, CheckSquare, Square } from 'lucide-react';
import { motion } from 'motion/react';
import logoImg from '../assets/images/rohit_tricks_logo_1785071369631.jpg';

export const LoginScreen: React.FC = () => {
  const { login, register } = useApp();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  
  // Form states
  const [email, setEmail] = useState('adminrohit@gmail.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Rohit Kumar');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      if (!email || !password) {
        setError('Please enter both email and password');
        return;
      }
      const success = login(email);
      if (!success) {
        setError('Login failed. Please check your credentials.');
      }
    } else if (mode === 'register') {
      if (!name || !email || !password) {
        setError('Please fill in all required fields');
        return;
      }
      register(name, email);
    } else if (mode === 'forgot') {
      alert(`Password reset link sent to ${email}!`);
      setMode('login');
    }
  };

  const quickDemoLogin = (role: 'admin' | 'user') => {
    if (role === 'admin') {
      login('adminrohit@gmail.com', 'admin');
    } else {
      login('example@gmail.com', 'user');
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 bg-slate-950 overflow-hidden">
      {/* Background Abstract Gradient Mesh Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#FF8C00]/30 blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-[#0A66C2]/30 blur-[100px] animate-pulse delay-700" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-[#0284c7]/25 blur-[100px] animate-pulse delay-1000" />
        
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Main Login Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-[28px] p-6 sm:p-8 shadow-2xl border border-white/60 text-slate-800"
      >
        {/* Top Header Section */}
        <div className="text-center mb-6">
          {/* Top Left/Center Logo */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF8C00] via-[#0A66C2] to-[#0284c7] p-0.5 shadow-lg shadow-orange-500/20 overflow-hidden">
              <img 
                src={logoImg} 
                alt="Rohit Tricks Logo" 
                className="w-full h-full object-cover rounded-[14px]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-1.5">
            Rohit Tricks
            <Sparkles className="w-5 h-5 text-[#FF8C00] fill-[#FF8C00]/30" />
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Find Best Buy & Sell Applications
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium">
            {error}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00]/50 transition-all"
                />
                <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email / Username
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00]/50 transition-all"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF8C00]/50 transition-all"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>
          )}

          {mode === 'login' && (
            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <label
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center gap-1.5 cursor-pointer font-medium select-none"
              >
                {rememberMe ? (
                  <CheckSquare className="w-4 h-4 text-[#FF8C00]" />
                ) : (
                  <Square className="w-4 h-4 text-slate-300" />
                )}
                <span>Remember Me</span>
              </label>
              <button
                type="button"
                onClick={() => setMode('forgot')}
                className="text-[#0A66C2] hover:underline font-semibold"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* 3D Sky Blue Login Button */}
          <button
            type="submit"
            className="w-full mt-3 py-3.5 px-4 rounded-full btn-3d-blue font-extrabold text-base tracking-wide flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>
              {mode === 'login' ? 'Login Now' : mode === 'register' ? 'Create Free Account' : 'Reset Password'}
            </span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Footer Navigation Links */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center space-y-3">
          <div className="text-xs text-slate-600 font-medium">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="text-[#FF8C00] font-bold hover:underline"
                >
                  Create Account
                </button>
              </>
            ) : (
              <>
                Already registered?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-[#FF8C00] font-bold hover:underline"
                >
                  Sign In
                </button>
              </>
            )}
          </div>

          <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Rohit Tricks Privacy Policy: Your data is 100% safe & protected.'); }} className="hover:text-slate-600 transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Rohit Tricks Terms: Use verified referral links to claim rewards.'); }} className="hover:text-slate-600 transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
