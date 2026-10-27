import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Solutions } from './components/Solutions';
import { Projects } from './components/Projects';
import { ContactBanner } from './components/ContactBanner';
import { Footer } from './components/Footer';
import { PolicyModal } from './components/PolicyModal';
import { openWhatsApp } from './utils/whatsapp';

export const App: React.FC = () => {
  const [selectedPolicyId, setSelectedPolicyId] = useState<string | null>(null);

  const handleOpenWhatsApp = () => {
    openWhatsApp('Hello Kamakshi Traders — Solar Solutions, I would like to enquire about your solar installation services. Please contact me to discuss my requirements.');
  };

  return (
    <div className="min-h-screen bg-brand-offwhite text-brand-charcoal selection:bg-brand-crimson selection:text-white relative">
      {/* Streamlined Navigation */}
      <Navbar />

      {/* Main Experience Flow */}
      <main>
        {/* 01. Hero / Home Section */}
        <Hero />

        {/* 02. Solutions Showcase */}
        <Solutions />

        {/* 03. Landmark Clean Power Projects */}
        <Projects />

        {/* 04. Direct Contact & WhatsApp Enquiry Banner */}
        <ContactBanner />
      </main>

      {/* 05. Footer */}
      <Footer
        onOpenPolicy={(policyId) => setSelectedPolicyId(policyId)}
      />

      {/* Statutory Governance & Policy Modal */}
      <PolicyModal
        policyId={selectedPolicyId}
        onClose={() => setSelectedPolicyId(null)}
        onOpenQuote={handleOpenWhatsApp}
      />
    </div>
  );
};

export default App;
