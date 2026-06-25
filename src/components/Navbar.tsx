"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, Phone, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // JS Fallback for scroll progress bar (Firefox/Safari fallback)
  useEffect(() => {
    if (typeof window !== "undefined" && !CSS.supports("animation-timeline", "scroll()")) {
      const handleProgress = () => {
        const progressEl = document.getElementById("scroll-progress");
        if (progressEl) {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progressRatio = totalHeight > 0 ? window.scrollY / totalHeight : 0;
          progressEl.style.transform = `scaleX(${progressRatio})`;
        }
      };
      window.addEventListener("scroll", handleProgress);
      return () => window.removeEventListener("scroll", handleProgress);
    }
  }, []);

  const navItems = [
    { name: "SERVICES", href: "#services" },
    { name: "WHY K-SPEC", href: "#why-kspec" },
    { name: "DYNO", href: "#dyno" },
    { name: "PERFORMANCE PARTS", href: "#parts" },
    { name: "CALCULATOR", href: "#calculator" },
    { name: "DEALERS", href: "#dealers" },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        id="scroll-progress"
        aria-hidden="true"
        className="fixed top-0 left-0 z-50 h-[3px] w-full bg-[#E10600] origin-left shadow-[0_0_8px_#E10600] will-change-transform"
        style={{
          transform: "scaleX(0)",
          // Enable native CSS scroll animation if supported
          animation: "grow-progress auto linear",
          animationTimeline: "scroll()",
        }}
      />
      
      {/* Native keyframe declaration for scroll timeline */}
      <style jsx global>{`
        @keyframes grow-progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>

      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-[#050505]/80 backdrop-blur-md border-b border-neutral-900 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-12 items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
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

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative text-xs font-bold tracking-widest text-neutral-400 hover:text-white transition-colors py-1 group font-display"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#E10600] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#booking"
                className="relative overflow-hidden group flex items-center gap-2 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-[#E10600] px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 font-display text-white"
              >
                <Zap className="h-3 w-3 text-[#E10600] animate-pulse" />
                <span>BOOK UPGRADE</span>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Toggle Navigation Menu"
              id="mobile-menu-btn"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-[#050505] border-b border-neutral-900"
            >
              <div className="px-4 pt-2 pb-6 space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-2 text-sm font-bold tracking-widest text-neutral-400 hover:text-white transition-colors font-display"
                  >
                    {item.name}
                  </a>
                ))}
                <a
                  href="#booking"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-neutral-900 border border-neutral-800 py-3 text-sm font-bold tracking-widest uppercase text-white font-display"
                >
                  <Zap className="h-4 w-4 text-[#E10600]" />
                  <span>BOOK UPGRADE</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
