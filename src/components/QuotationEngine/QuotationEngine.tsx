import React, { useState, useEffect } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { HelpMeChooseQuiz } from './HelpMeChooseQuiz';
import { DirectMenuBuilder } from './DirectMenuBuilder';
import { BookingSlotAndPayment } from './BookingSlotAndPayment';
import { LuxuryGiftCardEngine } from './LuxuryGiftCardEngine';
import { ProtocolPackage, Treatment } from '../../types';
import { Sparkles, Zap, Gift, ShieldCheck } from 'lucide-react';

export const QuotationEngine: React.FC = () => {
  const { 
    t, 
    language, 
    preselectedTreatmentId, 
    activeQuotationTab, 
    setActiveQuotationTab,
    openBookingModal 
  } = useClinic();

  const [inBookingMode, setInBookingMode] = useState<boolean>(false);

  // Switch to Direct Menu if a specific treatment was clicked from the Accordion
  useEffect(() => {
    if (preselectedTreatmentId) {
      setActiveQuotationTab('direct');
      setInBookingMode(false);
    }
  }, [preselectedTreatmentId, setActiveQuotationTab]);

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
    const summary = {
      title: language === 'EN' ? pkg.title : pkg.titleBM,
      items: language === 'EN' ? pkg.treatmentsIncluded : pkg.treatmentsIncludedBM,
      pricingOption: pricingChoice,
      quotedTotal: price,
      flowType: 'quiz_recommended' as const,
    };
    setQuoteSummary(summary);
    openBookingModal(summary);
  };

  const handleDirectComplete = (
    treatments: Treatment[], 
    subtotal: number, 
    discount: number, 
    finalTotal: number
  ) => {
    const summary = {
      title: treatments.length > 1 ? 'Aurelia Bespoke VIP Multi-Treatment Protocol' : treatments[0].name,
      items: treatments.map((tr) => (language === 'EN' ? tr.name : tr.nameBM)),
      pricingOption: 'custom_bundle' as const,
      quotedTotal: finalTotal,
      flowType: 'custom_builder' as const,
    };
    setQuoteSummary(summary);
    openBookingModal(summary);
  };

  return (
    <section id="quotation-engine" className="py-20 px-4 sm:px-6 lg:px-8 relative scroll-mt-24 font-sans">
      {/* Background Lighting Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48rem] h-[32rem] bg-mauve/15 rounded-full filter blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-mauve/20 border border-mauve/30 text-plum-muted text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-rosegold-dark" />
            <span>{language === 'EN' ? 'Interactive Treatment & Gifting Concierge' : 'Konsierj Rawatan & Hadiah Interaktif'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-plum-dark tracking-[-0.02em] leading-tight">
            {language === 'EN' ? 'Quotation, Booking & Gift Card Engine' : 'Enjin Sebut Harga, Tempahan & Kad Hadiah'}
          </h2>
          <p className="text-xs sm:text-base text-plum-muted mt-3 leading-relaxed">
            {language === 'EN'
              ? 'Calculate transparent package pricing, reserve a doctor suite with flexible payments, or send a luxury digital gift card.'
              : 'Kira sebut harga pakej telus, tempah bilik konsultasi doktor, atau hadiahkan kad digital eksklusif.'}
          </p>
        </div>

        {/* Master Glassmorphic Pearl & Plum Container */}
        <div className="glass-nuve-strong rounded-[32px] sm:rounded-[40px] p-5 sm:p-9 border border-white/95 shadow-pearl-glass backdrop-blur-2xl transition-all">
          
          {/* Top 3 Mode Tabs (Only visible when not yet in Step 4 booking) */}
          {!inBookingMode && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-[#F2ECE7] rounded-2xl border border-black/5 mb-8 font-sans">
              
              {/* Tab 1: Guided Skin Assessment */}
              <button
                type="button"
                onClick={() => setActiveQuotationTab('quiz')}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all text-center ${
                  activeQuotationTab === 'quiz'
                    ? 'bg-obsidian text-white shadow-sm'
                    : 'text-obsidian/70 hover:text-obsidian hover:bg-white/60'
                }`}
              >
                <span>{language === 'EN' ? 'Skin Assessment (60s)' : 'Penilaian Kulit (60s)'}</span>
              </button>

              {/* Tab 2: Direct Procedure Calculator */}
              <button
                type="button"
                onClick={() => setActiveQuotationTab('direct')}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all text-center ${
                  activeQuotationTab === 'direct'
                    ? 'bg-obsidian text-white shadow-sm'
                    : 'text-obsidian/70 hover:text-obsidian hover:bg-white/60'
                }`}
              >
                <span>{language === 'EN' ? 'Treatment Menu' : 'Katalog Rawatan'}</span>
              </button>

              {/* Tab 3: Buy & Send Luxury Gift Card */}
              <button
                type="button"
                onClick={() => setActiveQuotationTab('giftcard')}
                className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all text-center ${
                  activeQuotationTab === 'giftcard'
                    ? 'bg-obsidian text-white shadow-sm'
                    : 'text-obsidian/70 hover:text-obsidian hover:bg-white/60'
                }`}
              >
                <span>{language === 'EN' ? 'Luxury Gift Card' : 'Kad Hadiah'}</span>
              </button>
            </div>
          )}

          {/* Active View Switching */}
          {inBookingMode ? (
            <BookingSlotAndPayment
              quoteSummary={quoteSummary}
              onBack={() => setInBookingMode(false)}
            />
          ) : activeQuotationTab === 'quiz' ? (
            <HelpMeChooseQuiz onCompleteQuiz={handleQuizComplete} />
          ) : activeQuotationTab === 'direct' ? (
            <DirectMenuBuilder onProceedToBooking={handleDirectComplete} />
          ) : (
            <LuxuryGiftCardEngine />
          )}
        </div>
      </div>
    </section>
  );
};
