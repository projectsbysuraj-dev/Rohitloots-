import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, TrendingUp, Users, Smartphone, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const AdminAnalytics: React.FC = () => {
  const { apps, activities, users } = useApp();

  const monthlyGrowth = [
    { month: 'Jan', users: 320, claims: 180 },
    { month: 'Feb', users: 450, claims: 290 },
    { month: 'Mar', users: 680, claims: 420 },
    { month: 'Apr', users: 920, claims: 650 },
    { month: 'May', users: 1150, claims: 890 },
    { month: 'Jun', users: 1380, claims: 1120 },
  ];

  const deviceUsage = [
    { name: 'Android App', value: 72, color: '#FF8C00' },
    { name: 'Mobile Web', value: 20, color: '#0A66C2' },
    { name: 'Desktop Web', value: 8, color: '#138808' },
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          Deep Telemetry & Analytics
          <BarChart3 className="w-5 h-5 text-[#FF8C00]" />
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Historical growth trajectories, referral conversion rates, and user retention breakdown.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800">
          <h3 className="text-sm font-bold text-white mb-4">6-Month Acquisition & Retention</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyGrowth}>
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '12px' }} />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#FF8C00" strokeWidth={3} />
                <Line type="monotone" dataKey="claims" stroke="#138808" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800">
          <h3 className="text-sm font-bold text-white mb-4">Device Access Breakdown</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={deviceUsage} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {deviceUsage.map((e, idx) => (
                    <Cell key={idx} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '12px' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
