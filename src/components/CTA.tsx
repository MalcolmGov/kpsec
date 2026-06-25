"use client";

import React, { useState } from "react";
import { Zap, ShieldCheck, CheckCircle2, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function CTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: "",
    stage: "1",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate database booking post
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Fire premium performance particles confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#E10600", "#1A1A1A", "#ffffff", "#FF5722"],
      });
    }, 1800);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      vehicle: "",
      stage: "1",
      message: "",
    });
    setSuccess(false);
  };

  return (
    <section id="booking" className="relative bg-[#050505] py-24 sm:py-32 overflow-hidden border-t border-neutral-900">
      {/* Background red neon glow */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#E10600]/5 blur-[200px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Aggressive Callout */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <span className="text-xs font-bold tracking-[0.3em] text-[#E10600] uppercase font-display block mb-3">
              Laboratory booking
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase font-display leading-[0.9] mb-8">
              READY TO
              <br />
              TRANSFORM
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-600">
                YOUR MACHINE?
              </span>
            </h2>
            <p className="text-xs text-neutral-400 font-sans tracking-wide leading-relaxed font-light mb-8 max-w-sm">
              Schedule your calibration appointment with our engineers. Fill in the vehicle configuration, and our Sandton laboratory will verify booking openings.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E10600]/10 border border-[#E10600]/25">
                  <ShieldCheck className="h-3 w-3 text-[#E10600]" />
                </div>
                <span className="text-xs font-bold tracking-widest text-white font-display uppercase">
                  100% RELIABILITY GUARANTEE
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E10600]/10 border border-[#E10600]/25">
                  <ShieldCheck className="h-3 w-3 text-[#E10600]" />
                </div>
                <span className="text-xs font-bold tracking-widest text-white font-display uppercase">
                  DYNO-VERIFIED GAINS REPORT
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Glassmorphic Booking Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/5 bg-glass p-8 sm:p-10 shadow-2xl relative">
              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.form
                    key="booking-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="text-[9px] font-bold tracking-widest text-neutral-400 uppercase font-display block mb-1.5" htmlFor="book-name">
                          FULL NAME
                        </label>
                        <input
                          type="text"
                          id="book-name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-neutral-950/80 border border-neutral-900 rounded-lg p-3 text-xs text-white placeholder-neutral-700 focus:border-[#E10600] outline-none"
                          placeholder="e.g. Malcolm Govender"
                        />
                      </div>
                      {/* Vehicle */}
                      <div>
                        <label className="text-[9px] font-bold tracking-widest text-neutral-400 uppercase font-display block mb-1.5" htmlFor="book-vehicle">
                          VEHICLE MAKE & MODEL
                        </label>
                        <input
                          type="text"
                          id="book-vehicle"
                          required
                          value={formData.vehicle}
                          onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                          className="w-full bg-neutral-950/80 border border-neutral-900 rounded-lg p-3 text-xs text-white placeholder-neutral-700 focus:border-[#E10600] outline-none"
                          placeholder="e.g. Golf 8 R 2024"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label className="text-[9px] font-bold tracking-widest text-neutral-400 uppercase font-display block mb-1.5" htmlFor="book-email">
                          EMAIL ADDRESS
                        </label>
                        <input
                          type="email"
                          id="book-email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-neutral-950/80 border border-neutral-900 rounded-lg p-3 text-xs text-white placeholder-neutral-700 focus:border-[#E10600] outline-none"
                          placeholder="name@domain.com"
                        />
                      </div>
                      {/* Phone */}
                      <div>
                        <label className="text-[9px] font-bold tracking-widest text-neutral-400 uppercase font-display block mb-1.5" htmlFor="book-phone">
                          PHONE NUMBER
                        </label>
                        <input
                          type="tel"
                          id="book-phone"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-neutral-950/80 border border-neutral-900 rounded-lg p-3 text-xs text-white placeholder-neutral-700 focus:border-[#E10600] outline-none"
                          placeholder="+27 82 123 4567"
                        />
                      </div>
                    </div>

                    {/* Stage selector */}
                    <div>
                      <label className="text-[9px] font-bold tracking-widest text-neutral-400 uppercase font-display block mb-2">
                        TARGET CALIBRATION PROFILE
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {["1", "2", "3"].map((stg) => (
                          <button
                            key={stg}
                            type="button"
                            onClick={() => setFormData({ ...formData, stage: stg })}
                            className={`rounded-lg border py-2 text-center transition-all duration-300 font-display text-[10px] font-black uppercase ${
                              formData.stage === stg
                                ? "border-[#E10600] bg-[#E10600]/5 text-white"
                                : "border-neutral-900 bg-neutral-950 text-neutral-500 hover:border-neutral-800"
                            }`}
                            id={`form-stage-btn-${stg}`}
                          >
                            STAGE {stg}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message details */}
                    <div>
                      <label className="text-[9px] font-bold tracking-widest text-neutral-400 uppercase font-display block mb-1.5" htmlFor="book-msg">
                        LIST MODIFICATIONS & REQUIREMENTS
                      </label>
                      <textarea
                        id="book-msg"
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-neutral-950/80 border border-neutral-900 rounded-lg p-3 text-xs text-white placeholder-neutral-700 focus:border-[#E10600] outline-none resize-none"
                        placeholder="e.g. Decat downpipe installed, stock exhaust, running 95 Ron..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#E10600] hover:bg-[#b00500] disabled:bg-neutral-800 py-4 text-xs font-bold tracking-[0.25em] uppercase text-white shadow-[0_0_20px_rgba(225,6,0,0.3)] transition-all duration-300 font-display cursor-pointer"
                      id="book-submit-btn"
                    >
                      {loading ? (
                        <span>TRANSMITTING TELEMETRY...</span>
                      ) : (
                        <>
                          <Zap className="h-3.5 w-3.5" />
                          <span>TRANSMIT CALIBRATION REQUEST</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="booking-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-10 text-center"
                  >
                    <CheckCircle2 className="h-16 w-16 text-[#E10600] mb-6 drop-shadow-[0_0_8px_rgba(225,6,0,0.5)] animate-bounce" />
                    <h3 className="text-xl font-black tracking-widest text-white uppercase font-display mb-2">
                      TRANSMISSION SUCCESSFUL
                    </h3>
                    <p className="text-xs text-neutral-400 font-sans font-light tracking-wide max-w-sm leading-relaxed mb-8">
                      Booking telemetry logged. A K-Spec calibration engineer will verify and contact you within 2 hours to confirm your lab reservation.
                    </p>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-[#E10600] px-4 py-2.5 text-[9px] font-bold tracking-[0.2em] uppercase text-white font-display transition-colors"
                      id="book-reset-btn"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>NEW ENQUIRY</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
