import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { BookingLead, LeadStatus } from '../../types';
import { 
  Search, 
  Filter, 
  PhoneCall, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  CheckCircle2, 
  FileSpreadsheet, 
  Sparkles, 
  ExternalLink, 
  MoreHorizontal, 
  Trash2, 
  Eye,
  X,
  CreditCard
} from 'lucide-react';

export const LeadPipelineTable: React.FC = () => {
  const { 
    leads, 
    updateLeadStatus, 
    deleteLead, 
    formatCurrency, 
    addNewLead, 
    addToast 
  } = useClinic();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus | 'All'>('All');
  const [activeLeadModal, setActiveLeadModal] = useState<BookingLead | null>(null);

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      (lead.packageTitle && lead.packageTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      lead.selectedTreatments.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = selectedStatus === 'All' || lead.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // 1-Click WhatsApp Trigger
  const handleSendWhatsApp = (lead: BookingLead) => {
    // Clean phone number for Malaysian wa.me
    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
    const formattedPhone = cleanPhone.startsWith('60') ? cleanPhone : `60${cleanPhone.replace(/^0+/, '')}`;

    const message = encodeURIComponent(
      `Hello ${lead.patientName},\n\n` +
      `This is Dr. Sophia Lim's Clinical Concierge team from Aurelia Clinic KL (${lead.preferredBranch}).\n\n` +
      `We have securely logged your priority consultation reservation:\n` +
      `• Scheduled Date: ${lead.appointmentDate} at ${lead.appointmentTime}\n` +
      `• Selected Protocol: ${lead.packageTitle || lead.selectedTreatments.join(', ')}\n` +
      `• Quoted Rate: RM ${lead.quotedTotal.toLocaleString()}\n` +
      `• Booking Deposit: RM ${lead.depositAmount} (${lead.paymentStatus} via ${lead.paymentProvider || lead.paymentMethod})\n\n` +
      `Complimentary valet parking is ready at our private entrance. If you have any medical queries prior to your session, please reply here directly.`
    );

    window.open(`https://wa.me/${formattedPhone}?text=${message}`, '_blank');
    addToast('WhatsApp Triggered', `Pre-drafted confirmation opened for ${lead.patientName}.`, 'success');
  };

  // Simulate a New Malaysian VIP Lead with 1 Click
  const handleSimulateLead = () => {
    const vipNames = [
      { name: 'Tengku Nadia Binti Al-Idrus', phone: '+60 12-884 9231', branch: 'Damansara Heights' as const, pkg: 'Aurelia Contour Royale™ V-Shape SMAS Elevation', price: 2688 },
      { name: 'Dato\' Colin Lim', phone: '+60 19-221 4400', branch: 'Bangsar Flagship' as const, pkg: 'Aurelia Luminescence™ Melasma & Pigment Protocol', price: 2188 },
      { name: 'Mei Ling Chong', phone: '+60 17-662 1099', branch: 'Bangsar Flagship' as const, pkg: 'Hydro-Lustre™ Glass Skin & Exosome Bioluminescent Protocol', price: 1988 },
    ];
    const pick = vipNames[Math.floor(Math.random() * vipNames.length)];

    addNewLead({
      patientName: pick.name,
      phone: pick.phone,
      email: `${pick.name.toLowerCase().replace(/[^a-z]/g, '')}@vip.com.my`,
      preferredBranch: pick.branch,
      appointmentDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      appointmentTime: '02:30 PM',
      flowType: 'quiz_recommended',
      packageTitle: pick.pkg,
      selectedTreatments: [pick.pkg],
      pricingOption: 'full_package',
      quotedTotal: pick.price,
      depositAmount: 50,
      paymentMethod: 'deposit_online',
      paymentProvider: 'Touch \'n Go eWallet',
      paymentStatus: 'Paid',
      status: 'Deposit Paid',
      notes: 'VIP Client referral. Requires private suite and skin analysis with Dr. Sophia Lim.',
    });

    addToast('New Malaysian VIP Lead Injected', `${pick.name} added to live pipeline.`, 'gold');
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['ID,Patient Name,Phone,Email,Branch,Appointment Date,Time,Protocol,Quoted Total,Deposit,Payment Status,Status,Created At'];
    const rows = leads.map((l) => 
      `"${l.id}","${l.patientName}","${l.phone}","${l.email || ''}","${l.preferredBranch}","${l.appointmentDate}","${l.appointmentTime}","${l.packageTitle || l.selectedTreatments.join('; ')}","${l.quotedTotal}","${l.depositAmount}","${l.paymentStatus}","${l.status}","${l.createdAt}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aurelia_leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('CSV Exported', 'Full patient acquisition pipeline downloaded as CSV.', 'info');
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'New Quote':
        return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
      case 'Deposit Paid':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Consulted':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Package Closed':
        return 'bg-gold/25 text-gold border-gold/40';
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Filter & Quick Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-pearl-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patient name, mobile (+60), or treatment..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-pearl-100 placeholder-pearl-400 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
          />
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Simulate Malaysian VIP Lead */}
          <button
            onClick={handleSimulateLead}
            className="px-3.5 py-2 rounded-xl bg-gold/15 hover:bg-gold/25 text-gold border border-gold/40 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>+ Simulate New Malaysian VIP Lead</span>
          </button>

          {/* Export CSV */}
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-pearl-200 border border-white/15 text-xs font-medium flex items-center gap-1.5 transition-all"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {(['All', 'Deposit Paid', 'New Quote', 'Consulted', 'Package Closed'] as (LeadStatus | 'All')[]).map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatus(st)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedStatus === st
                ? 'bg-gold text-obsidian font-bold shadow-sm'
                : 'bg-white/5 hover:bg-white/10 text-pearl-300 border border-white/10'
            }`}
          >
            {st} {st === 'All' ? `(${leads.length})` : `(${leads.filter((l) => l.status === st).length})`}
          </button>
        ))}
      </div>

      {/* Leads Table Container */}
      <div className="rounded-2xl glass-onyx-card border border-gold/20 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-pearl-200">
            <thead className="bg-white/5 uppercase text-[10px] tracking-wider text-pearl-300 font-semibold border-b border-white/10">
              <tr>
                <th className="py-3.5 px-4">Patient / Contact</th>
                <th className="py-3.5 px-4">Branch & Slot</th>
                <th className="py-3.5 px-4">Treatment / Package</th>
                <th className="py-3.5 px-4">Quoted & Deposit</th>
                <th className="py-3.5 px-4">Pipeline Status</th>
                <th className="py-3.5 px-4 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-pearl-400">
                    No patient records found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors group">
                    {/* Patient & Mobile */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-pearl-100 flex items-center gap-2">
                        <span>{lead.patientName}</span>
                        {lead.id.startsWith('aur-lead-') && (
                          <span className="text-[9px] uppercase font-bold text-gold bg-gold/10 px-1 rounded">
                            Live
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-pearl-300 font-mono mt-0.5">
                        {lead.phone}
                      </div>
                      {lead.email && (
                        <div className="text-[10px] text-pearl-400 truncate max-w-[160px]">
                          {lead.email}
                        </div>
                      )}
                    </td>

                    {/* Branch & Slot */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-pearl-100 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>{lead.preferredBranch}</span>
                      </div>
                      <div className="text-[11px] text-pearl-300 mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-pearl-400" />
                        <span>{lead.appointmentDate} @ {lead.appointmentTime}</span>
                      </div>
                    </td>

                    {/* Protocol */}
                    <td className="py-4 px-4">
                      <div className="text-pearl-100 font-medium line-clamp-1 max-w-xs">
                        {lead.packageTitle || lead.selectedTreatments.join(' + ')}
                      </div>
                      <div className="text-[10px] text-pearl-400 capitalize mt-0.5">
                        Flow: {lead.flowType.replace('_', ' ')}
                      </div>
                    </td>

                    {/* Quoted Total & Deposit */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-serif text-sm font-medium text-gold">
                        {formatCurrency(lead.quotedTotal)}
                      </div>
                      <div className="text-[10px] mt-0.5">
                        {lead.depositAmount > 0 ? (
                          <span className="text-emerald-400 font-medium">
                            Deposit: RM {lead.depositAmount} ({lead.paymentProvider || 'Paid'})
                          </span>
                        ) : (
                          <span className="text-pearl-400">Pay at Counter</span>
                        )}
                      </div>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                        className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border bg-obsidian-deep focus:outline-none focus:ring-1 focus:ring-gold cursor-pointer ${getStatusBadge(lead.status)}`}
                      >
                        <option value="New Quote">New Quote</option>
                        <option value="Deposit Paid">Deposit Paid</option>
                        <option value="Consulted">Consulted</option>
                        <option value="Package Closed">Package Closed</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {/* 1-Click WhatsApp Confirmation (Requested in Prompt) */}
                        <button
                          onClick={() => handleSendWhatsApp(lead)}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 shadow-sm transition-all"
                          title="Send pre-filled WhatsApp confirmation message"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">WhatsApp</span>
                        </button>

                        {/* View Lead Details */}
                        <button
                          onClick={() => setActiveLeadModal(lead)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-pearl-300 hover:text-white transition-colors"
                          title="View complete notes & metadata"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Delete Lead */}
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-pearl-400 hover:text-rose-400 transition-colors"
                          title="Remove record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Details Modal */}
      {activeLeadModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-deep/80 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
        >
          <div className="relative w-full max-w-lg rounded-3xl glass-onyx text-white p-6 sm:p-7 border border-gold/40 shadow-onyx-depth">
            <button
              onClick={() => setActiveLeadModal(null)}
              className="absolute top-5 right-5 text-pearl-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold">
                Patient Consultation Dossier
              </span>
              <h3 id="lead-modal-title" className="font-serif text-2xl font-medium text-pearl-100 mt-1">
                {activeLeadModal.patientName}
              </h3>
              <p className="text-xs text-pearl-300 font-mono">{activeLeadModal.phone}</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-pearl-300">Preferred Clinic:</span>
                <strong className="text-pearl-100">{activeLeadModal.preferredBranch}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-pearl-300">Appointment Slot:</span>
                <strong className="text-pearl-100">{activeLeadModal.appointmentDate} @ {activeLeadModal.appointmentTime}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-pearl-300">Quoted Total:</span>
                <strong className="text-gold font-serif text-base">{formatCurrency(activeLeadModal.quotedTotal)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-pearl-300">Deposit Paid:</span>
                <strong className="text-emerald-400">
                  RM {activeLeadModal.depositAmount} ({activeLeadModal.paymentProvider || activeLeadModal.paymentMethod})
                </strong>
              </div>
              <div className="pt-2 border-t border-white/10">
                <span className="text-pearl-300 block mb-1">Selected Protocols:</span>
                <div className="bg-black/30 p-2.5 rounded-lg text-pearl-100 text-[11px] font-mono leading-relaxed">
                  {activeLeadModal.packageTitle || activeLeadModal.selectedTreatments.join(', ')}
                </div>
              </div>
              {activeLeadModal.notes && (
                <div className="pt-2 border-t border-white/10">
                  <span className="text-pearl-300 block mb-1">Clinical Notes & Allergies:</span>
                  <p className="bg-black/30 p-2.5 rounded-lg text-amber-200 text-xs italic">
                    "{activeLeadModal.notes}"
                  </p>
                </div>
              )}
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => {
                  handleSendWhatsApp(activeLeadModal);
                  setActiveLeadModal(null);
                }}
                className="flex-1 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Open WhatsApp</span>
              </button>
              <button
                onClick={() => setActiveLeadModal(null)}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-pearl-200 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
