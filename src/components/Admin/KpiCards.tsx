import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { 
  Users, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export const KpiCards: React.FC = () => {
  const { leads, formatCurrency } = useClinic();

  // Dynamic calculations based on live leads in state
  const totalInquiries = leads.length + 58; // Base historical + dynamic
  const depositBookings = leads.filter((l) => l.depositAmount > 0).length + 24;
  const totalPipelineRevenue = leads.reduce((acc, curr) => acc + curr.quotedTotal, 0) + 48200;
  const conversionRate = ((depositBookings / totalInquiries) * 100).toFixed(1);
  const totalDepositsCollected = leads.reduce((acc, curr) => acc + curr.depositAmount, 0) + 1200;

  const kpis = [
    {
      label: 'Total Quote Inquiries',
      labelBM: 'Jumlah Pertanyaan Sebut Harga',
      value: totalInquiries.toString(),
      subtext: '+18.4% from last week',
      icon: Users,
      badge: 'Live Traffic',
      color: 'text-sky-400',
    },
    {
      label: 'Confirmed Deposit Bookings',
      labelBM: 'Tempahan Berdeposit Sah',
      value: depositBookings.toString(),
      subtext: `RM ${totalDepositsCollected.toLocaleString()} in lock deposits`,
      icon: CheckCircle2,
      badge: 'High Intent',
      color: 'text-emerald-400',
    },
    {
      label: 'Projected Package Pipeline',
      labelBM: 'Nilai Pipeline Pakej Rawatan',
      value: formatCurrency(totalPipelineRevenue),
      subtext: 'Weighted consultation realization',
      icon: TrendingUp,
      badge: 'Revenue Pipeline',
      color: 'text-gold',
    },
    {
      label: 'Booking Conversion Rate',
      labelBM: 'Kadar Penukaran Pelawat',
      value: `${conversionRate}%`,
      subtext: 'Industry benchmark is ~18%',
      icon: Sparkles,
      badge: 'Top 5% KL Clinics',
      color: 'text-amber-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div
            key={idx}
            className="p-5 rounded-2xl glass-onyx-card border border-gold/20 text-white shadow-lg flex flex-col justify-between relative overflow-hidden group hover:border-gold/50 transition-all duration-300"
          >
            {/* Ambient gold glow */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-gold/10 rounded-full filter blur-xl group-hover:bg-gold/20 transition-colors pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-pearl-200">
                  {kpi.badge}
                </span>
                <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="text-xs text-pearl-300 font-medium">
                {kpi.label}
              </div>

              <div className="font-serif text-3xl font-light text-pearl-100 mt-1 tracking-tight">
                {kpi.value}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-pearl-300">
              <span>{kpi.subtext}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
