import React from 'react';
import { useClinic } from '../context/ClinicContext';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  PhoneCall, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const DoctorProfile: React.FC = () => {
  const { t, language } = useClinic();

  const clinicSpaces = [
    {
      title: 'Private Aesthetic Consultation Suite',
      titleBM: 'Bilik Konsultasi Estetik Peribadi',
      desc: 'Acoustically isolated consultation rooms with natural daylight calibration for genuine pigment skin diagnosis.',
      descBM: 'Bilik perbincangan bertebat akustik dengan kalibrasi cahaya siang semulajadi.',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=85',
      location: 'Bangsar Flagship'
    },
    {
      title: 'VIP Cellular Recovery Pods',
      titleBM: 'Pod Pemulihan Selular VIP',
      desc: 'Medical-grade zero-gravity leather recliners paired with HEPA-14 medical filtration and LED photobiomodulation.',
      descBM: 'Kerusi rehat graviti-sifar bersama penapisan udara HEPA-14 dan fototerapi LED.',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=85',
      location: 'Damansara Heights'
    },
    {
      title: 'Sterile Clinical Procedure Suite',
      titleBM: 'Bilik Prosedur Klinikal Steril',
      desc: 'Rigid hospital-grade aseptic environments housing our genuine Fotona StarWalker & Ultraformer III devices.',
      descBM: 'Ruang aseptik gred hospital menempatkan peralatan Fotona StarWalker dan Ultraformer III.',
      image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=85',
      location: 'Bangsar Flagship'
    }
  ];

  return (
    <section id="doctors" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20 scroll-mt-24">
      {/* 1. Doctor Spotlight */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold-deep text-xs font-bold uppercase tracking-widest mb-3 font-sans">
            <Award className="w-3.5 h-3.5 text-gold" />
            <span>{t.doctorsEyebrow}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-obsidian tracking-[-0.02em]">
            {t.doctorsTitle}
          </h2>
          <p className="font-sans text-xs sm:text-base text-obsidian/75 mt-3 leading-relaxed">
            {t.doctorsSub}
          </p>
        </div>

        {/* Doctor Profiles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dr. Sophia Lim */}
          <div className="glass-pearl-strong rounded-3xl p-6 sm:p-8 border border-white/95 shadow-pearl-glass flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-full sm:w-48 aspect-[3/4] rounded-2xl overflow-hidden shrink-0 shadow-md border-2 border-white bg-obsidian-deep">
              <img
                src="https://images.unsplash.com/photo-1594824813633-89025e98f7e7?auto=format&fit=crop&w=800&q=85"
                alt="Dr. Sophia Lim, MD - Aurelia Clinic Medical Director"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gold/15 text-gold-deep text-[10px] font-bold uppercase tracking-wider font-sans border border-gold/30">
                <ShieldCheck className="w-3 h-3 text-gold" />
                <span>MOH LCP License #LCP-A-2018-042</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-obsidian">
                {t.dr1Name}
              </h3>
              <p className="text-xs uppercase font-bold tracking-wider text-gold-deep font-sans">
                {t.dr1Title}
              </p>
              <p className="text-xs font-medium text-obsidian/80 font-sans italic border-l-2 border-gold pl-2.5">
                {t.dr1Creds}
              </p>
              <p className="text-xs sm:text-sm text-obsidian/70 font-sans leading-relaxed">
                {t.dr1Bio}
              </p>
            </div>
          </div>

          {/* Dr. Marcus Tan */}
          <div className="glass-pearl-strong rounded-3xl p-6 sm:p-8 border border-white/95 shadow-pearl-glass flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-full sm:w-48 aspect-[3/4] rounded-2xl overflow-hidden shrink-0 shadow-md border-2 border-white bg-obsidian-deep">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=85"
                alt="Dr. Marcus Tan, MBBS - Aurelia Clinic Senior Aesthetic Physician"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gold/15 text-gold-deep text-[10px] font-bold uppercase tracking-wider font-sans border border-gold/30">
                <ShieldCheck className="w-3 h-3 text-gold" />
                <span>MOH LCP License #LCP-A-2020-119</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-obsidian">
                {t.dr2Name}
              </h3>
              <p className="text-xs uppercase font-bold tracking-wider text-gold-deep font-sans">
                {t.dr2Title}
              </p>
              <p className="text-xs font-medium text-obsidian/80 font-sans italic border-l-2 border-gold pl-2.5">
                {t.dr2Creds}
              </p>
              <p className="text-xs sm:text-sm text-obsidian/70 font-sans leading-relaxed">
                {t.dr2Bio}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Clinic Architectural Ambiance Tour */}
      <div id="ambiance">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold-deep text-xs font-bold uppercase tracking-widest mb-3 font-sans">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>{t.ambianceEyebrow}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-obsidian tracking-[-0.02em]">
            {t.ambianceTitle}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-obsidian/75 mt-2">
            {t.ambianceSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clinicSpaces.map((space, idx) => (
            <div
              key={idx}
              className="glass-pearl rounded-3xl overflow-hidden border border-white/95 shadow-pearl-glass group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/11] overflow-hidden bg-obsidian-deep">
                  <img
                    src={space.image}
                    alt={space.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-obsidian-deep/80 text-gold text-[10px] font-bold uppercase tracking-wider font-sans backdrop-blur-md border border-gold/30">
                    {space.location}
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-serif text-xl font-medium text-obsidian group-hover:text-gold transition-colors">
                    {language === 'EN' ? space.title : space.titleBM}
                  </h4>
                  <p className="font-sans text-xs text-obsidian/70 mt-2 leading-relaxed">
                    {language === 'EN' ? space.desc : space.descBM}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Floating / Inline WhatsApp Concierge Action Strip */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-obsidian-deep via-obsidian to-obsidian-deep text-white border border-gold/30 shadow-onyx-depth flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <PhoneCall className="w-7 h-7" />
          </div>
          <div>
            <h4 className="font-serif text-xl sm:text-2xl font-light text-pearl-100">
              {language === 'EN' ? 'Prefer a Confidential WhatsApp Inquiry?' : 'Ingin Bertanya Terus Melalui WhatsApp?'}
            </h4>
            <p className="font-sans text-xs text-pearl-300 mt-0.5">
              {language === 'EN' 
                ? 'Our Senior Medical Concierge team responds within 5 minutes during clinic operating hours.'
                : 'Pasukan konsierj perubatan kami membalas dalam tempoh 5 minit waktu operasi klinik.'}
            </p>
          </div>
        </div>

        <a
          href="https://wa.me/60123456789?text=Hello%20Aurelia%20Clinic%20KL,%20I%20would%20like%20to%20inquire%20about%20a%20doctor%20consultation."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold-sheen px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shrink-0 whitespace-nowrap"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Chat on WhatsApp (+60 12-345 6789)</span>
        </a>
      </div>
    </section>
  );
};
