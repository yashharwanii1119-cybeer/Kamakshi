import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { siteConfig } from '../data/config';
import { getWhatsAppUrl } from '../utils/whatsapp';
import { getAssetUrl } from '../utils/asset';

interface HeroProps {
  onOpenQuote?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-brand-charcoal pt-24 pb-16">
      {/* Cinematic Background Layer with Parallax & Atmospheric Burgundy Overlays */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full relative"
        >
          {/* High-res cinematic solar architectural installation image */}
          <img
            src={getAssetUrl("solar/hero-solar.svg")}
            alt="Kamakshi Traders Rooftop and Commercial Solar Photovoltaic Installation in Jodhpur Rajasthan"
            width="1920"
            height="1080"
            className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-[1.12]"
          />
          {/* Deep Burgundy & Charcoal Atmospheric Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/95 via-brand-burgundy/85 to-brand-charcoal/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-brand-charcoal/60" />
          <div className="absolute inset-0 bg-solar-radial opacity-70" />
        </motion.div>
      </div>

      {/* Futuristic SVG Energy Grid & Light Sweep Ray */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="energyBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C62845" stopOpacity="0" />
              <stop offset="50%" stopColor="#E44743" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#E9B85B" stopOpacity="0" />
            </linearGradient>
            <pattern id="solarMicroGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(198, 40, 69, 0.12)" strokeWidth="0.8" />
              <circle cx="60" cy="0" r="1.5" fill="rgba(228, 71, 67, 0.25)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#solarMicroGrid)" />
          {/* Animated Energy Flow Line */}
          <motion.line
            x1="0%"
            y1="25%"
            x2="100%"
            y2="75%"
            stroke="url(#energyBeam)"
            strokeWidth="1.5"
            strokeDasharray="120 280"
            animate={{ strokeDashoffset: [-800, 800] }}
            transition={{ repeat: Infinity, duration: 9, ease: "linear" }}
          />
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 flex flex-col justify-between min-h-[75vh]">
        {/* Top Floating Telemetry Capsule */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="self-start inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-burgundy/80 border border-brand-crimson/40 backdrop-blur-md shadow-glow-maroon"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-solar opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-crimson"></span>
          </span>
          <span className="text-xs font-mono font-bold tracking-wider text-brand-offwhite uppercase">
            KAMAKSHI TRADERS — SOLAR SOLUTIONS
          </span>
          <span className="text-brand-crimson font-mono text-xs">/ 2026.IV</span>
        </motion.div>

        {/* Hero Editorial Typography */}
        <div className="my-auto max-w-4xl pt-8 pb-10">
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white font-display leading-[1.04]"
          >
            <span className="block text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.22em] text-brand-gold uppercase mb-3 sm:mb-4">
              Kamakshi Traders — Solar Solutions Jodhpur
            </span>
            Powering Progress.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-crimson via-brand-solar to-brand-gold">
              Redefining Energy.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-brand-offwhite/85 max-w-2xl font-light leading-relaxed"
          >
            {siteConfig.company.subheadline}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-9 sm:mt-11 flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-5"
          >
            <a
              href={getWhatsAppUrl('Hello Kamakshi Traders — Solar Solutions, I would like to request a solar quotation for my property. Please contact me.')}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-brand-maroon via-brand-crimson to-brand-solar hover:brightness-110 shadow-glow-crimson transition-all duration-300 transform active:scale-95"
            >
              <span>Get a Solar Quote</span>
              <ArrowRight className="w-5 h-5 ml-2.5 transform group-hover:translate-x-1.5 transition-transform duration-300 text-brand-gold" />
            </a>

            <a
              href="#solutions"
              className="inline-flex items-center justify-center px-7 py-4 rounded-full text-base font-medium text-white/90 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-brand-crimson/50 backdrop-blur-md transition-all duration-300"
            >
              <span>Explore Our Solutions</span>
            </a>
          </motion.div>
        </div>

        {/* Bottom Floating Stats & Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="pt-6 border-t border-brand-maroon/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          {/* Customer Assurance Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full md:w-auto">
            {[
              { value: '25+ Years', label: 'Linear Performance Warranty' },
              { value: 'Tier-1', label: 'ALMM Approved Modules' },
              { value: 'Turnkey', label: 'EPC & Net-Metering Delivery' },
              { value: '100%', label: 'Custom Engineered Sizing' },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight flex items-center">
                  {stat.value}
                </span>
                <span className="text-xs text-brand-offwhite/60 font-mono uppercase tracking-wider mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Subtle Animated Scroll Down Guide */}
          <a
            href="#solutions"
            className="hidden md:flex items-center space-x-2 text-xs font-mono text-brand-offwhite/50 hover:text-white transition-colors group cursor-pointer"
          >
            <span>SCROLL TO EXPLORE</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="p-1.5 rounded-full bg-brand-maroon/40 border border-brand-crimson/30 group-hover:border-brand-crimson"
            >
              <ChevronDown className="w-3.5 h-3.5 text-brand-solar" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
