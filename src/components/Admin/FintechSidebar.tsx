import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import { 
  LayoutDashboard, 
  Users, 
  Gift, 
  Tag, 
  Cpu, 
  ChevronLeft,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export type AdminTab = 'dashboard' | 'pipeline' | 'giftcards' | 'promo' | 'ai-insights';

interface FintechSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
}

export const FintechSidebar: React.FC<FintechSidebarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const { setViewMode } = useClinic();

  const navItems: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5 shrink-0" />,
    },
    {
      id: 'pipeline',
      label: 'Patient Quotes & Pipeline',
      icon: <Users className="w-5 h-5 shrink-0" />,
    },
    {
      id: 'giftcards',
      label: 'Gift Cards Sold',
      icon: <Gift className="w-5 h-5 shrink-0" />,
    },
    {
      id: 'promo',
      label: 'Black Friday Promo Editor',
      icon: <Tag className="w-5 h-5 shrink-0" />,
    },
    {
      id: 'ai-insights',
      label: 'AI Skin Scanner Insights',
      icon: <Cpu className="w-5 h-5 shrink-0" />,
    },
  ];

  return (
    <aside className="w-64 lg:w-72 bg-[#0B0B0E] text-white flex flex-col justify-between shrink-0 min-h-screen p-5 lg:p-6 rounded-r-[28px] z-30 shadow-2xl font-sans">
      
      {/* Top Brand Logo & Collapse Icon */}
      <div>
        <div className="flex items-center justify-between pb-8 pt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white font-mono font-bold text-sm shadow-md">
              &lt;&gt;
            </div>
            <div>
              <span className="font-sans font-bold text-lg tracking-tight text-white block leading-none">
                Aurelia
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#8E8E98] font-medium">
                Command Hub
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setViewMode('patient');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-7 h-7 rounded-full bg-[#18181D] hover:bg-[#25252D] text-[#8E8E98] hover:text-white flex items-center justify-center transition-colors text-xs border border-white/5"
            title="Return to Patient View"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Menu List */}
        <nav className="space-y-1.5" aria-label="Admin Navigation">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-semibold tracking-wide transition-all duration-200 text-left ${
                  isActive
                    ? 'bg-white text-[#0B0B0E] shadow-lg shadow-white/10 font-bold scale-[1.02]'
                    : 'text-[#8E8E98] hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span className={isActive ? 'text-[#0B0B0E]' : 'text-[#8E8E98]'}>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Upgrade / Automation Active Card (Matching FintechX) */}
      <div className="mt-8 pt-4">
        <div className="p-4 rounded-2xl bg-[#18181D] border border-white/[0.08] relative overflow-hidden group shadow-xl">
          
          {/* Subtle Ambient Gold Glow */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-500/20 rounded-full filter blur-xl pointer-events-none" />

          {/* Glowing 3D Gold Medal / Star Icon */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center mx-auto mb-3">
            <div className="w-full h-full rounded-full bg-[#18181D] flex items-center justify-center">
              <span className="text-xl">⭐</span>
            </div>
          </div>

          <div className="text-center space-y-1">
            <div className="text-xs font-bold text-white tracking-wide">
              AR Webcrafts Pro
            </div>
            <p className="text-[11px] text-[#8E8E98] leading-tight pb-3">
              Automation &amp; WhatsApp Pipeline Live
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setViewMode('patient');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-[#F3ECE3] text-[#0B0B0E] text-xs font-bold tracking-wide font-sans transition-all duration-200 shadow-md flex items-center justify-center gap-1.5"
          >
            <span>Launch Patient View</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </aside>
  );
};
