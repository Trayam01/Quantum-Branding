import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { PageType } from '../types';
import { Menu, X, Phone, MessageSquare, Sparkles, ArrowRight, Send } from 'lucide-react';
import { COMPANY_INFO, getWhatsAppUrl } from '../data/agencyData';

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenAIHelper: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenAIHelper }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: PageType; badge?: string }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'Pricing', page: 'pricing' },
    { label: 'Packages', page: 'packages', badge: 'Hot' },
    { label: 'Webinars', page: 'webinars', badge: 'New' },
    { label: 'Portfolio', page: 'portfolio' },
    { label: 'About', page: 'about' },
    { label: 'Process', page: 'process' },
    { label: 'FAQ', page: 'faq' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-sm'
            : 'py-4 bg-slate-50/60 backdrop-blur-md border-b border-white/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            {/* Logo */}
            <Logo onClick={() => handleNavClick('home')} size="md" />

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 bg-white/70 p-1.5 rounded-full border border-slate-200/80 shadow-xs backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 flex items-center gap-1 ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-blue-600 via-pink-600 to-blue-700 shadow-md shadow-blue-500/25'
                        : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100/80'
                    }`}
                  >
                    {link.label}
                    {link.badge && (
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase ${
                        isActive ? 'bg-yellow-300 text-slate-950' : 'bg-gradient-to-r from-yellow-400 via-amber-400 to-pink-500 text-slate-950'
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Desktop CTA Buttons & AI Widget */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Call Now Button */}
              <a
                href={COMPANY_INFO.phoneLink}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-extrabold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-full shadow-2xs transition-all hover:border-slate-300"
                title="Call Quantum Branding directly"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>Call Now</span>
              </a>

              {/* WhatsApp Button */}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-500 rounded-full shadow-xs transition-all"
                title="Chat on WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </a>

              {/* AI Helper Trigger */}
              <button
                onClick={onOpenAIHelper}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-extrabold text-slate-900 bg-white hover:bg-slate-50 border border-amber-200 hover:border-amber-300 rounded-full transition-all shadow-2xs"
                title="Quantum AI Growth Helper"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400 animate-pulse" />
                <span className="bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent font-extrabold">AI Helper</span>
              </button>

              {/* Enquire Now CTA */}
              <button
                onClick={() => handleNavClick('contact')}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black text-white bg-gradient-to-r from-blue-600 via-pink-500 to-yellow-500 hover:opacity-95 rounded-full shadow-md shadow-blue-500/20 hover:shadow-pink-500/30 hover:-translate-y-0.5 transition-all group"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Mobile Friendly Right Header Buttons */}
            <div className="flex items-center gap-1.5 lg:hidden">
              {/* Call Now Button Mobile */}
              <a
                href={COMPANY_INFO.phoneLink}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-extrabold text-slate-800 bg-white border border-slate-200 rounded-full shadow-2xs active:scale-95 transition-transform"
                aria-label="Call Now"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden xs:inline">Call</span>
              </a>

              {/* WhatsApp Button Mobile */}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-extrabold text-white bg-emerald-600 rounded-full shadow-2xs active:scale-95 transition-transform"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span className="hidden xs:inline">WhatsApp</span>
              </a>

              {/* Enquiry Now Mobile Header Button */}
              <button
                onClick={() => handleNavClick('contact')}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-black text-white bg-gradient-to-r from-blue-600 via-pink-500 to-yellow-500 rounded-full shadow-xs active:scale-95 transition-transform"
              >
                <span>Enquire</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              {/* Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-800 bg-white/90 rounded-xl border border-slate-200 shadow-2xs focus:outline-none ml-0.5"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Only Header Options Bar (Services, Packages, Webinars) */}
          <div className="lg:hidden flex items-center justify-between gap-1.5 pt-2 mt-2 border-t border-slate-200/70">
            <button
              onClick={() => handleNavClick('services')}
              className={`flex-1 py-1 px-2 text-[11px] font-black rounded-full transition-all flex items-center justify-center gap-1 border ${
                currentPage === 'services'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-transparent text-slate-800 border-slate-300/80 active:bg-slate-200/50'
              }`}
            >
              <span>Services</span>
            </button>

            <button
              onClick={() => handleNavClick('packages')}
              className={`flex-1 py-1 px-2 text-[11px] font-black rounded-full transition-all flex items-center justify-center gap-1 border ${
                currentPage === 'packages'
                  ? 'bg-pink-600 text-white border-pink-600 shadow-xs'
                  : 'bg-transparent text-slate-800 border-slate-300/80 active:bg-slate-200/50'
              }`}
            >
              <span>Packages</span>
              <span className={`text-[8px] font-black px-1 py-0.1 rounded-full uppercase ${
                currentPage === 'packages' ? 'bg-yellow-300 text-slate-950' : 'bg-pink-500 text-white'
              }`}>Hot</span>
            </button>

            <button
              onClick={() => handleNavClick('webinars')}
              className={`flex-1 py-1 px-2 text-[11px] font-black rounded-full transition-all flex items-center justify-center gap-1 border ${
                currentPage === 'webinars'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-transparent text-slate-800 border-slate-300/80 active:bg-slate-200/50'
              }`}
            >
              <span>Webinar</span>
              <span className={`text-[8px] font-black px-1 py-0.1 rounded-full uppercase ${
                currentPage === 'webinars' ? 'bg-yellow-300 text-slate-950' : 'bg-emerald-500 text-white'
              }`}>New</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex flex-col bg-slate-900/50 backdrop-blur-xl transition-all duration-300">
          <div className="mt-16 mx-3 sm:mx-4 bg-white/98 rounded-3xl p-5 shadow-2xl border border-slate-200/90 flex flex-col gap-3 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <Logo size="sm" onClick={() => handleNavClick('home')} />
              <span className="text-xs font-bold text-slate-400">Navigation Menu</span>
            </div>

            <div className="flex flex-col gap-1 my-1">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500 text-white font-semibold">
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Individual Action Buttons inside Mobile Menu Drawer */}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={COMPANY_INFO.phoneLink}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-extrabold text-sm bg-blue-600 text-white shadow-md shadow-blue-600/20"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now ({COMPANY_INFO.phoneFormatted})</span>
              </a>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-extrabold text-sm bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp Chat Direct</span>
              </a>

              <button
                onClick={() => handleNavClick('contact')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-black text-sm bg-gradient-to-r from-blue-600 via-pink-500 to-yellow-500 text-white shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Enquiry Now</span>
              </button>

              <button
                onClick={() => {
                  onOpenAIHelper();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs bg-amber-50 text-amber-900 border border-amber-200 mt-1"
              >
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>Launch AI Growth Helper</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

