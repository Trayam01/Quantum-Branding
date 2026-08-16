import React from 'react';
import { PageType } from '../types';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: { label: string; page?: PageType }[];
  onNavigate?: (page: PageType) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6 bg-white/70 py-2 px-4 rounded-full border border-slate-200/70 inline-flex shadow-xs">
      <button
        onClick={() => onNavigate && onNavigate('home')}
        className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
      >
        <Home className="w-3.5 h-3.5 text-slate-400" />
        <span>Home</span>
      </button>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          {item.page && onNavigate ? (
            <button
              onClick={() => onNavigate(item.page!)}
              className="hover:text-indigo-600 transition-colors"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-slate-900 font-bold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
