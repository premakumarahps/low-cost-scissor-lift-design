import React, { useState } from 'react';
import { 
  DollarSign, 
  PieChart, 
  TrendingDown, 
  CheckCircle2, 
  Layers, 
  Wrench, 
  Download,
  Sparkles
} from 'lucide-react';
import { BILL_OF_MATERIALS, COST_SUMMARY, CostItem } from '../core/scissorLiftData';

export const CostEstimator: React.FC = () => {
  const [currency, setCurrency] = useState<'LKR' | 'USD'>('LKR');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const lkrToUsdRate = 310; // exchange rate

  const formatCost = (valLkr: number) => {
    if (currency === 'USD') {
      return `$${(valLkr / lkrToUsdRate).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    return `${valLkr.toLocaleString('en-US')} LKR`;
  };

  const categories = ['All', 'Raw Materials', 'Purchased Components', 'Additional Features', 'Manufacturing Operations'];

  const filteredItems = filterCategory === 'All'
    ? BILL_OF_MATERIALS
    : BILL_OF_MATERIALS.filter((item) => item.category === filterCategory);

  return (
    <section className="py-12 bg-slate-950/40 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Economic Optimization & Feasibility</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">ME2851 Chapter 8 Cost Analysis</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Bill of Materials & Cost Analysis
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Complete cost estimation breakdown compiled by <strong>Premakumara H.P.S. (210494D)</strong> covering raw alloy stocks, electro-hydraulic components, auxiliary safety mechanisms, and fabrication labor.
            </p>
          </div>

          {/* Currency Toggle */}
          <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setCurrency('LKR')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currency === 'LKR' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sri Lankan Rupee (LKR)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currency === 'USD' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              US Dollar ($ USD)
            </button>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
            <div className="text-[11px] font-mono text-slate-400 uppercase">1. Raw Materials</div>
            <div className="text-2xl font-black text-sky-400 mt-1">
              {formatCost(COST_SUMMARY.totalMaterialsLkr)}
            </div>
            <p className="text-[10px] text-slate-500 mt-1">6061-T6 Al + A36 Steel + 1045 Pins</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
            <div className="text-[11px] font-mono text-slate-400 uppercase">2. Purchased Components</div>
            <div className="text-2xl font-black text-amber-400 mt-1">
              {formatCost(COST_SUMMARY.totalComponentsLkr)}
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Electric Motor + Dual Hydraulic Cylinders</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
            <div className="text-[11px] font-mono text-slate-400 uppercase">3. Additional Features</div>
            <div className="text-2xl font-black text-violet-400 mt-1">
              {formatCost(COST_SUMMARY.totalAdditionalFeaturesLkr)}
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Platform Crank + Outriggers + Safety</p>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/40 shadow-xl">
            <div className="text-[11px] font-mono text-emerald-400 uppercase font-bold">Grand Total Budget</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              {formatCost(COST_SUMMARY.grandTotalCostLkr)}
            </div>
            <p className="text-[10px] text-emerald-300 mt-1">Total Design & Manufacturing Cost</p>
          </div>

        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-all ${
                filterCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Detailed Bill of Materials Table */}
        <div className="rounded-3xl overflow-hidden bg-slate-900/90 border border-slate-800 shadow-2xl mb-8">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-base font-bold text-white">
              Itemized Manufacturing Bill of Materials (BOM)
            </h3>
            <span className="text-xs font-mono text-amber-400">
              {filteredItems.length} Cost Centers
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px] bg-slate-950/60">
                  <th className="py-3 px-4">Cost Category</th>
                  <th className="py-3 px-4 text-white">Item Name</th>
                  <th className="py-3 px-4">Specification / Function</th>
                  <th className="py-3 px-4">Quantity / Duration</th>
                  <th className="py-3 px-4 text-right">Unit Rate</th>
                  <th className="py-3 px-4 text-right text-amber-400 font-bold">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {filteredItems.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                      {row.category}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                      {row.item}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {row.specification}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300 whitespace-nowrap">
                      {row.quantity}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-right text-slate-400 whitespace-nowrap">
                      {formatCost(row.unitCostLkr)}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-right font-bold text-amber-300 whitespace-nowrap">
                      {formatCost(row.totalCostLkr)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Economic Feasibility & Commercial Comparison Callout */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase">
              <CheckCircle2 className="w-4 h-4" />
              <span>Commercial Viability Benchmark</span>
            </div>
            <h4 className="text-lg font-bold text-white">
              Over 60% Cost Reduction vs Commercial Hydraulic Lifts
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Standard imported hydraulic scissor lifts in Sri Lanka retail between <strong>2,500,000 LKR and 12,000,000 LKR</strong>. By manufacturing the chassis from structural ASTM A36 steel, utilizing standard 230V AC electric power, and reserving hydraulics strictly for high-elevation boost, the total fabrication cost is constrained to just <strong>1,185,000 LKR</strong> (~$3,820 USD).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center shrink-0 self-start md:self-auto">
            <div className="text-xs font-mono text-slate-400">Total Project Cost</div>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
              1,185,000 LKR
            </div>
            <div className="text-[11px] font-mono text-slate-500">~$3,820 USD Equivalent</div>
          </div>
        </div>

      </div>
    </section>
  );
};
