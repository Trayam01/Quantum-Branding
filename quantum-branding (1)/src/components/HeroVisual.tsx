import React from 'react';
import { TrendingUp, Globe, Sparkles, CheckCircle2, Eye, Award, Zap } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-lg lg:max-w-none mx-auto aspect-square sm:aspect-[4/3] lg:aspect-square flex items-center justify-center p-4">
      {/* Background Liquid Gradient Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] bg-gradient-to-tr from-sky-300/20 via-rose-200/20 to-amber-200/25 rounded-full blur-3xl animate-pulse-glow pointer-events-none"></div>
      <div className="absolute top-1/4 right-10 w-48 h-48 bg-amber-100/35 rounded-full blur-2xl animate-float-slow pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-52 h-52 bg-rose-100/25 rounded-full blur-2xl animate-float-medium pointer-events-none"></div>

      {/* Main Glass Mockup Container */}
      <div className="relative w-full h-full glass-panel rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-2xl border border-white/80 overflow-hidden">
        
        {/* Top Window Controls Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/60">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-pink-500/90 inline-block shadow-xs"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400/90 inline-block shadow-xs"></span>
            <span className="w-3 h-3 rounded-full bg-blue-500/90 inline-block shadow-xs"></span>
            <span className="ml-2 text-xs font-mono font-semibold text-slate-600 bg-white/80 px-2.5 py-0.5 rounded-full border border-slate-200/80">
              quantumbranding.in
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900 bg-yellow-300/80 px-2.5 py-1 rounded-full border border-yellow-400 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
            <span>Digital Engine</span>
          </div>
        </div>

        {/* Center Growth Analytics Graph */}
        <div className="my-auto py-4">
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Client Brand Growth Score
              </div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 flex items-center gap-2">
                <span>+248.5%</span>
                <span className="text-xs font-bold text-slate-900 bg-yellow-300/90 px-2.5 py-0.5 rounded-full border border-yellow-400 flex items-center gap-1 shadow-xs">
                  <TrendingUp className="w-3 h-3 text-blue-700" /> Live
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500 font-medium">Total Reach</div>
              <div className="text-sm font-black text-blue-600">142,800+</div>
            </div>
          </div>

          {/* Interactive SVG Curve Graph */}
          <div className="relative h-28 sm:h-36 w-full bg-white/70 rounded-2xl p-2 border border-slate-200/80 overflow-hidden flex items-end shadow-xs">
            <svg viewBox="0 0 400 120" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="heroGraphGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,100 Q 80,85 140,55 T 260,35 T 400,10 L 400,120 L 0,120 Z"
                fill="url(#heroGraphGradient)"
              />
              <path
                d="M 0,100 Q 80,85 140,55 T 260,35 T 400,10"
                fill="none"
                stroke="#2563eb"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="260" cy="35" r="5" fill="#eab308" className="animate-ping" />
              <circle cx="260" cy="35" r="6" fill="#ec4899" stroke="#ffffff" strokeWidth="2" />
              <circle cx="400" cy="10" r="7" fill="#eab308" stroke="#ffffff" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Bottom Feature Pill Grid */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200/60">
          <div className="glass-card p-2.5 rounded-xl text-center bg-white/80">
            <div className="text-[10px] text-slate-500 font-bold uppercase">Website</div>
            <div className="text-xs sm:text-sm font-extrabold text-blue-600 flex items-center justify-center gap-1">
              <Globe className="w-3.5 h-3.5" /> High-Speed
            </div>
          </div>
          <div className="glass-card p-2.5 rounded-xl text-center bg-white/80">
            <div className="text-[10px] text-slate-500 font-bold uppercase">Reels & SMM</div>
            <div className="text-xs sm:text-sm font-extrabold text-pink-600 flex items-center justify-center gap-1">
              <Eye className="w-3.5 h-3.5" /> Organic Reach
            </div>
          </div>
          <div className="glass-card p-2.5 rounded-xl text-center bg-white/80">
            <div className="text-[10px] text-slate-500 font-bold uppercase">Lead System</div>
            <div className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-yellow-500 fill-yellow-400" /> WhatsApp
            </div>
          </div>
        </div>

        {/* Floating Glass Card - Top Right */}
        <div className="absolute -top-3 -right-3 glass-panel p-3.5 rounded-2xl border border-white/95 shadow-xl hidden sm:flex items-center gap-3 animate-float-slow">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-blue-600 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Quantum AI Helper</div>
            <div className="text-[10px] text-blue-600 font-bold">Smart Recommendation</div>
          </div>
        </div>

        {/* Floating Glass Card - Bottom Left */}
        <div className="absolute -bottom-3 -left-3 glass-panel p-3 rounded-2xl border border-white/95 shadow-xl hidden sm:flex items-center gap-2.5 animate-float-medium">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-pink-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <Award className="w-4 h-4 text-yellow-300" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-slate-900">B2B Growth Engine</div>
            <div className="text-[10px] text-pink-600 font-bold">Led by Trayam Tiwari</div>
          </div>
        </div>

      </div>
    </div>
  );
};
