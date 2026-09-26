import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScissorKinematicsSimulator } from './components/ScissorKinematicsSimulator';
import { CadModelViewer } from './components/CadModelViewer';
import { MarketSurveyMatrix } from './components/MarketSurveyMatrix';
import { CostEstimator } from './components/CostEstimator';
import { ReportReader } from './components/ReportReader';
import { Footer } from './components/Footer';
import { 
  Activity, 
  Box, 
  BarChart2, 
  DollarSign, 
  FileText, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Sliders, 
  Maximize2,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Cpu
} from 'lucide-react';
import { CAD_RENDERS, COST_SUMMARY, REPORT_PAGES } from './core/scissorLiftData';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Main Content Area */}
      <main>
        {activeTab === 'overview' && (
          <div className="space-y-24">
            {/* Hero Section */}
            <Hero setActiveTab={handleTabChange} />

            {/* Innovations Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  KEY MECHANICAL INNOVATIONS
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight font-heading">
                  Engineered to Overcome Commercial Shortcomings
                </h2>
                <p className="text-slate-400 text-base mt-3">
                  Conventional imported scissor lifts are heavy, expensive, and lack micro-positioning. Our ME2851 hybrid design integrates 4 major industrial enhancements.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Feature 1 */}
                <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 hover:border-amber-500/40 hover-lift flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Sliders className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-amber-500 uppercase tracking-wider font-semibold">
                      Innovation 01
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1 mb-2">
                      Horizontal Lead Screw Crank
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Hand crank with lead screw slider allows 0-250mm transverse platform positioning without moving the heavy base frame.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono">Fine Control</span>
                    <span className="text-amber-400 font-mono">±250 mm Stroke</span>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 hover:border-emerald-500/40 hover-lift flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-emerald-500 uppercase tracking-wider font-semibold">
                      Innovation 02
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1 mb-2">
                      Quad Deployable Outriggers
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Expandable green stabilizer legs that widen the footprint base width by 45%, preventing tipping moments at max height.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono">Anti-Tip Safety</span>
                    <span className="text-emerald-400 font-mono">+45% Base Stance</span>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 hover:border-sky-500/40 hover-lift flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-sky-500 uppercase tracking-wider font-semibold">
                      Innovation 03
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1 mb-2">
                      Dual Hydraulic Boosters
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Upper-tier hydraulic cylinders activate automatically at θ &ge; 55° to offset kinematic mechanical disadvantage.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono">Hybrid Powertrain</span>
                    <span className="text-sky-400 font-mono">θ &ge; 55° Boost</span>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 hover:border-violet-500/40 hover-lift flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Layers className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-violet-500 uppercase tracking-wider font-semibold">
                      Innovation 04
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1 mb-2">
                      Fixed Ergonomic Safety Bench
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Integrated 1000mm perimeter guardrails with continuous operator bench reducing fatigue during extended aerial maintenance.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono">Operator Ergonomics</span>
                    <span className="text-violet-400 font-mono">1.0 m Railing</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Preview Spotlight: Kinematic Simulator */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 rounded-3xl border border-slate-800 p-8 lg:p-12 relative overflow-hidden shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
                      <Activity className="w-3.5 h-3.5" />
                      INTERACTIVE MECHANICAL SIMULATION
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight font-heading">
                      Live Kinematics & Stress Analysis Engine
                    </h2>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      Explore static equilibrium and stress variations from collapsed position (<span className="text-amber-400 font-mono">θ = 20°</span>, peak bending moment <span className="text-amber-400 font-mono">Mb = 31.14 N·m</span>) to full ceiling reach (<span className="text-sky-400 font-mono">θ = 70°</span>).
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2">
                      <button
                        onClick={() => handleTabChange('kinematics-sim')}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all hover:scale-105 shadow-lg shadow-amber-500/20"
                      >
                        Launch Live Simulator <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleTabChange('cad-viewer')}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-all border border-slate-700"
                      >
                        Inspect 3D CAD <Box className="w-4 h-4 text-sky-400" />
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <div 
                      onClick={() => handleTabChange('kinematics-sim')}
                      className="cursor-pointer group relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 p-2 shadow-2xl hover:border-amber-500/60 transition-all hover:scale-[1.01]"
                    >
                      <img 
                        src="/cad_renders/Scissor_Lift_v22.f3d (4).png" 
                        alt="Scissor Lift Isometric View"
                        className="w-full h-72 object-contain rounded-xl bg-slate-950 group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-6">
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs font-mono text-amber-400 font-bold bg-slate-900/90 px-3 py-1 rounded-full border border-slate-700">
                            Click to Open Simulator →
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            Fusion 360 Assembly
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Overview Section: CAD Gallery Preview */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-2">
                    <Box className="w-3.5 h-3.5" />
                    AUTODESK FUSION 360 GALLERY
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight font-heading">
                    Full Parametric 3D CAD Renders
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    7 high-resolution orthographic and isometric views of the Scissor_Lift_v22 model.
                  </p>
                </div>
                <button
                  onClick={() => handleTabChange('cad-viewer')}
                  className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 font-medium"
                >
                  View All 7 Renders & Download .F3D <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CAD_RENDERS.slice(0, 3).map((render) => (
                  <div
                    key={render.id}
                    onClick={() => handleTabChange('cad-viewer')}
                    className="group cursor-pointer bg-slate-900/70 rounded-2xl border border-slate-800 hover:border-amber-500/50 p-4 transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-[4/3] mb-4 flex items-center justify-center border border-slate-800">
                      <img
                        src={render.filename}
                        alt={render.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-[11px] font-mono text-amber-400 font-medium">
                        {render.viewType}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-200 text-sm group-hover:text-amber-400 transition-colors">
                      {render.title}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1 line-clamp-2 leading-relaxed">
                      {render.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Preview: Cost Analysis & Report Spotlight */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Cost Summary Card */}
                <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                        <DollarSign className="w-3.5 h-3.5" />
                        ECONOMIC FEASIBILITY
                      </div>
                      <span className="text-xs font-mono text-slate-500">ME2851 Chapter 8</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 font-heading">
                      1,185,000 LKR Total Manufacturing Cost
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      Itemized Bill of Materials with local fabrication costing indicates over 60% savings compared to imported commercial models (3M - 12M LKR).
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400 block mb-1">Materials & Parts</span>
                        <span className="text-lg font-bold text-white font-mono">
                          {((COST_SUMMARY.totalMaterialsLkr + COST_SUMMARY.totalComponentsLkr + COST_SUMMARY.totalAdditionalFeaturesLkr) / 1000).toLocaleString()}k LKR
                        </span>
                      </div>
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400 block mb-1">Machining & Welding</span>
                        <span className="text-lg font-bold text-white font-mono">
                          {(COST_SUMMARY.totalManufacturingLkr / 1000).toLocaleString()}k LKR
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleTabChange('cost-analysis')}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors border border-slate-700"
                  >
                    View Complete BOM & Cost Analysis <ArrowRight className="w-4 h-4 text-emerald-400" />
                  </button>
                </div>

                {/* Report Reader Preview Card */}
                <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
                        <FileText className="w-3.5 h-3.5" />
                        ACADEMIC SUBMISSION
                      </div>
                      <span className="text-xs font-mono text-slate-500">37 Pages • 200 DPI</span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2 font-heading">
                      Complete Technical Report & Calculations
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      Authored by <span className="text-amber-400 font-semibold">Premakumara H.P.S. (210494D)</span>. Includes kinematic derivation, shear stress pin verification, and market matrix.
                    </p>

                    <div className="flex items-center gap-3 mb-6 bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <img 
                        src="/report_pages/page_01.png" 
                        alt="Cover Page" 
                        className="w-16 h-20 object-cover rounded shadow"
                      />
                      <div className="text-xs space-y-1">
                        <div className="font-semibold text-white">ME2851_THA1_210494D.pdf</div>
                        <div className="text-slate-400">Department of Mechanical Engineering</div>
                        <div className="text-amber-400 font-mono">University of Moratuwa</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleTabChange('report-reader')}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-amber-500/20"
                  >
                    Read 37-Page Report in Flipbook <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Tab 2: Kinematics & Stress Simulator */}
        {activeTab === 'kinematics-sim' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
            <ScissorKinematicsSimulator />
          </div>
        )}

        {/* Tab 3: Fusion 360 CAD Model */}
        {activeTab === 'cad-viewer' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
            <CadModelViewer />
          </div>
        )}

        {/* Tab 4: Market Survey & Decision Matrix */}
        {activeTab === 'market-survey' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
            <MarketSurveyMatrix />
          </div>
        )}

        {/* Tab 5: BOM & Cost Estimator */}
        {activeTab === 'cost-analysis' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
            <CostEstimator />
          </div>
        )}

        {/* Tab 6: 37-Page Design Report */}
        {activeTab === 'report-reader' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
            <ReportReader />
          </div>
        )}
      </main>

      {/* Persistent Academic Footer */}
      <Footer onNavigateTab={handleTabChange} />
    </div>
  );
}

export default App;
