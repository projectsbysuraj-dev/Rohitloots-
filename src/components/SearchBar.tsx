import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, Sparkles, TrendingUp, Gift, Zap } from 'lucide-react';

export const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useApp();

  const categories = [
    { id: 'all', label: 'All Apps', icon: Sparkles },
    { id: 'latest', label: 'Latest Applications', icon: Zap },
    { id: 'daily', label: 'Daily Buy Sell Apps', icon: TrendingUp },
    { id: 'bonus', label: 'Bonus Claim Only', icon: Gift },
  ];

  return (
    <div className="w-full space-y-3 my-2">
      {/* Search Input */}
      <div className="relative w-full max-w-md mx-auto">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search Applications..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white shadow-xs border border-slate-200 text-base font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full hover:bg-slate-100 text-slate-400 absolute right-3"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Selection Filter Pills */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none px-1">
        {categories.map(cat => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4.5 py-2.5 rounded-2xl text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-105'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-sky-400' : 'text-slate-400'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
