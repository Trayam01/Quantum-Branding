import React, { useState } from 'react';
import { PageType } from '../types';
import { COMPANY_INFO, getWhatsAppUrl } from '../data/agencyData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  FileText, RotateCcw, AlertTriangle, ShieldCheck, Mail, MessageSquare, 
  Search, ArrowRight, Printer, CheckCircle2, ChevronRight, Clock, HelpCircle, Lock
} from 'lucide-react';

interface LegalPageProps {
  initialType?: 'terms' | 'refund-policy' | 'return-policy' | 'disclaimer';
  onNavigate: (page: PageType) => void;
}

type LegalTab = 'terms' | 'refund-policy' | 'return-policy' | 'disclaimer';

export const LegalPage: React.FC<LegalPageProps> = ({ initialType = 'terms', onNavigate }) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialType);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (tab: LegalTab) => {
    setActiveTab(tab);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <Breadcrumbs items={[{ label: 'Legal Terms & Governance' }]} onNavigate={onNavigate} />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official Legal & Governance Center</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 tracking-tight">
            Legal Terms & <span className="gradient-text-blue-pink-yellow">Policies</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Transparency, trust, and client security are fundamental to Quantum Branding. Read our comprehensive policies governing our website, digital services, packages, and webinars.
          </p>

          <div className="flex items-center justify-center gap-4 text-xs text-slate-500 font-medium pt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              Last Updated: August 2026
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-500" />
              Governed under IT Act & Indian Law
            </span>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="mb-10 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs">
            <button
              onClick={() => handleTabChange('terms')}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-black text-xs transition-all ${
                activeTab === 'terms'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Terms & Conditions</span>
            </button>

            <button
              onClick={() => handleTabChange('refund-policy')}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-black text-xs transition-all ${
                activeTab === 'refund-policy'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Refund Policy</span>
            </button>

            <button
              onClick={() => handleTabChange('return-policy')}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-black text-xs transition-all ${
                activeTab === 'return-policy'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <RotateCcw className="w-4 h-4 text-pink-400" />
              <span>Return Policy</span>
            </button>

            <button
              onClick={() => handleTabChange('disclaimer')}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-black text-xs transition-all ${
                activeTab === 'disclaimer'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Disclaimer</span>
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Sidebar Table of Contents & Print Button */}
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-28">
            <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 bg-white">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                <span>Document Navigator</span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                  600+ Words
                </span>
              </h3>

              <div className="space-y-1 text-xs font-semibold">
                <button
                  onClick={() => handleTabChange('terms')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all ${
                    activeTab === 'terms' ? 'bg-blue-50 text-blue-700 font-extrabold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Terms & Conditions</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </button>

                <button
                  onClick={() => handleTabChange('refund-policy')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all ${
                    activeTab === 'refund-policy' ? 'bg-emerald-50 text-emerald-700 font-extrabold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Refund Policy</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </button>

                <button
                  onClick={() => handleTabChange('return-policy')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all ${
                    activeTab === 'return-policy' ? 'bg-pink-50 text-pink-700 font-extrabold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Return Policy</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </button>

                <button
                  onClick={() => handleTabChange('disclaimer')}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all ${
                    activeTab === 'disclaimer' ? 'bg-amber-50 text-amber-700 font-extrabold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Disclaimer</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </button>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={handlePrint}
                  className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
              </div>
            </div>

            {/* Founder Legal Contact Panel */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 bg-gradient-to-b from-slate-900 to-indigo-950 text-white space-y-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-yellow-400" />
                <h4 className="text-xs font-black uppercase tracking-wider text-yellow-300">
                  Legal Queries & Support
                </h4>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Have specific contractual, licensing, or compliance questions regarding your project?
              </p>

              <div className="pt-1 space-y-2">
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 border border-white/10 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-300" />
                  <span className="truncate">{COMPANY_INFO.email}</span>
                </a>

                <a
                  href={getWhatsAppUrl("Hello Quantum Branding Legal Team! I have a formal legal or contract query.")}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp Legal Support</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Main Policy Text Content Area */}
          <div className="lg:col-span-3 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-md">
            
            {/* TERMS AND CONDITIONS CONTENT */}
            {activeTab === 'terms' && (
              <article className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm leading-relaxed">
                <div className="border-b border-slate-200 pb-6 mb-6">
                  <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    Document Ref: QB-TC-2026-V1
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-3">
                    Terms & Conditions of Service
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Effective Date: January 1, 2026 | Last Revised: August 2026 | Publisher: Quantum Branding ({COMPANY_INFO.founder})
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs text-slate-600 font-medium">
                  <strong>Summary Notice:</strong> By accessing our website (quantumbranding.com), enrolling in our packages, registering for our webinars (Free or 1-on-1 Paid), or contracting our digital marketing, web design, SEO, and video creation services, you agree to be bound by these Terms and Conditions. Please review them thoroughly before engaging our services.
                </div>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">1</span>
                    Agreement to Terms & Scope of Services
                  </h3>
                  <p>
                    Quantum Branding ("Company", "We", "Us", or "Our"), founded and directed by {COMPANY_INFO.founder}, provides digital marketing solutions, bespoke website development, search engine optimization (SEO), Meta and Google advertisement campaign execution, high-retention video production, automation setup, digital growth packages, and educational masterclasses/webinars.
                  </p>
                  <p>
                    These Terms & Conditions govern all transactions, digital interactions, service proposals, statement of work (SOW) documents, and online payments made to Quantum Branding. By completing a payment deposit, submitting an inquiry form, or signing a digital contract, you ("Client", "User", "You") explicitly accept these terms in full without modification.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">2</span>
                    Client Responsibilities & Asset Submission
                  </h3>
                  <p>
                    To ensure timely project execution and maintain strict launch schedules, the Client agrees to provide all necessary raw brand materials—including high-resolution logos, brand guidelines, product photography, copy text, administrative credentials (domain registrars, web hosting, social media page admin roles, ad account permissions), and necessary API tokens—within 7 business days of project initiation.
                  </p>
                  <p>
                    Delays in client asset submission, delayed approval feedback rounds exceeding 5 business days, or mid-project structural changes requested by the Client will automatically extend the final delivery deadline without penalty to Quantum Branding.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">3</span>
                    Fees, Invoicing & Payment Terms
                  </h3>
                  <p>
                    All project fees are specified in Indian Rupees (INR ₹) or US Dollars (USD $) depending on client billing origin. Service fees are structured into milestone installments: an upfront commitment deposit (typically 50% prior to design kickoff), milestone progress payments (30% upon beta staging preview), and a final balance payment (20% prior to final domain point-over, source code transfer, or credential handover).
                  </p>
                  <p>
                    Invoices are due upon receipt. Payments delayed beyond 7 calendar days from the due date will incur a late administrative penalty of 2% per week. Quantum Branding reserves the right to pause ongoing development or pause active ad campaigns if invoices remain overdue.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">4</span>
                    Intellectual Property & Code Ownership
                  </h3>
                  <p>
                    Upon full, 100% receipt of all contracted project fees and invoice balances, Quantum Branding transfers exclusive usage rights and ownership of the customized website design graphics, bespoke source code files, custom video edits, and created marketing collateral to the Client.
                  </p>
                  <p>
                    Quantum Branding retains full ownership of pre-existing proprietary frameworks, reusable open-source library wrappers, preliminary unaccepted design drafts, and internal agency tools. Furthermore, Quantum Branding reserves the right to showcase completed client work, screenshots, performance metrics, and logos in our agency portfolio, website, and promotional case studies, unless a formal Non-Disclosure Agreement (NDA) is executed prior to kickoff.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">5</span>
                    Revisions, Scope Creep & Milestone Sign-Offs
                  </h3>
                  <p>
                    Each custom package or custom project agreement specifies a predetermined number of included revision rounds (typically 2 to 3 iterations per design stage). Revisions must be submitted in a consolidated written list within 5 business days of receiving milestone previews.
                  </p>
                  <p>
                    Requests for new functional modules, additional web pages beyond agreement scope, custom e-commerce payment integrations not listed in SOW, or structural redesigns post milestone sign-off will be classified as "Scope Creep" and billed separately at our standard hourly rate of ₹1,500 / $35 per hour after client authorization.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">6</span>
                    Third-Party Software, Hosting & API Integrations
                  </h3>
                  <p>
                    Quantum Branding builds solutions utilizing industry-standard third-party services, including web hosting servers (Cloud Run, Vercel, Hostinger), domain registrars, payment gateways (Razorpay, Stripe), WhatsApp Business API providers, and Meta/Google advertising networks.
                  </p>
                  <p>
                    Quantum Branding shall not be held liable for temporary service outages, API version deprecations, account suspensions imposed by Meta or Google due to policy violations by the Client, or hosting server downtimes operated by external vendors beyond our direct control.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">7</span>
                    Limitation of Liability & Indemnification
                  </h3>
                  <p>
                    To the maximum extent permitted by applicable law, Quantum Branding, its founder {COMPANY_INFO.founder}, employees, and subcontractors shall not be liable for any indirect, incidental, special, or consequential damages, including loss of business profits, data corruption, or operational interruptions resulting from the use or inability to use our website, code, or marketing campaigns.
                  </p>
                  <p>
                    In all events, the total cumulative financial liability of Quantum Branding for any claims arising out of or related to an executed project shall not exceed the total amount of fees actually paid by the Client to Quantum Branding for the specific service in dispute during the preceding 3-month period.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">8</span>
                    Termination & Contract Cancellation
                  </h3>
                  <p>
                    Either party may terminate an active project contract by delivering a 14-day written notice via official email ({COMPANY_INFO.email}). In the event of contract cancellation by the Client, Quantum Branding will bill for all work completed up to the official termination date based on milestone completion percentages.
                  </p>
                  <p>
                    Upfront deposits paid for project initiation are non-refundable once design or development work has actively commenced, covering unrecoverable labor hours, strategy formulation, and server provisioning.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">9</span>
                    Governing Law & Dispute Resolution
                  </h3>
                  <p>
                    These Terms & Conditions shall be governed by, construed, and enforced in accordance with the laws of India, including the Information Technology Act, 2000, without regard to conflict of law principles.
                  </p>
                  <p>
                    In the event of any dispute, controversy, or claim arising out of or relating to our services, the parties agree to first attempt resolution through good-faith informal negotiations with Founder {COMPANY_INFO.founder}. If informal resolution fails within 30 days, disputes shall be submitted to binding arbitration under the Indian Arbitration and Conciliation Act. Jurisdiction shall rest exclusively in the competent courts located in {COMPANY_INFO.location}.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">10</span>
                    Updates to Terms & Contact Information
                  </h3>
                  <p>
                    Quantum Branding reserves the right to update or modify these Terms & Conditions at any time to reflect legislative changes, agency growth, or operational upgrades. Updated revisions will be posted on this page with an updated "Last Revised" date. Continued usage of our website or services constitutes acceptance of the modified terms.
                  </p>
                  <div className="bg-slate-100 p-4 rounded-xl text-xs space-y-1 font-semibold text-slate-800">
                    <div>Official Legal Entity: Quantum Branding</div>
                    <div>Founder & Director: {COMPANY_INFO.founder}</div>
                    <div>Official Email: {COMPANY_INFO.email}</div>
                    <div>Headquarters Location: {COMPANY_INFO.location}</div>
                  </div>
                </section>
              </article>
            )}

            {/* REFUND POLICY CONTENT */}
            {activeTab === 'refund-policy' && (
              <article className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm leading-relaxed">
                <div className="border-b border-slate-200 pb-6 mb-6">
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Document Ref: QB-RP-2026-V1
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-3">
                    Refund & Payment Policy
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Effective Date: January 1, 2026 | Last Revised: August 2026 | Publisher: Quantum Branding ({COMPANY_INFO.founder})
                  </p>
                </div>

                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200/80 text-xs text-emerald-900 font-medium">
                  <strong>Policy Overview:</strong> At Quantum Branding, we deliver highly customized, labor-intensive digital services including website engineering, branding, reel editing, SEO campaigns, and 1-on-1 VIP strategy masterclasses. Because our deliverables involve tailored human labor and digital intellectual property, refunds are structured according to project milestones and service categories as detailed below.
                </div>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                    Custom Web Development & Branding Projects
                  </h3>
                  <p>
                    Custom website design, full-stack application development, and branding packages involve dedicated designer time, architecture drafting, and engineering setup immediately upon contract signing.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
                    <li>
                      <strong>Before Project Kickoff (100% Deposit Refund):</strong> If a refund request is submitted in writing within 24 hours of payment AND prior to any project discovery, wireframing, or asset review taking place, a full refund minus a 3% payment gateway processing fee will be issued.
                    </li>
                    <li>
                      <strong>After Wireframe/Design Phase Kickoff (Non-Refundable Deposit):</strong> Once initial wireframes, brand Moodboards, or Figma design layouts have been submitted for client review, the 50% upfront project deposit becomes non-refundable to cover agency labor and creative time expended.
                    </li>
                    <li>
                      <strong>Mid-Project Cancellation:</strong> If a client requests cancellation after approving design wireframes but prior to final launch, any remaining unpaid milestones will be waived, but previously paid milestone deposits will not be refunded.
                    </li>
                    <li>
                      <strong>Post-Launch & Source Code Delivery (Strictly Non-Refundable):</strong> Once a custom website is deployed to the client’s domain or source code repositories are transferred, zero refunds will be granted under any circumstance.
                    </li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                    Webinars & VIP 1-on-1 Strategy Workshops
                  </h3>
                  <p>
                    Quantum Branding offers both 100% Free Group Masterclasses and Paid VIP 1-on-1 Strategy Workshops with Founder {COMPANY_INFO.founder}.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
                    <li>
                      <strong>Free Masterclasses (₹0):</strong> Registration for free group webinars is completely free of charge. No payment details are captured, and no financial claims apply.
                    </li>
                    <li>
                      <strong>1-on-1 Paid VIP Masterclass (₹999 / $15):</strong> Because private 1-on-1 slots block Founder {COMPANY_INFO.founder}’s calendar exclusively for your business audit, cancellations requested at least 24 hours prior to the scheduled session time are eligible for a 100% refund or a free reschedule.
                    </li>
                    <li>
                      <strong>Rescheduling Policy:</strong> Clients may request to reschedule their VIP 1-on-1 session up to 6 hours before the appointment via WhatsApp or email without incurring any re-booking fees.
                    </li>
                    <li>
                      <strong>No-Show & Late Cancellation Policy:</strong> If a client fails to attend the scheduled 1-on-1 Zoom call ("No-Show") without providing prior notice, or cancels within 6 hours of the start time, the booking fee is non-refundable due to lost founder schedule availability.
                    </li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                    Monthly Marketing Retainers & Recurring Packages
                  </h3>
                  <p>
                    Digital growth packages, monthly SEO optimization, social media management, and ad campaign execution packages are billed on a 30-day recurring retainer schedule.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
                    <li>
                      <strong>15-Day Cancellation Notice:</strong> Clients may cancel recurring monthly retainers at any time by giving written notice at least 15 days prior to the next billing date.
                    </li>
                    <li>
                      <strong>Non-Refundable Monthly Cycles:</strong> Retainer payments already processed for an ongoing 30-day operational billing cycle are non-refundable, and service will continue through the end of that paid cycle.
                    </li>
                    <li>
                      <strong>Third-Party Ad Spend:</strong> Ad spend paid directly to Meta Ads or Google Ads platforms is strictly subject to the respective policies of Meta and Google. Quantum Branding does not hold or refund ad spend allocated to third-party ad accounts.
                    </li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">4</span>
                    Payment Gateway Chargebacks & Fraud Protocol
                  </h3>
                  <p>
                    Clients agree to address any billing discrepancies, invoice questions, or dissatisfaction directly with Quantum Branding management prior to initiating a credit card chargeback or bank payment dispute.
                  </p>
                  <p>
                    Initiating an unwarranted chargeback without prior written communication will result in immediate suspension of active website hosting, revocation of source code licenses, cancellation of active ad campaigns, and referral to our legal department for recovery of outstanding fees plus administrative legal costs.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-bold">5</span>
                    Refund Request Submission & Processing Timelines
                  </h3>
                  <p>
                    To request a eligible refund under this policy, please follow these official steps:
                  </p>
                  <ol className="list-decimal pl-5 space-y-1 text-xs text-slate-700">
                    <li>Send an email to <strong>{COMPANY_INFO.email}</strong> with the subject line "Refund Request - [Your Invoice/Order Number]".</li>
                    <li>Include your full name, phone number, transaction ID, date of payment, and detailed reason for the request.</li>
                    <li>Our finance team and Founder {COMPANY_INFO.founder} will review your request within 2 business days.</li>
                    <li>If approved, refunds are credited back to the original payment method (Credit Card, UPI, Net Banking, or Bank Transfer) within <strong>7 to 10 business days</strong>, subject to bank processing cycles.</li>
                  </ol>
                </section>
              </article>
            )}

            {/* RETURN POLICY CONTENT */}
            {activeTab === 'return-policy' && (
              <article className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm leading-relaxed">
                <div className="border-b border-slate-200 pb-6 mb-6">
                  <span className="text-xs font-black uppercase tracking-widest text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
                    Document Ref: QB-RET-2026-V1
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-3">
                    Return Policy for Digital Assets
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Effective Date: January 1, 2026 | Last Revised: August 2026 | Publisher: Quantum Branding ({COMPANY_INFO.founder})
                  </p>
                </div>

                <div className="bg-pink-50 p-4 rounded-2xl border border-pink-200/80 text-xs text-pink-900 font-medium">
                  <strong>Digital Asset Notice:</strong> Because Quantum Branding specializes primarily in intangible digital products—including custom websites, graphic designs, video reel files, downloadable growth workbooks, and digital marketing strategies—traditional physical product "returns" are inherently not applicable once digital files have been transmitted or downloaded.
                </div>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-pink-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                    Intangible & Non-Returnable Digital Deliverables
                  </h3>
                  <p>
                    Once a digital asset or service deliverable is generated, rendered, or delivered electronically, it cannot be "returned" in a physical sense. Therefore, the following items are strictly classified as non-returnable upon receipt:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
                    <li><strong>Custom Website Source Code & Zip Files:</strong> Exported code bases, React components, or server scripts transferred to client repositories or servers.</li>
                    <li><strong>Branding Assets & Logo Vectors:</strong> AI, EPS, SVG, and PNG logo files, brand style guidelines, and typography kits delivered to the client.</li>
                    <li><strong>Video Reels & Motion Graphics:</strong> MP4 video files, Instagram Reel edits, YouTube Shorts, and ad creative renderings after final approval.</li>
                    <li><strong>Downloadable Educational Resources:</strong> PDF growth workbooks, content calendars, prompt templates, and webinar recordings accessed via link.</li>
                    <li><strong>Domain Name Registrations & SSL Certificates:</strong> Third-party domain purchases and SSL security provisioning executed on behalf of the client.</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-pink-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                    Quality Assurance & Post-Launch Warranty
                  </h3>
                  <p>
                    In lieu of traditional product returns, Quantum Branding provides an extensive <strong>14-Day Post-Launch Technical Warranty</strong> for all custom web development projects.
                  </p>
                  <p>
                    During this 14-day window following official site launch, Quantum Branding will fix any technical bugs, broken code links, layout rendering glitches, or responsive display errors that do not conform to approved staging specs free of charge.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-pink-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                    Physical Merchandise & Printed Collateral (If Applicable)
                  </h3>
                  <p>
                    When Quantum Branding manages physical print fulfillment (such as custom business cards, brand brochures, corporate letterheads, or event banners) through verified printing partners:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
                    <li>
                      <strong>Manufacturing Defects:</strong> Returns or reprints are accepted solely in cases of verified manufacturing defects, physical transit damage, or severe printing color misalignments exceeding 15% tolerance from approved digital proofs.
                    </li>
                    <li>
                      <strong>Inspection Window:</strong> Physical shipments must be inspected upon arrival. Any defect claims must be reported to {COMPANY_INFO.email} within <strong>7 calendar days</strong> of delivery accompanied by clear photographic evidence.
                    </li>
                    <li>
                      <strong>Client Proof Approval:</strong> Quantum Branding is not responsible for typographical errors, spelling mistakes, or incorrect phone numbers on printed goods if those errors were present in the digital proof explicitly approved by the Client prior to print production.
                    </li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-pink-600 text-white text-xs flex items-center justify-center font-bold">4</span>
                    Cancellation of Pre-Production Orders
                  </h3>
                  <p>
                    If a client places an order for digital services or package add-ons and wishes to cancel prior to work commencement, they must notify Quantum Branding within 24 hours. If production has not started, the order will be cancelled without generating downloadable deliverables.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-pink-600 text-white text-xs flex items-center justify-center font-bold">5</span>
                    Customer Satisfaction Commitment
                  </h3>
                  <p>
                    Your satisfaction is paramount to Founder {COMPANY_INFO.founder} and the entire Quantum Branding team. While digital files cannot be physically returned, we work tirelessly during structured revision rounds to refine designs, adjust marketing messaging, and ensure your final assets exceed expectations.
                  </p>
                  <p>
                    If you encounter any issues with delivered digital files, contact us immediately at <strong>{COMPANY_INFO.email}</strong> or on WhatsApp at <strong>{COMPANY_INFO.phoneFormatted}</strong> for prompt resolution.
                  </p>
                </section>
              </article>
            )}

            {/* DISCLAIMER CONTENT */}
            {activeTab === 'disclaimer' && (
              <article className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm leading-relaxed">
                <div className="border-b border-slate-200 pb-6 mb-6">
                  <span className="text-xs font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    Document Ref: QB-DISC-2026-V1
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-3">
                    Legal & Performance Disclaimer
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Effective Date: January 1, 2026 | Last Revised: August 2026 | Publisher: Quantum Branding ({COMPANY_INFO.founder})
                  </p>
                </div>

                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200/80 text-xs text-amber-900 font-medium">
                  <strong>General Disclaimer:</strong> The information, marketing strategies, ROI estimations, growth case studies, and digital tools provided on this website and during our webinars are for educational and business promotion purposes only. Individual business results vary based on market factors, execution quality, and industry competition.
                </div>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                    No Earnings & Revenue Guarantee Disclaimer
                  </h3>
                  <p>
                    While Quantum Branding employs data-backed digital marketing strategies, conversion-focused website designs, and proven social media video frameworks, we make <strong>no implicit or explicit guarantees</strong> regarding specific lead volumes, sales revenue, return on ad spend (ROAS), or search engine ranking positions.
                  </p>
                  <p>
                    Past performance metrics, client testimonials, and case studies showcased on our website or during masterclasses represent real results achieved for specific clients, but do not constitute a guarantee that your business will achieve identical metrics. Success depends on numerous external variables including your product pricing, market demand, sales fulfillment, and customer service quality.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                    Third-Party Search Engines & Social Media Algorithms
                  </h3>
                  <p>
                    Search engine optimization (SEO) and social media advertising rely on third-party algorithms controlled exclusively by Google, Meta (Instagram/Facebook), YouTube, and LinkedIn.
                  </p>
                  <p>
                    Quantum Branding has zero control over sudden search algorithm updates, ad account policy modifications, or platform downtime enforced by third-party tech conglomerates. We shall not be held liable for organic traffic fluctuations or social media account restrictions resulting from platform-wide policy updates.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                    Professional Advice Disclaimer (Non-Legal & Non-Financial)
                  </h3>
                  <p>
                    The content, webinar presentations, AI Helper responses, and digital marketing recommendations provided by Quantum Branding and Founder {COMPANY_INFO.founder} do not constitute legal, tax, accounting, or formal financial advice.
                  </p>
                  <p>
                    Clients and website visitors are advised to consult with certified legal counsel, chartered accountants, and financial advisors regarding business licensing, tax liabilities, trademark registrations, and regulatory compliance within their jurisdiction.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-bold">4</span>
                    AI Growth Helper & Automated Content Disclaimer
                  </h3>
                  <p>
                    Quantum Branding integrates an interactive AI Helper widget powered by advanced generative AI language models to assist visitors with service recommendations, package quotes, and general marketing tips.
                  </p>
                  <p>
                    While we strive for maximum accuracy, AI-generated responses are provided for guidance purposes only. Official pricing, service timelines, and binding contracts are governed exclusively by formal written proposals issued directly by Founder {COMPANY_INFO.founder}.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-bold">5</span>
                    External Links & Partner Recommendations
                  </h3>
                  <p>
                    Our website may contain links to external third-party websites, software tools, hosting platforms, or affiliate resources that are not owned or operated by Quantum Branding.
                  </p>
                  <p>
                    Quantum Branding assumes no responsibility for the content, privacy policies, software security, or practices of any third-party websites or services linked from our portal.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-bold">6</span>
                    Limitation of Damages & Accuracy
                  </h3>
                  <p>
                    All information on this website is provided "as is" and "as available" without warranty of any kind, either express or implied. Quantum Branding shall not be liable for any direct, indirect, special, or consequential loss arising from the use of or reliance on any material on this website or during our 101 webinars.
                  </p>
                </section>
              </article>
            )}

            {/* Bottom Footer Help CTA in Legal Card */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs text-slate-600 font-medium">
                  Have questions about this document or need a custom NDA signed for your project?
                </span>
              </div>

              <a
                href={getWhatsAppUrl(`Hello Founder Trayam! I am reviewing the ${activeTab.toUpperCase()} document and have a legal question.`)}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5"
              >
                <span>Contact Founder Direct</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
