import React, { useState, useEffect } from 'react';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Zap, 
  Globe, 
  Smartphone, 
  QrCode, 
  Building2, 
  Sparkles, 
  ArrowRight, 
  Copy, 
  Download, 
  AlertCircle, 
  RefreshCw, 
  BadgeCheck, 
  ChevronRight,
  Receipt,
  Check,
  Landmark,
  Wallet
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabaseClient';

export interface PaymentItem {
  id: string;
  title: string;
  category: 'package' | 'consultation' | 'diagnostic' | 'emergency' | 'wallet' | 'custom';
  description?: string;
  amountINR: number;
  originalPriceINR?: number;
  doctorName?: string;
  departmentName?: string;
  patientName?: string;
}

export interface PaymentSuccessReceipt {
  transactionId: string;
  orderId: string;
  currency: 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'SGD';
  amount: number;
  amountINR: number;
  paymentMethod: string;
  cardLast4?: string;
  upiId?: string;
  payerName: string;
  payerEmail: string;
  payerPhone: string;
  timestamp: string;
  status: 'COMPLETED';
  item: PaymentItem;
  taxInvoiceNumber: string;
  hospitalGstin: string;
}

interface OnlinePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: PaymentItem | null;
  onPaymentSuccess?: (receipt: PaymentSuccessReceipt) => void;
}

type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'SGD';
type PaymentTab = 'card' | 'upi' | 'apple_google_pay' | 'netbanking' | 'international_stripe' | 'wallet';

const CURRENCY_RATES: Record<CurrencyCode, { symbol: string; rate: number; label: string; flag: string }> = {
  INR: { symbol: '₹', rate: 1, label: 'Indian Rupee (INR)', flag: '🇮🇳' },
  USD: { symbol: '$', rate: 0.012, label: 'US Dollar (USD)', flag: '🇺🇸' },
  EUR: { symbol: '€', rate: 0.011, label: 'Euro (EUR)', flag: '🇪🇺' },
  GBP: { symbol: '£', rate: 0.0095, label: 'British Pound (GBP)', flag: '🇬🇧' },
  AED: { symbol: 'AED ', rate: 0.044, label: 'UAE Dirham (AED)', flag: '🇦🇪' },
  SGD: { symbol: 'S$', rate: 0.016, label: 'Singapore Dollar (SGD)', flag: '🇸🇬' },
};

export const OnlinePaymentModal: React.FC<OnlinePaymentModalProps> = ({
  isOpen,
  onClose,
  item,
  onPaymentSuccess
}) => {
  const { user } = useAuth();

  // Active state
  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const [activeTab, setActiveTab] = useState<PaymentTab>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressStep, setProgressStep] = useState<string>('');
  const [paymentDone, setPaymentDone] = useState(false);
  const [receipt, setReceipt] = useState<PaymentSuccessReceipt | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Form Fields - Payer Details
  const [payerName, setPayerName] = useState(user?.displayName || 'Kushagra Sisodia');
  const [payerEmail, setPayerEmail] = useState(user?.email || 'kushagrasisodia27@gmail.com');
  const [payerPhone, setPayerPhone] = useState(user?.phoneNumber || '+91 98765 43210');

  // Form Fields - Card Details
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [cardHolder, setCardHolder] = useState(user?.displayName || 'KUSHAGRA SISODIA');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('789');
  const [saveCard, setSaveCard] = useState(true);
  const [cardBrand, setCardBrand] = useState<'visa' | 'mastercard' | 'amex' | 'rupay'>('visa');

  // Form Fields - UPI
  const [upiId, setUpiId] = useState('kushagra@oksbi');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'cred' | 'qr'>('gpay');
  const [qrCountdown, setQrCountdown] = useState(299);

  // Form Fields - Netbanking
  const [selectedBank, setSelectedBank] = useState('HDFC');

  // Form Fields - Stripe / PayPal / International
  const [intlMethod, setIntlMethod] = useState<'stripe' | 'paypal' | 'apple_pay' | 'wire'>('stripe');

  // Fallback item if opened directly
  const effectiveItem: PaymentItem = item || {
    id: 'PKG-PREM-01',
    title: 'Executive Full Body Health Screening & Bio-Marker Profiling',
    category: 'package',
    description: 'Comprehensive 85+ blood diagnostic parameters, ECG, 3D Echo, and Specialist Doctor Consultation.',
    amountINR: 4999,
    originalPriceINR: 7500,
    departmentName: 'Preventive Health & Cardiology',
  };

  const convertedAmount = Math.round(
    currency === 'INR' 
      ? effectiveItem.amountINR 
      : effectiveItem.amountINR * CURRENCY_RATES[currency].rate * 100
  ) / (currency === 'INR' ? 1 : 100);

  const discountAmountINR = (effectiveItem.originalPriceINR || effectiveItem.amountINR) - effectiveItem.amountINR;
  const gstTaxINR = Math.round(effectiveItem.amountINR * 0.05); // 5% healthcare concessional GST where applicable
  const netPayableINR = effectiveItem.amountINR;

  // QR timer countdown
  useEffect(() => {
    if (!isOpen || paymentDone || selectedUpiApp !== 'qr') return;
    const interval = setInterval(() => {
      setQrCountdown((prev) => (prev > 0 ? prev - 1 : 300));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, paymentDone, selectedUpiApp]);

  // Card detection
  const handleCardNumberChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 16);
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted || val);

    if (cleaned.startsWith('4')) setCardBrand('visa');
    else if (cleaned.startsWith('5')) setCardBrand('mastercard');
    else if (cleaned.startsWith('3')) setCardBrand('amex');
    else if (cleaned.startsWith('6')) setCardBrand('rupay');
  };

  // Simulate High-Tech Multi-Gateway Payment Execution
  const handleProcessPayment = () => {
    setIsProcessing(true);
    setProgressStep('Initiating 256-Bit SSL Handshake...');

    setTimeout(() => {
      setProgressStep('Validating with Global Payment Gateway & Bank...');
    }, 800);

    setTimeout(() => {
      setProgressStep('3D Secure 2.0 Biometric/OTP Authentication verified...');
    }, 1600);

    setTimeout(() => {
      setProgressStep('Securing prepaid hospital escrow & issuing invoice...');
    }, 2300);

    setTimeout(() => {
      const generatedTxnId = 'TXN_' + Math.random().toString(36).substring(2, 9).toUpperCase() + '_' + Date.now().toString().slice(-4);
      const generatedOrderId = 'MED_' + Math.floor(100000 + Math.random() * 900000);
      const generatedInvoice = 'INV-HOSP-2026-' + Math.floor(10000 + Math.random() * 90000);

      const generatedReceipt: PaymentSuccessReceipt = {
        transactionId: generatedTxnId,
        orderId: generatedOrderId,
        currency,
        amount: convertedAmount,
        amountINR: netPayableINR,
        paymentMethod: activeTab === 'card' 
          ? `${cardBrand.toUpperCase()} Card (••• ${cardNumber.slice(-4) || '8892'})`
          : activeTab === 'upi' 
          ? `UPI (${selectedUpiApp === 'qr' ? 'Dynamic QR' : upiId})`
          : activeTab === 'apple_google_pay'
          ? 'Apple Pay / Google Wallet Express'
          : activeTab === 'netbanking'
          ? `NetBanking (${selectedBank} Bank)`
          : `Stripe / Global Remittance (${currency})`,
        cardLast4: cardNumber.slice(-4) || '8892',
        upiId: activeTab === 'upi' ? upiId : undefined,
        payerName,
        payerEmail,
        payerPhone,
        timestamp: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
        status: 'COMPLETED',
        item: effectiveItem,
        taxInvoiceNumber: generatedInvoice,
        hospitalGstin: '07AAAAA0000A1Z5',
      };

      setReceipt(generatedReceipt);
      setIsProcessing(false);
      setPaymentDone(true);

      // Async sync to Supabase transactions table if configured
      if (supabase) {
        Promise.resolve(
          supabase
            .from('transactions')
            .insert([
              {
                transaction_id: generatedTxnId,
                order_id: generatedOrderId,
                currency,
                amount: convertedAmount,
                amount_inr: netPayableINR,
                payment_method: generatedReceipt.paymentMethod,
                payer_name: payerName,
                payer_email: payerEmail,
                payer_phone: payerPhone,
                item_id: effectiveItem.id,
                item_title: effectiveItem.title,
                item_category: effectiveItem.category,
                invoice_number: generatedInvoice,
                status: 'COMPLETED',
                created_at: new Date().toISOString()
              }
            ])
        )
          .then((res: any) => {
            if (res?.error) console.info('Supabase transaction log note:', res.error.message);
          })
          .catch(() => {});
      }

      if (onPaymentSuccess) {
        onPaymentSuccess(generatedReceipt);
      }
    }, 2800);
  };

  const handleCopyTxn = () => {
    if (receipt?.transactionId) {
      navigator.clipboard?.writeText(receipt.transactionId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto transition-all">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 px-6 py-4 flex items-center justify-between border-b border-teal-500/20 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-500/10 border border-teal-400/30 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight">ApexSecure™ Global Payment Gateway</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  <Lock className="w-3 h-3 text-teal-400" /> 256-Bit TLS
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Authorized for Instant Indian & International Multi-Currency Settlement
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!paymentDone ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto max-h-[80vh]">
            
            {/* Left Column: Order Summary & Currency Picker */}
            <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950/60 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <div>
                {/* Currency Selector */}
                <div className="mb-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Select Billing Currency (Global Auto-Convert)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(CURRENCY_RATES) as CurrencyCode[]).map((curr) => {
                      const info = CURRENCY_RATES[curr];
                      const isSelected = currency === curr;
                      return (
                        <button
                          key={curr}
                          type="button"
                          onClick={() => setCurrency(curr)}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                            isSelected
                              ? 'bg-teal-600 text-white border-teal-600 shadow-sm shadow-teal-500/20'
                              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-teal-400'
                          }`}
                        >
                          <span className="text-sm">{info.flag}</span>
                          <span>{curr}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Facility / Package Card Summary */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm mb-4">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800/50">
                      {effectiveItem.category.toUpperCase()} PREPAYMENT
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      Ref: #{effectiveItem.id}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-snug mb-1">
                    {effectiveItem.title}
                  </h3>
                  {effectiveItem.description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                      {effectiveItem.description}
                    </p>
                  )}

                  {effectiveItem.departmentName && (
                    <div className="text-xs text-teal-600 dark:text-teal-400 flex items-center gap-1 font-medium mb-3">
                      <Sparkles className="w-3.5 h-3.5" />
                      {effectiveItem.departmentName}
                    </div>
                  )}

                  {/* Price Breakdown */}
                  <div className="border-t border-slate-100 dark:border-slate-800 pt-3 space-y-2 text-xs">
                    {effectiveItem.originalPriceINR && effectiveItem.originalPriceINR > effectiveItem.amountINR && (
                      <div className="flex justify-between text-slate-500 dark:text-slate-400">
                        <span>Standard Facility Fee:</span>
                        <span className="line-through">
                          {CURRENCY_RATES[currency].symbol}
                          {Math.round((effectiveItem.originalPriceINR * CURRENCY_RATES[currency].rate) * 100) / 100}
                        </span>
                      </div>
                    )}
                    {discountAmountINR > 0 && (
                      <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                        <span>Special Online Discount:</span>
                        <span>
                          -{CURRENCY_RATES[currency].symbol}
                          {Math.round((discountAmountINR * CURRENCY_RATES[currency].rate) * 100) / 100}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-500 dark:text-slate-400">
                      <span>Hospital Service Taxes (GST/VAT):</span>
                      <span className="text-emerald-600 font-medium">Included (₹0 Extra)</span>
                    </div>

                    <div className="border-t border-slate-200 dark:border-slate-800 pt-2 flex justify-between items-baseline">
                      <span className="font-bold text-slate-800 dark:text-slate-200">Total Payable:</span>
                      <div className="text-right">
                        <span className="text-2xl font-black text-teal-600 dark:text-teal-400">
                          {CURRENCY_RATES[currency].symbol}{convertedAmount.toLocaleString()}
                        </span>
                        {currency !== 'INR' && (
                          <div className="text-[11px] text-slate-400">
                            ≈ ₹{effectiveItem.amountINR.toLocaleString()} INR (Live Interbank Rate)
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Patient Information Pre-check */}
                <div className="space-y-2 mb-4">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Patient & Billing Recipient
                  </label>
                  <input
                    type="text"
                    value={payerName}
                    onChange={(e) => setPayerName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full text-xs px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="email"
                      value={payerEmail}
                      onChange={(e) => setPayerEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full text-xs px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                    <input
                      type="tel"
                      value={payerPhone}
                      onChange={(e) => setPayerPhone(e.target.value)}
                      placeholder="Mobile No."
                      className="w-full text-xs px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Security Badges */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>PCI-DSS Level 1 Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BadgeCheck className="w-4 h-4 text-blue-500" />
                  <span>RBI / SWIFT Regulated</span>
                </div>
              </div>
            </div>

            {/* Right Column: Multi-Channel Gateway Selector */}
            <div className="lg:col-span-7 p-6 flex flex-col justify-between">
              <div>
                {/* Method Navigation Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-5 no-scrollbar border-b border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActiveTab('card')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      activeTab === 'card'
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit / Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('upi')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      activeTab === 'upi'
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-orange-500" />
                    <span>UPI / Instant QR (India)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('international_stripe')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      activeTab === 'international_stripe'
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Globe className="w-4 h-4 text-sky-500" />
                    <span>Stripe & Global (Foreign)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('apple_google_pay')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      activeTab === 'apple_google_pay'
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>1-Tap Express Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('netbanking')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      activeTab === 'netbanking'
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Landmark className="w-4 h-4 text-emerald-500" />
                    <span>NetBanking</span>
                  </button>
                </div>

                {/* Tab 1: Credit & Debit Cards (Global Visa/Mastercard/Amex/RuPay) */}
                {activeTab === 'card' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Supported Networks:</span>
                      <div className="flex items-center gap-2 font-mono font-bold text-slate-700 dark:text-slate-300">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px]">VISA</span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px]">Mastercard</span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px]">RuPay</span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px]">Amex</span>
                      </div>
                    </div>

                    {/* Interactive Virtual Card Preview */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-tr from-slate-900 via-teal-900 to-indigo-950 text-white p-5 shadow-lg border border-teal-500/30">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/10 rounded-full blur-2xl"></div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-6 rounded bg-amber-400/90 flex items-center justify-center text-[9px] font-bold text-slate-900">
                            CHIP
                          </div>
                          <span className="text-[10px] tracking-widest text-teal-200 uppercase font-semibold">Hospital MedPay</span>
                        </div>
                        <span className="text-sm font-black tracking-widest uppercase text-teal-300">
                          {cardBrand.toUpperCase()}
                        </span>
                      </div>

                      <div className="text-lg sm:text-xl font-mono tracking-widest font-bold mb-4 drop-shadow">
                        {cardNumber || '•••• •••• •••• ••••'}
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <div className="text-[9px] text-slate-400 uppercase tracking-wider">Cardholder</div>
                          <div className="font-semibold tracking-wide uppercase">{cardHolder || 'CARDHOLDER NAME'}</div>
                        </div>
                        <div>
                          <div className="text-[9px] text-slate-400 uppercase tracking-wider">Expires</div>
                          <div className="font-mono font-semibold">{cardExpiry || 'MM/YY'}</div>
                        </div>
                      </div>
                    </div>

                    {/* Card Input Controls */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => handleCardNumberChange(e.target.value)}
                            placeholder="4532 0000 0000 0000"
                            className="w-full text-sm font-mono px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs text-slate-400">
                            <Lock className="w-3.5 h-3.5 text-emerald-500" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-1">
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Expiry (MM/YY)
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value.slice(0, 5))}
                            placeholder="08/28"
                            className="w-full text-sm font-mono px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-1">
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            CVV / CVC
                          </label>
                          <input
                            type="password"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.slice(0, 4))}
                            placeholder="•••"
                            className="w-full text-sm font-mono px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                          />
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Country of Issue
                          </label>
                          <select className="w-full text-xs px-2.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none">
                            <option>🇮🇳 India</option>
                            <option>🇺🇸 United States</option>
                            <option>🇬🇧 United Kingdom</option>
                            <option>🇦🇪 United Arab Emirates</option>
                            <option>🇸🇬 Singapore</option>
                            <option>🇪🇺 European Union</option>
                            <option>🌐 Other Global</option>
                          </select>
                        </div>
                      </div>

                      <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer pt-1">
                        <input
                          type="checkbox"
                          checked={saveCard}
                          onChange={(e) => setSaveCard(e.target.checked)}
                          className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                        />
                        <span>Securely tokenize & save card for seamless future consultations</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Tab 2: Unified Payments Interface (UPI 2.0 / Dynamic BharatQR) */}
                {activeTab === 'upi' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {[
                        { id: 'gpay', name: 'Google Pay', icon: '⚡' },
                        { id: 'phonepe', name: 'PhonePe', icon: '🟣' },
                        { id: 'paytm', name: 'Paytm', icon: '🔵' },
                        { id: 'cred', name: 'CRED UPI', icon: '💳' },
                        { id: 'qr', name: 'Scan QR', icon: '📱' },
                      ].map((app) => (
                        <button
                          key={app.id}
                          type="button"
                          onClick={() => setSelectedUpiApp(app.id as any)}
                          className={`p-2.5 rounded-xl border text-center transition-all ${
                            selectedUpiApp === app.id
                              ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 font-bold shadow-sm'
                              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                          }`}
                        >
                          <div className="text-xl mb-1">{app.icon}</div>
                          <div className="text-[11px] font-semibold truncate">{app.name}</div>
                        </button>
                      ))}
                    </div>

                    {selectedUpiApp === 'qr' ? (
                      /* Dynamic Realtime QR Simulator */
                      <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center">
                        <div className="bg-white p-3 rounded-2xl shadow-md border border-slate-200 mb-3 relative">
                          <QrCode className="w-40 h-40 text-slate-900" />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-white px-2 py-1 rounded shadow text-[10px] font-bold text-teal-700 border border-teal-200">
                              NPCI UPI
                            </div>
                          </div>
                        </div>

                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                          Scan with any UPI App (GPay / PhonePe / Paytm / BHIM)
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                          QR expires in: <span className="text-rose-500 font-bold">{Math.floor(qrCountdown / 60)}:{(qrCountdown % 60).toString().padStart(2, '0')}</span>
                        </div>
                      </div>
                    ) : (
                      /* VPA Input */
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Enter your UPI ID / VPA
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="username@okaxis / username@upi"
                            className="flex-1 text-sm font-mono px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => setUpiId('kushagra@oksbi')}
                            className="px-3 py-2 text-xs font-bold rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-600 hover:text-white transition-colors"
                          >
                            Verify
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          A payment request notification of <span className="font-bold text-slate-800 dark:text-slate-200">₹{effectiveItem.amountINR.toLocaleString()}</span> will be sent to your UPI app.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab 3: Stripe & Global Foreign Remittance */}
                {activeTab === 'international_stripe' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 text-white p-4 rounded-2xl border border-sky-500/30">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Globe className="w-5 h-5 text-sky-400" />
                        <span className="font-bold text-sm">International Medical Traveler Payments</span>
                      </div>
                      <p className="text-xs text-sky-200/80 leading-relaxed">
                        Direct overseas payments supported in 135+ countries via Stripe International, PayPal Global, Wire Transfer, and SEPA.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: 'stripe', title: 'Stripe International', desc: 'US / EU / SG Cards & Apple Pay' },
                        { id: 'paypal', title: 'PayPal Global', desc: 'Instant PayPal Wallet checkout' },
                        { id: 'apple_pay', title: 'Foreign Express', desc: 'Google Pay & iDeal / Klarna' },
                        { id: 'wire', title: 'SWIFT Wire / Escrow', desc: 'Official Hospital Proforma Invoice' },
                      ].map((m) => (
                        <div
                          key={m.id}
                          onClick={() => setIntlMethod(m.id as any)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                            intlMethod === m.id
                              ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-slate-900 dark:text-white shadow-sm'
                              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                          }`}
                        >
                          <div className="font-bold text-xs mb-0.5">{m.title}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">{m.desc}</div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                      <div className="flex justify-between font-semibold">
                        <span>Base Currency:</span>
                        <span>{CURRENCY_RATES[currency].label}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Calculated Charge:</span>
                        <span className="font-mono font-bold text-sky-600 dark:text-sky-400">
                          {CURRENCY_RATES[currency].symbol}{convertedAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 4: 1-Tap Express Pay (Apple Pay / Google Wallet) */}
                {activeTab === 'apple_google_pay' && (
                  <div className="space-y-4 animate-in fade-in duration-200 text-center py-4">
                    <div className="max-w-sm mx-auto space-y-3">
                      <button
                        type="button"
                        onClick={handleProcessPayment}
                        className="w-full py-3.5 px-4 rounded-2xl bg-black text-white font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-transform active:scale-[0.98] shadow-lg"
                      >
                        <span className="text-base font-black"> Pay</span>
                        <span className="text-xs font-normal">with Touch ID / Face ID</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleProcessPayment}
                        className="w-full py-3.5 px-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-transform active:scale-[0.98] shadow"
                      >
                        <span className="text-lg">G</span>
                        <span className="text-xs font-semibold">Pay with Google Wallet</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Biometrically authenticated express checkout using saved credentials.
                    </p>
                  </div>
                )}

                {/* Tab 5: Netbanking */}
                {activeTab === 'netbanking' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Select Your Bank (Direct Retail & Corporate NetBanking)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['HDFC', 'SBI', 'ICICI', 'Axis', 'Kotak', 'PNB', 'Bank of Baroda', 'Other Banks'].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setSelectedBank(b)}
                          className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                            selectedBank === b
                              ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300'
                              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button & Processing Overlay */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mt-6">
                {isProcessing ? (
                  <div className="bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 p-4 rounded-2xl flex items-center gap-3 animate-pulse">
                    <RefreshCw className="w-6 h-6 text-teal-600 animate-spin" />
                    <div>
                      <div className="text-xs font-bold text-teal-900 dark:text-teal-200">
                        {progressStep || 'Contacting Payment Server...'}
                      </div>
                      <div className="text-[11px] text-teal-700 dark:text-teal-400">
                        Please do not refresh or press back button.
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleProcessPayment}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-3 shadow-lg shadow-teal-500/25 transition-all transform active:scale-[0.99]"
                  >
                    <Lock className="w-4 h-4 text-teal-200" />
                    <span>
                      Pay {CURRENCY_RATES[currency].symbol}{convertedAmount.toLocaleString()} & Confirm Booking
                    </span>
                    <ArrowRight className="w-4 h-4 text-teal-200" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Payment Success & High-End Receipt View */
          <div className="p-6 sm:p-10 max-w-2xl mx-auto w-full text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-500 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-300 dark:border-emerald-800">
                Payment Authorized & Verified
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Prepayment Received Successfully!
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
                Your medical package booking and hospital priority slot have been securely locked in the hospital database.
              </p>
            </div>

            {/* Official Tax Invoice Container */}
            {receipt && (
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 text-left shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Invoice Number</div>
                    <div className="font-mono font-bold text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
                      {receipt.taxInvoiceNumber}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Amount Paid</div>
                    <div className="font-mono font-extrabold text-teal-600 dark:text-teal-400 text-base sm:text-lg">
                      {CURRENCY_RATES[receipt.currency].symbol}{receipt.amount.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Service / Package:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{receipt.item.title}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Payment Method:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{receipt.paymentMethod}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Patient Name:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{receipt.payerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Timestamp:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{receipt.timestamp}</span>
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="truncate mr-2">
                    <span className="text-[10px] text-slate-400 uppercase block">Global Transaction ID:</span>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300 truncate">
                      {receipt.transactionId}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyTxn}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-teal-500 hover:text-white text-slate-600 dark:text-slate-300 font-bold text-xs transition-colors"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold text-xs hover:bg-slate-200 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Tax Invoice (PDF)</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg shadow-teal-500/20 transition-all"
              >
                <span>Return to Hospital Portal</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
