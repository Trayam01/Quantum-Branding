import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { WEBINAR_OFFERINGS, getWhatsAppUrl } from '../data/agencyData';
import { WebinarItem, PageType } from '../types';
import { 
  Sparkles, Check, Clock, Video, Star, ArrowRight, X, 
  CheckCircle2, Ticket, MessageSquare, ShieldCheck, Zap, UserCheck
} from 'lucide-react';

interface WebinarSectionProps {
  onNavigate?: (page: PageType) => void;
}

export const WebinarSection: React.FC<WebinarSectionProps> = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'free' | 'paid_1on1'>('all');
  const [selectedWebinar, setSelectedWebinar] = useState<WebinarItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    businessName: '',
    preferredSlot: 'Instant On-Demand Access',
  });
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const displayedOfferings = WEBINAR_OFFERINGS.filter(item => {
    if (activeTab === 'free') return item.type === 'free';
    if (activeTab === 'paid_1on1') return item.type === 'paid_1on1';
    return true;
  });

  const handleOpenRegistration = (webinar: WebinarItem) => {
    setSelectedWebinar(webinar);
    setRegistrationSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      businessName: '',
      preferredSlot: webinar.type === 'free' ? 'Instant On-Demand Access' : 'Tomorrow at 4:00 PM IST',
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const generatedTicket = `QB-101-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketNumber(generatedTicket);

    try {
      if (selectedWebinar) {
        await addDoc(collection(db, 'webinarRegistrations'), {
          name: formData.name,
          phone: formData.phone,
          email: formData.email || '',
          businessName: formData.businessName || '',
          preferredSlot: formData.preferredSlot,
          webinarId: selectedWebinar.id,
          webinarTitle: selectedWebinar.title,
          webinarType: selectedWebinar.type,
          ticketNumber: generatedTicket,
          status: 'Confirmed',
          createdAt: serverTimestamp(),
        });
      }
    } catch (fsErr) {
      handleFirestoreError(fsErr, OperationType.WRITE, 'webinarRegistrations');
    }

    // Sync to backend server
    try {
      await fetch('/api/webinar/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || '',
          businessName: formData.businessName || '',
          preferredSlot: formData.preferredSlot,
          webinarId: selectedWebinar?.id || 'masterclass',
          webinarTitle: selectedWebinar?.title || 'Webinar',
          webinarType: selectedWebinar?.type || 'free',
          ticketNumber: generatedTicket,
        }),
      });
    } catch (err) {
      // Background sync
    }

    setRegistrationSubmitted(true);
  };

  const handleWhatsAppConfirm = () => {
    if (!selectedWebinar) return;
    const isFree = selectedWebinar.type === 'free';
    const sessionLabel = isFree ? 'Free Group Masterclass' : '1-on-1 Paid VIP Session';
    const msg = `Hello Quantum Branding! I just registered for the ${sessionLabel} (${selectedWebinar.title}).\nTicket ID: ${ticketNumber}\nName: ${formData.name}\nPhone: ${formData.phone}\nBusiness: ${formData.businessName || 'N/A'}\nPreferred Slot: ${formData.preferredSlot}.\nPlease confirm my seat!`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <section id="webinars" className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 via-teal-100 to-blue-100 border border-teal-200/80 mb-4 shadow-2xs">
            <Sparkles className="w-4 h-4 text-emerald-600 fill-emerald-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-900">
              Quantum Webinar Hub
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 tracking-tight">
            Free & 1-on-1 Paid <span className="gradient-text-blue-pink-yellow">Webinars</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 mt-3 font-normal leading-relaxed">
            Level up your business with our <strong className="text-emerald-700 font-bold">Free Group Masterclass</strong> or book a private <strong className="text-pink-600 font-bold">1-on-1 Paid VIP Session</strong> led directly by Founder Trayam Tiwari.
          </p>

          {/* Filter Tabs */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-slate-100 border border-slate-200/80 shadow-inner">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2 rounded-full text-xs font-black transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Webinars
            </button>

            <button
              onClick={() => setActiveTab('free')}
              className={`px-5 py-2 rounded-full text-xs font-black transition-all flex items-center gap-1.5 ${
                activeTab === 'free'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Free Webinar</span>
            </button>

            <button
              onClick={() => setActiveTab('paid_1on1')}
              className={`px-5 py-2 rounded-full text-xs font-black transition-all flex items-center gap-1.5 ${
                activeTab === 'paid_1on1'
                  ? 'bg-gradient-to-r from-pink-600 to-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>1-on-1 Paid Webinar</span>
            </button>
          </div>
        </div>

        {/* Webinar Offering Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
          {displayedOfferings.map((webinar) => {
            const isFree = webinar.type === 'free';

            return (
              <div
                key={webinar.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isFree
                    ? 'glass-panel border-2 border-emerald-500/80 shadow-xl bg-white/95 hover:border-emerald-600'
                    : 'glass-panel border-2 border-pink-500/80 shadow-2xl bg-white/95 hover:border-pink-600 ring-4 ring-pink-500/10'
                }`}
              >
                {/* Header Badges */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    isFree
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-600 text-white shadow-xs'
                  }`}>
                    {isFree ? <Zap className="w-3.5 h-3.5 text-emerald-700" /> : <Star className="w-3.5 h-3.5 fill-current text-yellow-300" />}
                    <span>{webinar.badge}</span>
                  </span>

                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>{webinar.duration}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 mb-2">
                    {webinar.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold text-slate-600 mb-4 leading-relaxed">
                    {webinar.subtitle}
                  </p>

                  {/* Pricing Container */}
                  <div className={`p-4 rounded-2xl mb-6 flex items-center justify-between ${
                    isFree
                      ? 'bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white'
                      : 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white'
                  }`}>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-display font-black text-white">
                          {webinar.priceFormatted}
                        </span>
                        {webinar.originalPriceFormatted && (
                          <span className="text-sm font-bold text-slate-400 line-through">
                            {webinar.originalPriceFormatted}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-300 block mt-0.5">
                        {isFree ? '100% Free • No Payment Required' : '1-on-1 Private Consultation Pass'}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 text-xs font-bold text-yellow-300 border border-white/10">
                        {isFree ? <Video className="w-3.5 h-3.5 text-emerald-300" /> : <UserCheck className="w-3.5 h-3.5 text-pink-300" />}
                        <span>{isFree ? 'Group Session' : 'Private 1-on-1'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                    {webinar.description}
                  </p>

                  {/* Topics Covered */}
                  <div className="mb-6 space-y-2.5">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                      Curriculum Highlights:
                    </span>
                    {webinar.topics.map((topic, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs font-semibold text-slate-800">
                        <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                          isFree ? 'bg-emerald-100 text-emerald-700' : 'bg-pink-100 text-pink-700'
                        }`}>
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>

                  {/* Included Perks */}
                  <div className="mb-8 pt-4 border-t border-slate-100 space-y-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                      Included Deliverables & Resources:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {webinar.includes.map((inc, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px] font-medium text-slate-600 bg-slate-50 p-2 rounded-xl">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Instructor Footer & CTA Button */}
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                        TT
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{webinar.instructor}</div>
                        <div className="text-[10px] text-slate-500">{webinar.instructorRole}</div>
                      </div>
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                      isFree ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-pink-700 bg-pink-50 border-pink-200'
                    }`}>
                      {isFree ? 'Limited Free Seats' : '1-on-1 VIP Slots'}
                    </span>
                  </div>

                  <button
                    onClick={() => handleOpenRegistration(webinar)}
                    className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm text-white flex items-center justify-center gap-2 shadow-lg transition-all duration-200 active:scale-[0.98] ${
                      isFree
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 shadow-emerald-600/25'
                        : 'bg-gradient-to-r from-blue-600 via-pink-500 to-yellow-500 hover:opacity-95 shadow-blue-500/25'
                    }`}
                  >
                    <span>{webinar.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Help */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-200/80 text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900">Need Custom Corporate or Team Webinars?</h4>
              <p className="text-xs text-slate-500">Reach out directly to Trayam Tiwari on WhatsApp for personalized scheduling.</p>
            </div>
          </div>

          <a
            href={getWhatsAppUrl("Hello Trayam! I have a question regarding your Free and 1-on-1 Paid Webinars.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white font-extrabold text-xs shadow-md hover:bg-emerald-500 transition-colors whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* REGISTRATION MODAL */}
      {selectedWebinar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedWebinar(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!registrationSubmitted ? (
              <>
                <div className="mb-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2 ${
                    selectedWebinar.type === 'free' ? 'bg-emerald-100 text-emerald-800' : 'bg-pink-100 text-pink-800'
                  }`}>
                    {selectedWebinar.badge}
                  </span>

                  <h3 className="text-2xl font-display font-extrabold text-slate-900">
                    Register for {selectedWebinar.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1">
                    {selectedWebinar.type === 'free'
                      ? 'Claim your instant free seat for the group masterclass.'
                      : 'Reserve your private 1-on-1 strategy workshop slot with Founder Trayam Tiwari.'}
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm font-medium outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Phone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm font-medium outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm font-medium outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Business Name / Niche</label>
                    <input
                      type="text"
                      placeholder="e.g. Local Retail / Tech Startup"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm font-medium outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Time Slot *</label>
                    <select
                      value={formData.preferredSlot}
                      onChange={(e) => setFormData({ ...formData, preferredSlot: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm font-medium outline-none bg-white"
                    >
                      {selectedWebinar.type === 'free' ? (
                        <>
                          <option value="Instant On-Demand Access">Instant On-Demand Video Stream (Watch Now)</option>
                          <option value="Next Saturday 11:00 AM IST">Next Saturday 11:00 AM IST (Live Group Q&A)</option>
                          <option value="Next Sunday 4:00 PM IST">Next Sunday 4:00 PM IST (Live Group Q&A)</option>
                        </>
                      ) : (
                        <>
                          <option value="Tomorrow at 4:00 PM IST">Tomorrow at 4:00 PM IST (1-on-1 Zoom)</option>
                          <option value="This Saturday at 11:00 AM IST">This Saturday at 11:00 AM IST (1-on-1 Zoom)</option>
                          <option value="This Sunday at 5:00 PM IST">This Sunday at 5:00 PM IST (1-on-1 Zoom)</option>
                          <option value="Custom Slot via Direct WhatsApp">Custom Slot (Discuss via WhatsApp)</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className={`w-full py-3.5 px-6 rounded-xl font-black text-sm text-white shadow-lg transition-all ${
                        selectedWebinar.type === 'free'
                          ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/25'
                          : 'bg-gradient-to-r from-blue-600 via-pink-500 to-yellow-500 hover:opacity-95 shadow-blue-500/25'
                      }`}
                    >
                      {selectedWebinar.type === 'free' ? 'Confirm Free Registration' : `Proceed to Lock 1-on-1 VIP Pass (${selectedWebinar.priceFormatted})`}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Ticket className="w-8 h-8" />
                </div>

                <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  Seat Registration Confirmed!
                </span>

                <h3 className="text-2xl font-display font-extrabold text-slate-900">
                  Registration Complete!
                </h3>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-200 pb-2 font-bold">
                    <span className="text-slate-500">Pass Ticket ID:</span>
                    <span className="text-blue-600">{ticketNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Attendee:</span>
                    <span className="font-semibold text-slate-800">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Webinar Type:</span>
                    <span className="font-semibold text-slate-800">{selectedWebinar.type === 'free' ? 'Free Masterclass' : '1-on-1 Paid VIP Session'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Preferred Slot:</span>
                    <span className="font-semibold text-slate-800">{formData.preferredSlot}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Click below to send your ticket confirmation directly to Trayam Tiwari on WhatsApp for your meeting link!
                </p>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={handleWhatsAppConfirm}
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-md"
                  >
                    <MessageSquare className="w-4 h-4 fill-current" />
                    <span>Confirm via WhatsApp Direct</span>
                  </button>

                  <button
                    onClick={() => setSelectedWebinar(null)}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
