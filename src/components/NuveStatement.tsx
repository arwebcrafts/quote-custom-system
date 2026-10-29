import React from 'react';
import { useClinic } from '../context/ClinicContext';
import { Sparkles, Star, Smile, ShieldCheck, Heart } from 'lucide-react';

export const NuveStatement: React.FC = () => {
  const { language } = useClinic();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center font-sans">
      {/* Category Eyebrow */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-mist border border-lavender-soft text-plum-muted text-xs font-bold uppercase tracking-widest mb-8">
        <Sparkles className="w-3.5 h-3.5 text-rosegold" />
        <span>{language === 'EN' ? 'Mindful Medical Aesthetics' : 'Estetik Perubatan Berwawasan'}</span>
      </div>

      {/* Large Editorial Statement with Embedded Inline Glass Pill Chips */}
      <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-plum-dark leading-[1.3] sm:leading-[1.28] tracking-[-0.015em] max-w-4xl mx-auto">
        {language === 'EN' ? (
          <>
            Aurelia helps you care for your skin like never before. Feel{' '}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 mx-1.5 rounded-full glass-nuve border border-white/95 text-xs sm:text-sm font-sans font-bold text-plum-dark shadow-sm align-middle hover:scale-105 transition-transform">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Confident</span>
            </span>{' '}
            with doctor-led clinical precision backed by AI skin diagnostics and US-FDA technology for your healthiest, most{' '}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 mx-1.5 rounded-full glass-nuve border border-white/95 text-xs sm:text-sm font-sans font-bold text-rosegold-dark shadow-sm align-middle hover:scale-105 transition-transform">
              <Sparkles className="w-3.5 h-3.5 text-rosegold" />
              <span>Glowing</span>
            </span>{' '}
            and{' '}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 mx-1.5 rounded-full glass-nuve border border-white/95 text-xs sm:text-sm font-sans font-bold text-plum-dark shadow-sm align-middle hover:scale-105 transition-transform">
              <Smile className="w-3.5 h-3.5 text-rose-500" />
              <span>Radiant</span>
            </span>{' '}
            appearance.
          </>
        ) : (
          <>
            Aurelia membantu anda merawat kulit wajah seperti tidak pernah sebelum ini. Rasa{' '}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 mx-1.5 rounded-full glass-nuve border border-white/95 text-xs sm:text-sm font-sans font-bold text-plum-dark shadow-sm align-middle hover:scale-105 transition-transform">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Yakin</span>
            </span>{' '}
            dengan kepakaran doktor perubatan berpandukan diagnostik kulit AI untuk penampilan paling{' '}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 mx-1.5 rounded-full glass-nuve border border-white/95 text-xs sm:text-sm font-sans font-bold text-rosegold-dark shadow-sm align-middle hover:scale-105 transition-transform">
              <Sparkles className="w-3.5 h-3.5 text-rosegold" />
              <span>Berseri</span>
            </span>{' '}
            dan{' '}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 mx-1.5 rounded-full glass-nuve border border-white/95 text-xs sm:text-sm font-sans font-bold text-plum-dark shadow-sm align-middle hover:scale-105 transition-transform">
              <Smile className="w-3.5 h-3.5 text-rose-500" />
              <span>Menawan</span>
            </span>.
          </>
        )}
      </h2>

      {/* Tri-stat subtitle pills */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-sans text-plum-muted">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>98% Diagnostic Precision</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rosegold" />
          <span>30+ Clinical Concerns Compounded</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-plum" />
          <span>100% Doctor Performed in Bangsar & Damansara</span>
        </div>
      </div>
    </section>
  );
};
