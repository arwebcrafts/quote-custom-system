import React, { useState, useRef, useCallback } from 'react';
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
  splitImage: string;
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
    splitImage: '/images/media_1793242317247_bbc7a6c7.png',
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
    splitImage: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&w=1200&q=85',
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
    splitImage: '/images/media_1793242271596_781cc21e.png',
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

  const activeCase = CASES.find((c) => c.id === activeCaseId) || CASES[0];

  const handleDrag = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const onTouchMove = (e: React.TouchEvent) => {
    handleDrag(e.touches[0].clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleDrag(e.clientX);
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
            ? 'Interactive magnification of dermatological surface remodeling and cellular micro-texture clearance.'
            : 'Pembesaran interaktif penstrukturan semula permukaan kulit dan pemulihan mikro-tekstur selular.'}
        </p>
      </div>

      {/* Case Tabs: Horizontally in ONE line */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-8">
        {CASES.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveCaseId(item.id);
              setSliderPos(50);
            }}
            className={`px-5 py-2 rounded-full text-xs font-sans font-medium tracking-wider uppercase transition-all duration-200 whitespace-nowrap border ${
              activeCaseId === item.id
                ? 'bg-obsidian text-white border-obsidian shadow-sm'
                : 'bg-white/80 hover:bg-white text-obsidian/70 border-black/10'
            }`}
          >
            {language === 'EN' ? item.tabLabel : item.tabLabelBM}
          </button>
        ))}
      </div>

      {/* Veridia-Style Proven Clinical Outcomes Stage */}
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

        {/* Center: Interactive Split-View Frame with Draggable Handle */}
        <div className="lg:col-span-6 flex flex-col items-center order-1 lg:order-2">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}
            className="relative w-full max-w-[460px] aspect-square rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/90 shadow-xl bg-black/5"
          >
            {/* Split Image Display (User's Exact Uploaded Clinical Acne/Skin Transformation) */}
            <img
              src={activeCase.splitImage}
              alt={activeCase.title}
              className="w-full h-full object-cover pointer-events-none"
            />

            {/* Interactive Divider Line with Subtle Glow */}
            <div
              style={{ left: `${sliderPos}%` }}
              className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-md pointer-events-none"
            />
          </div>

          {/* Timeline Bar below Split-View (Matching Veridia Reference) */}
          <div className="w-full max-w-[460px] mt-4 flex items-center justify-between text-[11px] text-obsidian/60 font-sans px-2">
            <span>Before Treatment</span>
            <div className="flex-1 mx-4 h-0.5 bg-black/10 relative">
              <div 
                style={{ left: `${sliderPos}%` }} 
                className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-obsidian -translate-x-1/2" 
              />
            </div>
            <span>8-Week Clearance</span>
          </div>
        </div>

        {/* Right Side: 3 Floating Spec Pills (Matching Veridia Reference) */}
        <div className="lg:col-span-3 flex flex-col gap-3 justify-center order-3">
          <div className="p-4 rounded-2xl bg-white border border-black/5 shadow-sm text-center">
            <span className="block text-2xl font-serif text-obsidian font-normal">98%</span>
            <span className="text-[11px] uppercase tracking-wider text-obsidian/60 font-medium">Texture Refinement</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-black/5 shadow-sm text-center">
            <span className="block text-2xl font-serif text-obsidian font-normal">100%</span>
            <span className="text-[11px] uppercase tracking-wider text-obsidian/60 font-medium">Patient Tolerance</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-black/5 shadow-sm text-center">
            <span className="block text-xs uppercase tracking-widest font-bold text-obsidian">FDA Cleared</span>
            <span className="text-[11px] text-obsidian/60 block mt-0.5">Medical Aesthetic Device</span>
          </div>
        </div>
      </div>
    </section>
  );
};
