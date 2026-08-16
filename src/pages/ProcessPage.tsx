import React from 'react';
import { PROCESS_STEPS, COMPANY_INFO } from '../data/agencyData';
import { PageType } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface ProcessPageProps {
  onNavigate: (page: PageType) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-28 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Breadcrumbs items={[{ label: 'Our 6-Step Growth Process' }]} onNavigate={onNavigate} />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Proven Execution Methodology</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Our 6-Step Digital <span className="gradient-text-blue-purple">Growth Process</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          From initial discovery to post-launch marketing and search optimization, we guide your business through a seamless transformation.
        </p>
      </div>

      {/* Interactive Process Steps Cards */}
      <div className="space-y-8 relative">
        {/* Connecting Vertical Line for large screens */}
        <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-pink-500 opacity-20 -translate-x-1/2 pointer-events-none"></div>

        {PROCESS_STEPS.map((step, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={step.number}
              className={`flex flex-col lg:flex-row items-center gap-8 ${
                isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content Card */}
              <div className="w-full lg:w-1/2">
                <div className="glass-panel p-8 rounded-3xl border border-slate-200/80 shadow-xl hover:border-indigo-300 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-display font-black text-indigo-600 bg-indigo-50 px-4 py-1 rounded-2xl border border-indigo-100">
                      {step.number}
                    </span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Phase {idx + 1} of 6
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-slate-900">
                    {step.title}
                  </h3>

                  <div className="text-xs font-semibold text-indigo-600 mt-0.5 mb-3">
                    {step.subtitle}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {step.description}
                  </p>

                  <div className="pt-4 border-t border-slate-100">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Deliverables:</div>
                    <div className="flex flex-wrap gap-2">
                      {step.deliverables.map((d, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100/80 px-3 py-1 rounded-lg">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Circle Marker */}
              <div className="hidden lg:flex w-12 h-12 rounded-full bg-slate-900 text-white font-display font-bold text-base items-center justify-center shrink-0 border-4 border-white shadow-xl z-10">
                {step.number}
              </div>

              {/* Empty Spacer Column */}
              <div className="hidden lg:block w-1/2"></div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="glass-panel p-8 rounded-3xl text-center space-y-4 max-w-3xl mx-auto border border-slate-200/80 shadow-xl">
        <h3 className="text-2xl font-display font-bold text-slate-900">
          Ready to Start Phase 01 Discover?
        </h3>
        <p className="text-sm text-slate-600">
          Connect directly with Founder Trayam Tiwari to schedule your brand discovery session.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              onNavigate('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-8 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg"
          >
            Start Discovery Session
          </button>
          <a
            href={COMPANY_INFO.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3.5 rounded-full font-bold text-sm bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
          >
            WhatsApp ({COMPANY_INFO.phoneFormatted})
          </a>
        </div>
      </div>
    </div>
  );
};
