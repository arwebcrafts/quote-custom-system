import React from 'react';
import { useClinic } from '../context/ClinicContext';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export const SocialProof: React.FC = () => {
  const { t, language } = useClinic();

  const reviews = [
    {
      name: 'Datin Serena Wong',
      role: 'Bangsar Flagship Patient',
      procedure: 'Fotona 4D + Profhilo Bio-Remodelling',
      stars: 5,
      date: '3 weeks ago',
      comment: 'The level of clinical precision at Aurelia is unmatched in Kuala Lumpur. Dr. Sophia Lim took 45 minutes to explain my skin anatomy before touching my face. My cheekbones look lifted and my skin has that youthful glass translucency without looking “done”. Total peace of mind.',
      commentBM: 'Tahap ketepatan klinikal di Aurelia tiada tandingan di Kuala Lumpur. Dr. Sophia Lim meluangkan masa 45 minit menerangkan struktur kulit saya sebelum memulakan rawatan. Pipi saya kelihatan terangkat dan kulit berseri semulajadi.',
    },
    {
      name: 'Dr. Farhana Rashid',
      role: 'Damansara Heights Patient',
      procedure: 'Sylfirm X RF + Rejuran Healer',
      stars: 5,
      date: '1 month ago',
      comment: 'As a medical professional myself, I am extremely particular with sterilization and physician credentials. Aurelia only uses genuine MDA-approved cartridges and genuine salmon DNA polynucleotides. My acne scars are virtually gone.',
      commentBM: 'Sebagai seorang doktor sendiri, saya sangat teliti dengan aspek pensterilan dan kelayakan doktor. Aurelia hanya menggunakan kartrij tulen kelulusan MDA. Parut jerawat saya pudar sepenuhnya.',
    },
    {
      name: 'Brandon Tan',
      role: 'Bangsar Flagship Patient',
      procedure: 'Fotona StarWalker Pico Laser (3 Sessions)',
      stars: 5,
      date: '2 weeks ago',
      comment: 'Used the instant online quotation tool to book my slot and paid the RM 50 deposit via GrabPay. Everything was seamless! The clinic is architecturally stunning, and the laser removed sun spots I’ve had for 7 years in just three sessions.',
      commentBM: 'Saya guna kalkulator sebut harga atas talian dan bayar deposit RM 50 melalui GrabPay. Semuanya sangat lancar! Tompok hitam matahari yang saya ada selama 7 tahun pudar hanya dalam 3 sesi.',
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold-deep text-xs font-bold uppercase tracking-widest mb-3 font-sans">
          <Star className="w-3.5 h-3.5 text-gold fill-current" />
          <span>{t.testimonialsEyebrow}</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-light text-obsidian tracking-[-0.02em]">
          {t.testimonialsTitle}
        </h2>
        <p className="font-sans text-xs sm:text-base text-obsidian/75 mt-3 leading-relaxed">
          {t.testimonialsSub}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {reviews.map((rev, idx) => (
          <div
            key={idx}
            className="glass-pearl-strong rounded-3xl p-6 sm:p-7 border border-white/95 shadow-pearl-glass flex flex-col justify-between relative group hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-amber-500">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] text-obsidian/50 font-sans">
                  {rev.date}
                </span>
              </div>

              <p className="font-sans text-xs sm:text-sm text-obsidian/80 leading-relaxed italic">
                "{language === 'EN' ? rev.comment : rev.commentBM}"
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-pearl-200/80 flex items-center justify-between">
              <div>
                <h4 className="font-serif text-base font-semibold text-obsidian">
                  {rev.name}
                </h4>
                <p className="text-[10px] uppercase tracking-wider text-obsidian/50 font-sans font-medium">
                  {rev.role}
                </p>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded font-sans">
                Verified Result
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
