import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, MessageCircle } from 'lucide-react';
import { siteConfig } from '../data/config';
import { getWhatsAppUrl } from '../utils/whatsapp';

interface ProjectsProps {
  onOpenQuote?: () => void;
}

export const Projects: React.FC<ProjectsProps> = () => {
  return (
    <section id="projects" className="py-24 bg-brand-offwhite relative overflow-hidden border-t border-brand-maroon/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-blush border border-brand-maroon/20 text-brand-maroon text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              <Layers className="w-3.5 h-3.5 text-brand-crimson" />
              <span>Project Benchmarks &amp; Installations</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-brand-charcoal tracking-tight">
              Landmark Clean Power Engineering.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-brand-muted text-sm sm:text-base font-light">
            Every commissioned solar deployment reflects our unyielding commitment to uptime, yield predictability, and structural durability.
          </p>
        </div>

        {/* Projects Grid - Clean Image-Only Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {siteConfig.projects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="group rounded-3xl overflow-hidden border border-brand-maroon/15 shadow-luxury hover:shadow-2xl hover:border-brand-crimson/40 transition-all duration-500 bg-brand-charcoal relative h-72 sm:h-80 md:h-96"
              >
                <img
                  src={project.image}
                  alt={`${project.title} — ${project.capacity} in ${project.location} by Kamakshi Traders Solar Solutions`}
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  width="1024"
                  height="768"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Global CTA Bar */}
        <div className="mt-14 p-8 rounded-3xl bg-brand-burgundy text-white flex flex-col md:flex-row items-center justify-between shadow-luxury-dark border border-brand-crimson/30">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Have a commercial rooftop or industrial land parcel?
            </h3>
            <p className="text-sm text-brand-offwhite/80 mt-1 font-light">
              Our engineering team conducts site irradiance modeling, structural design, and DISCOM interconnection feasibility.
            </p>
          </div>
          <a
            href={getWhatsAppUrl('Hello Kamakshi Traders — Solar Solutions, I have a commercial rooftop or industrial land parcel and would like to request an installation feasibility review.')}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 md:mt-0 px-7 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-brand-maroon via-brand-crimson to-brand-solar hover:brightness-110 shadow-glow-crimson transition-all duration-200 whitespace-nowrap inline-flex items-center"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            <span>Enquire on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
