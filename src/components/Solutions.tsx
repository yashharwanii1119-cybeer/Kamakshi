import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Zap, MessageCircle, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../data/config';
import { getSolutionWhatsAppUrl } from '../utils/whatsapp';
import { getAssetUrl } from '../utils/asset';

export const Solutions: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Safe catch for browser autoplay policies
      });
    }
  }, []);
  return (
    <section id="solutions" className="py-24 bg-brand-offwhite relative overflow-hidden border-t border-brand-maroon/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-blush border border-brand-maroon/20 text-brand-maroon text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5 text-brand-crimson" />
              <span>Turnkey Clean Energy Solutions</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-brand-charcoal tracking-tight">
              Engineered Solutions for Every Energy Need.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-brand-muted text-sm sm:text-base font-light">
            Turnkey solar EPC, high-efficiency ALMM modules, seamless DISCOM net-metering, battery energy storage, and long-term asset maintenance.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.solutions.map((solution, idx) => {
            const whatsappUrl = getSolutionWhatsAppUrl(solution.title);

            return (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white rounded-3xl overflow-hidden border border-brand-maroon/15 shadow-luxury hover:shadow-2xl hover:border-brand-crimson/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Visual Header */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-brand-charcoal">
                    <img
                      src={solution.image}
                      alt={`${solution.title} — Kamakshi Traders Solar Solutions Jodhpur Rajasthan`}
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      width="600"
                      height="400"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.95]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-brand-burgundy/90 text-brand-solar backdrop-blur-md border border-brand-crimson/30">
                        {solution.category}
                      </span>
                    </div>

                    {/* Highlight Metric Badge */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-[11px] font-mono text-brand-gold font-bold flex items-center">
                        <ShieldCheck className="w-3.5 h-3.5 mr-1 text-brand-solar" />
                        {solution.highlightMetric}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7">
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-brand-charcoal mb-2 group-hover:text-brand-crimson transition-colors">
                      {solution.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-brand-maroon font-semibold mb-3">
                      {solution.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-brand-body leading-relaxed mb-5">
                      {solution.description}
                    </p>

                    {/* Bullet Highlights */}
                    <ul className="space-y-2 mb-2">
                      {solution.features.slice(0, 3).map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start text-xs text-brand-charcoal">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-crimson flex-shrink-0 mt-0.5 mr-2" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action CTA */}
                <div className="px-6 pb-6 pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center py-3.5 px-4 rounded-full text-xs font-bold text-white bg-gradient-to-r from-brand-maroon via-brand-crimson to-brand-solar hover:brightness-110 shadow-glow-crimson transition-all duration-200 group/btn"
                  >
                    <MessageCircle className="w-4 h-4 mr-2 text-white" />
                    <span>Enquire on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-1 transition-transform text-brand-gold" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* On-Site Engineering & Installation Continuous Silent Video */}
        <div className="mt-14 max-w-lg sm:max-w-xl mx-auto">
          <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-brand-maroon/20 shadow-luxury hover:border-brand-crimson/40 transition-all duration-300">
            <div className="relative rounded-xl overflow-hidden aspect-video bg-brand-charcoal border border-brand-maroon/15">
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={getAssetUrl("images/video/poster.png")}
                width="1280"
                height="720"
                title="Kamakshi Traders Solar Installation and Field Engineering Overview"
                aria-label="Field engineering and rooftop solar installation overview by Kamakshi Traders"
                className="w-full h-full object-cover"
              >
                <source src={getAssetUrl("images/video/gemini_generated_video_73d62f32_gwr_video_mvp.mp4")} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
