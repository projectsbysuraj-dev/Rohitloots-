import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User } from '../../types';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Ban, 
  Search, 
  Download, 
  Eye, 
  Shield, 
  Trash2, 
  X, 
  Mail, 
  Phone, 
  Calendar,
  IndianRupee,
  Gift
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminUserManagement: React.FC = () => {
  const { users, updateUserStatus, deleteUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Stats calculation
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const inactiveUsers = users.filter(u => u.status === 'inactive').length;
  const blockedUsers = users.filter(u => u.status === 'blocked').length;

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Export CSV Functionality
  const exportUsersCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Role', 'Status', 'Registered Date', 'Last Login', 'Total Earned', 'Claims Count'];
    const rows = users.map(u => [
      u.id,
      `"${u.name}"`,
      u.email,
      u.role,
      u.status,
      u.registeredDate,
      `"${u.lastLogin}"`,
      u.totalEarned,
      u.claimsCount
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rohit_Loots_Users_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            User Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Audit registered members, inspect profile balances, suspend suspicious accounts, and export CSV reports.
          </p>
        </div>

        <button
          onClick={exportUsersCSV}
          className="py-2.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Users CSV</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Total Registered</span>
            <Users className="w-4 h-4 text-[#0A66C2]" />
          </div>
          <div className="text-2xl font-extrabold text-white">{totalUsers}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">All Time Database</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Active Users</span>
            <UserCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">{activeUsers}</div>
          <p className="text-[11px] text-emerald-500/80 mt-0.5">Verified Active</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Inactive Users</span>
            <UserX className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400">{inactiveUsers}</div>
          <p className="text-[11px] text-amber-500/80 mt-0.5">Dormant Accounts</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-semibold">Blocked Users</span>
            <Ban className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold text-rose-400">{blockedUsers}</div>
          <p className="text-[11px] text-rose-500/80 mt-0.5">Suspended Access</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search users by name or email..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FF8C00]"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['all', 'active', 'inactive', 'blocked'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#FF8C00] text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Earned</th>
                <th className="p-4">Claims</th>
                <th className="p-4">Registered</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredUsers.map(u => (
                <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                      alt={u.name}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-700"
                    />
                    <div>
                      <div className="font-bold text-white text-xs">{u.name}</div>
                      <div className="text-[11px] text-slate-400">{u.email}</div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      u.role === 'admin' ? 'bg-orange-500/20 text-[#FF8C00] border border-orange-500/30' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {u.role}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold capitalize ${
                      u.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : u.status === 'blocked'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {u.status}
                    </span>
                  </td>

                  <td className="p-4 font-bold text-emerald-400">
                    ₹{u.totalEarned}
                  </td>

                  <td className="p-4 font-semibold text-white">
                    {u.claimsCount}
                  </td>

                  <td className="p-4 text-slate-400 text-[11px]">
                    {u.registeredDate}
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedUser(u)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                        title="View Profile"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {u.status === 'blocked' ? (
                        <button
                          onClick={() => updateUserStatus(u.id, 'active')}
                          className="px-2.5 py-1 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/20 transition-colors cursor-pointer"
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          onClick={() => updateUserStatus(u.id, 'blocked')}
                          className="px-2.5 py-1 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[11px] font-bold border border-rose-500/20 transition-colors cursor-pointer"
                        >
                          Block
                        </button>
                      )}

                      <button
                        onClick={() => {
                          if (confirm(`Delete account for ${u.name}?`)) {
                            deleteUser(u.id);
                          }
                        }}
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                        title="Delete User"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View User Profile Modal */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-800 text-white"
            >
              <button
                onClick={() => setSelectedUser(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-6">
                <img
                  src={selectedUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                  alt={selectedUser.name}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-[#FF8C00] mx-auto mb-3"
                />
                <h3 className="text-lg font-extrabold text-white">{selectedUser.name}</h3>
                <p className="text-xs text-slate-400">{selectedUser.email}</p>
                <span className="inline-block mt-2 px-3 py-0.5 rounded-full bg-slate-800 text-emerald-400 text-[11px] font-bold border border-slate-700">
                  {selectedUser.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Earned:</span>
                  <span className="font-extrabold text-emerald-400">₹{selectedUser.totalEarned}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Claims:</span>
                  <span className="font-bold text-white">{selectedUser.claimsCount} Offers</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Registered On:</span>
                  <span className="text-slate-300">{selectedUser.registeredDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Active:</span>
                  <span className="text-slate-300">{selectedUser.lastLogin}</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
