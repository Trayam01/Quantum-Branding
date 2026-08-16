import React, { useState } from 'react';
import { FAQ_ITEMS, COMPANY_INFO } from '../data/agencyData';
import { PageType } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ChevronDown, Sparkles, MessageSquare, Phone, Search } from 'lucide-react';

interface FAQPageProps {
  onNavigate: (page: PageType) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [search, setSearch] = useState<string>('');

  const filteredFAQs = FAQ_ITEMS.filter((item) => {
    return item.question.toLowerCase().includes(search.toLowerCase()) ||
           item.answer.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="pt-28 pb-20 space-y-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center space-y-4">
        <Breadcrumbs items={[{ label: 'Frequently Asked Questions' }]} onNavigate={onNavigate} />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Got Questions? <span className="gradient-text-blue-purple">We Have Answers.</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Everything you need to know about website costs, delivery timelines, reels creation, social media management, and custom packages.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search questions or keywords..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 text-sm font-semibold glass-input rounded-2xl shadow-xs"
        />
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFAQs.map((item, idx) => {
          const isOpen = openIdx === idx;

          return (
            <div
              key={idx}
              className="glass-panel rounded-2xl border border-slate-200/80 overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 sm:p-6 text-left font-display font-bold text-base sm:text-lg text-slate-900 flex items-center justify-between gap-4 hover:text-indigo-600 transition-colors"
              >
                <span>{item.question}</span>
                <div className={`p-1.5 rounded-full bg-indigo-50 text-indigo-600 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-indigo-600 text-white' : ''}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100/80 animate-fadeIn">
                  <p className="pt-3">{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Unanswered Question CTA */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-200/80 text-center space-y-4 bg-white/90">
        <h3 className="text-xl font-display font-bold text-slate-900">
          Have a Specific Question Not Listed Here?
        </h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Contact Founder Trayam Tiwari directly for instant answers regarding custom quotes or technical requirements.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={COMPANY_INFO.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-500 transition-colors flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask on WhatsApp ({COMPANY_INFO.phoneFormatted})</span>
          </a>

          <button
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-xl font-bold text-xs bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            Contact Page
          </button>
        </div>
      </div>
    </div>
  );
};
