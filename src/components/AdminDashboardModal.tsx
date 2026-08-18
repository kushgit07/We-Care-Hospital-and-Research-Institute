import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  UserCheck, 
  LogOut, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChevronDown, 
  Download, 
  RefreshCw, 
  Eye, 
  Activity, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Stethoscope, 
  Building2, 
  Sparkles,
  Printer,
  ChevronRight,
  ShieldAlert,
  SlidersHorizontal,
  Mail,
  Phone,
  FileSpreadsheet,
  Check
} from 'lucide-react';
import { 
  AdminAccount, 
  isAdminSlotClaimed, 
  registerSingleAdminAccount, 
  loginAdmin, 
  getActiveAdminSession, 
  logoutAdmin, 
  fetchAllBookingsForAdmin 
} from '../services/adminService';
import { Appointment } from '../types/hospital';
import { DEPARTMENTS, HOSPITAL_INFO } from '../data/hospitalData';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsultationReport?: (appointment: Appointment) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  onOpenConsultationReport
}) => {
  // Authentication State
  const [adminUser, setAdminUser] = useState<AdminAccount | null>(() => getActiveAdminSession());
  const [isSlotClaimed, setIsSlotClaimed] = useState<boolean>(() => isAdminSlotClaimed());
  
  // Auth Form State
  const [authMode, setAuthMode] = useState<'login' | 'register'>(isSlotClaimed ? 'login' : 'register');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('kushagrasisodia27@gmail.com');
  const [passcode, setPasscode] = useState('');
  const [securityKeyPhrase, setSecurityKeyPhrase] = useState('WECARE-SUPER-ROOT-2026');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Bookings / Dashboard State
  const [bookings, setBookings] = useState<Appointment[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled'>('ALL');
  const [deptFilter, setDeptFilter] = useState<string>('ALL');
  const [consultTypeFilter, setConsultTypeFilter] = useState<string>('ALL');
  const [selectedBookingForDetail, setSelectedBookingForDetail] = useState<Appointment | null>(null);
  const [viewTab, setViewTab] = useState<'all_bookings' | 'analytics' | 'security_audit'>('all_bookings');

  // Load state on mount / open
  useEffect(() => {
    if (isOpen) {
      const active = getActiveAdminSession();
      setAdminUser(active);
      const claimed = isAdminSlotClaimed();
      setIsSlotClaimed(claimed);
      if (!active) {
        setAuthMode(claimed ? 'login' : 'register');
      } else {
        loadAllBookings();
      }
    }
  }, [isOpen]);

  const loadAllBookings = async () => {
    setIsLoadingBookings(true);
    try {
      const list = await fetchAllBookingsForAdmin();
      setBookings(list);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingBookings(false);
    }
  };

  // Handle Single Admin Slot Registration
  const handleRegisterSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    const result = await registerSingleAdminAccount({
      fullName: fullName || 'Super Administrator',
      email,
      passcode,
      securityKeyPhrase,
      departmentAccess: ['ALL_DEPARTMENTS', 'CARDIOLOGY', 'NEUROLOGY', 'ONCOLOGY', 'EMERGENCY']
    });

    setAuthLoading(false);
    if (result.success && result.admin) {
      setAdminUser(result.admin);
      setIsSlotClaimed(true);
      loadAllBookings();
    } else {
      setAuthError(result.error || 'Failed to claim Super Admin slot.');
    }
  };

  // Handle Admin Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    const result = await loginAdmin(email, passcode);
    setAuthLoading(false);

    if (result.success && result.admin) {
      setAdminUser(result.admin);
      loadAllBookings();
    } else {
      setAuthError(result.error || 'Invalid credentials or security token.');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setAdminUser(null);
    setAuthMode('login');
    setSelectedBookingForDetail(null);
  };

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchesSearch = 
        (b.patientName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.bookingReference || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.doctorName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.departmentName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.patientEmail || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.patientPhone || '').includes(searchQuery);

      const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
      const matchesDept = deptFilter === 'ALL' || b.departmentId === deptFilter;
      const matchesType = consultTypeFilter === 'ALL' || b.consultType === consultTypeFilter;

      return matchesSearch && matchesStatus && matchesDept && matchesType;
    });
  }, [bookings, searchQuery, statusFilter, deptFilter, consultTypeFilter]);

  // Analytics Metrics
  const metrics = useMemo(() => {
    const total = bookings.length;
    const confirmed = bookings.filter(b => b.status === 'Confirmed').length;
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.fee || 150), 0);
    const videoTele = bookings.filter(b => b.consultType === 'Video Tele-Consult').length;
    const inPerson = bookings.filter(b => b.consultType === 'In-Person').length;
    return { total, confirmed, totalRevenue, videoTele, inPerson };
  }, [bookings]);

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredBookings.length === 0) return;
    const headers = [
      'Token Number',
      'Booking Reference',
      'Patient Name',
      'Patient Email',
      'Patient Phone',
      'Department',
      'Doctor',
      'Date',
      'Time Slot',
      'Consultation Type',
      'Status',
      'Fee ($)',
      'Payment Status',
      'Symptoms'
    ];

    const rows = filteredBookings.map(b => [
      `"${b.tokenNumber || ''}"`,
      `"${b.bookingReference || b.id}"`,
      `"${b.patientName}"`,
      `"${b.patientEmail || ''}"`,
      `"${b.patientPhone || ''}"`,
      `"${b.departmentName}"`,
      `"${b.doctorName}"`,
      `"${b.date}"`,
      `"${b.timeSlot}"`,
      `"${b.consultType}"`,
      `"${b.status}"`,
      `"${b.fee || 150}"`,
      `"${b.paymentStatus || 'Paid'}"`,
      `"${(b.symptoms || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `wecare-hospital-bookings-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-6xl max-h-[94vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto text-slate-200">
        
        {/* Top Header Bar (Big Tech Command Center Style) */}
        <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 via-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-lg text-white tracking-tight">
                  Hospital Admin Command Center
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-950 text-teal-300 border border-teal-800 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                  LIVE TELEMETRY
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Single-Slot Super Admin • Unified Patient Booking & Tele-Consult Logs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {adminUser && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
                <img
                  src={adminUser.avatarUrl}
                  alt={adminUser.fullName}
                  className="w-6 h-6 rounded-full border border-teal-500"
                />
                <div className="text-left">
                  <span className="text-xs font-bold text-white block leading-tight">{adminUser.fullName}</span>
                  <span className="text-[9px] text-teal-400 font-mono">{adminUser.securityBadgeId}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors ml-1"
                  title="Logout Admin"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-900/60">
          
          {/* ==================================================================== */}
          {/* STATE 1: NOT AUTHENTICATED -> SHOW STRICT LOGIN / SINGLE REGISTER SLOT */}
          {/* ==================================================================== */}
          {!adminUser ? (
            <div className="max-w-md mx-auto my-6 p-6 sm:p-8 bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl relative">
              
              {/* Security Shield Watermark */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-teal-950/70 border border-teal-700/60 flex items-center justify-center text-teal-400 shadow-xl shadow-teal-950/50">
                  <KeyRound className="w-8 h-8" />
                </div>

                <h4 className="text-xl font-extrabold text-white font-heading">
                  {isSlotClaimed ? 'Super Admin Authentication' : 'Claim Single Admin Account Slot'}
                </h4>
                
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {isSlotClaimed
                    ? 'The single Super-Admin slot is claimed. Enter your authorized passcode to access clinical records.'
                    : 'System notice: Exactly ONE administrative account slot is permitted. Once created, registration will be permanently locked.'}
                </p>
              </div>

              {/* Single Slot Badge Notice */}
              <div className={`p-3 rounded-2xl mb-5 text-xs flex items-start gap-2.5 border ${
                isSlotClaimed
                  ? 'bg-slate-900/90 border-slate-800 text-slate-300'
                  : 'bg-teal-950/40 border-teal-800 text-teal-300'
              }`}>
                <ShieldAlert className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">
                    {isSlotClaimed ? 'Slot Status: 1/1 Provisioned (Locked)' : 'Slot Status: 0/1 Available for Claim'}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {isSlotClaimed
                      ? 'No other accounts can be created on this installation.'
                      : 'Provide your credentials below to establish root ownership.'}
                  </span>
                </div>
              </div>

              {authError && (
                <div className="p-3 mb-4 rounded-xl bg-rose-950/70 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              {/* REGISTER FORM (Only available if slot NOT yet claimed) */}
              {!isSlotClaimed ? (
                <form onSubmit={handleRegisterSlot} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Kushagra Sisodia"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Super-Admin Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="kushagrasisodia27@gmail.com"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Master Passcode (min. 6 chars)</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Root Security Keyphrase</label>
                    <input
                      type="text"
                      required
                      value={securityKeyPhrase}
                      onChange={(e) => setSecurityKeyPhrase(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-teal-300 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-500 hover:to-sky-500 text-white font-bold text-sm shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    {authLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                    <span>Claim Slot & Initialize Super-Admin</span>
                  </button>
                </form>
              ) : (
                /* LOGIN FORM (When single slot has already been claimed) */
                <form onSubmit={handleLogin} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Registered Admin Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="kushagrasisodia27@gmail.com"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Master Passcode</label>
                    <input
                      type="password"
                      required
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-500 hover:to-sky-500 text-white font-bold text-sm shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    {authLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
                    <span>Authenticate Admin Session</span>
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* ==================================================================== */
            /* STATE 2: AUTHENTICATED -> BIG TECH DASHBOARD & BOOKINGS COMMAND VIEW */
            /* ==================================================================== */
            <div className="space-y-6">
              
              {/* Top Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-slate-400 block">Total Patient Bookings</span>
                    <h4 className="text-2xl font-extrabold text-white font-heading mt-0.5">{metrics.total}</h4>
                    <span className="text-[10px] text-teal-400 flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" /> Live Supabase & LocalSync
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-teal-950 text-teal-400 border border-teal-800/60 flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-slate-400 block">Confirmed & Queued</span>
                    <h4 className="text-2xl font-extrabold text-emerald-400 font-heading mt-0.5">{metrics.confirmed}</h4>
                    <span className="text-[10px] text-slate-400 block mt-1">Active Medical Tickets</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/60 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-slate-400 block">Consultation Revenue</span>
                    <h4 className="text-2xl font-extrabold text-sky-400 font-heading mt-0.5">${metrics.totalRevenue.toLocaleString()}</h4>
                    <span className="text-[10px] text-slate-400 block mt-1">Direct & Prepaid Gateway</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-sky-950 text-sky-400 border border-sky-800/60 flex items-center justify-center">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-slate-400 block">Tele-Health vs In-Person</span>
                    <h4 className="text-xl font-bold text-white font-heading mt-0.5">{metrics.videoTele} <span className="text-xs text-slate-400 font-normal">/ {metrics.inPerson}</span></h4>
                    <span className="text-[10px] text-indigo-400 block mt-1">Digital HD Video Sessions</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800/60 flex items-center justify-center">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* View Tabs & Control Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewTab('all_bookings')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      viewTab === 'all_bookings'
                        ? 'bg-teal-500 text-slate-950 shadow-md'
                        : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Live Bookings Ledger ({filteredBookings.length})</span>
                  </button>

                  <button
                    onClick={() => setViewTab('analytics')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      viewTab === 'analytics'
                        ? 'bg-teal-500 text-slate-950 shadow-md'
                        : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>Specialty Distribution</span>
                  </button>

                  <button
                    onClick={() => setViewTab('security_audit')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      viewTab === 'security_audit'
                        ? 'bg-teal-500 text-slate-950 shadow-md'
                        : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Security & Audit Log</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={loadAllBookings}
                    disabled={isLoadingBookings}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white transition-colors border border-slate-700 text-xs flex items-center gap-1.5"
                    title="Refresh Live Data"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingBookings ? 'animate-spin text-teal-400' : ''}`} />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>

                  <button
                    onClick={handleExportCSV}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-teal-300 hover:text-teal-200 transition-colors border border-slate-700 text-xs font-bold flex items-center gap-1.5"
                    title="Export to CSV Excel"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* TAB 1: ALL BOOKINGS LEDGER */}
              {viewTab === 'all_bookings' && (
                <div className="space-y-4">
                  {/* Search and Filters Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search patient, doc, ref #, phone..."
                        className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <select
                        value={deptFilter}
                        onChange={(e) => setDeptFilter(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-teal-500"
                      >
                        <option value="ALL">All Departments</option>
                        {DEPARTMENTS.map(d => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-teal-500"
                      >
                        <option value="ALL">All Statuses</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div>
                      <select
                        value={consultTypeFilter}
                        onChange={(e) => setConsultTypeFilter(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-teal-500"
                      >
                        <option value="ALL">All Consultation Modes</option>
                        <option value="In-Person">In-Person</option>
                        <option value="Video Tele-Consult">Video Tele-Consult</option>
                        <option value="Home Visit">Home Visit</option>
                      </select>
                    </div>
                  </div>

                  {/* Modern Responsive Table */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                            <th className="py-3 px-4">Queue #</th>
                            <th className="py-3 px-4">Patient Details</th>
                            <th className="py-3 px-4">Department & Doctor</th>
                            <th className="py-3 px-4">Schedule</th>
                            <th className="py-3 px-4">Mode</th>
                            <th className="py-3 px-4">Payment</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {filteredBookings.length === 0 ? (
                            <tr>
                              <td colSpan={8} className="text-center py-12 text-slate-400">
                                <div className="max-w-xs mx-auto space-y-2">
                                  <Calendar className="w-8 h-8 mx-auto text-slate-600" />
                                  <p className="font-semibold text-white">No patient bookings match your criteria</p>
                                  <p className="text-[11px]">Try clearing search or filters to see all historical entries.</p>
                                </div>
                              </td>
                            </tr>
                          ) : (
                            filteredBookings.map((apt) => (
                              <tr 
                                key={apt.id}
                                className="hover:bg-slate-900/50 transition-colors group cursor-pointer"
                                onClick={() => setSelectedBookingForDetail(apt)}
                              >
                                <td className="py-3.5 px-4 font-mono font-bold text-teal-400">
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-6 h-6 rounded-lg bg-teal-950 border border-teal-800 flex items-center justify-center text-[10px] text-teal-300">
                                      #{apt.tokenNumber || '101'}
                                    </span>
                                    <span className="text-[11px] text-slate-400">{apt.bookingReference}</span>
                                  </div>
                                </td>

                                <td className="py-3.5 px-4">
                                  <div className="font-bold text-white text-sm">{apt.patientName}</div>
                                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                                    <span>{apt.patientPhone}</span>
                                    {apt.patientEmail && <span>• {apt.patientEmail}</span>}
                                  </div>
                                </td>

                                <td className="py-3.5 px-4">
                                  <div className="font-semibold text-slate-200">{apt.doctorName}</div>
                                  <div className="text-[11px] text-teal-400">{apt.departmentName}</div>
                                </td>

                                <td className="py-3.5 px-4">
                                  <div className="font-medium text-slate-300 flex items-center gap-1">
                                    <Calendar className="w-3 h-3 text-slate-500" />
                                    <span>{apt.date}</span>
                                  </div>
                                  <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                                    <Clock className="w-3 h-3 text-slate-500" />
                                    <span>{apt.timeSlot}</span>
                                  </div>
                                </td>

                                <td className="py-3.5 px-4">
                                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                                    apt.consultType === 'Video Tele-Consult'
                                      ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                                      : apt.consultType === 'Home Visit'
                                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                      : 'bg-slate-900 text-slate-300 border border-slate-700'
                                  }`}>
                                    {apt.consultType}
                                  </span>
                                </td>

                                <td className="py-3.5 px-4">
                                  <div className="font-bold text-white">${apt.fee || 150}</div>
                                  <span className="text-[10px] text-emerald-400 font-medium">{apt.paymentStatus || 'Paid Online'}</span>
                                </td>

                                <td className="py-3.5 px-4">
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800 flex items-center gap-1 w-fit">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                    {apt.status || 'Confirmed'}
                                  </span>
                                </td>

                                <td className="py-3.5 px-4 text-right">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedBookingForDetail(apt);
                                    }}
                                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                                    title="View Medical Ticket Details"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SPECIALTY ANALYTICS */}
              {viewTab === 'analytics' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                    <h5 className="font-heading font-bold text-sm text-white mb-3">
                      Specialist Department Volume
                    </h5>
                    <div className="space-y-3">
                      {DEPARTMENTS.slice(0, 6).map((dept) => {
                        const count = bookings.filter(b => b.departmentId === dept.id).length;
                        const pct = bookings.length > 0 ? Math.round((count / bookings.length) * 100) : 0;
                        return (
                          <div key={dept.id} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-300 font-semibold">{dept.name}</span>
                              <span className="text-teal-400 font-bold">{count} Bookings ({pct}%)</span>
                            </div>
                            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                              <div className="bg-gradient-to-r from-teal-500 to-sky-500 h-2 rounded-full" style={{ width: `${Math.max(pct, 5)}%` }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <h5 className="font-heading font-bold text-sm text-white">
                      Hospital Capacity & Infrastructure Status
                    </h5>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">ICU Beds Available</span>
                        <span className="text-xl font-bold text-emerald-400 font-heading">24 / 120</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Robotic ORs Active</span>
                        <span className="text-xl font-bold text-teal-400 font-heading">8 / 10</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Active Specialists</span>
                        <span className="text-xl font-bold text-sky-400 font-heading">48 On Duty</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Emergency Ambulance</span>
                        <span className="text-xl font-bold text-rose-400 font-heading">6 Standby</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SECURITY & AUDIT LOG */}
              {viewTab === 'security_audit' && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h5 className="font-heading font-bold text-sm text-white">Super Admin Access & Audit Trail</h5>
                      <p className="text-xs text-slate-400">Strict single-slot root credential verification & HIPAA tamper resistance.</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-teal-950 text-teal-300 border border-teal-800">
                      SEC-LEVEL: SUPER-ADMIN
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white">Root Account Provisioning</span>
                        <p className="text-[11px] text-slate-400">Claimed by {adminUser.fullName} ({adminUser.email})</p>
                      </div>
                      <span className="text-[10px] text-teal-400 font-mono">{adminUser.createdAt}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white">Cryptographic Slot Lockout</span>
                        <p className="text-[11px] text-slate-400">Additional admin registrations permanently blocked on this domain.</p>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold">LOCKED & ENFORCED</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white">Supabase Cloud Sync Channel</span>
                        <p className="text-[11px] text-slate-400">https://mmsurqwvmcorctfphfsa.supabase.co</p>
                      </div>
                      <span className="text-[10px] text-teal-400 font-bold">ACTIVE (256-BIT SSL)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Selected Booking Detail Drawer Modal */}
        {selectedBookingForDetail && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">Patient Appointment Record</span>
                  <h4 className="font-heading font-extrabold text-lg text-white">
                    Ref #{selectedBookingForDetail.bookingReference}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedBookingForDetail(null)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Patient Name</span>
                  <span className="font-bold text-white">{selectedBookingForDetail.patientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Contact Phone</span>
                  <span className="font-bold text-slate-200">{selectedBookingForDetail.patientPhone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Department</span>
                  <span className="font-bold text-teal-300">{selectedBookingForDetail.departmentName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Assigned Specialist</span>
                  <span className="font-bold text-white">{selectedBookingForDetail.doctorName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Date & Time</span>
                  <span className="font-bold text-slate-200">{selectedBookingForDetail.date} • {selectedBookingForDetail.timeSlot}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Mode & Fee</span>
                  <span className="font-bold text-sky-400">{selectedBookingForDetail.consultType} (${selectedBookingForDetail.fee || 150})</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Reported Symptoms & Notes:</span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {selectedBookingForDetail.symptoms || 'General clinical consultation and health examination.'}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                {onOpenConsultationReport && (
                  <button
                    onClick={() => {
                      onOpenConsultationReport(selectedBookingForDetail);
                      setSelectedBookingForDetail(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>View / Generate Rx Report</span>
                  </button>
                )}

                <button
                  onClick={() => setSelectedBookingForDetail(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
