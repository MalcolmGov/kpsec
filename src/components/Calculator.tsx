"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sliders, Cpu, DollarSign, Activity, Settings, HelpCircle } from "lucide-react";

interface TuneStage {
  label: string;
  hpGain: number;
  trqGain: number;
  cost: number;
  packageText: string;
  hardwareText: string;
}

interface EngineOption {
  name: string;
  stockHp: number;
  stockTrq: number;
  stages: {
    [key: string]: TuneStage;
  };
}

interface BrandOption {
  brand: string;
  engines: EngineOption[];
}

export default function Calculator() {
  const calculatorData: BrandOption[] = [
    {
      brand: "VOLKSWAGEN",
      engines: [
        {
          name: "Golf 8 R (2.0 TSI EA888 Gen 4)",
          stockHp: 320,
          stockTrq: 420,
          stages: {
            "1": {
              label: "STAGE 1",
              hpGain: 85,
              trqGain: 110,
              cost: 12500,
              packageText: "Stage 1 Custom ECU & DSG Software",
              hardwareText: "No hardware required. (Stock filter recommended)",
            },
            "2": {
              label: "STAGE 2",
              hpGain: 130,
              trqGain: 170,
              cost: 48900,
              packageText: "Stage 2 Software & Flow Package",
              hardwareText: "Includes: R600 Cold Air Intake, Decat Downpipe, Upgraded Intercooler",
            },
            "3": {
              label: "STAGE 3",
              hpGain: 200,
              trqGain: 240,
              cost: 125000,
              packageText: "Stage 3 Hybrid Turbo Package",
              hardwareText: "Includes: Stage 3 Hybrid Turbo, Upgraded HPFP, Upgraded Clutch Packs",
            },
          },
        },
        {
          name: "Golf 7.5 GTI (2.0 TSI EA888 Gen 3)",
          stockHp: 230,
          stockTrq: 350,
          stages: {
            "1": {
              label: "STAGE 1",
              hpGain: 70,
              trqGain: 90,
              cost: 11500,
              packageText: "Stage 1 Custom ECU & DSG Software",
              hardwareText: "No hardware required.",
            },
            "2": {
              label: "STAGE 2",
              hpGain: 105,
              trqGain: 130,
              cost: 38500,
              packageText: "Stage 2 Performance Bundle",
              hardwareText: "Includes: Cold Air Intake, Catless Downpipe, Upgraded Intercooler",
            },
            "3": {
              label: "STAGE 3",
              hpGain: 180,
              trqGain: 210,
              cost: 95000,
              packageText: "Stage 3 IS38 Hybrid Turbocharger Pack",
              hardwareText: "Includes: IS38 Hybrid Turbocharger, Wagner Tuning Intercooler, Autotech HPFP",
            },
          },
        },
      ],
    },
    {
      brand: "AUDI",
      engines: [
        {
          name: "RS3 Sportback / Sedan (8Y 2.5 TFSI)",
          stockHp: 400,
          stockTrq: 500,
          stages: {
            "1": {
              label: "STAGE 1",
              hpGain: 90,
              trqGain: 120,
              cost: 14500,
              packageText: "Stage 1 Custom ECU & DSG Software",
              hardwareText: "No hardware required. (Panel filter optional)",
            },
            "2": {
              label: "STAGE 2",
              hpGain: 150,
              trqGain: 190,
              cost: 64900,
              packageText: "Stage 2 Performance Flow Bundle",
              hardwareText: "Includes: Carbon Fiber Intake, 4-inch Turbo Inlet, Downpipe, Intercooler",
            },
            "3": {
              label: "STAGE 3",
              hpGain: 280,
              trqGain: 320,
              cost: 155000,
              packageText: "Stage 3 TTE700 Hybrid Turbo Package",
              hardwareText: "Includes: TTE700 Hybrid Turbo, Upgraded HPFP/LPFP, Stage 2 Water-Meth kit",
            },
          },
        },
      ],
    },
    {
      brand: "BMW",
      engines: [
        {
          name: "M3 / M4 Competition (G80/G82 S58)",
          stockHp: 510,
          stockTrq: 650,
          stages: {
            "1": {
              label: "STAGE 1",
              hpGain: 125,
              trqGain: 170,
              cost: 16500,
              packageText: "Stage 1 Custom ECU ECU software (FEMTO unlock)",
              hardwareText: "Requires ECU unlock shipping. No hardware required.",
            },
            "2": {
              label: "STAGE 2",
              hpGain: 190,
              trqGain: 230,
              cost: 78500,
              packageText: "Stage 2 Full Exhaust & Calibration Pack",
              hardwareText: "Includes: Twin intake induction, Catless downpipes, Exhaust midpipes",
            },
            "3": {
              label: "STAGE 3",
              hpGain: 340,
              trqGain: 390,
              cost: 195000,
              packageText: "Stage 3 Pure750 Upgrade Pack",
              hardwareText: "Includes: Pure750 Custom Turbos, Port Fuel Injection, CSF Manifold",
            },
          },
        },
      ],
    },
  ];

  const [brandIdx, setBrandIdx] = useState(0);
  const [engineIdx, setEngineIdx] = useState(0);
  const [stageKey, setStageKey] = useState("1"); // "1", "2", "3"

  const selectedBrand = calculatorData[brandIdx];
  const selectedEngine = selectedBrand.engines[engineIdx] || selectedBrand.engines[0];
  const selectedStage = selectedEngine.stages[stageKey];

  const finalHp = selectedEngine.stockHp + selectedStage.hpGain;
  const finalTrq = selectedEngine.stockTrq + selectedStage.trqGain;

  // Handle brand dropdown change, reset engine
  const handleBrandChange = (idx: number) => {
    setBrandIdx(idx);
    setEngineIdx(0);
  };

  return (
    <section id="calculator" className="relative bg-[#050505] py-24 sm:py-32 overflow-hidden border-t border-neutral-900">
      {/* Background glow neon red circle */}
      <div className="absolute top-[20%] left-[80%] h-96 w-96 rounded-full bg-[#E10600]/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.3em] text-[#E10600] uppercase font-display block mb-3">
            Calibration tool
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-display leading-[0.9] mb-4">
            PERFORMANCE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-600">
              CALCULATOR
            </span>
          </h2>
          <p className="text-xs text-neutral-400 font-sans tracking-wide font-light leading-relaxed">
            Select your vehicle profile and modification stage to calculate estimated output curves and package pricing instantly.
          </p>
        </div>

        {/* Calculator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Input Selectors */}
          <div className="lg:col-span-6 rounded-xl border border-white/5 bg-glass p-6 sm:p-8 flex flex-col justify-between">
            
            <div className="space-y-6">
              {/* Brand Selector */}
              <div>
                <label className="text-[10px] font-bold tracking-widest text-[#E10600] uppercase font-display block mb-2" htmlFor="calc-brand-select">
                  1. SELECT VEHICLE MAKE
                </label>
                <select
                  id="calc-brand-select"
                  value={brandIdx}
                  onChange={(e) => handleBrandChange(parseInt(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3.5 text-xs text-white font-display focus:border-[#E10600] outline-none"
                >
                  {calculatorData.map((b, i) => (
                    <option key={b.brand} value={i}>
                      {b.brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Engine Selector */}
              <div>
                <label className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase font-display block mb-2" htmlFor="calc-engine-select">
                  2. SELECT ENGINE PROFILE
                </label>
                <select
                  id="calc-engine-select"
                  value={engineIdx}
                  onChange={(e) => setEngineIdx(parseInt(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3.5 text-xs text-white font-display focus:border-[#E10600] outline-none"
                >
                  {selectedBrand.engines.map((eng, i) => (
                    <option key={eng.name} value={i}>
                      {eng.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stage Select button group */}
              <div>
                <label className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase font-display block mb-3">
                  3. CHOOSE TUNING STAGE
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {Object.keys(selectedEngine.stages).map((key) => {
                    const stg = selectedEngine.stages[key];
                    return (
                      <button
                        key={key}
                        onClick={() => setStageKey(key)}
                        className={`rounded-lg border p-4 text-center transition-all duration-300 ${
                          stageKey === key
                            ? "border-[#E10600] bg-[#E10600]/5 text-white shadow-[0_0_15px_rgba(225,6,0,0.15)]"
                            : "border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-white"
                        }`}
                        id={`calc-stage-btn-${key}`}
                      >
                        <span className="block text-xs font-black font-display tracking-widest uppercase">
                          {stg.label}
                        </span>
                        <span className="block text-[8px] text-neutral-500 font-sans tracking-wide font-light mt-1">
                          +{stg.hpGain} HP
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Note alert */}
            <div className="mt-8 pt-6 border-t border-neutral-900 flex gap-3 text-[10px] text-neutral-500 font-sans font-light leading-relaxed">
              <HelpCircle className="h-4 w-4 text-neutral-600 shrink-0" />
              <span>Gains are indicative and based on premium pump fuel. Higher octane or custom blends (Ethanol/NF) will yield higher parameters.</span>
            </div>

          </div>

          {/* Right Column: Calculations & Recommended Package */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            
            {/* Odometer dials */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* HP result */}
              <div className="rounded-xl border border-white/5 bg-glass p-6 text-center relative overflow-hidden group">
                <span className="text-[9px] font-bold tracking-widest text-[#E10600] uppercase font-display block mb-1">
                  ESTIMATED HP
                </span>
                <span className="text-3xl sm:text-4xl font-black font-display text-white tabular-nums tracking-tight block">
                  {finalHp} <span className="text-xs text-neutral-400 font-sans font-light">HP</span>
                </span>
                <div className="mt-2 text-[10px] text-neutral-500 font-sans font-light flex items-center justify-center gap-1.5">
                  <span>Stock: {selectedEngine.stockHp} HP</span>
                  <span className="text-[#E10600] font-bold">+{selectedStage.hpGain} HP</span>
                </div>
                <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-[#E10600]/10 to-transparent pointer-events-none" />
              </div>

              {/* Torque result */}
              <div className="rounded-xl border border-white/5 bg-glass p-6 text-center relative overflow-hidden group">
                <span className="text-[9px] font-bold tracking-widest text-[#FF5722] uppercase font-display block mb-1">
                  ESTIMATED TORQUE
                </span>
                <span className="text-3xl sm:text-4xl font-black font-display text-white tabular-nums tracking-tight block">
                  {finalTrq} <span className="text-xs text-neutral-400 font-sans font-light">Nm</span>
                </span>
                <div className="mt-2 text-[10px] text-neutral-500 font-sans font-light flex items-center justify-center gap-1.5">
                  <span>Stock: {selectedEngine.stockTrq} Nm</span>
                  <span className="text-[#FF5722] font-bold">+{selectedStage.trqGain} Nm</span>
                </div>
                <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-[#FF5722]/10 to-transparent pointer-events-none" />
              </div>

            </div>

            {/* Recommended package card */}
            <div className="rounded-xl border border-white/5 bg-glass p-6 sm:p-8 flex-grow flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-neutral-900 pb-3">
                  <span className="text-[10px] font-bold tracking-widest text-neutral-400 font-display uppercase">
                    RECOMMENDED PACKAGE
                  </span>
                  <span className="text-xs font-black font-display text-[#E10600]">
                    R {selectedStage.cost.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-start gap-3.5 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-[#E10600]/10 border border-[#E10600]/25 flex items-center justify-center text-[#E10600] shrink-0 mt-0.5">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black tracking-widest text-white uppercase font-display mb-1">
                      {selectedStage.packageText}
                    </h3>
                    <p className="text-[11px] text-neutral-400 font-sans leading-relaxed tracking-wide font-light">
                      {selectedStage.hardwareText}
                    </p>
                  </div>
                </div>
              </div>

              {/* Book package cta */}
              <div className="mt-6 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <span className="text-[9px] font-sans font-light tracking-wide text-neutral-500 block">
                    Estimated Calibration Time
                  </span>
                  <span className="text-xs font-bold tracking-widest text-white font-display uppercase">
                    3.5 - 6.0 HOURS
                  </span>
                </div>
                <a
                  href="#booking"
                  className="w-full sm:w-auto flex items-center justify-center rounded-lg bg-[#E10600] hover:bg-[#b00500] px-5 py-3 text-[10px] font-bold tracking-[0.2em] uppercase text-white shadow-[0_0_15px_rgba(225,6,0,0.3)] transition-all duration-300 font-display"
                  id="calc-booking-cta"
                >
                  BOOK THIS CALIBRATION
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
