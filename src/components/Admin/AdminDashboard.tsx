import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { FintechSidebar, AdminTab } from './FintechSidebar';
import { FintechTopHeader } from './FintechTopHeader';
import { FintechKpiCards } from './FintechKpiCards';
import { FintechChartsRow } from './FintechChartsRow';
import { FintechPipelineTable } from './FintechPipelineTable';
import { FintechGiftCardsLedger } from './FintechGiftCardsLedger';
import { FintechPromoEditor } from './FintechPromoEditor';
import { FintechAiInsights } from './FintechAiInsights';

export const AdminDashboard: React.FC = () => {
  const { 
    leads, 
    addNewLead, 
    addToast 
  } = useClinic();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Simulate a live Malaysian VIP lead arriving in real time
  const handleSimulateLead = () => {
    const vipNames = [
      'Tengku Nurul Aisyah',
      'Datin Melissa Kwan',
      'Dato\' Kenneth Tan',
      'Puan Sri Cheryl Low',
      'Dr. Ariff Iskandar',
      'Serena Wong'
    ];
    const protocols = [
      'Fotona StarWalker® Pico Laser + Exosomes',
      'Ultraformer III® 7D HIFU V-Shape Lift',
      'Profhilo® + Rejuran® Salmon DNA Glass Skin',
      'Sylfirm X™ Dual RF Microneedling'
    ];
    const branches = ['Bangsar Flagship' as const, 'Damansara Heights' as const];

    const randomName = vipNames[Math.floor(Math.random() * vipNames.length)];
    const randomProtocol = protocols[Math.floor(Math.random() * protocols.length)];
    const randomBranch = branches[Math.floor(Math.random() * branches.length)];
    const isFullPaid = Math.random() > 0.4;
    const totalAmount = 2188;

    addNewLead({
      patientName: randomName,
      phone: `+60 1${Math.floor(Math.random() * 8 + 2)}-${Math.floor(Math.random() * 900 + 100)} ${Math.floor(Math.random() * 9000 + 1000)}`,
      email: `${randomName.toLowerCase().replace(/[^a-z]/g, '')}@gmail.com`,
      preferredBranch: randomBranch,
      appointmentDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      appointmentTime: '02:45 PM',
      flowType: 'custom_builder',
      selectedTreatments: [randomProtocol],
      packageTitle: randomProtocol,
      pricingOption: isFullPaid ? 'full_package' : 'custom_bundle',
      paymentCommitment: isFullPaid ? 'full_upfront_5pct' : 'deposit_50',
      quotedTotal: isFullPaid ? 2079 : totalAmount,
      depositAmount: isFullPaid ? 2079 : 50,
      paymentMethod: 'deposit_online',
      paymentProvider: isFullPaid ? 'Stripe (Visa/Mastercard/Wise)' : 'Google Pay',
      paymentStatus: 'Paid',
      status: 'Deposit Paid',
      notes: 'VIP guest from Instagram Ads. Wants private suite.',
    });

    addToast(
      'New Malaysian VIP Lead Arrived!',
      `${randomName} booked ${randomProtocol} (${isFullPaid ? 'Full RM 2,079 Paid' : 'RM 50 Deposit Paid'}).`,
      'gold'
    );
  };

  // Export pipeline leads as CSV
  const handleExportCsv = () => {
    const headers = 'ID,Patient Name,Phone,Email,Branch,Date,Time,Package,Total (RM),Paid (RM),Provider,Status\n';
    const rows = leads.map((l) => 
      `"${l.id}","${l.patientName}","${l.phone}","${l.email || ''}","${l.preferredBranch}","${l.appointmentDate}","${l.appointmentTime}","${l.packageTitle || l.selectedTreatments.join(', ')}",${l.quotedTotal},${l.depositAmount},"${l.paymentProvider || ''}","${l.status}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Aurelia_Clinic_Pipeline_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('CSV Export Ready', 'Downloaded pipeline leads successfully.', 'gold');
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-800 flex flex-col md:flex-row font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* 1. Left Fixed Sidebar (260px Matte Obsidian #0B0B0E) */}
      <FintechSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* 2. Main Canvas (Crisp Alabaster Gray #F4F6F9) */}
      <main className="flex-1 p-5 sm:p-8 lg:p-10 space-y-7 overflow-y-auto max-w-[1600px]">
        
        {/* Top Bar & Section Header */}
        <FintechTopHeader
          activeTab={activeTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSimulateLead={handleSimulateLead}
          onExportCsv={handleExportCsv}
        />

        {/* Dynamic Tab Body */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Row 1: The 4 FintechX KPI Cards */}
            <FintechKpiCards />

            {/* Row 2: The 2 FintechX Charts (Spline Wave & Donut) */}
            <FintechChartsRow />

            {/* Row 3: Live Patient & Gift Card Pipeline Table */}
            <FintechPipelineTable searchQuery={searchQuery} />
          </div>
        )}

        {activeTab === 'pipeline' && (
          <div className="animate-in fade-in duration-300">
            <FintechPipelineTable searchQuery={searchQuery} />
          </div>
        )}

        {activeTab === 'giftcards' && (
          <div className="animate-in fade-in duration-300">
            <FintechGiftCardsLedger />
          </div>
        )}

        {activeTab === 'promo' && (
          <div className="animate-in fade-in duration-300">
            <FintechPromoEditor />
          </div>
        )}

        {activeTab === 'ai-insights' && (
          <div className="animate-in fade-in duration-300">
            <FintechAiInsights />
          </div>
        )}

      </main>
    </div>
  );
};
