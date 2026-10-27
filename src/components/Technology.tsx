import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Activity, Layers, Gauge, ShieldAlert, Sparkles, Check } from 'lucide-react';
import { siteConfig } from '../data/config';

export const Technology: React.FC = () => {
  const [activeTechIdx, setActiveTechIdx] = useState(0);
  const activeTech = siteConfig.technologyFeatures[activeTechIdx];

  return (
    <section id="technology" className="py-24 bg-brand-charcoal text-white relative overflow-hidden">
      {/* Cinematic Deep Burgundy Ambient Glow */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-burgundy/60 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-brand-crimson/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-burgundy border border-brand-crimson/40 text-brand-offwhite text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5 text-brand-solar" />
            <span>Industrial Semiconductor Physics</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
            Engineering Precision Behind Every Kilowatt.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-brand-offwhite/70 font-light leading-relaxed">
            Every component of our solar architecture is calibrated to minimize thermodynamic and balance-of-system losses, maximizing lifetime clean generation across extreme ambient temperatures.
          </p>
        </div>

        {/* Interactive Architecture Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Tech Navigation Tabs */}
          <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              {siteConfig.technologyFeatures.map((tech, idx) => {
                const isActive = activeTechIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveTechIdx(idx)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                      isActive
                        ? 'bg-brand-burgundy/90 border-brand-crimson shadow-glow-maroon'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 text-brand-offwhite/70'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono tracking-widest uppercase text-brand-crimson font-semibold">
                        0{idx + 1} // ARCHITECTURE
                      </span>
                      {isActive && (
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-solar opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-crimson"></span>
                        </span>
                      )}
                    </div>
                    <div className="text-lg font-bold font-display text-white">
                      {tech.title}
                    </div>
                    <div className="text-xs text-brand-offwhite/60 font-mono mt-1">
                      {tech.subtitle}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Certifications Badge Bar */}
            <div className="p-4 rounded-xl bg-brand-burgundy/50 border border-brand-maroon/40 mt-4">
              <span className="text-[11px] font-mono text-brand-gold uppercase tracking-wider block mb-2 font-semibold">
                Technical Compliance Standards
              </span>
              <div className="flex flex-wrap gap-2">
                {siteConfig.complianceFramework.map((cert, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-black/40 border border-brand-crimson/25 text-brand-offwhite/90"
                  >
                    {cert.name.split(' ')[0]} {cert.name.split(' ')[1]}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Schematic & Hardware Telemetry */}
          <div className="lg:col-span-7 bg-brand-burgundy/40 border border-brand-crimson/30 rounded-3xl p-7 sm:p-10 backdrop-blur-xl flex flex-col justify-between shadow-luxury-dark relative">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-brand-maroon/60">
                <span className="text-xs font-mono text-brand-gold uppercase tracking-widest flex items-center font-bold">
                  <Activity className="w-3.5 h-3.5 mr-1.5 text-brand-solar" />
                  Hardware Spec Sheet
                </span>
                <span className="text-xs font-mono text-brand-gold bg-brand-burgundy px-2.5 py-1 rounded border border-brand-crimson/30">
                  REF: KMT-ENG-2026
                </span>
              </div>

              <div className="py-6">
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2">
                  {activeTech.title}
                </h3>
                <p className="text-sm sm:text-base text-brand-offwhite/85 leading-relaxed font-light mb-8">
                  {activeTech.description}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {activeTech.specs.map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-brand-burgundy/80 border border-brand-crimson/20 shadow-sm">
                      <span className="text-[11px] font-mono text-brand-offwhite/50 uppercase block">
                        {item.label}
                      </span>
                      <div className="text-lg sm:text-xl font-bold font-display text-brand-gold mt-1">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated Live Diagnostic Stream */}
            <div className="pt-6 border-t border-brand-maroon/50 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-mono text-brand-offwhite/60 gap-3">
              <span className="flex items-center text-brand-solar">
                <Gauge className="w-4 h-4 mr-1.5 text-brand-solar" />
                Real-Time String Telemetry (100ms Edge Inverter Polling)
              </span>
              <span className="text-brand-gold">
                MNRE ALMM &amp; IEC Certified Standards
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
