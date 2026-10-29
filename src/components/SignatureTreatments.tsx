import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { TreatmentCategory } from '../types';
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  CheckCircle, 
  Plus, 
  Flame,
  Award
} from 'lucide-react';

export const SignatureTreatments: React.FC = () => {
  const { 
    t, 
    language, 
    treatments, 
    formatCurrency, 
    setPreselectedTreatmentId, 
    addToast 
  } = useClinic();

  const [filter, setFilter] = useState<TreatmentCategory | 'all'>('all');

  const filteredTreatments = filter === 'all'
    ? treatments
    : treatments.filter((t) => t.category === filter);

  const handleAddToQuote = (id: string, name: string) => {
    setPreselectedTreatmentId(id);
    const el = document.getElementById('quotation-engine');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    addToast('Added to Custom Builder', `${name} preselected in the interactive calculator.`, 'gold');
  };

  return (
    <section id="treatments" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold-deep text-xs font-bold uppercase tracking-widest mb-3 font-sans">
            <Award className="w-3.5 h-3.5 text-gold" />
            <span>Clinical Aesthetics Mastery</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-obsidian tracking-[-0.02em]">
            {language === 'EN' ? 'Signature Medical Aesthetic Procedures' : 'Prosedur Perubatan Estetik Utama'}
          </h2>
          <p className="font-sans text-xs sm:text-base text-obsidian/75 mt-3 leading-relaxed">
            {language === 'EN'
              ? 'Every protocol is administered 100% by certified LCP medical aesthetic physicians using genuine US-FDA & MDA Malaysia registered devices.'
              : 'Setiap rawatan dikendalikan sepenuhnya oleh doktor estetik bertauliah LCP menggunakan peranti tulen berdaftar MDA.'}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-xs font-sans font-semibold tracking-wider uppercase whitespace-nowrap transition-all ${
              filter === 'all'
                ? 'bg-obsidian text-white shadow-sm'
                : 'bg-white hover:bg-pearl-100 text-obsidian/70 border border-pearl-200'
            }`}
          >
            {language === 'EN' ? 'All (11)' : 'Semua (11)'}
          </button>
          <button
            onClick={() => setFilter('lasers')}
            className={`px-4 py-2 rounded-full text-xs font-sans font-semibold tracking-wider uppercase whitespace-nowrap transition-all ${
              filter === 'lasers'
                ? 'bg-obsidian text-white shadow-sm'
                : 'bg-white hover:bg-pearl-100 text-obsidian/70 border border-pearl-200'
            }`}
          >
            {language === 'EN' ? 'Lasers' : 'Laser'}
          </button>
          <button
            onClick={() => setFilter('injectables')}
            className={`px-4 py-2 rounded-full text-xs font-sans font-semibold tracking-wider uppercase whitespace-nowrap transition-all ${
              filter === 'injectables'
                ? 'bg-obsidian text-white shadow-sm'
                : 'bg-white hover:bg-pearl-100 text-obsidian/70 border border-pearl-200'
            }`}
          >
            {language === 'EN' ? 'Injectables & HA' : 'Suntikan & HA'}
          </button>
          <button
            onClick={() => setFilter('lifting')}
            className={`px-4 py-2 rounded-full text-xs font-sans font-semibold tracking-wider uppercase whitespace-nowrap transition-all ${
              filter === 'lifting'
                ? 'bg-obsidian text-white shadow-sm'
                : 'bg-white hover:bg-pearl-100 text-obsidian/70 border border-pearl-200'
            }`}
          >
            {language === 'EN' ? 'HIFU & Lifting' : 'HIFU & Kontur'}
          </button>
        </div>
      </div>

      {/* Treatments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredTreatments.map((treatment) => (
          <div
            key={treatment.id}
            className="group glass-pearl rounded-3xl overflow-hidden border border-white/95 shadow-pearl-glass hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
          >
            <div>
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-obsidian-deep">
                <img
                  src={treatment.image}
                  alt={treatment.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
                
                {/* Floating Tag */}
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/90 text-obsidian text-[10px] font-bold uppercase tracking-wider font-sans backdrop-blur-md shadow-sm">
                  {treatment.tag}
                </div>

                {/* MDA Badge */}
                <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-[10px] font-semibold font-sans backdrop-blur-md flex items-center gap-1 border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>MDA Approved</span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold font-sans">
                    {language === 'EN' ? treatment.categoryLabel : treatment.categoryLabelBM}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-obsidian group-hover:text-gold transition-colors leading-tight">
                  {language === 'EN' ? treatment.name : treatment.nameBM}
                </h3>
                
                <p className="font-sans text-xs sm:text-sm text-obsidian/70 mt-2.5 leading-relaxed line-clamp-3">
                  {language === 'EN' ? treatment.description : treatment.descriptionBM}
                </p>

                {/* Specs List */}
                <div className="mt-4 pt-4 border-t border-pearl-200/80 grid grid-cols-2 gap-2 text-[11px] font-sans text-obsidian/65">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    <span>Duration: <strong>{treatment.duration}</strong></span>
                  </div>
                  <div>
                    Downtime: <strong>{language === 'EN' ? treatment.downtime : treatment.downtimeBM}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with Price and Add to Quote Button */}
            <div className="p-6 pt-0">
              <div className="p-4 rounded-2xl bg-pearl-100/70 border border-pearl-200/80 flex items-center justify-between">
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
                    Single Session Promo Rate
                  </span>
                </div>

                <button
                  onClick={() => handleAddToQuote(treatment.id, treatment.name)}
                  className="btn-gold-sheen px-3.5 py-2 rounded-full bg-obsidian hover:bg-gold text-white text-[11px] font-bold uppercase tracking-wider font-sans transition-all flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{language === 'EN' ? 'Add to Quote' : '+ Tambah'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
