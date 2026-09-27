import React from 'react';
import { Download, FileText, Box, Shield, Award, Cpu, ChevronUp } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950 text-slate-400 font-sans">
      {/* Upper Footer CTA & Attribution Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-12 border-b border-slate-800/80">
          <div className="md:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
              <Award className="w-3.5 h-3.5" />
              UNIVERSITY OF MORATUWA • DEPT. OF MECHANICAL ENGINEERING
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight font-heading">
              Low-Cost Scissor Lift for Industrial Applications
            </h3>
            <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
              Academic design project by <span className="text-amber-400 font-semibold underline decoration-amber-500/30 underline-offset-4">Premakumara H.P.S. (Index: 210494D)</span> under Module <span className="text-slate-200 font-mono">ME2851</span>. Engineered for cost reduction (&gt;60% savings vs imported MEWPs) with enhanced operator fall safety and horizontal reach.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-wrap gap-3 md:justify-end">
            <a
              href="/cad_renders/Scissor_Lift_v22.f3d"
              download="Scissor_Lift_v22.f3d"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-medium transition-all hover:scale-[1.02] shadow-lg"
            >
              <Box className="w-4 h-4 text-cyan-400" />
              Download .F3D CAD Model
            </a>

            <a
              href="/docs/ME2851_Scissor_Lift_Report_210494D.pdf"
              download="ME2851_Scissor_Lift_Report_210494D.pdf"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs transition-all hover:scale-[1.02] shadow-lg shadow-amber-500/20"
            >
              <Download className="w-4 h-4" />
              Download Report (37 Pgs)
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold mb-4">
              Project Modules
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigateTab('kinematics-sim')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Kinematics & Stress Simulator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('cad-viewer')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  3D CAD Fusion 360 Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('market-survey')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Market Survey & Decision Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('cost-analysis')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Bill of Materials & Cost Estimator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('report-reader')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  37-Page Technical Report
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold mb-4">
              Key Engineering Metrics
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li>• Max Payload: <span className="text-slate-200">200 kg (1,962 N)</span></li>
              <li>• Design Load (FoS 1.5): <span className="text-slate-200">4,242 N</span></li>
              <li>• Critical Angle: <span className="text-amber-400">θ = 20° (Max Mb)</span></li>
              <li>• Max Bending Moment: <span className="text-slate-200">31.14 N·m</span></li>
              <li>• Arm Material: <span className="text-slate-200">Al 6061-T6 (h=6.1mm)</span></li>
              <li>• Pin Material: <span className="text-slate-200">AISI 1045 (D=10mm)</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold mb-4">
              Structural Innovations
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400">✔</span>
                <span>Horizontal fine-tune lead screw hand crank</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400">✔</span>
                <span>Quad extendable outrigger base stabilizers</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400">✔</span>
                <span>Dual auxiliary hydraulic boosters (θ &ge; 55°)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400">✔</span>
                <span>Fixed ergonomic safety bench with 1m guardrails</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-semibold mb-4">
              Author & Academic Info
            </h4>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <p className="text-white font-semibold">Premakumara H.P.S.</p>
              <p className="font-mono text-amber-400 font-medium">Index: 210494D</p>
              <p className="text-slate-400">Department of Mechanical Engineering</p>
              <p className="text-slate-400">University of Moratuwa, Sri Lanka</p>
              <p className="text-slate-500 font-mono text-[11px] pt-1 border-t border-slate-800">
                Module: ME2851 • Semester 4
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} ME2851 Low-Cost Scissor Lift Mechanism. All engineering designs and stress validations authored by Premakumara H.P.S. (210494D).
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 transition-colors"
          >
            <span>Back to top</span>
            <ChevronUp className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
