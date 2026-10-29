import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { SKIN_CONCERNS, TIMELINE_OPTIONS, PROTOCOL_PACKAGES } from '../../data/treatments';
import { ProtocolPackage } from '../../types';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Percent, 
  ShieldCheck, 
  Zap,
  Info,
  ChevronLeft
} from 'lucide-react';

interface HelpMeChooseQuizProps {
  onCompleteQuiz: (selectedPackage: ProtocolPackage, pricingOption: 'full_package' | 'single_trial' | 'consultation_only', calculatedPrice: number) => void;
}

export const HelpMeChooseQuiz: React.FC<HelpMeChooseQuizProps> = ({ onCompleteQuiz }) => {
  const { t, language, formatCurrency } = useClinic();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedConcernId, setSelectedConcernId] = useState<string>('pigmentation');
  const [selectedTimelineId, setSelectedTimelineId] = useState<string>('event_glow');
  const [pricingChoice, setPricingChoice] = useState<'full_package' | 'single_trial' | 'consultation_only'>('full_package');

  const selectedConcern = SKIN_CONCERNS.find((c) => c.id === selectedConcernId) || SKIN_CONCERNS[0];
  const activePackage = PROTOCOL_PACKAGES[selectedConcern.recommendedPackageId] || PROTOCOL_PACKAGES['pkg-pigmentation-clarity'];

  // Handle price calculation based on pricingChoice
  const getSelectedPrice = () => {
    switch (pricingChoice) {
      case 'full_package':
        return activePackage.promoPrice;
      case 'single_trial':
        return activePackage.singleTrialPrice;
      case 'consultation_only':
        return activePackage.consultationFee;
    }
  };

  return (
    <div className="w-full">
      {/* Quiz Step Progress Tracker */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-pearl-200/60">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gold text-obsidian text-xs font-bold font-sans">
            {currentStep}
          </span>
          <span className="text-xs uppercase tracking-widest font-semibold text-obsidian font-sans">
            {currentStep === 1 && (language === 'EN' ? 'Step 1: Primary Objective' : 'Langkah 1: Matlamat Utama')}
            {currentStep === 2 && (language === 'EN' ? 'Step 2: Timeline Horizon' : 'Langkah 2: Jangka Masa')}
            {currentStep === 3 && (language === 'EN' ? 'Step 3: Recommended Protocol' : 'Langkah 3: Protokol Disyorkan')}
          </span>
        </div>

        {/* Step dots */}
        <div className="flex items-center gap-1.5">
          <div className={`h-2 rounded-full transition-all duration-300 ${currentStep >= 1 ? 'w-6 bg-gold' : 'w-2 bg-pearl-200'}`} />
          <div className={`h-2 rounded-full transition-all duration-300 ${currentStep >= 2 ? 'w-6 bg-gold' : 'w-2 bg-pearl-200'}`} />
          <div className={`h-2 rounded-full transition-all duration-300 ${currentStep >= 3 ? 'w-6 bg-gold' : 'w-2 bg-pearl-200'}`} />
        </div>
      </div>

      {/* STEP 1: PRIMARY SKIN CONCERN */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-obsidian">
              {t.quizStep1Title}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-obsidian/70 mt-1">
              {t.quizStep1Sub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SKIN_CONCERNS.map((concern) => {
              const isSelected = selectedConcernId === concern.id;
              return (
                <button
                  key={concern.id}
                  onClick={() => setSelectedConcernId(concern.id)}
                  className={`group relative text-left p-5 rounded-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden border ${
                    isSelected
                      ? 'bg-white shadow-gold-card border-gold ring-2 ring-gold/20'
                      : 'bg-white/60 hover:bg-white border-pearl-200/80 hover:border-gold/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-pearl-200">
                      <img
                        src={concern.image}
                        alt={concern.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      isSelected ? 'bg-gold border-gold text-white' : 'border-pearl-300'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-4 h-4 fill-white text-gold" />}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif text-lg sm:text-xl font-medium text-obsidian group-hover:text-gold transition-colors">
                      {language === 'EN' ? concern.title : concern.titleBM}
                    </h4>
                    <p className="font-sans text-xs text-obsidian/60 mt-1 line-clamp-2 leading-relaxed">
                      {language === 'EN' ? concern.subtitle : concern.subtitleBM}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setCurrentStep(2)}
              className="btn-gold-sheen flex items-center gap-2 px-7 py-3 rounded-full bg-obsidian text-white font-sans text-xs font-semibold uppercase tracking-wider hover:bg-gold transition-all"
            >
              <span>{language === 'EN' ? 'Continue to Timeline' : 'Seterusnya: Jangka Masa'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: TIMELINE & OCCASION */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-obsidian">
              {t.quizStep2Title}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-obsidian/70 mt-1">
              {t.quizStep2Sub}
            </p>
          </div>

          <div className="space-y-3.5">
            {TIMELINE_OPTIONS.map((option) => {
              const isSelected = selectedTimelineId === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedTimelineId(option.id)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 flex items-center justify-between border ${
                    isSelected
                      ? 'bg-white shadow-gold-card border-gold ring-2 ring-gold/20'
                      : 'bg-white/60 hover:bg-white border-pearl-200/80 hover:border-gold/50'
                  }`}
                >
                  <div className="space-y-1 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-lg font-medium text-obsidian">
                        {language === 'EN' ? option.label : option.labelBM}
                      </span>
                      {option.badge && (
                        <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-gold-deep bg-gold/10 px-2 py-0.5 rounded-full">
                          {option.badge}
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-xs text-obsidian/60 leading-relaxed">
                      {language === 'EN' ? option.detail : option.detailBM}
                    </p>
                  </div>

                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${
                    isSelected ? 'bg-gold border-gold text-white' : 'border-pearl-300'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4 fill-white text-gold" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setCurrentStep(1)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-sans font-medium text-obsidian/70 hover:text-obsidian hover:bg-pearl-100 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{language === 'EN' ? 'Back' : 'Kembali'}</span>
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="btn-gold-sheen flex items-center gap-2 px-7 py-3 rounded-full bg-obsidian text-white font-sans text-xs font-semibold uppercase tracking-wider hover:bg-gold transition-all"
            >
              <span>{language === 'EN' ? 'Generate My Protocol Quote' : 'Jana Sebut Harga Protokol'}</span>
              <Sparkles className="w-4 h-4 text-gold" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: INSTANT CUSTOM QUOTATION OUTPUT */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-in zoom-in-95 duration-300">
          {/* Header & Protocol Title */}
          <div className="border-b border-pearl-200/80 pb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold-deep text-xs font-bold uppercase tracking-wider mb-2 font-sans">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Recommended Medical Aesthetics Protocol</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-obsidian leading-snug">
              {language === 'EN' ? activePackage.title : activePackage.titleBM}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-obsidian/70 mt-1">
              {language === 'EN' ? activePackage.tagline : activePackage.taglineBM}
            </p>
          </div>

          {/* Clinical Protocol Breakdown Box */}
          <div className="bg-pearl-100/70 rounded-2xl p-5 border border-pearl-200/90 space-y-4">
            <h4 className="font-sans text-xs uppercase tracking-wider font-bold text-obsidian flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <span>{t.includedTreatments}</span>
            </h4>
            <ul className="space-y-2.5">
              {(language === 'EN' ? activePackage.treatmentsIncluded : activePackage.treatmentsIncludedBM).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-obsidian/85 font-sans">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 text-[11px] font-sans text-obsidian/60 italic flex items-center gap-1.5 border-t border-pearl-200">
              <Info className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>{language === 'EN' ? activePackage.clinicalNote : activePackage.clinicalNoteBM}</span>
            </div>
          </div>

          {/* Pricing Options Selector (Toggle between Full VIP Package, Single Trial, Consultation Only) */}
          <div className="space-y-2.5">
            <label className="block text-xs uppercase tracking-wider font-bold text-obsidian font-sans">
              {language === 'EN' ? 'Select Your Desired Commitment Level:' : 'Pilih Tahap Komitmen Pilihan Anda:'}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Option A: Full VIP Protocol */}
              <button
                type="button"
                onClick={() => setPricingChoice('full_package')}
                className={`p-4 rounded-xl text-left border transition-all relative ${
                  pricingChoice === 'full_package'
                    ? 'bg-obsidian-deep text-white border-gold shadow-gold-card ring-1 ring-gold'
                    : 'bg-white hover:bg-pearl-50 text-obsidian border-pearl-200'
                }`}
              >
                <span className="absolute -top-2.5 right-3 text-[9px] font-bold uppercase tracking-wider bg-gold text-obsidian px-2 py-0.5 rounded-full">
                  Best Value
                </span>
                <div className="text-xs font-bold font-sans">
                  {t.pricingOptionPackage}
                </div>
                <div className="font-serif text-xl font-medium text-gold mt-1">
                  {formatCurrency(activePackage.promoPrice)}
                </div>
                <div className={`text-[10px] line-through mt-0.5 ${pricingChoice === 'full_package' ? 'text-pearl-300' : 'text-obsidian/40'}`}>
                  {formatCurrency(activePackage.originalPrice)}
                </div>
              </button>

              {/* Option B: First-Trial Single Session */}
              <button
                type="button"
                onClick={() => setPricingChoice('single_trial')}
                className={`p-4 rounded-xl text-left border transition-all ${
                  pricingChoice === 'single_trial'
                    ? 'bg-obsidian-deep text-white border-gold shadow-gold-card ring-1 ring-gold'
                    : 'bg-white hover:bg-pearl-50 text-obsidian border-pearl-200'
                }`}
              >
                <div className="text-xs font-bold font-sans">
                  {t.pricingOptionTrial}
                </div>
                <div className="font-serif text-xl font-medium text-gold mt-1">
                  {formatCurrency(activePackage.singleTrialPrice)}
                </div>
                <div className={`text-[10px] mt-0.5 ${pricingChoice === 'single_trial' ? 'text-pearl-200' : 'text-obsidian/60'}`}>
                  {language === 'EN' ? '1x Full Clinical Session' : '1x Sesi Klinikal Lengkap'}
                </div>
              </button>

              {/* Option C: Doctor Consultation Only */}
              <button
                type="button"
                onClick={() => setPricingChoice('consultation_only')}
                className={`p-4 rounded-xl text-left border transition-all ${
                  pricingChoice === 'consultation_only'
                    ? 'bg-obsidian-deep text-white border-gold shadow-gold-card ring-1 ring-gold'
                    : 'bg-white hover:bg-pearl-50 text-obsidian border-pearl-200'
                }`}
              >
                <div className="text-xs font-bold font-sans">
                  {t.pricingOptionConsult}
                </div>
                <div className="font-serif text-xl font-medium text-gold mt-1">
                  {formatCurrency(activePackage.consultationFee)}
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                  {language === 'EN' ? 'Waived Upon Treatment' : 'Diketepikan jika Rawatan'}
                </div>
              </button>
            </div>
          </div>

          {/* Pricing Highlight & Installment Callout Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-obsidian-deep to-obsidian-card text-white border border-gold/30 shadow-onyx-depth flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-pearl-300 font-sans">
                {t.promoPriceLabel}
              </div>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="font-serif text-3xl sm:text-4xl font-light text-gold">
                  {formatCurrency(getSelectedPrice())}
                </span>
                {pricingChoice === 'full_package' && (
                  <span className="text-sm line-through text-pearl-400 font-sans">
                    {formatCurrency(activePackage.originalPrice)}
                  </span>
                )}
              </div>
              {pricingChoice === 'full_package' && (
                <p className="text-[11px] text-pearl-200 font-sans mt-1">
                  {t.orInstallment} <strong className="text-gold font-bold">{formatCurrency(activePackage.monthlyRate)} {t.perMonth}</strong> (Maybank / CIMB / Public Bank)
                </p>
              )}
            </div>

            <button
              onClick={() => onCompleteQuiz(activePackage, pricingChoice, getSelectedPrice())}
              className="btn-gold-sheen w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-gold via-champagne-500 to-gold-deep text-white text-xs font-bold uppercase tracking-widest font-sans shadow-gold-glow flex items-center justify-center gap-2 shrink-0"
            >
              <span>{t.proceedToBooking}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Back button */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs font-sans text-obsidian/60 hover:text-obsidian flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{t.switchConcerns}</span>
            </button>
            <div className="text-[11px] text-obsidian/50 font-sans">
              *All protocols administered 100% by certified LCP physicians.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
