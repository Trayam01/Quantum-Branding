import React from 'react';
import { SERVICES_LIST, COMPANY_INFO, getWhatsAppUrl } from '../data/agencyData';
import { PageType } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Globe, Share2, TrendingUp, Search, Palette, Bot, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageType) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const serviceIconMap: Record<string, React.ReactNode> = {
    Globe: <Globe className="w-7 h-7 text-blue-600" />,
    Share2: <Share2 className="w-7 h-7 text-pink-600" />,
    TrendingUp: <TrendingUp className="w-7 h-7 text-indigo-600" />,
    Search: <Search className="w-7 h-7 text-cyan-600" />,
    Palette: <Palette className="w-7 h-7 text-violet-600" />,
    Bot: <Bot className="w-7 h-7 text-emerald-600" />,
  };

  const serviceLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div className="pt-28 pb-20 space-y-16">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Breadcrumbs items={[{ label: 'B2B Digital Services' }]} onNavigate={onNavigate} />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Full-Spectrum Digital Capabilities</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Our B2B <span className="gradient-text-blue-purple">Digital Services</span>
        </h1>

        <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Comprehensive digital solutions engineered by Quantum Branding to help modern Indian businesses build prestige, generate leads, and automate client acquisition.
        </p>
      </section>

      {/* Services Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES_LIST.map((service, index) => (
            <div
              key={service.id}
              className="glass-panel p-8 rounded-3xl border border-slate-200/80 shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                      {serviceIconMap[service.icon] || <Globe className="w-6 h-6 text-indigo-600" />}
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                        Category {serviceLetters[index]}
                      </span>
                      <h2 className="text-2xl font-display font-extrabold text-slate-900 mt-0.5">
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Starting From</span>
                    <span className="text-sm font-extrabold text-indigo-600">{service.startingPrice}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                {/* Deliverables List */}
                <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/60 mb-6 space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Deliverables & Features Included:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex-1 py-3 px-5 rounded-xl font-bold text-xs text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-md flex items-center justify-center gap-2 group"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href={getWhatsAppUrl(`Hello Quantum Branding! I am interested in ${service.title} (${service.startingPrice}). Please share details.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl font-bold text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
