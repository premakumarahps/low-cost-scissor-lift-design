import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Sliders, 
  RotateCcw, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  ArrowUp, 
  ArrowDown, 
  Maximize2,
  CheckCircle2,
  Zap,
  MoveHorizontal
} from 'lucide-react';
import { calculateScissorLift } from '../core/scissorLiftPhysics';
import { MathView } from './MathView';

export const ScissorKinematicsSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulation parameter states
  const [angleDeg, setAngleDeg] = useState<number>(20); // starts at critical 20 deg
  const [payloadKg, setPayloadKg] = useState<number>(200); // 200 kg standard industrial payload
  const [horizontalShiftMm, setHorizontalShiftMm] = useState<number>(0); // hand crank slide
  const [outriggersDeployed, setOutriggersDeployed] = useState<boolean>(true);
  const [autoElevate, setAutoElevate] = useState<boolean>(false);
  const elevateDirRef = useRef<number>(1);

  // Mechanical calculation
  const sim = calculateScissorLift({
    elevationAngleDeg: angleDeg,
    payloadKg: payloadKg,
    factorOfSafety: 1.5,
    numTiers: 3,
    linkLengthM: 1.0,
    armThicknessMm: 6.1,
    armWidthMm: 12.2,
    pinDiameterMm: 10.0
  });

  // Automated elevation cycle
  useEffect(() => {
    if (!autoElevate) return;
    const interval = setInterval(() => {
      setAngleDeg((prev) => {
        let next = prev + elevateDirRef.current * 0.75;
        if (next >= 70) {
          next = 70;
          elevateDirRef.current = -1;
        } else if (next <= 20) {
          next = 20;
          elevateDirRef.current = 1;
        }
        return Math.round(next * 10) / 10;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [autoElevate]);

  // Redraw canvas whenever geometry changes
  useEffect(() => {
    drawMechanism();
  }, [angleDeg, horizontalShiftMm, outriggersDeployed, sim.hydraulicBoosterActive]);

  const drawMechanism = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Coordinate mapping
    // Ground level: Y = 360 px
    const groundY = 360;
    const baseCenter = width / 2;

    // Background Grid
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.2)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    // Ground Plane
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, groundY);
    ctx.lineTo(width - 40, groundY);
    ctx.stroke();

    // Outriggers (Green Stabilizer Arms)
    const outriggerSpreadPx = outriggersDeployed ? 160 : 70;
    ctx.strokeStyle = outriggersDeployed ? '#10b981' : '#64748b';
    ctx.lineWidth = 5;
    ctx.beginPath();
    // Left outrigger
    ctx.moveTo(baseCenter - 110, groundY - 20);
    ctx.lineTo(baseCenter - 110 - outriggerSpreadPx, groundY);
    // Right outrigger
    ctx.moveTo(baseCenter + 110, groundY - 20);
    ctx.lineTo(baseCenter + 110 + outriggerSpreadPx, groundY);
    ctx.stroke();

    // Outrigger foot pads
    ctx.fillStyle = '#10b981';
    if (outriggersDeployed) {
      ctx.fillRect(baseCenter - 110 - outriggerSpreadPx - 8, groundY - 4, 16, 6);
      ctx.fillRect(baseCenter + 110 + outriggerSpreadPx - 8, groundY - 4, 16, 6);
    }

    // Base Frame (Chassis - Blue ASTM A36)
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(baseCenter - 120, groundY - 28, 240, 16);

    // Wheels (Castors)
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    [-90, 90].forEach((wheelX) => {
      ctx.beginPath();
      ctx.arc(baseCenter + wheelX, groundY - 10, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(baseCenter + wheelX, groundY - 10, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#cbd5e1';
      ctx.fill();
    });

    // Scissor Kinematics Drawing
    // Link length scale: 1 meter = 170 pixels
    const linkLengthPx = 170;
    const thetaRad = (angleDeg * Math.PI) / 180;
    const tierHeightPx = linkLengthPx * Math.sin(thetaRad);
    const halfSpreadPx = (linkLengthPx * Math.cos(thetaRad)) / 2;

    const numTiers = 3;
    let currentBaseY = groundY - 28;

    // Draw the 3 tiers
    for (let tier = 0; tier < numTiers; tier++) {
      const tierBottomY = currentBaseY - tier * tierHeightPx;
      const tierTopY = tierBottomY - tierHeightPx;
      const tierMidY = (tierBottomY + tierTopY) / 2;

      // Bottom coordinates
      const pBottomLeft = { x: baseCenter - halfSpreadPx, y: tierBottomY };
      const pBottomRight = { x: baseCenter + halfSpreadPx, y: tierBottomY };
      // Top coordinates
      const pTopLeft = { x: baseCenter - halfSpreadPx, y: tierTopY };
      const pTopRight = { x: baseCenter + halfSpreadPx, y: tierTopY };
      // Central pivot
      const pCenter = { x: baseCenter, y: tierMidY };

      // Scissor arm 1 (BottomLeft to TopRight)
      ctx.strokeStyle = '#ef4444'; // Red Aluminum 6061-T6
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(pBottomLeft.x, pBottomLeft.y);
      ctx.lineTo(pTopRight.x, pTopRight.y);
      ctx.stroke();

      // Scissor arm 2 (BottomRight to TopLeft)
      ctx.beginPath();
      ctx.moveTo(pBottomRight.x, pBottomRight.y);
      ctx.lineTo(pTopLeft.x, pTopLeft.y);
      ctx.stroke();

      // Pivot Pins (Connecting Pins - AISI 1045)
      ctx.fillStyle = '#f8fafc';
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      [pBottomLeft, pBottomRight, pTopLeft, pTopRight, pCenter].forEach((pt) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });

      // If top tier, draw auxiliary hydraulic booster cylinder
      if (tier === 1) {
        ctx.fillStyle = sim.hydraulicBoosterActive ? '#38bdf8' : '#0369a1';
        ctx.fillRect(baseCenter - 6, tierMidY - 15, 12, 30);
        ctx.strokeStyle = '#f8fafc';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(baseCenter - 6, tierMidY - 15, 12, 30);
      }
    }

    // Top Platform Y Position
    const topPlatformY = currentBaseY - numTiers * tierHeightPx;
    // Hand crank shift in pixels (scale 1mm = 0.25px)
    const crankShiftPx = horizontalShiftMm * 0.25;
    const platformCenterX = baseCenter + crankShiftPx;

    // Platform Base Rail
    ctx.fillStyle = '#334155';
    ctx.fillRect(baseCenter - 130, topPlatformY - 6, 260, 6);

    // Sliding Top Platform (Aluminum 6061-T6)
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(platformCenterX - 110, topPlatformY - 16, 220, 10);

    // Hand Crank Mechanism Indicator
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(platformCenterX + 100, topPlatformY - 11, 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(platformCenterX + 100, topPlatformY - 11);
    ctx.lineTo(platformCenterX + 107, topPlatformY - 18);
    ctx.stroke();

    // Fixed Safety Bench & Guardrails (Yellow Fall Protection)
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 3;
    // Outer guardrail frame
    ctx.strokeRect(platformCenterX - 100, topPlatformY - 76, 200, 60);
    // Mid-rail
    ctx.beginPath();
    ctx.moveTo(platformCenterX - 100, topPlatformY - 46);
    ctx.lineTo(platformCenterX + 100, topPlatformY - 46);
    ctx.stroke();
    // Upright balusters
    [-40, 20].forEach((ux) => {
      ctx.beginPath();
      ctx.moveTo(platformCenterX + ux, topPlatformY - 76);
      ctx.lineTo(platformCenterX + ux, topPlatformY - 16);
      ctx.stroke();
    });

    // Safety Bench Seat
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(platformCenterX - 95, topPlatformY - 38, 60, 8);

    // Elevation Dimension Arrow
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(width - 70, groundY);
    ctx.lineTo(width - 70, topPlatformY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Height Label
    ctx.fillStyle = '#06b6d4';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.fillText(`H = ${sim.platformHeightM.toFixed(2)} m`, width - 130, (groundY + topPlatformY) / 2);
    ctx.fillText(`θ = ${angleDeg.toFixed(1)}°`, baseCenter - halfSpreadPx + 15, groundY - 35);
  };

  return (
    <section className="py-12 bg-slate-950/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-2">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>Interactive Mechanical Kinematics Engine</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">ME2851 Report Sizing</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Scissor Lift Kinematic & Stress Simulator
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Elevate the 3-tier pantograph mechanism, adjust industrial payloads, and observe the critical bending moments and stresses on the 6061-T6 aluminum arms and AISI 1045 steel pins in real time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAutoElevate(!autoElevate)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                autoElevate
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{autoElevate ? 'Stop Motion Cycle' : 'Auto Elevation Cycle'}</span>
            </button>

            <button
              onClick={() => setOutriggersDeployed(!outriggersDeployed)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                outriggersDeployed
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-lg'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Outriggers: {outriggersDeployed ? 'Deployed (Stable)' : 'Stowed'}</span>
            </button>
          </div>
        </div>

        {/* Master Simulator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Real-time Sliders Card */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                  Mechanism Variables
                </span>
                <Sliders className="w-4 h-4 text-sky-400" />
              </div>

              {/* Elevation Angle Theta */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-slate-300 font-medium">Scissor Angle (<span className="font-mono text-sky-400">\theta</span>)</span>
                  <span className="font-mono text-sky-300 font-bold">{angleDeg.toFixed(1)}°</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={70}
                  step={0.5}
                  value={angleDeg}
                  onChange={(e) => setAngleDeg(Number(e.target.value))}
                  className="w-full accent-sky-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                  <span className="text-amber-400 font-bold">20° (Peak Stress)</span>
                  <span>45°</span>
                  <span>70° (Max Height)</span>
                </div>
              </div>

              {/* Payload Weight */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-slate-300 font-medium">Payload Capacity</span>
                  <span className="font-mono text-amber-300 font-bold">{payloadKg} kg ({(payloadKg * 9.81).toFixed(0)} N)</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={350}
                  step={10}
                  value={payloadKg}
                  onChange={(e) => setPayloadKg(Number(e.target.value))}
                  className="w-full accent-amber-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                  <span>50 kg</span>
                  <span className="text-emerald-400">Design: 200 kg</span>
                  <span>350 kg</span>
                </div>
              </div>

              {/* Horizontal Platform Hand Crank Slide */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-slate-300 font-medium flex items-center gap-1">
                    <MoveHorizontal className="w-3.5 h-3.5 text-amber-400" />
                    <span>Horizontal Platform Crank</span>
                  </span>
                  <span className="font-mono text-amber-300 font-bold">{horizontalShiftMm > 0 ? `+${horizontalShiftMm}` : horizontalShiftMm} mm</span>
                </div>
                <input
                  type="range"
                  min={-150}
                  max={150}
                  step={5}
                  value={horizontalShiftMm}
                  onChange={(e) => setHorizontalShiftMm(Number(e.target.value))}
                  className="w-full accent-amber-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                  <span>-150 mm (Left)</span>
                  <span>Centered</span>
                  <span>+150 mm (Right)</span>
                </div>
              </div>

              {/* Quick Jump Buttons for Critical Angles */}
              <div className="pt-2 border-t border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-2 font-mono">Test Key Elevation States:</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setAngleDeg(20)}
                    className="p-2 rounded-xl text-center bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-amber-300 border border-amber-500/30"
                  >
                    <div>20° Critical</div>
                    <div className="text-[9px] text-slate-400 font-mono">Max Bending</div>
                  </button>
                  <button
                    onClick={() => setAngleDeg(45)}
                    className="p-2 rounded-xl text-center bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700"
                  >
                    <div>45° Nominal</div>
                    <div className="text-[9px] text-slate-400 font-mono">Mid-Stroke</div>
                  </button>
                  <button
                    onClick={() => setAngleDeg(70)}
                    className="p-2 rounded-xl text-center bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-sky-300 border border-sky-500/30"
                  >
                    <div>70° Peak</div>
                    <div className="text-[9px] text-slate-400 font-mono">Booster Active</div>
                  </button>
                </div>
              </div>

            </div>

            {/* Stress & Safety Readout Card */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                Structural Sizing & Safety Status
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                  <span className="text-slate-400 block mb-0.5">Bending Moment (<MathView latex="M_b" />)</span>
                  <span className="font-mono text-lg font-black text-amber-300">
                    {sim.maxBendingMomentNm} N·m
                  </span>
                  <span className="text-[10px] text-slate-500 block">Peak at 20°: 31.14 N·m</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                  <span className="text-slate-400 block mb-0.5">Bending Stress (<MathView latex="\sigma" />)</span>
                  <span className={`font-mono text-lg font-black ${sim.isBendingSafe ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {sim.bendingStressMpa} MPa
                  </span>
                  <span className="text-[10px] text-slate-500 block">Limit: 206.67 MPa</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                  <span className="text-slate-400 block mb-0.5">Factor of Safety</span>
                  <span className="font-mono text-sm font-bold text-sky-300">
                    {sim.bendingFosActual.toFixed(2)}×
                  </span>
                  <span className="text-[10px] text-emerald-400 block">Target: ≥ 1.5</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                  <span className="text-slate-400 block mb-0.5">Pin Sizing (<MathView latex="D" />)</span>
                  <span className="font-mono text-sm font-bold text-violet-300">
                    10.0 mm
                  </span>
                  <span className="text-[10px] text-slate-500 block">Min req: ≥ 7.2 mm</span>
                </div>
              </div>

              {/* Booster cylinder indicator */}
              <div className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                sim.hydraulicBoosterActive 
                  ? 'bg-sky-950/50 border-sky-500/50 text-sky-200' 
                  : 'bg-slate-950/60 border-slate-800 text-slate-400'
              }`}>
                <div className="flex items-center gap-2">
                  <Zap className={`w-4 h-4 ${sim.hydraulicBoosterActive ? 'text-sky-400 animate-pulse' : 'text-slate-500'}`} />
                  <span>Dual Hydraulic Booster:</span>
                </div>
                <strong className={sim.hydraulicBoosterActive ? 'text-emerald-400' : 'text-slate-500'}>
                  {sim.hydraulicBoosterActive ? 'ENGAGED (High Elevation)' : 'Standby (Electric Drive)'}
                </strong>
              </div>

            </div>

          </div>

          {/* Interactive Mechanical Canvas Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl relative">
              
              {/* Canvas Header */}
              <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-mono text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
                  <span>Kinematic Elevation: <span className="text-cyan-300">H({angleDeg}°) = {sim.platformHeightM} m</span></span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Scale: 1m = 170px</span>
              </div>

              {/* Canvas */}
              <div className="p-3 bg-slate-950">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={420}
                  className="w-full h-auto rounded-xl border border-slate-900 bg-[#070b14]"
                />
              </div>

              {/* Canvas Legend */}
              <div className="p-4 bg-slate-900/80 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-red-500" />
                    <span className="text-slate-300">6061-T6 Scissor Arms</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-blue-600" />
                    <span className="text-slate-300">ASTM A36 Chassis Base</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-emerald-500" />
                    <span className="text-slate-300">Deployable Outriggers</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-yellow-400" />
                    <span className="text-slate-300">Safety Bench Guardrails</span>
                  </div>
                </div>

                <div className="font-mono text-amber-300 text-xs">
                  Normal Force on Arms: <strong>{sim.normalLoadN} N</strong>
                </div>
              </div>

            </div>

            {/* Static Equilibrium Calculation Formula from Report Page 28-30 */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                Governing Static Equilibrium Formulations (Report Pages 27–30)
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="font-mono text-sky-300 mb-1">Moment Equilibrium:</div>
                  <MathView latex="P_2 \frac{L}{2} - \left[\frac{2}{3} \frac{L}{2} W\cos\theta\right] = 0" />
                  <p className="text-[10px] text-slate-400 mt-1">Calculates pivot reaction force P2 = {sim.pinReactionP2N} N.</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="font-mono text-amber-300 mb-1">Maximum Bending Moment:</div>
                  <MathView latex="M_b = \frac{W\cos\theta \cdot (L/2)^2}{8}" />
                  <p className="text-[10px] text-slate-400 mt-1">Occurs at mid-point of analyzed arm link.</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="font-mono text-emerald-300 mb-1">Link Cross-Section:</div>
                  <MathView latex="\sigma = \frac{M_b \cdot y}{I} \le 206.67\text{ MPa}" />
                  <p className="text-[10px] text-slate-400 mt-1">Solid rectangular section: h = 6.1 mm, b = 12.2 mm.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
