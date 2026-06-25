"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Phone, Zap, Cpu, Sparkles } from "lucide-react";

export default function PromoBanner() {
  const highlights = [
    { title: "MORE POWER & TORQUE", desc: "Unlock hidden reserves" },
    { title: "BETTER FUEL EFFICIENCY", desc: "Optimised combustion logs" },
    { title: "RELIABLE & SAFE TUNING", desc: "Factory protection active" },
    { title: "WIDE VEHICLE COVERAGE", desc: "Protocols for all major brands" },
  ];

  return (
    <section className="relative bg-[#050505] py-24 sm:py-32 overflow-hidden border-t border-neutral-900">
      {/* Background neon glows */}
      <div className="absolute top-[30%] left-[10%] h-80 w-80 rounded-full bg-[#E10600]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] h-96 w-96 rounded-full bg-[#E10600]/10 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Offer Details */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E10600]/30 bg-[#E10600]/5 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-[#E10600] uppercase mb-6 font-display animate-pulse">
              Exclusive Offer
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase font-display leading-[0.9] mb-6">
              UNLEASH THE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-600">
                FULL POTENTIAL
              </span>
              <br />
              <span className="text-[#E10600] text-glow-red">OF YOUR VEHICLE.</span>
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-400 font-sans tracking-wide leading-relaxed font-light mb-8 max-w-xl">
              Master your performance with the industry-standard **Alientech KESS3** OBD and Bench hardware tool. Purchase a new unit directly from K-Spec Sandton and receive **10 custom recalibration tuning files** completely free of charge.
            </p>

            {/* Benefits Bullet Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-8">
              {highlights.map((h, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className="h-6 w-6 rounded-lg bg-[#E10600]/10 border border-[#E10600]/25 flex items-center justify-center text-[#E10600] shrink-0 mt-0.5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black tracking-widest text-white uppercase font-display">
                      {h.title}
                    </h4>
                    <p className="text-[10px] text-neutral-500 font-sans font-light tracking-wide mt-0.5">
                      {h.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to action & price enquiry */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href="tel:0846599987"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-lg bg-[#E10600] hover:bg-[#b00500] px-6 py-4 text-xs font-bold tracking-[0.2em] uppercase text-white shadow-[0_0_20px_rgba(225,6,0,0.4)] transition-all duration-300 font-display group"
                id="promo-call-cta"
              >
                <Phone className="h-4 w-4 fill-white group-hover:scale-110 transition-transform" />
                <span>CALL 0846 599 987</span>
              </a>
              
              <a
                href="#booking"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 px-6 py-4 text-xs font-bold tracking-[0.2em] uppercase text-neutral-200 transition-all duration-300 font-display"
                id="promo-enquire-cta"
              >
                <Zap className="h-3.5 w-3.5 text-[#FF5722]" />
                <span>ENQUIRE FOR PRICING</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Flyer Showcase */}
          <div className="lg:col-span-5 relative flex justify-center items-center w-full">
            
            {/* 3D-effect Card Frame */}
            <motion.div
              whileHover={{ rotateY: 10, rotateX: -5, scale: 1.02 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-full max-w-[360px] aspect-[1/1.45] rounded-2xl border border-white/5 bg-glass overflow-hidden shadow-2xl flex items-center justify-center preserve-3d"
            >
              {/* Overlay sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-10" />

              <Image
                src="/kess3_ad.jpg"
                alt="K-Spec Alientech Kess3 special offer flyer"
                fill
                className="object-cover scale-100 group-hover:scale-105 transition-transform duration-[4s]"
                priority
              />
            </motion.div>

            {/* Glowing borders shadow behind flyer */}
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#E10600]/10 to-transparent blur-xl -z-10 pointer-events-none" />

          </div>

        </div>
      </div>
    </section>
  );
}
