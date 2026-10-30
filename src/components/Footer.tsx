import React from 'react';
import { MessageCircle, ShieldCheck, ArrowRight, ExternalLink, Mail } from 'lucide-react';
import { siteConfig } from '../data/config';
import { getWhatsAppUrl, WHATSAPP_DISPLAY_PHONE } from '../utils/whatsapp';

interface FooterProps {
  onOpenPolicy: (policyId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy }) => {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <footer className="bg-brand-burgundy text-brand-offwhite relative overflow-hidden border-t border-brand-maroon/40">
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-brand-crimson/15 blur-[130px] pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-brand-maroon/30">
          {/* Brand Info & WhatsApp Direct Contact */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="relative flex items-center justify-center rounded-2xl overflow-hidden bg-brand-charcoal p-1.5 border border-brand-maroon/40 shadow-glow-maroon/30">
                <img
                  src={siteConfig.company.logoPath}
                  alt={siteConfig.company.fullDisplayName}
                  width="200"
                  height="64"
                  loading="lazy"
                  className="h-14 sm:h-16 w-auto object-contain rounded-xl"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
                  {siteConfig.company.brandName}
                </span>
                <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-mono font-bold mt-0.5">
                  {siteConfig.company.brandDescriptor}
                </span>
              </div>
            </div>

            <p className="text-sm text-brand-offwhite/80 max-w-md font-light leading-relaxed">
              Professional turnkey solar solutions for residential rooftops, commercial establishments, industrial plants, and utility power projects across India.
            </p>

            {/* Direct WhatsApp Call to Action Button */}
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2.5 px-6 py-3 rounded-full text-xs font-mono font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 shadow-lg shadow-emerald-950/40 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Chat on WhatsApp: {WHATSAPP_DISPLAY_PHONE}</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/80 ml-1" />
              </a>
            </div>

            {/* Direct Channels: Email & Instagram */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-xs font-mono text-brand-offwhite/85">
              <a
                href="mailto:kamakshitradersjodhpur@gmail.com"
                className="inline-flex items-center space-x-2 text-brand-offwhite/80 hover:text-brand-solar transition-colors group/mail"
              >
                <Mail className="w-4 h-4 text-brand-gold group-hover/mail:text-brand-solar transition-colors" />
                <span>kamakshitradersjodhpur@gmail.com</span>
              </a>
              <span className="hidden sm:inline text-brand-offwhite/30">•</span>
              <a
                href="https://www.instagram.com/kamakshitradersjodhpur/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-brand-offwhite/80 hover:text-brand-solar transition-colors group/insta"
              >
                <svg
                  className="w-4 h-4 text-brand-gold group-hover/insta:text-brand-solar transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span>@kamakshitradersjodhpur</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-crimson">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-offwhite/80">
              <li>
                <a href="#" className="hover:text-brand-solar transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-brand-solar transition-colors">
                  Solar Solutions
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-brand-solar transition-colors">
                  Projects &amp; Installations
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-brand-solar transition-colors">
                  Contact &amp; Enquiries
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-solar text-emerald-400 flex items-center space-x-1"
                >
                  <span>WhatsApp Quotation</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-crimson">
              Core Offerings
            </h4>
            <ul className="space-y-2 text-xs text-brand-offwhite/75 font-medium">
              {siteConfig.solutions.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="hover:text-brand-solar transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Statutory Policies */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-brand-offwhite/60 space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} {siteConfig.company.brandName} — {siteConfig.company.brandDescriptor}. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[11px]">
            <button
              onClick={() => onOpenPolicy('privacy-charter')}
              className="hover:text-brand-solar transition-colors underline-offset-2 hover:underline"
            >
              Privacy Charter
            </button>
            <button
              onClick={() => onOpenPolicy('warranty-terms')}
              className="hover:text-brand-solar transition-colors underline-offset-2 hover:underline"
            >
              Linear Warranty Terms
            </button>
            <button
              onClick={() => onOpenPolicy('grid-standards')}
              className="hover:text-brand-solar transition-colors underline-offset-2 hover:underline"
            >
              Grid Interconnection Standards
            </button>
            <button
              onClick={() => onOpenPolicy('esg-audit')}
              className="hover:text-brand-solar transition-colors underline-offset-2 hover:underline"
            >
              ESG Supply Chain Audit
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
