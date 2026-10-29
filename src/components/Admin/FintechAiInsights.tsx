import React from 'react';

export const FintechAiInsights: React.FC = () => {
  const scannedData = [
    { concern: 'Melasma & Hormonal Pigmentation', percentage: 48, count: 680, color: '#7C3AED' },
    { concern: 'Rolling & Boxcar Acne Scars', percentage: 28, count: 397, color: '#F97316' },
    { concern: 'SMAS Laxity & V-Shape Contouring', percentage: 16, count: 227, color: '#06B6D4' },
    { concern: 'Dehydration & Dull Glass Skin', percentage: 8, count: 113, color: '#10B981' },
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="bg-white rounded-2xl p-6 border border-[#EAEEF4] shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">AI Facial Scanner Visitor Diagnostic Breakdown</h3>
          <p className="text-xs text-slate-500">Real-time aggregate data detected by the Nuvé AI diagnostic scanner on the landing page</p>
        </div>

        <div className="space-y-4 pt-2">
          {scannedData.map((item) => (
            <div key={item.concern} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-800">{item.concern}</span>
                <span className="font-mono text-slate-600">{item.percentage}% ({item.count} scans)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                <div
                  style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  className="h-full rounded-full transition-all duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
