import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { 
  Sparkles, 
  ArrowUpRight, 
  Gift, 
  ShieldCheck, 
  Cpu, 
  CheckCircle,
  Scan,
  Compass
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { t, language, setActiveQuotationTab } = useClinic();
  const [activeScanPoint, setActiveScanPoint] = useState<number | null>(null);

  const scrollToQuotation = (tab: 'quiz' | 'direct' | 'giftcard') => {
    setActiveQuotationTab(tab);
    const el = document.getElementById('quotation-engine');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative px-3 sm:px-6 lg:px-8 pt-2 pb-12 max-w-[1600px] mx-auto font-sans">
      {/* Outer Rounded Frame with Full-Bleed Atmospheric Veridia Radial Mesh Gradient */}
      <div className="relative rounded-[32px] sm:rounded-[44px] overflow-hidden bg-veridia-mesh text-plum border border-white/60 shadow-pearl-glass min-h-[90vh] flex flex-col justify-between p-6 sm:p-10 lg:p-14">
        
        {/* Ambient Atmospheric Glows */}
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-white/20 filter blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[30rem] h-[30rem] rounded-full bg-mauve-deep/20 filter blur-3xl pointer-events-none" />

        {/* Top Header Bar inside the frame */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/30">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl sm:text-3xl font-light tracking-[0.22em] text-plum-dark uppercase">
              AURELIA
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-plum-dark bg-white/60 px-2 py-0.5 rounded-full border border-white/80">
              Kuala Lumpur
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/50 backdrop-blur-md border border-white/80 text-[11px] font-semibold text-plum-dark">
              <ShieldCheck className="w-3.5 h-3.5 text-plum" />
              <span>{language === 'EN' ? 'MOH LCP Certified Aesthetics • US-FDA & MDA Approved' : 'Doktor Estetik LCP KKM • Diperakui US-FDA & MDA'}</span>
            </div>
          </div>
        </div>

        {/* Centerpiece Layout: Left Controls + Center Interactive HUD Portrait + Giant Typography */}
        <div className="relative z-10 my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          
          {/* Left Hero Column: Editorial Subtitle & Pill Controls */}
          <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-plum/10 text-plum-dark text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-plum" />
              <span>Clinical Technology & Multi-Modal Specs</span>
            </div>

            <p className="font-sans text-sm sm:text-base text-plum-dark/85 leading-relaxed font-normal max-w-md">
              {language === 'EN'
                ? 'Next-generation sub-ablative Pico laser & cellular longevity engineered for deep dermal remodeling without downtime.'
                : 'Laser Piko sub-ablatif generasi baru & rawatan keremajaan selular untuk penstrukturan semula lapisan dermis tanpa masa henti.'}
            </p>

            {/* Pill Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => scrollToQuotation('quiz')}
                className="btn-gold-sheen px-5 py-3 rounded-full bg-plum-dark hover:bg-plum text-white text-xs font-bold uppercase tracking-wider font-sans shadow-plum-depth flex items-center justify-center gap-2"
              >
                <span>{language === 'EN' ? 'For Patients — 60s Quote' : 'Untuk Pesakit — Sebut Harga 60s'}</span>
                <ArrowUpRight className="w-4 h-4 text-rosegold-light" />
              </button>

              <button
                onClick={() => scrollToQuotation('giftcard')}
                className="px-5 py-3 rounded-full bg-white/70 hover:bg-white text-plum-dark border border-white/90 text-xs font-bold uppercase tracking-wider font-sans transition-all flex items-center justify-center gap-2 backdrop-blur-md shadow-sm"
              >
                <Gift className="w-4 h-4 text-plum" />
                <span>{language === 'EN' ? '🎁 Send Luxury Gift Card' : '🎁 Hantar Kad Hadiah Mewah'}</span>
              </button>
            </div>

            {/* Micro specs */}
            <div className="pt-4 border-t border-white/30 flex items-center gap-6 text-xs text-plum-dark/75">
              <div>
                <strong className="block text-lg font-serif text-plum-dark font-medium">300 – 800nm</strong>
                <span className="text-[10px] uppercase tracking-wider">Dual Spectrum</span>
              </div>
              <div className="w-px h-8 bg-white/40" />
              <div>
                <strong className="block text-lg font-serif text-plum-dark font-medium">0 – 4 Hours</strong>
                <span className="text-[10px] uppercase tracking-wider">Peak Recovery</span>
              </div>
              <div className="w-px h-8 bg-white/40" />
              <div>
                <strong className="block text-lg font-serif text-plum-dark font-medium">100%</strong>
                <span className="text-[10px] uppercase tracking-wider">Doctor Performed</span>
              </div>
            </div>
          </div>

          {/* Center Column: Interactive HUD Portrait with Live Nuvé Skin Bounding Boxes */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-[380px] sm:max-w-[430px] aspect-square">
              
              {/* Corner crosshair hairline nodes */}
              <div className="absolute -top-2 -left-2 text-[11px] text-white/90 font-mono select-none pointer-events-none">⌜o</div>
              <div className="absolute -top-2 -right-2 text-[11px] text-white/90 font-mono select-none pointer-events-none">o⌝</div>
              <div className="absolute -bottom-2 -left-2 text-[11px] text-white/90 font-mono select-none pointer-events-none">⌞o</div>
              <div className="absolute -bottom-2 -right-2 text-[11px] text-white/90 font-mono select-none pointer-events-none">o⌟</div>

              {/* Diagonal Hairline SVG Callout Lines */}
              <div className="hidden sm:block absolute -top-10 -left-16 z-20 pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-plum-dark/90 bg-white/70 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/80 shadow-sm">
                    Multimodal Wavelength Delivery
                  </span>
                  <svg width="45" height="24" className="text-white/80">
                    <line x1="0" y1="12" x2="30" y2="12" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                    <line x1="30" y1="12" x2="45" y2="24" stroke="currentColor" strokeWidth="1" />
                    <circle cx="43" cy="22" r="2" fill="currentColor" />
                  </svg>
                </div>
              </div>

              <div className="hidden sm:block absolute -top-10 -right-20 z-20 pointer-events-none">
                <div className="flex items-center gap-2 flex-row-reverse">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-plum-dark/90 bg-white/70 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/80 shadow-sm">
                    Safe for All Asian Skin Phototypes • MOH LCP
                  </span>
                  <svg width="45" height="24" className="text-white/80">
                    <line x1="45" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                    <line x1="15" y1="12" x2="0" y2="24" stroke="currentColor" strokeWidth="1" />
                    <circle cx="2" cy="22" r="2" fill="currentColor" />
                  </svg>
                </div>
              </div>

              {/* Main Square Glass Portrait Frame */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/80 shadow-2xl bg-plum-deep group">
                <img
                  src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1400&q=90"
                  alt="Aurelia Clinic AI Skin Diagnostic Live Scan"
                  className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Sweeping Laser Scanline Animation */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent shadow-[0_0_15px_#F43F5E] animate-scanline pointer-events-none" />

                {/* HUD Live Scanning Bounding Boxes */}
                {/* Box 1: Forehead (Pigmentation / Melasma) */}
                <div 
                  onClick={() => setActiveScanPoint(activeScanPoint === 1 ? null : 1)}
                  className="absolute top-[16%] left-[28%] w-32 sm:w-36 rounded-lg glass-hud-box p-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-rosegold"
                >
                  <div className="flex items-center justify-between text-[9px] font-mono text-plum-dark uppercase tracking-wider font-bold">
                    <span>Target #01</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="text-[11px] font-sans font-semibold text-plum-dark mt-0.5 leading-tight">
                    Pigmentation / Melasma
                  </div>
                  <div className="text-[9px] font-mono text-plum-dark/70">
                    98% Match &bull; Pico StarWalker
                  </div>
                </div>

                {/* Box 2: Cheek (Pore Micro-Texture) */}
                <div 
                  onClick={() => setActiveScanPoint(activeScanPoint === 2 ? null : 2)}
                  className="absolute top-[48%] left-[12%] w-32 sm:w-36 rounded-lg glass-hud-box p-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-rosegold"
                >
                  <div className="flex items-center justify-between text-[9px] font-mono text-plum-dark uppercase tracking-wider font-bold">
                    <span>Target #02</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  </div>
                  <div className="text-[11px] font-sans font-semibold text-plum-dark mt-0.5 leading-tight">
                    Pore Micro-Texture
                  </div>
                  <div className="text-[9px] font-mono text-plum-dark/70">
                    Sub-Ablative RF Target
                  </div>
                </div>

                {/* Box 3: Jawline (Jawline Collagen Index) */}
                <div 
                  onClick={() => setActiveScanPoint(activeScanPoint === 3 ? null : 3)}
                  className="absolute bottom-[18%] right-[10%] w-34 sm:w-40 rounded-lg glass-hud-box p-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-rosegold"
                >
                  <div className="flex items-center justify-between text-[9px] font-mono text-plum-dark uppercase tracking-wider font-bold">
                    <span>Target #03</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  </div>
                  <div className="text-[11px] font-sans font-semibold text-plum-dark mt-0.5 leading-tight">
                    Jawline Collagen Index
                  </div>
                  <div className="text-[9px] font-mono text-plum-dark/70 font-bold text-rose-800">
                    +4.8x Neo-Synthesis
                  </div>
                </div>
              </div>

              {/* Overlapping Circular Magnetic CTA Button (110px x 110px Deep Plum) */}
              <button
                onClick={() => scrollToQuotation('quiz')}
                className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-plum-dark hover:bg-plum text-white p-2 border-2 border-white/90 shadow-2xl flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 group z-30"
                aria-label="Calculate Quote"
              >
                <Compass className="w-5 h-5 text-rosegold-light group-hover:rotate-45 transition-transform duration-500" />
                <span className="font-serif text-xs uppercase tracking-widest font-bold mt-1 text-white">
                  CALCULATE
                </span>
                <span className="text-[9px] font-mono tracking-widest text-rosegold-light flex items-center gap-0.5">
                  QUOTE ↗
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Giant Overlapping Editorial Typography (LUMINOUS RENEWAL) */}
          <div className="lg:col-span-3 flex flex-col justify-end items-start lg:items-end text-left lg:text-right order-3">
            <div className="select-none">
              <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-plum-dark/70 font-sans block mb-1">
                Aesthetic Longevity &bull; Bangsar & Damansara
              </span>
              <h1 className="font-serif text-5xl sm:text-7xl xl:text-8xl font-light text-white tracking-[-0.03em] leading-[0.88] drop-shadow-md">
                LUMINOUS
                <span className="italic block text-plum-dark font-normal drop-shadow-none">
                  RENEWAL
                </span>
              </h1>
            </div>

            <p className="font-sans text-xs text-plum-dark/80 max-w-xs mt-4 leading-relaxed lg:text-right">
              {language === 'EN'
                ? 'Precision physician-led dermatology combining high-speed picosecond physics with biocompatible cellular regeneration.'
                : 'Dermatologi berketepatan tinggi menggabungkan laser piko-saat dengan penjanaan semula tisu biokompatibel.'}
            </p>
          </div>
        </div>

        {/* Bottom Bar: Quick Credentials */}
        <div className="relative z-10 pt-6 border-t border-white/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-plum-dark/80">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle className="w-4 h-4 text-plum" />
              <span>Bangsar Flagship (Jalan Telawi 3)</span>
            </span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle className="w-4 h-4 text-plum" />
              <span>Damansara Heights (Plaza Batai)</span>
            </span>
          </div>

          <div className="text-[11px] font-mono uppercase tracking-wider text-plum-dark/70">
            MOH Aesthetic Registry #LCP-A-2018-042
          </div>
        </div>
      </div>
    </section>
  );
};
