import React from 'react';
import { 
  Wrench, 
  Activity, 
  Box, 
  ChevronRight, 
  FileText, 
  DollarSign, 
  ShieldCheck, 
  Sparkles,
  Zap,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { MathView } from './MathView';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-slate-800/80">
      
      {/* Background Industrial Glows & Ambient Engineering Fields */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-gradient-to-tr from-sky-600/15 via-blue-600/10 to-amber-500/15 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-sky-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Engineering Technical Grid Coordinate Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c70d_1px,transparent_1px),linear-gradient(to_bottom,#0284c70d_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges & Academic Lineage */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold shadow-inner">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span>Department of Mechanical Engineering</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300">University of Moratuwa</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <Wrench className="w-3.5 h-3.5" />
            <span>Module ME2851: Semester 4 Machine Design</span>
          </div>

          {/* Highlighted Author Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-sky-950/80 via-slate-900 to-amber-950/80 border border-sky-500/50 text-sky-200 text-xs font-medium shadow-lg shadow-sky-950/30">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>Lead Mechanical Designer: <strong>Premakumara H.P.S.</strong></span>
            <span className="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-200 font-mono text-[10px] font-bold border border-sky-500/40">
              210494D
            </span>
          </div>
        </div>

        {/* Main Title Heading */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
            LOW-COST HYBRID{' '}
            <span className="bg-gradient-to-r from-white via-sky-300 to-amber-400 bg-clip-text text-transparent">
              SCISSOR LIFT
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            An innovative, economically optimized Mobile Elevated Work Platform (MEWP) engineered for industrial maintenance. Combines a <strong>230V AC electric motor</strong> with <strong>dual hydraulic booster cylinders</strong>, <strong>deployable outrigger stabilization</strong>, a <strong>fixed fall-protection safety bench</strong>, and a <strong>hand-crank horizontal platform slide</strong>.
          </p>

          {/* Engineering Key Sizing Formula Teaser Pill */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 px-5 py-2.5 rounded-2xl bg-slate-900/80 border border-slate-700/60 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="text-sky-400 font-bold">Critical Bending Moment:</span>
              <MathView latex="M_b = \frac{W\cos\theta \cdot (L/2)^2}{8} = 31.14\text{ N}\cdot\text{m}" />
            </div>
            <span className="hidden sm:inline text-slate-700">|</span>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="text-amber-400 font-bold">Estimated Cost:</span>
              <span className="text-white font-bold">1,185,000 LKR (~$3,820 USD)</span>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('kinematics-sim')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-sky-600 via-blue-600 to-amber-600 hover:from-sky-500 hover:to-amber-500 text-white shadow-xl shadow-sky-600/30 hover:shadow-sky-600/50 border border-sky-400/40 transition-all hover:scale-[1.03] active:scale-[0.98]"
            >
              <Activity className="w-4 h-4" />
              <span>Launch Kinematics & Stress Simulator</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('cad-viewer')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-900/90 hover:bg-slate-800 text-sky-300 border border-sky-500/30 hover:border-sky-400/60 shadow-lg shadow-sky-950/30 transition-all hover:scale-[1.02]"
            >
              <Box className="w-4 h-4 text-sky-400" />
              <span>Fusion 360 3D Model (.f3d)</span>
            </button>

            <button
              onClick={() => setActiveTab('cost-analysis')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/70 hover:bg-slate-800/90 text-slate-200 border border-slate-700 transition-all"
            >
              <DollarSign className="w-4 h-4 text-amber-400" />
              <span>Cost Estimator (BOM)</span>
            </button>

            <button
              onClick={() => setActiveTab('report-reader')}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/70 hover:bg-slate-800/90 text-slate-200 border border-slate-700 transition-all"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>37-Page Design Report</span>
            </button>
          </div>
        </div>

        {/* 4 Multi-Discipline Core Feature Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Hybrid Power Drive */}
          <div 
            onClick={() => setActiveTab('kinematics-sim')}
            className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-sky-500/40 transition-all hover:-translate-y-1 cursor-pointer group shadow-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
              Powertrain Innovation
            </div>
            <h3 className="text-lg font-bold text-white mt-1 group-hover:text-sky-300 transition-colors">
              Hybrid Electric + Hydraulic
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Quiet 230V AC electric motor provides primary continuous elevation, while two small auxiliary hydraulic cylinders automatically boost capacity at maximum extension.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-sky-400">
              <span>Inspect Booster Mechanics</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Kinematic Stress Sizing */}
          <div 
            onClick={() => setActiveTab('kinematics-sim')}
            className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-amber-500/40 transition-all hover:-translate-y-1 cursor-pointer group shadow-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              Structural Mechanics
            </div>
            <h3 className="text-lg font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
              Critical Bending Analysis
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Calculated at the critical minimum elevation angle (<MathView latex="\theta = 20^\circ" />) where normal loads peak. Sized 6061-T6 aluminum arms (<MathView latex="h=6.1\text{mm}, b=12.2\text{mm}" />) and 10mm AISI 1045 pins.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-amber-400">
              <span>View Stress Diagrams</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Outriggers & Stability */}
          <div 
            onClick={() => setActiveTab('cad-viewer')}
            className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-emerald-500/40 transition-all hover:-translate-y-1 cursor-pointer group shadow-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <Box className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              Safety & Outriggers
            </div>
            <h3 className="text-lg font-bold text-white mt-1 group-hover:text-emerald-300 transition-colors">
              Deployable Stance & Bench
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Detachable base outriggers extend outwards to double the anti-tipping footprint, paired with a permanent 1-meter guardrail safety bench for continuous worker fall protection.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <span>Explore 3D CAD Views</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Cost Optimization */}
          <div 
            onClick={() => setActiveTab('cost-analysis')}
            className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-rose-500/40 transition-all hover:-translate-y-1 cursor-pointer group shadow-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
              Economic Viability
            </div>
            <h3 className="text-lg font-bold text-white mt-1 group-hover:text-rose-300 transition-colors">
              Over 60% Cost Reduction
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Total estimated manufacturing and material budget of 1,185,000 LKR (~$3,820 USD), compared to imported commercial hydraulic lifts priced up to 3,000,000–12,000,000 LKR.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-rose-400">
              <span>Open Interactive BOM</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
