import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  ViewMode, 
  Treatment, 
  BookingLead, 
  LeadStatus, 
  PromoSettings,
  GiftCardOrder
} from '../types';
import { INITIAL_TREATMENTS } from '../data/treatments';
import { INITIAL_LEADS } from '../data/initialLeads';
import { TRANSLATIONS } from '../translations';

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'info' | 'gold';
}

const INITIAL_GIFT_CARDS: GiftCardOrder[] = [
  {
    id: 'gc-8801',
    tier: 'voucher_1000',
    tierTitle: 'Signature Laser & Skin Booster Card',
    tierTitleBM: 'Kad Rawatan Laser & Penggalak Kulit Signature',
    amount: 1000,
    recipientName: 'Natasha Tan',
    recipientPhone: '+60 17-229 1199',
    recipientEmail: 'natasha.tan@luxury.my',
    senderName: 'Julian Wong',
    senderPhone: '+60 12-441 8800',
    personalMessage: 'Wishing you the most radiant year-end glow! Enjoy your treatment at Aurelia Bangsar.',
    deliveryMethod: 'whatsapp',
    paymentProvider: 'GrabPay',
    paymentStatus: 'Paid',
    createdAt: '2026-10-28T10:00:00Z',
  }
];

interface ClinicContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS['EN'];
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  treatments: Treatment[];
  updateTreatmentPrice: (id: string, newBasePrice: number, newOriginalPrice?: number) => void;
  promoSettings: PromoSettings;
  updatePromoSettings: (newSettings: Partial<PromoSettings>) => void;
  leads: BookingLead[];
  addNewLead: (lead: Omit<BookingLead, 'id' | 'createdAt'>) => BookingLead;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  deleteLead: (id: string) => void;
  giftCards: GiftCardOrder[];
  addNewGiftCardOrder: (order: Omit<GiftCardOrder, 'id' | 'createdAt'>) => GiftCardOrder;
  toasts: ToastMessage[];
  addToast: (title: string, description: string, type?: 'success' | 'info' | 'gold') => void;
  removeToast: (id: string) => void;
  formatCurrency: (amount: number) => string;
  resetToDefaults: () => void;
  // Deep-linking tabs and treatment preselection
  preselectedTreatmentId: string | null;
  setPreselectedTreatmentId: (id: string | null) => void;
  activeQuotationTab: 'quiz' | 'direct' | 'giftcard';
  setActiveQuotationTab: (tab: 'quiz' | 'direct' | 'giftcard') => void;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_TREATMENTS = 'aurelia_treatments_v2';
const LOCAL_STORAGE_KEY_LEADS = 'aurelia_leads_v2';
const LOCAL_STORAGE_KEY_GIFTCARDS = 'aurelia_giftcards_v2';
const LOCAL_STORAGE_KEY_PROMO = 'aurelia_promo_v2';
const LOCAL_STORAGE_KEY_LANG = 'aurelia_lang_v2';

const DEFAULT_PROMO: PromoSettings = {
  holidayPromoActive: true,
  promoTitle: 'BLACK FRIDAY & YEAR-END RADIANCE PASS',
  promoDiscountPercent: 25,
  announcementTextEN: '✨ Black Friday & Year-End Privilege: 7th Gen Visia® Skin Scan + RM 120 Consultation Waived with Any Protocol',
  announcementTextBM: '✨ Keistimewaan Akhir Tahun & Black Friday: Percuma Imbasan Visia® Gen-7 + Yuran Konsultasi RM 120 Diketepikan'
};

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_LANG);
    return (saved === 'BM' || saved === 'EN') ? saved : 'EN';
  });

  const [viewMode, setViewMode] = useState<ViewMode>('patient');
  const [preselectedTreatmentId, setPreselectedTreatmentId] = useState<string | null>(null);
  const [activeQuotationTab, setActiveQuotationTab] = useState<'quiz' | 'direct' | 'giftcard'>('quiz');

  // Treatments with persistence
  const [treatments, setTreatments] = useState<Treatment[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_TREATMENTS);
      return saved ? JSON.parse(saved) : INITIAL_TREATMENTS;
    } catch {
      return INITIAL_TREATMENTS;
    }
  });

  // Leads with persistence
  const [leads, setLeads] = useState<BookingLead[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_LEADS);
      return saved ? JSON.parse(saved) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  // Gift Cards
  const [giftCards, setGiftCards] = useState<GiftCardOrder[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_GIFTCARDS);
      return saved ? JSON.parse(saved) : INITIAL_GIFT_CARDS;
    } catch {
      return INITIAL_GIFT_CARDS;
    }
  });

  // Promo settings with persistence
  const [promoSettings, setPromoSettings] = useState<PromoSettings>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PROMO);
      return saved ? JSON.parse(saved) : DEFAULT_PROMO;
    } catch {
      return DEFAULT_PROMO;
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, description: string, type: 'success' | 'info' | 'gold' = 'gold') => {
    const id = 'toast_' + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LOCAL_STORAGE_KEY_LANG, lang);
  };

  const updateTreatmentPrice = (id: string, newBasePrice: number, newOriginalPrice?: number) => {
    setTreatments((prev) => {
      const updated = prev.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            basePrice: newBasePrice,
            originalPrice: newOriginalPrice ?? t.originalPrice
          };
        }
        return t;
      });
      localStorage.setItem(LOCAL_STORAGE_KEY_TREATMENTS, JSON.stringify(updated));
      return updated;
    });
    addToast('Price Updated', 'Treatment pricing updated live across website.', 'info');
  };

  const updatePromoSettings = (newSettings: Partial<PromoSettings>) => {
    setPromoSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem(LOCAL_STORAGE_KEY_PROMO, JSON.stringify(updated));
      return updated;
    });
    addToast('Promo Banner Updated', 'Holiday promotional settings updated live.', 'gold');
  };

  const addNewLead = (leadData: Omit<BookingLead, 'id' | 'createdAt'>): BookingLead => {
    const newLead: BookingLead = {
      ...leadData,
      id: `aur-lead-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString()
    };
    setLeads((prev) => {
      const updated = [newLead, ...prev];
      localStorage.setItem(LOCAL_STORAGE_KEY_LEADS, JSON.stringify(updated));
      return updated;
    });
    return newLead;
  };

  const addNewGiftCardOrder = (orderData: Omit<GiftCardOrder, 'id' | 'createdAt'>): GiftCardOrder => {
    const newOrder: GiftCardOrder = {
      ...orderData,
      id: `gc-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString()
    };
    setGiftCards((prev) => {
      const updated = [newOrder, ...prev];
      localStorage.setItem(LOCAL_STORAGE_KEY_GIFTCARDS, JSON.stringify(updated));
      return updated;
    });
    // Also log as lead in pipeline for clinic visibility
    addNewLead({
      patientName: `${orderData.senderName} (Gift for ${orderData.recipientName})`,
      phone: orderData.senderPhone,
      email: orderData.recipientEmail,
      preferredBranch: 'Bangsar Flagship',
      appointmentDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
      appointmentTime: 'Gift Voucher Order',
      flowType: 'gift_card',
      selectedTreatments: [orderData.tierTitle],
      packageTitle: `Luxury Gift Voucher: ${orderData.tierTitle}`,
      pricingOption: 'gift_card',
      quotedTotal: orderData.amount,
      depositAmount: orderData.amount,
      paymentMethod: 'deposit_online',
      paymentProvider: orderData.paymentProvider,
      paymentStatus: 'Paid',
      status: 'Deposit Paid',
      notes: `Gift Card ordered for ${orderData.recipientName} (${orderData.recipientPhone}). Message: "${orderData.personalMessage}"`,
    });
    return newOrder;
  };

  const updateLeadStatus = (id: string, status: LeadStatus) => {
    setLeads((prev) => {
      const updated = prev.map((lead) => (lead.id === id ? { ...lead, status } : lead));
      localStorage.setItem(LOCAL_STORAGE_KEY_LEADS, JSON.stringify(updated));
      return updated;
    });
    addToast('Lead Status Updated', `Patient record status changed to: ${status}`, 'success');
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => {
      const updated = prev.filter((lead) => lead.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY_LEADS, JSON.stringify(updated));
      return updated;
    });
    addToast('Record Removed', 'Patient booking record deleted from pipeline.', 'info');
  };

  const resetToDefaults = () => {
    setTreatments(INITIAL_TREATMENTS);
    setLeads(INITIAL_LEADS);
    setGiftCards(INITIAL_GIFT_CARDS);
    setPromoSettings(DEFAULT_PROMO);
    localStorage.removeItem(LOCAL_STORAGE_KEY_TREATMENTS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_LEADS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_GIFTCARDS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_PROMO);
    addToast('System Reset', 'All clinical prices and leads reset to live demo defaults.', 'info');
  };

  const formatCurrency = (amount: number) => {
    return `RM ${Math.round(amount).toLocaleString('en-MY')}`;
  };

  const t = TRANSLATIONS[language];

  return (
    <ClinicContext.Provider
      value={{
        language,
        setLanguage,
        t,
        viewMode,
        setViewMode,
        treatments,
        updateTreatmentPrice,
        promoSettings,
        updatePromoSettings,
        leads,
        addNewLead,
        updateLeadStatus,
        deleteLead,
        giftCards,
        addNewGiftCardOrder,
        toasts,
        addToast,
        removeToast,
        formatCurrency,
        resetToDefaults,
        preselectedTreatmentId,
        setPreselectedTreatmentId,
        activeQuotationTab,
        setActiveQuotationTab
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
