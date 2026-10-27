import React from 'react';
import { ShieldCheck, Award, Zap, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/config';
import { getAssetUrl } from '../utils/asset';

interface AboutSectionProps {
  onOpenQuote: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenQuote }) => {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden border-t border-brand-maroon/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Eyebrow & Brand Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-blush border border-brand-maroon/20 text-brand-maroon text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              <Compass className="w-3.5 h-3.5 text-brand-crimson" />
              <span>Engineering Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-brand-charcoal tracking-tight leading-tight">
              Kamakshi Traders — Solar Solutions.
            </h2>
            <p className="mt-6 text-base sm:text-lg text-brand-body font-light leading-relaxed">
              We reject the convention that solar installations should be generic commodities. Our infrastructure combines industrial-grade structural fabrication with high-efficiency photovoltaic technologies to power homes, commercial hubs, and manufacturing plants with total independence.
            </p>
            <p className="mt-4 text-base sm:text-lg text-brand-burgundy font-semibold leading-relaxed">
              From our initial shading audit to final DISCOM synchronization, our methodology delivers uncompromising durability, zero downtime, and transparent, multi-decade financial yields.
            </p>

            <div className="mt-8 flex items-center space-x-4">
              <button
                onClick={onOpenQuote}
                className="px-7 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-brand-maroon via-brand-crimson to-brand-solar hover:brightness-110 shadow-glow-crimson transition-all duration-200 inline-flex items-center space-x-2"
              >
                <span>Consult Our Solar Engineers</span>
                <ArrowRight className="w-4 h-4 text-brand-gold" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-brand-maroon/15 shadow-luxury">
              <img
                src={getAssetUrl("solar/about-engineering.svg")}
                alt="Kamakshi Traders Solar Engineering and Field Execution"
                className="w-full h-96 object-cover filter brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-burgundy/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-brand-crimson/30 shadow-lg">
                <span className="text-[11px] font-mono text-brand-crimson font-bold uppercase tracking-wider block">
                  Pillars of Execution
                </span>
                <p className="text-sm font-display font-bold text-brand-charcoal mt-1">
                  Tier-1 ALMM Hardware • Precision Hot-Dip Structures • 25 to 30-Year Linear Warranty
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Tenets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-7 rounded-2xl bg-brand-offwhite border border-brand-maroon/15 hover:border-brand-crimson/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-brand-blush flex items-center justify-center text-brand-burgundy mb-5">
              <Zap className="w-6 h-6 text-brand-crimson" />
            </div>
            <h3 className="text-lg font-bold font-display text-brand-charcoal mb-2">
              High-Density Harvesting
            </h3>
            <p className="text-xs sm:text-sm text-brand-body leading-relaxed">
              High-efficiency monocrystalline &amp; TOPCon cells capture direct and diffuse sunlight, delivering optimal specific generation throughout the year.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-brand-offwhite border border-brand-maroon/15 hover:border-brand-crimson/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-brand-blush flex items-center justify-center text-brand-burgundy mb-5">
              <ShieldCheck className="w-6 h-6 text-brand-crimson" />
            </div>
            <h3 className="text-lg font-bold font-display text-brand-charcoal mb-2">
              Structural Durability
            </h3>
            <p className="text-xs sm:text-sm text-brand-body leading-relaxed">
              Custom-fabricated hot-dip galvanized mounting structures engineered to withstand high wind loads and harsh seasonal weather conditions.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-brand-offwhite border border-brand-maroon/15 hover:border-brand-crimson/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-brand-blush flex items-center justify-center text-brand-burgundy mb-5">
              <Award className="w-6 h-6 text-brand-crimson" />
            </div>
            <h3 className="text-lg font-bold font-display text-brand-charcoal mb-2">
              Bankable Financial ROI
            </h3>
            <p className="text-xs sm:text-sm text-brand-body leading-relaxed">
              Supported by Tier-1 manufacturer linear warranties and robust warranties guaranteeing lasting power retention across 25+ years.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-brand-offwhite border border-brand-maroon/15 hover:border-brand-crimson/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-brand-blush flex items-center justify-center text-brand-burgundy mb-5">
              <CheckCircle2 className="w-6 h-6 text-brand-crimson" />
            </div>
            <h3 className="text-lg font-bold font-display text-brand-charcoal mb-2">
              Turnkey Accountability
            </h3>
            <p className="text-xs sm:text-sm text-brand-body leading-relaxed">
              Single-point delivery spanning DISCOM net-metering approvals, CEIG electrical clearances, hardware procurement, and commissioning.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
