import React from 'react';
import { MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '../data/agencyData';

export const WhatsAppFloating: React.FC = () => {
  return (
    <a
      href={COMPANY_INFO.whatsappLink}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-20 sm:bottom-6 right-5 z-40 p-3.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-all duration-300 group flex items-center justify-center border-2 border-white/80"
      title="Chat on WhatsApp with Quantum Branding"
      aria-label="WhatsApp Chat"
    >
      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white animate-ping"></div>
      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white"></div>
      
      <MessageSquare className="w-6 h-6 fill-current" />
      
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 text-xs font-bold whitespace-nowrap transition-all duration-300">
        WhatsApp Us Now
      </span>
    </a>
  );
};
