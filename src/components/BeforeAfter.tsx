"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gauge, Zap, TrendingUp, RefreshCw } from "lucide-react";

interface VehicleSpec {
  name: string;
  engine: string;
  stockHp: number;
  tunedHp: number;
  stockTrq: number;
  tunedTrq: number;
  stockTime: string;
  tunedTime: string;
  // SVG Path strings representing Dyno Curves
  // X: RPM (2000 to 7000), Y: Output (scaled)
  stockHpPath: string;
  tunedHpPath: string;
  stockTrqPath: string;
  tunedTrqPath: string;
}

export default function BeforeAfter() {
  const vehicles: VehicleSpec[] = [
    {
      name: "AUDI RS6 AVANT (C8)",
      engine: "4.0 TFSI V8 Twin-Turbo",
      stockHp: 600,
      tunedHp: 725,
      stockTrq: 800,
      tunedTrq: 980,
      stockTime: "3.6s",
      tunedTime: "3.0s",
      // SVG bounds: width=500, height=250. Y increases downwards
      stockHpPath: "M 50 200 Q 150 140 250 100 T 450 70",
      tunedHpPath: "M 50 200 Q 150 110 250 65 T 450 30",
      stockTrqPath: "M 50 160 Q 120 100 250 100 T 450 140",
      tunedTrqPath: "M 50 140 Q 120 60 250 60 T 450 100",
    },
    {
      name: "VOLKSWAGEN GOLF 8 R",
      engine: "2.0 TSI EA888 Gen 4",
      stockHp: 320,
      tunedHp: 405,
      stockTrq: 420,
      tunedTrq: 530,
      stockTime: "4.7s",
      tunedTime: "3.8s",
      stockHpPath: "M 50 210 Q 150 160 250 130 T 450 95",
      tunedHpPath: "M 50 210 Q 150 130 250 90 T 450 50",
      stockTrqPath: "M 50 180 Q 120 120 250 120 T 450 160",
      tunedTrqPath: "M 50 160 Q 120 80 250 80 T 450 120",
    },
    {
      name: "BMW M4 COMPETITION (G82)",
      engine: "3.0 Twin-Turbo S58",
      stockHp: 510,
      tunedHp: 635,
      stockTrq: 650,
      tunedTrq: 820,
      stockTime: "3.5s",
      tunedTime: "2.9s",
      stockHpPath: "M 50 205 Q 150 145 250 95 T 450 60",
      tunedHpPath: "M 50 205 Q 150 115 250 60 T 450 25",
      stockTrqPath: "M 50 170 Q 120 110 250 110 T 450 150",
      tunedTrqPath: "M 50 150 Q 120 70 250 70 T 450 110",
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [sliderVal, setSliderVal] = useState(0); // 0 (Stock) to 100 (Tuned)

  const activeCar = vehicles[activeIdx];

  // Interpolated statistics based on slider value
  const factor = sliderVal / 100;
  const currentHp = Math.round(activeCar.stockHp + (activeCar.tunedHp - activeCar.stockHp) * factor);
  const currentTrq = Math.round(activeCar.stockTrq + (activeCar.tunedTrq - activeCar.stockTrq) * factor);

  // Time is formatted differently (strings), let's parse float for interpolation
  const stockTimeVal = parseFloat(activeCar.stockTime);
  const tunedTimeVal = parseFloat(activeCar.tunedTime);
  const currentTime = (stockTimeVal - (stockTimeVal - tunedTimeVal) * factor).toFixed(1) + "s";

  return (
    <section id="dyno" className="relative bg-[#050505] py-24 sm:py-32 overflow-hidden">
      {/* Background neon details */}
      <div className="absolute top-[20%] left-[80%] h-80 w-80 rounded-full bg-[#E10600]/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.3em] text-[#E10600] uppercase font-display block mb-3">
            Dyno telemetry
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-display leading-[0.9] mb-4">
            DYNO PROVEN
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-600">
              CALIBRATIONS
            </span>
          </h2>
          <p className="text-xs text-neutral-400 font-sans tracking-wide font-light leading-relaxed">
            Drag the sliding power lever below to simulate the software flashes and preview horsepower and torque scaling curves.
          </p>
        </div>

        {/* Vehicle Selectors */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {vehicles.map((v, idx) => (
            <button
              key={v.name}
              onClick={() => {
                setActiveIdx(idx);
                setSliderVal(0); // Reset slider on car change
              }}
              className={`rounded-lg border px-5 py-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 font-display ${
                activeIdx === idx
                  ? "border-[#E10600] bg-[#E10600]/5 text-white shadow-[0_0_15px_rgba(225,6,0,0.15)]"
                  : "border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-white"
              }`}
              id={`dyno-car-btn-${idx}`}
            >
              {v.name.split(" ")[0]} {v.name.split(" ")[1] || ""}
            </button>
          ))}
        </div>

        {/* Interactive Workspace Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Live Telemetry Gauges */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            
            {/* Vehicle Card Info */}
            <div className="rounded-xl border border-white/5 bg-glass p-6">
              <span className="text-[9px] font-bold tracking-widest text-neutral-500 uppercase font-display block mb-1">
                Active Vehicle Profile
              </span>
              <h3 className="text-base font-black tracking-widest text-white uppercase font-display mb-1">
                {activeCar.name}
              </h3>
              <p className="text-xs text-neutral-400 font-sans font-light tracking-wide">
                {activeCar.engine}
              </p>
            </div>

            {/* Live Stats display boxes */}
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
              
              {/* HP Box */}
              <div className="rounded-xl border border-white/5 bg-glass p-5 flex flex-col justify-center relative overflow-hidden group">
                <span className="text-[9px] font-bold tracking-widest text-[#E10600] uppercase font-display mb-1">
                  POWER OUTPUT
                </span>
                <span className="text-2xl sm:text-3xl font-black font-display text-white tabular-nums tracking-tight">
                  {currentHp} <span className="text-xs text-neutral-400 font-sans font-light">HP</span>
                </span>
                <span className="text-[10px] text-neutral-500 font-sans font-light mt-1">
                  Stock: {activeCar.stockHp} HP
                </span>
                <div className="absolute right-3 bottom-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Zap className="h-8 w-8 text-[#E10600]" />
                </div>
              </div>

              {/* Torque Box */}
              <div className="rounded-xl border border-white/5 bg-glass p-5 flex flex-col justify-center relative overflow-hidden group">
                <span className="text-[9px] font-bold tracking-widest text-[#FF5722] uppercase font-display mb-1">
                  PEAK TORQUE
                </span>
                <span className="text-2xl sm:text-3xl font-black font-display text-white tabular-nums tracking-tight">
                  {currentTrq} <span className="text-xs text-neutral-400 font-sans font-light">Nm</span>
                </span>
                <span className="text-[10px] text-neutral-500 font-sans font-light mt-1">
                  Stock: {activeCar.stockTrq} Nm
                </span>
                <div className="absolute right-3 bottom-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <TrendingUp className="h-8 w-8 text-[#FF5722]" />
                </div>
              </div>

              {/* 0-100 acceleration sprint */}
              <div className="rounded-xl border border-white/5 bg-glass p-5 flex flex-col justify-center relative overflow-hidden group">
                <span className="text-[9px] font-bold tracking-widest text-neutral-400 uppercase font-display mb-1">
                  0-100 KM/H
                </span>
                <span className="text-2xl sm:text-3xl font-black font-display text-white tabular-nums tracking-tight">
                  {currentTime}
                </span>
                <span className="text-[10px] text-neutral-500 font-sans font-light mt-1">
                  Stock: {activeCar.stockTime}
                </span>
                <div className="absolute right-3 bottom-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Gauge className="h-8 w-8 text-neutral-400" />
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Dyno Screen & slider */}
          <div className="lg:col-span-8 rounded-xl border border-white/5 bg-glass p-6 sm:p-8 flex flex-col justify-between">
            
            {/* Graph Header */}
            <div className="flex items-center justify-between border-b border-neutral-900 pb-4 mb-6">
              <span className="text-[10px] font-bold tracking-widest text-neutral-400 font-display uppercase">
                ENGINE RPM GAUGE (x1000)
              </span>
              <div className="flex gap-4 text-[9px] font-bold font-display">
                <span className="flex items-center gap-1.5 text-neutral-500">
                  <span className="h-2 w-2 rounded-full bg-neutral-600" /> STOCK
                </span>
                <span className="flex items-center gap-1.5 text-[#E10600]">
                  <span className="h-2 w-2 rounded-full bg-[#E10600] shadow-[0_0_4px_#E10600]" /> K-SPEC TUNED
                </span>
              </div>
            </div>

            {/* SVG Dyno Graph Screen */}
            <div className="relative w-full h-[220px] sm:h-[260px] bg-neutral-950/80 dyno-grid border border-neutral-900 rounded-lg overflow-hidden flex items-end">
              
              <svg className="w-full h-[220px] sm:h-[250px] pointer-events-none" viewBox="0 0 500 250">
                {/* SVG Definitions for clipping mask */}
                <defs>
                  {/* Clip mask linked to sliderVal (scaled width) */}
                  <clipPath id="tuned-reveal-mask">
                    <rect x="0" y="0" width={`${50 + sliderVal * 4}`} height="250" />
                  </clipPath>
                  <linearGradient id="glow-grad-red" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#E10600" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#ff4d47" stopOpacity="1" />
                  </linearGradient>
                </defs>

                {/* Stock Curves (Always Visible, Grey) */}
                <path
                  d={activeCar.stockHpPath}
                  fill="none"
                  stroke="#525252"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                />
                <path
                  d={activeCar.stockTrqPath}
                  fill="none"
                  stroke="#737373"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Tuned Curves (Masked, Glowing Red/Orange) */}
                <g clipPath="url(#tuned-reveal-mask)">
                  {/* Tuned Torque curve */}
                  <path
                    d={activeCar.tunedTrqPath}
                    fill="none"
                    stroke="#FF5722"
                    strokeWidth="3.5"
                    className="drop-shadow-[0_0_6px_rgba(255,87,34,0.5)]"
                  />
                  {/* Tuned Power curve */}
                  <path
                    d={activeCar.tunedHpPath}
                    fill="none"
                    stroke="url(#glow-grad-red)"
                    strokeWidth="4"
                    className="drop-shadow-[0_0_8px_rgba(225,6,0,0.6)]"
                  />
                </g>

                {/* Vertical slider position marker line */}
                {sliderVal > 0 && sliderVal < 100 && (
                  <line
                    x1={`${50 + sliderVal * 4}`}
                    y1="10"
                    x2={`${50 + sliderVal * 4}`}
                    y2="240"
                    stroke="rgba(225, 6, 0, 0.4)"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                )}
              </svg>

              {/* RPM X-Axis ticks */}
              <div className="absolute bottom-2 inset-x-0 px-[10%] flex justify-between text-[8px] font-bold text-neutral-600 font-display">
                <span>2.0K</span>
                <span>3.0K</span>
                <span>4.0K</span>
                <span>5.0K</span>
                <span>6.0K</span>
                <span>7.0K</span>
              </div>
            </div>

            {/* Slider control lever */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold tracking-widest text-[#E10600] font-display uppercase flex items-center gap-1">
                  <RefreshCw className="h-3 w-3 animate-spin" style={{ animationDuration: "6s" }} />
                  TUNING STATUS: {sliderVal === 0 ? "STOCK ENGINE" : sliderVal === 100 ? "STAGE 1 MAP ACTIVATED" : `FLASHING COMPUTER... ${sliderVal}%`}
                </span>
                <span className="text-[10px] font-bold tracking-widest text-neutral-400 font-display">
                  {sliderVal === 100 ? "MAX CALIBRATION" : "DRAG TO INCREASE BOOST"}
                </span>
              </div>

              {/* Lever wrapper */}
              <div className="relative flex items-center h-8 bg-neutral-900 border border-neutral-800 rounded-lg px-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderVal}
                  onChange={(e) => setSliderVal(parseInt(e.target.value))}
                  className="w-full accent-[#E10600] bg-transparent cursor-ew-resize h-full outline-none opacity-80 hover:opacity-100 transition-opacity"
                  id="dyno-slider-control"
                  aria-label="Tuning Power Lever"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
