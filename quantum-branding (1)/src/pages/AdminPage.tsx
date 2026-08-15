import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { 
  auth, 
  signInWithGoogle, 
  getLocalAdminSession,
  clearLocalAdminSession,
  logOutAdmin, 
  isAuthorizedAdmin, 
  AUTHORIZED_ADMIN_EMAILS,
  fetchAllEnquiries, 
  updateEnquiryStatus, 
  deleteEnquiryDoc, 
  fetchAllWebinarRegistrations, 
  updateWebinarStatus, 
  deleteWebinarRegistrationDoc, 
  StoredEnquiry, 
  StoredWebinarRegistration 
} from '../lib/firebase';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageType } from '../types';
import { 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Search, 
  RefreshCw, 
  Download, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  MessageSquare, 
  Video, 
  Calendar, 
  UserCheck, 
  Building2, 
  Phone, 
  Mail, 
  Clock, 
  AlertTriangle,
  ChevronRight,
  Eye,
  X,
  Send,
  Filter,
  Check
} from 'lucide-react';

interface AdminPageProps {
  onNavigate: (page: PageType) => void;
}

export function AdminPage({ onNavigate }: AdminPageProps) {
  // Support both Firebase User object and Local Admin Session object
  const [user, setUser] = useState<{ email?: string | null; displayName?: string | null; photoURL?: string | null } | null>(() => getLocalAdminSession());
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'enquiries' | 'webinars'>('enquiries');

  // Enquiries Data State
  const [enquiries, setEnquiries] = useState<StoredEnquiry[]>([]);
  const [enquirySearch, setEnquirySearch] = useState<string>('');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<string>('all');
  const [loadingEnquiries, setLoadingEnquiries] = useState<boolean>(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<StoredEnquiry | null>(null);

  // Webinar Registrations Data State
  const [webinars, setWebinars] = useState<StoredWebinarRegistration[]>([]);
  const [webinarSearch, setWebinarSearch] = useState<string>('');
  const [webinarStatusFilter, setWebinarStatusFilter] = useState<string>('all');
  const [loadingWebinars, setLoadingWebinars] = useState<boolean>(false);
  const [selectedWebinarReg, setSelectedWebinarReg] = useState<StoredWebinarRegistration | null>(null);

  // General Action State
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Listen to Auth state & check local session
  useEffect(() => {
    // First check local stored admin session
    const localSession = getLocalAdminSession();
    if (localSession && isAuthorizedAdmin(localSession.email)) {
      setUser(localSession);
      setAuthLoading(false);
      loadAllData();
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && isAuthorizedAdmin(currentUser.email)) {
        setUser(currentUser);
        loadAllData();
      } else if (!localSession) {
        setUser(currentUser);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loadAllData = async () => {
    setLoadingEnquiries(true);
    setLoadingWebinars(true);

    const [enqData, webData] = await Promise.all([
      fetchAllEnquiries(),
      fetchAllWebinarRegistrations(),
    ]);

    setEnquiries(enqData);
    setWebinars(webData);

    setLoadingEnquiries(false);
    setLoadingWebinars(false);
  };

  const handleGoogleSignIn = async () => {
    setLoginError(null);
    try {
      const signedInUser = await signInWithGoogle();
      if (!isAuthorizedAdmin(signedInUser.email)) {
        setLoginError(`Access Denied: Logged in as ${signedInUser.email}. Only authorized admin (${AUTHORIZED_ADMIN_EMAILS[0]}) can access this portal.`);
      } else {
        setUser(signedInUser);
        loadAllData();
      }
    } catch (err: any) {
      setLoginError(err?.message || 'Failed to sign in with Google');
    }
  };

  const handleSignOut = async () => {
    clearLocalAdminSession();
    await logOutAdmin();
    setUser(null);
    setSelectedEnquiry(null);
    setSelectedWebinarReg(null);
    showNotification('Admin Signed Out');
  };

  // Status Handlers
  const handleUpdateEnquiryStatus = async (id: string, newStatus: string) => {
    const ok = await updateEnquiryStatus(id, newStatus);
    if (ok) {
      setEnquiries(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(prev => prev ? { ...prev, status: newStatus } : null);
      }
      showNotification(`Enquiry status updated to "${newStatus}"`);
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    const ok = await deleteEnquiryDoc(id);
    if (ok) {
      setEnquiries(prev => prev.filter(item => item.id !== id));
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      showNotification('Enquiry deleted successfully');
    }
  };

  const handleUpdateWebinarStatus = async (id: string, newStatus: string) => {
    const ok = await updateWebinarStatus(id, newStatus);
    if (ok) {
      setWebinars(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
      if (selectedWebinarReg?.id === id) {
        setSelectedWebinarReg(prev => prev ? { ...prev, status: newStatus } : null);
      }
      showNotification(`Registration status updated to "${newStatus}"`);
    }
  };

  const handleDeleteWebinarReg = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this webinar registration?')) return;
    const ok = await deleteWebinarRegistrationDoc(id);
    if (ok) {
      setWebinars(prev => prev.filter(item => item.id !== id));
      if (selectedWebinarReg?.id === id) setSelectedWebinarReg(null);
      showNotification('Webinar registration deleted successfully');
    }
  };

  const showNotification = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3000);
  };

  // Export CSV Helpers
  const exportEnquiriesCSV = () => {
    if (enquiries.length === 0) return;
    const headers = ['ID', 'Name', 'Business', 'Phone', 'Email', 'Service', 'Source', 'Status', 'Message', 'Created At'];
    const rows = enquiries.map(e => [
      e.id,
      `"${e.name || ''}"`,
      `"${e.business || ''}"`,
      `"${e.phone || ''}"`,
      `"${e.email || ''}"`,
      `"${e.service || ''}"`,
      `"${e.source || ''}"`,
      `"${e.status || 'New'}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`,
      `"${e.createdAt?.toDate ? e.createdAt.toDate().toLocaleString() : e.createdAt || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `enquiries_quantum_branding_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportWebinarsCSV = () => {
    if (webinars.length === 0) return;
    const headers = ['ID', 'Ticket Number', 'Name', 'Business', 'Phone', 'Email', 'Webinar Title', 'Slot', 'Type', 'Status', 'Created At'];
    const rows = webinars.map(w => [
      w.id,
      `"${w.ticketNumber || ''}"`,
      `"${w.name || ''}"`,
      `"${w.businessName || ''}"`,
      `"${w.phone || ''}"`,
      `"${w.email || ''}"`,
      `"${w.webinarTitle || ''}"`,
      `"${w.preferredSlot || ''}"`,
      `"${w.webinarType || ''}"`,
      `"${w.status || 'Confirmed'}"`,
      `"${w.createdAt?.toDate ? w.createdAt.toDate().toLocaleString() : w.createdAt || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `webinar_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filters
  const filteredEnquiries = enquiries.filter(e => {
    const matchesSearch = 
      (e.name || '').toLowerCase().includes(enquirySearch.toLowerCase()) ||
      (e.business || '').toLowerCase().includes(enquirySearch.toLowerCase()) ||
      (e.phone || '').toLowerCase().includes(enquirySearch.toLowerCase()) ||
      (e.email || '').toLowerCase().includes(enquirySearch.toLowerCase()) ||
      (e.service || '').toLowerCase().includes(enquirySearch.toLowerCase());
    
    const matchesStatus = enquiryStatusFilter === 'all' || (e.status || 'New').toLowerCase() === enquiryStatusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const filteredWebinars = webinars.filter(w => {
    const matchesSearch = 
      (w.name || '').toLowerCase().includes(webinarSearch.toLowerCase()) ||
      (w.phone || '').toLowerCase().includes(webinarSearch.toLowerCase()) ||
      (w.email || '').toLowerCase().includes(webinarSearch.toLowerCase()) ||
      (w.ticketNumber || '').toLowerCase().includes(webinarSearch.toLowerCase()) ||
      (w.webinarTitle || '').toLowerCase().includes(webinarSearch.toLowerCase());

    const matchesStatus = webinarStatusFilter === 'all' || (w.status || 'Confirmed').toLowerCase() === webinarStatusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const isAuthorized = user && isAuthorizedAdmin(user.email);

  if (authLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <RefreshCw className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-600 font-medium">Verifying Quantum Branding Admin Credentials...</p>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Breadcrumbs items={[{ label: 'Admin Portal', page: 'admin' }]} onNavigate={onNavigate} />

      {/* Floating Action Banner */}
      {actionMessage && (
        <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{actionMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2 border border-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Private Security Area</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Quantum Agency Admin Portal
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Secure client enquiry database and webinar registration manager for authorized administrator.
          </p>
        </div>

        {isAuthorized && (
          <div className="flex items-center space-x-3">
            <button
              onClick={loadAllData}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-all shadow-sm"
              title="Refresh Firestore Collections"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${(loadingEnquiries || loadingWebinars) ? 'animate-spin' : ''}`} />
              <span>Refresh Records</span>
            </button>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 text-xs font-semibold transition-all shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>

      {/* UNAUTHORIZED / LOGIN VIEW */}
      {!isAuthorized ? (
        <div className="max-w-lg mx-auto my-12 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-2xl relative overflow-hidden text-left">
          {/* Subtle Background Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500"></div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner border border-blue-100">
              <Lock className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Admin Portal Sign In</h2>
            <p className="text-slate-600 text-xs mt-1.5 leading-relaxed">
              Restricted management area for authorized administrator.
            </p>
          </div>

          {user && !isAuthorizedAdmin(user.email) && (
            <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-900">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold">Access Restricted</p>
                  <p className="mt-1">
                    Signed in as <strong className="underline">{user.email}</strong>. This account does not possess admin clearance.
                  </p>
                </div>
              </div>
            </div>
          )}

          {loginError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-left text-xs text-red-700 flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
              <p className="font-medium">{loginError}</p>
            </div>
          )}

          {/* Google Sign-in */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center space-x-3 bg-slate-900 hover:bg-slate-800 text-white py-3.5 px-6 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg group"
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{user ? 'Switch Google Account' : 'Sign in with Google Admin Account'}</span>
            </button>


          </div>
        </div>
      ) : (
        /* AUTHORIZED ADMIN DASHBOARD */
        <div className="space-y-8">
          {/* Admin Bar */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 shadow-xl border border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Admin Avatar" className="w-12 h-12 rounded-full border-2 border-blue-400 shadow-md" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg border-2 border-blue-400">
                  {user.displayName?.charAt(0) || 'A'}
                </div>
              )}
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-lg">{user.displayName || 'Administrator'}</h3>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    Authorized Admin
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-mono mt-0.5">{user.email}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-slate-700">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 text-center">
                <span className="text-xs text-slate-300 block">Total Enquiries</span>
                <span className="text-xl font-black text-white">{enquiries.length}</span>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 text-center">
                <span className="text-xs text-slate-300 block">New Enquiries</span>
                <span className="text-xl font-black text-emerald-400">
                  {enquiries.filter(e => (e.status || 'New').toLowerCase() === 'new').length}
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 text-center col-span-2 sm:col-span-1">
                <span className="text-xs text-slate-300 block">Webinar Registrations</span>
                <span className="text-xl font-black text-sky-300">{webinars.length}</span>
              </div>
            </div>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex items-center space-x-2 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('enquiries')}
              className={`flex items-center space-x-2 px-6 py-3.5 border-b-2 font-bold text-sm transition-all ${
                activeTab === 'enquiries'
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50 rounded-t-xl'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-t-xl'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Client Enquiries</span>
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-semibold ${
                activeTab === 'enquiries' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {enquiries.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('webinars')}
              className={`flex items-center space-x-2 px-6 py-3.5 border-b-2 font-bold text-sm transition-all ${
                activeTab === 'webinars'
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50 rounded-t-xl'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-t-xl'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Webinar Registrations</span>
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full font-semibold ${
                activeTab === 'webinars' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {webinars.length}
              </span>
            </button>
          </div>

          {/* TAB 1: ENQUIRIES SECTION */}
          {activeTab === 'enquiries' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-6">
              {/* Controls Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 flex-1">
                  {/* Search */}
                  <div className="relative flex-1 min-w-[220px]">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search name, phone, business, service..."
                      value={enquirySearch}
                      onChange={(e) => setEnquirySearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Filter Dropdown */}
                  <div className="flex items-center space-x-2">
                    <Filter className="w-3.5 h-3.5 text-slate-600" />
                    <select
                      value={enquiryStatusFilter}
                      onChange={(e) => setEnquiryStatusFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Statuses</option>
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="in progress">In Progress</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={exportEnquiriesCSV}
                  disabled={enquiries.length === 0}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-all shadow-sm disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>

              {/* Table / List */}
              {loadingEnquiries ? (
                <div className="p-12 text-center text-slate-600">
                  <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
                  <p className="text-xs font-medium">Fetching enquiries from Firestore...</p>
                </div>
              ) : filteredEnquiries.length === 0 ? (
                <div className="p-12 text-center text-slate-600 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                  <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="font-bold text-slate-800 text-sm">No enquiries found</p>
                  <p className="text-xs text-slate-600 mt-1">
                    {enquirySearch || enquiryStatusFilter !== 'all' 
                      ? 'Try resetting your search filters.' 
                      : 'Client form submissions from the Contact Page will appear here automatically.'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                        <th className="py-3 px-4">Client / Business</th>
                        <th className="py-3 px-4">Contact Info</th>
                        <th className="py-3 px-4">Service Required</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredEnquiries.map((enq) => {
                        const statusColor = 
                          (enq.status || 'New').toLowerCase() === 'new' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                          (enq.status || 'New').toLowerCase() === 'contacted' ? 'bg-sky-100 text-sky-800 border-sky-200' :
                          (enq.status || 'New').toLowerCase() === 'in progress' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                          'bg-slate-100 text-slate-700 border-slate-200';

                        return (
                          <tr key={enq.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-900">{enq.name || 'Anonymous'}</div>
                              <div className="text-[11px] text-slate-600 flex items-center space-x-1 mt-0.5">
                                <Building2 className="w-3 h-3 text-slate-400" />
                                <span>{enq.business || 'N/A'}</span>
                              </div>
                            </td>

                            <td className="py-3.5 px-4 space-y-1">
                              <div className="flex items-center space-x-1.5 text-slate-800 font-mono">
                                <Phone className="w-3 h-3 text-emerald-600 shrink-0" />
                                <span>{enq.phone || 'No Phone'}</span>
                              </div>
                              {enq.email && (
                                <div className="flex items-center space-x-1.5 text-slate-600">
                                  <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                                  <span className="truncate max-w-[180px]">{enq.email}</span>
                                </div>
                              )}
                            </td>

                            <td className="py-3.5 px-4">
                              <span className="font-medium text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 inline-block">
                                {enq.service || 'General Enquiry'}
                              </span>
                            </td>

                            <td className="py-3.5 px-4">
                              <select
                                value={enq.status || 'New'}
                                onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value)}
                                className={`text-[11px] font-bold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${statusColor}`}
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <button
                                  onClick={() => setSelectedEnquiry(enq)}
                                  className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                  title="View Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>

                                {enq.phone && (
                                  <a
                                    href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${enq.name}, thanking you for contacting Quantum Branding regarding ${enq.service || 'your enquiry'}. How can we assist you today?`)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                                    title="Reply via WhatsApp"
                                  >
                                    <Send className="w-4 h-4" />
                                  </a>
                                )}

                                <button
                                  onClick={() => handleDeleteEnquiry(enq.id)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                  title="Delete Record"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WEBINAR REGISTRATIONS SECTION */}
          {activeTab === 'webinars' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-6">
              {/* Controls Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 flex-1">
                  {/* Search */}
                  <div className="relative flex-1 min-w-[220px]">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search ticket #, name, phone, email, webinar..."
                      value={webinarSearch}
                      onChange={(e) => setWebinarSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Filter Dropdown */}
                  <div className="flex items-center space-x-2">
                    <Filter className="w-3.5 h-3.5 text-slate-600" />
                    <select
                      value={webinarStatusFilter}
                      onChange={(e) => setWebinarStatusFilter(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Statuses</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="attended">Attended</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={exportWebinarsCSV}
                  disabled={webinars.length === 0}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-all shadow-sm disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>

              {/* Table / List */}
              {loadingWebinars ? (
                <div className="p-12 text-center text-slate-600">
                  <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
                  <p className="text-xs font-medium">Fetching webinar registrations from Firestore...</p>
                </div>
              ) : filteredWebinars.length === 0 ? (
                <div className="p-12 text-center text-slate-600 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                  <Video className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="font-bold text-slate-800 text-sm">No webinar registrations found</p>
                  <p className="text-xs text-slate-600 mt-1">
                    {webinarSearch || webinarStatusFilter !== 'all' 
                      ? 'Try resetting your search filters.' 
                      : 'Attendees registering for webinars will appear here.'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                        <th className="py-3 px-4">Ticket & Attendee</th>
                        <th className="py-3 px-4">Contact Details</th>
                        <th className="py-3 px-4">Webinar & Slot</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredWebinars.map((web) => {
                        const statusColor = 
                          (web.status || 'Confirmed').toLowerCase() === 'confirmed' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                          (web.status || 'Confirmed').toLowerCase() === 'attended' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          'bg-slate-100 text-slate-700 border-slate-200';

                        return (
                          <tr key={web.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4">
                              <span className="font-mono text-[10px] bg-slate-900 text-sky-300 px-2 py-0.5 rounded font-bold uppercase tracking-wide inline-block mb-1">
                                {web.ticketNumber || 'TICKET-DEF'}
                              </span>
                              <div className="font-bold text-slate-900">{web.name || 'Attendee'}</div>
                              {web.businessName && (
                                <div className="text-[11px] text-slate-600">{web.businessName}</div>
                              )}
                            </td>

                            <td className="py-3.5 px-4 space-y-1">
                              <div className="flex items-center space-x-1.5 text-slate-800 font-mono">
                                <Phone className="w-3 h-3 text-emerald-600 shrink-0" />
                                <span>{web.phone || 'N/A'}</span>
                              </div>
                              {web.email && (
                                <div className="flex items-center space-x-1.5 text-slate-600">
                                  <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                                  <span className="truncate max-w-[180px]">{web.email}</span>
                                </div>
                              )}
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-slate-800 max-w-[220px] truncate">
                                {web.webinarTitle || 'Webinar Session'}
                              </div>
                              <div className="text-[11px] text-slate-600 flex items-center space-x-1 mt-0.5">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span>{web.preferredSlot || 'Scheduled Slot'}</span>
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <select
                                value={web.status || 'Confirmed'}
                                onChange={(e) => handleUpdateWebinarStatus(web.id, e.target.value)}
                                className={`text-[11px] font-bold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${statusColor}`}
                              >
                                <option value="Confirmed">Confirmed</option>
                                <option value="Attended">Attended</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <button
                                  onClick={() => setSelectedWebinarReg(web)}
                                  className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                  title="View Ticket Details"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>

                                {web.phone && (
                                  <a
                                    href={`https://wa.me/${web.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${web.name}, confirming your Quantum Webinar registration for "${web.webinarTitle}" (${web.preferredSlot}). Ticket: ${web.ticketNumber}`)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                                    title="Send WhatsApp Confirmation"
                                  >
                                    <Send className="w-4 h-4" />
                                  </a>
                                )}

                                <button
                                  onClick={() => handleDeleteWebinarReg(web.id)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                  title="Delete Record"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ENQUIRY DETAILS MODAL */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-scale-up">
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-blue-600 mb-2">
              <MessageSquare className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Client Enquiry Detail</span>
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-4">{selectedEnquiry.name || 'Anonymous Client'}</h3>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-600 block">Business</span>
                  <span className="font-bold text-slate-800">{selectedEnquiry.business || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-600 block">Service Requested</span>
                  <span className="font-bold text-blue-700">{selectedEnquiry.service || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-600 block">Phone</span>
                  <span className="font-mono font-bold text-slate-800">{selectedEnquiry.phone || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-600 block">Email</span>
                  <span className="font-mono text-slate-800">{selectedEnquiry.email || 'N/A'}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-600 font-semibold block mb-1">Message / Requirements:</span>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 leading-relaxed max-h-40 overflow-y-auto">
                  {selectedEnquiry.message || 'No additional message provided.'}
                </div>
              </div>

              <div className="flex items-center justify-between text-slate-600 pt-2 border-t">
                <span>Source: {selectedEnquiry.source || 'Website'}</span>
                <span>
                  Date: {selectedEnquiry.createdAt?.toDate ? selectedEnquiry.createdAt.toDate().toLocaleString() : 'Recent'}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end space-x-3">
              {selectedEnquiry.phone && (
                <a
                  href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedEnquiry.name}, thanking you for contacting Quantum Branding regarding ${selectedEnquiry.service}. How can we assist you today?`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Reply on WhatsApp</span>
                </a>
              )}
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WEBINAR REGISTRATION DETAILS MODAL */}
      {selectedWebinarReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-scale-up">
            <button
              onClick={() => setSelectedWebinarReg(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 text-sky-600 mb-2">
              <Video className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Webinar Pass Detail</span>
            </div>

            <div className="bg-slate-900 text-white p-4 rounded-xl mb-4 border border-slate-800">
              <span className="text-[10px] uppercase font-mono text-sky-400 block tracking-widest">Registration Ticket</span>
              <p className="text-xl font-mono font-black text-white">{selectedWebinarReg.ticketNumber}</p>
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-1">{selectedWebinarReg.name}</h3>
            <p className="text-xs text-slate-600 mb-4">{selectedWebinarReg.businessName || 'Independent Participant'}</p>

            <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-600 block">Webinar Title</span>
                <span className="font-bold text-slate-800">{selectedWebinarReg.webinarTitle}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-600 block">Time Slot</span>
                  <span className="font-bold text-blue-700">{selectedWebinarReg.preferredSlot}</span>
                </div>
                <div>
                  <span className="text-slate-600 block">Type</span>
                  <span className="font-bold uppercase text-slate-800">{selectedWebinarReg.webinarType || 'Webinar'}</span>
                </div>
                <div>
                  <span className="text-slate-600 block">Phone</span>
                  <span className="font-mono font-bold text-slate-800">{selectedWebinarReg.phone}</span>
                </div>
                <div>
                  <span className="text-slate-600 block">Email</span>
                  <span className="font-mono text-slate-800">{selectedWebinarReg.email || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end space-x-3">
              {selectedWebinarReg.phone && (
                <a
                  href={`https://wa.me/${selectedWebinarReg.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedWebinarReg.name}, confirming your ticket ${selectedWebinarReg.ticketNumber} for ${selectedWebinarReg.webinarTitle}. Slot: ${selectedWebinarReg.preferredSlot}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Ticket on WhatsApp</span>
                </a>
              )}
              <button
                onClick={() => setSelectedWebinarReg(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
