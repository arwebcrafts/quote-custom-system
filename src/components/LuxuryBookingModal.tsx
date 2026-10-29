import React, { useState, useEffect } from 'react';
import { useClinic } from '../context/ClinicContext';
import { 
  X, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Sparkles, 
  Building2, 
  Smartphone,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LuxuryBookingModal: React.FC = () => {
  const { 
    language, 
    formatCurrency, 
    addNewLead, 
    isBookingModalOpen, 
    closeBookingModal, 
    bookingModalQuote,
    setViewMode 
  } = useClinic();

  // If modal not open, return null
  if (!isBookingModalOpen) return null;

  // Step state: 1: Treatment & Doctor, 2: Branch & Slot, 3: Patient Info, 4: Payment, 5: Confirmation
  const [step, setStep] = useState<number>(1);

  // Form states
  const defaultPackageTitle = bookingModalQuote?.title || 'Aurelia Bespoke VIP Multi-Treatment Protocol';
  const defaultPackageTotal = bookingModalQuote?.quotedTotal || 2188;
  const defaultItems = bookingModalQuote?.items || ['Fotona StarWalker® Pico Laser', 'Profhilo® HA Bio-Remodelling'];

  const [selectedDoctor, setSelectedDoctor] = useState<'dr-sophia' | 'dr-marcus'>('dr-sophia');
  const [selectedBranch, setSelectedBranch] = useState<'Bangsar Flagship' | 'Damansara Heights'>('Bangsar Flagship');
  const [appointmentDate, setAppointmentDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [appointmentTime, setAppointmentTime] = useState<string>('11:30 AM');

  // Patient Info
  const [salutation, setSalutation] = useState<string>('Datin');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Payment Commitment & Method
  const [paymentChoice, setPaymentChoice] = useState<'deposit' | 'full'>('deposit');
  const [paymentProvider, setPaymentProvider] = useState<'card' | 'gpay' | 'duitnow' | 'ewallet' | 'fpx'>('card');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvc, setCardCvc] = useState<string>('');
  const [cardholderName, setCardholderName] = useState<string>('');
  const [selectedEwallet, setSelectedEwallet] = useState<"Touch 'n Go" | 'GrabPay' | 'Boost'>('GrabPay');
  const [selectedBank, setSelectedBank] = useState<string>('Maybank2u');

  // Form error
  const [formError, setFormError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedReservation, setConfirmedReservation] = useState<any>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBookingModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeBookingModal]);

  const depositFee = 50;
  const chargedAmount = paymentChoice === 'deposit' ? depositFee : defaultPackageTotal;

  // Handle Submit Booking
  const handleConfirmReservation = () => {
    if (!fullName.trim() || !phone.trim()) {
      setFormError('Please enter your full name and WhatsApp contact number.');
      return;
    }

    if (paymentProvider === 'card') {
      const cleanNum = cardNumber.replace(/\s+/g, '');
      if (cleanNum.length < 15 || !cardExpiry.includes('/') || cardCvc.length < 3) {
        setFormError('Please enter valid credit/debit card details (Number, MM/YY, CVC).');
        return;
      }
    }

    setFormError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const lead = addNewLead({
        patientName: `${salutation} ${fullName}`.trim(),
        phone: phone.startsWith('+') ? phone : `+60 ${phone}`,
        email: email || 'vip.patient@aureliaclinic.com.my',
        preferredBranch: selectedBranch,
        appointmentDate,
        appointmentTime,
        flowType: 'direct_consultation',
        selectedTreatments: defaultItems,
        packageTitle: defaultPackageTitle,
        pricingOption: paymentChoice === 'deposit' ? 'consultation_only' : 'full_package',
        quotedTotal: defaultPackageTotal,
        depositAmount: chargedAmount,
        paymentMethod: paymentProvider === 'duitnow' ? 'duitnow_qr' : 'deposit_online',
        paymentProvider: paymentProvider === 'card' 
          ? 'Stripe (Visa/Mastercard/Wise)' 
          : paymentProvider === 'gpay' 
          ? 'Google Pay' 
          : paymentProvider === 'duitnow' 
          ? 'DuitNow QR' 
          : paymentProvider === 'ewallet' 
          ? (selectedEwallet === "Touch 'n Go" ? "Touch 'n Go eWallet" : 'GrabPay')
          : 'FPX Online Banking',
        paymentStatus: 'Paid',
        status: 'Deposit Paid',
        notes: `VIP reservation with ${selectedDoctor === 'dr-sophia' ? 'Dr. Sophia Lim' : 'Dr. Marcus Tan'}. Notes: ${notes || 'None'}`,
      });

      setConfirmedReservation(lead);
      setIsSubmitting(false);
      setStep(5);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C8A27E', '#FAF7F2', '#1A1615', '#10B981']
        });
      } catch (err) {
        // confetti fallback
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 font-sans">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl rounded-[32px] sm:rounded-[40px] bg-[#FAF8F5] border border-white/95 shadow-2xl overflow-hidden p-6 sm:p-10 text-obsidian animate-in zoom-in-95 duration-200 my-auto">
        
        {/* Close Button */}
        <button
          onClick={closeBookingModal}
          className="absolute top-5 right-5 sm:top-7 sm:right-7 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-obsidian border border-black/10 flex items-center justify-center shadow-sm transition-all hover:scale-105 z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pb-6 border-b border-black/5">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-serif text-lg font-light tracking-[0.22em] text-obsidian uppercase">
              AURELIA CLINIC
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
              VIP Medical Suite
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-obsidian font-light">
            {step === 5 
              ? 'Priority VIP Reservation Confirmed' 
              : 'Reserve Your Private Physician Suite'}
          </h2>
          <p className="text-xs sm:text-sm text-obsidian/60 mt-1">
            {step === 5 
              ? 'Your booking is finalized and synced with our medical concierge.' 
              : 'Step-by-step reservation with real-time doctor availability and flexible deposits.'}
          </p>
        </div>

        {/* Progress Indicator (Steps 1-4) */}
        {step < 5 && (
          <div className="py-4 border-b border-black/5 flex items-center justify-between text-xs font-semibold text-obsidian/60">
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step >= 1 ? 'bg-obsidian text-white' : 'bg-black/10 text-obsidian/60'
              }`}>
                1
              </span>
              <span className={step === 1 ? 'text-obsidian font-bold' : ''}>Doctor & Suite</span>
            </div>
            <div className="w-8 h-px bg-black/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step >= 2 ? 'bg-obsidian text-white' : 'bg-black/10 text-obsidian/60'
              }`}>
                2
              </span>
              <span className={step === 2 ? 'text-obsidian font-bold' : ''}>Slot</span>
            </div>
            <div className="w-8 h-px bg-black/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step >= 3 ? 'bg-obsidian text-white' : 'bg-black/10 text-obsidian/60'
              }`}>
                3
              </span>
              <span className={step === 3 ? 'text-obsidian font-bold' : ''}>Patient</span>
            </div>
            <div className="w-8 h-px bg-black/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step >= 4 ? 'bg-obsidian text-white' : 'bg-black/10 text-obsidian/60'
              }`}>
                4
              </span>
              <span className={step === 4 ? 'text-obsidian font-bold' : ''}>Deposit</span>
            </div>
          </div>
        )}

        {/* Modal Body Steps */}
        <div className="py-6">
          {/* STEP 1: DOCTOR & PROTOCOL SELECTION */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="text-xs uppercase font-bold tracking-wider text-obsidian/70 block mb-2">
                  Selected Clinical Protocol
                </label>
                <div className="p-4 rounded-2xl bg-white border border-black/10 shadow-sm flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-obsidian font-medium">
                      {defaultPackageTitle}
                    </h3>
                    <p className="text-xs text-obsidian/60 mt-0.5">
                      {defaultItems.join(' • ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-xl font-bold text-obsidian">
                      {formatCurrency(defaultPackageTotal)}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-600 block font-bold">
                      Black Friday Rate
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase font-bold tracking-wider text-obsidian/70 block mb-3">
                  Select Attending Aesthetic Physician
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Doctor 1 */}
                  <div
                    onClick={() => setSelectedDoctor('dr-sophia')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                      selectedDoctor === 'dr-sophia'
                        ? 'bg-white border-obsidian ring-2 ring-obsidian shadow-md'
                        : 'bg-white/60 hover:bg-white border-black/10'
                    }`}
                  >
                    <img
                      src="/images/doctor_sophia.jpg"
                      alt="Dr. Sophia Lim"
                      className="w-14 h-14 rounded-full object-cover border border-black/10 shadow-sm"
                    />
                    <div>
                      <h4 className="font-serif text-base font-medium text-obsidian">Dr. Sophia Lim</h4>
                      <p className="text-[11px] text-obsidian/60">Medical Director & Founder</p>
                      <span className="text-[9px] uppercase tracking-wider text-obsidian/50 font-bold block mt-1">
                        LCP #LCP-A-2018-042
                      </span>
                    </div>
                  </div>

                  {/* Doctor 2 */}
                  <div
                    onClick={() => setSelectedDoctor('dr-marcus')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-4 ${
                      selectedDoctor === 'dr-marcus'
                        ? 'bg-white border-obsidian ring-2 ring-obsidian shadow-md'
                        : 'bg-white/60 hover:bg-white border-black/10'
                    }`}
                  >
                    <img
                      src="/images/doctor_marcus.jpg"
                      alt="Dr. Marcus Tan"
                      className="w-14 h-14 rounded-full object-cover border border-black/10 shadow-sm"
                    />
                    <div>
                      <h4 className="font-serif text-base font-medium text-obsidian">Dr. Marcus Tan</h4>
                      <p className="text-[11px] text-obsidian/60">Senior Aesthetic Physician</p>
                      <span className="text-[9px] uppercase tracking-wider text-obsidian/50 font-bold block mt-1">
                        LCP #LCP-A-2020-119
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-full bg-obsidian hover:bg-gold text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Select Date & Slot</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: BRANCH & SLOT */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="text-xs uppercase font-bold tracking-wider text-obsidian/70 block mb-2">
                  Select Clinic Flagship
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setSelectedBranch('Bangsar Flagship')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedBranch === 'Bangsar Flagship'
                        ? 'bg-white border-obsidian ring-2 ring-obsidian shadow-md'
                        : 'bg-white/60 hover:bg-white border-black/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-serif text-base font-medium text-obsidian">
                      <Building2 className="w-4 h-4 text-gold" />
                      <span>Bangsar Flagship</span>
                    </div>
                    <p className="text-xs text-obsidian/60 mt-1">Jalan Telawi 3, Bangsar Baru, KL</p>
                  </div>

                  <div
                    onClick={() => setSelectedBranch('Damansara Heights')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedBranch === 'Damansara Heights'
                        ? 'bg-white border-obsidian ring-2 ring-obsidian shadow-md'
                        : 'bg-white/60 hover:bg-white border-black/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-serif text-base font-medium text-obsidian">
                      <Building2 className="w-4 h-4 text-gold" />
                      <span>Damansara Heights</span>
                    </div>
                    <p className="text-xs text-obsidian/60 mt-1">Plaza Batai, Bukit Damansara, KL</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase font-bold tracking-wider text-obsidian/70 block mb-2">
                    Appointment Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full p-3 rounded-xl bg-white border border-black/10 text-xs font-sans text-obsidian focus:outline-none focus:ring-2 focus:ring-obsidian"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase font-bold tracking-wider text-obsidian/70 block mb-2">
                    Available Suite Time
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['10:00 AM', '11:30 AM', '02:15 PM', '04:00 PM', '05:30 PM'].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setAppointmentTime(slot)}
                        className={`py-2 px-2 rounded-xl text-[11px] font-semibold border transition-all ${
                          appointmentTime === slot
                            ? 'bg-obsidian text-white border-obsidian shadow-sm'
                            : 'bg-white hover:bg-black/5 text-obsidian border-black/10'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2 rounded-full border border-black/10 hover:bg-white text-xs font-semibold text-obsidian/70 transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-full bg-obsidian hover:bg-gold text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Patient Info</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PATIENT VIP DETAILS */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-1">
                  <label className="text-xs uppercase font-bold tracking-wider text-obsidian/70 block mb-1.5">
                    Title
                  </label>
                  <select
                    value={salutation}
                    onChange={(e) => setSalutation(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-black/10 text-xs font-sans text-obsidian focus:outline-none focus:ring-2 focus:ring-obsidian"
                  >
                    <option value="Datin">Datin</option>
                    <option value="Dato'">Dato'</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="text-xs uppercase font-bold tracking-wider text-obsidian/70 block mb-1.5">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Michelle Kwan"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-black/10 text-xs font-sans text-obsidian focus:outline-none focus:ring-2 focus:ring-obsidian"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase font-bold tracking-wider text-obsidian/70 block mb-1.5">
                    Malaysian WhatsApp Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+60 12-778 8990"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-black/10 text-xs font-sans text-obsidian focus:outline-none focus:ring-2 focus:ring-obsidian"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase font-bold tracking-wider text-obsidian/70 block mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="michelle@luxury.my"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-black/10 text-xs font-sans text-obsidian focus:outline-none focus:ring-2 focus:ring-obsidian"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase font-bold tracking-wider text-obsidian/70 block mb-1.5">
                  Skin Concern & Doctor Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Focus on melasma around cheekbones, sensitive to intense heat..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-black/10 text-xs font-sans text-obsidian focus:outline-none focus:ring-2 focus:ring-obsidian"
                />
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                  {formError}
                </div>
              )}

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2 rounded-full border border-black/10 hover:bg-white text-xs font-semibold text-obsidian/70 transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => {
                    if (!fullName.trim() || !phone.trim()) {
                      setFormError('Please fill in your full name and WhatsApp contact number.');
                      return;
                    }
                    setFormError('');
                    setStep(4);
                  }}
                  className="px-6 py-2.5 rounded-full bg-obsidian hover:bg-gold text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Select Payment</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: PAYMENT COMMITMENT & GATEWAYS */}
          {step === 4 && (
            <div className="space-y-6">
              {/* Payment Commitment: Deposit vs Full */}
              <div>
                <label className="text-xs uppercase font-bold tracking-wider text-obsidian/70 block mb-2">
                  Choose Payment Commitment
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setPaymentChoice('deposit')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentChoice === 'deposit'
                        ? 'bg-white border-obsidian ring-2 ring-obsidian shadow-md'
                        : 'bg-white/60 hover:bg-white border-black/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base font-medium text-obsidian">
                        RM 50 Priority Deposit
                      </span>
                      <span className="text-[9px] uppercase tracking-wider font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    </div>
                    <p className="text-xs text-obsidian/60 mt-1">
                      Locks your doctor suite. Balance payable at clinic after private consultation.
                    </p>
                  </div>

                  <div
                    onClick={() => setPaymentChoice('full')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentChoice === 'full'
                        ? 'bg-white border-obsidian ring-2 ring-obsidian shadow-md'
                        : 'bg-white/60 hover:bg-white border-black/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base font-medium text-obsidian">
                        Full Payment: {formatCurrency(defaultPackageTotal)}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                        Free Gift Kit
                      </span>
                    </div>
                    <p className="text-xs text-obsidian/60 mt-1">
                      Prepaid package. Includes complimentary Aurelia Cellular Recovery Elixir.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Gateway Tabs */}
              <div>
                <label className="text-xs uppercase font-bold tracking-wider text-obsidian/70 block mb-2">
                  Select Payment Gateway
                </label>
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                  <button
                    type="button"
                    onClick={() => setPaymentProvider('card')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                      paymentProvider === 'card'
                        ? 'bg-obsidian text-white border-obsidian'
                        : 'bg-white hover:bg-black/5 text-obsidian border-black/10'
                    }`}
                  >
                    Visa / Mastercard
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentProvider('gpay')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                      paymentProvider === 'gpay'
                        ? 'bg-obsidian text-white border-obsidian'
                        : 'bg-white hover:bg-black/5 text-obsidian border-black/10'
                    }`}
                  >
                    Google Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentProvider('duitnow')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                      paymentProvider === 'duitnow'
                        ? 'bg-obsidian text-white border-obsidian'
                        : 'bg-white hover:bg-black/5 text-obsidian border-black/10'
                    }`}
                  >
                    DuitNow QR
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentProvider('ewallet')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                      paymentProvider === 'ewallet'
                        ? 'bg-obsidian text-white border-obsidian'
                        : 'bg-white hover:bg-black/5 text-obsidian border-black/10'
                    }`}
                  >
                    eWallets
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentProvider('fpx')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                      paymentProvider === 'fpx'
                        ? 'bg-obsidian text-white border-obsidian'
                        : 'bg-white hover:bg-black/5 text-obsidian border-black/10'
                    }`}
                  >
                    FPX Online Banking
                  </button>
                </div>

                {/* Sub-Forms based on gateway */}
                <div className="p-4 rounded-2xl bg-white border border-black/10 mt-3">
                  {paymentProvider === 'card' && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider text-obsidian/60 block mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          maxLength={19}
                          placeholder="4242 •••• •••• 4242"
                          value={cardNumber}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                            setCardNumber(val);
                          }}
                          className="w-full p-2.5 rounded-xl bg-pearl-50 border border-black/10 text-xs font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] uppercase font-bold tracking-wider text-obsidian/60 block mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            maxLength={5}
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => {
                              let v = e.target.value.replace(/\D/g, '');
                              if (v.length > 2) v = v.substring(0, 2) + '/' + v.substring(2, 4);
                              setCardExpiry(v);
                            }}
                            className="w-full p-2.5 rounded-xl bg-pearl-50 border border-black/10 text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold tracking-wider text-obsidian/60 block mb-1">
                            CVC / CVV
                          </label>
                          <input
                            type="password"
                            maxLength={4}
                            placeholder="•••"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                            className="w-full p-2.5 rounded-xl bg-pearl-50 border border-black/10 text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentProvider === 'gpay' && (
                    <div className="text-center py-4 space-y-3">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white text-xs font-bold">
                        <span>GPay</span>
                        <span>• One-Click Biometric Authorized</span>
                      </div>
                      <p className="text-xs text-obsidian/60">
                        Total to authorize: <strong>RM {chargedAmount}.00</strong>
                      </p>
                    </div>
                  )}

                  {paymentProvider === 'duitnow' && (
                    <div className="text-center py-3 space-y-2">
                      <div className="w-32 h-32 mx-auto bg-white p-2 border-2 border-dashed border-black/20 rounded-xl flex items-center justify-center">
                        <QrCode className="w-24 h-24 text-obsidian" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full">
                        DuitNow National QR • Instant Dynamic Clearance
                      </span>
                    </div>
                  )}

                  {paymentProvider === 'ewallet' && (
                    <div className="grid grid-cols-3 gap-2">
                      {(['GrabPay', "Touch 'n Go", 'Boost'] as const).map((ew) => (
                        <button
                          key={ew}
                          type="button"
                          onClick={() => setSelectedEwallet(ew)}
                          className={`p-3 rounded-xl border text-xs font-bold text-center ${
                            selectedEwallet === ew
                              ? 'bg-obsidian text-white border-obsidian'
                              : 'bg-pearl-50 border-black/10 text-obsidian'
                          }`}
                        >
                          {ew}
                        </button>
                      ))}
                    </div>
                  )}

                  {paymentProvider === 'fpx' && (
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-obsidian/60 block">
                        Select Malaysian Bank
                      </label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-pearl-50 border border-black/10 text-xs font-sans text-obsidian"
                      >
                        <option value="Maybank2u">Maybank2u</option>
                        <option value="CIMB Clicks">CIMB Clicks</option>
                        <option value="Public Bank">Public Bank</option>
                        <option value="Hong Leong Connect">Hong Leong Connect</option>
                        <option value="RHB Now">RHB Now</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                  {formError}
                </div>
              )}

              <div className="pt-4 flex items-center justify-between border-t border-black/5">
                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-2 rounded-full border border-black/10 hover:bg-white text-xs font-semibold text-obsidian/70 transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleConfirmReservation}
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-full bg-obsidian hover:bg-gold text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Secure Reservation...</span>
                  ) : (
                    <span>Confirm & Pay RM {chargedAmount}.00 ↗</span>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: HIGH-IMPACT HIGH-CONTRAST VIP CONFIRMATION SCREEN */}
          {step === 5 && confirmedReservation && (
            <div className="space-y-6 text-center animate-in zoom-in-95 duration-300">
              {/* Gold Checkmark */}
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9 text-emerald-600" />
              </div>

              {/* High Contrast Heading (Fixes dull/unreadable white text) */}
              <div>
                <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                  Priority VIP Reservation Confirmed
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#1A1615] font-light mt-3">
                  Welcome to Aurelia Clinic KL
                </h3>
                <p className="text-xs sm:text-sm text-obsidian/70 mt-1 max-w-md mx-auto">
                  Thank you, <strong>{confirmedReservation.patientName}</strong>. Your private doctor suite has been reserved and synchronized in our live clinical calendar.
                </p>
              </div>

              {/* High-Contrast Summary Card */}
              <div className="p-5 rounded-2xl bg-white border border-black/10 shadow-sm text-left max-w-lg mx-auto space-y-3 text-xs text-obsidian/80">
                <div className="flex items-center justify-between pb-2 border-b border-black/5">
                  <span className="text-obsidian/50 uppercase font-bold text-[10px]">Attending Doctor:</span>
                  <strong className="text-obsidian font-serif text-sm">
                    {selectedDoctor === 'dr-sophia' ? 'Dr. Sophia Lim (Medical Director)' : 'Dr. Marcus Tan (Senior Aesthetic Physician)'}
                  </strong>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-black/5">
                  <span className="text-obsidian/50 uppercase font-bold text-[10px]">Flagship Branch:</span>
                  <strong className="text-obsidian">{confirmedReservation.preferredBranch}</strong>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-black/5">
                  <span className="text-obsidian/50 uppercase font-bold text-[10px]">Date & Time:</span>
                  <strong className="text-obsidian">{confirmedReservation.appointmentDate} @ {confirmedReservation.appointmentTime}</strong>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-black/5">
                  <span className="text-obsidian/50 uppercase font-bold text-[10px]">Protocol:</span>
                  <strong className="text-obsidian">{confirmedReservation.packageTitle}</strong>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-obsidian/50 uppercase font-bold text-[10px]">Deposit Status:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] border border-emerald-200">
                    RM {confirmedReservation.depositAmount} PAID ({confirmedReservation.paymentProvider})
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 max-w-md mx-auto pt-2">
                <a
                  href={`https://wa.me/60127788990?text=${encodeURIComponent(
                    `Hello Aurelia Medical Concierge! I just confirmed my VIP reservation.\n\nName: ${confirmedReservation.patientName}\nBranch: ${confirmedReservation.preferredBranch}\nDate: ${confirmedReservation.appointmentDate} at ${confirmedReservation.appointmentTime}\nProtocol: ${confirmedReservation.packageTitle}\nPayment: RM ${confirmedReservation.depositAmount} Paid via ${confirmedReservation.paymentProvider}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-full bg-[#075E54] hover:bg-[#128C7E] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Open WhatsApp Concierge Confirmation ↗</span>
                </a>

                <button
                  onClick={() => {
                    closeBookingModal();
                    setViewMode('admin');
                  }}
                  className="w-full py-3 px-6 rounded-full bg-gold hover:bg-gold/90 text-obsidian text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>📊 Inspect This Booking in Live Clinic Admin Panel →</span>
                </button>

                <button
                  onClick={closeBookingModal}
                  className="w-full py-2.5 text-xs text-obsidian/60 hover:text-obsidian transition-colors underline cursor-pointer"
                >
                  Return to Website
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
