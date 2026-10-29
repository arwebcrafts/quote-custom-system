import React, { useState, useEffect } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { HelpMeChooseQuiz } from './HelpMeChooseQuiz';
import { DirectMenuBuilder } from './DirectMenuBuilder';
import { BookingSlotAndPayment } from './BookingSlotAndPayment';
import { ProtocolPackage, Treatment } from '../../types';
import { Sparkles, Zap, ShieldCheck } from 'lucide-react';

export const QuotationEngine: React.FC = () => {
  const { t, language, preselectedTreatmentId } = useClinic();

  const [activeTab, setActiveTab] = useState<'quiz' | 'direct'>('quiz');
  const [inBookingMode, setInBookingMode] = useState<boolean>(false);

  // Switch to Direct Menu if a specific treatment was clicked from the Treatments grid
  useEffect(() => {
    if (preselectedTreatmentId) {
      setActiveTab('direct');
      setInBookingMode(false);
    }
  }, [preselectedTreatmentId]);

  // Quote state to forward into Booking
  const [quoteSummary, setQuoteSummary] = useState<{
    title: string;
    items: string[];
    pricingOption: 'full_package' | 'single_trial' | 'consultation_only' | 'custom_bundle';
    quotedTotal: number;
    flowType: 'quiz_recommended' | 'custom_builder' | 'direct_consultation';
  }>({
    title: 'Aurelia Luminescence™ Melasma & Pigment Protocol',
    items: ['3x Fotona StarWalker® Pico Laser', '2x Rejuran® Polynucleotide Infusions'],
    pricingOption: 'full_package',
    quotedTotal: 2188,
    flowType: 'quiz_recommended',
  });

  const handleQuizComplete = (
    pkg: ProtocolPackage, 
    pricingChoice: 'full_package' | 'single_trial' | 'consultation_only', 
    price: number
  ) => {
    setQuoteSummary({
      title: language === 'EN' ? pkg.title : pkg.titleBM,
      items: language === 'EN' ? pkg.treatmentsIncluded : pkg.treatmentsIncludedBM,
      pricingOption: pricingChoice,
      quotedTotal: price,
      flowType: 'quiz_recommended',
    });
    setInBookingMode(true);
  };

  const handleDirectComplete = (
    treatments: Treatment[], 
    subtotal: number, 
    discount: number, 
    finalTotal: number
  ) => {
    setQuoteSummary({
      title: treatments.length > 1 ? 'Aurelia Bespoke VIP Multi-Treatment Protocol' : treatments[0].name,
      items: treatments.map((tr) => (language === 'EN' ? tr.name : tr.nameBM)),
      pricingOption: 'custom_bundle',
      quotedTotal: finalTotal,
      flowType: 'custom_builder',
    });
    setInBookingMode(true);
  };

  return (
    <section id="quotation-engine" className="py-16 px-4 sm:px-6 lg:px-8 relative scroll-mt-24">
      {/* Background Lighting Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48rem] h-[32rem] bg-gold/10 rounded-full filter blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold-deep text-xs font-bold uppercase tracking-widest mb-3 font-sans">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>{t.engineEyebrow}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-obsidian tracking-[-0.02em] leading-tight">
            {t.engineTitle}
          </h2>
          <p className="font-sans text-xs sm:text-base text-obsidian/75 mt-3 leading-relaxed">
            {t.engineSub}
          </p>
        </div>

        {/* Master Pearl & Glass Container with Mobile-App Feel */}
        <div className="glass-pearl-strong rounded-3xl p-5 sm:p-8 border border-white/95 shadow-pearl-glass backdrop-blur-2xl transition-all">
          {/* Top Engine Tabs (Only visible when not yet in Step 4 booking) */}
          {!inBookingMode && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-1.5 bg-pearl-100/80 rounded-2xl border border-pearl-200/80 mb-8 font-sans">
              <button
                type="button"
                onClick={() => setActiveTab('quiz')}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'quiz'
                    ? 'bg-obsidian text-white shadow-md'
                    : 'text-obsidian/70 hover:text-obsidian hover:bg-white/50'
                }`}
              >
                <Sparkles className={`w-4 h-4 ${activeTab === 'quiz' ? 'text-gold' : 'text-obsidian/50'}`} />
                <span>{t.tabA}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('direct')}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'direct'
                    ? 'bg-obsidian text-white shadow-md'
                    : 'text-obsidian/70 hover:text-obsidian hover:bg-white/50'
                }`}
              >
                <Zap className={`w-4 h-4 ${activeTab === 'direct' ? 'text-gold' : 'text-obsidian/50'}`} />
                <span>{t.tabB}</span>
              </button>
            </div>
          )}

          {/* Active View Switching */}
          {inBookingMode ? (
            <BookingSlotAndPayment
              quoteSummary={quoteSummary}
              onBack={() => setInBookingMode(false)}
            />
          ) : activeTab === 'quiz' ? (
            <HelpMeChooseQuiz onCompleteQuiz={handleQuizComplete} />
          ) : (
            <DirectMenuBuilder onProceedToBooking={handleDirectComplete} />
          )}
        </div>
      </div>
    </section>
  );
};
