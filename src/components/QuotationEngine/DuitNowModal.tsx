import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { 
  X, 
  QrCode, 
  Copy, 
  Check, 
  PhoneCall, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

interface DuitNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  depositAmount: number;
  patientName: string;
  phone: string;
  onPaymentConfirmed: () => void;
}

export const DuitNowModal: React.FC<DuitNowModalProps> = ({
  isOpen,
  onClose,
  depositAmount,
  patientName,
  phone,
  onPaymentConfirmed,
}) => {
  const { language, formatCurrency, addToast } = useClinic();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const referenceCode = `AUR-${Math.floor(1000 + Math.random() * 9000)}`;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('514088239912');
    setCopied(true);
    addToast('Account Copied', 'Maybank Account 5140 8823 9912 copied to clipboard.', 'info');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleWhatsAppConfirmation = () => {
    const message = encodeURIComponent(
      `Hello Aurelia Clinic Concierge. I have completed my DuitNow RM ${depositAmount} transfer.\n\n` +
      `• Patient: ${patientName}\n` +
      `• Phone: ${phone}\n` +
      `• Reference: ${referenceCode}\n` +
      `Kindly verify and secure my doctor consultation slot.`
    );
    window.open(`https://wa.me/60123456789?text=${message}`, '_blank');
    onPaymentConfirmed();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-deep/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="duitnow-modal-title"
    >
      <div className="relative w-full max-w-md rounded-3xl glass-onyx text-white p-6 sm:p-7 border border-gold/40 shadow-onyx-depth overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-pearl-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-[10px] font-bold uppercase tracking-wider mb-2 font-sans">
            <QrCode className="w-3.5 h-3.5" />
            <span>National DuitNow QR Transfer</span>
          </div>
          <h3 id="duitnow-modal-title" className="font-serif text-2xl font-medium text-pearl-100">
            {language === 'EN' ? 'Instant DuitNow QR Transfer' : 'Pindahan Segera DuitNow QR'}
          </h3>
          <p className="font-sans text-xs text-pearl-300 mt-1">
            {language === 'EN'
              ? 'Scan using Maybank, CIMB, Touch \'n Go eWallet, GrabPay, or any bank app.'
              : 'Imbas menggunakan aplikasi perbankan Maybank, CIMB, TnG eWallet atau GrabPay.'}
          </p>
        </div>

        {/* QR Code Container */}
        <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center border-2 border-gold/40 shadow-inner max-w-[260px] mx-auto text-obsidian">
          {/* Simulated High-Res DuitNow QR */}
          <div className="relative w-48 h-48 bg-white flex flex-col items-center justify-center border border-gray-200 rounded-lg p-2">
            <svg viewBox="0 0 100 100" className="w-full h-full text-obsidian">
              {/* SVG QR Pattern representation */}
              <rect x="0" y="0" width="30" height="30" fill="currentColor" />
              <rect x="5" y="5" width="20" height="20" fill="white" />
              <rect x="10" y="10" width="10" height="10" fill="currentColor" />

              <rect x="70" y="0" width="30" height="30" fill="currentColor" />
              <rect x="75" y="5" width="20" height="20" fill="white" />
              <rect x="80" y="10" width="10" height="10" fill="currentColor" />

              <rect x="0" y="70" width="30" height="30" fill="currentColor" />
              <rect x="5" y="75" width="20" height="20" fill="white" />
              <rect x="10" y="80" width="10" height="10" fill="currentColor" />

              {/* Data matrix dots */}
              <rect x="36" y="8" width="6" height="6" fill="currentColor" />
              <rect x="46" y="8" width="8" height="6" fill="currentColor" />
              <rect x="36" y="18" width="6" height="10" fill="currentColor" />
              <rect x="48" y="20" width="6" height="6" fill="currentColor" />
              <rect x="8" y="38" width="8" height="6" fill="currentColor" />
              <rect x="22" y="44" width="8" height="8" fill="currentColor" />
              <rect x="38" y="38" width="24" height="24" fill="#E11D48" rx="4" />
              <rect x="70" y="38" width="6" height="14" fill="currentColor" />
              <rect x="84" y="44" width="8" height="8" fill="currentColor" />
              <rect x="36" y="70" width="8" height="8" fill="currentColor" />
              <rect x="48" y="76" width="6" height="14" fill="currentColor" />
              <rect x="62" y="70" width="10" height="8" fill="currentColor" />
              <rect x="78" y="72" width="14" height="18" fill="currentColor" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="bg-rose-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                DuitNow
              </span>
            </div>
          </div>

          <div className="text-center mt-2 font-sans">
            <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Amount Payable</span>
            <div className="text-lg font-bold text-obsidian">{formatCurrency(depositAmount)}</div>
          </div>
        </div>

        {/* Bank Credentials Box */}
        <div className="mt-4 bg-white/5 rounded-xl p-3 border border-white/10 text-xs font-sans space-y-1.5">
          <div className="flex justify-between items-center text-pearl-300">
            <span>Payee:</span>
            <strong className="text-pearl-100 font-medium">Aurelia Medical Aesthetics Sdn Bhd</strong>
          </div>
          <div className="flex justify-between items-center text-pearl-300">
            <span>Bank:</span>
            <strong className="text-pearl-100 font-medium">Maybank Berhad</strong>
          </div>
          <div className="flex justify-between items-center text-pearl-300">
            <span>Account No:</span>
            <div className="flex items-center gap-1.5">
              <code className="text-gold font-mono font-bold">5140 8823 9912</code>
              <button 
                onClick={handleCopyAccount}
                className="p-1 hover:text-white transition-colors" 
                title="Copy account number"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-gold" />}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center text-pearl-300 pt-1 border-t border-white/10">
            <span>Reference:</span>
            <code className="text-gold font-mono">{referenceCode}</code>
          </div>
        </div>

        {/* 1-Click WhatsApp Confirmation Action */}
        <div className="mt-5 space-y-2">
          <button
            onClick={handleWhatsAppConfirmation}
            className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{language === 'EN' ? 'I Have Paid • Verify on WhatsApp' : 'Sudah Bayar • Sahkan di WhatsApp'}</span>
          </button>
          <button
            onClick={onClose}
            className="w-full py-2 text-center text-pearl-400 hover:text-white text-xs font-sans transition-colors"
          >
            {language === 'EN' ? 'Cancel & Choose Another Method' : 'Batal & Pilih Kaedah Lain'}
          </button>
        </div>
      </div>
    </div>
  );
};
