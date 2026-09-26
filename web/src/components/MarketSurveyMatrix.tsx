import React, { useState } from 'react';
import { 
  BarChart2, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  HelpCircle,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { MARKET_SURVEY_TYPES, MarketSurveyItem } from '../core/scissorLiftData';

export const MarketSurveyMatrix: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('Proposed Enhanced Hybrid Lift');

  const decisionCriteria = [
    { criterion: 'Cost-Effectiveness', weight: 8, hybrid: 7, pneumatic: 6, electric: 9, manual: 10, explanation: 'Primary industrial buyer requirement.' },
    { criterion: 'Lifting Functionality & Range', weight: 7, hybrid: 8, pneumatic: 5, electric: 3, manual: 2, explanation: 'Ability to elevate 200-400kg loads safely.' },
    { criterion: 'Occupational Safety', weight: 10, hybrid: 9, pneumatic: 8, electric: 7, manual: 6, explanation: 'Fall protection, outriggers, holding valves (Highest Weight).' },
    { criterion: 'Ease of Use & Maintenance', weight: 7, hybrid: 8, pneumatic: 9, electric: 10, manual: 10, explanation: 'Ergonomic controls and simple maintenance.' },
    { criterion: 'Environmental Considerations', weight: 5, hybrid: 4, pneumatic: 5, electric: 5, manual: 5, explanation: 'Low noise and zero indoor exhaust emissions.' },
  ];

  const totalScores = {
    hybrid: 36,
    pneumatic: 33,
    electric: 34,
    manual: 33
  };

  const activeItem = MARKET_SURVEY_TYPES.find((m) => m.type === selectedType) || MARKET_SURVEY_TYPES[5];

  return (
    <section className="py-12 bg-slate-950/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Industrial Market Research</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">ME2851 Chapter 2 & 5</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Market Survey & Design Decision Matrix
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Survey of 5 major commercial scissor lift categories available in Sri Lanka and worldwide. Evaluated via a multi-attribute decision matrix to select the winning hybrid configuration.
            </p>
          </div>
        </div>

        {/* 5-Type Market Survey Comparison Table */}
        <div className="rounded-3xl overflow-hidden bg-slate-900/90 border border-slate-800 shadow-2xl mb-12">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-base font-bold text-white">
              Commercial Lift Comparison (Report Page 14)
            </h3>
            <span className="text-xs font-mono text-sky-400">
              6 Technologies Analyzed
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px] bg-slate-950/60">
                  <th className="py-3 px-4">Lift Classification</th>
                  <th className="py-3 px-4 text-sky-300">Capacity</th>
                  <th className="py-3 px-4">Lifting Height</th>
                  <th className="py-3 px-4 text-amber-300">Price Range (LKR)</th>
                  <th className="py-3 px-4">Key Pros</th>
                  <th className="py-3 px-4 text-rose-300">Key Cons</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {MARKET_SURVEY_TYPES.map((row, idx) => (
                  <tr 
                    key={idx} 
                    onClick={() => setSelectedType(row.type)}
                    className={`transition-colors cursor-pointer ${
                      row.type.includes('Enhanced') 
                        ? 'bg-sky-500/15 font-semibold text-white' 
                        : selectedType === row.type 
                        ? 'bg-slate-800/60' 
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap flex items-center gap-1.5">
                      {row.type.includes('Enhanced') && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                      <span>{row.type}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-sky-300 whitespace-nowrap">{row.capacityKg}</td>
                    <td className="py-3.5 px-4 font-mono whitespace-nowrap">{row.liftHeightM}</td>
                    <td className="py-3.5 px-4 font-mono text-amber-300 whitespace-nowrap">{row.priceLkr}</td>
                    <td className="py-3.5 px-4 text-emerald-300 max-w-xs leading-relaxed">{row.pros}</td>
                    <td className="py-3.5 px-4 text-slate-400 max-w-xs leading-relaxed">{row.cons}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Weighted Decision Matrix (Report Page 17-19) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-bold text-white">
                  Multi-Attribute Design Decision Matrix (Chapter 5)
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Comparative ranking of the 4 conceptual design proposals against weighted industrial requirements.
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold self-start sm:self-auto">
              Winner: Hybrid System (36 / 37)
            </div>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px] bg-slate-950/60">
                  <th className="py-3 px-4">Evaluation Criteria</th>
                  <th className="py-3 px-4 text-amber-300">Weight (out of 10)</th>
                  <th className="py-3 px-4 text-emerald-400 font-bold">1. Hybrid Lifting System</th>
                  <th className="py-3 px-4 text-slate-300">2. Improved Pneumatic</th>
                  <th className="py-3 px-4 text-slate-300">3. Simplified Electric</th>
                  <th className="py-3 px-4 text-slate-300">4. Height-Adjustable Manual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {decisionCriteria.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      <div>{row.criterion}</div>
                      <div className="text-[10px] text-slate-500 font-normal">{row.explanation}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-amber-400 font-bold">{row.weight}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-300 bg-emerald-500/10">{row.hybrid}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">{row.pneumatic}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">{row.electric}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-400">{row.manual}</td>
                  </tr>
                ))}
                {/* Total Scores Row */}
                <tr className="bg-slate-950 font-bold text-white text-sm">
                  <td className="py-4 px-4 uppercase font-mono">Total Evaluation Score</td>
                  <td className="py-4 px-4 font-mono text-amber-400">37 Max</td>
                  <td className="py-4 px-4 font-mono text-emerald-400 text-base bg-emerald-500/20 border-l border-r border-emerald-500/40">
                    36 (Selected)
                  </td>
                  <td className="py-4 px-4 font-mono text-slate-400">33</td>
                  <td className="py-4 px-4 font-mono text-slate-400">34</td>
                  <td className="py-4 px-4 font-mono text-slate-400">33</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <strong className="text-emerald-400">Author Decision Conclusion:</strong> Proposal 1 (Hybrid Lifting System) was selected as the optimal compromise between cost, functional payload capacity, and operator safety. The final design was enhanced with a <strong>horizontal platform movement crank</strong>, <strong>deployable outriggers</strong>, and a <strong>fixed fall-protection safety bench</strong>.
          </div>
        </div>

      </div>
    </section>
  );
};
