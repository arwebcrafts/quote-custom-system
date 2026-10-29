import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Save, RotateCcw, Megaphone, Check } from 'lucide-react';

export const FintechPromoEditor: React.FC = () => {
  const { 
    treatments, 
    updateTreatmentPrice, 
    promoSettings, 
    updatePromoSettings, 
    formatCurrency, 
    resetToDefaults, 
    addToast 
  } = useClinic();

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

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Live Holiday Promo Switcher Card */}
      <div className="bg-white rounded-2xl p-6 border border-[#EAEEF4] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Black Friday &amp; Year-End Campaign Banner</h3>
              <p className="text-xs text-slate-500">Instantly activates promotional pricing and top announcements across the entire site</p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={promoSettings.holidayPromoActive}
              onChange={(e) => updatePromoSettings({ holidayPromoActive: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500" />
            <span className="ml-3 text-xs font-bold text-slate-800">
              {promoSettings.holidayPromoActive ? 'ACTIVE NOW' : 'PAUSED'}
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">
              Top Announcement Text (English)
            </label>
            <input
              type="text"
              value={promoSettings.announcementTextEN}
              onChange={(e) => updatePromoSettings({ announcementTextEN: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">
              Teks Pengumuman Atas (Bahasa Malaysia)
            </label>
            <input
              type="text"
              value={promoSettings.announcementTextBM}
              onChange={(e) => updatePromoSettings({ announcementTextBM: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* 2. Direct Treatment Price Overrides */}
      <div className="bg-white rounded-2xl p-6 border border-[#EAEEF4] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Treatment Live Pricing Catalog</h3>
            <p className="text-xs text-slate-500">Edit base prices in real time. Changes reflect immediately in the patient quotation calculator.</p>
          </div>
          <button
            type="button"
            onClick={resetToDefaults}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3">Treatment Protocol</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Standard Price (RM)</th>
                <th className="py-3 px-3">Promo Rate (RM)</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {treatments.map((tr) => (
                <tr key={tr.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3">
                    <strong className="block text-slate-900 text-xs">{tr.name}</strong>
                    <span className="text-[10px] text-slate-400">{tr.nameBM}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-600 capitalize">
                    {tr.category.replace('_', ' ')}
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      value={editingPrices[tr.id]?.original ?? tr.originalPrice}
                      onChange={(e) => handlePriceChange(tr.id, 'original', e.target.value)}
                      className="w-24 px-2 py-1 text-xs border rounded-lg bg-slate-50 text-slate-800 font-mono"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      value={editingPrices[tr.id]?.base ?? tr.basePrice}
                      onChange={(e) => handlePriceChange(tr.id, 'base', e.target.value)}
                      className="w-24 px-2 py-1 text-xs border rounded-lg bg-slate-50 text-slate-800 font-mono font-bold text-emerald-700"
                    />
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleSavePrice(tr.id)}
                      className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
