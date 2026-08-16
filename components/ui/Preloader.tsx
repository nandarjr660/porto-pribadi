"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* Hallmark · component: preloader · genre: playful · theme: project system (brutalist playful tokens)
 * states: n/a (non-interactive) · contrast: pass · reduced-motion: handled */

const GREETING = "Hi, Selamat datang :)";
const GREETING_CHARS = GREETING.split("");
const MARQUEE = "GURU · PENDIDIKAN · TEKNOLOGI · PEMBELAJARAN · INOVASI · KREATIF · ";

const getStatus = (p: number) => {
  if (p < 30) return "Menyiapkan halaman";
  if (p < 60) return "Memuat karya";
  if (p < 90) return "Tunggu yaa, dikit lagi :*";
  return "Welcome and Enjoy";
};

const Preloader = () => {
  const prefersReduced = useReducedMotion();
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const status = getStatus(progress);

  useEffect(() => {
    if (sessionStorage.getItem("preloader_shown")) {
      const id = requestAnimationFrame(() => setShow(false));
      return () => cancelAnimationFrame(id);
    }

    document.body.style.overflow = "hidden";
    let raf = 0;
    const start = performance.now();
    const duration = prefersReduced ? 600 : 3500;

    const tick = (now: number) => {
      const p = Math.min(100, ((now - start) / duration) * 100);
      setProgress(Math.round(p));

      if (p < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          sessionStorage.setItem("preloader_shown", "true");
          window.setTimeout(() => {
            setShow(false);
            document.body.style.overflow = "";
          }, prefersReduced ? 100 : 850);
        }, prefersReduced ? 0 : 400);
      }
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [prefersReduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[var(--z-skip)] pointer-events-none"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label="Memuat portofolio"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: prefersReduced ? 0 : 0.65 }}
        >
          {/* Top half */}
          <motion.div
            className="relative h-1/2 bg-ink noise-bg overflow-hidden"
            exit={prefersReduced ? { opacity: 0 } : { y: "-100%" }}
            transition={prefersReduced ? { duration: 0.2 } : { duration: 0.75, delay: 0.05, ease: [0.4, 0, 0.2, 1] }}
          >
            <div aria-hidden className="absolute top-5 left-6 sm:top-7 sm:left-10 font-mono text-[13px] text-paper/40">
              HSMN.
            </div>
            <div aria-hidden className="absolute top-5 right-6 sm:top-7 sm:right-10 font-mono text-[13px] text-paper/40">
              2025
            </div>

            <motion.span
              aria-hidden
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: prefersReduced ? 0 : 0.2 }}
              className="absolute top-5 left-6 sm:top-7 sm:left-10 w-5 h-5 border-t-[3px] border-l-[3px] border-accent"
            />
            <motion.span
              aria-hidden
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: prefersReduced ? 0 : 0.25 }}
              className="absolute top-5 right-6 sm:top-7 sm:right-10 w-5 h-5 border-t-[3px] border-r-[3px] border-accent"
            />

            <div className="h-full flex flex-col items-center justify-center gap-4">
              <h2 className="font-display font-bold text-[22px] sm:text-[28px] lg:text-[32px] text-paper tracking-tight">
                {GREETING_CHARS.map((char, i) => (
                  <motion.span
                    key={i}
                    aria-hidden
                    initial={{ opacity: 0, y: prefersReduced ? 0 : 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: prefersReduced ? 0 : 0.2 + i * 0.025,
                      duration: 0.4,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h2>

              <div className="h-5 overflow-hidden" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={status}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50"
                  >
                    {status}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="w-full max-w-[300px] sm:max-w-[420px] h-[4px] bg-paper/10 overflow-hidden">
                <div
                  className="h-full bg-accent origin-left"
                  style={{
                    transform: `scaleX(${progress / 100})`,
                    transition: prefersReduced ? "transform 0.2s linear" : "transform 0.12s steps(10, end)",
                  }}
                />
              </div>
            </div>

            <div aria-hidden className="absolute bottom-0 left-0 right-0 h-9 border-t border-paper/10 flex items-center overflow-hidden">
              <div className="animate-marquee whitespace-nowrap flex">
                {[0, 1].map((i) => (
                  <span key={i} className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/15 pr-8">
                    {MARQUEE}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom half */}
          <motion.div
            className="relative h-1/2 bg-ink noise-bg overflow-hidden"
            exit={prefersReduced ? { opacity: 0 } : { y: "100%" }}
            transition={prefersReduced ? { duration: 0.2 } : { duration: 0.75, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.span
              aria-hidden
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: prefersReduced ? 0 : 0.3 }}
              className="absolute bottom-5 left-6 sm:bottom-7 sm:left-10 w-5 h-5 border-b-[3px] border-l-[3px] border-accent"
            />
            <motion.span
              aria-hidden
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: prefersReduced ? 0 : 0.35 }}
              className="absolute bottom-5 right-6 sm:bottom-7 sm:right-10 w-5 h-5 border-b-[3px] border-r-[3px] border-accent"
            />

            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: prefersReduced ? 0 : 0.3 }}
              className="absolute bottom-6 left-6 sm:bottom-8 sm:left-10 font-display font-bold text-[88px] sm:text-[120px] leading-none text-paper/15 tabular-nums"
            >
              {progress}%
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;