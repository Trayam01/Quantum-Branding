import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { COMPANY_INFO } from '../data/agencyData';
import { EnquiryData, PageType } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Phone, Mail, MessageSquare, Send, CheckCircle2, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';

interface ContactPageProps {
  initialPackage?: string;
  onNavigate?: (page: PageType) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ initialPackage, onNavigate }) => {
  const [formData, setFormData] = useState<EnquiryData>({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    businessType: '',
    requiredService: initialPackage || 'Complete Growth Package (₹30,000)',
    budget: '₹25,000–₹50,000',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Store in Firestore Database
      try {
        await addDoc(collection(db, 'enquiries'), {
          business: formData.businessName || '',
          createdAt: serverTimestamp(),
          email: formData.email || '',
          message: formData.message || '',
          name: formData.name || '',
          phone: formData.phone || '',
          service: formData.requiredService || '',
          source: 'website',
          status: 'New',
        });
      } catch (fsErr) {
        handleFirestoreError(fsErr, OperationType.WRITE, 'enquiries');
      }

      const res = await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setWhatsappUrl(data.whatsappUrl);
        setSubmitted(true);
      }
    } catch {
      // Fallback redirect generator
      const textMessage = `Hello Quantum Branding! I'm submitting an enquiry:
📌 Name: ${formData.name}
🏢 Business: ${formData.businessName}
📞 Phone: ${formData.phone}
✉️ Email: ${formData.email}
💼 Service: ${formData.requiredService}
💰 Budget: ${formData.budget}
💬 Message: ${formData.message}`;

      const url = `https://wa.me/918878080111?text=${encodeURIComponent(textMessage)}`;
      setWhatsappUrl(url);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        {onNavigate && <Breadcrumbs items={[{ label: 'Contact & Instant Enquiry' }]} onNavigate={onNavigate} />}

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Direct Founder Access</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
          Start Your <span className="gradient-text-blue-purple">Digital Transformation</span>
        </h1>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Submit your project requirements below or connect directly with Founder Trayam Tiwari on WhatsApp or Phone.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Form Column */}
        <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-2xl bg-white/90">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-2xl font-display font-bold text-slate-900">
                  Project Enquiry Form
                </h3>
                <span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                  Fast Response
                </span>
              </div>

              {/* Name & Business Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm font-semibold glass-input rounded-xl focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    placeholder="e.g. Sharma Traders / Apex Fitness"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm font-semibold glass-input rounded-xl focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm font-semibold glass-input rounded-xl focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="rahul@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm font-semibold glass-input rounded-xl focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Business Type & Service Required */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                    Business Type
                  </label>
                  <input
                    type="text"
                    name="businessType"
                    placeholder="e.g. Retail, Real Estate, Education"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm font-semibold glass-input rounded-xl focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                    Required Service / Package
                  </label>
                  <select
                    name="requiredService"
                    value={formData.requiredService}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm font-semibold glass-input rounded-xl focus:border-indigo-500 bg-white"
                  >
                    <option value="Growth Package (₹30,000)">GROWTH PACKAGE (₹30,000)</option>
                    <option value="Premium Package (₹50,000)">PREMIUM PACKAGE (₹50,000 - Most Complete)</option>
                    <option value="Website Development">Website Development (₹3,000+)</option>
                    <option value="Social Media & Reels">Social Media Management & Reels</option>
                    <option value="SEO & Rank Optimization">SEO & Rank Optimization</option>
                    <option value="Digital Advertising">Meta & Google Ads</option>
                    <option value="Branding & Design">Branding & Logo Design</option>
                    <option value="AI & Automation">AI & WhatsApp Automation</option>
                    <option value="Custom Scope">Custom Scope / Combination</option>
                  </select>
                </div>
              </div>

              {/* Budget Options */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                  Approximate Budget
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    '₹3,000–₹10,000',
                    '₹10,000–₹25,000',
                    '₹25,000–₹50,000',
                    '₹50,000+',
                  ].map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setFormData((prev) => ({ ...prev, budget: b }))}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                        formData.budget === b
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                          : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase">
                  Message / Details
                </label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Tell us about your business goals, existing website, or specific timeline..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-sm font-semibold glass-input rounded-xl focus:border-indigo-500"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600 hover:from-indigo-500 hover:to-blue-500 shadow-xl shadow-indigo-500/30 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Enquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Enquiry</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h3 className="text-2xl font-display font-bold text-slate-900">
                Enquiry Form Processed!
              </h3>

              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. Click below to send your structured enquiry directly to Founder Trayam Tiwari on WhatsApp.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm bg-emerald-600 text-white hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp Enquiry Chat</span>
                </a>

                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 underline"
                >
                  Edit Enquiry Details
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Direct Contact Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-8 rounded-3xl border border-slate-200/80 shadow-xl space-y-6 bg-white/80">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 w-fit mb-2">
                Founder Contact
              </div>
              <h3 className="text-2xl font-display font-bold text-slate-900">
                Direct Communication Lines
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                No middleman friction. Talk directly with Founder Trayam Tiwari.
              </p>
            </div>

            {/* Direct Phone */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Call Directly</div>
                  <div className="text-sm font-extrabold text-slate-900">{COMPANY_INFO.phoneFormatted}</div>
                </div>
              </div>
              <a
                href={COMPANY_INFO.phoneLink}
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-500"
              >
                Call Now
              </a>
            </div>

            {/* Direct WhatsApp */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">WhatsApp Direct</div>
                  <div className="text-sm font-extrabold text-emerald-900">{COMPANY_INFO.phoneFormatted}</div>
                </div>
              </div>
              <a
                href={COMPANY_INFO.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500"
              >
                WhatsApp Now
              </a>
            </div>

            {/* Official Email */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Official Email</div>
                  <div className="text-xs font-bold text-indigo-900 break-all">{COMPANY_INFO.email}</div>
                </div>
              </div>
              <a
                href={COMPANY_INFO.emailLink}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500"
              >
                Email Us
              </a>
            </div>

            <div className="pt-2 text-xs text-slate-500 space-y-2 border-t border-slate-100">
              <div className="flex items-center gap-2 font-semibold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Fast 15-minute response turnaround</span>
              </div>
              <p>Operating Hours: Monday – Saturday (9:00 AM – 8:00 PM IST)</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
