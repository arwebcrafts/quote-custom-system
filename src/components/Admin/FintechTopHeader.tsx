import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { 
  Search, 
  Bell, 
  Download, 
  UserPlus, 
  ChevronDown 
} from 'lucide-react';
import { AdminTab } from './FintechSidebar';

interface FintechTopHeaderProps {
  activeTab: AdminTab;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSimulateLead: () => void;
  onExportCsv: () => void;
}

export const FintechTopHeader: React.FC<FintechTopHeaderProps> = ({
  activeTab,
  searchQuery,
  setSearchQuery,
  onSimulateLead,
  onExportCsv,
}) => {
  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'pipeline':
        return 'Patient Quotes & Pipeline';
      case 'giftcards':
        return 'Gift Cards Sold';
      case 'promo':
        return 'Black Friday Promo Editor';
      case 'ai-insights':
        return 'AI Skin Scanner Insights';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Rounded Navbar Pill (Matching FintechX Top Bar) */}
      <div className="bg-white rounded-2xl px-5 py-3 border border-[#EAEEF4] shadow-[0_4px_20px_rgba(15,23,42,0.02)] flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left Breadcrumb Name */}
        <div className="text-base font-bold text-slate-800 tracking-tight self-start sm:self-center">
          {getBreadcrumbTitle()}
        </div>

        {/* Center Search Bar & Right Profile Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-72 lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patient, +60 WhatsApp, or gift card..."
              className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] rounded-xl text-xs font-sans text-slate-800 border border-[#EAEEF4] focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Notification Bell with Purple Badge '4' */}
          <button 
            type="button"
            className="relative w-9 h-9 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#EAEEF4] flex items-center justify-center text-slate-600 transition-colors shrink-0"
            title="4 Pending Inquiries"
          >
            <Bell className="w-4 h-4 text-slate-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#7C3AED] text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
              4
            </span>
          </button>

          {/* Doctor Profile Avatar */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-[#EAEEF4] shrink-0">
            <div className="relative">
              <img
                src="/images/doctor_sophia.jpg"
                alt="Dr. Sophia Lim"
                className="w-8 h-8 rounded-full object-cover object-top border border-slate-200"
              />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -bottom-0.5 -right-0.5 border-2 border-white" />
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-slate-800 leading-none">
                Dr. Sophia Lim
              </div>
              <span className="text-[10px] text-slate-400 font-medium">
                Medical Director
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
          </div>
        </div>
      </div>

      {/* Main Section Header Row: Title, Subtitle, & Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Clinic Revenue &amp; Patient Command
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
            Welcome back, Dr. Sophia. Your clinic's online package pipeline is up <strong>18.4%</strong> this week.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onExportCsv}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-[#EAEEF4] shadow-sm transition-all duration-200 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={onSimulateLead}
            className="px-4 py-2 rounded-xl bg-[#0B0B0E] hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all duration-200 flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5 text-indigo-400" />
            <span>+ Simulate New Malaysian VIP Lead</span>
          </button>
        </div>
      </div>
    </div>
  );
};
