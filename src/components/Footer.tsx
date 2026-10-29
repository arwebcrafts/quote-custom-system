import React from 'react';
import { useClinic } from '../context/ClinicContext';
import { 
  MapPin, 
  Clock, 
  PhoneCall, 
  ShieldCheck, 
  Instagram, 
  ArrowUp,
  Sparkles 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language, setViewMode } = useClinic();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-obsidian-deep text-pearl-100 pt-16 pb-12 border-t border-gold/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-light tracking-[0.2em] text-pearl-50 uppercase">
                AURELIA
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold px-1.5 py-0.5 rounded bg-gold/10 border border-gold/30">
                KL
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold">
              Medical Aesthetics & Longevity
            </p>
            <p className="text-xs text-pearl-300 leading-relaxed max-w-sm">
              {t.footerDesc}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://wa.me/60123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-pearl-200 hover:text-gold hover:border-gold transition-colors"
                title="WhatsApp Direct"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-pearl-200 hover:text-gold hover:border-gold transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Locations & Branches */}
          <div className="lg:col-span-4 space-y-4 text-xs">
            <h4 className="font-serif text-lg font-medium text-pearl-100 tracking-wide">
              {language === 'EN' ? 'Flagship Clinics' : 'Cawangan Utama'}
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-pearl-100 block font-semibold">Bangsar Flagship</strong>
                  <span className="text-pearl-300 leading-relaxed block">{t.bangsarAddress}</span>
                  <span className="text-[10px] text-gold-deep block mt-0.5">Valet Parking Available &bull; Suites 1 to 6</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-pearl-100 block font-semibold">Damansara Heights</strong>
                  <span className="text-pearl-300 leading-relaxed block">{t.damansaraAddress}</span>
                  <span className="text-[10px] text-gold-deep block mt-0.5">Plaza Batai &bull; Longevity Suite</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Hours & Admin Quick Access */}
          <div className="lg:col-span-4 space-y-4 text-xs">
            <h4 className="font-serif text-lg font-medium text-pearl-100 tracking-wide">
              {t.hoursTitle}
            </h4>
            <div className="space-y-2 text-pearl-300">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gold" />
                <span>{t.hoursWeekdays}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gold" />
                <span>{t.hoursSunday}</span>
              </div>
            </div>

            {/* Admin Switcher Shortcut */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setViewMode('admin');
                  scrollToTop();
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-gold/15 text-gold text-xs font-semibold border border-gold/30 hover:border-gold transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>{language === 'EN' ? 'Launch Clinic Owner Admin Panel' : 'Buka Portal Admin Pemilik Klinik'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits & MOH Registration */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-pearl-400">
          <p className="text-center md:text-left leading-relaxed max-w-2xl">
            {t.mohDisclaimer}
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-gold transition-colors shrink-0"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
