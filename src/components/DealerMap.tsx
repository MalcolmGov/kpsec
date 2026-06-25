"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Compass } from "lucide-react";

interface Dealer {
  id: string;
  city: string;
  province: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  coordinates: { x: number; y: number }; // SVG layout positions
}

export default function DealerMap() {
  const dealers: Dealer[] = [
    {
      id: "dl-gp",
      city: "Johannesburg",
      province: "Gauteng (HQ)",
      name: "K-Spec Performance HQ",
      phone: "+27 (0) 11 452 9012",
      email: "jhb@kspec.co.za",
      address: "Unit 3, Motor City, Sandton, 2196",
      coordinates: { x: 300, y: 70 }, // JHB position in SVG grid
    },
    {
      id: "dl-wc",
      city: "Cape Town",
      province: "Western Cape",
      name: "K-Spec Western Cape",
      phone: "+27 (0) 21 556 7890",
      email: "cpt@kspec.co.za",
      address: "Unit 12, Killarney Plaza, Killarney Gardens, 7441",
      coordinates: { x: 70, y: 220 }, // CPT position
    },
    {
      id: "dl-kzn",
      city: "Durban",
      province: "KwaZulu-Natal",
      name: "K-Spec KZN",
      phone: "+27 (0) 31 569 4521",
      email: "kzn@kspec.co.za",
      address: "45 Riverhorse Valley, Durban, 4001",
      coordinates: { x: 350, y: 150 }, // DBN position
    },
    {
      id: "dl-ec",
      city: "Gqeberha (PE)",
      province: "Eastern Cape",
      name: "K-Spec Eastern Cape",
      phone: "+27 (0) 41 364 1234",
      email: "pe@kspec.co.za",
      address: "88 William Moffett Expressway, Gqeberha, 6070",
      coordinates: { x: 230, y: 230 }, // PE position
    },
  ];

  const [activeId, setActiveId] = useState("dl-gp");

  const current = dealers.find((d) => d.id === activeId) || dealers[0];

  return (
    <section id="dealers" className="relative bg-[#080808] py-24 sm:py-32 overflow-hidden border-b border-neutral-900">
      <div className="absolute inset-0 bg-carbon-dense opacity-20 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold tracking-[0.3em] text-[#E10600] uppercase font-display block mb-3">
              Dealer Network
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-display leading-[0.9]">
              FIND A CERTIFIED
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-600">
                STATION
              </span>
            </h2>
          </div>
          <div className="md:max-w-xs text-left md:text-right">
            <p className="text-xs text-neutral-400 font-sans tracking-wide leading-relaxed font-light">
              K-Spec software can be flashed at any of our authorised dealer stations across South Africa. Same safety files, identical dyno gains.
            </p>
          </div>
        </div>

        {/* Map Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Vector Map */}
          <div className="lg:col-span-7 flex justify-center items-center rounded-xl border border-white/5 bg-glass p-6 sm:p-10 relative overflow-hidden h-[320px] sm:h-[420px]">
            {/* Dark grid texture on map container */}
            <div className="absolute inset-0 dyno-grid opacity-30 pointer-events-none" />

            {/* Custom SVG South African Map with coordinate markers */}
            <svg
              className="w-full h-full max-w-[450px] text-neutral-800"
              viewBox="0 0 400 260"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              {/* Simplified geographic South African border outline */}
              <path
                d="M 50 140 L 40 180 L 70 240 L 120 250 L 180 250 L 250 250 L 300 240 L 330 200 L 370 170 L 390 130 L 360 100 L 340 50 L 300 40 L 260 50 L 220 80 L 190 70 L 140 80 L 110 80 L 80 110 L 50 140 Z"
                fill="rgba(26,26,26,0.3)"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1.5"
              />

              {/* Blinking radar-pulses and dots */}
              {dealers.map((d) => {
                const isActive = d.id === activeId;
                return (
                  <g
                    key={d.id}
                    className="cursor-pointer"
                    onClick={() => setActiveId(d.id)}
                  >
                    {/* Radar Pulse circle */}
                    {isActive && (
                      <circle
                        cx={d.coordinates.x}
                        cy={d.coordinates.y}
                        r="8"
                        fill="none"
                        stroke="#E10600"
                        strokeWidth="1"
                        className="animate-ping"
                        style={{ transformOrigin: `${d.coordinates.x}px ${d.coordinates.y}px` }}
                      />
                    )}
                    {/* Glowing outer core */}
                    <circle
                      cx={d.coordinates.x}
                      cy={d.coordinates.y}
                      r="5"
                      fill={isActive ? "#E10600" : "rgba(255,255,255,0.2)"}
                      className={isActive ? "animate-pulse" : ""}
                      style={{ transition: "fill 0.3s" }}
                    />
                    {/* Inner core */}
                    <circle
                      cx={d.coordinates.x}
                      cy={d.coordinates.y}
                      r="2"
                      fill="#fff"
                    />
                  </g>
                );
              })}
            </svg>

            {/* GPS coordinates watermarked */}
            <div className="absolute bottom-4 left-6 flex items-center gap-1 text-[8px] font-bold text-neutral-600 font-display">
              <Compass className="h-3 w-3" />
              <span>SOUTH AFRICA NETWORK // UTC+2</span>
            </div>
          </div>

          {/* Right Column: Active Station details card */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Quick selector buttons */}
            <div className="grid grid-cols-2 gap-2">
              {dealers.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setActiveId(d.id)}
                  className={`rounded-lg border py-3 text-[9px] font-bold tracking-[0.2em] uppercase transition-all duration-300 font-display ${
                    activeId === d.id
                      ? "border-[#E10600] bg-[#E10600]/5 text-white shadow-[0_0_10px_rgba(225,6,0,0.1)]"
                      : "border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700"
                  }`}
                  id={`dealer-btn-${d.id}`}
                >
                  {d.city}
                </button>
              ))}
            </div>

            {/* Contact details Card */}
            <div className="rounded-xl border border-white/5 bg-glass p-6 sm:p-8 flex flex-col justify-between min-h-[260px] relative overflow-hidden">
              <div>
                <span className="text-[9px] font-bold tracking-widest text-[#E10600] uppercase font-display block mb-1">
                  {current.province}
                </span>
                <h3 className="text-lg font-black tracking-widest text-white uppercase font-display mb-6">
                  {current.name}
                </h3>

                <div className="space-y-4">
                  {/* MapPin Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-[#E10600] shrink-0 mt-0.5" />
                    <span className="text-xs text-neutral-400 font-sans font-light tracking-wide leading-relaxed">
                      {current.address}
                    </span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-[#E10600] shrink-0" />
                    <a
                      href={`tel:${current.phone.replace(/[^0-9+]/g, "")}`}
                      className="text-xs text-neutral-400 hover:text-white font-sans font-light tracking-wide transition-colors"
                    >
                      {current.phone}
                    </a>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-[#E10600] shrink-0" />
                    <a
                      href={`mailto:${current.email}`}
                      className="text-xs text-neutral-400 hover:text-white font-sans font-light tracking-wide transition-colors"
                    >
                      {current.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Call to action */}
              <div className="mt-8 pt-6 border-t border-neutral-900 flex justify-end">
                <a
                  href="#booking"
                  className="flex items-center gap-2 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-[#E10600] px-4 py-2 text-[9px] font-bold tracking-[0.2em] uppercase text-white font-display transition-colors"
                  id={`dealer-book-${current.id}`}
                >
                  <span>BOOK AT THIS STATION</span>
                </a>
              </div>

              {/* Decorative corner glow */}
              <div className="absolute -bottom-10 -right-10 h-20 w-20 rounded-full bg-[#E10600]/10 blur-xl pointer-events-none" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
