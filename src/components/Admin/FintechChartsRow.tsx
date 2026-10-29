import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FintechChartsRow: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'Daily' | 'Weekly' | 'Monthly'>('Monthly');

  // SVG Spline Wave paths matching the exact curves from FintechX screenshot
  // Green Curve: Confirmed Package Revenue
  const greenWavePath = `
    M 20 280
    C 60 250, 90 270, 130 220
    C 170 170, 200 60, 240 65
    C 270 70, 290 150, 320 180
    C 360 220, 390 160, 430 170
    C 460 180, 480 230, 520 220
    C 560 210, 580 120, 620 90
    C 660 60, 690 120, 720 160
    C 750 200, 770 250, 800 270
  `;
  const greenAreaPath = `${greenWavePath} L 800 320 L 20 320 Z`;

  // Purple Curve: Interactive Quiz & Gift Card Volume
  const purpleWavePath = `
    M 20 300
    C 70 270, 110 200, 150 180
    C 190 160, 210 110, 240 100
    C 270 90, 290 190, 330 200
    C 370 210, 400 170, 430 185
    C 470 200, 500 280, 540 285
    C 580 290, 620 240, 660 245
    C 700 250, 740 270, 800 260
  `;
  const purpleAreaPath = `${purpleWavePath} L 800 320 L 20 320 Z`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 font-sans">
      
      {/* LEFT CARD (2/3 width): Spline Wave Graph */}
      <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-[#EAEEF4] shadow-[0_8px_24px_rgba(15,23,42,0.03)] flex flex-col justify-between">
        
        {/* Header with Title & Timeframe Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Revenue &amp; Quotation Performance
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Online treatment quotes vs. paid bookings over the last 6 months
            </p>
          </div>

          <div className="flex items-center gap-1 self-start sm:self-auto bg-slate-50 p-1 rounded-xl border border-slate-100">
            {(['Daily', 'Weekly', 'Monthly'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  timeframe === t
                    ? 'bg-white text-indigo-600 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Chart SVG Graphic */}
        <div className="relative w-full aspect-[16/7] min-h-[220px]">
          
          {/* Background Grid Lines & Y-Axis */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[11px] font-mono text-slate-400">
            {[400, 300, 200, 100, 0].map((val) => (
              <div key={val} className="flex items-center gap-3 w-full">
                <span className="w-6 text-right shrink-0">{val}</span>
                <div className="w-full h-px bg-slate-100" />
              </div>
            ))}
          </div>

          {/* SVG Waves Container */}
          <svg
            viewBox="0 0 820 320"
            className="w-full h-full pl-8 pb-4"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="greenFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.32" />
                <stop offset="85%" stopColor="#10B981" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="purpleFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" stopOpacity="0.28" />
                <stop offset="85%" stopColor="#6366F1" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Filled Gradient Areas */}
            <path d={greenAreaPath} fill="url(#greenFill)" />
            <path d={purpleAreaPath} fill="url(#purpleFill)" />

            {/* Glowing Spline Strokes */}
            <path
              d={purpleWavePath}
              fill="none"
              stroke="#6366F1"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={greenWavePath}
              fill="none"
              stroke="#10B981"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data Dots on Peak */}
            <circle cx="240" cy="65" r="4.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="240" cy="100" r="4" fill="#6366F1" stroke="#FFFFFF" strokeWidth="2" />
          </svg>

          {/* X-Axis Months */}
          <div className="flex justify-between pl-9 pr-2 text-[10px] uppercase font-bold text-slate-400 mt-2">
            {['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>

        {/* Chart Legend */}
        <div className="flex items-center gap-6 pt-5 mt-4 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#10B981]" />
            <span className="font-semibold text-slate-700">Confirmed Package Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#6366F1]" />
            <span className="font-semibold text-slate-700">Interactive Quiz &amp; Gift Card Volume</span>
          </div>
        </div>
      </div>

      {/* RIGHT CARD (1/3 width): Donut Chart */}
      <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-[#EAEEF4] shadow-[0_8px_24px_rgba(15,23,42,0.03)] flex flex-col justify-between">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Treatment &amp; Payment Allocation
          </h3>
          <button 
            type="button"
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-medium"
          >
            <span>All</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* Donut Chart with Centered Metric */}
        <div className="relative flex items-center justify-center my-auto py-4">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 160 160">
            {/* Background ring */}
            <circle
              cx="80"
              cy="80"
              r="60"
              stroke="#F1F5F9"
              strokeWidth="20"
              fill="transparent"
            />
            {/* Segment 1: Cyan (55%) - circumference = 2 * PI * 60 = 377 */}
            <circle
              cx="80"
              cy="80"
              r="60"
              stroke="#38BDF8"
              strokeWidth="20"
              fill="transparent"
              strokeDasharray="207.35 169.65"
              strokeDashoffset="0"
              strokeLinecap="round"
            />
            {/* Segment 2: Orange (30%) */}
            <circle
              cx="80"
              cy="80"
              r="60"
              stroke="#FB923C"
              strokeWidth="20"
              fill="transparent"
              strokeDasharray="113.1 263.9"
              strokeDashoffset="-215"
              strokeLinecap="round"
            />
            {/* Segment 3: Mint Green (15%) */}
            <circle
              cx="80"
              cy="80"
              r="60"
              stroke="#6EE7B7"
              strokeWidth="20"
              fill="transparent"
              strokeDasharray="56.55 320.45"
              strokeDashoffset="-335"
              strokeLinecap="round"
            />
          </svg>

          {/* Centered Donut Metric */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
              $58.4k
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Allocation
            </span>
          </div>
        </div>

        {/* Bottom Three Metrics (Matching FintechX) */}
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-center">
          <div>
            <span className="block text-base font-extrabold text-slate-900">55%</span>
            <span className="text-[10px] text-slate-400 font-semibold block flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" /> Full Pkg
            </span>
          </div>
          <div>
            <span className="block text-base font-extrabold text-slate-900">30%</span>
            <span className="text-[10px] text-slate-400 font-semibold block flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FB923C]" /> Deposit
            </span>
          </div>
          <div>
            <span className="block text-base font-extrabold text-slate-900">15%</span>
            <span className="text-[10px] text-slate-400 font-semibold block flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7]" /> Gift Card
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
