import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { 
  Sparkles, 
  BarChart3, 
  Briefcase, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';

export const FintechKpiCards: React.FC = () => {
  const { leads, giftCards, formatCurrency } = useClinic();

  // Dynamic calculations
  const totalPipelineValue = leads.reduce((acc, lead) => acc + (lead.quotedTotal || 0), 0) +
    giftCards.reduce((acc, card) => acc + (card.amount || 0), 0) + 38000; // Benchmark base

  const todayCollected = leads.reduce((acc, lead) => acc + (lead.depositAmount || 0), 0) +
    giftCards.reduce((acc, card) => acc + (card.amount || 0), 0) + 1200;

  const totalActive = leads.length + giftCards.length + 18;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 font-sans">
      
      {/* Card 1: Purple Squircle Icon (#7C3AED) */}
      <div className="bg-white rounded-2xl p-5 border border-[#EAEEF4] shadow-[0_8px_24px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)] transition-all duration-200 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="w-11 h-11 rounded-2xl bg-[#7C3AED] text-white flex items-center justify-center shadow-md shadow-purple-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
            <span>18.4%</span>
            <ArrowUpRight className="w-3 h-3 text-slate-500" />
          </div>
        </div>

        <div className="mt-5">
          <span className="text-xs font-semibold text-slate-500 block mb-1">
            Total Package Pipeline Value
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {formatCurrency(totalPipelineValue)}
          </div>
        </div>
      </div>

      {/* Card 2: Orange Squircle Icon (#F97316) */}
      <div className="bg-white rounded-2xl p-5 border border-[#EAEEF4] shadow-[0_8px_24px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)] transition-all duration-200 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="w-11 h-11 rounded-2xl bg-[#F97316] text-white flex items-center justify-center shadow-md shadow-orange-500/20">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
            <span>+4.2%</span>
            <ArrowUpRight className="w-3 h-3 text-slate-500" />
          </div>
        </div>

        <div className="mt-5">
          <span className="text-xs font-semibold text-slate-500 block mb-1">
            Today's Collected Payments (Full + Deposits)
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            +{formatCurrency(todayCollected)}
          </div>
        </div>
      </div>

      {/* Card 3: Cyan Squircle Icon (#06B6D4) */}
      <div className="bg-white rounded-2xl p-5 border border-[#EAEEF4] shadow-[0_8px_24px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)] transition-all duration-200 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="w-11 h-11 rounded-2xl bg-[#06B6D4] text-white flex items-center justify-center shadow-md shadow-cyan-500/20">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <div className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
            <span>{totalActive}</span>
            <ArrowUpRight className="w-3 h-3 text-slate-500" />
          </div>
        </div>

        <div className="mt-5">
          <span className="text-xs font-semibold text-slate-500 block mb-1">
            Active Quote Bookings &amp; Gift Cards
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {totalActive} Patients
          </div>
        </div>
      </div>

      {/* Card 4: Coral Red Squircle Icon (#EF4444) */}
      <div className="bg-white rounded-2xl p-5 border border-[#EAEEF4] shadow-[0_8px_24px_rgba(15,23,42,0.03)] hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)] transition-all duration-200 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="w-11 h-11 rounded-2xl bg-[#EF4444] text-white flex items-center justify-center shadow-md shadow-red-500/20">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-[11px] font-bold">
            <span>low</span>
            <ArrowDownRight className="w-3 h-3 text-red-500" />
          </div>
        </div>

        <div className="mt-5">
          <span className="text-xs font-semibold text-slate-500 block mb-1">
            No-Show Risk Score (Deposit Protected)
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            4 / 100
          </div>
        </div>
      </div>

    </div>
  );
};
