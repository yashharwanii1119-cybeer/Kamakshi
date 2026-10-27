import React from 'react';
import { MessageCircle, ArrowRight, Sun, PhoneCall, ShieldCheck, Mail } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_DISPLAY_PHONE } from '../utils/whatsapp';

export const ContactBanner: React.FC = () => {
  const customMessage =
    'Hello Kamakshi Traders — Solar Solutions, I would like to explore a suitable solar solution for my property. Please contact me.';
  const whatsappUrl = getWhatsAppUrl(customMessage);

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-b from-brand-charcoal via-brand-burgundy to-brand-charcoal overflow-hidden border-t border-b border-brand-maroon/30 text-white">
      {/* Ambient Crimson Horizon Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-36 bg-gradient-to-b from-brand-crimson/25 via-brand-maroon/15 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge Pill */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-burgundy/90 border border-brand-crimson/40 text-brand-solar text-xs font-mono font-bold uppercase tracking-wider mb-6 shadow-sm">
          <Sun className="w-3.5 h-3.5 text-brand-gold" />
          <span>Direct WhatsApp Consultation</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-white leading-tight">
          Ready to Switch to Solar?
        </h2>

        {/* Supporting Copy */}
        <p className="mt-6 text-base sm:text-xl text-brand-offwhite/85 max-w-2xl mx-auto font-light leading-relaxed">
          Tell us about your property or energy requirements. Our team can help you explore a suitable solar solution.
        </p>

        {/* WhatsApp Phone Highlight */}
        <div className="mt-6 inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 border border-brand-maroon/40 text-sm font-mono text-brand-offwhite/90">
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>WhatsApp Hotline:</span>
          <strong className="text-white font-bold tracking-wide">{WHATSAPP_DISPLAY_PHONE}</strong>
        </div>

        {/* Direct Email & Instagram Channels */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-mono text-brand-offwhite/85">
          <a
            href="mailto:kamakshitradersjodhpur@gmail.com"
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-brand-maroon/30 hover:border-brand-crimson/50 text-brand-offwhite hover:text-brand-solar transition-all"
          >
            <Mail className="w-3.5 h-3.5 text-brand-gold" />
            <span>kamakshitradersjodhpur@gmail.com</span>
          </a>
          <a
            href="https://www.instagram.com/kamakshitradersjodhpur/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-brand-maroon/30 hover:border-brand-crimson/50 text-brand-offwhite hover:text-brand-solar transition-all"
          >
            <svg
              className="w-3.5 h-3.5 text-brand-gold"
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

        {/* Action CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-9 py-4 rounded-full font-bold text-base text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:brightness-110 shadow-lg shadow-emerald-900/30 transition-all duration-300 transform active:scale-95 group inline-flex items-center justify-center"
          >
            <MessageCircle className="w-5 h-5 mr-2.5 fill-white text-white" />
            <span>Enquire on WhatsApp</span>
            <ArrowRight className="w-5 h-5 ml-2.5 group-hover:translate-x-1 transition-transform text-white/90" />
          </a>

          <a
            href="#solutions"
            className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-base text-white/90 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-brand-crimson/50 backdrop-blur-md transition-all duration-300 inline-flex items-center justify-center"
          >
            <span>Explore Our Solutions</span>
          </a>
        </div>

        {/* Bottom Assurance Note */}
        <div className="mt-10 pt-8 border-t border-brand-maroon/20 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-brand-offwhite/60">
          <span className="inline-flex items-center">
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-brand-solar" />
            Direct Engineer Review
          </span>
          <span>•</span>
          <span>No Obligation Feasibility Guidance</span>
          <span>•</span>
          <span>Quick Turnaround Across India</span>
        </div>
      </div>
    </section>
  );
};
