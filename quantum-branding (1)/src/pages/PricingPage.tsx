import React, { useState } from 'react';
import { PRICING_LIST, COMPANY_INFO, getWhatsAppUrl } from '../data/agencyData';
import { PageType } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { IndianRupee, Sparkles, ArrowRight, ShieldAlert, CheckCircle2, Search } from 'lucide-react';

interface PricingPageProps {
  onNavigate: (page: PageType) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Website Development',
    'SEO Services',
    'Social Media Management',
    'Branding & Design',
    'Digital Marketing',
    'Automation & Solutions',
    'Content Creation',
  ];

  const filteredItems = PRICING_LIST.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Breadcrumbs items={[{ label: 'Services & Pricing Menu' }]} onNavigate={onNavigate} />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <IndianRupee className="w-3.5 h-3.5" />
          <span>Transparent Indian Rupee (₹) Pricing</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Services & Pricing <span className="gradient-text-blue-purple">Menu</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Clear, straightforward pricing for individual digital services. Need a complete bundled growth system? Check our <button onClick={() => onNavigate('packages')} className="text-indigo-600 font-bold underline">Growth Packages</button>.
        </p>

        {/* Clear Disclaimer Note */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold max-w-xl mx-auto text-left">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>IMPORTANT: Final pricing may vary depending on scope, requirements and complexity.</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-slate-200/80">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white/80 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search service pricing..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs font-semibold bg-white/90 border border-slate-200/80 rounded-xl focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            className="glass-card p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                  {item.category}
                </span>
              </div>

              <h3 className="text-lg font-display font-bold text-slate-900">
                {item.name}
              </h3>

              <div className="text-2xl font-display font-black text-indigo-600 my-2">
                {item.price}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  onNavigate('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-1 py-2.5 px-3 rounded-xl font-bold text-xs bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors flex items-center justify-center gap-1"
              >
                <span>Enquire</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={getWhatsAppUrl(`Hello Quantum Branding! I am interested in ${item.name} (${item.price}). Please share details.`)}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl font-bold text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Banner Callout for Packages */}
      <div className="glass-panel p-8 rounded-3xl border border-indigo-200/80 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recommended Bundle</span>
          </div>
          <h3 className="text-2xl font-display font-bold">Looking for Maximum ROI & Value?</h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Our Complete Digital Growth Packages combine Website Development, 15–30 Reels, SMM, and Lead Systems into one high-performing bundle.
          </p>
        </div>

        <button
          onClick={() => {
            onNavigate('packages');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-pink-500 to-indigo-500 text-white hover:opacity-95 shadow-lg shrink-0 whitespace-nowrap"
        >
          View Growth Packages &rarr;
        </button>
      </div>
    </div>
  );
};
