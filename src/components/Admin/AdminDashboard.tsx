import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { KpiCards } from './KpiCards';
import { LeadPipelineTable } from './LeadPipelineTable';
import { PromoAndPriceEditor } from './PromoAndPriceEditor';
import { 
  Users, 
  Tag, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  LayoutDashboard,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { setViewMode, language } = useClinic();
  const [activeTab, setActiveTab] = useState<'pipeline' | 'pricing'>('pipeline');

  return (
    <div className="min-h-screen bg-obsidian-deep text-pearl-100 pb-24 font-sans selection:bg-gold selection:text-obsidian">
      {/* Top Admin Navigation Header */}
      <div className="border-b border-gold/20 bg-obsidian/90 backdrop-blur-xl sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setViewMode('patient');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gold hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Return to patient luxury website"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Patient View</span>
            </button>

            <div className="h-5 w-px bg-white/20 hidden sm:block" />

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl sm:text-2xl font-medium text-pearl-100">
                  Aurelia Executive Portal
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-gold text-obsidian px-2 py-0.5 rounded-full">
                  KL Live Demo
                </span>
              </div>
              <p className="text-[11px] text-pearl-400">
                Bangsar & Damansara Heights &bull; Patient Acquisition & Real-Time Pipeline
              </p>
            </div>
          </div>

          {/* Return to website pill */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-medium px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Cloud Sync Active</span>
            </span>

            <button
              onClick={() => {
                setViewMode('patient');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-gold-sheen px-4 py-2 rounded-full bg-gradient-to-r from-gold via-champagne-500 to-gold-deep text-obsidian text-xs font-bold uppercase tracking-wider shadow-gold-glow"
            >
              Exit to Patient View →
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Executive KPI Summary Cards */}
        <KpiCards />

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-5 py-3 rounded-2xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeTab === 'pipeline'
                ? 'bg-gold text-obsidian shadow-gold-glow font-bold'
                : 'text-pearl-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Patient Pipeline & WhatsApp Engine</span>
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-5 py-3 rounded-2xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 ${
              activeTab === 'pricing'
                ? 'bg-gold text-obsidian shadow-gold-glow font-bold'
                : 'text-pearl-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Holiday Promo & Live Price Editor</span>
          </button>
        </div>

        {/* Active Tab Content */}
        {activeTab === 'pipeline' ? <LeadPipelineTable /> : <PromoAndPriceEditor />}
      </div>
    </div>
  );
};
