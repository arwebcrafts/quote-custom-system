import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const { t, language } = useClinic();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Are all aesthetic procedures performed by licensed medical doctors?',
      qBM: 'Adakah semua prosedur estetik dikendalikan oleh doktor perubatan berlesen?',
      a: 'Yes, 100%. Under Ministry of Health (MOH) Malaysia guidelines, all lasers, ultrasound skin-tightening, and injectable treatments at Aurelia Clinic are performed exclusively by certified LCP (Letter of Credentialing and Privileging) medical aesthetic physicians. We do not delegate clinical procedures to beauticians or nursing assistants.',
      aBM: 'Ya, 100%. Mengikut garis panduan Kementerian Kesihatan Malaysia (KKM), semua rawatan laser, ultrasound dan suntikan di Klinik Aurelia dikendalikan sepenuhnya oleh doktor berdaftar LCP (Letter of Credentialing and Privileging). Kami tidak mewakilkan prosedur kepada jurusolek atau jururawat.'
    },
    {
      q: 'How does the online quotation and RM 50 booking deposit work?',
      qBM: 'Bagaimanakah sistem sebut harga atas talian dan deposit RM 50 berfungsi?',
      a: 'The RM 50 deposit is an instant slot reservation guarantee that secures your promotional package pricing and reserves the doctor suite. When you arrive for your appointment, the full RM 50 is deducted directly from your final invoice. If you decide not to proceed with treatment after consultation, the deposit covers your comprehensive Visia® skin assessment.',
      aBM: 'Deposit RM 50 adalah jaminan tempahan slot segera yang mengunci kadar promosi pakej dan bilik doktor. Apabila anda hadir ke klinik, jumlah RM 50 ini akan ditolak sepenuhnya daripada invois rawatan anda. Jika anda memilih tidak meneruskan rawatan, deposit merangkumi kos imbasan kulit Visia®.'
    },
    {
      q: 'Do you offer 0% interest installment plans in Malaysia?',
      qBM: 'Adakah anda menyediakan pelan ansuran tanpa faedah 0% di Malaysia?',
      a: 'Yes. We offer 0% interest installment plans up to 12 months with Maybank, CIMB, Public Bank, and HSBC credit cards. We also support Grab PayLater and Atome for flexible 3 to 4-month splits with zero interest.',
      aBM: 'Ya. Kami menyediakan pelan ansuran bulanan 0% sehingga 12 bulan untuk pemegang kad kredit Maybank, CIMB, Public Bank dan HSBC, serta Grab PayLater dan Atome untuk pecahan bayaran 3 ke 4 bulan tanpa faedah.'
    },
    {
      q: 'What is the expected recovery downtime for Fotona Pico Laser and Rejuran?',
      qBM: 'Berapakah tempoh masa rehat (downtime) untuk Laser Piko Fotona dan Rejuran?',
      a: 'Our StarWalker® Pico Laser features ultra-short picosecond pulses causing minimal thermal disruption; you can expect mild pinkness that resolves within 2 to 4 hours. Rejuran Healer micro-droplets typically flatten within 12 to 24 hours. You can wear mineral sunscreen and resume regular social activities the following day.',
      aBM: 'Laser Piko StarWalker® menghasilkan denyutan piko-saat yang amat pantas tanpa kesan haba berlebihan; kemerahan ringan reda dalam 2 ke 4 jam. Papul titisan halus Rejuran Healer biasanya meresap dalam 12 ke 24 jam. Anda boleh memakai pelindung matahari dan kembali beraktiviti pada keesokan harinya.'
    },
    {
      q: 'What is the difference between Bangsar and Damansara Heights flagships?',
      qBM: 'Apakah perbezaan antara cawangan Bangsar dan Damansara Heights?',
      a: 'Both locations feature identical US-FDA registered laser technology and accredited LCP physicians. Bangsar Flagship (Jalan Telawi) houses 6 private suites with dedicated valet parking. Damansara Heights (Plaza Batai) offers a quiet, boutique sanctuary setting specializing in cellular longevity and exosome therapies.',
      aBM: 'Kedua-dua lokasi dilengkapi peranti laser berdaftar FDA dan doktor LCP yang sama. Cawangan Utama Bangsar (Jalan Telawi) mempunyai 6 suite peribadi bersama parkir valet. Damansara Heights (Plaza Batai) menawarkan suasana butik eksklusif yang tenang dengan pengkhususan dalam terapi eksosom.'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold-deep text-xs font-bold uppercase tracking-widest mb-3 font-sans">
          <HelpCircle className="w-3.5 h-3.5 text-gold" />
          <span>{t.faqEyebrow}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-obsidian tracking-[-0.02em]">
          {t.faqTitle}
        </h2>
        <p className="font-sans text-xs sm:text-base text-obsidian/75 mt-3 leading-relaxed">
          {t.faqSub}
        </p>
      </div>

      <div className="space-y-3 font-sans">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="glass-pearl rounded-2xl border border-pearl-200 overflow-hidden transition-all duration-300"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
              >
                <span className="font-serif text-lg sm:text-xl font-medium text-obsidian">
                  {language === 'EN' ? faq.q : faq.qBM}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gold transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-obsidian/75 leading-relaxed border-t border-pearl-200/60 pt-3 animate-in fade-in duration-200">
                  {language === 'EN' ? faq.a : faq.aBM}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
