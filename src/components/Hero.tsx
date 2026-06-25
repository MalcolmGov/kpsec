"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Play } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Easing angle for wheel rotation
    let wheelAngle = 0;
    let brakePulse = 0;

    // Particle class for exhaust smoke (venting from bottom left tailpipe: X ~12%, Y ~68%)
    class SmokeParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;

      constructor() {
        this.x = width * 0.12;
        this.y = height * 0.68;
        this.vx = -0.5 - Math.random() * 1.5; // blows backwards
        this.vy = -0.2 - Math.random() * 0.6; // drifts slightly up
        this.alpha = Math.random() * 0.3 + 0.1;
        this.size = Math.random() * 8 + 3;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.size += 0.25; // expands
        this.alpha -= 0.005; // fades out
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.beginPath();
        const grad = c.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        grad.addColorStop(0, `rgba(180, 180, 180, ${this.alpha})`);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        c.fillStyle = grad;
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    // Spark particles spraying from the contact point of both wheels
    class DynoSpark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      gravity: number;

      constructor(wheelType: "front" | "rear") {
        const wheelX = wheelType === "front" ? width * 0.742 : width * 0.258;
        const wheelY = height * 0.598;
        const radius = width * 0.115;

        // Spawn at bottom contact point
        this.x = wheelX;
        this.y = wheelY + radius - 2;
        // Shoot backwards (to the left) at high speed
        this.vx = -4 - Math.random() * 7;
        this.vy = -1.5 + Math.random() * 3;
        this.size = Math.random() * 1.8 + 0.5;
        this.alpha = 1;
        this.gravity = 0.12;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity; // falls
        this.alpha -= 0.025; // fades
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.beginPath();
        c.fillStyle = `rgba(255, 87, 34, ${this.alpha})`; // Hot orange sparks
        c.shadowColor = "rgba(225, 6, 0, 0.9)";
        c.shadowBlur = 4;
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    let smoke: SmokeParticle[] = [];
    let sparks: DynoSpark[] = [];

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw glowing brake disc behind front wheel (X = 74.2%, Y = 59.8%, Rad = 11.5%)
      const fx = width * 0.742;
      const fy = height * 0.598;
      const rx = width * 0.258;
      const ry = height * 0.598;
      const rad = width * 0.115;

      brakePulse = Math.sin(Date.now() * 0.005) * 0.1 + 0.9; // pulse brakes

      // Glowing rotor backing
      ctx.save();
      const gradBrake = ctx.createRadialGradient(fx, fy, rad * 0.2, fx, fy, rad * 0.85);
      gradBrake.addColorStop(0, `rgba(225, 6, 0, ${0.75 * brakePulse})`);
      gradBrake.addColorStop(0.5, `rgba(255, 87, 34, ${0.5 * brakePulse})`);
      gradBrake.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradBrake;
      ctx.beginPath();
      ctx.arc(fx, fy, rad * 0.9, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Draw spinning wheels overlays
      wheelAngle += 0.35; // speed of wheel rotation

      const drawSpinningWheel = (cx: number, cy: number, radius: number) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(wheelAngle);

        // Radial blurred spokes (10 spoke alloy wheel representation)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
        ctx.lineWidth = 2.5;
        for (let i = 0; i < 10; i++) {
          ctx.rotate((Math.PI * 2) / 10);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(radius * 0.88, 0);
          ctx.stroke();
        }

        // Concentric rotation rings simulating wheel lip speed
        ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.75, 0, Math.PI * 2);
        ctx.stroke();

        // Dark hub cap
        ctx.fillStyle = "rgba(10, 10, 10, 0.92)";
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.28, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      };

      drawSpinningWheel(rx, ry, rad);
      drawSpinningWheel(fx, fy, rad);

      // 3. Update & render smoke
      if (Math.random() > 0.4) {
        smoke.push(new SmokeParticle());
      }
      smoke = smoke.filter((p) => {
        p.update();
        if (p.alpha > 0) {
          p.draw(ctx);
          return true;
        }
        return false;
      });

      // 4. Update & render sparks
      if (Math.random() > 0.2) {
        sparks.push(new DynoSpark("front"));
        sparks.push(new DynoSpark("rear"));
      }
      sparks = sparks.filter((s) => {
        s.update();
        if (s.alpha > 0 && s.y < height) {
          s.draw(ctx);
          return true;
        }
        return false;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#050505] flex items-center">
      {/* Background Parallax & Textures */}
      <div className="absolute inset-0 bg-carbon opacity-30 z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40 z-10" />

      {/* Red ambient background glowing circles */}
      <div className="absolute top-[30%] left-[20%] h-96 w-96 -translate-x-1/2 rounded-full bg-[#E10600]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] h-96 w-96 rounded-full bg-[#E10600]/15 blur-[150px] pointer-events-none" />

      {/* Laser light horizontal line sweep */}
      <div className="absolute inset-x-0 top-[20%] h-[1px] bg-gradient-to-r from-transparent via-[#E10600] to-transparent shadow-[0_0_10px_#E10600] opacity-20 pointer-events-none animate-laser-sweep" />
      <div className="absolute inset-x-0 bottom-[30%] h-[1px] bg-gradient-to-r from-transparent via-[#E10600] to-transparent shadow-[0_0_10px_#E10600] opacity-20 pointer-events-none animate-laser-sweep" style={{ animationDelay: "2s" }} />

      {/* Hero Content Layer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-20">
        
        {/* Left Hand: High Impact Copy */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 flex flex-col items-start text-left"
        >
          {/* Tagline Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-[#E10600]/30 bg-[#E10600]/5 px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-[#E10600] uppercase mb-6 font-display"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#E10600] animate-pulse" />
            Elite Calibration Lab
          </motion.div>

          {/* Headline: Engineered typography */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white uppercase font-display leading-[0.9]"
          >
            UNLEASH
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-600">
              YOUR
            </span>
            <br />
            <span className="text-[#E10600] text-glow-red">MACHINE.</span>
          </motion.h1>

          {/* Subtitle statement */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-sm md:text-base text-neutral-400 font-sans tracking-wide max-w-md font-light leading-relaxed"
          >
            Custom ECU & TCU remapping engineered in South Africa's most advanced calibration laboratory. Extract maximum horsepower and throttle response without compromising safety.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a
              href="#booking"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#E10600] hover:bg-[#b00500] px-6 py-4 text-xs font-bold tracking-[0.2em] uppercase text-white shadow-[0_0_20px_rgba(225,6,0,0.4)] transition-all duration-300 font-display group"
              id="hero-primary-cta"
            >
              <span>BOOK UPGRADE</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="flex items-center justify-center gap-2 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 px-6 py-4 text-xs font-bold tracking-[0.2em] uppercase text-neutral-200 transition-all duration-300 font-display"
              id="hero-secondary-cta"
            >
              <Play className="h-3 w-3 fill-neutral-200 text-neutral-200" />
              <span>EXPLORE SERVICES</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Hand: Supercar visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="lg:col-span-6 relative flex justify-center items-center w-full min-h-[300px] sm:min-h-[450px]"
        >
          {/* Glass frame container around the image - REMOVED animate-heat-haze to ensure 100% sharp crisp image */}
          <div className="relative w-full max-w-[450px] aspect-square rounded-2xl border border-white/5 bg-glass overflow-hidden shadow-2xl flex items-center justify-center">
            
            {/* Matte carbon diagonal line design overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#050505]/40 to-transparent z-10 pointer-events-none" />

            {/* Glowing spot overlay corresponding to brake discs */}
            <div className="absolute bottom-[22%] right-[22%] z-20 h-10 w-10 rounded-full bg-[#E10600] opacity-40 blur-md pointer-events-none animate-brake-glow" />

            {/* Actual premium AI car photo - prioritized quality parameters to prevent blurriness */}
            <Image
              src="/hero_car.png"
              alt="K-Spec Premium GT3 Performance Vehicle"
              fill
              className="object-cover scale-100 select-none"
              priority
              quality={100}
              id="hero-car-image"
            />

            {/* Interactive visual canvas overlay inside the container, keeping it perfectly aligned with the car */}
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-30 mix-blend-screen" />
          </div>

          {/* Neon laser lights accenting the frame borders */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-transparent via-[#E10600]/25 to-transparent blur-md -z-10 pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
}
