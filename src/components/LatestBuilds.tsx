"use client";

import Image from "next/image";
import { Zap, ShieldAlert, Cpu } from "lucide-react";

interface Build {
  id: string;
  title: string;
  specs: string;
  power: string;
  torque: string;
  gainHp: string;
  gainTrq: string;
  image: string;
  stage: string;
}

export default function LatestBuilds() {
  const builds: Build[] = [
    {
      id: "b-rs3",
      title: "AUDI RS3 8Y SPORTBACK",
      stage: "STAGE 2 CALIBRATION",
      specs: "CSF Intercooler // Eventuri Carbon Intake // Decat Downpipe",
      power: "550 HP",
      torque: "690 Nm",
      gainHp: "+150 HP",
      gainTrq: "+190 Nm",
      image: "/engine_bay.png",
    },
    {
      id: "b-p911",
      title: "PORSCHE 911 TURBO S (992)",
      stage: "STAGE 1 CUSTOM MAP",
      specs: "OEM Hardware // Custom ECU & TCU Calibration",
      power: "780 HP",
      torque: "950 Nm",
      gainHp: "+130 HP",
      gainTrq: "+150 Nm",
      image: "/hero_car.png",
    },
    {
      id: "b-g8r",
      title: "VW GOLF 8 R EA888.4",
      stage: "STAGE 3 HYBRID TURBO",
      specs: "Stage 3 Hybrid Turbo // R600 Intake // Upgraded HPFP & Clutches",
      power: "520 HP",
      torque: "660 Nm",
      gainHp: "+200 HP",
      gainTrq: "+240 Nm",
      image: "/intake_system.png",
    },
  ];

  return (
    <section className="relative bg-[#080808] py-24 sm:py-32 overflow-hidden border-b border-neutral-900">
      <div className="absolute inset-0 bg-carbon-dense opacity-20 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold tracking-[0.3em] text-[#E10600] uppercase font-display block mb-3">
              Telemetry archive
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-display leading-[0.9]">
              LATEST COMPLETED
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-600">
                MACHINES
              </span>
            </h2>
          </div>
          <div className="md:max-w-xs text-left md:text-right">
            <p className="text-xs text-neutral-400 font-sans tracking-wide leading-relaxed font-light">
              Real-world results. Every build shown represents active telemetry verified on our laboratory dyno cell.
            </p>
          </div>
        </div>

        {/* Builds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {builds.map((b) => (
            <div
              key={b.id}
              className="group rounded-xl border border-white/5 bg-glass overflow-hidden shadow-2xl flex flex-col hover:border-[#E10600]/30 transition-all duration-300"
            >
              {/* Build Image */}
              <div className="relative h-48 w-full overflow-hidden bg-neutral-950 border-b border-neutral-900">
                <Image
                  src={b.image}
                  alt={b.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-[4s]"
                />
                
                {/* Stage Badge */}
                <div className="absolute top-4 left-4 rounded bg-[#E10600] px-2.5 py-1 text-[8px] font-bold tracking-widest text-white uppercase font-display shadow-[0_0_8px_#E10600]">
                  {b.stage}
                </div>
              </div>

              {/* Build Details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black tracking-widest text-white uppercase font-display mb-1 group-hover:text-[#E10600] transition-colors">
                    {b.title}
                  </h3>
                  <span className="text-[10px] text-neutral-500 font-sans font-light tracking-wide block mb-6">
                    {b.specs}
                  </span>
                </div>

                {/* Telemetry Output Boxes */}
                <div className="border-t border-neutral-900 pt-4 grid grid-cols-2 gap-4">
                  
                  {/* Power telemetry block */}
                  <div className="bg-neutral-950/60 rounded-lg p-3 border border-neutral-900">
                    <span className="text-[8px] font-bold tracking-widest text-neutral-500 uppercase font-display block mb-1">
                      FINAL POWER
                    </span>
                    <span className="text-base font-black font-display text-white tracking-tight">
                      {b.power}
                    </span>
                    <span className="text-[8px] font-bold text-[#E10600] block mt-0.5">
                      {b.gainHp} HP Gain
                    </span>
                  </div>

                  {/* Torque telemetry block */}
                  <div className="bg-neutral-950/60 rounded-lg p-3 border border-neutral-900">
                    <span className="text-[8px] font-bold tracking-widest text-neutral-500 uppercase font-display block mb-1">
                      PEAK TORQUE
                    </span>
                    <span className="text-base font-black font-display text-white tracking-tight">
                      {b.torque}
                    </span>
                    <span className="text-[8px] font-bold text-[#FF5722] block mt-0.5">
                      {b.gainTrq} Nm Gain
                    </span>
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
