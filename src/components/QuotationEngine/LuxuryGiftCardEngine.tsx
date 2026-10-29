import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { GiftCardOrder, PaymentProvider } from '../../types';
import confetti from 'canvas-confetti';
import { 
  Gift, 
  Sparkles, 
  CreditCard, 
  PhoneCall, 
  Mail, 
  CheckCircle2, 
  ArrowRight, 
  Share2, 
  Calendar,
  Lock,
  Heart
} from 'lucide-react';

export const LuxuryGiftCardEngine: React.FC = () => {
  const { language, formatCurrency, addNewGiftCardOrder, addToast } = useClinic();

  const [selectedTier, setSelectedTier] = useState<'voucher_500' | 'voucher_1000' | 'voucher_2500' | 'custom'>('voucher_1000');
  const [customAmount, setCustomAmount] = useState<number>(1500);

  // Form Fields
  const [recipientName, setRecipientName] = useState<string>('Datin Michelle Kwan');
  const [recipientPhone, setRecipientPhone] = useState<string>('+60 12-778 8990');
  const [recipientEmail, setRecipientEmail] = useState<string>('michelle.kwan@luxury.my');
  const [senderName, setSenderName] = useState<string>('Dato\' Kenneth Tan');
  const [senderPhone, setSenderPhone] = useState<string>('+60 12-334 5566');
  const [personalMessage, setPersonalMessage] = useState<string>(
    'May this year-end bring you renewed luminosity and serenity. Enjoy your doctor-led skin session at Aurelia Bangsar.'
  );
  const [deliveryMethod, setDeliveryMethod] = useState<'whatsapp' | 'email'>('whatsapp');
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider>('GrabPay');

  const [completedOrder, setCompletedOrder] = useState<GiftCardOrder | null>(null);

  const getTierDetails = () => {
    switch (selectedTier) {
      case 'voucher_500':
        return { title: 'Radiance Glow Privilege Card', titleBM: 'Kad Keistimewaan Seri Wajah', amount: 500 };
      case 'voucher_1000':
        return { title: 'Signature Laser & Skin Booster Card', titleBM: 'Kad Rawatan Laser & Penggalak Kulit Signature', amount: 1000 };
      case 'voucher_2500':
        return { title: 'VIP Cellular Longevity Transformation Pass', titleBM: 'Pas VIP Transformasi Keremajaan Selular', amount: 2500 };
      case 'custom':
        return { title: 'Bespoke Aurelia Clinical Gift Pass', titleBM: 'Pas Hadiah Klinikal Tersuai Aurelia', amount: customAmount };
    }
  };

  const activeTier = getTierDetails();

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newOrder = addNewGiftCardOrder({
      tier: selectedTier,
      tierTitle: activeTier.title,
      tierTitleBM: activeTier.titleBM,
      amount: activeTier.amount,
      recipientName: recipientName.trim() || 'Valued Recipient',
      recipientPhone: recipientPhone.trim(),
      recipientEmail: recipientEmail.trim() || undefined,
      senderName: senderName.trim() || 'Aurelia Benefactor',
      senderPhone: senderPhone.trim(),
      personalMessage: personalMessage.trim(),
      deliveryMethod,
      paymentProvider,
      paymentStatus: 'Paid',
    });

    setCompletedOrder(newOrder);

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#D4A39A', '#E8D5CE', '#23161C', '#C99E9A'],
      });
    } catch {}

    addToast(
      language === 'EN' ? 'Gift Voucher Issued!' : 'Baucar Hadiah Dikeluarkan!',
      language === 'EN' 
        ? `RM ${activeTier.amount.toLocaleString()} Gift Card for ${recipientName} has been generated and logged in Clinic Admin.` 
        : `Kad Hadiah RM ${activeTier.amount.toLocaleString()} untuk ${recipientName} telah berjaya dijana.`,
      'gold'
    );
  };

  // SUCCESS CONFIRMATION & DIGITAL PASS
  if (completedOrder) {
    const waText = encodeURIComponent(
      `✨ AURELIA CLINIC KL — LUXURY GIFT PRIVILEGE ✨\n\n` +
      `Dearest ${completedOrder.recipientName},\n\n` +
      `${completedOrder.senderName} has sent you a bespoke medical aesthetics gift voucher valued at RM ${completedOrder.amount.toLocaleString()} for AURELIA CLINIC KL (Bangsar & Damansara Heights).\n\n` +
      `Personal Note:\n"${completedOrder.personalMessage}"\n\n` +
      `• Voucher Code: ${completedOrder.id.toUpperCase()}\n` +
      `• Redeemable for: Fotona Pico Laser, Profhilo, Rejuran, or Ultraformer III HIFU\n` +
      `• Valid: 12 Months from today\n\n` +
      `To schedule your private VIP doctor suite, simply present this message or WhatsApp us at +60 12-345 6789.`
    );

    return (
      <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-[32px] glass-plum text-white border border-rosegold/40 shadow-plum-depth space-y-6 animate-in zoom-in-95 duration-400 font-sans">
        <div className="text-center space-y-2 pb-5 border-b border-white/10">
          <div className="w-14 h-14 rounded-full bg-rosegold/20 border-2 border-rosegold flex items-center justify-center mx-auto text-rosegold-light">
            <Gift className="w-7 h-7" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-rosegold-light font-mono">
            Luxury Gift Voucher Issued
          </span>
          <h3 className="font-serif text-3xl font-light text-white">
            {language === 'EN' ? 'Gift Card Ready for Delivery' : 'Kad Hadiah Sedia Dihantar'}
          </h3>
          <p className="text-xs text-rose-200/80">
            {language === 'EN'
              ? `Your payment has been verified. The voucher is ready to be sent to ${completedOrder.recipientName}.`
              : `Bayaran telah disahkan. Baucar sedia untuk dihantar kepada ${completedOrder.recipientName}.`}
          </p>
        </div>

        {/* 3D Digital Pass Card Display */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-mauve via-plum to-plum-deep text-white border border-rosegold/50 shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <span className="font-serif text-xl tracking-[0.2em] font-light">AURELIA</span>
              <p className="text-[9px] uppercase tracking-widest text-rosegold-light">Medical Aesthetics KL</p>
            </div>
            <span className="font-serif text-2xl font-bold text-rosegold-light">
              {formatCurrency(completedOrder.amount)}
            </span>
          </div>

          <div className="my-5">
            <span className="text-[10px] uppercase text-rose-200/70 font-mono">Presented To:</span>
            <h4 className="font-serif text-xl font-medium text-white">{completedOrder.recipientName}</h4>
            <p className="text-xs text-rose-100/90 italic mt-1 line-clamp-2">
              "{completedOrder.personalMessage}"
            </p>
          </div>

          <div className="flex justify-between items-end pt-3 border-t border-white/20 text-[10px] font-mono text-rose-200/80">
            <div>
              <span>From: <strong>{completedOrder.senderName}</strong></span>
            </div>
            <div>
              <span>CODE: <strong>{completedOrder.id.toUpperCase()}</strong></span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <a
            href={`https://wa.me/?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-sheen w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>{language === 'EN' ? 'Share Voucher via WhatsApp Now' : 'Kongsi Baucar melalui WhatsApp'}</span>
          </a>

          <button
            onClick={() => setCompletedOrder(null)}
            className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-rose-100 transition-colors"
          >
            {language === 'EN' ? 'Create Another Gift Card' : 'Bina Kad Hadiah Lain'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleOrderSubmit} className="space-y-8 font-sans">
      
      {/* Step A: Choose Gift Tier */}
      <div className="space-y-3">
        <label className="block text-xs uppercase tracking-wider font-bold text-plum-dark">
          {language === 'EN' ? 'Step A: Select Luxury Gift Tier' : 'Langkah A: Pilih Tahap Kad Hadiah'}
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Tier 1 */}
          <button
            type="button"
            onClick={() => setSelectedTier('voucher_500')}
            className={`p-4 rounded-2xl text-left border transition-all ${
              selectedTier === 'voucher_500'
                ? 'bg-plum text-white border-rosegold shadow-md ring-2 ring-rosegold/30'
                : 'bg-white/70 hover:bg-white border-white/90 text-plum-dark'
            }`}
          >
            <span className="text-[10px] uppercase font-bold font-mono tracking-wider block text-rosegold">Glow Trial</span>
            <div className="font-serif text-2xl font-bold mt-1">RM 500</div>
            <p className="text-[11px] opacity-80 mt-1">Visia Scan + Carbon Peel or Cryo-Infusion</p>
          </button>

          {/* Tier 2 */}
          <button
            type="button"
            onClick={() => setSelectedTier('voucher_1000')}
            className={`p-4 rounded-2xl text-left border transition-all relative ${
              selectedTier === 'voucher_1000'
                ? 'bg-plum text-white border-rosegold shadow-md ring-2 ring-rosegold/30'
                : 'bg-white/70 hover:bg-white border-white/90 text-plum-dark'
            }`}
          >
            <span className="absolute -top-2 right-3 text-[9px] font-bold uppercase tracking-wider bg-rosegold text-plum-dark px-2 py-0.5 rounded-full">
              Most Popular
            </span>
            <span className="text-[10px] uppercase font-bold font-mono tracking-wider block text-rosegold">Signature</span>
            <div className="font-serif text-2xl font-bold mt-1">RM 1,000</div>
            <p className="text-[11px] opacity-80 mt-1">Fotona Pico Laser or Rejuran Healer Session</p>
          </button>

          {/* Tier 3 */}
          <button
            type="button"
            onClick={() => setSelectedTier('voucher_2500')}
            className={`p-4 rounded-2xl text-left border transition-all ${
              selectedTier === 'voucher_2500'
                ? 'bg-plum text-white border-rosegold shadow-md ring-2 ring-rosegold/30'
                : 'bg-white/70 hover:bg-white border-white/90 text-plum-dark'
            }`}
          >
            <span className="text-[10px] uppercase font-bold font-mono tracking-wider block text-rosegold">VIP Transformation</span>
            <div className="font-serif text-2xl font-bold mt-1">RM 2,500</div>
            <p className="text-[11px] opacity-80 mt-1">Full Protocol: Profhilo + Exosomes + Laser</p>
          </button>

          {/* Tier 4: Custom */}
          <button
            type="button"
            onClick={() => setSelectedTier('custom')}
            className={`p-4 rounded-2xl text-left border transition-all ${
              selectedTier === 'custom'
                ? 'bg-plum text-white border-rosegold shadow-md ring-2 ring-rosegold/30'
                : 'bg-white/70 hover:bg-white border-white/90 text-plum-dark'
            }`}
          >
            <span className="text-[10px] uppercase font-bold font-mono tracking-wider block text-rosegold">Custom Value</span>
            <div className="font-serif text-2xl font-bold mt-1">Custom RM</div>
            <p className="text-[11px] opacity-80 mt-1">Specify custom amount or treatment</p>
          </button>
        </div>

        {selectedTier === 'custom' && (
          <div className="mt-3 p-4 rounded-xl bg-white/80 border border-rosegold/40 flex items-center gap-3">
            <span className="text-xs font-bold text-plum-dark">Enter Custom Amount:</span>
            <div className="flex items-center gap-1 font-mono">
              <span className="font-bold text-plum-dark">RM</span>
              <input
                type="number"
                min="300"
                step="50"
                value={customAmount}
                onChange={(e) => setCustomAmount(parseInt(e.target.value) || 500)}
                className="w-32 px-3 py-1.5 rounded-lg border border-mauve text-sm font-bold bg-white text-plum-dark focus:outline-none focus:ring-2 focus:ring-rosegold"
              />
            </div>
          </div>
        )}
      </div>

      {/* Step B: Interactive Live 3D Digital Gift Card Preview */}
      <div className="space-y-4">
        <label className="block text-xs uppercase tracking-wider font-bold text-plum-dark">
          {language === 'EN' ? 'Step B: Live Digital Gift Card Preview' : 'Langkah B: Pratonton Kad Hadiah Digital Masa Nyata'}
        </label>

        {/* The Live Rendered Rose-Glass & Mirror-Plum Card */}
        <div className="rounded-[28px] bg-gradient-to-br from-mauve via-plum to-plum-deep text-white p-7 sm:p-8 border border-white/40 shadow-2xl relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full filter blur-3xl pointer-events-none" />

          <div className="flex justify-between items-start">
            <div>
              <span className="font-serif text-2xl tracking-[0.2em] font-light text-white uppercase">AURELIA</span>
              <p className="text-[9px] uppercase tracking-widest text-rosegold-light">Kuala Lumpur &bull; Aesthetics</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase tracking-wider text-rose-200/80 block">Gift Value</span>
              <span className="font-serif text-3xl font-bold text-rosegold-light">
                {formatCurrency(activeTier.amount)}
              </span>
            </div>
          </div>

          <div className="my-6">
            <span className="text-[10px] uppercase font-mono tracking-wider text-rose-200/70 block">Prepared For:</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white tracking-wide">
              {recipientName || 'Recipient Name'}
            </h3>
            <p className="text-xs sm:text-sm text-rose-100/90 italic mt-2 bg-white/10 p-3 rounded-xl border border-white/15 leading-relaxed">
              "{personalMessage || 'Your personal luxury message will be engraved here.'}"
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pt-3 border-t border-white/20 text-xs text-rose-200/90 font-mono">
            <div>
              <span>From: <strong className="text-white">{senderName || 'Sender Name'}</strong></span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-rosegold-light uppercase">Bangsar &bull; Damansara Heights</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recipient & Sender Input Fields */}
      <div className="space-y-4 pt-4 border-t border-white/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-medium text-plum-muted mb-1">
              {language === 'EN' ? 'Recipient Full Name *' : 'Nama Penuh Penerima *'}
            </label>
            <input
              type="text"
              required
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="e.g. Datin Michelle Kwan"
              className="w-full px-3.5 py-2.5 rounded-xl border border-blush text-xs bg-white text-plum-dark focus:outline-none focus:ring-2 focus:ring-rosegold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-plum-muted mb-1">
              {language === 'EN' ? 'Recipient WhatsApp Mobile *' : 'Nombor WhatsApp Penerima *'}
            </label>
            <input
              type="tel"
              required
              value={recipientPhone}
              onChange={(e) => setRecipientPhone(e.target.value)}
              placeholder="+60 12-345 6789"
              className="w-full px-3.5 py-2.5 rounded-xl border border-blush text-xs bg-white text-plum-dark focus:outline-none focus:ring-2 focus:ring-rosegold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-medium text-plum-muted mb-1">
              {language === 'EN' ? 'Your Name (Sender) *' : 'Nama Anda (Pengirim) *'}
            </label>
            <input
              type="text"
              required
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="e.g. Dato' Kenneth Tan"
              className="w-full px-3.5 py-2.5 rounded-xl border border-blush text-xs bg-white text-plum-dark focus:outline-none focus:ring-2 focus:ring-rosegold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-plum-muted mb-1">
              {language === 'EN' ? 'Your Mobile (for SMS/WhatsApp Receipt) *' : 'Nombor Telefon Anda *'}
            </label>
            <input
              type="tel"
              required
              value={senderPhone}
              onChange={(e) => setSenderPhone(e.target.value)}
              placeholder="+60 12-345 6789"
              className="w-full px-3.5 py-2.5 rounded-xl border border-blush text-xs bg-white text-plum-dark focus:outline-none focus:ring-2 focus:ring-rosegold"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-plum-muted mb-1">
            {language === 'EN' ? 'Personal Gift Message' : 'Mesej Peribadi Hadiah'}
          </label>
          <textarea
            rows={2}
            value={personalMessage}
            onChange={(e) => setPersonalMessage(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-blush text-xs bg-white text-plum-dark focus:outline-none focus:ring-2 focus:ring-rosegold"
          />
        </div>
      </div>

      {/* Step C: Delivery & Checkout */}
      <div className="space-y-4 pt-4 border-t border-white/80">
        <label className="block text-xs uppercase tracking-wider font-bold text-plum-dark">
          {language === 'EN' ? 'Step C: Delivery Channel & Instant Checkout' : 'Langkah C: Kaedah Penghantaran & Bayaran'}
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setDeliveryMethod('whatsapp')}
            className={`p-3.5 rounded-xl text-left border flex items-center gap-3 transition-all ${
              deliveryMethod === 'whatsapp'
                ? 'bg-white shadow-sm border-emerald-500 ring-1 ring-emerald-400'
                : 'bg-white/60 border-white/80 text-plum-dark'
            }`}
          >
            <PhoneCall className="w-5 h-5 text-emerald-600" />
            <div>
              <div className="text-xs font-bold text-plum-dark">Instant WhatsApp Delivery</div>
              <div className="text-[10px] text-plum-muted">Generates 1-click high-res digital pass</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setDeliveryMethod('email')}
            className={`p-3.5 rounded-xl text-left border flex items-center gap-3 transition-all ${
              deliveryMethod === 'email'
                ? 'bg-white shadow-sm border-rosegold ring-1 ring-rosegold'
                : 'bg-white/60 border-white/80 text-plum-dark'
            }`}
          >
            <Mail className="w-5 h-5 text-rosegold-dark" />
            <div>
              <div className="text-xs font-bold text-plum-dark">Scheduled Email Gift Card</div>
              <div className="text-[10px] text-plum-muted">Delivered directly with PDF certificate</div>
            </div>
          </button>
        </div>

        {/* Payment Methods */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {(['GrabPay', 'Touch \'n Go eWallet', 'FPX Online Banking', 'Visa/Mastercard (Stripe)', 'DuitNow QR'] as PaymentProvider[]).map((prov) => (
            <button
              type="button"
              key={prov}
              onClick={() => setPaymentProvider(prov)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-sans font-semibold transition-all border ${
                paymentProvider === prov
                  ? 'bg-plum-dark text-white border-plum-dark shadow-sm'
                  : 'bg-white/70 text-plum-dark border-white/90 hover:bg-white'
              }`}
            >
              {prov}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="p-5 rounded-2xl glass-plum text-white border border-rosegold/30 shadow-plum-depth flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest text-rosegold-light">Total Payable</span>
          <div className="font-serif text-3xl font-light text-white">{formatCurrency(activeTier.amount)}</div>
          <span className="text-[10px] text-rose-200/70">100% Valid for 12 months across all Aurelia suites.</span>
        </div>

        <button
          type="submit"
          className="btn-gold-sheen w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-mauve via-plum to-plum-dark text-white text-xs font-bold uppercase tracking-widest shadow-xl flex items-center justify-center gap-2"
        >
          <span>{language === 'EN' ? 'Complete Gift Voucher Purchase ↗' : 'Selesaikan Pembelian Baucar Hadiah ↗'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
