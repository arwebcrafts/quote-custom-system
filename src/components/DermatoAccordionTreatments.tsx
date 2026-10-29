import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { 
  ChevronDown, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Plus, 
  Flame,
  ArrowRight,
  Zap
} from 'lucide-react';

interface AccordionItem {
  id: string;
  categoryTitle: string;
  categoryTitleBM: string;
  subtitle: string;
  subtitleBM: string;
  badge: string;
  cards: {
    id: string;
    name: string;
    nameBM: string;
    image: string;
    price: number;
    originalPrice: number;
    duration: string;
    downtime: string;
    downtimeBM: string;
    tag: string;
    description: string;
    descriptionBM: string;
  }[];
}

export const DermatoAccordionTreatments: React.FC = () => {
  const { language, formatCurrency, setPreselectedTreatmentId, setActiveQuotationTab, addToast } = useClinic();
  const [expandedCategory, setExpandedCategory] = useState<string>('cat-pigment');

  const categories: AccordionItem[] = [
    {
      id: 'cat-pigment',
      categoryTitle: '✦ Melasma, Pigmentation & Pico Laser',
      categoryTitleBM: '✦ Jeragat, Pigmentasi & Laser Piko',
      subtitle: 'Targeted sub-nanosecond photoacoustic melanin shatter with zero thermal burn.',
      subtitleBM: 'Pecahan melanin fotoakustik sub-nanosaat berketepatan tinggi tanpa luka haba.',
      badge: 'Gold Standard',
      cards: [
        {
          id: 'pico-laser',
          name: 'Fotona StarWalker® Pico Laser',
          nameBM: 'Laser Piko Fotona StarWalker®',
          image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=800&q=85',
          price: 550,
          originalPrice: 850,
          duration: '45 mins',
          downtime: '0 – 4 hours (Mild flush)',
          downtimeBM: '0 – 4 jam (Kemerahan ringan)',
          tag: 'Black Friday Promo',
          description: 'Pico-pulses shattering deep recalcitrant dermal melasma and sun lentigines.',
          descriptionBM: 'Denyutan piko memecahkan jeragat mendalam dan tompok matahari degil.'
        },
        {
          id: 'carbon-peel',
          name: 'Spectra Carbon Peel (Hollywood Glow)',
          nameBM: 'Spectra Carbon Peel (Kilauan Hollywood)',
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=85',
          price: 380,
          originalPrice: 600,
          duration: '35 mins',
          downtime: 'Instant Glow (Zero Downtime)',
          downtimeBM: 'Kilauan serta-merta (Sifar masa henti)',
          tag: 'Red Carpet Favorite',
          description: 'Liquid carbon laser vaporization purifying pore debris and brightening dull texture.',
          descriptionBM: 'Vaporisasi karbon membersihkan sebum pori dan menyerikan kulit kusam.'
        },
        {
          id: 'cryo-bright',
          name: 'Medical Cryo-Electroporation Brightening',
          nameBM: 'Infusi Krio-Elektroporasi Pencerahan',
          image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85',
          price: 420,
          originalPrice: 650,
          duration: '40 mins',
          downtime: 'Zero Downtime',
          downtimeBM: 'Tiada masa henti',
          tag: 'Deep Melanin Shield',
          description: 'Transdermal chilled delivery of glutathione and high-grade tranexamic acid.',
          descriptionBM: 'Penyerapan transdermal glutathione dan asid traneksamik sejuk.'
        }
      ]
    },
    {
      id: 'cat-scars',
      categoryTitle: '✦ Acne Scars, Pore Refining & Exosomes',
      categoryTitleBM: '✦ Parut Jerawat, Liang Pori & Eksosom',
      subtitle: 'Basement membrane reconstruction for rolling, boxcar, and ice-pick scars.',
      subtitleBM: 'Pembinaan semula membran dasar untuk parut kawah berlubang dan pori longgar.',
      badge: 'Cellular Reset',
      cards: [
        {
          id: 'sylfirm-x',
          name: 'Sylfirm X™ Dual-Wave RF Microneedling',
          nameBM: 'Sylfirm X™ Microneedling RF Dwi-Gelombang',
          image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=85',
          price: 1200,
          originalPrice: 1750,
          duration: '60 mins',
          downtime: '12 – 24 hours',
          downtimeBM: '12 – 24 jam',
          tag: 'Gold Standard Scars',
          description: 'Continuous and pulsed radiofrequency repairing basement membrane and micro-vessels.',
          descriptionBM: 'Frekuensi radio berterusan merawat membran kulit dan parut jerawat kawah.'
        },
        {
          id: 'exosomes-regen',
          name: 'ASCE+® Pure Exosome Nano-Infusion',
          nameBM: 'Infusi Nano Eksosom ASCE+®',
          image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=85',
          price: 950,
          originalPrice: 1400,
          duration: '45 mins',
          downtime: '4 – 8 hours',
          downtimeBM: '4 – 8 jam',
          tag: '5 Billion Active Nanovesicles',
          description: '1,000+ signaling proteins and growth factors accelerating tissue neo-regeneration.',
          descriptionBM: '1,000+ protein pengisyaratan untuk pertumbuhan tisu kulit baharu yang pantas.'
        },
        {
          id: 'rejuran-s',
          name: 'Rejuran® S Targeted Scar Reconstruction',
          nameBM: 'Rejuran® S Suntikan Khas Parut Kawah',
          image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=85',
          price: 850,
          originalPrice: 1300,
          duration: '35 mins',
          downtime: '12 – 24 hours',
          downtimeBM: '12 – 24 jam',
          tag: 'Salmon DNA Scaffolding',
          description: 'Higher viscosity polynucleotide gel plumping depressed scar bases.',
          descriptionBM: 'Gel polinukleotida pekat yang menaikkan lekukan parut kawah.'
        }
      ]
    },
    {
      id: 'cat-lifting',
      categoryTitle: '✦ Non-Surgical V-Shape HIFU & Ultherapy Lifting',
      categoryTitleBM: '✦ Pengencangan V-Shape HIFU & Ultrasound Tanpa Bedah',
      subtitle: 'Targeting the deep 4.5mm SMAS fascial layer to contour jowls, jawline, and double chin.',
      subtitleBM: 'Mensasarkan lapisan fascia SMAS 4.5mm untuk menegangkan pipi kendur dan dagu.',
      badge: 'Surgery-Free Lift',
      cards: [
        {
          id: 'ultraformer-hifu',
          name: 'Ultraformer III® 7D Dual-Focus HIFU',
          nameBM: 'Ultraformer III® 7D HIFU Kontur Wajah',
          image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=85',
          price: 1800,
          originalPrice: 2800,
          duration: '60 mins',
          downtime: 'Zero Downtime (Immediate Lift)',
          downtimeBM: 'Sifar masa henti (Kesan serta-merta)',
          tag: 'Full Face & Submental',
          description: 'High-intensity focused ultrasound contracting lax SMAS tissue for a sculpted jawline.',
          descriptionBM: 'Ultrasound berfokus menegangkan lapisan SMAS untuk membentuk rahang V-shape.'
        },
        {
          id: 'sofwave-lifting',
          name: 'Sofwave™ Synchronous Ultrasound Lift',
          nameBM: 'Sofwave™ Ultrasound Kolagen Generasi Baru',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
          price: 2600,
          originalPrice: 3800,
          duration: '50 mins',
          downtime: 'Zero Downtime (SofCool™)',
          downtimeBM: 'Sifar masa henti (Penyejukan SofCool™)',
          tag: 'FDA Cleared Elite',
          description: 'Parallel ultrasound beams triggering massive neo-collagenesis in the mid-dermis.',
          descriptionBM: 'Pancaran ultrasound selari merangsang penghasilan kolagen padat lapisan pertengahan.'
        },
        {
          id: 'chin-lipolytic',
          name: 'Double-Chin Lipolytic Sculpt & Tighten',
          nameBM: 'Pelarutan Lemak Dagu Berlapis Terpilih',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85',
          price: 650,
          originalPrice: 950,
          duration: '30 mins',
          downtime: '24 hours mild swelling',
          downtimeBM: '24 jam bengkak minima',
          tag: 'Chiseled Profile',
          description: 'Targeted micro-lipolysis permanently dissolving localized submental fat cells.',
          descriptionBM: 'Suntikan deoxycholic asid melarutkan lemak bawah dagu secara kekal.'
        }
      ]
    },
    {
      id: 'cat-boosters',
      categoryTitle: '✦ Korean Glass Skin Boosters (Rejuran & Profhilo)',
      categoryTitleBM: '✦ Penggalak Kulit Kaca Korea (Rejuran & Profhilo)',
      subtitle: 'Pure hyaluronic acid bio-remodelling and wild salmon DNA polynucleotide matrix.',
      subtitleBM: 'Asid hyaluronik tulen 100% dan molekul DNA salmon untuk kilauan kaca bercahaya.',
      badge: 'Dewy Translucency',
      cards: [
        {
          id: 'profhilo',
          name: 'Profhilo® 100% Pure HA Bio-Remodelling',
          nameBM: 'Profhilo® HA Ketulenan 100%',
          image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=85',
          price: 1600,
          originalPrice: 2200,
          duration: '30 mins',
          downtime: '6 – 12 hours (Micro-bumps vanish)',
          downtimeBM: '6 – 12 jam (Bintik halus hilang)',
          tag: 'Ultimate Skin Quench',
          description: 'High and low molecular weight ultrapure HA regenerating collagen and elastin.',
          descriptionBM: 'Asid hyaluronik berkepekatan tinggi memulihkan keanjalan matriks kulit.'
        },
        {
          id: 'rejuran-healer',
          name: 'Rejuran® Healer Salmon DNA Polynucleotides',
          nameBM: 'Rejuran® Healer DNA Salmon Polinukleotida',
          image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=85',
          price: 1100,
          originalPrice: 1600,
          duration: '45 mins',
          downtime: '24 hours (Mild papules)',
          downtimeBM: '24 jam (Papul reda pantas)',
          tag: 'Cellular Skin Repair',
          description: 'DNA polynucleotides activating fibroblast repair and thickening the epidermis.',
          descriptionBM: 'Polinukleotida DNA mengaktifkan fibroblas dan menebalkan penghalang kulit.'
        },
        {
          id: 'dysport-tox',
          name: 'Dysport® Precision Jawline & Smoothing Micro-Tox',
          nameBM: 'Dysport® Suntikan Mikro Rahang & Garis Halus',
          image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=85',
          price: 750,
          originalPrice: 1100,
          duration: '25 mins',
          downtime: 'Zero Downtime',
          downtimeBM: 'Tiada masa henti',
          tag: 'Natural Expression',
          description: 'Micro-dosed botulinum for masseter slimming and fine pore glass-skin smoothing.',
          descriptionBM: 'Dos mikro botulinum untuk pembentukan rahang V dan penghalusan liang pori.'
        }
      ]
    }
  ];

  const handleAddToQuote = (id: string, name: string) => {
    setPreselectedTreatmentId(id);
    setActiveQuotationTab('direct');
    const el = document.getElementById('quotation-engine');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    addToast('Added to Custom Quote', `${name} preselected in the interactive builder.`, 'gold');
  };

  return (
    <section id="treatments" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans scroll-mt-24">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-mauve/15 border border-mauve/30 text-plum-muted text-xs font-bold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-rosegold-dark" />
          <span>{language === 'EN' ? 'Dermato Clinical Protocols' : 'Protokol Klinikal Dermato'}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-plum-dark tracking-[-0.02em]">
          {language === 'EN' ? 'Treatments Tailored to Your Skin' : 'Rawatan Disesuaikan dengan Kulit Anda'}
        </h2>
        <p className="text-xs sm:text-base text-plum-muted mt-3 leading-relaxed">
          {language === 'EN'
            ? 'Explore our expanding clinical catalog. Every protocol is performed 100% by certified LCP aesthetic physicians.'
            : 'Terokai katalog klinikal kami. Setiap prosedur dikendalikan sepenuhnya oleh doktor bertauliah LCP KKM.'}
        </p>
      </div>

      {/* Dermato Expanding Accordion Container */}
      <div className="rounded-[32px] sm:rounded-[38px] glass-nuve p-4 sm:p-7 border border-white/95 shadow-pearl-glass space-y-4">
        {categories.map((cat) => {
          const isExpanded = expandedCategory === cat.id;

          return (
            <div
              key={cat.id}
              className={`rounded-2xl transition-all duration-300 overflow-hidden border ${
                isExpanded 
                  ? 'bg-white/85 shadow-lg border-rosegold/40 ring-1 ring-rosegold/20' 
                  : 'bg-white/50 hover:bg-white/70 border-white/80'
              }`}
            >
              {/* Category Header Clicker */}
              <button
                type="button"
                onClick={() => setExpandedCategory(isExpanded ? '' : cat.id)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-serif text-xl sm:text-2xl font-medium text-plum-dark">
                      {language === 'EN' ? cat.categoryTitle : cat.categoryTitleBM}
                    </span>
                    <span className="hidden sm:inline-flex text-[10px] font-mono font-bold uppercase tracking-wider text-rosegold-dark bg-mauve/15 px-2 py-0.5 rounded-full">
                      {cat.badge}
                    </span>
                  </div>
                  <p className="text-xs text-plum-muted font-sans line-clamp-1 max-w-2xl">
                    {language === 'EN' ? cat.subtitle : cat.subtitleBM}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-semibold text-plum-muted hidden md:inline">
                    {isExpanded ? (language === 'EN' ? 'Collapse' : 'Tutup') : (language === 'EN' ? '3 Protocols' : '3 Protokol')}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                    isExpanded ? 'bg-plum-dark text-white border-plum-dark rotate-180' : 'bg-white text-plum-dark border-white/90'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </button>

              {/* Expanded 3-Card Horizontal Visual Strip */}
              {isExpanded && (
                <div className="p-4 sm:p-6 pt-0 border-t border-rose-100/60 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {cat.cards.map((card) => (
                      <div
                        key={card.id}
                        className="rounded-2xl glass-nuve overflow-hidden border border-white/90 shadow-sm flex flex-col justify-between group hover:shadow-md hover:border-rosegold/50 transition-all duration-300"
                      >
                        <div>
                          {/* 4K Visual Frame */}
                          <div className="relative aspect-[16/10] overflow-hidden bg-plum-deep">
                            <img
                              src={card.image}
                              alt={card.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-plum/60 via-transparent to-transparent" />
                            
                            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-white/85 text-plum-dark text-[9px] font-bold uppercase tracking-wider font-mono backdrop-blur-md">
                              {card.tag}
                            </div>

                            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 text-[9px] font-semibold font-mono backdrop-blur-md border border-emerald-500/30">
                              MDA Approved
                            </div>
                          </div>

                          {/* Body Content */}
                          <div className="p-4">
                            <h4 className="font-serif text-lg font-medium text-plum-dark group-hover:text-rosegold-dark transition-colors leading-snug">
                              {language === 'EN' ? card.name : card.nameBM}
                            </h4>

                            <p className="text-[11px] text-plum-muted mt-1 leading-relaxed line-clamp-2">
                              {language === 'EN' ? card.description : card.descriptionBM}
                            </p>

                            {/* Duration & Downtime Pills */}
                            <div className="flex flex-wrap gap-2 mt-3 text-[10px] text-plum-dark/70 font-mono">
                              <span className="flex items-center gap-1 bg-white/70 px-2 py-0.5 rounded border border-white/80">
                                <Clock className="w-3 h-3 text-rosegold" />
                                <span>{card.duration}</span>
                              </span>
                              <span className="bg-white/70 px-2 py-0.5 rounded border border-white/80">
                                {language === 'EN' ? card.downtime : card.downtimeBM}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Card Footer with Black Friday Promo Price & Add Button */}
                        <div className="p-4 pt-0">
                          <div className="p-3 rounded-xl bg-blush-light/80 border border-blush/60 flex items-center justify-between">
                            <div>
                              <div className="flex items-baseline gap-1.5">
                                <span className="font-serif text-lg font-bold text-plum-dark">
                                  {formatCurrency(card.price)}
                                </span>
                                <span className="text-[10px] line-through text-plum-muted/60 font-mono">
                                  {formatCurrency(card.originalPrice)}
                                </span>
                              </div>
                              <span className="text-[9px] text-plum-muted block">
                                Black Friday Rate
                              </span>
                            </div>

                            <button
                              onClick={() => handleAddToQuote(card.id, card.name)}
                              className="btn-gold-sheen px-3 py-1.5 rounded-full bg-plum-dark hover:bg-plum text-white text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              <span>{language === 'EN' ? '+ Add' : '+ Tambah'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
