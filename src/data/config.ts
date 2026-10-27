import { getAssetUrl } from '../utils/asset';

export type CurrencyCode = 'INR' | 'USD';

export interface MarketProfile {
  currencyCode: CurrencyCode;
  currencySymbol: string;
  currencyUnitPrefix: string;
  formatAmount: (amount: number, compact?: boolean) => string;
  tariffUnit: string;
  typicalYieldKwhPerKwp: number; // Regional GHI / specific yield
  co2FactorTonsPerMwh: number; // Regional grid emission factor
  assumptions: {
    solarYieldHours: number;
    annualDegradation: number; // 0.004 (0.4%/yr)
    annualTariffEscalation: number; // 2.5% to 3.5%/yr
    annualOpExPerKw: number; // Routine O&M per kW
    capexPerWattBase: number; // Base turnkey EPC cost
    bessCapexPerHourPerWatt: number; // Battery cost per hour autonomy
    discountRate: number; // For Net Present Value (NPV)
  };
  propertyTypes: {
    type: string;
    label: string;
    sectorDescription: string;
    avgTariffPerKwh: number;
    typicalKwRange: string;
  }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  clientPlaceholder: string;
  category: 'Industrial' | 'Utility Scale' | 'Commercial' | 'Microgrid' | 'Residential' | string;
  capacity: string;
  location: string;
  metrics: {
    annualYield: string;
    co2Offset: string;
    efficiency: string;
  };
  image: string;
  description: string;
  tags: string[];
}

export interface SolutionItem {
  id: string;
  title: string;
  tagline: string;
  iconName: string;
  category: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  highlightMetric: string;
  image: string;
}

export interface SiteConfig {
  company: {
    brandName: string;
    brandDescriptor: string;
    fullDisplayName: string;
    logoPath: string;
    legalNamePlaceholder: string;
    tagline: string;
    subheadline: string;
    foundedYear: string;
    headquartersPlaceholder: string;
    regionalOfficesPlaceholder: string;
    phonePlaceholder: string;
    emailPlaceholder: string;
    email?: string;
    instagramHandle?: string;
    instagramUrl?: string;
    operationalHours: string;
  };
  complianceFramework: {
    name: string;
    authority: string;
    referenceCode: string;
    description: string;
  }[];
  heroStats: {
    label: string;
    value: string;
    subtext: string;
    isBenchmark: boolean;
  }[];
  markets: {
    INR: MarketProfile;
    USD: MarketProfile;
  };
  solutions: SolutionItem[];
  projects: ProjectItem[];
  technologyFeatures: {
    title: string;
    subtitle: string;
    description: string;
    specs: { label: string; value: string }[];
  }[];
  insights: {
    title: string;
    category: string;
    readTime: string;
    date: string;
    snippet: string;
    image: string;
  }[];
  legalPolicies: {
    id: string;
    title: string;
    lastUpdated: string;
    summary: string;
    sections: { heading: string; body: string }[];
  }[];
}

// Indian Number Formatter (Lakhs & Crores)
export function formatINR(amount: number, compact: boolean = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  if (compact) {
    if (abs >= 10000000) {
      return `${sign}₹${(abs / 10000000).toFixed(2)} Cr`;
    }
    if (abs >= 100000) {
      return `${sign}₹${(abs / 100000).toFixed(2)} Lakh`;
    }
    if (abs >= 1000) {
      return `${sign}₹${(abs / 1000).toFixed(1)}k`;
    }
    return `${sign}₹${Math.round(abs)}`;
  }

  // Full Indian Lakhs/Crore comma notation (e.g. 12,34,567)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

// USD Currency Formatter
export function formatUSD(amount: number, compact: boolean = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '$0';
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  if (compact) {
    if (abs >= 1000000) {
      return `${sign}$${(abs / 1000000).toFixed(2)}M`;
    }
    if (abs >= 1000) {
      return `${sign}$${(abs / 1000).toFixed(1)}k`;
    }
    return `${sign}$${Math.round(abs)}`;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export const siteConfig: SiteConfig = {
  company: {
    brandName: "Kamakshi Traders",
    brandDescriptor: "Solar Solutions",
    fullDisplayName: "Kamakshi Traders — Solar Solutions",
    logoPath: getAssetUrl("images/kamakshi-traders-logo.png"),
    legalNamePlaceholder: "[COMPANY_LEGAL_ENTITY_NAME_PLACEHOLDER — e.g. Kamakshi Traders / Kamakshi Solar Solutions Pvt. Ltd.]",
    tagline: "Powering Progress. Engineered for Clean Independence.",
    subheadline: "Turnkey rooftop and commercial solar EPC, high-efficiency photovoltaic infrastructure, and battery storage engineered for maximum lifetime ROI.",
    foundedYear: "2018",
    headquartersPlaceholder: "[REGISTERED_OFFICE_ADDRESS_PLACEHOLDER — Commercial Complex / Trade Center, India]",
    regionalOfficesPlaceholder: "[REGIONAL_OFFICES_PLACEHOLDER — Regional Sales & Project Engineering Offices]",
    phonePlaceholder: "+91 70144 93079",
    emailPlaceholder: "kamakshitradersjodhpur@gmail.com",
    email: "kamakshitradersjodhpur@gmail.com",
    instagramHandle: "@kamakshitradersjodhpur",
    instagramUrl: "https://www.instagram.com/kamakshitradersjodhpur/",
    operationalHours: "Monday – Saturday: 09:00 – 18:30 (IST) | 24/7 Remote Monitoring Support",
  },
  complianceFramework: [
    {
      name: "MNRE ALMM Approved Module Mandate",
      authority: "Ministry of New and Renewable Energy (India)",
      referenceCode: "[ALMM_REGISTRATION_ID_PLACEHOLDER]",
      description: "Hardware compliant with Approved List of Models and Manufacturers requirements for commercial and open-access solar."
    },
    {
      name: "IEC 61215 / IEC 61730 PV Reliability Standards",
      authority: "Bureau of Indian Standards (BIS) / TUV Rheinland",
      referenceCode: "[BIS_REGISTRATION_R_NUMBER_PLACEHOLDER]",
      description: "Accelerated thermal cycling (-40°C to +85°C), high-humidity freeze, mechanical static/dynamic load certification."
    },
    {
      name: "CEA Technical Standards for Grid Connectivity",
      authority: "Central Electricity Authority (India)",
      referenceCode: "[CEA_REGULATION_REF_PLACEHOLDER]",
      description: "Stringent low-voltage ride-through (LVRT), frequency-droop response, and anti-islanding compliance for HT consumer interconnection."
    },
    {
      name: "ISO 9001:2015 & ISO 14001:2015 Management Systems",
      authority: "International Quality & Environmental Certification",
      referenceCode: "[ISO_CERTIFICATION_ID_PLACEHOLDER]",
      description: "Rigorous EPC lifecycle engineering audit, safety assurance, and ethical traceable supply-chain standards."
    }
  ],
  heroStats: [
    {
      label: "Clean Capacity Engineering Benchmark",
      value: "4.8 GWp",
      subtext: "Global team cumulative pipeline experience",
      isBenchmark: true,
    },
    {
      label: "N-Type TOPCon Cell Efficiency",
      value: "24.6% STC",
      subtext: "Standard Test Condition laboratory benchmark",
      isBenchmark: true,
    },
    {
      label: "Telemetry Target Availability",
      value: "99.98%",
      subtext: "High-frequency SCADA monitoring uptime SLA",
      isBenchmark: true,
    },
    {
      label: "Simulated Lifecycle CO₂ Abatement",
      value: "5.2M MT",
      subtext: "Cumulative 25-year environmental offset model",
      isBenchmark: true,
    }
  ],
  markets: {
    INR: {
      currencyCode: 'INR',
      currencySymbol: '₹',
      currencyUnitPrefix: '₹',
      formatAmount: formatINR,
      tariffUnit: '₹/kWh',
      typicalYieldKwhPerKwp: 1550, // Specific yield across Central/Western/Southern India (Gujarat, Maharashtra, Karnataka, Tamil Nadu)
      co2FactorTonsPerMwh: 0.82, // Central Electricity Authority (CEA) Indian grid emission factor (~0.82 tCO2/MWh)
      assumptions: {
        solarYieldHours: 1550, // 1 kWp yields ~1,550 kWh/year in Indian climatic irradiance
        annualDegradation: 0.004, // 0.40% linear degradation per year
        annualTariffEscalation: 0.035, // 3.5% historic average annual DISCOM commercial tariff escalation
        annualOpExPerKw: 480, // ₹480/kWp/year (~₹4.8 Lakh/MWp/yr for module robotic washing, preventive O&M, insurance)
        capexPerWattBase: 38.0, // ₹38/Wp turn-key commercial rooftop EPC (~₹3.80 Cr/MWp with Tier-1 ALMM TOPCon & string inverters)
        bessCapexPerHourPerWatt: 7.5, // ~₹7.5/Wp per hour reserve (~₹7,500/kWh for liquid-cooled LFP containerized BESS)
        discountRate: 0.085, // 8.5% standard Indian commercial WACC / hurdle rate
      },
      propertyTypes: [
        {
          type: "Commercial",
          label: "Commercial & Office Campuses",
          sectorDescription: "IT Parks, Corporate HQs, Malls, Hospitals (DISCOM HT Commercial Tariff)",
          avgTariffPerKwh: 8.80, // Average commercial retail tariff (₹8.50 - ₹10.20/kWh across key DISCOMs)
          typicalKwRange: "100 kWp – 2.5 MWp"
        },
        {
          type: "Industrial",
          label: "Manufacturing & Heavy Industrial",
          sectorDescription: "Textiles, Auto Components, Steel, Cold Storages, Chemical Units",
          avgTariffPerKwh: 7.60, // Industrial tariff + demand charges
          typicalKwRange: "500 kWp – 20 MWp"
        },
        {
          type: "Utility",
          label: "Ground Mount & Open Access Captive",
          sectorDescription: "Group Captive / Third-Party Open Access Solar Parks",
          avgTariffPerKwh: 4.80, // Landed Open Access cost including wheeling/banking charges
          typicalKwRange: "5 MWp – 100+ MWp"
        },
        {
          type: "Residential",
          label: "Residential & Institutional Rooftop",
          sectorDescription: "Gated Communities, Colleges, Institutions & Large Estates",
          avgTariffPerKwh: 8.20,
          typicalKwRange: "10 kWp – 250 kWp"
        }
      ]
    },
    USD: {
      currencyCode: 'USD',
      currencySymbol: '$',
      currencyUnitPrefix: '$',
      formatAmount: formatUSD,
      tariffUnit: '$/kWh',
      typicalYieldKwhPerKwp: 1450,
      co2FactorTonsPerMwh: 0.42,
      assumptions: {
        solarYieldHours: 1450,
        annualDegradation: 0.004,
        annualTariffEscalation: 0.025,
        annualOpExPerKw: 12.0, // $12/kW/yr
        capexPerWattBase: 1.35, // $1.35/W
        bessCapexPerHourPerWatt: 0.20, // $0.20/W per hour
        discountRate: 0.065, // 6.5% standard USD hurdle rate
      },
      propertyTypes: [
        {
          type: "Commercial",
          label: "Commercial Rooftops & Campuses",
          sectorDescription: "Corporate Parks, Warehouses, Logistics",
          avgTariffPerKwh: 0.14,
          typicalKwRange: "250 kWp – 5 MWp"
        },
        {
          type: "Industrial",
          label: "Industrial Facilities & Manufacturing",
          sectorDescription: "Heavy fabrication, cold storage, automated processing",
          avgTariffPerKwh: 0.11,
          typicalKwRange: "1 MWp – 25 MWp"
        },
        {
          type: "Utility",
          label: "Utility & Grid-Scale Infrastructure",
          sectorDescription: "Ground-Mount Independent Power Production (IPP)",
          avgTariffPerKwh: 0.08,
          typicalKwRange: "10 MW – 200+ MW"
        },
        {
          type: "Microgrid",
          label: "Resilient Data Campus Microgrid",
          sectorDescription: "High-Availability Compute & Critical Infrastructure",
          avgTariffPerKwh: 0.19,
          typicalKwRange: "2 MW – 50 MW + BESS"
        }
      ]
    }
  },
  solutions: [
    {
      id: "commercial-industrial",
      title: "Commercial & Industrial Solar Solutions",
      tagline: "Turn unused roof, factory shed, and campus real estate into high-yield clean generation assets.",
      iconName: "Building2",
      category: "C&I Infrastructure",
      description: "Tailored for manufacturing plants, cold logistics chains, automobile hubs, and corporate campuses looking to slash peak grid tariffs, ensure zero disruption, and hedge power expenses for 25+ years.",
      features: [
        "High-Efficiency ALMM-Compliant Monocrystalline & TOPCon Solar Modules",
        "Zero-Membrane-Penetration Racking & Heavy Structural Industrial Canopies",
        "Automated Dynamic Peak-Load Shaving with Time-of-Day (TOD) Tariff Optimization",
        "Integrated Arc-Fault Circuit Interrupters (AFCI) and Module-Level Rapid Shutdown"
      ],
      specs: [
        { label: "Typical Capacity", value: "100 kWp – 10 MWp" },
        { label: "Est. Simple Payback", value: "3.2 – 4.5 Years" },
        { label: "Linear Warranty", value: "25 – 30 Year Performance Tier" },
        { label: "Substrate Fit", value: "Standing Seam, Metal Shed, RCC Flat Slab" }
      ],
      highlightMetric: "Up to 70% Energy Tariff Hedging",
      image: getAssetUrl("solar/solution-ci.svg")
    },
    {
      id: "residential-rooftop",
      title: "Residential Rooftop Solar Systems",
      tagline: "High-performance rooftop solar engineered for homes, villas, and housing societies.",
      iconName: "Sun",
      category: "Residential & Institutional",
      description: "Turnkey residential solar solutions with seamless net-metering DISCOM approvals, high-efficiency panels, smart mobile app monitoring, and optional battery backup to ensure uninterrupted power.",
      features: [
        "Tier-1 All-Black & High-Aesthetic Modules with Architectural Mounting",
        "Smart App-Based Generation Tracking & Real-Time Savings Telemetry",
        "Full DISCOM Net-Metering Paperwork & Grid Synchronization Handled Turnkey",
        "Optional Hybrid Inverter Architecture with Instantaneous Power Cutover"
      ],
      specs: [
        { label: "Typical Capacity", value: "3 kWp – 50 kWp" },
        { label: "Net Metering", value: "100% DISCOM Compliant" },
        { label: "Inverter Type", value: "High-Efficiency Hybrid / String" },
        { label: "System Warranty", value: "Comprehensive Workmanship & Performance" }
      ],
      highlightMetric: "Zero-Bill Lifestyle Architecture",
      image: getAssetUrl("solar/solution-scada.svg")
    },
    {
      id: "utility-photovoltaic",
      title: "Solar Power Plants & Open Access",
      tagline: "High-capacity ground-mount installations designed for utility resilience and open access.",
      iconName: "SunMedium",
      category: "Utility Scale & Open Access",
      description: "End-to-end solar power plant execution for independent power producers, industrial captive power consortia, and open-access consumers, incorporating high-voltage DC balance-of-system and substation integration.",
      features: [
        "Smart Single-Axis Trackers with 3D Backtracking Algorithms Minimizing Row Shadowing",
        "1500V DC Architecture Reducing Cable Cross-Sections and Combiner Losses",
        "Bifacial Energy Yield Gain with High-Albedo Ground Engineering",
        "High-Voltage Substation Interconnection (11kV / 33kV / 66kV / 132kV)"
      ],
      specs: [
        { label: "Typical Capacity", value: "5 MWp – 100+ MWp" },
        { label: "Wind Stiffening", value: "Certified up to 165 km/h" },
        { label: "Levelized Cost (LCOE)", value: "Ultra-Low Lifecycle Benchmark" },
        { label: "Grid Interconnection", value: "CEA & State Grid Code Compliant" }
      ],
      highlightMetric: "High-Albedo Bifacial Architecture",
      image: getAssetUrl("solar/solution-utility.svg")
    }
  ],
  projects: [
    {
      id: "jodhpur-pratap-nagar-rooftop",
      title: "Pratap Nagar Residential Rooftop Solar Plant",
      clientPlaceholder: "Commissioned Residential Net-Metered System",
      category: "Residential",
      capacity: "10 kWp High-Efficiency On-Grid",
      location: "Pratap Nagar, Jodhpur, Rajasthan",
      metrics: {
        annualYield: "15,800 kWh / yr",
        co2Offset: "13.0 MT CO₂ / yr",
        efficiency: "21.8% Module STC"
      },
      image: getAssetUrl("images/projects/project-3-jodhpur-commissioned.jpg"),
      description: "Fully commissioned grid-tied rooftop solar system with bi-directional DISCOM net metering, heavy-duty elevated mounting structure, and smart smartphone generation telemetry in Jodhpur.",
      tags: ["Residential Rooftop", "Net Metering", "Jodhpur", "Elevated Mounting"]
    },
    {
      id: "jodhpur-indira-colony-pv",
      title: "Indira Colony On-Grid Solar Installation",
      clientPlaceholder: "Private Residence Rooftop Solar EPC",
      category: "Residential",
      capacity: "8 kWp Bifacial PV System",
      location: "Indira Colony, Jodhpur, Rajasthan",
      metrics: {
        annualYield: "12,650 kWh / yr",
        co2Offset: "10.4 MT CO₂ / yr",
        efficiency: "22.1% Module STC"
      },
      image: getAssetUrl("images/projects/project-2-jodhpur-residential.jpg"),
      description: "Turnkey rooftop solar installation engineered for high thermal resilience under Rajasthan's intense irradiance, featuring corrosion-resistant structural mounting and rapid grid cutover protection.",
      tags: ["On-Grid Solar", "Bifacial PV", "Rajasthan", "DISCOM Approved"]
    },
    {
      id: "commercial-shed-rooftop-array",
      title: "Commercial Shed Rooftop Solar Array",
      clientPlaceholder: "Commercial Logistics & Warehouse Facility",
      category: "Commercial",
      capacity: "85 kWp Industrial Metal Shed Array",
      location: "Industrial Corridor, Rajasthan",
      metrics: {
        annualYield: "134,000 kWh / yr",
        co2Offset: "110 MT CO₂ / yr",
        efficiency: "22.4% Module STC"
      },
      image: getAssetUrl("images/projects/project-5-commercial-shed-array.png"),
      description: "Engineered rooftop installation on curved corrugated industrial shed utilizing non-penetrating clamping fixtures, high-efficiency monocrystalline modules, and smart string inverters.",
      tags: ["Commercial Shed", "Rooftop EPC", "Zero Penetration", "Peak Shaving"]
    },
    {
      id: "elevated-industrial-superstructure",
      title: "Elevated Solar Superstructure & Shed Plant",
      clientPlaceholder: "Industrial Manufacturing Facility",
      category: "Industrial",
      capacity: "120 kWp Elevated Shed Solar Array",
      location: "Western Industrial Corridor, India",
      metrics: {
        annualYield: "190,000 kWh / yr",
        co2Offset: "155 MT CO₂ / yr",
        efficiency: "22.3% Module STC"
      },
      image: getAssetUrl("images/projects/project-1-rooftop-structure.jpg"),
      description: "High-clearance hot-dip galvanized elevated mounting superstructure built above an industrial shed, optimizing rooftop space utilization while maintaining ventilation and natural cooling.",
      tags: ["Elevated Structure", "Industrial Solar", "Hot-Dip Galvanized", "High Yield"]
    },
    {
      id: "industrial-structure-fabrication",
      title: "Industrial Solar Structure Fabrication Site",
      clientPlaceholder: "Heavy Structural Fabrication & EPC Site",
      category: "Industrial",
      capacity: "250 kWp Structural Solar Infrastructure",
      location: "Engineering Works Hub, Rajasthan",
      metrics: {
        annualYield: "395,000 kWh / yr",
        co2Offset: "324 MT CO₂ / yr",
        efficiency: "22.5% Module STC"
      },
      image: getAssetUrl("images/projects/project-4-industrial-fabrication.jpg"),
      description: "Precision heavy steel truss engineering and fabrication supporting custom commercial and industrial solar installations, engineered to withstand high wind loads and harsh desert conditions.",
      tags: ["Structural Fabrication", "Truss Engineering", "Heavy Industrial", "EPC Turnkey"]
    }
  ],
  technologyFeatures: [
    {
      title: "N-Type TOPCon Photovoltaic Cells",
      subtitle: "Tunnel Oxide Passivated Contact Architecture",
      description: "State-of-the-art tunnel oxide passivated contact technology delivering superior temperature coefficient (-0.30%/°C), near-zero Light-Induced Degradation (LID), and up to 24.6% cell efficiency in real-world hot climate irradiance.",
      specs: [
        { label: "Bifaciality Factor", value: "85% ± 5%" },
        { label: "Temp. Coefficient", value: "-0.30% / °C" },
        { label: "Year 1 Degradation", value: "< 1.0%" },
        { label: "Annual Degradation", value: "< 0.40% / yr" }
      ]
    },
    {
      title: "Smart Multi-MPPT Digital Inverters",
      subtitle: "Grid-Forming High-Efficiency Silicon Carbide Power Conversion",
      description: "Industrial three-phase string and central inverters featuring 98.8%+ Euro-efficiency, integrated DC disconnect switches, smart dynamic string monitoring, and rapid fault isolation.",
      specs: [
        { label: "Max Efficiency", value: "99.0% Peak" },
        { label: "MPPT Trackers", value: "Up to 12 Independent MPPTs" },
        { label: "Total Harmonic Distortion", value: "< 3% at Rated Power" },
        { label: "Grid Interconnection", value: "CEA & IEEE 1547 LVRT/HVRT" }
      ]
    },
    {
      title: "Liquid-Cooled Modular BESS Storage",
      subtitle: "High-Energy Density Lithium Iron Phosphate Architecture",
      description: "Utility-grade containerized and cabinet battery energy storage systems utilizing non-combustible lithium iron phosphate chemistry with closed-loop glycol thermal management for maximum life and safety.",
      specs: [
        { label: "Cell Chemistry", value: "Tier-1 LiFePO4" },
        { label: "Cycle Durability", value: "8,000 Cycles @ 80% DOD" },
        { label: "Islanding Transfer", value: "< 20 Milliseconds" },
        { label: "Fire Suppression", value: "NFPA 855 / Aerosol Dual Zone" }
      ]
    },
    {
      title: "Real-Time SCADA & IoT Telemetry",
      subtitle: "Edge-Computing Solar Plant Telemetry & Remote Diagnostics",
      description: "Continuous performance ratio monitoring, string-level electrical analytics, irradiance pyranometer feeds, and predictive fault notifications sent directly to plant engineers and mobile dashboards.",
      specs: [
        { label: "Telemetry Polling", value: "100ms High-Frequency Edge" },
        { label: "Network Protocol", value: "Modbus TCP, DNP3, IEC 60870" },
        { label: "Data Encryption", value: "TLS 1.3 / Industrial Edge Gateway" },
        { label: "Uptime Availability", value: "99.98% SLA" }
      ]
    }
  ],
  insights: [
    {
      title: "Navigating Commercial Solar Net-Metering & Open Access in India",
      category: "Regulatory & Financial",
      readTime: "6 min read",
      date: "October 2026",
      snippet: "A practical guide for commercial and industrial energy managers evaluating captive solar, group captive models, and Time-of-Day (TOD) tariff optimization.",
      image: getAssetUrl("solar/insight-grid.svg")
    },
    {
      title: "Liquid-Cooled BESS vs Air-Cooled Storage: Total Lifecycle Economics",
      category: "Engineering Analysis",
      readTime: "8 min read",
      date: "September 2026",
      snippet: "Why liquid-cooled lithium iron phosphate battery containers reduce cell degradation, lower auxiliary HVAC parasitic load, and extend system operational life beyond 15 years.",
      image: getAssetUrl("solar/insight-bess.svg")
    },
    {
      title: "Bifacial Solar Module Yield in High-Ambient Indian Climates",
      category: "Photovoltaic Physics",
      readTime: "5 min read",
      date: "August 2026",
      snippet: "Measuring rear-side irradiance gain across white reflective membranes, crushed gravel, and standard concrete roof surfaces in industrial solar arrays.",
      image: getAssetUrl("solar/insight-bifacial.svg")
    }
  ],
  legalPolicies: [
    {
      id: "privacy-charter",
      title: "Corporate Privacy Charter & Data Governance",
      lastUpdated: "October 2026",
      summary: "How Kamakshi Traders protects corporate energy consumption data, facility telemetry, and organizational information.",
      sections: [
        {
          heading: "1. Scope & Industrial Data Confidentiality",
          body: "Kamakshi Traders collects energy consumption profiles, monthly billing data, and site coordinates exclusively for engineering feasibility modeling, grid interconnection applications, and SCADA monitoring. We do not monetize or share corporate operational data."
        },
        {
          heading: "2. Telemetry & SCADA Cybersecurity",
          body: "All inverter and BESS telemetry is encrypted in transit using TLS 1.3 and stored in isolated edge gateways conforming to IEC 62443 industrial cybersecurity standards. Access is restricted to authorized plant operations personnel."
        },
        {
          heading: "3. Retention & Deletion",
          body: "Preliminary feasibility studies are maintained for 36 months to support capital planning cycles. Prospective clients may request immediate expungement of facility telemetry at any time by contacting our data protection officer."
        }
      ]
    },
    {
      id: "warranty-terms",
      title: "30-Year Linear Power Warranty Standards",
      lastUpdated: "October 2026",
      summary: "Comprehensive engineering breakdown of our equipment and performance guarantees.",
      sections: [
        {
          heading: "1. 30-Year Linear Degradation Guarantee",
          body: "We guarantee that Tier-1 N-Type TOPCon modules will maintain >= 99.0% rated nameplate power in Year 1, with annual degradation strictly <= 0.40% for Years 2 through 30, ensuring >= 87.4% power retention at Year 30."
        },
        {
          heading: "2. EPC Workmanship & Inverter Coverage",
          body: "Turnkey EPC installations carry a structural and electrical workmanship warranty. Digital string inverters include manufacturer replacement warranties against semiconductor fatigue."
        },
        {
          heading: "3. Reinsurance & Bankability Wrap",
          body: "Linear warranties are backed by Tier-1 manufacturer bankability and insurance policies, ensuring uninterrupted coverage independent of equipment supply changes."
        }
      ]
    },
    {
      id: "grid-standards",
      title: "Grid Interconnection & CEA Standards Compliance",
      lastUpdated: "October 2026",
      summary: "Regulatory and technical standards governing high-voltage solar interconnection.",
      sections: [
        {
          heading: "1. Anti-Islanding & Rapid Disconnection",
          body: "All systems incorporate redundant anti-islanding protection complying with IEEE 1547 and CEA Grid Standards, disconnecting in <= 100ms during utility feeder outages to protect grid maintenance personnel."
        },
        {
          heading: "2. Harmonic Distortion & Power Quality",
          body: "Total Harmonic Current Distortion (THD) is maintained < 3% at rated inverter output, compliant with IEEE 519 standards and DISCOM power factor requirements."
        },
        {
          heading: "3. CEIG & AHJ Regulatory Clearances",
          body: "Our engineering division executes all required statutory filings including Chief Electrical Inspector approvals, local municipal structural permissions, and DISCOM synchronizing clearances."
        }
      ]
    },
    {
      id: "esg-audit",
      title: "ESG & Ethical Low-Carbon Silicon Supply Chain Audit",
      lastUpdated: "October 2026",
      summary: "Traceability and environmental lifecycle standards for our solar hardware.",
      sections: [
        {
          heading: "1. Traceable Polysilicon Supply",
          body: "100% of our Tier-1 solar modules are manufactured using auditable, non-conflict silicon with transparent provenance verification adhering to the SEIA Solar Supply Chain Traceability Protocol."
        },
        {
          heading: "2. Low Embodied Carbon Manufacturing",
          body: "Ingots and wafers are pulled in facilities powered primarily by clean renewable power, achieving low embodied carbon intensity."
        },
        {
          heading: "3. End-of-Life PV & BESS Recyclability",
          body: "Kamakshi Traders works with certified recycling partners capable of recovering > 95% of module glass, aluminum, copper, and battery critical minerals (lithium, nickel, iron phosphate)."
        }
      ]
    }
  ]
};
