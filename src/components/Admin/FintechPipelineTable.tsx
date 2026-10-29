import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { LeadStatus } from '../../types';
import { 
  Search, 
  MessageCircle, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Gift, 
  Sparkles,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface FintechPipelineTableProps {
  searchQuery?: string;
}

export const FintechPipelineTable: React.FC<FintechPipelineTableProps> = ({
  searchQuery = '',
}) => {
  const { leads, giftCards, updateLeadStatus, formatCurrency } = useClinic();
  const [filterType, setFilterType] = useState<'all' | 'full_paid' | 'deposit_paid' | 'gift_cards'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Combine Leads and Gift Cards for a unified command pipeline
  const unifiedItems = [
    ...leads.map((l) => ({
      type: 'lead' as const,
      id: l.id,
      name: l.patientName,
      phone: l.phone,
      branch: l.preferredBranch,
      date: l.appointmentDate,
      time: l.appointmentTime,
      itemTitle: l.packageTitle || l.selectedTreatments.join(', '),
      amount: l.paymentCommitment === 'full_upfront_5pct' ? l.quotedTotal : l.depositAmount,
      totalQuoted: l.quotedTotal,
      isFullPaid: l.paymentCommitment === 'full_upfront_5pct',
      status: l.status,
      paymentMethod: l.paymentProvider || l.paymentMethod,
      createdAt: l.createdAt,
    })),
    ...giftCards.map((g) => ({
      type: 'giftcard' as const,
      id: g.id,
      name: `${g.senderName} ➔ ${g.recipientName}`,
      phone: g.recipientPhone || g.senderPhone,
      branch: 'Digital Voucher (All Branches)' as const,
      date: g.createdAt.split('T')[0] || 'Today',
      time: 'Instant Delivery',
      itemTitle: `Aurelia Luxury Gift Card (${g.tierTitle})`,
      amount: g.amount,
      totalQuoted: g.amount,
      isFullPaid: true,
      status: 'Deposit Paid' as LeadStatus,
      paymentMethod: g.paymentProvider,
      createdAt: g.createdAt,
    })),
  ];

  // Filtering
  const filtered = unifiedItems.filter((item) => {
    // Type Filter
    if (filterType === 'full_paid' && (item.type !== 'lead' || !item.isFullPaid)) return false;
    if (filterType === 'deposit_paid' && (item.type !== 'lead' || item.isFullPaid)) return false;
    if (filterType === 'gift_cards' && item.type !== 'giftcard') return false;

    // Status Filter
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchPhone = item.phone.toLowerCase().includes(q);
      const matchTitle = item.itemTitle.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchTitle) return false;
    }

    return true;
  });

  const generateWhatsAppLink = (item: typeof unifiedItems[0]) => {
    const cleanPhone = item.phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Salam & Good day ${item.name}. This is Aurelia Clinic Concierge (Bangsar & Damansara Heights).\n\n` +
      `We have received your priority booking for: ${item.itemTitle}.\n` +
      `Appointment Slot: ${item.date} (${item.time})\n\n` +
      `Our physician team looks forward to welcoming you. Please let us know if you have any questions before your visit!`
    );
    return `https://wa.me/${cleanPhone}?text=${message}`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#EAEEF4] shadow-[0_8px_24px_rgba(15,23,42,0.03)] space-y-5 font-sans">
      
      {/* Table Top Controls & Filter Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Live Patient Quotes &amp; Gift Card Pipeline
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time synchronization across Bangsar &amp; Damansara Heights flagship branches
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-100">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterType === 'all'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            All Pipeline ({unifiedItems.length})
          </button>

          <button
            type="button"
            onClick={() => setFilterType('full_paid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterType === 'full_paid'
                ? 'bg-white text-emerald-700 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Full Paid ({unifiedItems.filter((i) => i.isFullPaid && i.type === 'lead').length})
          </button>

          <button
            type="button"
            onClick={() => setFilterType('deposit_paid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterType === 'deposit_paid'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            RM 50 Deposits ({unifiedItems.filter((i) => !i.isFullPaid && i.type === 'lead').length})
          </button>

          <button
            type="button"
            onClick={() => setFilterType('gift_cards')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterType === 'gift_cards'
                ? 'bg-white text-purple-700 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Gift Cards ({giftCards.length})
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">Patient / Buyer</th>
              <th className="py-3 px-4">Branch &amp; Slot</th>
              <th className="py-3 px-4">Selected Package / Voucher</th>
              <th className="py-3 px-4">Payment Commitment</th>
              <th className="py-3 px-4">Pipeline Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">
                  No patient pipeline entries match your filter criteria.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Patient Name & WhatsApp */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs shrink-0">
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <strong className="block text-slate-900 font-semibold text-xs">
                          {item.name}
                        </strong>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {item.phone}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Branch & Slot */}
                  <td className="py-3.5 px-4 text-slate-700">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold mb-1">
                      {item.branch}
                    </span>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{item.date} ({item.time})</span>
                    </div>
                  </td>

                  {/* Selected Package */}
                  <td className="py-3.5 px-4 text-slate-800">
                    <span className="font-medium block max-w-xs truncate" title={item.itemTitle}>
                      {item.itemTitle}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Total: {formatCurrency(item.totalQuoted)}
                    </span>
                  </td>

                  {/* Payment Type Badge */}
                  <td className="py-3.5 px-4">
                    {item.type === 'giftcard' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                        <Gift className="w-3 h-3 text-purple-600" />
                        <span>GIFT CARD — {formatCurrency(item.amount)}</span>
                      </span>
                    ) : item.isFullPaid ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>FULL PAID — {formatCurrency(item.amount)}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        <Clock className="w-3 h-3 text-blue-600" />
                        <span>RM 50 DEPOSIT PAID</span>
                      </span>
                    )}
                    <span className="block text-[10px] text-slate-400 mt-0.5">
                      Via {item.paymentMethod || 'Online Gateway'}
                    </span>
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-3.5 px-4">
                    {item.type === 'lead' ? (
                      <select
                        value={item.status}
                        onChange={(e) => updateLeadStatus(item.id, e.target.value as LeadStatus)}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-sm"
                      >
                        <option value="New Quote">New Quote</option>
                        <option value="Deposit Paid">Deposit Paid</option>
                        <option value="Consulted">Consulted</option>
                        <option value="Package Closed">Package Closed</option>
                      </select>
                    ) : (
                      <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg">
                        Voucher Issued
                      </span>
                    )}
                  </td>

                  {/* 1-Click WhatsApp Concierge */}
                  <td className="py-3.5 px-4 text-right">
                    <a
                      href={generateWhatsAppLink(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-all border border-emerald-200 shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp Concierge</span>
                    </a>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};
