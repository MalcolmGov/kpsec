"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TachometerLoader({ onComplete }: { onComplete: () => void }) {
  const [rpm, setRpm] = useState(0);
  const [gear, setGear] = useState("N");
  const [isRedline, setIsRedline] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2200; // 2.2 seconds total rev

    const animateRpm = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Easing curve mimicking a revving engine (exponential sweep at the end)
      // Revs up, drops slightly (shift), then slams to redline
      let currentRpm = 0;
      if (progress < 0.4) {
        // First gear pull to 5000 RPM
        currentRpm = Math.floor(progress * 2.5 * 5000);
        setGear("1");
      } else if (progress < 0.55) {
        // Clutch shift drop to 4000 RPM
        const shiftProgress = (progress - 0.4) / 0.15;
        currentRpm = Math.floor(5000 - shiftProgress * 1000);
        setGear("N");
      } else {
        // Slam second gear to 9000 RPM redline
        const finalProgress = (progress - 0.55) / 0.45;
        currentRpm = Math.floor(4000 + finalProgress * 5000);
        setGear("2");
      }

      setRpm(currentRpm);

      if (currentRpm >= 7500) {
        setIsRedline(true);
      } else {
        setIsRedline(false);
      }

      if (progress < 1) {
        requestAnimationFrame(animateRpm);
      } else {
        // Hold redline briefly, shake, and complete
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 800);
        }, 400);
      }
    };

    requestAnimationFrame(animateRpm);
  }, [onComplete]);

  // Calculate needle rotation (from -120deg to 120deg)
  const maxRpm = 9000;
  const needleRotation = -120 + (Math.min(rpm, maxRpm) / maxRpm) * 240;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          id="loader-container"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] bg-carbon"
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Neon lasers surrounding loader */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#E10600] to-transparent shadow-[0_0_10px_#E10600] opacity-30" />
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#E10600] to-transparent shadow-[0_0_10px_#E10600] opacity-30" />

          {/* Scren shake at redline */}
          <motion.div
            className="relative flex flex-col items-center justify-center"
            animate={isRedline ? {
              x: [0, -2, 2, -1, 1, -2, 0],
              y: [0, 1, -2, 1, -1, 2, 0]
            } : {}}
            transition={{ repeat: Infinity, duration: 0.08 }}
          >
            {/* Tachometer Ring */}
            <div className="relative h-80 w-80 rounded-full border-4 border-neutral-800 bg-[#121212] p-4 shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_30px_rgba(0,0,0,0.9)]">
              {/* Outer tick marks */}
              <svg className="absolute inset-0 h-full w-full rotate-[-120deg]" viewBox="0 0 100 100">
                {/* Dial ticks */}
                {Array.from({ length: 10 }).map((_, i) => {
                  const angle = (i / 9) * 240;
                  const isRed = i >= 7; // Redline at 7, 8, 9
                  return (
                    <line
                      key={i}
                      x1="50"
                      y1="6"
                      x2="50"
                      y2="12"
                      transform={`rotate(${angle} 50 50)`}
                      stroke={isRed ? "#E10600" : "#404040"}
                      strokeWidth={isRed ? "2" : "1.5"}
                    />
                  );
                })}
                {/* Redline sector arc */}
                <circle
                  cx="50"
                  cy="50"
                  r="41"
                  fill="none"
                  stroke="#E10600"
                  strokeWidth="2.5"
                  strokeDasharray="57 300" // Represents arc from 7000 to 9000 RPM
                  strokeDashoffset="-169"
                  className="opacity-70"
                />
              </svg>

              {/* Dial labels (0 to 9) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-64 w-64 rounded-full">
                  {Array.from({ length: 10 }).map((_, i) => {
                    const angle = -120 + (i / 9) * 240;
                    const rad = (angle * Math.PI) / 180;
                    const x = 50 + 38 * Math.cos(rad);
                    const y = 50 + 38 * Math.sin(rad);
                    const isRed = i >= 7;
                    return (
                      <span
                        key={i}
                        className={`absolute text-xs font-bold -translate-x-1/2 -translate-y-1/2 font-display ${
                          isRed ? "text-[#E10600]" : "text-neutral-500"
                        }`}
                        style={{ left: `${x}%`, top: `${y}%` }}
                      >
                        {i}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Needle Cap */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="z-20 h-10 w-10 rounded-full border border-neutral-700 bg-neutral-900 shadow-md flex items-center justify-center">
                  <span className={`text-[10px] font-black font-display leading-none ${isRedline ? "text-[#E10600]" : "text-neutral-400"}`}>
                    RPM
                  </span>
                </div>
              </div>

              {/* Glowing Needle */}
              <div
                className="absolute inset-0 z-10 flex items-center justify-center"
                style={{
                  transform: `rotate(${needleRotation}deg)`,
                  transition: isFinished ? "transform 0.5s ease-in-out" : "none",
                }}
              >
                <div className="relative h-32 w-1 -translate-y-12">
                  <div className="h-full w-full bg-[#E10600] shadow-[0_0_8px_#E10600] rounded-full" />
                  <div className="absolute top-0 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-[#E10600] blur-sm animate-pulse" />
                </div>
              </div>

              {/* Digital Metrics inside Tach */}
              <div className="absolute bottom-12 inset-x-0 flex flex-col items-center justify-center">
                <span className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold font-display">
                  Tuning Engine
                </span>
                <span className="text-xl font-black font-display tracking-tight text-white tabular-nums">
                  {rpm.toLocaleString()}
                </span>
              </div>

              {/* Gear Indicator */}
              <div className="absolute top-16 inset-x-0 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-800 bg-[#0d0d0d] shadow-inner">
                  <span
                    className={`text-2xl font-black font-display leading-none ${
                      gear === "N" ? "text-neutral-600" : "text-[#E10600] text-glow-red"
                    }`}
                  >
                    {gear}
                  </span>
                </div>
              </div>
            </div>

            {/* Sub-labels */}
            <div className="mt-8 text-center">
              <span className="text-xs uppercase tracking-[0.3em] font-display text-neutral-500">
                K-SPEC PERFORMANCE
              </span>
              <div className="mt-2 h-[3px] w-24 bg-neutral-800 mx-auto overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-[#E10600]"
                  style={{ width: `${(rpm / maxRpm) * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
