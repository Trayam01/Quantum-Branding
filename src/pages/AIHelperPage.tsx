import React from 'react';
import { AIHelperWidget } from '../components/AIHelperWidget';
import { PageType } from '../types';
import { Sparkles, Bot, ShieldCheck, Zap } from 'lucide-react';
import { COMPANY_INFO } from '../data/agencyData';

interface AIHelperPageProps {
  onNavigate: (page: PageType) => void;
}

export const AIHelperPage: React.FC<AIHelperPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-28 pb-20 space-y-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-pink-500/10 border border-indigo-200 text-indigo-900 text-xs font-bold">
          <Bot className="w-4 h-4 text-indigo-600 animate-bounce" />
          <span>Interactive AI Recommendation System</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Quantum AI <span className="gradient-text-blue-purple">Growth Helper</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Not sure which service or growth package fits your business best? Answer 5 quick questions and our Gemini-powered AI engine will generate a tailored digital roadmap.
        </p>

        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Calculated against real B2B digital growth strategies</span>
        </div>
      </div>

      {/* Embedded Helper Box Container */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-200/80 shadow-2xl bg-white/90">
        <AIHelperWidget
          isOpen={true}
          onClose={() => onNavigate('home')}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};
