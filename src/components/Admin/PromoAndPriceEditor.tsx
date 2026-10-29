import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { 
  Sparkles, 
  Tag, 
  DollarSign, 
  Save, 
  RotateCcw, 
  AlertCircle, 
  Check, 
  Megaphone,
  Eye
} from 'lucide-react';

export const PromoAndPriceEditor: React.FC = () => {
  const { 
    treatments, 
    updateTreatmentPrice, 
    promoSettings, 
    updatePromoSettings, 
    formatCurrency, 
    resetToDefaults, 
    addToast 
  } = useClinic();

  // Local state for prices being edited
  const [editingPrices, setEditingPrices] = useState<{ [id: string]: { base: number; original: number } }>(() => {
    const map: { [id: string]: { base: number; original: number } } = {};
    treatments.forEach((t) => {
      map[t.id] = { base: t.basePrice, original: t.originalPrice };
    });
    return map;
  });

  const handlePriceChange = (id: string, field: 'base' | 'original', val: string) => {
    const num = parseInt(val) || 0;
    setEditingPrices((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: num,
      },
    }));
  };

  const handleSavePrice = (id: string) => {
    const item = editingPrices[id];
    if (!item) return;
    updateTreatmentPrice(id, item.base, item.original);
  };

  const handleTogglePromo = (checked: boolean) => {
    updatePromoSettings({ holidayPromoActive: checked });
  };

  return (
    <div className="space-y-8 font-sans">
      {/* 1. Live Holiday Promo Banner Switcher */}
      <div className="rounded-2xl glass-onyx-card border border-gold/30 p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold/20 text-gold text-[10px] font-bold uppercase tracking-wider mb-2">
              <Megaphone className="w-3.5 h-3.5" />
              <span>Real-Time Announcement Engine</span>
            </div>
            <h3 className="font-serif text-2xl font-medium text-pearl-100">
              Year-End / Flash Promotional Banner
            </h3>
            <p className="text-xs text-pearl-300 mt-1 max-w-xl">
              Enable or disable the gold urgency announcement ribbon across the top of the entire patient website. Updates reflect instantly without page reload.
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-pearl-200">
              {promoSettings.holidayPromoActive ? 'Banner Active (ON)' : 'Banner Hidden (OFF)'}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={promoSettings.holidayPromoActive}
                onChange={(e) => handleTogglePromo(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
            </label>
          </div>
        </div>

        {/* Banner Text Customization Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 text-xs">
          <div>
            <label className="block text-pearl-300 mb-1 font-medium">
              English Announcement Text:
            </label>
            <input
              type="text"
              value={promoSettings.announcementTextEN}
              onChange={(e) => updatePromoSettings({ announcementTextEN: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-pearl-100 focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-pearl-300 mb-1 font-medium">
              Bahasa Malaysia Announcement Text:
            </label>
            <input
              type="text"
              value={promoSettings.announcementTextBM}
              onChange={(e) => updatePromoSettings({ announcementTextBM: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-pearl-100 focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
        </div>
      </div>

      {/* 2. Real-Time Treatment Price Editor */}
      <div className="rounded-2xl glass-onyx-card border border-gold/30 p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gold/20 text-gold text-[10px] font-bold uppercase tracking-wider mb-2">
              <Tag className="w-3.5 h-3.5" />
              <span>Real-Time Catalog Pricing</span>
            </div>
            <h3 className="font-serif text-2xl font-medium text-pearl-100">
              Live Treatment Base Rates & Multipliers
            </h3>
            <p className="text-xs text-pearl-300 mt-1 max-w-xl">
              Modify rates below. Changes immediately propagate into the front-end Calculator, Package Engine, and Treatment Showcase cards.
            </p>
          </div>

          <button
            onClick={resetToDefaults}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-pearl-300 text-xs font-semibold flex items-center gap-1.5 transition-all border border-white/10 shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Defaults</span>
          </button>
        </div>

        {/* Pricing Editor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {treatments.map((treatment) => {
            const current = editingPrices[treatment.id] || { base: treatment.basePrice, original: treatment.originalPrice };
            const isDirty = current.base !== treatment.basePrice || current.original !== treatment.originalPrice;

            return (
              <div
                key={treatment.id}
                className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between hover:border-gold/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase font-bold text-gold tracking-wider">
                      {treatment.category}
                    </span>
                    <span className="text-[10px] text-pearl-400">
                      ID: {treatment.id}
                    </span>
                  </div>
                  <h4 className="font-medium text-pearl-100 text-sm">
                    {treatment.name}
                  </h4>
                  <p className="text-[11px] text-pearl-400 mt-0.5 line-clamp-1">
                    {treatment.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="block text-[10px] text-pearl-300 uppercase">Promo Rate:</span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-gold font-bold">RM</span>
                        <input
                          type="number"
                          value={current.base}
                          onChange={(e) => handlePriceChange(treatment.id, 'base', e.target.value)}
                          className="w-20 px-2 py-1 rounded-lg bg-black/40 border border-white/20 text-pearl-100 text-xs font-mono font-bold focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                    </div>

                    <div>
                      <span className="block text-[10px] text-pearl-400 uppercase">Original:</span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-pearl-400">RM</span>
                        <input
                          type="number"
                          value={current.original}
                          onChange={(e) => handlePriceChange(treatment.id, 'original', e.target.value)}
                          className="w-20 px-2 py-1 rounded-lg bg-black/40 border border-white/20 text-pearl-300 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSavePrice(treatment.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-all ${
                      isDirty
                        ? 'bg-gold hover:bg-gold-light text-obsidian shadow-gold-glow animate-pulse'
                        : 'bg-white/10 hover:bg-white/15 text-pearl-200'
                    }`}
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
