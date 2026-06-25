"use client";

import { motion } from "framer-motion";

export default function BrandLogos() {
  const brands = [
    {
      name: "PORSCHE",
      logo: (
        <svg viewBox="0 0 100 35" fill="currentColor" className="h-6 opacity-40 group-hover:opacity-100 group-hover:text-[#E10600] transition-all duration-300">
          <text x="50%" y="24" textAnchor="middle" fontSize="16" fontWeight="900" letterSpacing="5" fontFamily="sans-serif">
            PORSCHE
          </text>
        </svg>
      ),
    },
    {
      name: "AUDI",
      logo: (
        <svg viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 opacity-40 group-hover:opacity-100 group-hover:stroke-[#E10600] transition-all duration-300">
          <circle cx="32" cy="15" r="9" />
          <circle cx="44" cy="15" r="9" />
          <circle cx="56" cy="15" r="9" />
          <circle cx="68" cy="15" r="9" />
        </svg>
      ),
    },
    {
      name: "MERCEDES",
      logo: (
        <svg viewBox="0 0 100 35" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 opacity-40 group-hover:opacity-100 group-hover:stroke-[#E10600] group-hover:fill-[#E10600]/10 transition-all duration-300">
          <circle cx="50" cy="17" r="15" />
          <path d="M 50 2 L 50 17" />
          <path d="M 50 17 L 37 25" />
          <path d="M 50 17 L 63 25" />
        </svg>
      ),
    },
    {
      name: "BMW",
      logo: (
        <svg viewBox="0 0 100 35" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 opacity-40 group-hover:opacity-100 group-hover:stroke-[#E10600] transition-all duration-300">
          <circle cx="50" cy="17" r="15" />
          <circle cx="50" cy="17" r="10" />
          <path d="M 50 7 L 50 27" />
          <path d="M 40 17 L 60 17" />
          {/* Top left quadrant filled */}
          <path d="M 50 7 A 10 10 0 0 0 40 17 L 50 17 Z" fill="currentColor" className="text-neutral-700 group-hover:text-[#E10600]/30 transition-colors" />
          {/* Bottom right quadrant filled */}
          <path d="M 50 27 A 10 10 0 0 0 60 17 L 50 17 Z" fill="currentColor" className="text-neutral-700 group-hover:text-[#E10600]/30 transition-colors" />
        </svg>
      ),
    },
    {
      name: "VW",
      logo: (
        <svg viewBox="0 0 100 35" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 opacity-40 group-hover:opacity-100 group-hover:stroke-[#E10600] transition-all duration-300">
          <circle cx="50" cy="17" r="15" />
          {/* V shape */}
          <path d="M 42 7 L 50 16 L 58 7" />
          {/* W shape */}
          <path d="M 39 17 L 46 29 L 50 23 L 54 29 L 61 17" />
        </svg>
      ),
    },
    {
      name: "TOYOTA",
      logo: (
        <svg viewBox="0 0 100 35" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 opacity-40 group-hover:opacity-100 group-hover:stroke-[#E10600] transition-all duration-300">
          {/* Toyota triple oval emblem */}
          <ellipse cx="50" cy="17" rx="18" ry="12" />
          <ellipse cx="50" cy="14" rx="10" ry="8" />
          <ellipse cx="50" cy="17" rx="4" ry="12" />
        </svg>
      ),
    },
    {
      name: "FORD",
      logo: (
        <svg viewBox="0 0 100 35" fill="currentColor" className="h-6 opacity-40 group-hover:opacity-100 group-hover:text-[#E10600] transition-all duration-300">
          <text x="50%" y="25" textAnchor="middle" fontSize="18" fontWeight="bold" fontStyle="italic" fontFamily="serif" letterSpacing="1">
            Ford
          </text>
        </svg>
      ),
    },
    {
      name: "NISSAN",
      logo: (
        <svg viewBox="0 0 100 35" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 opacity-40 group-hover:opacity-100 group-hover:stroke-[#E10600] transition-all duration-300">
          <circle cx="50" cy="17" r="13" />
          <rect x="30" y="13" width="40" height="8" fill="#050505" stroke="currentColor" strokeWidth="1.5" />
          <text x="50%" y="19" textAnchor="middle" fontSize="6.5" fontWeight="900" letterSpacing="1.5" fill="currentColor">
            NISSAN
          </text>
        </svg>
      ),
    },
  ];

  return (
    <section className="relative bg-[#050505] border-b border-neutral-900 py-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-6">
        <span className="text-[9px] font-bold tracking-[0.3em] text-neutral-500 uppercase font-display">
          SUPPORTED PLATFORMS & HARDWARE
        </span>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative flex overflow-x-hidden w-full">
        {/* Repeating marquee row */}
        <div className="animate-marquee flex gap-16 whitespace-nowrap items-center py-2">
          {brands.map((b, i) => (
            <div key={`b1-${i}`} className="inline-flex items-center justify-center w-28 text-neutral-400 group cursor-pointer">
              {b.logo}
            </div>
          ))}
        </div>
        <div className="absolute top-0 animate-marquee2 flex gap-16 whitespace-nowrap items-center py-2">
          {brands.map((b, i) => (
            <div key={`b2-${i}`} className="inline-flex items-center justify-center w-28 text-neutral-400 group cursor-pointer">
              {b.logo}
            </div>
          ))}
        </div>

        {/* Shadow gradients left & right to mask scrolling edges */}
        <div className="absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none z-10" />
      </div>

      {/* Add custom Tailwind-like marquee styles */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee 25s linear infinite;
          animation-delay: -12.5s;
        }
      `}</style>
    </section>
  );
}
