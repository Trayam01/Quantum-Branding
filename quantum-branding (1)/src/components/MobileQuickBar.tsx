import React from 'react';
import { Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { COMPANY_INFO, getWhatsAppUrl } from '../data/agencyData';
import { PageType } from '../types';

interface MobileQuickBarProps {
  onNavigate: (page: PageType) => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({ onNavigate }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/90 p-2 px-3 flex items-center justify-between gap-2 shadow-2xl">
      {/* Individual Call Now Button */}
      <a
        href={COMPANY_INFO.phoneLink}
        className="flex-1 py-2.5 px-2.5 rounded-xl bg-slate-850 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 border border-slate-700/80 shadow-sm active:scale-95 transition-all"
        title="Call Now"
      >
        <Phone className="w-3.5 h-3.5 text-blue-400" />
        <span>Call Now</span>
      </a>

      {/* Individual WhatsApp Button */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noreferrer"
        className="flex-1 py-2.5 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/30 active:scale-95 transition-all"
        title="Chat on WhatsApp"
      >
        <MessageSquare className="w-3.5 h-3.5 fill-current" />
        <span>WhatsApp</span>
      </a>

      {/* Individual Enquiry Now Button */}
      <button
        onClick={() => {
          onNavigate('contact');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="flex-1 py-2.5 px-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-pink-500 to-yellow-500 text-white font-black text-xs flex items-center justify-center gap-1 shadow-md active:scale-95 transition-all"
        title="Enquiry Now"
      >
        <span>Enquire Now</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

