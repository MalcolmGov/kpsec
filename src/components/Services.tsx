"use client";

import { motion } from "framer-motion";
import { Cpu, Activity, Wrench, Fuel, Database, ShieldAlert, ChevronRight } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "ECU TUNING",
      desc: "Custom calibrated maps tailored to your engine specifications. Maximum torque, linear power, and OEM reliability.",
      icon: Cpu,
      stats: "Up to +45% Power Gain",
    },
    {
      title: "DSG / TCU TUNING",
      desc: "Optimised gearbox software: faster shift times, custom launch control, and increased clutch clamping pressure.",
      icon: Activity,
      stats: "Shift Times -150ms",
    },
    {
      title: "PERFORMANCE PARTS",
      desc: "Hardware upgrades engineered for maximum flow. Bolt-on intakes, exhausts, turbos, and cooling packages.",
      icon: Wrench,
      stats: "Akrapovič, RacingLine, etc.",
    },
    {
      title: "RACE FUEL",
      desc: "High-octane racing fuel and additives. Stabilises high boost pressures and runs cooler combustion temperatures.",
      icon: Fuel,
      stats: "102 - 110+ Octane",
    },
    {
      title: "DIAGNOSTICS & LOGGING",
      desc: "Deep dealer-level scanning and live telemetry logging. Pre-tuning safety checks and real-time engine health analysis.",
      icon: Database,
      stats: "100Hz Logging Rate",
    },
    {
      title: "TUNING PACKAGES",
      desc: "Turnkey Stage 1, 2 and 3 upgrades. Dyno-proven hardware and software bundles built for daily driving or track use.",
      icon: ShieldAlert,
      stats: "Complete Stage Packages",
    },
  ];

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
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                variants={cardVariants}
                className="relative group rounded-xl border border-white/5 bg-glass p-8 flex flex-col justify-between min-h-[280px] transition-all duration-300 hover:border-[#E10600]/30 hover:bg-neutral-900/60 shadow-lg"
              >
                {/* Glowing laser border on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#E10600]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div>
                  {/* Icon Block */}
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#111] border border-neutral-800 text-neutral-400 group-hover:text-[#E10600] group-hover:border-[#E10600]/30 transition-all duration-300 mb-6">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-black tracking-widest text-white uppercase font-display mb-3">
                    {svc.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed tracking-wide mb-6 font-light">
                    {svc.desc}
                  </p>
                </div>

                {/* Footer specs / callout */}
                <div className="border-t border-neutral-900 pt-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-widest text-[#E10600] font-display uppercase">
                    {svc.stats}
                  </span>
                  <a
                    href="#booking"
                    className="inline-flex items-center gap-1 text-[10px] font-bold tracking-widest text-neutral-400 group-hover:text-white transition-colors uppercase font-display"
                  >
                    <span>CONFIGURE</span>
                    <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
