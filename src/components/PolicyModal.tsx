import React from 'react';
import { X, ShieldCheck, FileText, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/config';

interface PolicyModalProps {
  policyId: string | null;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ policyId, onClose, onOpenQuote }) => {
  if (!policyId) return null;

  const policy = siteConfig.legalPolicies.find(p => p.id === policyId);
  if (!policy) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-headline"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="bg-brand-offwhite rounded-3xl max-w-3xl w-full p-6 sm:p-9 relative shadow-2xl border border-brand-border max-h-[88vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white hover:bg-brand-blush text-brand-charcoal transition-colors border border-brand-maroon/15"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 text-brand-burgundy" />
        </button>

        <div className="flex items-center space-x-2 text-xs font-mono text-brand-crimson font-bold uppercase tracking-wider mb-2">
          <FileText className="w-3.5 h-3.5 text-brand-crimson" />
          <span>Statutory Governance &amp; Technical Policy</span>
        </div>

        <h2 id="policy-headline" className="text-2xl sm:text-3xl font-bold font-display text-brand-charcoal">
          {policy.title}
        </h2>
        
        <div className="flex items-center space-x-3 text-xs font-mono text-brand-muted mt-1 mb-6">
          <span>Effective Date: {policy.lastUpdated}</span>
          <span>•</span>
          <span className="text-brand-burgundy font-bold">Tier-1 EPC Compliance</span>
        </div>

        <div className="p-4 rounded-xl bg-brand-blush/60 border border-brand-maroon/20 text-xs text-brand-burgundy font-semibold leading-relaxed mb-6">
          {policy.summary}
        </div>

        <div className="space-y-6 text-sm text-brand-body leading-relaxed font-light">
          {policy.sections.map((section, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white border border-brand-maroon/15 shadow-sm">
              <h3 className="text-base font-bold font-display text-brand-charcoal mb-2">
                {section.heading}
              </h3>
              <p>{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-brand-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-[11px] font-mono text-brand-muted">
            Certified by {siteConfig.company.brandName} Legal &amp; Technical Directorate.
          </span>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-brand-charcoal bg-white border border-brand-maroon/20 hover:bg-brand-blush"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-brand-maroon via-brand-crimson to-brand-solar hover:brightness-110 shadow-glow-crimson transition-all"
            >
              Consult With Our Engineers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
