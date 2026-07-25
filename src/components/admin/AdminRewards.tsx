import React from 'react';
import { useApp } from '../../context/AppContext';
import { Gift, CheckCircle2, Clock, XCircle, IndianRupee } from 'lucide-react';

export const AdminRewards: React.FC = () => {
  const { activities } = useApp();

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
          Rewards & Claims Ledger
          <Gift className="w-5 h-5 text-[#FF8C00]" />
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Audit user claims, transaction references, and reward distribution statuses.
        </p>
      </div>

      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Txn Ref</th>
                <th className="p-4">User</th>
                <th className="p-4">Application</th>
                <th className="p-4">Reward</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {activities.map(act => (
                <tr key={act.id} className="hover:bg-slate-800/40">
                  <td className="p-4 font-mono font-semibold text-slate-400">{act.transactionRef || 'RL-TXN-1002'}</td>
                  <td className="p-4 font-bold text-white">{act.userName}</td>
                  <td className="p-4 flex items-center gap-2">
                    <img src={act.appLogo} alt="" className="w-6 h-6 rounded object-cover" />
                    <span>{act.appName}</span>
                  </td>
                  <td className="p-4 font-extrabold text-emerald-400">₹{act.rewardAmount}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      act.status === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {act.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 text-[11px]">{act.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
