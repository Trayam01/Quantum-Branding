import React from 'react';
import { WebinarSection } from '../components/WebinarSection';
import { PageType } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { COMPANY_INFO, getWhatsAppUrl } from '../data/agencyData';
import { Sparkles, ShieldCheck, Video, MessageSquare, CheckCircle2 } from 'lucide-react';

interface WebinarPageProps {
  onNavigate: (page: PageType) => void;
}

export const WebinarPage: React.FC<WebinarPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-28 pb-16 space-y-12">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <Breadcrumbs items={[{ label: '101 Masterclasses & Webinars' }]} onNavigate={onNavigate} />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 via-teal-100 to-blue-100 border border-teal-200 text-teal-900 text-xs font-bold shadow-2xs">
          <Sparkles className="w-4 h-4 text-emerald-600 fill-emerald-500 animate-pulse" />
          <span>Live & 1-on-1 VIP Workshops</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-slate-900 tracking-tight">
          Digital Growth <span className="gradient-text-blue-pink-yellow">Webinar Hub</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          Unlock actionable strategies to scale your business. Choose between our free group masterclass or a dedicated 1-on-1 private strategy workshop hosted personally by Founder Trayam Tiwari.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600 pt-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Direct Founder Guidance</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Video className="w-4 h-4 text-blue-500" />
            <span>Interactive Q&A & Custom Audits</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-500" />
            <span>Actionable Growth Workbooks</span>
          </div>
        </div>
      </div>

      {/* Main Webinar Section Component */}
      <WebinarSection onNavigate={onNavigate} />

      {/* Custom Team Workshop Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-200/80 text-center space-y-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl">
          <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            Corporate & Team Training
          </span>

          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Need a Dedicated Digital Workshop for Your Corporate Team?
          </h3>

          <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We deliver tailored live digital growth workshops for sales teams, marketing departments, and business organizations.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-full font-black text-xs bg-gradient-to-r from-blue-600 via-pink-500 to-yellow-500 text-white shadow-lg"
            >
              Request Team Workshop
            </button>

            <a
              href={getWhatsAppUrl("Hello Trayam! I would like to inquire about a custom corporate digital growth workshop for my team.")}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 rounded-full font-extrabold text-xs bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Discuss on WhatsApp ({COMPANY_INFO.phoneFormatted})</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
