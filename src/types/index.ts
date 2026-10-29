export type Language = 'EN' | 'BM';
export type ViewMode = 'patient' | 'admin';

export type TreatmentCategory = 'lasers' | 'injectables' | 'lifting';

export interface Treatment {
  id: string;
  name: string;
  nameBM: string;
  category: TreatmentCategory;
  categoryLabel: string;
  categoryLabelBM: string;
  basePrice: number;
  originalPrice: number;
  duration: string;
  downtime: string;
  downtimeBM: string;
  painLevel: string;
  painLevelBM: string;
  sessionsRecommended: string;
  description: string;
  descriptionBM: string;
  tag: string;
  mdaApproved: boolean;
  doctorPerformed: boolean;
  image: string;
}

export interface SkinConcern {
  id: string;
  title: string;
  titleBM: string;
  subtitle: string;
  subtitleBM: string;
  image: string;
  recommendedPackageId: string;
}

export interface TimelineOption {
  id: string;
  label: string;
  labelBM: string;
  detail: string;
  detailBM: string;
  badge?: string;
}

export interface ProtocolPackage {
  id: string;
  concernId: string;
  title: string;
  titleBM: string;
  tagline: string;
  taglineBM: string;
  treatmentsIncluded: string[];
  treatmentsIncludedBM: string[];
  originalPrice: number;
  promoPrice: number;
  singleTrialPrice: number;
  consultationFee: number;
  monthsInstallment: number;
  monthlyRate: number;
  targetConcerns: string;
  targetConcernsBM: string;
  clinicalNote: string;
  clinicalNoteBM: string;
}

export type LeadStatus = 'New Quote' | 'Deposit Paid' | 'Consulted' | 'Package Closed';
export type Branch = 'Bangsar Flagship' | 'Damansara Heights';
export type PaymentMethod = 'deposit_online' | 'duitnow_qr' | 'pay_at_clinic';
export type PaymentProvider = 'GrabPay' | 'Touch \'n Go eWallet' | 'FPX Online Banking' | 'Visa/Mastercard (Stripe)' | 'DuitNow QR' | 'Pay at Clinic Counter';
export type PaymentCommitmentChoice = 'deposit_50' | 'full_upfront_5pct';

export interface BookingLead {
  id: string;
  patientName: string;
  phone: string;
  email?: string;
  preferredBranch: Branch;
  appointmentDate: string;
  appointmentTime: string;
  flowType: 'quiz_recommended' | 'custom_builder' | 'direct_consultation' | 'gift_card';
  selectedTreatments: string[];
  packageTitle?: string;
  pricingOption: 'full_package' | 'single_trial' | 'consultation_only' | 'custom_bundle' | 'gift_card';
  paymentCommitment?: PaymentCommitmentChoice;
  quotedTotal: number;
  depositAmount: number;
  paymentMethod: PaymentMethod;
  paymentProvider?: PaymentProvider;
  paymentStatus: 'Paid' | 'Pending Verification' | 'Pay at Counter';
  status: LeadStatus;
  notes?: string;
  createdAt: string;
}

export interface GiftCardOrder {
  id: string;
  tier: 'voucher_500' | 'voucher_1000' | 'voucher_2500' | 'custom';
  tierTitle: string;
  tierTitleBM: string;
  amount: number;
  recipientName: string;
  recipientPhone: string;
  recipientEmail?: string;
  senderName: string;
  senderPhone: string;
  personalMessage: string;
  deliveryMethod: 'whatsapp' | 'email';
  scheduledDate?: string;
  paymentProvider: PaymentProvider;
  paymentStatus: 'Paid' | 'Pending';
  createdAt: string;
}

export interface BeforeAfterCase {
  id: string;
  category: 'pigmentation' | 'scars' | 'jawline' | 'glass_skin';
  categoryLabel: string;
  categoryLabelBM: string;
  patientAge: string;
  concern: string;
  concernBM: string;
  protocol: string;
  protocolBM: string;
  sessions: string;
  downtime: string;
  downtimeBM: string;
  device: string;
  doctor: string;
  beforeImage: string;
  afterImage: string;
}

export interface PromoSettings {
  holidayPromoActive: boolean;
  promoTitle: string;
  promoDiscountPercent: number;
  announcementTextEN: string;
  announcementTextBM: string;
}
