import React, { useState, useEffect } from 'react';
import { useClinic } from '../context/ClinicContext';

export const Navbar: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    t, 
    viewMode, 
    setViewMode, 
    promoSettings,
    openBookingModal
  } = useClinic();
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
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
    <header className="sticky top-4 sm:top-5 z-40 px-3 sm:px-6 max-w-7xl mx-auto transition-all duration-300 mb-6 sm:mb-8">
      <nav 
        aria-label="Main navigation"
        className={`rounded-full transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06)] py-2 px-5 sm:px-7' 
            : 'bg-white/75 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] py-2.5 px-5 sm:px-7'
        } flex items-center justify-between border border-white/95`}
      >
        {/* Brand Logo: Clean minimal AURELIA */}
        <button 
          onClick={() => {
            setViewMode('patient');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center text-left group"
        >
          <span className="font-serif text-lg sm:text-xl font-light tracking-[0.28em] text-obsidian uppercase group-hover:text-gold transition-colors">
            AURELIA
          </span>
        </button>

        {/* Desktop Nav Links: Strictly in ONE horizontal line */}
        <div className="hidden lg:flex items-center gap-7">
          <button
            onClick={() => scrollToSection('treatments')}
            className="text-[11px] uppercase tracking-[0.2em] font-sans font-medium text-obsidian/70 hover:text-obsidian transition-colors"
          >
            {t.navTreatments}
          </button>
          <button
            onClick={() => scrollToSection('quotation-engine')}
            className="text-[11px] uppercase tracking-[0.2em] font-sans font-medium text-obsidian/70 hover:text-obsidian transition-colors"
          >
            {t.navCalculator}
          </button>
          <button
            onClick={() => scrollToSection('before-after')}
            className="text-[11px] uppercase tracking-[0.2em] font-sans font-medium text-obsidian/70 hover:text-obsidian transition-colors"
          >
            {t.navBeforeAfter}
          </button>
          <button
            onClick={() => scrollToSection('doctors')}
            className="text-[11px] uppercase tracking-[0.2em] font-sans font-medium text-obsidian/70 hover:text-obsidian transition-colors"
          >
            {language === 'EN' ? 'Doctors' : 'Doktor'}
          </button>
        </div>

        {/* Right Action Controls: Slim, Smart, In ONE line, No Clutter */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language Toggle */}
          <div className="flex items-center bg-black/5 rounded-full p-0.5 border border-black/5">
            <button
              onClick={() => setLanguage('EN')}
              className={`px-2 py-0.5 text-[10px] font-sans font-semibold rounded-full transition-all ${
                language === 'EN'
                  ? 'bg-white text-obsidian shadow-sm'
                  : 'text-obsidian/50 hover:text-obsidian'
              }`}
              title="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('BM')}
              className={`px-2 py-0.5 text-[10px] font-sans font-semibold rounded-full transition-all ${
                language === 'BM'
                  ? 'bg-white text-obsidian shadow-sm'
                  : 'text-obsidian/50 hover:text-obsidian'
              }`}
              title="Tukar ke Bahasa Malaysia"
            >
              BM
            </button>
          </div>

          {/* Admin Switcher: Slim pill reading "Admin" */}
          <button
            onClick={() => {
              setViewMode(viewMode === 'patient' ? 'admin' : 'patient');
              if (viewMode === 'patient') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className={`px-3 py-1.5 rounded-full text-[11px] font-sans font-semibold tracking-wider uppercase transition-all duration-200 border ${
              viewMode === 'admin'
                ? 'bg-gold text-obsidian border-gold shadow-sm font-bold'
                : 'bg-pearl-100 hover:bg-pearl-200 text-obsidian border-pearl-200'
            }`}
            title={viewMode === 'patient' ? 'Open Clinic Owner Portal' : 'Return to Patient Luxury View'}
          >
            {viewMode === 'patient' ? 'Admin' : 'Patient View'}
          </button>

          {/* Booking CTA: Slim button reading "Booking" - triggers dedicated Luxury Booking Modal */}
          <button
            onClick={() => openBookingModal()}
            className="px-4 py-1.5 rounded-full bg-obsidian hover:bg-gold text-white text-[11px] font-sans font-semibold tracking-widest uppercase transition-all duration-200 shadow-sm"
          >
            {language === 'EN' ? 'Booking' : 'Tempahan'}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-full text-obsidian hover:bg-black/5 transition-colors ml-1"
            aria-label="Toggle menu"
          >
            <span className="text-sm font-sans font-bold">☰</span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-5 rounded-2xl bg-white/95 backdrop-blur-2xl border border-white shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3 font-sans text-xs uppercase tracking-wider">
            <button
              onClick={() => scrollToSection('treatments')}
              className="text-left py-2 font-medium text-obsidian border-b border-black/5"
            >
              {t.navTreatments}
            </button>
            <button
              onClick={() => scrollToSection('quotation-engine')}
              className="text-left py-2 font-medium text-obsidian border-b border-black/5"
            >
              {t.navCalculator}
            </button>
            <button
              onClick={() => scrollToSection('before-after')}
              className="text-left py-2 font-medium text-obsidian border-b border-black/5"
            >
              {t.navBeforeAfter}
            </button>
            <button
              onClick={() => scrollToSection('doctors')}
              className="text-left py-2 font-medium text-obsidian"
            >
              {language === 'EN' ? 'Doctors' : 'Doktor'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
