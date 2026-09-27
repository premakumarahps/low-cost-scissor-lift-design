/**
 * Scissor Lift Report Data, CAD Renders & Cost Architecture
 * Grounded in ME2851 Final Report by Premakumara H.P.S. (Index: 210494D)
 * Department of Mechanical Engineering, University of Moratuwa
 */

export interface CadRenderItem {
  id: string;
  title: string;
  filename: string;
  viewType: 'Isometric 3D' | 'Front View' | 'Right View' | 'Top View' | 'Mechanism Detail';
  description: string;
}

export const CAD_RENDERS: CadRenderItem[] = [
  {
    id: 'render_main_iso',
    title: 'Figure 4: Main Structure Isometric View',
    filename: '/cad_renders/Scissor_Lift_v22.f3d (4).png',
    viewType: 'Isometric 3D',
    description: 'Complete 3D CAD model of the hybrid scissor lift showing 3-tier red aluminum 6061-T6 pantograph arms, blue steel chassis, green stabilizing outriggers, and elevated yellow safety bench.'
  },
  {
    id: 'render_hybrid_power',
    title: 'Figure 6: Dual Hydraulic Cylinder Booster System',
    filename: '/cad_renders/Scissor_Lift_v22.f3d (6).png',
    viewType: 'Mechanism Detail',
    description: 'Detailed view of the dual auxiliary hydraulic cylinders installed at the upper scissor tier that engage automatically at high elevation for load capacity boosting.'
  },
  {
    id: 'render_outriggers',
    title: 'Figure 5: Outrigger Stabilization System',
    filename: '/cad_renders/Scissor_Lift_v22.f3d (5).png',
    viewType: 'Mechanism Detail',
    description: 'Deployable green outriggers extending outwards from the blue base frame to widen the stance and prevent tipping moments at maximum platform extension.'
  },
  {
    id: 'render_safety_bench',
    title: 'Figure 3: Fixed Safety Bench with Guardrails',
    filename: '/cad_renders/Scissor_Lift_v22.f3d (3).png',
    viewType: 'Mechanism Detail',
    description: 'High-safety elevated work platform featuring permanent yellow perimeter guardrails and integrated seating bench providing continuous operator fall protection.'
  },
  {
    id: 'render_horizontal_crank',
    title: 'Figure 2: Horizontal Platform Movement Mechanism',
    filename: '/cad_renders/Scissor_Lift_v22.f3d (2).png',
    viewType: 'Mechanism Detail',
    description: 'Precision lead screw hand crank mechanism allowing fine transverse horizontal platform adjustment without moving the main ground chassis.'
  },
  {
    id: 'render_front_view',
    title: 'Figure 8: Front Elevation Orthographic View',
    filename: '/cad_renders/Scissor_Lift_v22.f3d (1).png',
    viewType: 'Front View',
    description: 'Orthographic front projection illustrating vertical scissor alignment, central guide tracks, and wheelbase dimensions.'
  },
  {
    id: 'render_top_view',
    title: 'Figure 9: Top Plan Orthographic View',
    filename: '/cad_renders/Scissor_Lift_v22.f3d.png',
    viewType: 'Top View',
    description: 'Top plan view showing platform area, horizontal slide rails, outrigger spread footprint, and ergonomic operator workspace.'
  }
];

export interface MarketSurveyItem {
  type: string;
  capacityKg: string;
  liftHeightM: string;
  priceLkr: string;
  drivingMode: string;
  powerSupply: string;
  travelMethod: string;
  pros: string;
  cons: string;
}

export const MARKET_SURVEY_TYPES: MarketSurveyItem[] = [
  {
    type: 'Hydraulic Scissor Lift',
    capacityKg: '200 – 2000 kg',
    liftHeightM: '4 – 18 m',
    priceLkr: '196,119 – 980,596 LKR',
    drivingMode: 'Hydraulic Drive',
    powerSupply: 'Diesel Engine / 3-Phase AC',
    travelMethod: 'Manual Push / Self-Propelled',
    pros: 'High lifting capacity, stable, reliable gravity descent during power failure.',
    cons: 'Higher initial cost, slower operation in colder weather, potential fluid leakage.'
  },
  {
    type: 'Electric Scissor Lift',
    capacityKg: '1200 kg',
    liftHeightM: '4 – 12 m',
    priceLkr: '705,970 – 1,227,774 LKR',
    drivingMode: 'Electric Hydraulic Motor',
    powerSupply: 'AC Power / DC Battery',
    travelMethod: 'Self-Propelled Wheels',
    pros: 'Quiet operation, zero emissions, ideal for indoor warehousing.',
    cons: 'Limited to flat floors, battery runtime constraints requiring charging breaks.'
  },
  {
    type: 'Diesel Scissor Lift',
    capacityKg: '1500 – 3500 kg',
    liftHeightM: '6 – 18 m',
    priceLkr: '1,074,302 – 3,069,437 LKR',
    drivingMode: 'Engine Hydraulic Drive',
    powerSupply: 'Diesel Combustion Engine',
    travelMethod: 'Self-Propelled 4WD',
    pros: 'High outdoor lifting capacity and long runtimes without recharging.',
    cons: 'Noisy, exhaust fumes restrict indoor use, bulky footprint.'
  },
  {
    type: 'Rough Terrain Scissor Lift',
    capacityKg: '3700 kg',
    liftHeightM: '10 – 18 m',
    priceLkr: '3,069,437 – 12,277,748 LKR',
    drivingMode: 'Heavy Hydraulic 4WD',
    powerSupply: 'High-Output Diesel Engine',
    travelMethod: 'Large Lug Tires 4WD',
    pros: 'Exceptional traction on mud and gravel, expandable outriggers, massive capacity.',
    cons: 'Extremely high capital expense, heavy transport weight, high fuel consumption.'
  },
  {
    type: 'Pneumatic Scissor Lift',
    capacityKg: '~90 kg (200 lbs)',
    liftHeightM: '~0.75 m (29 inches)',
    priceLkr: '276,249 – 306,943 LKR',
    drivingMode: 'Compressed Air Cylinders',
    powerSupply: 'Shop Compressed Air',
    travelMethod: 'Stationary / Manual Castors',
    pros: 'Clean (no oil or electrical hazards), ideal for explosive or cleanroom zones.',
    cons: 'Air compressibility limits fine control, low capacity, high air consumption.'
  },
  {
    type: 'Proposed Enhanced Hybrid Lift',
    capacityKg: '200 – 425 kg design',
    liftHeightM: '3.0 – 4.5 m (Adjustable)',
    priceLkr: '1,185,000 LKR ($3,800 USD)',
    drivingMode: 'Electric Motor + Dual Hydraulic Boosters',
    powerSupply: '230V Domestic AC Grid',
    travelMethod: 'Castor Wheels + Deployable Outriggers',
    pros: 'Quiet indoor electric operation, hydraulic power boost at max height, horizontal crank adjustment, safety bench, low cost.',
    cons: 'Requires 230V connection or small portable pack, dual system integration.'
  }
];

export interface CostItem {
  category: 'Raw Materials' | 'Purchased Components' | 'Additional Features' | 'Manufacturing Operations';
  item: string;
  specification: string;
  quantity: string;
  unitCostLkr: number;
  totalCostLkr: number;
}

export const BILL_OF_MATERIALS: CostItem[] = [
  // Raw Materials
  { category: 'Raw Materials', item: 'Aluminum Alloy (6061-T6)', specification: 'Top platform, scissor arms, cross links', quantity: '50 kg', unitCostLkr: 500, totalCostLkr: 25000 },
  { category: 'Raw Materials', item: 'High-Strength Steel (ASTM A36)', specification: 'Base platform & foundation ballast', quantity: '100 kg', unitCostLkr: 200, totalCostLkr: 20000 },
  { category: 'Raw Materials', item: 'High-Strength Steel (AISI 1045)', specification: 'Pivot connecting pins', quantity: '10 pins', unitCostLkr: 1000, totalCostLkr: 10000 },
  
  // Purchased Components
  { category: 'Purchased Components', item: 'Electric Motor', specification: '230V AC quiet induction drive', quantity: '1 unit', unitCostLkr: 100000, totalCostLkr: 100000 },
  { category: 'Purchased Components', item: 'Dual Hydraulic Cylinders', specification: 'Auxiliary lift booster actuators', quantity: '2 units', unitCostLkr: 60000, totalCostLkr: 120000 },
  { category: 'Purchased Components', item: 'Fixed Safety Bench & Guardrails', specification: 'Fall protection structure', quantity: '1 unit', unitCostLkr: 40000, totalCostLkr: 40000 },
  { category: 'Purchased Components', item: 'Long Deployable Outriggers', specification: 'Base stabilizer arms', quantity: '1 set', unitCostLkr: 30000, totalCostLkr: 30000 },
  { category: 'Purchased Components', item: 'Pivot Connecting Pins', specification: 'Machined steel hardware', quantity: '10 units', unitCostLkr: 1000, totalCostLkr: 10000 },
  
  // Additional Features
  { category: 'Additional Features', item: 'Horizontal Movement Crank Mechanism', specification: 'Lead screw slide table', quantity: '1 mechanism', unitCostLkr: 20000, totalCostLkr: 20000 },
  { category: 'Additional Features', item: 'Wireless Controls (Optional)', specification: 'Remote operator pendant', quantity: '1 unit', unitCostLkr: 30000, totalCostLkr: 30000 },
  { category: 'Additional Features', item: 'Smart Safety Weight Sensors', specification: 'Overload limit switches', quantity: '1 set', unitCostLkr: 40000, totalCostLkr: 40000 },
  
  // Manufacturing Operations
  { category: 'Manufacturing Operations', item: 'Machining (Cutting, Drilling, Milling)', specification: '50 hours @ 10,000 LKR/hr', quantity: '50 hours', unitCostLkr: 10000, totalCostLkr: 500000 },
  { category: 'Manufacturing Operations', item: 'Welding & Assembly Fabrication', specification: '20 hours @ 12,000 LKR/hr', quantity: '20 hours', unitCostLkr: 12000, totalCostLkr: 240000 },
];

export const COST_SUMMARY = {
  totalMaterialsLkr: 55000,
  totalComponentsLkr: 300000,
  totalAdditionalFeaturesLkr: 90000,
  totalManufacturingLkr: 740000,
  grandTotalCostLkr: 1185000,
  grandTotalCostUsd: 3820
};

export interface ReportPageData {
  pageNumber: number;
  chapter: string;
  title: string;
  summary: string;
  image: string;
}

export const REPORT_PAGES: ReportPageData[] = [
  { pageNumber: 1, chapter: 'Title & Cover', title: 'ME2851: Low-Cost Scissor Lift Design Report', summary: 'Cover page: Module ME2851, Semester 4, Premakumara H.P.S. (210494D), Department of Mechanical Engineering, University of Moratuwa.', image: '/report_pages/page_01.png' },
  { pageNumber: 2, chapter: 'Table of Contents', title: 'Table of Contents', summary: 'Outlines the 10 major technical chapters from Market Survey to Stress Calculations and Cost Analysis.', image: '/report_pages/page_02.png' },
  { pageNumber: 3, chapter: '1. Introduction', title: 'Industrial Need for Cost-Effective MEWPs', summary: 'Introduction to Mobile Elevated Work Platforms (MEWPs) and motivation to engineer an economically viable lift.', image: '/report_pages/page_03.png' },
  { pageNumber: 4, chapter: '2. Market Survey', title: 'Hydraulic Scissor Lift Survey', summary: 'Analysis of hydraulic lifts: 200-2000kg capacity, 4-18m height, diesel/electric drive modes and costs.', image: '/report_pages/page_04.png' },
  { pageNumber: 5, chapter: '2. Market Survey', title: 'Electric Scissor Lifts & Design Shortcomings', summary: 'Battery powered electric lifts: quiet operation, 1200kg capacity, zero emissions, and flat floor limitations.', image: '/report_pages/page_05.png' },
  { pageNumber: 6, chapter: '2. Market Survey', title: 'Electric Lift Features & Pricing', summary: 'Pricing from 705,970 to 1,227,774 LKR, self-propulsion systems, and indoor suitability.', image: '/report_pages/page_06.png' },
  { pageNumber: 7, chapter: '2. Market Survey', title: 'Diesel Scissor Lifts', summary: 'Heavy outdoor models: 1500-3500kg capacity, rough surface handling, pricing up to 3M LKR.', image: '/report_pages/page_07.png' },
  { pageNumber: 8, chapter: '2. Market Survey', title: 'Rough Terrain Scissor Lifts', summary: 'Heavy 4WD construction lifts: 3700kg capacity, large lug tires, pricing up to 12M LKR.', image: '/report_pages/page_08.png' },
  { pageNumber: 9, chapter: '2. Market Survey', title: 'Rough Terrain Special Features', summary: 'High ground clearance, dual operator controls, and expandable outriggers.', image: '/report_pages/page_09.png' },
  { pageNumber: 10, chapter: '2. Market Survey', title: 'Pneumatic Scissor Lifts', summary: 'Compressed air lifts: cleanroom application, lower capacity (~200 lbs), pricing 276k-306k LKR.', image: '/report_pages/page_10.png' },
  { pageNumber: 11, chapter: '2. Market Survey', title: 'Pneumatic Features & Limitations', summary: 'Eliminates hydraulic oil contamination, simple maintenance, but air compressibility limits precision.', image: '/report_pages/page_11.png' },
  { pageNumber: 12, chapter: '2. Market Survey', title: 'Pneumatic Shortcomings & Solutions', summary: 'Air consumption and moisture susceptibility addressed through hybrid air-hydraulic and filter designs.', image: '/report_pages/page_12.png' },
  { pageNumber: 13, chapter: '2. Market Survey', title: 'Hybrid & Pneumatic Improvements', summary: 'Enclosed soundproofing, variable speed controls, and corrosion-resistant materials.', image: '/report_pages/page_13.png' },
  { pageNumber: 14, chapter: '2. Market Survey', title: 'Master Market Survey Comparison Matrix', summary: 'Comprehensive pros and cons table across Hydraulic, Diesel, Electric, Rough Terrain, and Pneumatic lifts.', image: '/report_pages/page_14.png' },
  { pageNumber: 15, chapter: '3. Customer Requirements', title: 'Core Design Features & Constraints', summary: 'Lifting mechanism, platform, chassis, safety features, portability, and industrial budget constraints.', image: '/report_pages/page_15.png' },
  { pageNumber: 16, chapter: '4. Proposed Designs', title: 'Shortcomings Summary & Conceptual Proposals', summary: 'Transition from commercial lift limitations to 4 custom conceptual designs.', image: '/report_pages/page_16.png' },
  { pageNumber: 17, chapter: '4. Proposed Designs', title: 'Proposals 1 & 2: Hybrid & Pneumatic', summary: 'Proposal 1: Hybrid electric + hydraulic booster. Proposal 2: Improved dual-filtration pneumatic.', image: '/report_pages/page_17.png' },
  { pageNumber: 18, chapter: '4. Proposed Designs', title: 'Proposals 3 & 4: Simplified Electric & Manual', summary: 'Proposal 3: Manual push electric lift. Proposal 4: Hand crank screw jack with base counterweight.', image: '/report_pages/page_18.png' },
  { pageNumber: 19, chapter: '5. Best Design Selection', title: 'Decision Matrix & Scoring', summary: 'Weighting criteria: Cost (8), Functionality (7), Safety (10), Maintenance (7), Environment (5). Hybrid scores 36/37!', image: '/report_pages/page_19.png' },
  { pageNumber: 20, chapter: '6. Best Final Design', title: 'Enhanced Hybrid Scissor Lift Features', summary: 'Selection of Enhanced Hybrid Lift: Horizontal platform lead screw adjustment and extendable outriggers.', image: '/report_pages/page_20.png' },
  { pageNumber: 21, chapter: '6. Best Final Design', title: 'Safety Bench & 230V AC Hybrid Power', summary: 'Fixed safety bench with 1m guardrails and quiet 230V domestic AC electric primary motor.', image: '/report_pages/page_21.png' },
  { pageNumber: 22, chapter: '6. Best Final Design', title: 'Hydraulic Booster Power Unit', summary: 'Two booster cylinders with holding valve and release valve for controlled ascent and descent.', image: '/report_pages/page_22.png' },
  { pageNumber: 23, chapter: '6. Best Final Design', title: 'CAD Render Showcase (Figures 1-9)', summary: 'Fusion 360 views: Isometric, Front, Right, Top views, outriggers, and safety bench.', image: '/report_pages/page_23.png' },
  { pageNumber: 24, chapter: '7. Designing Calculations', title: 'Design Procedure & Sizing Steps', summary: 'Material selection, scissor arm kinematics, power unit sizing, platform and base structure.', image: '/report_pages/page_24.png' },
  { pageNumber: 25, chapter: '7. Designing Calculations', title: '7.1 Material Selection & Properties', summary: 'Top Platform: 6061-T6 Al (250 MPa yield). Base: ASTM A36 Steel (255 MPa yield). Pins: AISI 1045 (585 MPa).', image: '/report_pages/page_25.png' },
  { pageNumber: 26, chapter: '7. Designing Calculations', title: '7.2 Kinematic Free-Body Diagram', summary: 'Free-body diagram of scissor linkages, link length L=1m, load distribution, and reaction forces.', image: '/report_pages/page_26.png' },
  { pageNumber: 27, chapter: '7. Designing Calculations', title: '7.2.1 Scissor Lift Link Analysis', summary: 'Total mass = 124.2 kg, payload = 2000 N, FoS = 1.5 -> total design mass = 424.2 kg (Load P = 4242 N, W = 1060.5 N).', image: '/report_pages/page_27.png' },
  { pageNumber: 28, chapter: '7. Designing Calculations', title: 'Equilibrium Equations at Theta = 20 Deg', summary: 'Critical minimum elevation angle theta=20 deg: P1 - Wsin(theta) + Rsin(theta) = 0, P2 + Rcos(theta) - Wcos(theta) = 0.', image: '/report_pages/page_28.png' },
  { pageNumber: 29, chapter: '7. Designing Calculations', title: 'Bending Moment & Stress Calculation', summary: 'UVL = 3986.18 N/m, P2 = 664.36 N, R = 353.5 N, P1 = 241.8 N. Allowable stress = 206.67 MPa.', image: '/report_pages/page_29.png' },
  { pageNumber: 30, chapter: '7. Designing Calculations', title: 'Scissor Arm Cross-Section Sizing', summary: 'Max bending moment Mb = 31.14 Nm. Calculated dimensions: thickness h = 6.1 mm, width b = 12.2 mm.', image: '/report_pages/page_30.png' },
  { pageNumber: 31, chapter: '7. Designing Calculations', title: '7.2.1 Pin Sizing Under Torsion & Shear', summary: 'AISI 1045 steel, Torque T = 200 Nm, allowable shear = 77.5 MPa. Calculated D >= 7.2 mm -> Standard D = 10 mm selected.', image: '/report_pages/page_31.png' },
  { pageNumber: 32, chapter: '8. Cost Analysis', title: 'BOM Rates & Manufacturing Costs', summary: 'Material unit prices: Al 6061-T6 @ 500 LKR/kg, Steel A36 @ 200 LKR/kg. Machining 10k LKR/hr, Welding 12k LKR/hr.', image: '/report_pages/page_32.png' },
  { pageNumber: 33, chapter: '8. Cost Analysis', title: 'Total Material & Component Breakdown', summary: 'Materials: 55,000 LKR. Components: 300,000 LKR. Additional features: 90,000 LKR.', image: '/report_pages/page_33.png' },
  { pageNumber: 34, chapter: '8. Cost Analysis & SWOT', title: 'Grand Total Cost & SWOT Analysis', summary: 'Manufacturing: 740,000 LKR. Total Cost = 1,185,000 LKR (~$3,800 USD). SWOT: Strengths & Weaknesses.', image: '/report_pages/page_34.png' },
  { pageNumber: 35, chapter: '9. SWOT Analysis & Refs', title: 'Opportunities, Threats & References', summary: 'Industrial maintenance opportunities, market expansion, and IEEE technical citations.', image: '/report_pages/page_35.png' },
  { pageNumber: 36, chapter: '10. References', title: 'IEEE Research Citations (1-14)', summary: 'Full bibliographic references to scissor lift dynamics, finite element analysis, and stability optimization.', image: '/report_pages/page_36.png' },
  { pageNumber: 37, chapter: 'Annexes', title: 'Annexes: Industrial Market Pricing Data', summary: 'Market pricing survey screenshots from Mtandt Sri Lanka, Ubuy, and Alibaba industrial suppliers.', image: '/report_pages/page_37.png' }
];
