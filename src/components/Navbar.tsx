import React, { useState, useEffect } from 'react';
import { Menu, X, Zap, MessageCircle } from 'lucide-react';
import { siteConfig } from '../data/config';
import { getWhatsAppUrl, openWhatsApp, WHATSAPP_DISPLAY_PHONE } from '../utils/whatsapp';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleQuoteClick = () => {
    openWhatsApp('Hello Kamakshi Traders — Solar Solutions, I would like to enquire about your solar installation services. Please contact me to discuss my requirements.');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-burgundy/95 backdrop-blur-md border-b border-brand-crimson/20 shadow-luxury-dark py-3'
          : 'bg-gradient-to-b from-brand-burgundy/95 via-brand-burgundy/75 to-transparent py-4'
      }`}
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Wordmark */}
            <a href="#" className="flex items-center space-x-3 group">
              <div className="relative flex items-center justify-center rounded-xl overflow-hidden bg-brand-burgundy p-1 border border-brand-crimson/30 shadow-glow-maroon group-hover:border-brand-crimson transition-all duration-300">
                <img
                  src={siteConfig.company.logoPath}
                  alt={siteConfig.company.fullDisplayName}
                  width="160"
                  height="48"
                  className="h-10 sm:h-12 w-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="text-lg sm:text-xl font-bold tracking-tight text-white font-display">
                    {siteConfig.company.brandName}
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-mono font-semibold">
                  {siteConfig.company.brandDescriptor}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 border border-brand-crimson/20 rounded-full px-5 py-1.5 bg-black/30 backdrop-blur-md shadow-sm">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-1.5 text-sm font-medium text-brand-offwhite/90 hover:text-brand-gold hover:bg-brand-maroon/40 rounded-full transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Action Button: Direct WhatsApp Quote CTA */}
            <div className="hidden sm:flex items-center space-x-4">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleQuoteClick}
                className="relative inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-brand-maroon via-brand-crimson to-brand-solar hover:brightness-110 shadow-glow-crimson transition-all duration-300 transform active:scale-95 group overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <Zap className="w-4 h-4 mr-2 text-white animate-pulse fill-white" />
                <span>Get a Solar Quote</span>
              </a>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex sm:hidden items-center space-x-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleQuoteClick}
                className="px-3 py-1.5 rounded-full text-xs font-bold text-white bg-brand-crimson shadow-sm flex items-center"
              >
                <span>Quote</span>
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-brand-offwhite hover:text-white rounded-lg bg-brand-maroon/60 border border-brand-crimson/30"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-brand-gold" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-brand-burgundy/98 border-b border-brand-crimson/30 backdrop-blur-xl px-6 pt-4 pb-8 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-brand-maroon border border-transparent hover:border-brand-crimson/30 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-brand-maroon/40 space-y-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleQuoteClick();
                }}
                className="w-full flex items-center justify-center py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-brand-maroon via-brand-crimson to-brand-solar shadow-glow-crimson"
              >
                <Zap className="w-4 h-4 mr-2 fill-white text-white" />
                <span>Get a Solar Quote</span>
              </a>

              <div className="flex items-center justify-between text-xs text-brand-offwhite/70 pt-2 font-mono">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-emerald-400 hover:text-emerald-300"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                  <span>WhatsApp: {WHATSAPP_DISPLAY_PHONE}</span>
                </a>
                <span className="text-[10px] text-brand-solar font-semibold">DIRECT CHAT</span>
              </div>
            </div>
          </div>
        )}
      </header>
  );
};
