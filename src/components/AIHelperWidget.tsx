import React, { useState } from 'react';
import { Sparkles, X, ArrowRight, CheckCircle2, RotateCcw, Bot, Loader2, Zap } from 'lucide-react';
import { AIRecommendation, PageType } from '../types';
import { COMPANY_INFO, getWhatsAppUrl } from '../data/agencyData';

interface AIHelperWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageType) => void;
}

export const AIHelperWidget: React.FC<AIHelperWidgetProps> = ({ isOpen, onClose, onNavigate }) => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    businessType: '',
    websiteStatus: '',
    primaryProblem: '',
    mainGoal: '',
    budgetRange: '',
  });

  if (!isOpen) return null;

  const businessTypes = [
    'Restaurant / Cafe / Food',
    'Real Estate / Construction',
    'Clinic / Healthcare / Doctor',
    'Coaching / Education / Institute',
    'Fitness / Gym / Salon',
    'Local Retail Store',
    'Corporate / Professional Services',
    'E-commerce / Online Store',
  ];

  const websiteStatuses = [
    'No, I do not have a website yet',
    'Yes, but it looks outdated / needs redesign',
    'Yes, but it gets low traffic / zero leads',
    'Yes, I want to convert more visitors',
  ];

  const problems = [
    'Low online visibility & hard to find on Google',
    'Lack of steady leads and customer inquiries',
    'Inconsistent social media posts & zero reels',
    'Outdated visual brand identity',
    'Manual customer follow-ups & zero automation',
  ];

  const goals = [
    'More paying customers & leads',
    'Better brand prestige & premium look',
    'Higher Google search visibility & map rankings',
    'Automated WhatsApp inquiry capture',
  ];

  const budgets = [
    '₹3,000–₹10,000 (Basic Assets)',
    '₹10,000–₹25,000 (Professional Web)',
    '₹25,000–₹50,000 (Growth Package)',
    '₹50,000+ (Premium Package)',
  ];

  const handleSelectOption = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (step < 5) {
      setStep(step + 1);
    } else {
      generateRecommendation({ ...formData, [key]: value });
    }
  };

  const generateRecommendation = async (data: typeof formData) => {
    setLoading(true);
    setStep(6); // Step 6 is Analysis/Results
    try {
      const res = await fetch('/api/ai-helper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success && result.recommendation) {
        setRecommendation(result.recommendation);
      } else {
        throw new Error('Failed to fetch recommendation');
      }
    } catch {
      // Fallback local logic
      setRecommendation({
        recommendedPackage: 'GROWTH PACKAGE (₹30,000)',
        primaryService: 'Website Development & Social Media Reels',
        additionalServices: ['WhatsApp Lead System', 'Local SEO Setup'],
        summaryReasoning: `Based on your goal for ${data.businessType || 'your business'} to solve ${data.primaryProblem || 'lead generation'}, a multi-channel digital growth engine is recommended.`,
        estimatedTimeline: '7 – 10 Days',
        actionPlan: [
          'Connect with Founder Trayam Tiwari via WhatsApp',
          'Review custom design wireframe & content strategy',
          'Deploy web assets and activate local leads system',
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setRecommendation(null);
    setFormData({
      businessType: '',
      websiteStatus: '',
      primaryProblem: '',
      mainGoal: '',
      budgetRange: '',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-panel-dark rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-white/20 overflow-hidden max-h-[90vh] flex flex-col justify-between">
        
        {/* Top Floating Glass Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white shadow-md">
              <Bot className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-lg text-white flex items-center gap-2">
                <span>Quantum AI Growth Helper</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-400/30">
                  Gemini Powered
                </span>
              </h3>
              <p className="text-xs text-slate-300">Find the exact digital solution your business needs</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Steps Body */}
        <div className="my-6 overflow-y-auto pr-1 flex-1">
          {step <= 5 && (
            <div className="space-y-4">
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-xs text-indigo-300 font-bold mb-2">
                <span>Question {step} of 5</span>
                <span>{Math.round((step / 5) * 100)}% Completed</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 transition-all duration-300"
                  style={{ width: `${(step / 5) * 100}%` }}
                ></div>
              </div>

              {/* Step 1: Business Type */}
              {step === 1 && (
                <div>
                  <h4 className="text-xl font-display font-bold text-white mb-4">
                    1. What type of business do you run?
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {businessTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => handleSelectOption('businessType', type)}
                        className="p-3.5 text-left text-sm font-semibold rounded-xl bg-slate-800/80 hover:bg-indigo-600/60 border border-white/10 hover:border-indigo-400/50 transition-all duration-200 flex items-center justify-between group"
                      >
                        <span>{type}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Website Status */}
              {step === 2 && (
                <div>
                  <h4 className="text-xl font-display font-bold text-white mb-4">
                    2. Do you currently have an active website?
                  </h4>
                  <div className="space-y-2.5">
                    {websiteStatuses.map((status) => (
                      <button
                        key={status}
                        onClick={() => handleSelectOption('websiteStatus', status)}
                        className="w-full p-4 text-left text-sm font-semibold rounded-xl bg-slate-800/80 hover:bg-indigo-600/60 border border-white/10 hover:border-indigo-400/50 transition-all flex items-center justify-between group"
                      >
                        <span>{status}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Primary Problem */}
              {step === 3 && (
                <div>
                  <h4 className="text-xl font-display font-bold text-white mb-4">
                    3. What is your biggest digital challenge right now?
                  </h4>
                  <div className="space-y-2.5">
                    {problems.map((prob) => (
                      <button
                        key={prob}
                        onClick={() => handleSelectOption('primaryProblem', prob)}
                        className="w-full p-4 text-left text-sm font-semibold rounded-xl bg-slate-800/80 hover:bg-indigo-600/60 border border-white/10 hover:border-indigo-400/50 transition-all flex items-center justify-between group"
                      >
                        <span>{prob}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Goal */}
              {step === 4 && (
                <div>
                  <h4 className="text-xl font-display font-bold text-white mb-4">
                    4. What is your primary objective for Quantum Branding?
                  </h4>
                  <div className="space-y-2.5">
                    {goals.map((goal) => (
                      <button
                        key={goal}
                        onClick={() => handleSelectOption('mainGoal', goal)}
                        className="w-full p-4 text-left text-sm font-semibold rounded-xl bg-slate-800/80 hover:bg-indigo-600/60 border border-white/10 hover:border-indigo-400/50 transition-all flex items-center justify-between group"
                      >
                        <span>{goal}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Budget */}
              {step === 5 && (
                <div>
                  <h4 className="text-xl font-display font-bold text-white mb-4">
                    5. What is your comfortable budget range?
                  </h4>
                  <div className="space-y-2.5">
                    {budgets.map((b) => (
                      <button
                        key={b}
                        onClick={() => handleSelectOption('budgetRange', b)}
                        className="w-full p-4 text-left text-sm font-semibold rounded-xl bg-slate-800/80 hover:bg-indigo-600/60 border border-white/10 hover:border-indigo-400/50 transition-all flex items-center justify-between group"
                      >
                        <span>{b}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <Loader2 className="w-12 h-12 text-indigo-400 animate-spin" />
              <div>
                <h4 className="text-lg font-bold text-white">Generating AI Growth Analysis...</h4>
                <p className="text-xs text-slate-300 mt-1">Analyzing your business goals and matching the optimal package</p>
              </div>
            </div>
          )}

          {/* Step 6: AI Results */}
          {recommendation && !loading && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-900/80 to-purple-900/80 border border-indigo-400/40">
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  Recommended Package
                </div>
                <div className="text-2xl font-display font-black text-white mt-1">
                  {recommendation.recommendedPackage}
                </div>
                <div className="text-xs text-indigo-200 mt-1">
                  Estimated Timeline: <span className="font-bold text-white">{recommendation.estimatedTimeline}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-white/10 space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase">Strategic Rationale</div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {recommendation.summaryReasoning}
                </p>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-400 uppercase mb-2">Recommended Action Steps:</div>
                <div className="space-y-2">
                  {recommendation.actionPlan.map((plan, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{plan}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between shrink-0">
          {step > 1 && step <= 5 && (
            <button
              onClick={() => setStep(step - 1)}
              className="text-xs font-semibold text-slate-400 hover:text-white"
            >
              &larr; Back
            </button>
          )}

          {recommendation && (
            <button
              onClick={resetQuiz}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart Quiz</span>
            </button>
          )}

          {recommendation ? (
            <div className="flex items-center gap-2">
              <a
                href={getWhatsAppUrl(`Hello Trayam Tiwari! I ran the Quantum AI Growth Helper for my ${formData.businessType || 'business'}. Recommended: ${recommendation.recommendedPackage}. Let's get started!`)}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 text-white hover:bg-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <span>WhatsApp Trayam Tiwari</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onNavigate('contact');
                }}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
              >
                <span>Book Consultation</span>
              </button>
            </div>
          ) : (
            <div className="text-xs text-slate-400 font-medium">
              Quantum Branding • Founder Trayam Tiwari
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
