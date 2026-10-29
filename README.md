# AURELIA CLINIC KL — Medical Aesthetics & Longevity
### Luxury Treatment Quotation & Booking Engine + Live Clinic Admin Dashboard

A mobile-first flagship web application for prestigious medical aesthetics clinics, featuring an interactive dual-path treatment quotation configurator, Malaysian payment flow (FPX, GrabPay, TnG eWallet, DuitNow QR), bilingual localization (EN/BM), and an executive clinic portal.

---

## ✨ Key Features

### 1. Visual Design Language
- **Quiet Luxury Editorial Meets Liquid Glassmorphic Pearl UI** (inspired by Chanel Beauty, Aesop, and Apple VisionOS glass surfaces).
- Alabaster Pearl (`#FAF7F2`), Silk Champagne (`#F3ECE3`), and Rose-Champagne Gold (`#C8A27E`) accents.
- Deep Velvet Onyx (`#12100F`) for dark luxury mode surfaces.
- Editorial typography pairing: **Cormorant Garamond** serif and **Plus Jakarta Sans** geometric sans-serif.
- Sweeping metallic gold sheen button physics (`btn-gold-sheen`), ambient floating cards, and celebratory confetti.

### 2. Dual-Path Interactive Quotation Engine
- **Tab A: Help Me Choose (60s Skin & Glow Assessment)**
  - 3-step visual diagnostic quiz matching patient concerns to recommended compounded clinical protocols.
  - Transparent pricing comparisons (Standard crossed out vs Online instant quote vs 0% interest monthly installment).
  - Flexible commitment options: Complete VIP Protocol Package, First-Trial Single Session, or Doctor Consultation Only (waived upon treatment).
- **Tab B: Direct Menu & Custom Bundle Builder**
  - Interactive multi-select treatment chips categorized by Lasers, Injectables & Biostimulators, and Non-Surgical Lifting (HIFU/Ultrasound).
  - Sticky live summary bar with **automatic 15% Multi-Treatment Bundle Discount** when 2 or more treatments are selected.

### 3. Malaysian Slot Scheduling & Payment Flow
- Preferred branch selection (*Bangsar Flagship* on Jalan Telawi or *Damansara Heights* at Plaza Batai).
- Interactive horizontal date scroller + Morning, Afternoon, and Evening consultation slots.
- Tailored payment options for Malaysia:
  - **Option 1:** Online RM 50 deposit (GrabPay, Touch 'n Go eWallet, FPX Online Banking, Card via Stripe).
  - **Option 2:** National DuitNow Instant QR Transfer modal with account details and 1-click WhatsApp verification.
  - **Option 3:** Reserve Slot & Pay at Clinic Counter.
- Instant synchronization with local storage and the Executive Clinic Portal.

### 4. Interactive Before & After Transformation Slider
- Split comparison drag handle comparing Before (Baseline) vs After (Completed Protocol).
- Filterable by concern: Pigmentation, Acne Scars, V-Shape Jawline, and Korean Glass Skin.
- Transparent clinical parameters: session counts, recovery downtime, approved devices, and supervising MOH LCP doctor.

### 5. Global Controls
- **Bilingual Toggle (EN \| BM):** Instant state switch between English and Bahasa Malaysia across all headings, clinical tags, calculator questions, and form labels.
- **Demo Mode Switcher Pill (`[ ✨ Patient Experience ]` ↔ `[ 📊 Clinic Owner Admin Panel ]`):** 1-tap view switch for clinic owners and evaluators.

### 6. Executive Clinic Owner Admin Portal
- **KPI Metrics:** Total Quote Inquiries, Confirmed Deposit Bookings, Projected Package Pipeline, and Conversion Rate.
- **Live Patient Pipeline Table:** Filter by status (`New Quote`, `Deposit Paid`, `Consulted`, `Package Closed`), search by name/mobile/treatment, and view full patient dossiers.
- **1-Click WhatsApp Trigger:** Opens `wa.me` with a personalized, pre-drafted Malaysian clinic confirmation message.
- **Holiday Flash Promo & Live Price Editor:** Toggle the top urgency announcement ribbon ON/OFF and edit base treatment rates in real time with instant site-wide propagation.
- **Simulate Malaysian VIP Lead & CSV Export:** 1-click lead injection and one-click pipeline download.

---

## 🛠️ Tech Stack

- **Framework:** React 18 with TypeScript
- **Bundler:** Vite 5
- **Styling:** Tailwind CSS 3 with custom luxury glassmorphism utilities
- **Icons:** Lucide React
- **Celebration Effects:** Canvas Confetti
- **Typography:** Google Fonts (Cormorant Garamond & Plus Jakarta Sans)

---

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/arwebcrafts/quote-custom-system.git
cd quote-custom-system

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Build for Production

```bash
npm run build
```

The production output will be generated inside the `dist/` directory.

---

## 📄 License

Proprietary — Developed for Aurelia Clinic KL. All rights reserved.
