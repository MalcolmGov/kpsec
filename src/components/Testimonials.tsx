"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, MessageSquareCode } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  vehicle: string;
  build: string;
  quote: string;
  rating: number;
}

export default function Testimonials() {
  const reviews: Testimonial[] = [
    {
      id: "t-1",
      name: "JANDRÉ V.",
      vehicle: "Golf 8 R 2.0 TSI",
      build: "Stage 2 Tuning Pack (+85 HP)",
      quote: "K-Spec completely transformed my Golf 8 R. The Stage 2 ECU/TCU package is savage when you want it, yet perfectly civilised in Comfort mode. The shift speeds are instant.",
      rating: 5,
    },
    {
      id: "t-2",
      name: "MALCOLM G.",
      vehicle: "Audi RS6 Avant C8",
      build: "Stage 1 Software (+125 HP)",
      quote: "Absolute perfection. Entering their dyno cell feels like stepping into a Formula 1 team workshop. The telemetry data logging gave me absolute confidence in their engineering.",
      rating: 5,
    },
    {
      id: "t-3",
      name: "SELLO M.",
      vehicle: "BMW M4 Competition G82",
      build: "Stage 1 Calibration (+125 HP)",
      quote: "The throttle response is instantaneous now. The S58 engine pulls linear and aggressive all the way to redline. The absolute premium choice for serious enthusiasts.",
      rating: 5,
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0); // -1 (prev), 1 (next)

  const handleNext = () => {
    setDirection(1);
    setActiveIdx((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIdx((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const current = reviews[activeIdx];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    }),
  };

  return (
    <section className="relative bg-[#050505] py-24 sm:py-32 overflow-hidden">
      {/* Glow background details */}
      <div className="absolute top-[50%] left-[10%] h-[350px] w-[350px] rounded-full bg-[#E10600]/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Quote icon background indicator */}
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#111] border border-neutral-800 text-neutral-500 mb-8 shadow-inner animate-engine-pulse">
          <MessageSquareCode className="h-5 w-5 text-[#E10600]" />
        </div>

        {/* Dynamic Carousel Container */}
        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full rounded-2xl border border-white/5 bg-glass p-8 sm:p-12 shadow-2xl relative"
            >
              {/* Star Rating */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#E10600] text-[#E10600] drop-shadow-[0_0_4px_#E10600]" />
                ))}
              </div>

              {/* Testimonial Quote */}
              <blockquote className="text-sm sm:text-base md:text-lg text-white font-sans font-light italic leading-relaxed tracking-wide mb-8">
                "{current.quote}"
              </blockquote>

              {/* Author and vehicle tags */}
              <div className="border-t border-neutral-900 pt-6">
                <cite className="not-italic font-display font-black tracking-widest text-white uppercase block mb-1">
                  {current.name}
                </cite>
                <span className="text-[10px] font-bold tracking-widest text-[#E10600] uppercase font-display block mb-1">
                  {current.vehicle}
                </span>
                <span className="text-[9px] font-sans font-light tracking-wide text-neutral-500">
                  {current.build}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav Arrows buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-white transition-all duration-300"
            aria-label="Previous Testimonial"
            id="testimonial-prev-btn"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700 hover:text-white transition-all duration-300"
            aria-label="Next Testimonial"
            id="testimonial-next-btn"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
