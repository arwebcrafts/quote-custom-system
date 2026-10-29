import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useClinic } from '../context/ClinicContext';

interface CaseStudy {
  id: string;
  tabLabel: string;
  tabLabelBM: string;
  title: string;
  titleBM: string;
  protocol: string;
  protocolBM: string;
  downtime: string;
  sessions: string;
  beforeImage: string;
  afterImage: string;
  textureRefinement: string;
  tolerance: string;
  certification: string;
}

const CASES: CaseStudy[] = [
  {
    id: 'acne-blemish',
    tabLabel: 'Acne & Blemish Clearance',
    tabLabelBM: 'Parut Jerawat & Radang',
    title: 'Severe Inflammatory Acne & Post-Blemish Pigmentation',
    titleBM: 'Jerawat Radang Kemerahan & Parut Gelap',
    protocol: 'Fotona StarWalker® Pico + Sylfirm X™ Dual RF + Exosome Therapy',
    protocolBM: 'Laser Piko Fotona + Sylfirm X™ RF + Terapi Eksosom',
    downtime: '4 – 8 hours (Zero crusting)',
    sessions: '3 Sessions (4 weeks interval)',
    beforeImage: '/images/clinical_acne_before.jpg',
    afterImage: '/images/clinical_acne_after.jpg',
    textureRefinement: '98% Texture Refinement',
    tolerance: '100% Patient Tolerance',
    certification: 'FDA & MDA Cleared Medical Device'
  },
  {
    id: 'melasma-pico',
    tabLabel: 'Melasma & Sun Damage',
    tabLabelBM: 'Jeragat & Pigmentasi',
    title: 'Deep Epidermal & Dermal Melasma Photoacoustic Shatter',
    titleBM: 'Pecahan Melanin Pigmentasi Dermal Berketepatan Tinggi',
    protocol: 'Fotona StarWalker® Pico Laser + Tranexamic Depigmenting Infusion',
    protocolBM: 'Laser Piko Fotona StarWalker® + Infusi Tranexamic',
    downtime: '2 – 4 hours mild flush',
    sessions: '4 Sessions (3 weeks apart)',
    beforeImage: '/images/clinical_melasma_before.jpg',
    afterImage: '/images/clinical_melasma_after.jpg',
    textureRefinement: '96% Melanin Reduction',
    tolerance: '100% Patient Comfort',
    certification: 'MOH Approved LCP Protocol'
  },
  {
    id: 'glass-skin',
    tabLabel: 'Korean Glass Skin & Pores',
    tabLabelBM: 'Kulit Kaca Korea & Pori',
    title: 'Cellular Hydration, Pore Smoothing & Dermal Remodeling',
    titleBM: 'Penghalusan Pori Kasar & Seri Wajah Kaca',
    protocol: 'Profhilo® Ultrapure HA + Rejuran® Salmon DNA Polynucleotides',
    protocolBM: 'Profhilo® Asid Hyaluronik + DNA Salmon Rejuran®',
    downtime: 'Zero Downtime (Immediate Glow)',
    sessions: '2 Sessions (Monthly)',
    beforeImage: '/images/clinical_glass_before.jpg',
    afterImage: '/images/clinical_glass_after.jpg',
    textureRefinement: '+380% Pro-Collagen',
    tolerance: '100% Pain-Free Cryo-Numb',
    certification: 'CE Mark & MDA Approved'
  }
];

export const BeforeAfterSlider: React.FC = () => {
  const { language } = useClinic();
  const [activeCaseId, setActiveCaseId] = useState<string>('acne-blemish');
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Preload all case images on mount so tab transitions are instant
  useEffect(() => {
    CASES.forEach((c) => {
      const img1 = new Image();
      img1.src = c.beforeImage;
      const img2 = new Image();
      img2.src = c.afterImage;
    });
  }, []);

  const activeCase = CASES.find((c) => c.id === activeCaseId) || CASES[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const onTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleClick = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  return (
    <section id="before-after" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans scroll-mt-24">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-obsidian/60 mb-2">
          {language === 'EN' ? 'Proven Clinical Outcomes' : 'Hasil Klinikal Terbukti'}
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-obsidian tracking-[-0.02em]">
          {language === 'EN' ? 'Clinical Transformation & Interactive Split-View' : 'Transformasi Klinikal & Perbandingan Interaktif'}
        </h2>
        <p className="text-xs sm:text-base text-obsidian/70 mt-2.5 leading-relaxed">
          {language === 'EN'
            ? 'Drag the slider across to see real patient results with 1:1 clinical photographic comparison.'
            : 'Tarik peluncur untuk melihat hasil pesakit sebenar dengan perbandingan fotografi klinikal 1:1.'}
        </p>
      </div>

      {/* Case Tabs: Instant switching with active pill indicator */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-8">
        {CASES.map((item) => {
          const isActive = activeCaseId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveCaseId(item.id);
                setSliderPos(50);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-150 whitespace-nowrap border cursor-pointer active:scale-95 ${
                isActive
                  ? 'bg-obsidian text-white border-obsidian shadow-md'
                  : 'bg-white/80 hover:bg-white text-obsidian/70 hover:text-obsidian border-black/10'
              }`}
            >
              {language === 'EN' ? item.tabLabel : item.tabLabelBM}
            </button>
          );
        })}
      </div>

      {/* Clinical Outcomes Stage */}
      <div className="rounded-[32px] sm:rounded-[36px] bg-[#FAF8F5] p-6 sm:p-10 border border-black/5 shadow-[0_15px_40px_rgba(0,0,0,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Clinical Description */}
        <div className="lg:col-span-3 space-y-4 order-2 lg:order-1">
          <div className="text-[10px] uppercase tracking-widest font-bold text-obsidian/50">
            {language === 'EN' ? 'Target Indication' : 'Indikasi Rawatan'}
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-obsidian font-light leading-snug">
            {language === 'EN' ? activeCase.title : activeCase.titleBM}
          </h3>

          <div className="space-y-3 pt-3 border-t border-black/5 text-xs text-obsidian/75">
            <div>
              <span className="text-[10px] uppercase font-bold text-obsidian/50 block">Protocol</span>
              <p className="font-medium text-obsidian">{language === 'EN' ? activeCase.protocol : activeCase.protocolBM}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-obsidian/50 block">Downtime</span>
              <p className="font-medium text-obsidian">{activeCase.downtime}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-obsidian/50 block">Sessions</span>
              <p className="font-medium text-obsidian">{activeCase.sessions}</p>
            </div>
          </div>
        </div>

        {/* Center: REAL Interactive Before & After Dual-Image Split View */}
        <div className="lg:col-span-6 flex flex-col items-center order-1 lg:order-2">
          <div
            ref={containerRef}
            onClick={handleClick}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className="relative w-full max-w-[460px] aspect-[3/4] sm:aspect-square rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/90 shadow-2xl bg-[#E8DDD4]"
          >
            {/* Layer 1: AFTER Image (Underneath) */}
            <img
              src={activeCase.afterImage}
              alt={`${activeCase.title} - After`}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
              loading="eager"
            />

            {/* Layer 2: BEFORE Image (Clipped on Top with direct clipPath) */}
            <img
              src={activeCase.beforeImage}
              alt={`${activeCase.title} - Before`}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none will-change-[clip-path]"
              style={{
                clipPath: `inset(0 ${100 - sliderPos}% 0 0)`
              }}
              loading="eager"
            />

            {/* Floating Top Labels */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-sans font-bold tracking-widest uppercase border border-white/20 shadow-md">
                Before
              </span>
            </div>
            <div className="absolute top-4 right-4 z-20 pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-md text-obsidian text-[10px] font-sans font-bold tracking-widest uppercase border border-white/80 shadow-md">
                After Clearance
              </span>
            </div>

            {/* Interactive Dividing Line with Metallic Circular Handle */}
            <div
              style={{ left: `${sliderPos}%` }}
              className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)] pointer-events-none z-30"
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-obsidian shadow-xl border border-black/10 flex items-center justify-center transition-transform hover:scale-110">
                <div className="flex items-center gap-1 font-mono text-xs font-bold text-obsidian select-none">
                  <span>‹</span>
                  <span className="w-0.5 h-3 bg-black/20" />
                  <span>›</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Timeline Bar below Split-View */}
          <div className="w-full max-w-[460px] mt-4 flex items-center justify-between text-[11px] text-obsidian/70 font-sans px-2">
            <span className="font-medium">Before Treatment</span>
            <div 
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = ((e.clientX - rect.left) / rect.width) * 100;
                setSliderPos(Math.max(2, Math.min(98, pct)));
              }}
              className="flex-1 mx-4 h-2 bg-black/10 rounded-full relative cursor-pointer group py-1"
            >
              <div 
                style={{ left: `${sliderPos}%` }} 
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-obsidian shadow-md border-2 border-white transition-all group-hover:scale-125" 
              />
            </div>
            <span className="font-medium">8-Week Clearance</span>
          </div>
        </div>

        {/* Right Side: 3 Floating Spec Pills */}
        <div className="lg:col-span-3 flex flex-col gap-3 justify-center order-3">
          <div className="p-4 rounded-2xl bg-white border border-black/5 shadow-sm text-center">
            <span className="block text-2xl font-serif text-obsidian font-normal">
              {activeCase.textureRefinement.split(' ')[0]}
            </span>
            <span className="text-[11px] uppercase tracking-wider text-obsidian/60 font-medium">
              {activeCase.textureRefinement.split(' ').slice(1).join(' ')}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-black/5 shadow-sm text-center">
            <span className="block text-2xl font-serif text-obsidian font-normal">
              {activeCase.tolerance.split(' ')[0]}
            </span>
            <span className="text-[11px] uppercase tracking-wider text-obsidian/60 font-medium">
              {activeCase.tolerance.split(' ').slice(1).join(' ')}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-black/5 shadow-sm text-center">
            <span className="block text-xs uppercase tracking-widest font-bold text-obsidian">
              {activeCase.certification.split(' ')[0]} Cleared
            </span>
            <span className="text-[11px] text-obsidian/60 block mt-0.5">
              Medical Aesthetic Device
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
