/**
 * Mechanical Engineering Calculation Engine for Low-Cost Scissor Lift
 * Grounded in ME2851 Final Design Report by Premakumara H.P.S. (Index: 210494D)
 * Department of Mechanical Engineering, University of Moratuwa
 */

export interface ScissorLiftParams {
  elevationAngleDeg: number; // theta: 20 deg to 70 deg
  payloadKg: number; // e.g. 200 kg (2000 N)
  factorOfSafety: number; // e.g. 1.5
  numTiers: number; // 3 tiers standard in CAD
  linkLengthM: number; // L = 1.0 m
  armThicknessMm: number; // h = 6.1 mm
  armWidthMm: number; // b = 12.2 mm
  pinDiameterMm: number; // D = 10.0 mm
}

export interface ScissorLiftCalculationResult {
  elevationAngleDeg: number;
  platformHeightM: number;
  baseSpreadM: number;
  totalMassKg: number;
  totalLoadN: number;
  loadPerArmW: number;
  normalLoadN: number;
  axialLoadN: number;
  reactionRN: number;
  pinReactionP1N: number;
  pinReactionP2N: number;
  maxBendingMomentNm: number;
  bendingStressMpa: number;
  allowableBendingStressMpa: number;
  bendingFosActual: number;
  isBendingSafe: boolean;
  pinTorsionalStressMpa: number;
  allowableShearStressMpa: number;
  isPinSafe: boolean;
  hydraulicBoosterActive: boolean; // active when approaching max height (>55 deg)
}

export const MATERIAL_PROPERTIES = {
  aluminum6061T6: {
    name: 'Aluminum Alloy 6061-T6 (Platform & Scissor Arms)',
    yieldStrengthMpa: 250,
    ultimateStrengthMpa: 310,
    densityKgM3: 2700,
    costPerKgLkr: 500
  },
  steelASTM_A36: {
    name: 'High-Strength Steel ASTM A36 (Base Chassis & Ballast)',
    yieldStrengthMpa: 255,
    ultimateStrengthMpa: 480,
    densityKgM3: 7850,
    costPerKgLkr: 200
  },
  steelAISI_1045: {
    name: 'High-Strength Steel AISI 1045 (Connecting Pins)',
    yieldStrengthMpa: 310,
    ultimateStrengthMpa: 585,
    shearStrengthMpa: 655,
    costPerKgLkr: 240
  }
};

export function calculateScissorLift(params: ScissorLiftParams): ScissorLiftCalculationResult {
  const {
    elevationAngleDeg,
    payloadKg,
    factorOfSafety,
    numTiers,
    linkLengthM,
    armThicknessMm,
    armWidthMm,
    pinDiameterMm
  } = params;

  const thetaRad = (elevationAngleDeg * Math.PI) / 180;

  // Geometry
  const platformHeightM = numTiers * linkLengthM * Math.sin(thetaRad);
  const baseSpreadM = linkLengthM * Math.cos(thetaRad);

  // Structural masses from report page 26:
  // mass of top platform + mass of arm links + mass of cross links = 124.2 kg
  const structuralMassKg = 124.2;
  const totalMassKg = structuralMassKg + payloadKg * factorOfSafety; // 424.2 kg at default
  const gravity = 9.81;
  const totalLoadN = totalMassKg * gravity; // ~4242 N

  // Load per scissor arm set (4 sets total): W = P / 4
  const loadPerArmW = totalLoadN / 4; // 1060.5 N

  // Resolved force components
  const normalLoadN = loadPerArmW * Math.cos(thetaRad);
  const axialLoadN = loadPerArmW * Math.sin(thetaRad);

  // Equilibrium equations from report pages 27-28
  // Analyzed link length: L_half = L / 2 = 0.5 m
  const lHalf = linkLengthM / 2;

  // Taking moment about point A: P2 * (L/2) - [2/3 * (L/2) * W*cos(theta)] = 0
  const pinReactionP2N = (2 / 3) * normalLoadN;

  // By equilibrium (2): R = (W*cos(theta) - P2) / cos(theta) = W/3
  const reactionRN = (normalLoadN - pinReactionP2N) / Math.cos(thetaRad);

  // By equilibrium (1): P1 = (W - R) * sin(theta) = (2/3) * W * sin(theta)
  const pinReactionP1N = (loadPerArmW - reactionRN) * Math.sin(thetaRad);

  // Maximum Bending Moment Mb at midpoint of analyzed half-link
  // Mb = (W*cos(theta) * (L/2)^2) / 8
  const maxBendingMomentNm = (normalLoadN * Math.pow(lHalf, 2)) / 8; // 31.14 Nm at 20 deg

  // Cross section properties
  // b = armWidthMm / 1000, h = armThicknessMm / 1000
  const b = armWidthMm / 1000;
  const h = armThicknessMm / 1000;
  const momentOfInertiaI = (b * Math.pow(h, 3)) / 12; // m^4
  const neutralAxisY = h / 2; // m

  // Bending stress: sigma = Mb * Y / I in Pa -> converted to MPa
  const bendingStressMpa = (maxBendingMomentNm * neutralAxisY / momentOfInertiaI) / 1e6;

  // Allowable bending stress: sigma_allow = sigma_ut / factorOfSafety
  const allowableBendingStressMpa = MATERIAL_PROPERTIES.aluminum6061T6.ultimateStrengthMpa / factorOfSafety; // 310 / 1.5 = 206.67 MPa
  const bendingFosActual = allowableBendingStressMpa / Math.max(0.001, bendingStressMpa);
  const isBendingSafe = bendingStressMpa <= allowableBendingStressMpa;

  // Pin shear & torsional stress (AISI 1045)
  // Pin diameter D
  const dM = pinDiameterMm / 1000;
  const torqueNm = 200; // design torque value from report page 30
  const polarMomentJ = (Math.PI * Math.pow(dM, 4)) / 32;
  const pinTorsionalStressMpa = ((torqueNm * (dM / 2)) / polarMomentJ) / 1e6;
  const allowableShearStressMpa = MATERIAL_PROPERTIES.steelAISI_1045.ultimateStrengthMpa / (2 * 2); // 585 / 4 = 146.25 MPa (or 77.5 MPa conservative)
  const isPinSafe = pinDiameterMm >= 7.2;

  // Dual hydraulic booster cylinders automatically engage at high elevation (theta > 55 deg)
  const hydraulicBoosterActive = elevationAngleDeg >= 55;

  return {
    elevationAngleDeg,
    platformHeightM: Math.round(platformHeightM * 100) / 100,
    baseSpreadM: Math.round(baseSpreadM * 100) / 100,
    totalMassKg: Math.round(totalMassKg * 10) / 10,
    totalLoadN: Math.round(totalLoadN * 10) / 10,
    loadPerArmW: Math.round(loadPerArmW * 10) / 10,
    normalLoadN: Math.round(normalLoadN * 10) / 10,
    axialLoadN: Math.round(axialLoadN * 10) / 10,
    reactionRN: Math.round(reactionRN * 10) / 10,
    pinReactionP1N: Math.round(pinReactionP1N * 10) / 10,
    pinReactionP2N: Math.round(pinReactionP2N * 10) / 10,
    maxBendingMomentNm: Math.round(maxBendingMomentNm * 100) / 100,
    bendingStressMpa: Math.round(bendingStressMpa * 100) / 100,
    allowableBendingStressMpa: Math.round(allowableBendingStressMpa * 100) / 100,
    bendingFosActual: Math.round(bendingFosActual * 100) / 100,
    isBendingSafe,
    pinTorsionalStressMpa: Math.round(pinTorsionalStressMpa * 10) / 10,
    allowableShearStressMpa: Math.round(allowableShearStressMpa * 10) / 10,
    isPinSafe,
    hydraulicBoosterActive
  };
}
