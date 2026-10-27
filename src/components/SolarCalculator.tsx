import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRight, Zap, TrendingUp, ShieldCheck, Sun, Info, ChevronDown, Check, Percent, Globe, Award, Leaf } from 'lucide-react';
import { siteConfig, CurrencyCode, MarketProfile } from '../data/config';

interface SolarCalculatorProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (code: CurrencyCode) => void;
  onOpenQuoteWithDetails: (details: {
    propertyType: string;
    monthlyBill: number;
    currencyCode: CurrencyCode;
    formattedSpend: string;
    recommendedKw: number;
    storageHours: number;
    estimatedSavings: number;
  }) => void;
}

export const SolarCalculator: React.FC<SolarCalculatorProps> = ({
  currentCurrency,
  onCurrencyChange,
  onOpenQuoteWithDetails
}) => {
  const market: MarketProfile = siteConfig.markets[currentCurrency];
  const { assumptions } = market;

  // Selected property type within market
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);
  const currentType = market.propertyTypes[selectedTypeIndex] || market.propertyTypes[0];

  // Configurable sliders
  const isINR = currentCurrency === 'INR';
  const initialMonthlySpend = isINR ? 1200000 : 25000;
  const [monthlySpend, setMonthlySpend] = useState<number>(initialMonthlySpend);
  const [storageHours, setStorageHours] = useState<number>(4);
  const [showAssumptions, setShowAssumptions] = useState<boolean>(false);

  // Sync spend when currency changes
  useEffect(() => {
    setMonthlySpend(currentCurrency === 'INR' ? 1200000 : 25000);
    setSelectedTypeIndex(0);
  }, [currentCurrency]);

  // Derived financial & engineering calculations
  const calculations = useMemo(() => {
    const tariff = currentType.avgTariffPerKwh; // in currency/kWh
    const specificYield = assumptions.solarYieldHours; // kWh/kWp/yr

    // 1. Array Sizing (Capacity) based on annual consumption
    const annualSpend = monthlySpend * 12;
    const annualKwhNeeded = annualSpend / tariff;
    const idealKw = Math.round(annualKwhNeeded / specificYield);
    const recommendedKw = Math.max(10, Math.min(idealKw, isINR ? 15000 : 25000));

    // 2. Year-1 Generation & Avoided Energy Cost
    const year1GenerationKwh = recommendedKw * specificYield;
    const year1GenerationMwh = Math.round(year1GenerationKwh / 1000);
    const year1AvoidedCost = year1GenerationKwh * tariff;

    // 3. Turnkey CapEx Benchmark (Solar Base + BESS Battery Bank)
    const baseCapex = recommendedKw * (assumptions.capexPerWattBase * 1000);
    const bessCapex = storageHours > 0
      ? recommendedKw * (assumptions.bessCapexPerHourPerWatt * storageHours * 1000)
      : 0;
    const totalCapEx = baseCapex + bessCapex;

    // 4. Annual Scheduled OpEx
    const baseAnnualOpex = recommendedKw * assumptions.annualOpExPerKw;
    const year1NetSavings = year1AvoidedCost - baseAnnualOpex;

    // 5. 25-Year Cumulative Granular Cash Flow & Discounted NPV
    let cumulativeNominalCashFlow = -totalCapEx;
    let cumulativeDiscountedNPV = -totalCapEx;
    let paybackYears = 0;
    let paybackFound = false;

    for (let yr = 1; yr <= 25; yr++) {
      // Annual linear panel degradation (0.4%/yr)
      const degradationFactor = Math.pow(1 - assumptions.annualDegradation, yr - 1);
      const generationYr = year1GenerationKwh * degradationFactor;

      // Annual compounding utility tariff escalation
      const tariffYr = tariff * Math.pow(1 + assumptions.annualTariffEscalation, yr - 1);
      const avoidedCostYr = generationYr * tariffYr;

      // Annual compounding OpEx escalation (2.5%/yr)
      const opexYr = baseAnnualOpex * Math.pow(1 + 0.025, yr - 1);

      // Net Annual Operational Cash Flow
      const netCashFlowYr = avoidedCostYr - opexYr;

      cumulativeNominalCashFlow += netCashFlowYr;

      // Discounted Cash Flow for NPV
      const discountFactor = Math.pow(1 + assumptions.discountRate, yr);
      cumulativeDiscountedNPV += netCashFlowYr / discountFactor;

      if (!paybackFound && cumulativeNominalCashFlow >= 0) {
        const prevCash = cumulativeNominalCashFlow - netCashFlowYr;
        const fraction = Math.abs(prevCash) / netCashFlowYr;
        paybackYears = Math.round((yr - 1 + fraction) * 10) / 10;
        paybackFound = true;
      }
    }

    if (!paybackFound) {
      paybackYears = Math.round((totalCapEx / Math.max(year1NetSavings, 1)) * 10) / 10;
    }

    // 6. Environmental Offset Metrics
    const co2OffsetTons = Math.round(year1GenerationMwh * market.co2FactorTonsPerMwh);
    const treesEquivalent = Math.round(co2OffsetTons * 45);

    return {
      recommendedKw,
      year1GenerationMwh,
      year1NetSavings,
      totalCapEx,
      cumulativeNominalSavings: cumulativeNominalCashFlow,
      cumulativeDiscountedNPV,
      paybackYears,
      co2OffsetTons,
      treesEquivalent,
    };
  }, [monthlySpend, storageHours, currentType, assumptions, market, isINR]);

  const handleProceedToQuote = () => {
    onOpenQuoteWithDetails({
      propertyType: currentType.label,
      monthlyBill: monthlySpend,
      currencyCode: currentCurrency,
      formattedSpend: market.formatAmount(monthlySpend, false),
      recommendedKw: calculations.recommendedKw,
      storageHours,
      estimatedSavings: calculations.cumulativeNominalSavings
    });
  };

  const sliderMin = isINR ? 100000 : 5000;
  const sliderMax = isINR ? 5000000 : 150000;
  const sliderStep = isINR ? 50000 : 2500;

  return (
    <section id="calculator" className="py-24 bg-brand-offwhite relative overflow-hidden border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Market / Currency Selector Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-gold-surface border border-brand-gold/40 text-brand-deep-charcoal text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <Calculator className="w-3.5 h-3.5 text-brand-gold-deep" />
              <span>Interactive Clean Yield &amp; ROI Modeler</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-brand-charcoal tracking-tight">
              Calculate Your Solar Yield &amp; Capital Payback.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-brand-muted font-light leading-relaxed">
              Test rigorous financial engineering assumptions in real-time. Project kilowatt-peak requirements, localized grid tariff offsets, and multi-decade balance sheet savings.
            </p>
          </div>

          {/* Regional Market & Currency Switcher Pill */}
          <div className="bg-white p-1.5 rounded-2xl border border-brand-border shadow-sm flex items-center space-x-1.5 self-start md:self-end">
            <span className="text-xs font-mono text-brand-muted px-2.5 flex items-center">
              <Globe className="w-3.5 h-3.5 mr-1 text-brand-gold-deep" />
              Market:
            </span>
            <button
              onClick={() => onCurrencyChange('INR')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                currentCurrency === 'INR'
                  ? 'bg-brand-deep-charcoal text-brand-gold border border-brand-gold/40 shadow-sm'
                  : 'text-brand-charcoal hover:bg-brand-gold-surface'
              }`}
            >
              India (₹ INR / Lakhs / Cr)
            </button>
            <button
              onClick={() => onCurrencyChange('USD')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                currentCurrency === 'USD'
                  ? 'bg-brand-burgundy text-white shadow-sm'
                  : 'text-brand-charcoal hover:bg-brand-blush'
              }`}
            >
              Global ($ USD / M)
            </button>
          </div>
        </div>

        {/* Main Interactive Tool Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Sliders & Configuration */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-9 shadow-luxury border border-brand-maroon/15">
            {/* Step 1: Property Type */}
            <div className="mb-8">
              <label className="block text-xs font-mono uppercase tracking-wider text-brand-maroon font-bold mb-3">
                01. Select Facility Classification &amp; Tariff Schedule
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {market.propertyTypes.map((preset, index) => (
                  <button
                    key={preset.type}
                    onClick={() => setSelectedTypeIndex(index)}
                    className={`text-left p-3.5 rounded-xl border text-sm transition-all duration-200 ${
                      selectedTypeIndex === index
                        ? 'border-brand-crimson bg-brand-blush text-brand-burgundy font-semibold shadow-sm ring-1 ring-brand-crimson'
                        : 'border-brand-maroon/15 hover:border-brand-crimson/40 text-brand-charcoal bg-white'
                    }`}
                  >
                    <div className="font-display text-sm font-bold text-brand-charcoal">{preset.label}</div>
                    <div className="text-[11px] text-brand-muted mt-1 font-mono">
                      Ref Tariff: {market.currencySymbol}{preset.avgTariffPerKwh.toFixed(2)}/kWh • {preset.typicalKwRange}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Monthly Electricity Expenditure Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-mono uppercase tracking-wider text-brand-maroon font-bold">
                  02. Current Monthly Electricity Spend
                </label>
                <span className="text-2xl font-bold font-display text-brand-burgundy">
                  {market.formatAmount(monthlySpend, false)}
                  <span className="text-xs text-brand-muted font-normal"> / mo</span>
                </span>
              </div>
              <input
                type="range"
                min={sliderMin}
                max={sliderMax}
                step={sliderStep}
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="w-full h-2.5 bg-brand-blush rounded-lg appearance-none cursor-pointer accent-brand-crimson"
                aria-label="Monthly electricity expenditure slider"
              />
              <div className="flex justify-between text-[11px] font-mono text-brand-muted mt-2">
                <span>{market.formatAmount(sliderMin, true)} / mo (Light C&amp;I)</span>
                <span>{market.formatAmount((sliderMin + sliderMax) / 2, true)} / mo</span>
                <span>{market.formatAmount(sliderMax, true)}+ / mo (Heavy Industrial)</span>
              </div>
            </div>

            {/* Step 3: Energy Storage Integration */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-mono uppercase tracking-wider text-brand-maroon font-bold">
                  03. BESS Storage Autonomy Target
                </label>
                <span className="text-xs font-mono text-brand-crimson font-bold">
                  {storageHours === 0 ? 'Direct Grid Export' : `${storageHours}h Islanding Reserve`}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[0, 2, 4, 8].map((hours) => (
                  <button
                    key={hours}
                    onClick={() => setStorageHours(hours)}
                    className={`py-2.5 px-3 rounded-xl text-center text-xs font-mono transition-all duration-200 border font-semibold ${
                      storageHours === hours
                        ? 'bg-brand-burgundy text-white border-brand-burgundy shadow-sm'
                        : 'bg-white text-brand-charcoal hover:bg-brand-blush border-brand-maroon/15'
                    }`}
                  >
                    {hours === 0 ? 'No Storage' : `${hours} Hours Reserve`}
                  </button>
                ))}
              </div>
            </div>

            {/* Transparent Assumptions & Methodology Accordion */}
            <div className="mt-6 border-t border-brand-maroon/15 pt-4">
              <button
                onClick={() => setShowAssumptions(!showAssumptions)}
                className="flex items-center justify-between w-full text-xs font-mono text-brand-muted hover:text-brand-burgundy transition-colors py-1 font-medium"
              >
                <span className="flex items-center">
                  <Info className="w-3.5 h-3.5 mr-1.5 text-brand-crimson" />
                  View Explicit Financial &amp; Engineering Assumptions (No Guaranteed Yields Implied)
                </span>
                <ChevronDown className={`w-3.5 h-3.5 transform transition-transform text-brand-maroon ${showAssumptions ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showAssumptions && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 p-4 rounded-xl bg-brand-offwhite border border-brand-maroon/15 text-xs text-brand-muted space-y-1.5 font-mono"
                  >
                    <div>• <strong>Specific Solar Yield:</strong> {assumptions.solarYieldHours} kWh/kWp/year ({currentCurrency === 'INR' ? 'Indian regional median' : 'Global reference'})</div>
                    <div>• <strong>Annual Module Degradation:</strong> {(assumptions.annualDegradation * 100).toFixed(2)}%/year linear (N-Type TOPCon benchmark)</div>
                    <div>• <strong>Utility Tariff Escalation:</strong> {(assumptions.annualTariffEscalation * 100).toFixed(1)}%/year conservative retail power escalation</div>
                    <div>• <strong>Annual Scheduled O&amp;M:</strong> {market.currencySymbol}{assumptions.annualOpExPerKw.toFixed(0)}/kWp/year (escalated at 2.5%/yr)</div>
                    <div>• <strong>Base Turnkey EPC Benchmark:</strong> {market.currencySymbol}{assumptions.capexPerWattBase.toFixed(1)}/Wp rooftop + {market.currencySymbol}{(storageHours * assumptions.bessCapexPerHourPerWatt).toFixed(1)}/Wp BESS</div>
                    <div>• <strong>Hurdle / Discount Rate:</strong> {(assumptions.discountRate * 100).toFixed(1)}% for Net Present Value (NPV) calculation</div>
                    <div className="pt-2 text-[10px] text-brand-muted italic">
                      * Statutory Disclaimer: All figures are indicative financial engineering models. Kamakshi Traders — Solar Solutions does not guarantee future savings, irradiance, or utility tariff schedules. Definite yield verification requires formal LiDAR 3D shading assessment, geotechnical survey, and local DISCOM connectivity approval.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Dynamic Yield Projection Card */}
          <div className="lg:col-span-5 bg-brand-burgundy text-white rounded-3xl p-7 sm:p-9 shadow-luxury-dark border border-brand-crimson/30 relative overflow-hidden">
            {/* Ambient Crimson Glow Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-crimson/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between pb-5 border-b border-brand-maroon/50">
                <span className="text-xs font-mono uppercase tracking-widest text-brand-offwhite/70">
                  Engineering Model Output (Est.)
                </span>
                <span className="inline-flex items-center text-xs font-mono text-brand-gold font-bold">
                  <Award className="w-3.5 h-3.5 mr-1" />
                  Grade A Feasibility
                </span>
              </div>

              {/* Big Metric: 25-Year Estimated Net Cumulative Savings */}
              <div className="py-6">
                <span className="text-xs font-mono text-brand-offwhite/60 uppercase tracking-wider block">
                  Estimated 25-Year Nominal Cumulative Net Savings
                </span>
                <div className="text-4xl sm:text-5xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-solar to-brand-gold tracking-tight mt-1">
                  {market.formatAmount(calculations.cumulativeNominalSavings, true)}
                </div>
                <div className="text-xs text-brand-solar font-medium mt-1 font-mono">
                  ~{market.formatAmount(calculations.year1NetSavings, false)} Year-1 Net OpEx Reduction
                </div>
                {/* Discounted NPV Pill */}
                <div className="mt-3 inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-black/40 border border-brand-crimson/30 text-[11px] font-mono text-brand-offwhite/90">
                  <Percent className="w-3 h-3 text-brand-gold" />
                  <span>Discounted NPV (@{(assumptions.discountRate * 100).toFixed(1)}%): <strong className="text-brand-gold">{market.formatAmount(calculations.cumulativeDiscountedNPV, true)}</strong></span>
                </div>
              </div>

              {/* Metric Breakdown Grid */}
              <div className="grid grid-cols-2 gap-4 py-5 border-y border-brand-maroon/50">
                <div>
                  <span className="text-[11px] font-mono text-brand-offwhite/60 uppercase block">
                    Recommended PV Size
                  </span>
                  <div className="text-xl font-bold font-display text-white mt-0.5">
                    {calculations.recommendedKw.toLocaleString()} kWp
                  </div>
                  <span className="text-[10px] text-brand-offwhite/50">
                    Bifacial Array Target
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-brand-offwhite/60 uppercase block">
                    Annual Clean Yield
                  </span>
                  <div className="text-xl font-bold font-display text-brand-gold mt-0.5">
                    {calculations.year1GenerationMwh.toLocaleString()} MWh
                  </div>
                  <span className="text-[10px] text-brand-offwhite/50">
                    Year-1 Generation
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-brand-offwhite/60 uppercase block">
                    Simple Payback
                  </span>
                  <div className="text-xl font-bold font-display text-white mt-0.5">
                    {calculations.paybackYears} Years
                  </div>
                  <span className="text-[10px] text-brand-offwhite/50">
                    Est. Capital Recovery
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-brand-offwhite/60 uppercase block">
                    Annual CO₂ Abatement
                  </span>
                  <div className="text-xl font-bold font-display text-brand-solar mt-0.5 flex items-center">
                    <Leaf className="w-4 h-4 mr-1 text-brand-solar" />
                    {calculations.co2OffsetTons.toLocaleString()} MT
                  </div>
                  <span className="text-[10px] text-brand-offwhite/50">
                    ~{calculations.treesEquivalent.toLocaleString()} Trees Equiv.
                  </span>
                </div>
              </div>

              {/* Call to Action Button */}
              <div className="pt-6">
                <button
                  onClick={handleProceedToQuote}
                  className="w-full flex items-center justify-center py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-brand-maroon via-brand-crimson to-brand-solar hover:brightness-110 shadow-glow-crimson transition-all duration-300 transform active:scale-95 group"
                >
                  <span>Lock In This Configuration &amp; Request Proposal</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform text-brand-gold" />
                </button>
                <div className="text-center mt-2.5">
                  <span className="text-[11px] text-brand-offwhite/60 font-mono">
                    Inputs transfer directly into your custom engineering dossier.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
