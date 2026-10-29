import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { 
  Branch, 
  PaymentMethod, 
  PaymentProvider, 
  BookingLead 
} from '../../types';
import { DuitNowModal } from './DuitNowModal';
import confetti from 'canvas-confetti';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  QrCode, 
  Sparkles, 
  ArrowRight, 
  LayoutDashboard,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';

interface BookingSlotAndPaymentProps {
  quoteSummary: {
    title: string;
    items: string[];
    pricingOption: 'full_package' | 'single_trial' | 'consultation_only' | 'custom_bundle';
    quotedTotal: number;
    flowType: 'quiz_recommended' | 'custom_builder' | 'direct_consultation';
  };
  onBack: () => void;
}

export const BookingSlotAndPayment: React.FC<BookingSlotAndPaymentProps> = ({
  quoteSummary,
  onBack,
}) => {
  const { 
    t, 
    language, 
    formatCurrency, 
    addNewLead, 
    addToast, 
    setViewMode 
  } = useClinic();

  // Branch Selection
  const [selectedBranch, setSelectedBranch] = useState<Branch>('Bangsar Flagship');

  // Dates: Generate next 10 days starting tomorrow
  const dates = Array.from({ length: 10 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      iso: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString(language === 'EN' ? 'en-US' : 'ms-MY', { weekday: 'short' }),
      dayNum: d.getDate(),
      month: d.toLocaleDateString(language === 'EN' ? 'en-US' : 'ms-MY', { month: 'short' }),
      isWeekend: d.getDay() === 0 || d.getDay() === 6,
    };
  });

  const [selectedDate, setSelectedDate] = useState<string>(dates[0].iso);

  // Time Slots
  const morningSlots = ['10:30 AM', '11:15 AM', '11:45 AM'];
  const afternoonSlots = ['02:00 PM', '02:45 PM', '03:30 PM', '04:15 PM'];
  const eveningSlots = ['05:00 PM', '05:45 PM', '06:30 PM'];
  const [selectedTime, setSelectedTime] = useState<string>('11:15 AM');

  // Patient Form Fields
  const [patientName, setPatientName] = useState<string>('');
  const [phone, setPhone] = useState<string>('+60 ');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Payment Options & Flexible Choice (Deposit vs Full Upfront 5% Off)
  const [paymentCommitment, setPaymentCommitment] = useState<'deposit_50' | 'full_upfront_5pct'>('deposit_50');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('deposit_online');
  const [onlineProvider, setOnlineProvider] = useState<PaymentProvider>('Google Pay');
  const [duitNowOpen, setDuitNowOpen] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingLead | null>(null);

  // Card Payment (Stripe / Wise / MasterCard / Visa) States
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvc, setCardCvc] = useState<string>('');
  const [cardHolder, setCardHolder] = useState<string>('');
  const [cardPostal, setCardPostal] = useState<string>('');

  // GPay States
  const [gpayAuthorized, setGpayAuthorized] = useState<boolean>(true);

  // FPX Bank State
  const [selectedBank, setSelectedBank] = useState<string>('Maybank2u');

  const upfrontDiscount = Math.round(quoteSummary.quotedTotal * 0.05);
  const fullUpfrontAmount = quoteSummary.quotedTotal - upfrontDiscount;
  const amountDueNow = paymentCommitment === 'deposit_50'
    ? (paymentMethod === 'pay_at_clinic' ? 0 : 50)
    : fullUpfrontAmount;

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!patientName.trim()) {
      errors.name = language === 'EN' ? 'Full name is required' : 'Nama penuh diperlukan';
    }
    if (!phone || phone.trim() === '+60' || phone.length < 8) {
      errors.phone = language === 'EN' ? 'Valid WhatsApp number is required' : 'Nombor WhatsApp sah diperlukan';
    }

    // Card Details Validation if Card is selected
    if (paymentMethod === 'deposit_online' && (onlineProvider === 'Visa/Mastercard (Stripe)' || onlineProvider === 'Stripe (Visa/Mastercard/Wise)')) {
      const cleanCard = cardNumber.replace(/\s/g, '');
      if (cleanCard.length < 15) {
        errors.card = language === 'EN' ? 'Valid 16-digit card number is required' : 'Nombor kad 16-digit diperlukan';
      }
      if (!cardExpiry || cardExpiry.length < 4) {
        errors.expiry = language === 'EN' ? 'Expiry MM/YY required' : 'Tarikh luput diperlukan';
      }
      if (!cardCvc || cardCvc.length < 3) {
        errors.cvc = language === 'EN' ? 'CVC code required' : 'Kod CVC diperlukan';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBookNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (paymentMethod === 'duitnow_qr') {
      setDuitNowOpen(true);
      return;
    }

    finalizeBooking(
      paymentMethod === 'deposit_online' ? 'Paid' : 'Pay at Counter',
      paymentMethod === 'deposit_online' ? onlineProvider : 'Pay at Clinic Counter'
    );
  };

  const finalizeBooking = (paymentStatus: 'Paid' | 'Pending Verification' | 'Pay at Counter', provider: PaymentProvider) => {
    const newLead = addNewLead({
      patientName: patientName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      preferredBranch: selectedBranch,
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
      flowType: quoteSummary.flowType,
      selectedTreatments: quoteSummary.items,
      packageTitle: quoteSummary.title,
      pricingOption: quoteSummary.pricingOption,
      paymentCommitment,
      quotedTotal: paymentCommitment === 'full_upfront_5pct' ? fullUpfrontAmount : quoteSummary.quotedTotal,
      depositAmount: amountDueNow,
      paymentMethod,
      paymentProvider: provider,
      paymentStatus,
      status: paymentMethod === 'deposit_online' ? 'Deposit Paid' : 'New Quote',
      notes: notes.trim() || undefined,
    });

    setConfirmedBooking(newLead);

    // Launch celebratory luxury confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C8A27E', '#FAF7F2', '#EAD5C3', '#1A1615'],
      });
    } catch {
      // Fallback safe
    }

    addToast(
      language === 'EN' ? 'Consultation Confirmed!' : 'Temujanji Disahkan!',
      language === 'EN' 
        ? `Appointment booked for ${selectedDate} at ${selectedTime}. Logged in Live Clinic Admin.` 
        : `Temujanji direkodkan untuk ${selectedDate} pada ${selectedTime}.`,
      'gold'
    );
  };

  // SUCCESS CONFIRMATION SCREEN
  if (confirmedBooking) {
    const formattedDate = new Date(confirmedBooking.appointmentDate).toLocaleDateString(
      language === 'EN' ? 'en-US' : 'ms-MY',
      { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    );

    const waText = encodeURIComponent(
      `Hello Aurelia Clinic Concierge. I have confirmed my appointment booking:\n\n` +
      `• Patient: ${confirmedBooking.patientName}\n` +
      `• Mobile: ${confirmedBooking.phone}\n` +
      `• Branch: ${confirmedBooking.preferredBranch}\n` +
      `• Date & Slot: ${formattedDate} (${confirmedBooking.appointmentTime})\n` +
      `• Protocol: ${confirmedBooking.packageTitle || confirmedBooking.selectedTreatments.join(', ')}\n` +
      `• Quoted Rate: RM ${confirmedBooking.quotedTotal.toLocaleString()}\n` +
      `• Deposit: RM ${confirmedBooking.depositAmount} (${confirmedBooking.paymentProvider || confirmedBooking.paymentMethod})\n\n` +
      `Looking forward to my consultation!`
    );

    return (
      <div className="w-full max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl glass-onyx text-white border border-gold/40 shadow-onyx-depth animate-in zoom-in-95 duration-400">
        <div className="text-center space-y-3 pb-6 border-b border-gold/25">
          <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center mx-auto text-gold animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs uppercase font-bold tracking-widest text-gold font-sans">
            Priority VIP Reservation Confirmed
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-light text-pearl-100">
            {language === 'EN' ? 'Welcome to Aurelia Clinic KL' : 'Selamat Datang ke Aurelia Clinic KL'}
          </h3>
          <p className="font-sans text-xs sm:text-sm text-pearl-300 max-w-md mx-auto">
            {language === 'EN'
              ? `Thank you, ${confirmedBooking.patientName}. Your private consultation slot has been reserved.`
              : `Terima kasih, ${confirmedBooking.patientName}. Slot konsultasi peribadi anda telah berjaya ditempah.`}
          </p>
        </div>

        {/* Appointment Card */}
        <div className="my-6 bg-white/5 rounded-2xl p-5 border border-white/10 space-y-3 font-sans text-xs">
          <div className="flex justify-between items-center py-1 border-b border-white/10">
            <span className="text-pearl-300 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gold" /> Branch:
            </span>
            <strong className="text-pearl-100 font-semibold">{confirmedBooking.preferredBranch}</strong>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-white/10">
            <span className="text-pearl-300 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gold" /> Date & Time:
            </span>
            <strong className="text-pearl-100 font-semibold">
              {formattedDate} @ {confirmedBooking.appointmentTime}
            </strong>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-white/10">
            <span className="text-pearl-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-gold" /> Protocol:
            </span>
            <strong className="text-gold font-medium text-right max-w-[60%]">
              {confirmedBooking.packageTitle || confirmedBooking.selectedTreatments.join(' + ')}
            </strong>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-white/10">
            <span className="text-pearl-300">Quoted Total:</span>
            <span className="font-serif text-lg text-pearl-100 font-bold">
              {formatCurrency(confirmedBooking.quotedTotal)}
            </span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-pearl-300">Deposit Status:</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {confirmedBooking.depositAmount > 0 
                ? `RM ${confirmedBooking.depositAmount} ${confirmedBooking.paymentStatus}` 
                : 'Pay at Counter'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 font-sans">
          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/60123456789?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <span>{language === 'EN' ? 'Open WhatsApp Concierge Confirmation' : 'Buka Pengesahan WhatsApp'}</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* DEMO HIGHLIGHT: Switch to Admin Portal Button */}
          <button
            onClick={() => {
              setViewMode('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full py-3.5 rounded-full bg-gold hover:bg-gold-light text-obsidian-deep text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow transition-all"
          >
            <LayoutDashboard className="w-4 h-4 text-obsidian-deep" />
            <span>
              {language === 'EN' 
                ? '✨ Inspect This Booking in Live Clinic Admin Panel →' 
                : '✨ Lihat Tempahan Ini dalam Portal Admin Klinik →'}
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleBookNow} className="w-full space-y-8 animate-in fade-in duration-300">
      {/* Top Protocol Header & Back Link */}
      <div className="flex items-center justify-between pb-4 border-b border-pearl-200/80">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-gold-deep font-sans">
            Step 4: Priority Scheduling
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-obsidian mt-0.5">
            {t.bookingTitle}
          </h3>
          <p className="font-sans text-xs text-obsidian/60 mt-0.5">
            {quoteSummary.title} &bull; <strong className="text-gold font-bold">{formatCurrency(quoteSummary.quotedTotal)}</strong>
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-sans text-obsidian/60 hover:text-obsidian flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-pearl-100 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{language === 'EN' ? 'Change Selection' : 'Tukar Pilihan'}</span>
        </button>
      </div>

      {/* 1. Branch Selector */}
      <div className="space-y-3">
        <label className="block text-xs uppercase tracking-wider font-bold text-obsidian font-sans">
          {t.selectBranch}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setSelectedBranch('Bangsar Flagship')}
            className={`p-4 rounded-2xl text-left border transition-all flex items-start gap-3 ${
              selectedBranch === 'Bangsar Flagship'
                ? 'bg-white shadow-gold-card border-gold ring-2 ring-gold/20'
                : 'bg-white/60 hover:bg-white border-pearl-200'
            }`}
          >
            <MapPin className={`w-5 h-5 shrink-0 mt-0.5 ${selectedBranch === 'Bangsar Flagship' ? 'text-gold' : 'text-obsidian/40'}`} />
            <div>
              <div className="text-xs font-bold text-obsidian font-sans">{t.branchBangsar}</div>
              <div className="text-[11px] text-obsidian/60 font-sans mt-0.5">
                Valet Parking &bull; Private VIP Entrance &bull; 6 Clinical Suites
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedBranch('Damansara Heights')}
            className={`p-4 rounded-2xl text-left border transition-all flex items-start gap-3 ${
              selectedBranch === 'Damansara Heights'
                ? 'bg-white shadow-gold-card border-gold ring-2 ring-gold/20'
                : 'bg-white/60 hover:bg-white border-pearl-200'
            }`}
          >
            <MapPin className={`w-5 h-5 shrink-0 mt-0.5 ${selectedBranch === 'Damansara Heights' ? 'text-gold' : 'text-obsidian/40'}`} />
            <div>
              <div className="text-xs font-bold text-obsidian font-sans">{t.branchDamansara}</div>
              <div className="text-[11px] text-obsidian/60 font-sans mt-0.5">
                Plaza Batai Sanctuary &bull; Cellular Longevity Pods &bull; Private Suites
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* 2. Interactive Horizontal Date Scroller */}
      <div className="space-y-3">
        <label className="block text-xs uppercase tracking-wider font-bold text-obsidian font-sans">
          {t.selectDate}
        </label>
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-2">
          {dates.map((d) => {
            const isSelected = selectedDate === d.iso;
            return (
              <button
                type="button"
                key={d.iso}
                onClick={() => setSelectedDate(d.iso)}
                className={`flex-shrink-0 w-20 py-3 px-2 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? 'bg-obsidian-deep text-white border-gold shadow-gold-card ring-1 ring-gold'
                    : 'bg-white/80 hover:bg-white text-obsidian border-pearl-200'
                }`}
              >
                <div className={`text-[10px] font-sans font-semibold uppercase ${isSelected ? 'text-gold' : 'text-obsidian/60'}`}>
                  {d.dayName}
                </div>
                <div className="font-serif text-2xl font-semibold my-0.5">
                  {d.dayNum}
                </div>
                <div className={`text-[10px] font-sans ${isSelected ? 'text-pearl-200' : 'text-obsidian/50'}`}>
                  {d.month}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Time Slots (Morning / Afternoon / Evening) */}
      <div className="space-y-3">
        <label className="block text-xs uppercase tracking-wider font-bold text-obsidian font-sans">
          {t.selectTime}
        </label>

        <div className="space-y-3">
          {/* Morning */}
          <div>
            <span className="text-[10px] uppercase font-bold text-obsidian/50 font-sans block mb-1.5">
              {t.morning}
            </span>
            <div className="flex flex-wrap gap-2">
              {morningSlots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all ${
                    selectedTime === slot
                      ? 'bg-gold text-obsidian-deep font-bold shadow-sm'
                      : 'bg-white hover:bg-pearl-100 text-obsidian border border-pearl-200'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Afternoon */}
          <div>
            <span className="text-[10px] uppercase font-bold text-obsidian/50 font-sans block mb-1.5">
              {t.afternoon}
            </span>
            <div className="flex flex-wrap gap-2">
              {afternoonSlots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all ${
                    selectedTime === slot
                      ? 'bg-gold text-obsidian-deep font-bold shadow-sm'
                      : 'bg-white hover:bg-pearl-100 text-obsidian border border-pearl-200'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Evening */}
          <div>
            <span className="text-[10px] uppercase font-bold text-obsidian/50 font-sans block mb-1.5">
              {t.evening}
            </span>
            <div className="flex flex-wrap gap-2">
              {eveningSlots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all ${
                    selectedTime === slot
                      ? 'bg-gold text-obsidian-deep font-bold shadow-sm'
                      : 'bg-white hover:bg-pearl-100 text-obsidian border border-pearl-200'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Patient Information Form */}
      <div className="space-y-4 pt-4 border-t border-pearl-200/80">
        <label className="block text-xs uppercase tracking-wider font-bold text-obsidian font-sans">
          {t.patientDetails}
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-medium text-obsidian/70 mb-1 font-sans">
              {t.fullName} *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-obsidian/40 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder={t.fullNamePlaceholder}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-sans bg-white focus:outline-none focus:ring-2 ${
                  formErrors.name ? 'border-rose-400 focus:ring-rose-200' : 'border-pearl-200 focus:ring-gold/30 focus:border-gold'
                }`}
              />
            </div>
            {formErrors.name && (
              <span className="text-[10px] text-rose-500 font-sans mt-0.5 block">{formErrors.name}</span>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-medium text-obsidian/70 mb-1 font-sans">
              {t.whatsapp} *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-obsidian/40 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.whatsappPlaceholder}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-sans bg-white focus:outline-none focus:ring-2 ${
                  formErrors.phone ? 'border-rose-400 focus:ring-rose-200' : 'border-pearl-200 focus:ring-gold/30 focus:border-gold'
                }`}
              />
            </div>
            {formErrors.phone && (
              <span className="text-[10px] text-rose-500 font-sans mt-0.5 block">{formErrors.phone}</span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-obsidian/70 mb-1 font-sans">
            {t.email}
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-obsidian/40 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-pearl-200 text-xs font-sans bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-obsidian/70 mb-1 font-sans">
            {t.specialNotes}
          </label>
          <div className="relative">
            <FileText className="w-4 h-4 text-obsidian/40 absolute left-3.5 top-3.5 pointer-events-none" />
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.specialNotesPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-pearl-200 text-xs font-sans bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
            />
          </div>
        </div>
      </div>

      {/* 5. Payment Options & Flexible Choice (2-Card Choice) */}
      <div className="space-y-4 pt-4 border-t border-pearl-200/80">
        <div>
          <h4 className="font-sans text-xs uppercase tracking-wider font-bold text-obsidian">
            {language === 'EN' ? 'Payment Commitment & Promotional Guarantee' : 'Komitmen Pembayaran & Jaminan Promosi'}
          </h4>
          <p className="font-sans text-xs text-obsidian/60 mt-0.5">
            {language === 'EN' 
              ? 'Choose how you would like to secure your consultation slot today.' 
              : 'Pilih kaedah pilihan anda untuk mengunci slot temujanji hari ini.'}
          </p>
        </div>

        {/* 2-CARD PAYMENT CHOICE (CRITICAL SPECIFICATION) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Choice A: Pay RM 50 Deposit Only */}
          <button
            type="button"
            onClick={() => setPaymentCommitment('deposit_50')}
            className={`p-4 rounded-2xl text-left border transition-all relative ${
              paymentCommitment === 'deposit_50'
                ? 'bg-plum-dark text-white border-rosegold shadow-md ring-2 ring-rosegold/30'
                : 'bg-white/80 hover:bg-white border-pearl-200 text-obsidian'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className={`text-[10px] font-mono uppercase font-bold tracking-wider ${
                paymentCommitment === 'deposit_50' ? 'text-rosegold-light' : 'text-plum-muted'
              }`}>
                {language === 'EN' ? 'Choice A: Deposit Only' : 'Pilihan A: Deposit Sahaja'}
              </span>
              <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                paymentCommitment === 'deposit_50' ? 'bg-rosegold border-rosegold text-plum-dark' : 'border-pearl-300'
              }`}>
                {paymentCommitment === 'deposit_50' && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>
            </div>

            <div className="font-serif text-2xl font-bold my-1">
              RM 50
            </div>

            <p className={`text-xs leading-relaxed ${
              paymentCommitment === 'deposit_50' ? 'text-rose-100/90' : 'text-obsidian/70'
            }`}>
              {language === 'EN'
                ? 'Locks in Black Friday Promo Rate today; pay remaining balance at clinic after doctor consultation.'
                : 'Kunci kadar promosi Black Friday hari ini; bayar baki di klinik selepas konsultasi doktor.'}
            </p>
          </button>

          {/* Choice B: Pay Full Package Amount Upfront (Save Extra 5%) */}
          <button
            type="button"
            onClick={() => setPaymentCommitment('full_upfront_5pct')}
            className={`p-4 rounded-2xl text-left border transition-all relative ${
              paymentCommitment === 'full_upfront_5pct'
                ? 'bg-plum-dark text-white border-rosegold shadow-md ring-2 ring-rosegold/30'
                : 'bg-white/80 hover:bg-white border-pearl-200 text-obsidian'
            }`}
          >
            <span className="absolute -top-2.5 right-3 text-[9px] font-bold uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded-full shadow-sm">
              Save Extra 5% VIP
            </span>

            <div className="flex items-center justify-between mb-1">
              <span className={`text-[10px] font-mono uppercase font-bold tracking-wider ${
                paymentCommitment === 'full_upfront_5pct' ? 'text-rosegold-light' : 'text-plum-muted'
              }`}>
                {language === 'EN' ? 'Choice B: Full Upfront' : 'Pilihan B: Bayaran Penuh'}
              </span>
              <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                paymentCommitment === 'full_upfront_5pct' ? 'bg-rosegold border-rosegold text-plum-dark' : 'border-pearl-300'
              }`}>
                {paymentCommitment === 'full_upfront_5pct' && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>
            </div>

            <div className="flex items-baseline gap-2 my-1">
              <span className="font-serif text-2xl font-bold">
                {formatCurrency(fullUpfrontAmount)}
              </span>
              <span className={`text-xs line-through ${
                paymentCommitment === 'full_upfront_5pct' ? 'text-rose-200/60' : 'text-obsidian/40'
              }`}>
                {formatCurrency(quoteSummary.quotedTotal)}
              </span>
            </div>

            <p className={`text-xs leading-relaxed ${
              paymentCommitment === 'full_upfront_5pct' ? 'text-emerald-300' : 'text-emerald-700 font-medium'
            }`}>
              {language === 'EN'
                ? `Immediate checkout. Extra 5% VIP discount applied (Save ${formatCurrency(upfrontDiscount)}).`
                : `Bayar penuh sekarang. Diskaun VIP tambahan 5% (Jimat ${formatCurrency(upfrontDiscount)}).`}
            </p>
          </button>
        </div>

        {/* Payment Channels Selector */}
        <div className="space-y-3 pt-2">
          {/* Option 1: Online Banking & Cards */}
          <div
            onClick={() => setPaymentMethod('deposit_online')}
            className={`cursor-pointer p-4 rounded-2xl border transition-all ${
              paymentMethod === 'deposit_online'
                ? 'bg-white shadow-gold-card border-gold ring-2 ring-gold/20'
                : 'bg-white/60 hover:bg-white border-pearl-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-obsidian font-sans">
                    {paymentCommitment === 'deposit_50' ? t.payDepositOnline : 'Pay Full Package Online (Stripe / FPX / eWallet)'}
                  </div>
                  <div className="text-[11px] text-obsidian/65 font-sans mt-0.5">
                    {paymentCommitment === 'deposit_50' ? t.payDepositOnlineDesc : 'Instant transaction receipt issued with slot guarantee.'}
                  </div>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${
                paymentMethod === 'deposit_online' ? 'bg-gold border-gold text-white' : 'border-pearl-300'
              }`}>
                {paymentMethod === 'deposit_online' && <CheckCircle2 className="w-4 h-4 fill-white text-gold" />}
              </div>
            </div>

            {/* Provider Badges & Interactive Details View */}
            {paymentMethod === 'deposit_online' && (
              <div className="mt-3.5 pt-3 border-t border-pearl-200/70 space-y-4">
                
                {/* Provider Selector Tabs */}
                <div className="flex flex-wrap items-center gap-2">
                  {(['Google Pay', 'Visa/Mastercard (Stripe)', 'Touch \'n Go eWallet', 'GrabPay', 'FPX Online Banking'] as PaymentProvider[]).map((prov) => (
                    <button
                      type="button"
                      key={prov}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOnlineProvider(prov);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-sans font-semibold transition-all border ${
                        onlineProvider === prov
                          ? 'bg-obsidian text-white border-obsidian shadow-sm'
                          : 'bg-pearl-50 text-obsidian/80 border-pearl-200 hover:bg-pearl-100'
                      }`}
                    >
                      {prov}
                    </button>
                  ))}
                </div>

                {/* VIEW 1: GOOGLE PAY (GPAY) DETAILS SHEET */}
                {onlineProvider === 'Google Pay' && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F9FA] border border-black/10 shadow-sm space-y-3 font-sans animate-in fade-in duration-200">
                    <div className="flex items-center justify-between border-b border-black/10 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-sans font-bold text-base tracking-tight text-obsidian flex items-center">
                          <span className="text-blue-500 font-extrabold mr-0.5">G</span>Pay
                        </span>
                        <span className="text-[10px] text-emerald-700 font-bold px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300">
                          Biometrics Ready
                        </span>
                      </div>
                      <span className="text-xs font-bold text-obsidian font-serif">
                        {formatCurrency(amountDueNow)}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-obsidian/80">
                      <div className="flex justify-between items-center py-1">
                        <span className="text-obsidian/60 text-[11px]">Connected Google Account:</span>
                        <strong className="text-obsidian text-[11px] font-mono">{email.trim() || 'alex.lim.kl@gmail.com'}</strong>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-obsidian/60 text-[11px]">Default Payment Card:</span>
                        <span className="text-obsidian text-[11px] font-medium flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded text-[9px] font-bold">VISA</span>
                          •••• 4242 (Maybank Platinum)
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-obsidian/60 text-[11px]">Merchant Destination:</span>
                        <span className="text-obsidian text-[11px] font-medium">Aurelia Clinic KL (Bangsar Suite)</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setGpayAuthorized(true);
                          addToast('Google Pay Verified', 'Biometric Touch ID authentication confirmed.', 'gold');
                        }}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold font-sans flex items-center justify-center gap-2 border transition-all ${
                          gpayAuthorized
                            ? 'bg-obsidian text-white border-obsidian'
                            : 'bg-white text-obsidian border-black/20 hover:bg-black/5'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>{gpayAuthorized ? 'Google Pay Linked & Authenticated ✓' : 'Tap to Authorize with Google Pay'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* VIEW 2: STRIPE / WISE / MASTERCARD / VISA CARD ENTRY FORM */}
                {(onlineProvider === 'Visa/Mastercard (Stripe)' || onlineProvider === 'Stripe (Visa/Mastercard/Wise)') && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-black/10 shadow-sm space-y-3 font-sans animate-in fade-in duration-200">
                    <div className="flex items-center justify-between border-b border-black/10 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-obsidian uppercase tracking-wider">
                          Card Payment Details
                        </span>
                        <span className="text-[10px] text-obsidian/50 font-medium">
                          Stripe & Wise Encrypted
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCardNumber('4242 4242 4242 4242');
                          setCardExpiry('12/28');
                          setCardCvc('888');
                          setCardHolder(patientName || 'Datin Michelle Kwan');
                          setCardPostal('59000');
                          setFormErrors((prev) => ({ ...prev, card: '', expiry: '', cvc: '' }));
                        }}
                        className="text-[10px] uppercase font-bold text-gold hover:underline"
                      >
                        Fill Demo Card
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-obsidian/60 block mb-1">
                          Card Number *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            maxLength={19}
                            value={cardNumber}
                            onChange={(e) => {
                              const v = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                              setCardNumber(v);
                            }}
                            placeholder="4242 4242 4242 4242"
                            className={`w-full px-3.5 py-2 rounded-xl text-xs font-mono border focus:outline-none focus:ring-1 focus:ring-gold bg-pearl-50/50 ${
                              formErrors.card ? 'border-red-500' : 'border-pearl-300'
                            }`}
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-bold text-obsidian/40">
                            <span>VISA</span>
                            <span>MC</span>
                            <span>WISE</span>
                          </div>
                        </div>
                        {formErrors.card && (
                          <p className="text-[10px] text-red-500 mt-1">{formErrors.card}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-obsidian/60 block mb-1">
                            Expires (MM/YY) *
                          </label>
                          <input
                            type="text"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM / YY"
                            className={`w-full px-3.5 py-2 rounded-xl text-xs font-mono border focus:outline-none focus:ring-1 focus:ring-gold bg-pearl-50/50 ${
                              formErrors.expiry ? 'border-red-500' : 'border-pearl-300'
                            }`}
                          />
                          {formErrors.expiry && (
                            <p className="text-[10px] text-red-500 mt-1">{formErrors.expiry}</p>
                          )}
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-bold text-obsidian/60 block mb-1">
                            CVC / CVV *
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            placeholder="•••"
                            className={`w-full px-3.5 py-2 rounded-xl text-xs font-mono border focus:outline-none focus:ring-1 focus:ring-gold bg-pearl-50/50 ${
                              formErrors.cvc ? 'border-red-500' : 'border-pearl-300'
                            }`}
                          />
                          {formErrors.cvc && (
                            <p className="text-[10px] text-red-500 mt-1">{formErrors.cvc}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-obsidian/60 block mb-1">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            placeholder={patientName || 'Full name on card'}
                            className="w-full px-3.5 py-2 rounded-xl text-xs font-sans border border-pearl-300 focus:outline-none focus:ring-1 focus:ring-gold bg-pearl-50/50"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-bold text-obsidian/60 block mb-1">
                            Billing Postcode
                          </label>
                          <input
                            type="text"
                            value={cardPostal}
                            onChange={(e) => setCardPostal(e.target.value)}
                            placeholder="59000 (KL)"
                            className="w-full px-3.5 py-2 rounded-xl text-xs font-sans border border-pearl-300 focus:outline-none focus:ring-1 focus:ring-gold bg-pearl-50/50"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* VIEW 3: TOUCH 'N GO / GRABPAY EWALLET */}
                {(onlineProvider === 'Touch \'n Go eWallet' || onlineProvider === 'GrabPay') && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-black/10 shadow-sm space-y-3 font-sans animate-in fade-in duration-200">
                    <div className="flex items-center justify-between border-b border-black/10 pb-2.5">
                      <span className="text-xs font-bold text-obsidian uppercase tracking-wider">
                        {onlineProvider} Mobile Gateway
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Direct In-App Prompt
                      </span>
                    </div>
                    <p className="text-xs text-obsidian/70">
                      Upon confirmation, an authorization request of <strong>{formatCurrency(amountDueNow)}</strong> will be sent to your registered Malaysian mobile number ({phone || '+60 1x-xxx xxxx'}).
                    </p>
                  </div>
                )}

                {/* VIEW 4: FPX ONLINE BANKING */}
                {onlineProvider === 'FPX Online Banking' && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-black/10 shadow-sm space-y-3 font-sans animate-in fade-in duration-200">
                    <div className="flex items-center justify-between border-b border-black/10 pb-2.5">
                      <span className="text-xs font-bold text-obsidian uppercase tracking-wider">
                        Select Malaysian Bank (FPX)
                      </span>
                      <span className="text-[10px] font-bold text-obsidian/50">
                        Zero Processing Fee
                      </span>
                    </div>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs font-sans border border-pearl-300 focus:outline-none focus:ring-1 focus:ring-gold bg-pearl-50/50"
                    >
                      <option value="Maybank2u">Maybank2u (Malayan Banking Berhad)</option>
                      <option value="CIMB Clicks">CIMB Clicks</option>
                      <option value="Public Bank">Public Bank Online</option>
                      <option value="Hong Leong Connect">Hong Leong Connect</option>
                      <option value="RHB Now">RHB Now</option>
                      <option value="AmOnline">AmOnline</option>
                    </select>
                  </div>
                )}

              </div>
            )}
          </div>

          {/* Option 2: DuitNow Instant QR Transfer */}
          <div
            onClick={() => setPaymentMethod('duitnow_qr')}
            className={`cursor-pointer p-4 rounded-2xl border transition-all ${
              paymentMethod === 'duitnow_qr'
                ? 'bg-white shadow-gold-card border-gold ring-2 ring-gold/20'
                : 'bg-white/60 hover:bg-white border-pearl-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <QrCode className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-obsidian font-sans">
                    {t.payDuitNow}
                  </div>
                  <div className="text-[11px] text-obsidian/65 font-sans mt-0.5">
                    {t.payDuitNowDesc}
                  </div>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${
                paymentMethod === 'duitnow_qr' ? 'bg-gold border-gold text-white' : 'border-pearl-300'
              }`}>
                {paymentMethod === 'duitnow_qr' && <CheckCircle2 className="w-4 h-4 fill-white text-gold" />}
              </div>
            </div>
          </div>

          {/* Option 3: Reserve Slot & Pay at Clinic Counter */}
          {paymentCommitment === 'deposit_50' && (
            <div
              onClick={() => setPaymentMethod('pay_at_clinic')}
              className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                paymentMethod === 'pay_at_clinic'
                  ? 'bg-white shadow-gold-card border-gold ring-2 ring-gold/20'
                  : 'bg-white/60 hover:bg-white border-pearl-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-obsidian font-sans">
                      {t.payAtClinic}
                    </div>
                    <div className="text-[11px] text-obsidian/65 font-sans mt-0.5">
                      {t.payAtClinicDesc}
                    </div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${
                  paymentMethod === 'pay_at_clinic' ? 'bg-gold border-gold text-white' : 'border-pearl-300'
                }`}>
                  {paymentMethod === 'pay_at_clinic' && <CheckCircle2 className="w-4 h-4 fill-white text-gold" />}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation & Price Summary Card */}
      <div className="p-5 rounded-2xl glass-onyx text-white border border-gold/30 shadow-onyx-depth flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] text-pearl-300 uppercase tracking-wider font-sans">
            {paymentCommitment === 'deposit_50' ? 'Deposit Due Now:' : 'Total Payable Today (5% Discount Applied):'}
          </div>
          <div className="font-serif text-3xl font-light text-gold mt-0.5">
            {formatCurrency(amountDueNow)}
          </div>
          <p className="text-[11px] text-pearl-300 font-sans mt-0.5">
            {paymentCommitment === 'deposit_50'
              ? (paymentMethod === 'pay_at_clinic' 
                  ? 'Pay balance at clinic counter on appointment day.' 
                  : 'RM 50 deposit is deducted directly from your final invoice at the clinic.')
              : `Includes 5% VIP upfront discount (Saved ${formatCurrency(upfrontDiscount)}). Zero further payments required.`}
          </p>
        </div>

        <button
          type="submit"
          className="btn-gold-sheen px-8 py-4 rounded-full bg-gradient-to-r from-gold via-champagne-500 to-gold-deep text-white text-xs font-bold uppercase tracking-widest font-sans shadow-gold-glow flex items-center justify-center gap-2"
        >
          <span>{t.confirmBookingBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Trust & SSL footer */}
      <div className="text-center text-[11px] text-obsidian/50 font-sans">
        {t.secureBadge}
      </div>

      {/* DuitNow QR Interactive Modal */}
      <DuitNowModal
        isOpen={duitNowOpen}
        onClose={() => setDuitNowOpen(false)}
        depositAmount={amountDueNow}
        patientName={patientName}
        phone={phone}
        onPaymentConfirmed={() => {
          setDuitNowOpen(false);
          finalizeBooking('Paid', 'DuitNow QR');
        }}
      />
    </form>
  );
};

