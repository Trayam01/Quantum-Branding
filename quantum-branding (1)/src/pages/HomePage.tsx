import React from 'react';
import { HeroVisual } from '../components/HeroVisual';
import { COMPANY_INFO, SERVICES_LIST, WHY_CHOOSE_US, PROCESS_STEPS } from '../data/agencyData';
import { PageType } from '../types';
import { 
  ArrowRight, MessageSquare, ShieldCheck, Sparkles, CheckCircle2, 
  Globe, Share2, TrendingUp, Search, Palette, Bot, Phone,
  Sliders, Target, BarChart3, UserCheck, Headphones
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
  onOpenAIHelper: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenAIHelper }) => {
  const serviceIconMap: Record<string, React.ReactNode> = {
    Globe: <Globe className="w-6 h-6 text-blue-600" />,
    Share2: <Share2 className="w-6 h-6 text-pink-600" />,
    TrendingUp: <TrendingUp className="w-6 h-6 text-indigo-600" />,
    Search: <Search className="w-6 h-6 text-cyan-600" />,
    Palette: <Palette className="w-6 h-6 text-violet-600" />,
    Bot: <Bot className="w-6 h-6 text-emerald-600" />,
  };

  const whyIconMap: Record<string, React.ReactNode> = {
    Sliders: <Sliders className="w-5 h-5 text-indigo-600" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-blue-600" />,
    Sparkles: <Sparkles className="w-5 h-5 text-purple-600" />,
    Target: <Target className="w-5 h-5 text-rose-600" />,
    BarChart3: <BarChart3 className="w-5 h-5 text-emerald-600" />,
    UserCheck: <UserCheck className="w-5 h-5 text-amber-600" />,
    Headphones: <Headphones className="w-5 h-5 text-cyan-600" />,
  };

  return (
    <div className="space-y-20 pb-16">
      {/* HERO SECTION */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
        {/* Background Gradient Blurs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Founder Tag & AI Badge */}
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold border border-yellow-400/40 shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Founded & Led by {COMPANY_INFO.founder}</span>
                </div>

                <button
                  onClick={onOpenAIHelper}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-pink-200 text-slate-900 text-xs font-bold hover:bg-white transition-colors shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400 animate-pulse" />
                  <span className="bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent font-black">AI Growth Helper</span>
                </button>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-slate-900 tracking-tight leading-[1.1]">
                Build a Brand That <span className="gradient-text-blue-pink-yellow">Gets Noticed.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {COMPANY_INFO.subheadline}
              </p>

              {/* Hero CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <button
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-extrabold text-base text-white bg-gradient-to-r from-blue-600 via-pink-500 to-yellow-500 hover:opacity-95 shadow-xl shadow-blue-500/25 hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-white" />
                </button>

                <a
                  href={COMPANY_INFO.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-7 py-4 rounded-full font-bold text-base text-slate-900 bg-white/95 hover:bg-white border border-slate-200 hover:border-pink-300 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5"
                >
                  <MessageSquare className="w-5 h-5 text-pink-500 fill-pink-500/10" />
                  <span>WhatsApp Us</span>
                </a>
              </div>

              {/* Key Trust Highlights */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>High-Converting Websites</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>High-Retention Reels</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 col-span-2 sm:col-span-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Direct Founder Support</span>
                </div>
              </div>

            </div>

            {/* Right Hero Visual Mockup Column */}
            <div className="lg:col-span-5">
              <HeroVisual />
            </div>

          </div>
        </div>
      </section>

      {/* TRUST / VALUE SECTION: "Everything Your Business Needs to Grow Online" */}
      <section className="relative py-16 bg-white/60 backdrop-blur-md border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              End-to-End Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-slate-900 mt-3">
              Everything Your Business Needs to Grow Online
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              From fast websites to viral reel creation and automated lead funnels.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_LIST.map((service) => (
              <div
                key={service.id}
                onClick={() => {
                  onNavigate('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="glass-card p-6 rounded-2xl cursor-pointer group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-indigo-50 border border-slate-200/80 group-hover:border-indigo-200 flex items-center justify-center transition-colors mb-4">
                    {serviceIconMap[service.icon] || <Globe className="w-6 h-6 text-indigo-600" />}
                  </div>

                  <h3 className="text-xl font-display font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                  <span>Explore Deliverables</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY BUSINESSES CHOOSE QUANTUM BRANDING */}
      <section className="relative py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              The Quantum Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-3">
              Why Businesses Choose Quantum Branding
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Transparent, business-focused digital execution built around your ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-300 transition-all">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-4">
                  {whyIconMap[item.icon] || <ShieldCheck className="w-5 h-5 text-indigo-600" />}
                </div>
                <h3 className="text-lg font-display font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS PREVIEW SECTION */}
      <section className="relative py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Methodology
            </span>
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mt-3">
              Discover &rarr; Plan &rarr; Build &rarr; Launch &rarr; Grow
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Our proven 6-step roadmap to transform your digital brand.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                onClick={() => {
                  onNavigate('process');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="glass-card p-4 rounded-2xl text-center cursor-pointer group hover:border-indigo-400 transition-all"
              >
                <div className="text-2xl font-display font-black text-indigo-600 group-hover:scale-110 transition-transform">
                  {step.number}
                </div>
                <div className="text-sm font-bold text-slate-900 mt-1">{step.title}</div>
                <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">{step.subtitle}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => {
                onNavigate('process');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800"
            >
              <span>View Full Process Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* FINAL STRONG CTA SECTION */}
      <section className="relative py-20 mx-4 sm:mx-8 lg:mx-auto max-w-7xl rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-14 overflow-hidden shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Ready to Grow?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight">
            Ready to Take Your Business Online?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Get a tailored strategy roadmap and a free consultation directly with Founder Trayam Tiwari.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                onNavigate('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:opacity-95 shadow-lg shadow-indigo-500/25 transition-all"
            >
              Get a Free Consultation
            </button>

            <a
              href={COMPANY_INFO.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Quantum Branding ({COMPANY_INFO.phoneFormatted})</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
