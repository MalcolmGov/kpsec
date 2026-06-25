"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, Play, ShieldCheck } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  sub: string;
  src: string;
  gridClass: string;
  isVideo?: boolean;
}

export default function Gallery() {
  const items: GalleryItem[] = [
    {
      id: "gal-1",
      title: "Porsche 911 GT3 RS",
      sub: "Stage 2 ECU Calibration & Akrapovič Titanium Exhaust (+65 HP)",
      src: "/hero_car.png",
      gridClass: "md:col-span-2 md:row-span-2 h-[450px]",
    },
    {
      id: "gal-2",
      title: "Twin-Turbo V8 Engine Calibrations",
      sub: "Bespoke dyno calibration on custom APEX forged builds",
      src: "/engine_bay.png",
      gridClass: "md:col-span-1 h-[215px]",
    },
    {
      id: "gal-3",
      title: "RacingLine Air Intake Installation",
      sub: "EA888 Gen 4 closed carbon fiber induction kit fitting",
      src: "/intake_system.png",
      gridClass: "md:col-span-1 h-[215px]",
    },
    {
      id: "gal-4",
      title: "Evolution Exhaust Tig Welds",
      sub: "Precision hand welding on custom titanium bypass pipes",
      src: "/exhaust_system.png",
      gridClass: "md:col-span-2 h-[210px]",
    },
  ];

  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string | null>(null);

  const openLightbox = (src: string, title: string) => {
    setLightboxSrc(src);
    setLightboxTitle(title);
  };

  const closeLightbox = () => {
    setLightboxSrc(null);
    setLightboxTitle(null);
  };

  return (
    <section className="relative bg-[#080808] py-24 border-y border-neutral-900 overflow-hidden">
      <div className="absolute inset-0 bg-carbon-dense opacity-20 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.3em] text-[#E10600] uppercase font-display block mb-3">
            Build vault
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-display leading-[0.9] mb-4">
            CLIENT
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-600">
              BUILD GALLERY
            </span>
          </h2>
          <p className="text-xs text-neutral-400 font-sans tracking-wide font-light leading-relaxed">
            A look inside our performance laboratory. Hover over builds to view calibration specifications or tap to expand full resolution.
          </p>
        </div>

        {/* Grid Masonry Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onClick={() => openLightbox(item.src, item.title)}
              className={`group relative rounded-xl border border-white/5 bg-glass overflow-hidden cursor-pointer shadow-lg ${item.gridClass}`}
            >
              {/* Image asset */}
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-[5s] ease-out select-none"
              />
              
              {/* Shadow vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 z-10" />

              {/* Laser border line */}
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-[#E10600] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20" />

              {/* Hover maximize badge icon */}
              <div className="absolute top-4 right-4 z-20 h-8 w-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="h-4 w-4 text-white" />
              </div>

              {/* Info text at bottom */}
              <div className="absolute bottom-0 inset-x-0 p-6 z-20 text-left">
                <span className="inline-flex items-center gap-1 text-[8px] font-bold tracking-[0.2em] text-[#E10600] uppercase font-display mb-1.5">
                  <ShieldCheck className="h-2.5 w-2.5" />
                  VERIFIED BUILD
                </span>
                <h3 className="text-xs sm:text-sm font-black tracking-widest text-white uppercase font-display mb-1">
                  {item.title}
                </h3>
                <p className="text-[10px] text-neutral-400 font-sans tracking-wide font-light truncate">
                  {item.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-sm cursor-zoom-out"
            id="gallery-lightbox"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Expended Image Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-5xl h-[70vh] rounded-xl border border-white/5 overflow-hidden bg-neutral-950 shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Stop bubbling
            >
              <Image
                src={lightboxSrc}
                alt={lightboxTitle || "K-Spec Build Gallery"}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Lightbox Title */}
            {lightboxTitle && (
              <div className="mt-4 text-center">
                <h3 className="text-sm font-bold tracking-[0.2em] text-white uppercase font-display">
                  {lightboxTitle}
                </h3>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
