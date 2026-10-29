import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';

export const Hero: React.FC = () => {
  const { language, setActiveQuotationTab } = useClinic();
  const [activeScanPoint, setActiveScanPoint] = useState<number | null>(null);

  const scrollToQuotation = (tab: 'quiz' | 'direct' | 'giftcard') => {
    setActiveQuotationTab(tab);
    const el = document.getElementById('quotation-engine');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative px-3 sm:px-6 lg:px-8 pt-1 pb-10 max-w-[1550px] mx-auto font-sans">
      {/* Outer Editorial Rounded Frame with Radiant Silk Pearl & Soft Rose-Gold Glow */}
      <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden bg-gradient-to-br from-[#FAF8F5] via-[#F5EEE8] to-[#EFE4DC] text-obsidian border border-white/90 shadow-[0_20px_50px_rgba(180,148,115,0.08)] min-h-[86vh] flex flex-col justify-between p-6 sm:p-10 lg:p-12">
        
        {/* Ambient Specular Glass Reflections */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/40 filter blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] rounded-full bg-[#E8D6CB]/30 filter blur-3xl pointer-events-none" />

        {/* Top Slim Subheader Inside Frame */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-black/5">
          <div className="flex items-center gap-3">
            <span className="font-serif text-xl sm:text-2xl font-light tracking-[0.22em] text-obsidian uppercase">
              AURELIA
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-widest text-obsidian/60 bg-white/80 px-2.5 py-0.5 rounded-full border border-black/5">
              Kuala Lumpur
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/70 backdrop-blur-md border border-white/90 text-[11px] font-medium text-obsidian/75">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>
              {language === 'EN' 
                ? 'MOH LCP Certified Aesthetics • US-FDA & MDA Approved' 
                : 'Doktor Estetik LCP KKM • Diperakui US-FDA & MDA'}
            </span>
          </div>
        </div>

        {/* Centerpiece Grid: Left Controls + Center HUD Beauty Portrait + Giant Typography */}
        <div className="relative z-10 my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Left Hero Column: Editorial Subtitle & Clean Pill Controls (No Emojis!) */}
          <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
            <div className="text-[10px] uppercase tracking-[0.25em] font-bold text-obsidian/60">
              Clinical Technology & Multi-Modal Specs
            </div>

            <p className="font-sans text-sm sm:text-base text-obsidian/80 leading-relaxed font-normal max-w-md">
              {language === 'EN'
                ? 'Next-generation sub-ablative cold laser & cellular longevity engineered for deep dermal remodeling without downtime.'
                : 'Laser sub-ablatif generasi baru & rawatan keremajaan selular untuk penstrukturan semula lapisan dermis tanpa masa henti.'}
            </p>

            {/* Pill Action Buttons (Clean, High-Fashion, No Tacky Emojis) */}
            <div className="flex flex-row items-center gap-3 pt-2">
              <button
                onClick={() => scrollToQuotation('quiz')}
                className="px-6 py-2.5 rounded-full bg-obsidian hover:bg-gold text-white text-[11px] font-bold uppercase tracking-wider font-sans transition-all duration-200 shadow-md"
              >
                {language === 'EN' ? 'For Patients' : 'Untuk Pesakit'}
              </button>

              <button
                onClick={() => scrollToQuotation('direct')}
                className="px-6 py-2.5 rounded-full bg-white/85 hover:bg-white text-obsidian border border-black/10 text-[11px] font-bold uppercase tracking-wider font-sans transition-all duration-200 shadow-sm"
              >
                {language === 'EN' ? 'Treatment Menu' : 'Katalog Rawatan'}
              </button>
            </div>

            {/* Micro Specs: Horizontally in ONE clean line */}
            <div className="pt-4 border-t border-black/5 flex items-center gap-6 text-xs text-obsidian/75">
              <div>
                <strong className="block text-base font-serif text-obsidian font-normal">300 – 800nm</strong>
                <span className="text-[9px] uppercase tracking-wider text-obsidian/55">Dual Spectrum</span>
              </div>
              <div className="w-px h-7 bg-black/10" />
              <div>
                <strong className="block text-base font-serif text-obsidian font-normal">0 – 4 Hours</strong>
                <span className="text-[9px] uppercase tracking-wider text-obsidian/55">Peak Recovery</span>
              </div>
              <div className="w-px h-7 bg-black/10" />
              <div>
                <strong className="block text-base font-serif text-obsidian font-normal">100%</strong>
                <span className="text-[9px] uppercase tracking-wider text-obsidian/55">Doctor Performed</span>
              </div>
            </div>
          </div>

          {/* Center Column: Interactive HUD Portrait with Live Nuvé Skin Bounding Targets */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-square">
              
              {/* Corner crosshairs nodes */}
              <div className="absolute -top-2.5 -left-2.5 text-[10px] text-obsidian/40 font-mono select-none pointer-events-none">⌜o</div>
              <div className="absolute -top-2.5 -right-2.5 text-[10px] text-obsidian/40 font-mono select-none pointer-events-none">o⌝</div>
              <div className="absolute -bottom-2.5 -left-2.5 text-[10px] text-obsidian/40 font-mono select-none pointer-events-none">⌞o</div>
              <div className="absolute -bottom-2.5 -right-2.5 text-[10px] text-obsidian/40 font-mono select-none pointer-events-none">o⌟</div>

              {/* Diagonal Technical Hairline Callouts */}
              <div className="hidden sm:block absolute -top-8 -left-12 z-20 pointer-events-none">
                <span className="text-[9px] uppercase font-semibold tracking-wider text-obsidian/70 bg-white/90 px-3 py-1 rounded-full border border-black/5 shadow-sm">
                  Multimodal Wavelength Delivery
                </span>
              </div>

              <div className="hidden sm:block absolute -top-8 -right-8 z-20 pointer-events-none">
                <span className="text-[9px] uppercase font-semibold tracking-wider text-obsidian/70 bg-white/90 px-3 py-1 rounded-full border border-black/5 shadow-sm">
                  Safe for All Asian Skin Phototypes
                </span>
              </div>

              {/* Framed Beauty Portrait with Glossy Glass Overlays */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/80 shadow-2xl bg-[#E8DDD4]">
                <img
                  src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1200&q=95"
                  alt="Aurelia Clinical Skin Analysis"
                  className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-[1.02]"
                />

                {/* Sweeping Laser Scan Line */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-80 animate-scanline pointer-events-none" />

                {/* Nuvé-Style Live HUD Skin Bounding Boxes (Forehead, Cheek, Jawline) */}
                <div 
                  onMouseEnter={() => setActiveScanPoint(1)}
                  onMouseLeave={() => setActiveScanPoint(null)}
                  className="absolute top-[20%] right-[16%] z-20 cursor-pointer group"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 border border-white/80 rounded-md relative backdrop-blur-[2px] transition-all group-hover:border-gold">
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400" />
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/75 backdrop-blur-md text-white text-[9px] px-2 py-0.5 rounded shadow-sm opacity-90">
                      Melasma / Pigmentation
                    </div>
                  </div>
                </div>

                <div 
                  onMouseEnter={() => setActiveScanPoint(2)}
                  onMouseLeave={() => setActiveScanPoint(null)}
                  className="absolute top-[48%] left-[24%] z-20 cursor-pointer group"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 border border-white/80 rounded-md relative backdrop-blur-[2px] transition-all group-hover:border-gold">
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/75 backdrop-blur-md text-white text-[9px] px-2 py-0.5 rounded shadow-sm opacity-90">
                      Pore Micro-Texture
                    </div>
                  </div>
                </div>

                <div 
                  onMouseEnter={() => setActiveScanPoint(3)}
                  onMouseLeave={() => setActiveScanPoint(null)}
                  className="absolute bottom-[24%] right-[22%] z-20 cursor-pointer group"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 border border-white/80 rounded-md relative backdrop-blur-[2px] transition-all group-hover:border-gold">
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-400" />
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/75 backdrop-blur-md text-white text-[9px] px-2 py-0.5 rounded shadow-sm opacity-90">
                      Collagen Index: 4.8x
                    </div>
                  </div>
                </div>

                {/* Corner Crosshair Nodes on Frame */}
                <div className="absolute top-2 left-2 text-[10px] text-white/70 font-mono">⌜</div>
                <div className="absolute top-2 right-2 text-[10px] text-white/70 font-mono">⌝</div>
                <div className="absolute bottom-2 left-2 text-[10px] text-white/70 font-mono">⌞</div>
                <div className="absolute bottom-2 right-2 text-[10px] text-white/70 font-mono">⌟</div>
              </div>

              {/* Overlapping Magnetic Circular CTA Button */}
              <button
                onClick={() => scrollToQuotation('quiz')}
                aria-label="Calculate Treatment Quote"
                className="absolute -bottom-6 -right-6 z-30 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-obsidian text-white flex flex-col items-center justify-center p-2 shadow-2xl hover:bg-gold transition-all duration-300 group hover:scale-105"
              >
                <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-center leading-tight">
                  Calculate
                  <br />
                  Quote ↗
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Giant High-Contrast Editorial Typography */}
          <div className="lg:col-span-3 space-y-4 text-center lg:text-left order-3">
            <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-light text-obsidian tracking-[-0.03em] leading-[0.92]">
              LUMINOUS
              <br />
              <span className="italic font-light text-obsidian/90">RENEWAL</span>
            </h1>

            <p className="text-xs sm:text-sm text-obsidian/70 font-sans leading-relaxed pt-2">
              {language === 'EN'
                ? 'Precision physician-led dermatology combining high-speed picosecond physics with biocompatible cellular regeneration.'
                : 'Dermatologi berpandukan doktor pakar menggabungkan fizik pikosaat berkecepatan tinggi dengan penjanaan selular.'}
            </p>
          </div>
        </div>

        {/* Bottom Editorial Bar: Location & Certification */}
        <div className="relative z-10 pt-4 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-obsidian/60 font-sans">
          <div className="flex items-center gap-2">
            <span>Bangsar Flagship (Jalan Telawi 3)</span>
            <span>•</span>
            <span>Damansara Heights (Plaza Batai)</span>
          </div>

          <div className="tracking-wider uppercase text-[10px] font-medium">
            MOH AESTHETIC REGISTRY #LCP-A-2018-042
          </div>
        </div>
      </div>
    </section>
  );
};
