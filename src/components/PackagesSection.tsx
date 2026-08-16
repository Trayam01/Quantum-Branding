import React from 'react';
import { DIGITAL_PACKAGES, PACKAGE_COMPARISON_MATRIX, getWhatsAppUrl } from '../data/agencyData';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap, Star } from 'lucide-react';
import { PageType } from '../types';

interface PackagesSectionProps {
  onSelectPackage?: (packageName: string) => void;
  onNavigate: (page: PageType) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackage, onNavigate }) => {
  const handlePackageClick = (packageName: string) => {
    if (onSelectPackage) {
      onSelectPackage(packageName);
    }
    onNavigate('contact');
  };

  return (
    <section id="packages-section" className="relative py-20 bg-gradient-to-b from-slate-50 via-indigo-50/30 to-slate-50 overflow-hidden">
      {/* Liquid background shapes */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-300/40 via-pink-200/40 to-blue-200/40 border border-pink-200 mb-4 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-900">
              Flagship Business Offerings
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
            Complete Digital <span className="gradient-text-blue-pink-yellow">Growth Packages</span>
          </h2>

          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            All-in-one digital growth engines engineered to establish your online authority, create viral video content, and capture qualified business leads.
          </p>
        </div>

        {/* Three Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-20">
          {DIGITAL_PACKAGES.map((pkg) => {
            const isPopular = pkg.popular;
            const isPremium = pkg.id === 'premium-package';

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between ${
                  isPopular
                    ? 'glass-panel p-6 sm:p-8 border-2 border-pink-500/80 shadow-2xl shadow-pink-500/15 ring-4 ring-pink-500/10 scale-[1.02] bg-white/95 z-10'
                    : 'glass-panel p-6 sm:p-8 border border-slate-200/80 shadow-xl bg-white/85 hover:bg-white'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-600 text-white text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-pink-500/25 flex items-center gap-1.5 whitespace-nowrap">
                    <Star className="w-3.5 h-3.5 fill-current text-yellow-300" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                <div>
                  {/* Card Title & Tagline */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 font-medium leading-snug">{pkg.tagline}</p>
                    </div>

                    <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${pkg.colorTheme} text-white shadow-md shrink-0`}>
                      <Zap className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Pricing Emphasis */}
                  <div className="my-5 p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl sm:text-3xl font-display font-black tracking-tight">
                        {pkg.formattedPrice}
                      </span>
                      <span className="text-[10px] text-slate-300 block mt-0.5">Transparent Investment</span>
                    </div>
                    <span className="text-[10px] font-extrabold bg-white/10 px-2.5 py-1 rounded-full text-yellow-300 border border-white/20">
                      No Hidden Costs
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-6">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                      Key Highlights:
                    </div>
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                          isPopular ? 'bg-pink-600 text-white' : isPremium ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                        }`}>
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="text-sm font-semibold text-slate-800">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Action Buttons */}
                <div className="pt-5 border-t border-slate-200/80 flex flex-col gap-2.5">
                  <button
                    onClick={() => handlePackageClick(pkg.name)}
                    className={`w-full py-3.5 px-5 rounded-2xl font-bold text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 group ${
                      isPopular
                        ? 'bg-gradient-to-r from-blue-600 via-pink-500 to-yellow-500 text-white hover:opacity-95 shadow-pink-500/25'
                        : isPremium
                        ? 'bg-slate-900 text-white hover:bg-slate-800'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href={getWhatsAppUrl(`Hello Quantum Branding! I am interested in the ${pkg.name} (${pkg.formattedPrice}). Please share details.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-2xl font-bold text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100/80 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Package Comparison Table */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl bg-white/80">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-2xl font-display font-bold text-slate-900">
              Package Feature Comparison Matrix
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Compare all 3 packages side-by-side to choose the best fit for your business goals.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-4 px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Features & Deliverables</th>
                  <th className="py-4 px-4 text-xs font-extrabold text-slate-800 bg-slate-100 rounded-t-xl text-center">STARTER (₹15,000)</th>
                  <th className="py-4 px-4 text-xs font-extrabold text-blue-700 bg-blue-50 rounded-t-xl text-center">GROWTH (₹30,000)</th>
                  <th className="py-4 px-4 text-xs font-extrabold text-pink-700 bg-pink-50 rounded-t-xl text-center">PREMIUM (₹50,000)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PACKAGE_COMPARISON_MATRIX.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 text-sm font-semibold text-slate-800">{row.feature}</td>
                    <td className="py-3.5 px-4 text-xs font-medium text-slate-600 bg-slate-50/50 text-center">{row.starter}</td>
                    <td className="py-3.5 px-4 text-xs font-semibold text-blue-900 bg-blue-50/30 text-center">{row.growth}</td>
                    <td className="py-3.5 px-4 text-xs font-extrabold text-pink-900 bg-pink-50/30 text-center">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Direct execution overseen by Founder Trayam Tiwari.</span>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="text-blue-600 font-bold hover:underline flex items-center gap-1"
            >
              Need a custom scope? Contact Quantum Branding &rarr;
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

