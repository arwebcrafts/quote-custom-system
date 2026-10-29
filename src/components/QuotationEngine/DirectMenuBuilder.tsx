import React, { useState, useEffect } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Treatment, TreatmentCategory } from '../../types';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Percent,
  Plus,
  Trash2
} from 'lucide-react';

interface DirectMenuBuilderProps {
  onProceedToBooking: (selectedTreatments: Treatment[], subtotal: number, discount: number, finalTotal: number) => void;
}

export const DirectMenuBuilder: React.FC<DirectMenuBuilderProps> = ({ onProceedToBooking }) => {
  const { 
    t, 
    language, 
    treatments, 
    formatCurrency, 
    preselectedTreatmentId, 
    setPreselectedTreatmentId 
  } = useClinic();

  const [selectedIds, setSelectedIds] = useState<string[]>(['pico-laser']);
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory | 'all'>('all');

  // Handle preselected treatment if coming from another section
  useEffect(() => {
    if (preselectedTreatmentId && !selectedIds.includes(preselectedTreatmentId)) {
      setSelectedIds((prev) => [...prev, preselectedTreatmentId]);
      setPreselectedTreatmentId(null);
    }
  }, [preselectedTreatmentId, selectedIds, setPreselectedTreatmentId]);

  const toggleTreatment = (id: string) => {
    setSelectedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedTreatments = treatments.filter((t) => selectedIds.includes(t.id));

  // Multi-Treatment Bundle Calculation:
  // If 2 or more treatments are selected, automatically grant 15% VIP bundle discount!
  const subtotal = selectedTreatments.reduce((acc, curr) => acc + curr.basePrice, 0);
  const isBundleEligible = selectedTreatments.length >= 2;
  const bundleDiscount = isBundleEligible ? Math.round(subtotal * 0.15) : 0;
  const finalTotal = subtotal - bundleDiscount;

  const categories: { id: TreatmentCategory | 'all'; label: string; labelBM: string }[] = [
    { id: 'all', label: 'All Treatments', labelBM: 'Semua Rawatan' },
    { id: 'lasers', label: 'Lasers & Resurfacing', labelBM: 'Laser & Penstrukturan' },
    { id: 'injectables', label: 'Injectables & Boosters', labelBM: 'Suntikan & Biostimulator' },
    { id: 'lifting', label: 'Lifting & Contouring', labelBM: 'Pengencangan & Kontur' },
  ];

  const filteredTreatments = activeCategory === 'all' 
    ? treatments 
    : treatments.filter((t) => t.category === activeCategory);

  return (
    <div className="w-full space-y-7">
      {/* Header & Bundle Discount Prompt */}
      <div className="border-b border-pearl-200/60 pb-4">
        <h3 className="font-serif text-2xl sm:text-3xl font-medium text-obsidian">
          {t.builderStep1Title}
        </h3>
        <p className="font-sans text-xs sm:text-sm text-obsidian/70 mt-1">
          {t.builderStep1Sub}
        </p>

        {/* 15% Bundle Reward Banner */}
        <div className={`mt-3.5 p-3 rounded-xl border flex items-center gap-2.5 transition-all text-xs font-sans ${
          isBundleEligible
            ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
            : 'bg-gold/10 text-obsidian border-gold/30'
        }`}>
          <Percent className="w-4 h-4 text-gold-deep shrink-0" />
          <span>
            {isBundleEligible
              ? (language === 'EN' 
                  ? '🎉 VIP Multi-Treatment Bundle Activated: 15% Discount Applied to Total!' 
                  : '🎉 Pakej VIP Diaktifkan: Diskaun 15% Ditotalkan Secara Automatik!')
              : (language === 'EN' 
                  ? 'Tip: Select any 2 or more treatments to unlock an automatic 15% Multi-Treatment Bundle Savings.' 
                  : 'Tip: Pilih mana-mana 2 atau lebih rawatan untuk nikmati potongan 15% serta-merta.')
            }
          </span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-sans font-semibold tracking-wider uppercase whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-obsidian text-white shadow-sm'
                : 'bg-white/80 hover:bg-white text-obsidian/70 border border-pearl-200'
            }`}
          >
            {language === 'EN' ? cat.label : cat.labelBM}
          </button>
        ))}
      </div>

      {/* Treatment Multi-Select Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTreatments.map((treatment) => {
          const isSelected = selectedIds.includes(treatment.id);
          return (
            <div
              key={treatment.id}
              onClick={() => toggleTreatment(treatment.id)}
              className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between group ${
                isSelected
                  ? 'bg-white shadow-gold-card border-gold ring-2 ring-gold/25'
                  : 'bg-white/60 hover:bg-white border-pearl-200 hover:border-gold/40'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-pearl-100 text-obsidian/70 font-sans">
                      {language === 'EN' ? treatment.categoryLabel : treatment.categoryLabelBM}
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold font-sans">
                      MOH Approved
                    </span>
                  </div>

                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                    isSelected ? 'bg-gold border-gold text-white' : 'border-pearl-300 group-hover:border-gold'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4 fill-white text-gold" />}
                  </div>
                </div>

                <h4 className="font-serif text-lg font-medium text-obsidian group-hover:text-gold transition-colors">
                  {language === 'EN' ? treatment.name : treatment.nameBM}
                </h4>

                <p className="font-sans text-xs text-obsidian/65 mt-1.5 line-clamp-2 leading-relaxed">
                  {language === 'EN' ? treatment.description : treatment.descriptionBM}
                </p>

                {/* Micro specs */}
                <div className="flex items-center gap-4 mt-3 text-[11px] font-sans text-obsidian/60">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    <span>{treatment.duration}</span>
                  </span>
                  <span>
                    Downtime: <strong className="text-obsidian font-semibold">{language === 'EN' ? treatment.downtime : treatment.downtimeBM}</strong>
                  </span>
                </div>
              </div>

              {/* Price & Selection Footer */}
              <div className="mt-4 pt-3 border-t border-pearl-200/70 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-xl font-medium text-obsidian">
                      {formatCurrency(treatment.basePrice)}
                    </span>
                    {treatment.originalPrice > treatment.basePrice && (
                      <span className="text-xs line-through text-obsidian/40 font-sans">
                        {formatCurrency(treatment.originalPrice)}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-obsidian/50 font-sans">
                    Single Session Rate
                  </span>
                </div>

                <span className={`text-xs font-sans font-bold px-3 py-1.5 rounded-full transition-all ${
                  isSelected 
                    ? 'bg-gold text-white shadow-sm' 
                    : 'bg-pearl-100 text-obsidian/80 group-hover:bg-gold/20'
                }`}>
                  {isSelected ? (language === 'EN' ? 'Selected ✓' : 'Dipilih ✓') : (language === 'EN' ? '+ Add' : '+ Tambah')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky Custom Quote Summary Bar */}
      <div className="sticky bottom-4 z-20 rounded-2xl glass-onyx text-white p-5 border border-gold/40 shadow-onyx-depth backdrop-blur-2xl">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold font-sans">
                {t.customQuoteSummary}
              </span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full font-mono text-pearl-200">
                {selectedTreatments.length} {t.selectedCount}
              </span>
            </div>

            {selectedTreatments.length === 0 ? (
              <p className="text-xs text-pearl-300 font-sans mt-1">
                {t.selectAtLeastOne}
              </p>
            ) : (
              <div className="mt-1 flex items-baseline gap-3">
                <span className="font-serif text-3xl font-light text-gold">
                  {formatCurrency(finalTotal)}
                </span>
                {bundleDiscount > 0 && (
                  <span className="text-xs text-emerald-400 font-sans font-semibold">
                    (Saved {formatCurrency(bundleDiscount)} with 15% VIP Bundle)
                  </span>
                )}
                {bundleDiscount === 0 && selectedTreatments.length === 1 && (
                  <span className="text-xs text-pearl-300 font-sans">
                    (Add 1 more treatment to unlock 15% off!)
                  </span>
                )}
              </div>
            )}
          </div>

          <button
            disabled={selectedTreatments.length === 0}
            onClick={() => onProceedToBooking(selectedTreatments, subtotal, bundleDiscount, finalTotal)}
            className="btn-gold-sheen disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3.5 rounded-full bg-gradient-to-r from-gold via-champagne-500 to-gold-deep text-white text-xs font-bold uppercase tracking-widest font-sans shadow-gold-glow flex items-center justify-center gap-2"
          >
            <span>{t.proceedToBooking}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
