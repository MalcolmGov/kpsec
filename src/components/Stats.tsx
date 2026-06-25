"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

function Counter({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest).toLocaleString());
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest).toLocaleString());
        }
      });
      return () => controls.stop();
    }
  }, [isInView, count, value, duration]);

  return (
    <span ref={ref} className="font-display font-black text-4xl sm:text-5xl text-white tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const statsData = [
    { label: "VEHICLES TUNED", value: 14250, suffix: "+", desc: "Precision calibrated street & race machines" },
    { label: "HORSEPOWER ADDED", value: 485200, suffix: " HP", desc: "Safely unlocked engine output" },
    { label: "YEARS CALIBRATING", value: 12, suffix: "+", desc: "At the cutting edge of ECU software" },
    { label: "DEALER STATIONS", value: 28, suffix: "", desc: "Certified calibration centres nationwide" },
    { label: "HAPPY ENTHUSIASTS", value: 9800, suffix: "+", desc: "Obsessed with power and reliability" },
  ];

  return (
    <section className="relative bg-[#080808] border-y border-neutral-900 py-16 sm:py-24">
      {/* Background visual detail */}
      <div className="absolute inset-0 bg-carbon-dense opacity-20 pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#E10600]/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-6 text-center">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="flex flex-col items-center group"
            >
              {/* Odometer stat container */}
              <div className="flex items-baseline gap-0.5 mb-2 relative">
                <Counter value={stat.value} suffix={stat.suffix} />
                <div className="absolute -bottom-1 inset-x-0 h-[2px] bg-[#E10600] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </div>

              {/* Title */}
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#E10600] font-display uppercase mb-2">
                {stat.label}
              </span>

              {/* Description */}
              <span className="text-[11px] text-neutral-500 font-sans tracking-wide max-w-[150px] font-light leading-relaxed">
                {stat.desc}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
