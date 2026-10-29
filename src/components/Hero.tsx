import React from 'react';
import { useClinic } from '../context/ClinicContext';
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Star, 
  CheckCircle, 
  Clock, 
  MapPin,
  CalendarCheck
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { t, language } = useClinic();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient Pearl & Champagne Background Blobs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-gold/10 filter blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[32rem] h-[32rem] rounded-full bg-pearl-200/50 filter blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Editorial Typography & Dual CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          {/* Trust Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pearl border border-gold/30 shadow-sm mb-6 animate-pulse-subtle">
            <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-obsidian uppercase font-sans">
              {t.trustBadge}
            </span>
          </div>

          {/* High-Contrast Editorial Serif Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-light text-obsidian leading-[1.08] tracking-[-0.02em] mb-6">
            <span>{t.heroHeadline1}</span>{' '}
            <span className="italic font-normal text-gold block sm:inline">
              {t.heroHeadline2}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="font-sans text-base sm:text-lg text-obsidian/80 max-w-2xl font-light leading-relaxed mb-8">
            {t.heroSub}
          </p>

          {/* Dual Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
            {/* CTA 1: Glowing Gold Glass Button */}
            <button
              onClick={() => scrollToSection('quotation-engine')}
              className="btn-gold-sheen group flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-gold via-champagne-500 to-gold-deep text-white text-sm font-semibold tracking-wider uppercase font-sans shadow-gold-card hover:shadow-gold-glow transition-all"
            >
              <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
              <span>{t.heroCtaQuote}</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* CTA 2: Frosted Outline Button */}
            <button
              onClick={() => {
                scrollToSection('quotation-engine');
              }}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-full glass-pearl border border-obsidian/20 hover:border-gold hover:text-gold text-obsidian text-sm font-semibold tracking-wider uppercase font-sans transition-all hover:bg-white/90"
            >
              <CalendarCheck className="w-4 h-4 text-gold" />
              <span>{t.heroCtaDirect}</span>
            </button>
          </div>

          {/* Clinical Credentials & Fast Stats Grid */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-pearl-200/80 w-full max-w-lg">
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-medium text-obsidian">
                {t.heroStat1Val}
              </div>
              <div className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-obsidian/60 mt-0.5">
                {t.heroStat1Label}
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-medium text-gold-deep">
                {t.heroStat2Val}
              </div>
              <div className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-obsidian/60 mt-0.5">
                {t.heroStat2Label}
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-medium text-obsidian">
                {t.heroStat3Val}
              </div>
              <div className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-obsidian/60 mt-0.5">
                {t.heroStat3Label}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 4K Editorial Skin & Macro Imagery with Floating Social Proof Card */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Primary High-Fashion Glowing Skin Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] group">
              <img
                src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=85"
                alt="Aurelia Clinic Patient Glowing Translucent Skin"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
                fetchpriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep/60 via-transparent to-transparent" />

              {/* Bottom Tag inside photo */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold bg-obsidian-deep/80 px-2 py-1 rounded backdrop-blur-md border border-gold/30">
                  LCP Aesthetic Protocol
                </span>
                <p className="font-serif text-lg italic text-pearl-100 mt-1">
                  Fotona StarWalker® + Pure Exosome Bioluminescence
                </p>
              </div>
            </div>

            {/* Floating Glass Social Proof Card (As specified in prompt) */}
            <div className="absolute -bottom-6 -left-4 sm:-left-8 right-4 sm:right-auto sm:max-w-sm glass-pearl-strong rounded-2xl p-4 sm:p-5 border border-white/95 shadow-pearl-glass backdrop-blur-2xl animate-float">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-obsidian font-sans">
                  4.9 / 5.0
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold font-sans">
                  Verified KL Patients
                </span>
              </div>
              <p className="text-xs text-obsidian/85 font-sans leading-snug">
                {t.socialProofHero}
              </p>
            </div>

            {/* Micro Badge top right */}
            <div className="absolute -top-3 -right-3 glass-pearl px-3 py-1.5 rounded-full border border-gold/40 shadow-sm flex items-center gap-1.5 text-obsidian">
              <MapPin className="w-3.5 h-3.5 text-gold" />
              <span className="text-[11px] font-sans font-semibold">
                Bangsar & Damansara Heights
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
