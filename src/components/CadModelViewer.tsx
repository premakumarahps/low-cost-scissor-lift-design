import React, { useState } from 'react';
import { 
  Box, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Sparkles, 
  Layers, 
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { CAD_RENDERS, CadRenderItem } from '../core/scissorLiftData';

export const CadModelViewer: React.FC = () => {
  const [selectedRenderIdx, setSelectedRenderIdx] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'gallery' | 'assemblies'>('gallery');

  const current = CAD_RENDERS[selectedRenderIdx];

  const subassemblies = [
    {
      name: 'Base Chassis & Ballast Frame',
      material: 'ASTM A36 High-Strength Structural Steel (Yield: 255 MPa)',
      description: 'Provides low center-of-gravity ballast foundation. Houses caster wheels, steering guide tracks, and mounting anchor lugs for outriggers.',
      weight: '~100 kg ballast',
      cost: '20,000 LKR'
    },
    {
      name: 'Scissor Linkage Pantograph Arms',
      material: 'Aluminum Alloy 6061-T6 (Yield: 250 MPa, Ultimate: 310 MPa)',
      description: '3-tier cross-connected pantograph arms. Sized with thickness h = 6.1 mm and width b = 12.2 mm to withstand peak bending moment of 31.14 N·m at critical 20° elevation.',
      weight: '~50 kg combined',
      cost: '25,000 LKR'
    },
    {
      name: 'Auxiliary Dual Hydraulic Boosters',
      material: 'Double-Acting Steel Hydraulic Actuators',
      description: 'Two auxiliary hydraulic cylinders installed at the top tier that automatically engage when approaching maximum platform extension, providing an extra lifting boost.',
      weight: 'Integrated unit',
      cost: '120,000 LKR'
    },
    {
      name: 'Deployable Outrigger Stabilizers',
      material: 'Fabricated Steel Box Section with Screw Lugs',
      description: 'Extend outwards from the base frame to double the footprint and prevent overturning during elevated work. Detachable via thumb screws for transport.',
      weight: '4 stabilizer legs',
      cost: '30,000 LKR'
    },
    {
      name: 'Horizontal Platform Lead Screw Slide',
      material: 'Precision Machined Slide Rails & Hand Crank',
      description: 'Integrates a manual hand crank mechanism providing ±150 mm fine horizontal movement of the platform, eliminating the need to move the entire machine for minor adjustments.',
      weight: 'Slide assembly',
      cost: '20,000 LKR'
    },
    {
      name: 'Fixed Safety Bench & 1m Guardrails',
      material: 'Lightweight Tubular Aluminum Railing',
      description: 'Permanent perimeter fall-protection barrier compliant with industrial occupational safety standards. Eliminates repetitive manual guardrail assembly.',
      weight: 'Permanent fixture',
      cost: '40,000 LKR'
    }
  ];

  return (
    <section className="py-12 bg-slate-950/40 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-2">
              <Box className="w-3.5 h-3.5" />
              <span>Autodesk Fusion 360 Engineering CAD</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">Scissor_Lift_v22.f3d</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              3D CAD Model & Mechanical Assemblies
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Modeled and assembled in Autodesk Fusion 360 by <strong>Premakumara H.P.S. (210494D)</strong>. Explore detailed orthographic projections, isometric perspectives, and mechanism subassemblies.
            </p>
          </div>

          {/* Action Download CAD File */}
          <div className="flex items-center gap-3">
            <a
              href="/docs/Scissor_Lift_v22.f3d"
              download="Scissor_Lift_v22.f3d"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-amber-600 hover:from-sky-500 hover:to-amber-500 text-white shadow-lg shadow-sky-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Native CAD File (.f3d - 1.31 MB)</span>
            </a>
          </div>
        </div>

        {/* CAD Gallery Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Main Visual Display (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl p-2 sm:p-6 flex items-center justify-center min-h-[400px]">
              <img
                src={current.filename}
                alt={current.title}
                className="max-h-[380px] w-auto object-contain rounded-2xl shadow-xl transition-all duration-300 hover:scale-105"
              />

              {/* Navigation Arrows */}
              <button
                onClick={() => setSelectedRenderIdx((prev) => (prev > 0 ? prev - 1 : CAD_RENDERS.length - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setSelectedRenderIdx((prev) => (prev < CAD_RENDERS.length - 1 ? prev + 1 : 0))}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Current View Description Banner */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    {current.viewType}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Autodesk Fusion 360</span>
                </div>
                <h3 className="text-base font-bold text-white">{current.title}</h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">{current.description}</p>
              </div>

              <div className="font-mono text-xs text-slate-400 shrink-0 self-start sm:self-auto">
                {selectedRenderIdx + 1} / {CAD_RENDERS.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {CAD_RENDERS.map((render, idx) => {
                const isActive = idx === selectedRenderIdx;
                return (
                  <button
                    key={render.id}
                    onClick={() => setSelectedRenderIdx(idx)}
                    className={`relative shrink-0 w-24 aspect-[4/3] rounded-xl overflow-hidden border p-1 bg-slate-950 transition-all ${
                      isActive
                        ? 'border-sky-400 ring-2 ring-sky-400/40 scale-105 shadow-lg'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={render.filename}
                      alt={render.title}
                      className="w-full h-full object-contain"
                    />
                  </button>
                );
              })}
            </div>

          </div>

          {/* Subassembly Specifications (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                  Subassembly Breakdown
                </span>
                <Layers className="w-4 h-4 text-sky-400" />
              </div>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
                {subassemblies.map((sub, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{sub.name}</span>
                      <span className="font-mono text-[10px] text-amber-300 font-semibold">{sub.cost}</span>
                    </div>
                    <div className="text-[11px] font-mono text-sky-300">{sub.material}</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed pt-0.5">{sub.description}</p>
                    <div className="text-[10px] font-mono text-slate-500 pt-1">Weight: {sub.weight}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
