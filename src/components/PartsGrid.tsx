"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sparkles, Sliders, ArrowUpRight } from "lucide-react";

interface PartItem {
  id: string;
  name: string;
  brand: string;
  category: "exhausts" | "intakes" | "turbos" | "cooling" | "suspension";
  price: string;
  spec: string;
  gain: string;
  image: string;
  description: string;
}

export default function PartsGrid() {
  const categories = [
    { id: "all", name: "ALL HARDWARE" },
    { id: "exhausts", name: "EXHAUST SYSTEMS" },
    { id: "intakes", name: "COLD AIR INTAKES" },
    { id: "turbos", name: "TURBO UPGRADES" },
    { id: "cooling", name: "THERMAL / COOLING" },
  ];

  const partsData: PartItem[] = [
    {
      id: "part-1",
      name: "Evolution Line Titanium Exhaust",
      brand: "Akrapovič",
      category: "exhausts",
      price: "R 84,500",
      spec: "Ultra-lightweight titanium alloy, 35% weight reduction",
      gain: "+18 HP / +22 Nm",
      image: "/exhaust_system.png",
      description: "Precision engineered valves, brushed titanium pipes, and high-gloss forged carbon fiber tips.",
    },
    {
      id: "part-2",
      name: "R600 Carbon Fiber Intake System",
      brand: "RacingLine",
      category: "intakes",
      price: "R 18,900",
      spec: "Double-sized carbon filter box, high-flow dome filter",
      gain: "+14 HP / +16 Nm",
      image: "/intake_system.png",
      description: "Enclosed cold air intake providing cold air directly into turbo inlet with zero turbulence.",
    },
    {
      id: "part-3",
      name: "Stage 3 IS38 Hybrid Turbocharger",
      brand: "K-Spec Elite",
      category: "turbos",
      price: "R 34,900",
      spec: "Billet compressor wheel, reinforced thrust bearings",
      gain: "+120 HP / +140 Nm",
      image: "/engine_bay.png", // Reusing engine bay as visual representation of engine upgrades
      description: "Optimised turbine geometry. High-flow wastegate actuator, fully balanced and blueprinted in-house.",
    },
    {
      id: "part-4",
      name: "Competition Intercooler Pack",
      brand: "CSF Racing",
      category: "cooling",
      price: "R 24,500",
      spec: "Stepped-core bar and plate design, 60% larger volume",
      gain: "Maintains optimal air charge temps",
      image: "/engine_bay.png", // Reuse
      description: "Eliminates heat soak under consecutive pulls. Heavy duty end tanks with integrated flow guides.",
    },
  ];

  const [activeCat, setActiveCat] = useState("all");

  const filteredParts = activeCat === "all"
    ? partsData
    : partsData.filter((item) => item.category === activeCat);

  return (
    <section id="parts" className="relative bg-[#050505] py-24 sm:py-32 overflow-hidden">
      {/* Background neon dots */}
      <div className="absolute top-[80%] left-[10%] h-96 w-96 rounded-full bg-[#E10600]/5 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold tracking-[0.3em] text-[#E10600] uppercase font-display block mb-3">
              Hardware Laboratory
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-display leading-[0.9]">
              PERFORMANCE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-600">
                HARDWARE
              </span>
            </h2>
          </div>
          
          {/* Category Navigation */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`rounded-lg border px-4 py-2.5 text-[9px] font-bold tracking-[0.2em] uppercase transition-all duration-300 font-display ${
                  activeCat === cat.id
                    ? "border-[#E10600] bg-[#E10600]/5 text-white shadow-[0_0_10px_rgba(225,6,0,0.15)]"
                    : "border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-white"
                }`}
                id={`parts-cat-btn-${cat.id}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredParts.map((part) => (
              <motion.div
                layout
                key={part.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-xl border border-white/5 bg-glass p-6 sm:p-8 flex flex-col sm:flex-row gap-6 hover:border-[#E10600]/30 hover:bg-neutral-900/40 transition-colors shadow-lg"
              >
                {/* Product Image Frame */}
                <div className="relative w-full sm:w-48 h-48 rounded-lg overflow-hidden border border-neutral-900 shrink-0 bg-neutral-950">
                  <Image
                    src={part.image}
                    alt={part.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-[4s]"
                  />
                  
                  {/* Brand Tag Overlay */}
                  <div className="absolute top-2 left-2 rounded bg-black/80 px-2 py-0.5 text-[8px] font-bold tracking-widest text-[#E10600] uppercase font-display border border-neutral-800">
                    {part.brand}
                  </div>
                </div>

                {/* Product Information */}
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    {/* Header Spec row */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-bold tracking-widest text-neutral-500 uppercase font-display">
                        CALIBRATION READY
                      </span>
                      <span className="text-xs font-black font-display text-white">
                        {part.price}
                      </span>
                    </div>

                    {/* Part Title */}
                    <h3 className="text-sm font-black tracking-widest text-white uppercase font-display mb-2 group-hover:text-[#E10600] transition-colors">
                      {part.name}
                    </h3>

                    {/* Description */}
                    <p className="text-[11px] text-neutral-400 font-sans leading-relaxed tracking-wide mb-4 font-light">
                      {part.description}
                    </p>
                  </div>

                  {/* Spec telemetry tags */}
                  <div className="border-t border-neutral-900 pt-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[10px] font-sans font-light text-neutral-400">
                      <Sliders className="h-3.5 w-3.5 text-[#E10600] shrink-0" />
                      <span className="truncate">{part.spec}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white font-display">
                        <Shield className="h-3.5 w-3.5 text-[#FF5722] shrink-0" />
                        <span>EST. GAIN: {part.gain}</span>
                      </div>
                      
                      <a
                        href="#booking"
                        className="inline-flex items-center gap-0.5 text-[9px] font-bold tracking-widest text-neutral-400 hover:text-white uppercase font-display transition-colors"
                      >
                        <span>ENQUIRE</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
