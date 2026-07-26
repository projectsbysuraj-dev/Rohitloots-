import React from 'react';
import { AppItem, AppCategory } from '../types';
import { AppCard } from './AppCard';
import { Zap, TrendingUp, Gift, ChevronRight } from 'lucide-react';

interface CategorySectionProps {
  title: string;
  categoryKey: AppCategory;
  apps: AppItem[];
  subtitle?: string;
  badgeText?: string;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  categoryKey,
  apps,
  subtitle,
  badgeText
}) => {
  if (apps.length === 0) return null;

  // Icons for each category
  const getCategoryIcon = () => {
    switch (categoryKey) {
      case 'latest':
        return <Zap className="w-5 h-5 text-[#FF8C00]" />;
      case 'daily':
        return <TrendingUp className="w-5 h-5 text-[#0A66C2]" />;
      case 'bonus':
        return <Gift className="w-5 h-5 text-[#0284c7]" />;
    }
  };

  const getBadgeColor = () => {
    switch (categoryKey) {
      case 'latest':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'daily':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'bonus':
        return 'bg-sky-100 text-sky-800 border-sky-200';
    }
  };

  return (
    <section className="my-5">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-white shadow-xs border border-slate-100">
            {getCategoryIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                {title}
              </h2>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getBadgeColor()}`}>
                {badgeText || `${apps.length} Apps`}
              </span>
            </div>
            {subtitle && (
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Grid of App Cards */}
      {apps.length === 0 ? (
        <div className="p-6 rounded-2xl bg-white/60 border border-slate-200/80 text-center text-xs text-slate-500 font-medium">
          No applications listed in this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {apps.map(app => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </section>
  );
};
