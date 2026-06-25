"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Activity, Wrench, Fuel, Database, ShieldAlert, ChevronRight } from "lucide-react";

export default function Services() {
  const services = [
    {
      code: "CALIBRATION // ECU",
      title: "ECU TUNING",
      desc: "Custom calibrated maps tailored to your engine specifications. Maximum torque, linear power, and OEM reliability.",
      icon: Cpu,
      stats: "Up to +45% Power Gain",
      index: "01",
    },
    {
      code: "TELEMETRY // TCU",
      title: "DSG / TCU TUNING",
      desc: "Optimised gearbox software: faster shift times, custom launch control, and increased clutch clamping pressure.",
      icon: Activity,
      stats: "Shift Times -150ms",
      index: "02",
    },
    {
      code: "HARDWARE // STAGE",
      title: "PERFORMANCE PARTS",
      desc: "Hardware upgrades engineered for maximum flow. Bolt-on intakes, exhausts, turbos, and cooling packages.",
      icon: Wrench,
      stats: "Akrapovič, RacingLine, etc.",
      index: "03",
    },
    {
      code: "CHEMICAL // FUEL",
      title: "RACE FUEL",
      desc: "High-octane racing fuel and additives. Stabilises high boost pressures and runs cooler combustion temperatures.",
      icon: Fuel,
      stats: "102 - 110+ Octane",
      index: "04",
    },
    {
      code: "DIAGNOSTICS // LOGS",
      title: "DIAGNOSTICS & LOGGING",
      desc: "Deep dealer-level scanning and live telemetry logging. Pre-tuning safety checks and real-time engine health analysis.",
      icon: Database,
      stats: "100Hz Logging Rate",
      index: "05",
    },
    {
      code: "PACKAGES // COMBINED",
      title: "TUNING PACKAGES",
      desc: "Turnkey Stage 1, 2 and 3 upgrades. Dyno-proven hardware and software bundles built for daily driving or track use.",
      icon: ShieldAlert,
      stats: "Complete Stage Packages",
      index: "06",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePositions, setMousePositions] = useState<{ [key: number]: { x: number; y: number } }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePositions((prev) => ({
      ...prev,
      [index]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  return (
    <section id="services" className="relative bg-[#050505] py-24 sm:py-32 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#E10600]/5 blur-[180px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold tracking-[0.3em] text-[#E10600] uppercase font-display block mb-3">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-display leading-[0.9]">
              PRECISION
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-600">
                ENGINEERING
              </span>
            </h2>
          </div>
          <div className="md:max-w-xs text-left md:text-right">
            <p className="text-xs text-neutral-400 font-sans tracking-wide leading-relaxed font-light">
              Every calibration is compiled in-house, dyno-tested and datalogged to ensure absolute performance output is achieved safely.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            const mPos = mousePositions[idx] || { x: 0, y: 0 };
            const isHovered = hoveredIndex === idx;

            return (
              <motion.div
                key={svc.title}
                variants={cardVariants}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group p-[1px] rounded-xl transition-all duration-500 shadow-2xl"
                style={{
                  background: isHovered
                    ? "linear-gradient(135deg, rgba(225, 6, 0, 0.8) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(225, 6, 0, 0.4) 100%)"
                    : "linear-gradient(135deg, rgba(225, 6, 0, 0.3) 0%, rgba(255, 255, 255, 0.03) 50%, rgba(225, 6, 0, 0.15) 100%)",
                }}
              >
                {/* Backing striking neon glow aura (permanently active, intensifies on hover) */}
                <div 
                  className="absolute -inset-2 rounded-2xl bg-[#E10600]/5 blur-xl transition-opacity duration-500 pointer-events-none -z-10" 
                  style={{
                    opacity: isHovered ? 0.95 : 0.6,
                  }}
                />

                {/* Inner Card Content */}
                <div
                  className="relative w-full h-full rounded-[11px] bg-[#070707] p-8 flex flex-col justify-between min-h-[300px] overflow-hidden transition-all duration-500"
                  style={{
                    background: isHovered
                      ? "radial-gradient(250px circle at 50% 50%, rgba(225, 6, 0, 0.07), transparent 70%), #070707"
                      : "radial-gradient(250px circle at 50% 50%, rgba(225, 6, 0, 0.03), transparent 70%), #070707",
                  }}
                >
                  {/* Subtle Carbon Fiber Texture Overlay */}
                  <div className="absolute inset-0 bg-carbon opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 rounded-[11px] pointer-events-none" />

                  {/* Laser Bottom Accent Glow Line */}
                  <div className="absolute bottom-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#E10600] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center pointer-events-none" />

                  {/* Precise Corner HUD Brackets */}
                  <div className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-white/[0.08] group-hover:border-[#E10600]/40 transition-colors duration-500" />
                  <div className="absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-white/[0.08] group-hover:border-[#E10600]/40 transition-colors duration-500" />
                  <div className="absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-white/[0.08] group-hover:border-[#E10600]/40 transition-colors duration-500" />
                  <div className="absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-white/[0.08] group-hover:border-[#E10600]/40 transition-colors duration-500" />

                  <div>
                    {/* Top Metadata Header */}
                    <div className="flex items-center justify-between mb-5 font-mono text-[9px] tracking-[0.2em] text-neutral-500 group-hover:text-neutral-400 transition-colors duration-300">
                      <span>{svc.code}</span>
                      <span className="text-white/20 group-hover:text-[#E10600]/60 font-black transition-colors duration-300">
                        [{svc.index}]
                      </span>
                    </div>

                    {/* Icon Block with inner ring & glow shadow */}
                    <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800/80 text-neutral-400 group-hover:text-[#E10600] group-hover:border-[#E10600]/40 transition-all duration-500 mb-5 shadow-inner group-hover:shadow-[0_0_20px_rgba(225,6,0,0.15)]">
                      <div className="absolute inset-0.5 rounded-lg border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      <Icon className="h-6 w-6 transform group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-black tracking-wider text-white uppercase font-display mb-3 transition-all duration-300 group-hover:text-glow-red">
                      {svc.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-neutral-400 font-sans leading-relaxed tracking-wide mb-6 font-light group-hover:text-neutral-300 transition-colors duration-300">
                      {svc.desc}
                    </p>
                  </div>

                  {/* Footer specs / callout */}
                  <div className="border-t border-white/5 pt-4 flex items-center justify-between group-hover:border-white/10 transition-colors duration-500">
                    <span className="text-[10px] font-bold tracking-widest text-[#E10600] font-display uppercase drop-shadow-[0_0_8px_rgba(225,6,0,0.3)]">
                      {svc.stats}
                    </span>
                    <a
                      href="#booking"
                      className="inline-flex items-center gap-1 text-[10px] font-bold tracking-widest text-neutral-400 group-hover:text-white transition-colors duration-300 uppercase font-display"
                    >
                      <span>CONFIGURE</span>
                      <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
