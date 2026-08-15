import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS, COMPANY_INFO } from '../data/agencyData';
import { PortfolioProject, PageType } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Sparkles, ArrowRight, X, CheckCircle2, Eye, Tag } from 'lucide-react';

interface PortfolioPageProps {
  onNavigate: (page: PageType) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);

  const categories = ['All', ...Array.from(new Set(PORTFOLIO_PROJECTS.map((p) => p.category)))];

  const filteredProjects = PORTFOLIO_PROJECTS.filter((p) => {
    return selectedCategory === 'All' || p.category === selectedCategory;
  });

  return (
    <div className="pt-28 pb-20 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Breadcrumbs items={[{ label: 'Portfolio & Case Studies' }]} onNavigate={onNavigate} />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Case Studies & Client Showcase</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Our Client <span className="gradient-text-blue-purple">Work & Results</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Explore sample client concepts and real digital transformation projects delivered by Quantum Branding.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap glass-panel p-3 rounded-2xl border border-slate-200/80">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white/80 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="glass-card rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Image Preview Container */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {project.category}
                </div>

                {project.isDemo && (
                  <div className="absolute top-3 right-3 bg-indigo-600/90 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-md">
                    Sample Showcase
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-display font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {project.title}
                </h3>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{project.result}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                {/* Services Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.services.map((s, idx) => (
                    <span key={idx} className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-6 pt-0">
              <button
                onClick={() => setActiveModalProject(project)}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 group/btn"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Case Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="h-64 rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  {activeModalProject.category}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  {activeModalProject.result}
                </span>
              </div>

              <h2 className="text-2xl font-display font-extrabold text-slate-900">
                {activeModalProject.title}
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                {activeModalProject.description}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Services Provided:</h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.services.map((serv, idx) => (
                    <span key={idx} className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100">
                      {serv}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setActiveModalProject(null);
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-xs bg-indigo-600 text-white hover:bg-indigo-500 transition-colors text-center"
                >
                  Start a Similar Project
                </button>

                <a
                  href={`${COMPANY_INFO.whatsappLink}?text=${encodeURIComponent(`Hello Trayam Tiwari! I checked out the ${activeModalProject.title} showcase in your portfolio. I want similar results for my business.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-5 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-500 transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
