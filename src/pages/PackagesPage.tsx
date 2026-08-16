import React from 'react';
import { PackagesSection } from '../components/PackagesSection';
import { PageType } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { COMPANY_INFO } from '../data/agencyData';
import { Sparkles, ShieldCheck, Phone, CheckCircle2 } from 'lucide-react';

interface PackagesPageProps {
  onNavigate: (page: PageType) => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-28 pb-16 space-y-12">
      {/* Top Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <Breadcrumbs items={[{ label: 'Digital Growth Packages' }]} onNavigate={onNavigate} />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-200 text-indigo-900 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>Our #1 Recommended Offerings</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 tracking-tight">
          Complete Digital <span className="gradient-text-blue-purple">Growth Packages</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          The ultimate all-in-one digital growth systems created by Quantum Branding. Designed to transform your business into a high-converting digital market leader.
        </p>

        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 pt-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Direct strategy & execution oversight by Founder Trayam Tiwari</span>
        </div>
      </div>

      {/* Main Packages Section Component */}
      <PackagesSection onNavigate={onNavigate} />

      {/* Trust Guarantee Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 rounded-3xl border border-slate-200/80 text-center space-y-4">
          <h3 className="text-2xl font-display font-bold text-slate-900">
            Why Choose a Complete Package Over Individual Services?
          </h3>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Building a website alone is like opening a store in a quiet alley. When you pair a high-converting website with 15–30 high-retention Reels, SEO, and SMM, you create an active lead generation engine that consistently brings customers to your door.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-500/25"
            >
              Enquire About Growth Packages
            </button>

            <a
              href={COMPANY_INFO.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 rounded-full font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Trayam Tiwari ({COMPANY_INFO.phoneFormatted})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
