import React from 'react';
import { Logo } from './Logo';
import { PageType } from '../types';
import { COMPANY_INFO } from '../data/agencyData';
import { Phone, Mail, MessageSquare, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageType) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-900 text-slate-300 pt-16 pb-12 overflow-hidden border-t border-slate-800">
      {/* Background Liquid Gradient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="bg-slate-950/80 p-3.5 rounded-2xl inline-block border border-slate-800/80 shadow-md w-fit">
              <Logo size="md" showTagline />
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Quantum Branding helps ambitious businesses build, market, and scale their digital footprint with custom websites, high-performing reels, SEO, and AI growth solutions.
            </p>
            
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 bg-indigo-950/60 border border-indigo-900/60 px-3 py-1.5 rounded-full w-fit">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Founded & Led by {COMPANY_INFO.founder}</span>
            </div>
          </div>

          {/* Quick Pages Navigation */}
          <div>
            <h4 className="font-display text-white font-bold text-base mb-4 tracking-wider uppercase text-xs">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Home', page: 'home' as PageType },
                { label: 'Services Menu', page: 'services' as PageType },
                { label: 'Pricing Breakdown', page: 'pricing' as PageType },
                { label: 'Digital Packages', page: 'packages' as PageType },
                { label: 'Webinar Hub', page: 'webinars' as PageType },
                { label: 'Client Portfolio', page: 'portfolio' as PageType },
                { label: 'About Us', page: 'about' as PageType },
                { label: '6-Step Process', page: 'process' as PageType },
                { label: 'Contact Us', page: 'contact' as PageType },
                { label: 'FAQ', page: 'faq' as PageType },
              ].map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => handleNav(item.page)}
                    className="hover:text-white transition-colors flex items-center gap-1 group text-slate-400"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-indigo-400" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services Menu */}
          <div>
            <h4 className="font-display text-white font-bold text-base mb-4 tracking-wider uppercase text-xs">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>Website Development</li>
              <li>Social Media Management</li>
              <li>Reels & Video Creation</li>
              <li>SEO & Rank Optimization</li>
              <li>Meta & Google Ads</li>
              <li>Brand Visual Identity</li>
              <li>WhatsApp & AI Automation</li>
            </ul>
          </div>

          {/* Contact & Location Info + Legal Section */}
          <div>
            <h4 className="font-display text-white font-bold text-base mb-4 tracking-wider uppercase text-xs">
              Official Contact
            </h4>
            <div className="space-y-3 text-sm text-slate-300 mb-6">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Official Email</div>
                  <a href={COMPANY_INFO.emailLink} className="font-medium text-xs text-slate-300 hover:text-white transition-colors break-all">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                <div>
                  <div className="text-[11px] text-slate-500 font-medium">Headquarters</div>
                  <div className="font-medium text-xs text-slate-300">{COMPANY_INFO.location}</div>
                </div>
              </div>
            </div>

            {/* Legal & Governance Section */}
            <h4 className="font-display text-white font-bold text-base mb-3 tracking-wider uppercase text-xs pt-3 border-t border-slate-800">
              Legal & Governance
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Terms & Conditions', page: 'terms' as PageType },
                { label: 'Refund Policy', page: 'refund-policy' as PageType },
                { label: 'Return Policy', page: 'return-policy' as PageType },
                { label: 'Disclaimer', page: 'disclaimer' as PageType },
              ].map((legal) => (
                <li key={legal.page}>
                  <button
                    onClick={() => handleNav(legal.page)}
                    className="hover:text-white transition-colors flex items-center gap-1 text-slate-400 font-medium"
                  >
                    <span>{legal.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-indigo-400" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Quantum Branding. All rights reserved. Founded & led by {COMPANY_INFO.founder}.</p>
          <div className="flex flex-wrap items-center gap-4 text-slate-400 font-medium">
            <button onClick={() => handleNav('terms')} className="hover:text-white transition-colors">
              Terms
            </button>
            <span>•</span>
            <button onClick={() => handleNav('refund-policy')} className="hover:text-white transition-colors">
              Refund Policy
            </button>
            <span>•</span>
            <button onClick={() => handleNav('return-policy')} className="hover:text-white transition-colors">
              Return Policy
            </button>
            <span>•</span>
            <button onClick={() => handleNav('disclaimer')} className="hover:text-white transition-colors">
              Disclaimer
            </button>
            <span>•</span>
            <button onClick={() => handleNav('admin')} className="text-slate-500 hover:text-indigo-400 transition-colors flex items-center gap-1 font-mono text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
