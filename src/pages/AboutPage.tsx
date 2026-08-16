import React from 'react';
import { COMPANY_INFO } from '../data/agencyData';
import { PageType } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShieldCheck, Sparkles, Heart, Target, Lightbulb, Compass, Users, Phone, Mail, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageType) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const values = [
    { title: 'Creativity', desc: 'Sleek visual aesthetics, liquid glass layouts, and high-engagement content tailored for modern audiences.', icon: <Lightbulb className="w-5 h-5 text-indigo-600" /> },
    { title: 'Transparency', desc: 'Clear Indian Rupee pricing, honest timelines, zero hidden charges, and direct communication.', icon: <ShieldCheck className="w-5 h-5 text-blue-600" /> },
    { title: 'Strategy', desc: 'Every design and video reel is built around a clear commercial conversion goal for your business.', icon: <Target className="w-5 h-5 text-rose-600" /> },
    { title: 'Affordability', desc: 'High-end agency grade execution packaged accessibly for ambitious growing enterprises.', icon: <Sparkles className="w-5 h-5 text-amber-600" /> },
    { title: 'Growth', desc: 'We focus on metrics that impact your revenue — lead volume, phone inquiries, and search rankings.', icon: <Compass className="w-5 h-5 text-emerald-600" /> },
    { title: 'Long-term Relationships', desc: 'We act as your dedicated digital growth partner far beyond initial website delivery.', icon: <Users className="w-5 h-5 text-violet-600" /> },
  ];

  return (
    <div className="pt-28 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Title Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Breadcrumbs items={[{ label: 'About Quantum Branding' }]} onNavigate={onNavigate} />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Vision & Leadership</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Building Brands. <span className="gradient-text-blue-purple">Creating Impact.</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Quantum Branding is a B2B digital solutions company founded and led by <span className="font-bold text-slate-900">{COMPANY_INFO.founder}</span>.
        </p>
      </div>

      {/* Founder Spotlight Card */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-2xl bg-white/90">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <div className="relative w-44 h-44 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-1">
              <div className="w-full h-full bg-slate-900 rounded-2xl flex flex-col items-center justify-center text-white p-4">
                <span className="font-display font-black text-3xl tracking-tight text-indigo-300">TT</span>
                <span className="text-xs font-semibold text-slate-300 mt-1">{COMPANY_INFO.founder}</span>
                <span className="text-[10px] text-slate-400">Founder</span>
              </div>
            </div>

            <h3 className="text-2xl font-display font-bold text-slate-900 mt-4">
              {COMPANY_INFO.founder}
            </h3>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 mt-1">
              {COMPANY_INFO.title}
            </span>

            <div className="flex items-center gap-2 mt-4">
              <a
                href={COMPANY_INFO.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
              >
                Direct WhatsApp
              </a>
              <a
                href={COMPANY_INFO.phoneLink}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
              >
                Call Line
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-2xl font-display font-bold text-slate-900">
              Transforming B2B Brand Identities Across India
            </h3>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Founded with a clear mission to bridge the gap between high-end digital agency quality and accessible pricing for growing Indian enterprises, Quantum Branding delivers end-to-end digital capabilities under one roof.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Whether you need a high-speed conversion website, engaging video reels for Instagram and YouTube, search engine ranking strategies, or automated WhatsApp inquiry flows, our team crafts every asset with meticulous precision.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                <div className="text-xs text-slate-500 font-bold uppercase">Direct Oversight</div>
                <div className="text-sm font-extrabold text-indigo-900">100% Founder Managed</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                <div className="text-xs text-slate-500 font-bold uppercase">Core Focus</div>
                <div className="text-sm font-extrabold text-emerald-900">B2B Leads & Conversion</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Values Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-display font-extrabold text-slate-900">
            Our Core Principles
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            The foundation behind every project we build for our partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                {v.icon}
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900 mb-2">{v.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center pt-8">
        <button
          onClick={() => {
            onNavigate('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-8 py-4 rounded-full font-bold text-sm bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-xl shadow-indigo-500/25 inline-flex items-center gap-2 group"
        >
          <span>Start a Project with Trayam Tiwari</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
