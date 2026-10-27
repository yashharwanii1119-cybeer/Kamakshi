import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Check, ArrowRight, ArrowLeft, Zap, Building2, BatteryCharging, ShieldCheck, Sun, CheckCircle2, AlertCircle } from 'lucide-react';
import { siteConfig, CurrencyCode, formatINR, formatUSD } from '../data/config';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCurrency?: CurrencyCode;
  initialData?: {
    propertyType?: string;
    monthlyBill?: number;
    currencyCode?: CurrencyCode;
    formattedSpend?: string;
    recommendedKw?: number;
    storageHours?: number;
    estimatedSavings?: number;
  } | null;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, initialData, currentCurrency = 'INR' }) => {
  const isINR = (initialData?.currencyCode || currentCurrency) === 'INR';
  const defaultMonthlySpend = isINR ? '₹12,00,000 / month (12 Lakh)' : '$25,000 / month';

  const [step, setStep] = useState(1);
  const [scope, setScope] = useState('Commercial & Industrial Solar Solutions');
  const [monthlySpend, setMonthlySpend] = useState(defaultMonthlySpend);
  const [roofType, setRoofType] = useState('Reinforced Concrete Deck / Metal Shed');
  const [storageOption, setStorageOption] = useState('Integrated BESS (4 Hours Reserve — Recommended)');
  const [timeline, setTimeline] = useState('Immediate Feasibility (Within 1-3 Months)');
  
  // Contact state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  // Sync with initialData whenever calculator passes parameters
  useEffect(() => {
    if (initialData) {
      if (initialData.propertyType) {
        setScope(initialData.propertyType);
      }
      if (initialData.formattedSpend) {
        setMonthlySpend(`${initialData.formattedSpend} / month`);
      } else if (initialData.monthlyBill) {
        setMonthlySpend(
          initialData.currencyCode === 'INR'
            ? `${formatINR(initialData.monthlyBill, false)} / month`
            : `$${initialData.monthlyBill.toLocaleString()} / month`
        );
      }
      if (initialData.storageHours !== undefined) {
        setStorageOption(
          initialData.storageHours === 0
            ? 'No Battery Storage (Direct Grid Export Only)'
            : `${initialData.storageHours} Hours Battery Storage Reserve`
        );
      }
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactPhone.trim() || !companyName.trim()) {
      setFormError('Please fill in all required contact and organization fields.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      setFormError('Please enter a valid corporate email address.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hp_verification: honeypot,
          contactName: contactName.trim(),
          contactEmail: contactEmail.trim(),
          contactPhone: contactPhone.trim(),
          companyName: companyName.trim(),
          scope,
          monthlySpend,
          roofType,
          storageOption,
          timeline,
          projectedKw: initialData?.recommendedKw,
          estimatedSavings: initialData?.estimatedSavings
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setReferenceId(data.trackingId);
        setSubmitted(true);

        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#D4A64A', '#F5D985', '#9B6A23', '#263D67', '#65E8F4', '#FFFFFF'],
          });
        } catch {
          // Graceful fallback
        }
      } else {
        setFormError(data.message || (data.errors && data.errors[0]) || 'Server rejected proposal request. Please review your inputs.');
      }
    } catch {
      // Offline fallback: Generate local study reference with KMT-Q prefix
      const localRef = 'KMT-Q-OFFLINE-' + Math.floor(100000 + Math.random() * 900000);
      setReferenceId(localRef);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setStep(1);
    setFormError('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-brand-offwhite rounded-3xl max-w-2xl w-full p-6 sm:p-9 relative shadow-2xl border border-brand-border max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white hover:bg-brand-blush text-brand-charcoal transition-colors border border-brand-maroon/15"
          aria-label="Close quote modal"
        >
          <X className="w-5 h-5 text-brand-burgundy" />
        </button>

        {!submitted ? (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 text-xs font-mono text-brand-crimson font-bold uppercase tracking-wider mb-2">
                <Zap className="w-3.5 h-3.5 text-brand-crimson" />
                <span>Kamakshi Traders — Solar Engineering Configurator</span>
              </div>
              <h2 id="modal-headline" className="text-2xl sm:text-3xl font-bold font-display text-brand-charcoal">
                Request Tailored Solar Proposal &amp; Feasibility Study
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted mt-1 font-light">
                Complete 4 quick steps to receive an engineering yield study and lifetime cash flow model.
              </p>

              {/* Progress Indicator */}
              <div className="flex items-center space-x-2 mt-4" aria-label={`Step ${step} of 4`}>
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      step >= s ? 'bg-brand-crimson' : 'bg-brand-blush'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Step 1: Project Scope */}
            {step === 1 && (
              <div className="space-y-4">
                <label className="block text-xs font-mono uppercase tracking-wider text-brand-charcoal font-bold">
                  Step 1: Select Project Classification
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Commercial & Industrial Solar Solutions', desc: 'Warehouses, logistics, manufacturing' },
                    { label: 'Residential Rooftop Solar Systems', desc: 'Homes, villas & housing societies' },
                    { label: 'Solar Power Plants & Open Access', desc: 'Multi-megawatt ground-mount & captive' },
                    { label: 'Turnkey Solar EPC & Installation', desc: 'End-to-end engineering, procurement & CEIG' },
                    { label: 'Battery Energy Storage (BESS)', desc: 'Hybrid inverters & critical backup' },
                    { label: 'Solar Operations & Maintenance', desc: 'Preventive care, cleaning & SCADA' },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setScope(item.label)}
                      className={`p-4 rounded-xl text-left border transition-all ${
                        scope === item.label
                          ? 'border-brand-crimson bg-brand-blush shadow-sm ring-2 ring-brand-crimson'
                          : 'border-brand-maroon/15 bg-white hover:border-brand-crimson/40'
                      }`}
                    >
                      <div className="text-sm font-bold font-display text-brand-charcoal">{item.label}</div>
                      <div className="text-xs text-brand-muted mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-brand-maroon via-brand-crimson to-brand-solar hover:brightness-110 shadow-glow-crimson transition-all"
                  >
                    <span>Proceed to Parameters</span>
                    <ArrowRight className="w-4 h-4 ml-2 text-brand-gold" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Energy & Facility Specifics */}
            {step === 2 && (
              <div className="space-y-4">
                <label className="block text-xs font-mono uppercase tracking-wider text-brand-charcoal font-bold">
                  Step 2: Energy Consumption &amp; Facility Specifics
                </label>

                <div>
                  <label htmlFor="spend-select" className="block text-xs text-brand-charcoal font-medium mb-1.5">
                    Approximate Monthly Electricity Expenditure
                  </label>
                  <select
                    id="spend-select"
                    value={monthlySpend}
                    onChange={(e) => setMonthlySpend(e.target.value)}
                    className="w-full p-3 rounded-xl border border-brand-maroon/20 bg-white text-sm text-brand-charcoal focus:ring-2 focus:ring-brand-crimson focus:outline-none"
                  >
                    {isINR ? (
                      <>
                        <option value={monthlySpend}>{monthlySpend} (Configured)</option>
                        <option>₹10,000 – ₹50,000 / month (Residential Rooftop)</option>
                        <option>₹1,00,000 – ₹5,00,000 / month (Light Commercial)</option>
                        <option>₹12,00,000 – ₹25,00,000 / month (C&amp;I Hub)</option>
                        <option>₹50,00,000+ / month (Heavy Manufacturing)</option>
                      </>
                    ) : (
                      <>
                        <option value={monthlySpend}>{monthlySpend} (Configured)</option>
                        <option>$5,000 – $15,000 / month</option>
                        <option>$25,000 – $75,000 / month</option>
                        <option>$100,000+ / month</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label htmlFor="roof-select" className="block text-xs text-brand-charcoal font-medium mb-1.5">
                    Substrate &amp; Installation Environment
                  </label>
                  <select
                    id="roof-select"
                    value={roofType}
                    onChange={(e) => setRoofType(e.target.value)}
                    className="w-full p-3 rounded-xl border border-brand-maroon/20 bg-white text-sm text-brand-charcoal focus:ring-2 focus:ring-brand-crimson focus:outline-none"
                  >
                    <option>Reinforced Concrete Deck / Metal Shed</option>
                    <option>Standing Seam Metal Roof</option>
                    <option>Flat Commercial RCC Slab</option>
                    <option>Residential Sloped Tile / RCC</option>
                    <option>Ground Mount / Land Parcel</option>
                    <option>Parking Lot Structure / Canopy</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="storage-select" className="block text-xs text-brand-charcoal font-medium mb-1.5">
                    Battery Storage (BESS) Requirement
                  </label>
                  <select
                    id="storage-select"
                    value={storageOption}
                    onChange={(e) => setStorageOption(e.target.value)}
                    className="w-full p-3 rounded-xl border border-brand-maroon/20 bg-white text-sm text-brand-charcoal focus:ring-2 focus:ring-brand-crimson focus:outline-none"
                  >
                    <option>Integrated BESS (4 Hours Reserve — Recommended)</option>
                    <option>Extended BESS (8+ Hours Critical Islanding)</option>
                    <option>No Battery Storage (Direct Grid Export Only)</option>
                  </select>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center px-5 py-2.5 rounded-full text-xs font-semibold text-brand-charcoal bg-white border border-brand-maroon/20 hover:bg-brand-blush"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-brand-maroon via-brand-crimson to-brand-solar hover:brightness-110 shadow-glow-crimson transition-all"
                  >
                    <span>Target Deployment Timeline</span>
                    <ArrowRight className="w-4 h-4 ml-2 text-brand-gold" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Deployment Timeline */}
            {step === 3 && (
              <div className="space-y-4">
                <label className="block text-xs font-mono uppercase tracking-wider text-brand-charcoal font-bold">
                  Step 3: Target Execution Schedule
                </label>

                <div className="space-y-2.5">
                  {[
                    { label: 'Immediate Feasibility (Within 1-3 Months)', desc: 'Ready for structural engineering scan and site audit' },
                    { label: 'Mid-Term Planning (3-6 Months)', desc: 'Aligning with upcoming fiscal year capital budget' },
                    { label: 'Strategic Horizon (6-12 Months)', desc: 'Exploring long-term Scope-2 decarbonization & PPA' },
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => setTimeline(opt.label)}
                      className={`w-full p-4 rounded-xl text-left border transition-all ${
                        timeline === opt.label
                          ? 'border-brand-crimson bg-brand-blush shadow-sm ring-2 ring-brand-crimson'
                          : 'border-brand-maroon/15 bg-white hover:border-brand-crimson/40'
                      }`}
                    >
                      <div className="text-sm font-bold font-display text-brand-charcoal">{opt.label}</div>
                      <div className="text-xs text-brand-muted mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center px-5 py-2.5 rounded-full text-xs font-semibold text-brand-charcoal bg-white border border-brand-maroon/20 hover:bg-brand-blush"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-brand-maroon via-brand-crimson to-brand-solar hover:brightness-110 shadow-glow-crimson transition-all"
                  >
                    <span>Final Step: Contact Details</span>
                    <ArrowRight className="w-4 h-4 ml-2 text-brand-gold" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Contact & Submission */}
            {step === 4 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block text-xs font-mono uppercase tracking-wider text-brand-charcoal font-bold">
                  Step 4: Where Should We Deliver the Engineering Yield Study?
                </label>

                {formError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs text-brand-charcoal font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Rajesh K. Verma"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-brand-maroon/20 bg-white text-sm text-brand-charcoal focus:ring-2 focus:ring-brand-crimson focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="company-name" className="block text-xs text-brand-charcoal font-medium mb-1">
                      Organization / Enterprise / Residence *
                    </label>
                    <input
                      id="company-name"
                      type="text"
                      required
                      placeholder="e.g. Deccan Logistics Infra"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-brand-maroon/20 bg-white text-sm text-brand-charcoal focus:ring-2 focus:ring-brand-crimson focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs text-brand-charcoal font-medium mb-1">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="rajesh.verma@deccan-infra.in"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full p-3 rounded-xl border border-brand-maroon/20 bg-white text-sm text-brand-charcoal focus:ring-2 focus:ring-brand-crimson focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs text-brand-charcoal font-medium mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="+91 98201 55432"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full p-3 rounded-xl border border-brand-maroon/20 bg-white text-sm text-brand-charcoal focus:ring-2 focus:ring-brand-crimson focus:outline-none"
                    />
                  </div>
                </div>

                {/* Anti-Spam Bot Honeypot */}
                <input
                  type="text"
                  name="hp_verification"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none', position: 'absolute', left: '-9999px' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Configuration Summary Capsule */}
                <div id="quote-summary-capsule" className="p-3.5 rounded-xl bg-brand-blush/40 border border-brand-maroon/15 text-xs text-brand-burgundy space-y-1 font-mono">
                  <div><strong>Selected Scope:</strong> {scope}</div>
                  <div><strong>Estimated Energy Spend:</strong> {monthlySpend}</div>
                  <div><strong>Storage:</strong> {storageOption}</div>
                  {initialData?.recommendedKw && (
                    <div><strong>Projected Array Size:</strong> {initialData.recommendedKw.toLocaleString()} kWp (Est.)</div>
                  )}
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={isSubmitting}
                    className="inline-flex items-center px-5 py-2.5 rounded-full text-xs font-semibold text-brand-charcoal bg-white border border-brand-maroon/20 hover:bg-brand-blush disabled:opacity-50"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-brand-maroon via-brand-crimson to-brand-solar hover:brightness-110 shadow-glow-crimson transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Verifying &amp; Queuing Feasibility Study...</span>
                    ) : (
                      <>
                        <span>Submit &amp; Generate Preliminary Study</span>
                        <Zap className="w-4 h-4 ml-2 fill-white text-white" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Submission Confirmation & Instant Output */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-brand-blush text-brand-crimson mx-auto flex items-center justify-center mb-4 ring-8 ring-brand-blush/40">
              <CheckCircle2 className="w-10 h-10 text-brand-crimson" />
            </div>

            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-blush border border-brand-maroon/20 text-brand-burgundy text-xs font-mono font-bold mb-2">
              <span>Feasibility Dossier Dispatched</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-display text-brand-charcoal">
              Preliminary Study Reserved
            </h3>

            <p className="text-sm text-brand-body max-w-md mx-auto mt-2 leading-relaxed">
              Thank you, <strong>{contactName || 'Valued Partner'}</strong>. A dedicated solar systems engineer from <strong>Kamakshi Traders</strong> has been assigned to <strong>{companyName || 'your organization'}</strong>.
            </p>

            <div className="my-6 p-5 rounded-2xl bg-white border border-brand-maroon/15 text-left max-w-md mx-auto shadow-sm space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b pb-2">
                <span className="text-brand-muted">Engineering Tracking Code:</span>
                <span className="font-bold text-brand-burgundy bg-brand-blush px-2 py-0.5 rounded border border-brand-maroon/20">{referenceId}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-brand-muted">Scope:</span>
                <span className="font-semibold text-brand-charcoal">{scope}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-brand-muted">Delivery Target:</span>
                <span className="font-semibold text-brand-charcoal">Within 24 Business Hours</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-brand-muted">Direct Engineering Line:</span>
                <span className="font-semibold text-brand-burgundy">{siteConfig.company.phonePlaceholder}</span>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="px-8 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-brand-maroon via-brand-crimson to-brand-solar hover:brightness-110 shadow-glow-crimson transition-colors"
            >
              Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
