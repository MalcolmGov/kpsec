"use client";

import { Fuel, ShieldCheck, Flame, Gauge } from "lucide-react";

export default function RaceFuel() {
  const specs = [
    {
      title: "OCTANE RATING",
      value: "102 - 110+",
      desc: "Maximum knock resistance under high-boost profiles",
      icon: Gauge,
    },
    {
      title: "COMBUSTION TEMP",
      value: "-120°C",
      desc: "Runs cooler cylinders, preventing thermal exhaustion",
      icon: Flame,
    },
    {
      title: "FUEL STABILITY",
      value: "100%",
      desc: "Clean burning oxygenated compounds, zero deposits",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="relative bg-[#050505] py-24 sm:py-32 overflow-hidden border-b border-neutral-900">
      {/* Background neon elements */}
      <div className="absolute top-[20%] left-[20%] h-80 w-80 rounded-full bg-[#E10600]/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Header Block */}
        <div className="max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.3em] text-[#E10600] uppercase font-display block mb-3">
            Combustion engineering
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-display leading-[0.9] mb-4">
            RACE FUEL &
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-600">
              FORMULATIONS
            </span>
          </h2>
          <p className="text-xs text-neutral-400 font-sans tracking-wide font-light leading-relaxed">
            Unlocking ultimate performance requires chemical precision. Our calibrated high-octane racing blends prevent detonation on maximum-output map calibrations.
          </p>
        </div>

        {/* Spec stats layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20">
          {specs.map((sp) => {
            const Icon = sp.icon;
            return (
              <div
                key={sp.title}
                className="rounded-xl border border-white/5 bg-glass p-6 sm:p-8 flex flex-col items-center hover:border-[#E10600]/30 hover:bg-neutral-900/30 transition-all duration-300 group shadow-lg"
              >
                <div className="h-10 w-10 rounded-lg bg-[#111] border border-neutral-800 text-neutral-400 group-hover:text-[#E10600] group-hover:border-[#E10600]/30 transition-colors flex items-center justify-center mb-4">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <span className="text-[9px] font-bold tracking-widest text-[#E10600] uppercase font-display mb-1">
                  {sp.title}
                </span>
                <span className="text-3xl font-black font-display text-white tracking-tight mb-2">
                  {sp.value}
                </span>
                <p className="text-[10px] text-neutral-500 font-sans font-light tracking-wide leading-relaxed">
                  {sp.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>

      {/* Layered fluid wave SVG at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-28 pointer-events-none z-0">
        <svg
          className="w-full h-full text-[#E10600]/10 fill-current opacity-60"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          {/* Animated wave 1 */}
          <path
            d="M0,32 C240,70 480,10 720,48 C960,80 1200,60 1440,32 L1440,120 L0,120 Z"
            className="animate-wave-slow fill-[#E10600]/5"
          />
          {/* Animated wave 2 */}
          <path
            d="M0,64 C360,30 720,90 1080,50 C1260,30 1380,60 1440,64 L1440,120 L0,120 Z"
            className="animate-wave-fast fill-[#E10600]/10"
          />
        </svg>
      </div>

      <style jsx global>{`
        @keyframes wave-move {
          0% { transform: translateX(0) translateZ(0) scaleY(1); }
          50% { transform: translateX(-25%) translateZ(0) scaleY(0.85); }
          100% { transform: translateX(0) translateZ(0) scaleY(1); }
        }
        .animate-wave-slow {
          animation: wave-move 12s ease-in-out infinite;
        }
        .animate-wave-fast {
          animation: wave-move 8s ease-in-out infinite;
          animation-delay: -3s;
        }
      `}</style>
    </section>
  );
}
