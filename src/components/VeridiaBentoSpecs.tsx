import React from 'react';
import { useClinic } from '../context/ClinicContext';
import { ShieldCheck, Activity, Sparkles, Zap, CheckCircle2 } from 'lucide-react';

export const VeridiaBentoSpecs: React.FC = () => {
  const { language } = useClinic();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD 1: Dual-Wavelength Precision with Animated Spectrum Curve Graph */}
        <div className="rounded-[28px] glass-nuve p-7 sm:p-8 border border-white/90 shadow-pearl-glass flex flex-col justify-between group hover:border-rosegold/50 transition-all duration-300">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono font-bold text-plum-dark/60 bg-white/70 px-2 py-0.5 rounded-md border border-white/80">
                1
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-plum-muted font-sans">
                {language === 'EN' ? 'Laser Physics' : 'Fizik Laser'}
              </span>
            </div>

            <h3 className="font-serif text-2xl font-medium text-plum-dark">
              {language === 'EN' ? 'Dual-Wavelength Precision' : 'Ketepatan Dwi-Panjang Gelombang'}
            </h3>
            <p className="text-xs text-plum-muted mt-1 leading-relaxed">
              {language === 'EN'
                ? 'Real-time spectrum wavelength schematic in rose-gold and plum sub-nanometer vectors.'
                : 'Skematik panjang gelombang spektrum dalam vektor sub-nanometer rose-gold dan plum.'}
            </p>
          </div>

          {/* SVG Animated Spectrum Graph (300nm – 800nm) */}
          <div className="my-6 p-4 rounded-2xl bg-white/60 border border-white/80 shadow-inner">
            <div className="flex items-center justify-between text-[10px] font-mono text-plum-muted mb-2">
              <span>Photo-intensity (A.U.)</span>
              <span className="text-rosegold-dark font-bold font-sans">1064nm / 532nm Peak</span>
            </div>

            <div className="relative h-28 w-full">
              <svg viewBox="0 0 320 100" className="w-full h-full overflow-visible">
                {/* Grid lines */}
                <line x1="20" y1="90" x2="310" y2="90" stroke="#EADCD7" strokeWidth="1" />
                <line x1="20" y1="10" x2="20" y2="90" stroke="#EADCD7" strokeWidth="1" />
                <line x1="100" y1="10" x2="100" y2="90" stroke="#EADCD7" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                <line x1="200" y1="10" x2="200" y2="90" stroke="#EADCD7" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                <line x1="290" y1="10" x2="290" y2="90" stroke="#EADCD7" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />

                {/* Shaded Area under peak 1 */}
                <path
                  d="M 50 90 Q 90 90, 105 35 Q 115 15, 125 35 Q 140 90, 170 90 Z"
                  fill="url(#roseGradient)"
                  opacity="0.35"
                />

                {/* Shaded Area under peak 2 */}
                <path
                  d="M 180 90 Q 210 90, 225 25 Q 235 5, 245 25 Q 260 90, 290 90 Z"
                  fill="url(#plumGradient)"
                  opacity="0.25"
                />

                {/* Primary Dual-Curve Spectrum Vector Line */}
                <path
                  d="M 20 90 L 50 90 Q 90 90, 105 35 Q 115 15, 125 35 Q 140 90, 175 90 Q 210 90, 225 25 Q 235 5, 245 25 Q 260 90, 310 90"
                  fill="none"
                  stroke="#C99E9A"
                  strokeWidth="2.5"
                  className="animate-spectrum"
                />

                {/* Peak 2 Overlay Line */}
                <path
                  d="M 175 90 Q 210 90, 225 25 Q 235 5, 245 25 Q 260 90, 310 90"
                  fill="none"
                  stroke="#23161C"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />

                <defs>
                  <linearGradient id="roseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C99E9A" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#C99E9A" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="plumGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#23161C" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#23161C" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Wavelength Axis Labels */}
            <div className="flex justify-between items-center text-[9px] font-mono text-plum-muted/80 pt-1">
              <span>300nm</span>
              <span>450nm</span>
              <span>600nm</span>
              <span>750nm</span>
              <span>800nm+</span>
            </div>
          </div>

          <div className="text-[11px] text-plum-dark/80 flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-rosegold" />
            <span>Sub-ablative photo-acoustic fragmentation</span>
          </div>
        </div>

        {/* CARD 2: Collagen Remodeling Index (Giant 4.8x) */}
        <div className="rounded-[28px] glass-nuve p-7 sm:p-8 border border-white/90 shadow-pearl-glass flex flex-col justify-between group hover:border-rosegold/50 transition-all duration-300">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono font-bold text-plum-dark/60 bg-white/70 px-2 py-0.5 rounded-md border border-white/80">
                2
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-plum-muted font-sans">
                {language === 'EN' ? 'Histological Evidence' : 'Bukti Histologi'}
              </span>
            </div>

            <h3 className="font-serif text-2xl font-medium text-plum-dark">
              {language === 'EN' ? 'Collagen Remodeling Index' : 'Indeks Penstrukturan Kolagen'}
            </h3>
          </div>

          {/* Giant Editorial Metric 4.8x */}
          <div className="my-6 text-center py-4">
            <div className="font-serif text-7xl sm:text-8xl font-light text-plum-dark tracking-tight leading-none">
              4.8<span className="text-rosegold-dark italic font-normal text-6xl">x</span>
            </div>
            <p className="text-xs sm:text-sm font-sans text-plum-dark/80 mt-3 font-medium max-w-xs mx-auto leading-relaxed">
              {language === 'EN'
                ? 'Increase in pro-collagen type I & III synthesis after a single protocol session.'
                : 'Peningkatan sintesis pro-kolagen jenis I & III selepas satu sesi protokol sahaja.'}
            </p>
          </div>

          {/* Histological Comparison Bar */}
          <div className="space-y-2 pt-2 border-t border-white/80">
            <div className="flex justify-between text-[11px] text-plum-muted">
              <span>Baseline Fibroblast Activity:</span>
              <span className="font-mono font-bold text-plum-dark">1.0x</span>
            </div>
            <div className="w-full bg-white/80 rounded-full h-2 overflow-hidden border border-white">
              <div className="bg-gradient-to-r from-mauve to-plum h-full rounded-full w-[85%] transition-all duration-1000" />
            </div>
            <div className="flex justify-between text-[10px] text-plum-muted/80 pt-0.5">
              <span>Biopsied at Day 28 Post-Treatment</span>
              <span className="text-emerald-700 font-bold">+380% Density</span>
            </div>
          </div>
        </div>

        {/* CARD 3: Zero-Downtime Cryo-Cooling with Macro Ergonomic Handpiece */}
        <div className="rounded-[28px] glass-nuve p-7 sm:p-8 border border-white/90 shadow-pearl-glass flex flex-col justify-between group hover:border-rosegold/50 transition-all duration-300">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono font-bold text-plum-dark/60 bg-white/70 px-2 py-0.5 rounded-md border border-white/80">
                3
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-plum-muted font-sans">
                {language === 'EN' ? 'Contact Cryo-Thermal' : 'Penyejukan Sentuhan Krio'}
              </span>
            </div>

            <h3 className="font-serif text-2xl font-medium text-plum-dark">
              {language === 'EN' ? 'Zero-Downtime Cryo-Cooling' : 'Penyejukan Krio Sifar Masa Henti'}
            </h3>
            <p className="text-xs text-plum-muted mt-1 leading-relaxed">
              {language === 'EN'
                ? 'Ergonomic titanium cooling handpiece dissipating epidermal heat in real-time.'
                : 'Pemegang titanium ergonomik yang menyejukkan lapisan epidermis secara masa nyata.'}
            </p>
          </div>

          {/* High-res Macro Visual Frame */}
          <div className="relative my-6 rounded-2xl overflow-hidden aspect-[16/10] border border-white/90 shadow-md bg-plum-deep">
            <img
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85"
              alt="Aurelia Clinic Cryo-Cooling Ergonomic Medical Device"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-plum/60 via-transparent to-transparent" />

            {/* Floating Tolerance Badge */}
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-white/85 backdrop-blur-md border border-white/95 text-plum-dark shadow-sm">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Patient Tolerance</span>
                </span>
                <span className="text-[10px] font-mono text-plum-muted">FDA Cleared</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-plum-dark/80 flex items-center justify-between font-medium">
            <span>Continuous Contact Epidermal Shield</span>
            <span className="text-rosegold-dark font-bold font-mono">3°C Chill</span>
          </div>
        </div>

      </div>
    </section>
  );
};
