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
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-white shadow-xs border border-slate-200 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF8C00]/50 focus:border-[#FF8C00] transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full hover:bg-slate-100 text-slate-400 absolute right-2.5"
            >
              <X className="w-3.5 h-3.5" />
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
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-105'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#FF8C00]' : 'text-slate-400'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
