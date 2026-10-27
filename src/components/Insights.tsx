import React, { useState } from 'react';
import { BookOpen, ArrowUpRight, Clock, FileText } from 'lucide-react';
import { siteConfig } from '../data/config';

export const Insights: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<typeof siteConfig.insights[0] | null>(null);

  return (
    <section id="insights" className="py-24 bg-brand-offwhite relative overflow-hidden border-t border-brand-maroon/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-blush border border-brand-maroon/20 text-brand-maroon text-xs font-mono font-semibold uppercase tracking-wider mb-4">
              <BookOpen className="w-3.5 h-3.5 text-brand-crimson" />
              <span>Solar Knowledge &amp; Industry Briefs</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-brand-charcoal tracking-tight">
              Solar Engineering &amp; Tariff Analysis.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 max-w-md text-brand-muted text-sm sm:text-base font-light">
            Insights on commercial energy tariffs, net-metering approvals, battery storage economics, and bifacial module physics.
          </p>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteConfig.insights.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-3xl overflow-hidden border border-brand-maroon/15 shadow-luxury hover:shadow-xl hover:border-brand-crimson/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-brand-charcoal">
                  <img
                    src={item.image}
                    alt={item.title}
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.92]"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-brand-burgundy/90 text-brand-solar border border-brand-crimson/30">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-3 text-xs font-mono text-brand-muted mb-3">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1 text-brand-crimson" />
                      {item.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-brand-charcoal group-hover:text-brand-crimson transition-colors mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-body leading-relaxed line-clamp-3">
                    {item.snippet}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedArticle(item)}
                  className="w-full pt-4 border-t border-brand-maroon/10 flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-brand-burgundy hover:text-brand-crimson transition-colors"
                >
                  <span>Read Full Technical Brief</span>
                  <ArrowUpRight className="w-4 h-4 text-brand-crimson" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-brand-crimson/30 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors font-bold text-xs"
              aria-label="Close article modal"
            >
              ✕
            </button>

            <div className="flex items-center space-x-3 text-xs font-mono text-brand-burgundy mb-3 font-semibold">
              <span className="px-2.5 py-0.5 rounded bg-brand-blush border border-brand-maroon/20 text-brand-burgundy">{selectedArticle.category}</span>
              <span>{selectedArticle.date}</span>
              <span>• {selectedArticle.readTime}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold font-display text-brand-charcoal mb-4 leading-snug">
              {selectedArticle.title}
            </h3>

            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
              className="w-full h-56 object-cover rounded-2xl mb-6 shadow-md"
            />

            <div className="prose text-sm sm:text-base text-brand-body space-y-4 leading-relaxed">
              <p className="font-semibold text-brand-charcoal">
                {selectedArticle.snippet}
              </p>
              <p>
                Across commercial and industrial sectors, escalating utility electricity tariffs represent one of the fastest-growing operational expenditure items. Installing on-site rooftop solar or captive open-access capacity shields facilities from unpredictable grid price hikes.
              </p>
              <p>
                Modern high-efficiency modules paired with multi-MPPT inverters and lithium energy storage ensure continuous generation and reliable operational stability throughout daylight and peak demand hours.
              </p>
              <div className="p-4 rounded-xl bg-brand-blush/40 border border-brand-maroon/15 text-xs font-mono text-brand-burgundy">
                Key takeaway: Integrating solar energy with intelligent storage guarantees rapid capital payback and long-term operating cost control.
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-brand-maroon via-brand-crimson to-brand-solar hover:brightness-110 shadow-glow-crimson"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
