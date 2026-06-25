"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";

export default function WhyKSpec() {
  const reasons = [
    {
      title: "CUSTOM CALIBRATED",
      desc: "No generic flash maps. Every line of software is written in-house specifically for your vehicle, modification profile, and fuel octane.",
    },
    {
      title: "RELIABILITY FIRST",
      desc: "All factory component protection limiters (exhaust gas temp, knock protection, boost control) remain active. Performance without compromise.",
    },
    {
      title: "DATA LOGGING TELEMETRY",
      desc: "Before releasing any vehicle, we record full 100Hz engine parameter logs on our rolling road to verify fueling, ignition, and boost control.",
    },
    {
      title: "DEALER SAFE & TRACEABLE",
      desc: "Software updates are fully compatible. Diagnostic counters are properly aligned, making it safe for scheduled dealership services.",
    },
    {
      title: "LIFETIME SOFTWARE SUPPORT",
      desc: "Complimentary software re-flashes if dealership updates overwrite your map, plus discounted scaling for future hardware upgrades.",
    },
    {
      title: "DYNO PROVEN",
      desc: "Every calibration profile is developed on our high-performance rolling road dyno. Measured gains, documented numbers, zero guesswork.",
    },
  ];

  return (
    <section id="why-kspec" className="relative bg-[#080808] py-24 sm:py-32 overflow-hidden border-y border-neutral-900">
      <div className="absolute inset-0 bg-carbon-dense opacity-20 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Image Asset */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative rounded-2xl border border-white/5 bg-glass overflow-hidden shadow-2xl h-[350px] sm:h-[500px]"
            >
              {/* Laser line inside image frame */}
              <div className="absolute inset-x-0 bottom-[20%] h-[2px] bg-[#E10600]/80 shadow-[0_0_8px_#E10600] z-10 animate-laser-sweep pointer-events-none" />
              
              <Image
                src="/engine_bay.png"
                alt="Elite K-Spec performance twin-turbo engine layout"
                fill
                className="object-cover scale-105 hover:scale-110 transition-transform duration-[5s] ease-out select-none"
              />
            </motion.div>
            
            {/* Background glowing frame border */}
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#E10600]/10 to-transparent blur-lg -z-10 pointer-events-none" />
          </div>

          {/* Right Column: Engineering copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="max-w-xl">
              <span className="text-xs font-bold tracking-[0.3em] text-[#E10600] uppercase font-display block mb-3">
                Laboratory Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-display leading-[0.9] mb-12">
                OBSESSED WITH
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-600">
                  CALIBRATION
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                {reasons.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                    className="flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E10600]/10 border border-[#E10600]/25">
                        <Check className="h-3 w-3 text-[#E10600]" />
                      </div>
                      <h3 className="text-xs font-black tracking-widest text-white uppercase font-display">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-neutral-400 font-sans leading-relaxed tracking-wide font-light pl-7">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
