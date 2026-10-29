import React, { useState, useEffect } from 'react';
import { useClinic } from '../context/ClinicContext';
import { 
  Sparkles, 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronRight, 
  PhoneCall, 
  LayoutDashboard, 
  UserCheck,
  Globe2
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    t, 
    viewMode, 
    setViewMode, 
    promoSettings 
  } = useClinic();
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (viewMode === 'admin') {
      setViewMode('patient');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Holiday Announcement Bar (Live controlled from Admin!) */}
      {promoSettings.holidayPromoActive && (
        <aside 
          aria-label="Promotional announcement"
          className="bg-obsidian-deep text-pearl-100 text-xs py-2 px-4 border-b border-gold/30 transition-all duration-300 relative z-40"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2 mx-auto sm:mx-0">
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold text-obsidian font-sans">
                KL VIP Pass
              </span>
              <p className="font-sans text-xs tracking-wide text-pearl-100">
                {language === 'EN' ? promoSettings.announcementTextEN : promoSettings.announcementTextBM}
              </p>
            </div>
            <button
              onClick={() => scrollToSection('quotation-engine')}
              className="hidden md:inline-flex items-center gap-1 text-gold text-xs font-semibold hover:text-white transition-colors uppercase tracking-wider shrink-0"
            >
              <span>{language === 'EN' ? 'Claim VIP Rates' : 'Tuntut Kadar VIP'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* Floating Glassmorphic Pill Navbar */}
      <header className="sticky top-3 z-40 px-3 sm:px-6 max-w-7xl mx-auto transition-all duration-300">
        <nav 
          aria-label="Main navigation"
          className={`rounded-full transition-all duration-300 ${
            scrolled 
              ? 'glass-pearl-strong shadow-pearl-glass py-2.5 px-4 sm:px-6' 
              : 'glass-pearl py-3 px-4 sm:px-6'
          } flex items-center justify-between border border-white/90`}
        >
          {/* Brand Logo */}
          <button 
            onClick={() => {
              setViewMode('patient');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex flex-col text-left group"
          >
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl sm:text-2xl font-light tracking-[0.18em] text-obsidian uppercase group-hover:text-gold transition-colors">
                AURELIA
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold px-1.5 py-0.5 rounded bg-gold/10 border border-gold/20 font-sans hidden sm:inline-block">
                KL
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-obsidian/60 font-sans font-medium">
              Aesthetics &bull; Bangsar & Damansara
            </span>
          </button>

          {/* Desktop Nav Links (Visible in Patient View) */}
          <div className="hidden lg:flex items-center gap-7">
            <button
              onClick={() => scrollToSection('treatments')}
              className="text-xs uppercase tracking-widest font-sans font-medium text-obsidian/75 hover:text-gold transition-colors"
            >
              {t.navTreatments}
            </button>
            <button
              onClick={() => scrollToSection('quotation-engine')}
              className="text-xs uppercase tracking-widest font-sans font-semibold text-gold-deep hover:text-gold transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              {t.navCalculator}
            </button>
            <button
              onClick={() => scrollToSection('before-after')}
              className="text-xs uppercase tracking-widest font-sans font-medium text-obsidian/75 hover:text-gold transition-colors"
            >
              {t.navBeforeAfter}
            </button>
            <button
              onClick={() => scrollToSection('doctors')}
              className="text-xs uppercase tracking-widest font-sans font-medium text-obsidian/75 hover:text-gold transition-colors"
            >
              {t.navDoctors}
            </button>
          </div>

          {/* Right Action Controls: Language Toggle & Demo Mode Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Bilingual Switcher (EN | BM) */}
            <div className="flex items-center bg-pearl-100/90 rounded-full p-0.5 border border-pearl-200">
              <button
                onClick={() => setLanguage('EN')}
                className={`px-2 py-1 text-[11px] font-sans font-bold rounded-full transition-all ${
                  language === 'EN'
                    ? 'bg-obsidian text-white shadow-sm'
                    : 'text-obsidian/60 hover:text-obsidian'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('BM')}
                className={`px-2 py-1 text-[11px] font-sans font-bold rounded-full transition-all ${
                  language === 'BM'
                    ? 'bg-obsidian text-white shadow-sm'
                    : 'text-obsidian/60 hover:text-obsidian'
                }`}
                title="Tukar ke Bahasa Malaysia"
              >
                BM
              </button>
            </div>

            {/* DEMO MODE SWITCHER PILL (CRITICAL FEATURE) */}
            <button
              onClick={() => {
                setViewMode(viewMode === 'patient' ? 'admin' : 'patient');
                if (viewMode === 'patient') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide font-sans transition-all duration-300 shadow-sm border ${
                viewMode === 'admin'
                  ? 'bg-gold text-obsidian-deep border-gold shadow-gold-glow animate-pulse-subtle font-bold'
                  : 'bg-obsidian-deep text-pearl-100 hover:text-gold border-gold/40 hover:border-gold'
              }`}
              title={viewMode === 'patient' ? 'Open Clinic Owner Portal' : 'Return to Patient Luxury View'}
            >
              {viewMode === 'patient' ? (
                <>
                  <LayoutDashboard className="w-3.5 h-3.5 text-gold" />
                  <span className="hidden sm:inline">{t.adminMode}</span>
                  <span className="sm:hidden font-bold text-gold">Admin Portal</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-obsidian-deep" />
                  <span className="font-bold">{t.patientMode}</span>
                </>
              )}
            </button>

            {/* Direct Consultation CTA (Desktop) */}
            <button
              onClick={() => scrollToSection('quotation-engine')}
              className="hidden xl:inline-flex btn-gold-sheen items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-gold via-champagne-500 to-gold-deep text-white text-xs font-semibold tracking-wider uppercase font-sans shadow-gold-card hover:shadow-gold-glow"
            >
              <span>{t.bookNow}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-pearl-100 text-obsidian hover:text-gold transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-5 rounded-3xl glass-pearl-strong border border-white/95 shadow-onyx-depth animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-4 font-sans text-sm">
              <button
                onClick={() => scrollToSection('treatments')}
                className="text-left py-2 font-medium text-obsidian hover:text-gold flex items-center justify-between border-b border-pearl-200/70"
              >
                <span>{t.navTreatments}</span>
                <ChevronRight className="w-4 h-4 text-gold" />
              </button>
              <button
                onClick={() => scrollToSection('quotation-engine')}
                className="text-left py-2 font-semibold text-gold-deep flex items-center justify-between border-b border-pearl-200/70"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold" />
                  {t.navCalculator}
                </span>
                <ChevronRight className="w-4 h-4 text-gold" />
              </button>
              <button
                onClick={() => scrollToSection('before-after')}
                className="text-left py-2 font-medium text-obsidian hover:text-gold flex items-center justify-between border-b border-pearl-200/70"
              >
                <span>{t.navBeforeAfter}</span>
                <ChevronRight className="w-4 h-4 text-gold" />
              </button>
              <button
                onClick={() => scrollToSection('doctors')}
                className="text-left py-2 font-medium text-obsidian hover:text-gold flex items-center justify-between border-b border-pearl-200/70"
              >
                <span>{t.navDoctors}</span>
                <ChevronRight className="w-4 h-4 text-gold" />
              </button>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => scrollToSection('quotation-engine')}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-gold via-champagne-500 to-gold-deep text-white text-center font-semibold text-xs uppercase tracking-widest shadow-gold-card"
                >
                  {t.bookNow}
                </button>
                <a
                  href="https://wa.me/60123456789?text=Hello%20Aurelia%20Clinic%20KL,%20I%20would%20like%20to%20inquire%20about%20a%20doctor%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-full bg-emerald-600 text-white text-center font-semibold text-xs tracking-wider flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>WhatsApp Concierge (+60 12-345 6789)</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
