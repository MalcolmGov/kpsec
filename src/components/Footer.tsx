"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] border-t border-neutral-900 pt-16 pb-12 overflow-hidden">
      {/* Background carbon texture overlay */}
      <div className="absolute inset-0 bg-carbon opacity-20 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Info Block */}
          <div className="md:col-span-4 flex flex-col items-start text-left">
            <a href="#" className="flex items-center gap-3 group mb-6">
              <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-neutral-800 group-hover:border-[#E10600] transition-colors bg-black shadow-inner">
                <Image
                  src="/logo.jpg"
                  alt="K-Spec Logo"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-black tracking-widest text-white leading-none">
                  K-SPEC
                </span>
                <span className="text-[8px] tracking-[0.25em] text-[#E10600] font-bold">
                  PERFORMANCE
                </span>
              </div>
            </a>
            <p className="text-xs text-neutral-500 font-sans tracking-wide leading-relaxed font-light max-w-xs mb-6">
              South Africa's premier automotive performance calibration laboratory. Dedicated to custom software calibration and high-end hardware installations.
            </p>
            {/* Social media connections */}
            <div className="flex gap-4">
              {/* Instagram SVG */}
              <a href="#" className="p-2 rounded-lg border border-neutral-900 bg-neutral-950 text-neutral-500 hover:text-white hover:border-[#E10600] transition-colors" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              {/* Facebook SVG */}
              <a href="#" className="p-2 rounded-lg border border-neutral-900 bg-neutral-950 text-neutral-500 hover:text-white hover:border-[#E10600] transition-colors" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* Youtube SVG */}
              <a href="#" className="p-2 rounded-lg border border-neutral-900 bg-neutral-950 text-neutral-500 hover:text-white hover:border-[#E10600] transition-colors" aria-label="Youtube">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
                  <polygon points="10 15 15 12 10 9" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="md:col-span-3 text-left">
            <h4 className="text-[10px] font-bold tracking-widest text-[#E10600] font-display uppercase mb-4">
              CAPABILITIES
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-500 font-sans font-light">
              <li>
                <a href="#services" className="hover:text-white transition-colors">ECU Remapping</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">TCU / DSG Software</a>
              </li>
              <li>
                <a href="#parts" className="hover:text-white transition-colors">Performance Hardware</a>
              </li>
              <li>
                <a href="#dyno" className="hover:text-white transition-colors">Dyno Tuning & Diagnostics</a>
              </li>
              <li>
                <a href="#booking" className="hover:text-white transition-colors">Stage Tuning Packages</a>
              </li>
            </ul>
          </div>

          {/* Operating hours */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-[10px] font-bold tracking-widest text-neutral-400 font-display uppercase mb-4">
              LABORATORY HOURS
            </h4>
            <ul className="space-y-2 text-xs text-neutral-500 font-sans font-light">
              <li>
                <span className="text-white block font-display text-[9px] font-bold">MON - FRI</span>
                08:00 - 17:00
              </li>
              <li>
                <span className="text-white block font-display text-[9px] font-bold mt-2">SATURDAY</span>
                08:00 - 13:00
              </li>
              <li>
                <span className="text-neutral-600 block mt-2">Closed Sundays & Public Holidays</span>
              </li>
            </ul>
          </div>

          {/* Contacts Info */}
          <div className="md:col-span-3 text-left">
            <h4 className="text-[10px] font-bold tracking-widest text-neutral-400 font-display uppercase mb-4">
              SANDTON HQ
            </h4>
            <address className="not-italic space-y-2.5 text-xs text-neutral-500 font-sans font-light">
              <p className="leading-relaxed">
                Unit 3, Motor City, Sandton, Johannesburg, 2196
              </p>
              <p className="text-white font-semibold">
                Tel: +27 (0) 11 452 9012
              </p>
              <p>
                Email: info@kspec.co.za
              </p>
            </address>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="border-t border-neutral-900 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-neutral-600 font-sans font-light">
          <div>
            <span>© {new Date().getFullYear()} K-SPEC PERFORMANCE TUNING. ALL RIGHTS RESERVED.</span>
          </div>
          <div className="flex gap-6 font-display font-bold">
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS OF CALIBRATION</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
