"use client";

import { useState, useEffect } from "react";
import Lenis from "lenis";

// Import premium components
import TachometerLoader from "@/components/TachometerLoader";
import CursorGlow from "@/components/CursorGlow";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import WhyKSpec from "@/components/WhyKSpec";
import BeforeAfter from "@/components/BeforeAfter";
import BrandLogos from "@/components/BrandLogos";
import PartsGrid from "@/components/PartsGrid";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Calculator from "@/components/Calculator";
import DealerMap from "@/components/DealerMap";
import RaceFuel from "@/components/RaceFuel";
import LatestBuilds from "@/components/LatestBuilds";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Initialize Lenis Smooth Scroll after loading completes
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  if (loading) {
    return <TachometerLoader onComplete={() => setLoading(false)} />;
  }

  return (
    <>
      {/* Background spotlights tracker */}
      <CursorGlow />

      {/* Main layout */}
      <Navbar />
      
      <main className="flex-1 w-full bg-[#050505] overflow-x-hidden relative">
        <Hero />
        <Stats />
        <Services />
        <WhyKSpec />
        <BeforeAfter />
        <BrandLogos />
        <PartsGrid />
        <Gallery />
        <Testimonials />
        <Calculator />
        <DealerMap />
        <RaceFuel />
        <LatestBuilds />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
