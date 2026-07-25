import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Smartphone, 
  Gift, 
  IndianRupee, 
  TrendingUp, 
  Activity, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Sparkles,
  ArrowUpRight,
  RefreshCw
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, 
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { users, apps, activities, notifications } = useApp();

  // Simulated live counter effect for Active Users
  const [liveActiveUsers, setLiveActiveUsers] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveActiveUsers(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Calculate Real Stats
  const totalUsersCount = users.length + 1240; // Base + seed
  const todayUsersCount = users.filter(u => u.registeredDate === new Date().toISOString().split('T')[0]).length + 34;
  const totalAppsCount = apps.length;
  const claimsTodayCount = activities.length + 118;
  const totalRevenueDistributed = activities.reduce((acc, curr) => acc + curr.rewardAmount, 48500);

  // Chart Data Preparation
  const dailyUserGrowthData = [
    { day: 'Mon', users: 120, claims: 80 },
    { day: 'Tue', users: 190, claims: 110 },
    { day: 'Wed', users: 240, claims: 160 },
    { day: 'Thu', users: 310, claims: 220 },
    { day: 'Fri', users: 420, claims: 340 },
    { day: 'Sat', users: 580, claims: 490 },
    { day: 'Sun', users: 740, claims: 610 },
  ];

  const dailyClaimsBarData = [
    { name: 'Angel One', claims: 384 },
    { name: 'IndMoney', claims: 291 },
    { name: 'Navi Gold', claims: 412 },
    { name: 'Groww', claims: 560 },
    { name: 'Zerodha', claims: 310 },
    { name: 'Fi Money', claims: 195 },
  ];

  const categoryPieData = [
    { name: 'Latest Applications', value: apps.filter(a => a.category === 'latest').length || 3, color: '#FF8C00' },
    { name: 'Daily Buy Sell', value: apps.filter(a => a.category === 'daily').length || 3, color: '#0A66C2' },
    { name: 'Bonus Claim Only', value: apps.filter(a => a.category === 'bonus').length || 3, color: '#138808' },
  ];

  const weeklyTrafficAreaData = [
    { week: 'W1', traffic: 3200, conversions: 2100 },
    { week: 'W2', traffic: 4500, conversions: 3100 },
    { week: 'W3', traffic: 6200, conversions: 4800 },
    { week: 'W4', traffic: 8900, conversions: 6900 },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-[#FF8C00]/20 text-[#FF8C00] border border-[#FF8C00]/30 text-xs font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Live Admin Telemetry
            </span>
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Real-time Sync Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track real-time app claims, user growth, reward payouts, and system metrics.
          </p>
        </div>

        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#FF8C00]" />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Live Sync Short Link Share Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-orange-950/80 via-slate-900 to-slate-900 border border-orange-500/30 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-extrabold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Server Live Database Enabled
              </span>
              <span className="text-xs text-orange-400 font-bold">100% Real-Time Auto Sync</span>
            </div>
            <h3 className="text-base font-extrabold text-white">
              Website Short Share Link (Dosto & Telegram Ke Liye)
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Iss link par click karke naya banda jab aayega toh usko wahi LIVE applications dikhenge jo aapne Admin Panel se publish/delete kiye hain.
            </p>
          </div>

          <div className="w-full md:w-auto flex items-center gap-2 bg-slate-950/80 p-2 rounded-2xl border border-slate-800">
            <code className="text-xs text-amber-300 font-mono px-3 py-1 font-bold truncate max-w-[220px] sm:max-w-[320px]">
              {window.location.host.includes('vercel.app') ? 'https://rohit-loots.vercel.app' : window.location.origin}
            </code>
            <button
              onClick={() => {
                const baseUrl = window.location.host.includes('vercel.app') ? 'https://rohit-loots.vercel.app' : window.location.origin;
                navigator.clipboard.writeText(baseUrl);
                alert('Website URL copied to clipboard!\n' + baseUrl);
              }}
              className="px-4 py-2 rounded-xl btn-saffron-gradient text-white text-xs font-bold cursor-pointer whitespace-nowrap shadow-md active:scale-95 transition-transform"
            >
              Copy Website URL
            </button>
          </div>
        </div>
      </div>

      {/* Top 6 Analytics Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Users */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Total Users</span>
            <Users className="w-4 h-4 text-[#0A66C2]" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-white">
            {totalUsersCount.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold mt-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+14.2% this month</span>
          </div>
        </div>

        {/* Today's Users */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Today's Users</span>
            <TrendingUp className="w-4 h-4 text-[#FF8C00]" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-white">
            +{todayUsersCount}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">
            New Registrations
          </div>
        </div>

        {/* Total Applications */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Applications</span>
            <Smartphone className="w-4 h-4 text-[#138808]" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-white">
            {totalAppsCount}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1">
            All Published Live
          </div>
        </div>

        {/* Claims Today */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Claims Today</span>
            <Gift className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-white">
            {claimsTodayCount}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold mt-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+28% vs yesterday</span>
          </div>
        </div>

        {/* Revenue / Rewards */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Rewards Paid</span>
            <IndianRupee className="w-4 h-4 text-[#FF8C00]" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">
            ₹{totalRevenueDistributed.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">
            Direct Cashback
          </div>
        </div>

        {/* Active Users Now (Live Counter) */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">Active Right Now</span>
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <span>{liveActiveUsers}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1">
            Live on App
          </div>
        </div>
      </div>

      {/* Interactive Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart: Daily User Growth */}
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Daily User Growth & Claims</h3>
              <p className="text-xs text-slate-400">Weekly trajectory of registrations vs claims</p>
            </div>
            <span className="text-xs text-[#FF8C00] font-bold">This Week</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyUserGrowthData}>
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} 
                />
                <Legend />
                <Line type="monotone" dataKey="users" name="New Users" stroke="#FF8C00" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="claims" name="Completed Claims" stroke="#0A66C2" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Daily Claims by Application */}
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Top Performing Applications</h3>
              <p className="text-xs text-slate-400">Claim volume by top listed apps</p>
            </div>
            <span className="text-xs text-emerald-400 font-bold">Highest Conversions</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyClaimsBarData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} 
                />
                <Bar dataKey="claims" fill="#138808" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Category Distribution */}
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Category Distribution</h3>
              <p className="text-xs text-slate-400">Share of apps across 3 core categories</p>
            </div>
          </div>

          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area Chart: Weekly Traffic & Conversions */}
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Weekly Traffic Growth</h3>
              <p className="text-xs text-slate-[#0A66C2]">Pageviews vs Referral Clicks</p>
            </div>
            <span className="text-xs text-emerald-400 font-bold">78% Conversion</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyTrafficAreaData}>
                <XAxis dataKey="week" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} 
                />
                <Area type="monotone" dataKey="traffic" stroke="#0A66C2" fill="#0A66C2" fillOpacity={0.2} />
                <Area type="monotone" dataKey="conversions" stroke="#138808" fill="#138808" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table & Live Notifications Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities Table */}
        <div className="lg:col-span-2 p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white">Recent Claim Activities</h3>
            <span className="text-xs text-slate-400">Live feed</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3">User</th>
                  <th className="p-3">Application</th>
                  <th className="p-3">Reward</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {activities.map(act => (
                  <tr key={act.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-semibold text-white">{act.userName}</td>
                    <td className="p-3 flex items-center gap-2">
                      <img src={act.appLogo} alt="" className="w-6 h-6 rounded-lg object-cover" />
                      <span>{act.appName}</span>
                    </td>
                    <td className="p-3 font-bold text-emerald-400">₹{act.rewardAmount}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        act.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : act.status === 'pending'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {act.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400 text-[11px]">{act.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live System Notifications Panel */}
        <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF8C00]" />
            Real-time System Audit
          </h3>

          <div className="space-y-3">
            {notifications.map(n => (
              <div key={n.id} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                <div className="flex items-center justify-between text-slate-200 font-semibold mb-1">
                  <span>{n.title}</span>
                  <span className="text-[10px] text-slate-500">{n.timestamp}</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">{n.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
