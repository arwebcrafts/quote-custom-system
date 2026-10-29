import React, { useState, useRef, useCallback } from 'react';
import { useClinic } from '../context/ClinicContext';
import { BEFORE_AFTER_CASES } from '../data/beforeAfter';
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Cpu, 
  UserCheck, 
  MoveHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const { t, language } = useClinic();

  const [activeCategory, setActiveCategory] = useState<string>('pigmentation');
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 0 to 100 percentage
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = BEFORE_AFTER_CASES.find((c) => c.category === activeCategory) || BEFORE_AFTER_CASES[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section id="before-after" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold-deep text-xs font-bold uppercase tracking-widest mb-3 font-sans">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>{t.beforeAfterEyebrow}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-obsidian tracking-[-0.02em]">
          {t.beforeAfterTitle}
        </h2>
        <p className="font-sans text-xs sm:text-base text-obsidian/75 mt-3 leading-relaxed">
          {t.beforeAfterSub}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-6">
        {BEFORE_AFTER_CASES.map((item) => (
          <button
            key={item.category}
            onClick={() => {
              setActiveCategory(item.category);
              setSliderPosition(50);
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-sans font-semibold tracking-wider uppercase whitespace-nowrap transition-all ${
              activeCategory === item.category
                ? 'bg-obsidian text-white shadow-md'
                : 'bg-white hover:bg-pearl-100 text-obsidian/70 border border-pearl-200'
            }`}
          >
            {language === 'EN' ? item.categoryLabel : item.categoryLabelBM}
          </button>
        ))}
      </div>

      {/* Main Interactive Comparison Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-pearl-strong rounded-3xl p-5 sm:p-8 border border-white/95 shadow-pearl-glass">
        {/* Left: Drag Split Comparison Image */}
        <div className="lg:col-span-7">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden cursor-ew-resize select-none border-2 border-white shadow-xl bg-obsidian-deep"
          >
            {/* After Image (Full background) */}
            <img
              src={activeCase.afterImage}
              alt="After Clinical Transformation"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              loading="lazy"
            />
            {/* After Badge */}
            <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-obsidian-deep/80 text-gold text-[11px] font-bold uppercase tracking-wider font-sans border border-gold/40 backdrop-blur-md">
              After: Protocol Completed
            </div>

            {/* Before Image (Clipped overlay) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={activeCase.beforeImage}
                alt="Before Clinical Transformation"
                className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none filter brightness-95"
                style={{ width: containerRef.current ? containerRef.current.clientWidth : '100%' }}
                loading="lazy"
              />
              {/* Before Badge */}
              <div className="absolute bottom-4 left-4 z-10 px-3 py-1 rounded-full bg-obsidian-deep/80 text-pearl-200 text-[11px] font-bold uppercase tracking-wider font-sans border border-white/20 backdrop-blur-md">
                Before: Baseline Assessment
              </div>
            </div>

            {/* Divider Handle */}
            <div
              className="absolute inset-y-0 w-1 bg-white shadow-2xl pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-lg border-2 border-gold flex items-center justify-center text-obsidian">
                <MoveHorizontal className="w-4 h-4 text-gold-deep" />
              </div>
            </div>
          </div>

          {/* Hint text */}
          <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-obsidian/60 font-sans">
            <MoveHorizontal className="w-3.5 h-3.5 text-gold" />
            <span>{t.dragSliderHint}</span>
          </div>
        </div>

        {/* Right: Transparent Clinical Protocol Specs */}
        <div className="lg:col-span-5 space-y-5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold-deep font-sans">
              Clinical Case Documentation
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-obsidian mt-1">
              {activeCase.patientAge}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-obsidian/75 mt-2 leading-relaxed">
              <strong>Concern:</strong> {language === 'EN' ? activeCase.concern : activeCase.concernBM}
            </p>
          </div>

          {/* Clinical Details List */}
          <div className="bg-pearl-100/70 rounded-2xl p-4 sm:p-5 border border-pearl-200 space-y-3 font-sans text-xs">
            <div className="flex items-start justify-between py-1 border-b border-pearl-200/70">
              <span className="text-obsidian/60 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                {language === 'EN' ? 'Administered Protocol:' : 'Protokol Diberikan:'}
              </span>
              <strong className="text-obsidian text-right max-w-[60%] font-medium">
                {language === 'EN' ? activeCase.protocol : activeCase.protocolBM}
              </strong>
            </div>

            <div className="flex items-start justify-between py-1 border-b border-pearl-200/70">
              <span className="text-obsidian/60 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold" />
                {t.sessionsLabel}
              </span>
              <strong className="text-obsidian font-medium">
                {activeCase.sessions}
              </strong>
            </div>

            <div className="flex items-start justify-between py-1 border-b border-pearl-200/70">
              <span className="text-obsidian/60 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                {t.downtimeLabel}
              </span>
              <strong className="text-obsidian font-medium">
                {language === 'EN' ? activeCase.downtime : activeCase.downtimeBM}
              </strong>
            </div>

            <div className="flex items-start justify-between py-1 border-b border-pearl-200/70">
              <span className="text-obsidian/60 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-gold" />
                {t.deviceLabel}
              </span>
              <strong className="text-obsidian text-right max-w-[55%] font-medium">
                {activeCase.device}
              </strong>
            </div>

            <div className="flex items-start justify-between py-1">
              <span className="text-obsidian/60 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-gold" />
                {t.doctorLabel}
              </span>
              <strong className="text-gold-deep font-semibold">
                {activeCase.doctor}
              </strong>
            </div>
          </div>

          {/* Quick CTA to book this exact protocol */}
          <button
            onClick={() => {
              const el = document.getElementById('quotation-engine');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full btn-gold-sheen py-3.5 rounded-full bg-obsidian hover:bg-gold text-white font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>{language === 'EN' ? 'Calculate My Price for This Protocol' : 'Kira Harga Saya untuk Protokol Ini'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
