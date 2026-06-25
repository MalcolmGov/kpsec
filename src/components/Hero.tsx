"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Play, Volume2, VolumeX } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Programmatic play and user interaction fallback for mobile autoplay policies
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.play().catch((err) => {
        console.log("Autoplay blocked, waiting for user interaction:", err);
      });
    };

    // Try to play immediately
    playVideo();

    // Play on first touch/click event if blocked (useful for mobile battery saver mode)
    const handleInteraction = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };

    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("click", handleInteraction);

    return () => {
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };
  }, []);

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
      if (rect.width > 0 && rect.height > 0) {
        width = canvas.width = rect.width;
        height = canvas.height = rect.height;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Foreground sparks drifting in front of the video
    class Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      gravity: number;

      constructor() {
        // Spawn sparks from the bottom area of the frame
        this.x = Math.random() * width;
        this.y = height - Math.random() * 50;
        this.vx = (Math.random() - 0.5) * 1.5 - 1.0; // drift slightly left
        this.vy = -1 - Math.random() * 3;
        this.size = Math.random() * 1.6 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.5;
        this.gravity = 0.02;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.alpha -= 0.012;

        if (this.alpha <= 0 || this.y > height) {
          this.x = Math.random() * width;
          this.y = height - Math.random() * 20;
          this.vx = (Math.random() - 0.5) * 1.5 - 1.0;
          this.vy = -1 - Math.random() * 3;
          this.alpha = Math.random() * 0.5 + 0.5;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.beginPath();
        c.fillStyle = `rgba(255, 87, 34, ${this.alpha})`; // Orange dyno sparks
        c.shadowColor = "rgba(225, 6, 0, 0.8)";
        c.shadowBlur = 4;
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    // Drifting smoke dust particles
    class Dust {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = -0.1 - Math.random() * 0.3;
        this.vy = -0.1 - Math.random() * 0.2;
        this.size = Math.random() * 30 + 10;
        this.alpha = Math.random() * 0.06 + 0.02;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -this.size) this.x = width + this.size;
        if (this.y < -this.size) this.y = height + this.size;
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.beginPath();
        const grad = c.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        grad.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        c.fillStyle = grad;
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    const sparks: Spark[] = Array.from({ length: 15 }, () => new Spark());
    const dustParticles: Dust[] = Array.from({ length: 20 }, () => new Dust());

    const animate = () => {
      if (canvas.width === 0 || canvas.height === 0) {
        handleResize();
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Render drifting smoke dust in background
      dustParticles.forEach((d) => {
        d.update();
        d.draw(ctx);
      });

      // Render sparks in foreground
      sparks.forEach((s) => {
        s.update();
        s.draw(ctx);
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
    <section className="relative min-h-screen lg:h-screen w-full overflow-hidden bg-[#050505] flex items-center pt-24 lg:pt-0">
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 lg:pt-20">
        
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
          {/* Glass frame container around the video (cinematic widescreen) */}
          <div className="relative w-full max-w-[600px] aspect-video rounded-2xl border border-white/10 bg-glass overflow-hidden shadow-2xl flex items-center justify-center">
            
            {/* Matte carbon diagonal line design overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#050505]/50 to-transparent z-10 pointer-events-none" />

            {/* Loop video showing premium supercar in action */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              defaultMuted={true}
              className="object-cover w-full h-full select-none"
              poster="/hero_car.png"
            >
              <source src="/hero_video.mp4" type="video/mp4" />
              <source src="https://player.vimeo.com/external/333429966.hd.mp4?s=a2540aa7637b9b699b2868d0cb8d76357ca85623&profile_id=175" type="video/mp4" />
              <source src="https://assets.mixkit.co/videos/preview/mixkit-exhaust-pipe-of-a-sports-car-releasing-fire-34282-large.mp4" type="video/mp4" />
            </video>

            {/* Mute/Unmute Audio Toggle Overlay */}
            <button
              onClick={toggleMute}
              className="absolute bottom-4 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white transition-all duration-300 shadow-lg hover:scale-105"
              title={isMuted ? "Unmute Engine Sound" : "Mute Sound"}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 text-neutral-400" />
              ) : (
                <Volume2 className="h-4 w-4 text-[#E10600] animate-pulse" />
              )}
            </button>

            {/* Foreground sparks and dust drifting over the video */}
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-20 mix-blend-screen" />
          </div>

          {/* Neon laser lights accenting the frame borders */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-transparent via-[#E10600]/25 to-transparent blur-md -z-10 pointer-events-none" />
        </motion.div>

      </div>
    </section>
  );
}
