"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastState {
  show: boolean;
  type: "success" | "error";
}

type Phase = "idle" | "circle" | "capsule" | "content" | "shrink" | "exit";

export default function ContactForm() {
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [windowWidth, setWindowWidth] = useState(() => 
    typeof window !== "undefined" ? window.innerWidth : 380
  );

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const addTimeout = (cb: () => void, delay: number) => {
    const id = setTimeout(cb, delay);
    timeoutsRef.current.push(id);
  };

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  // Resize listener for responsive layout size values
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Clean up timeouts on component unmount
  useEffect(() => {
    return () => clearAllTimeouts();
  }, []);

  // Orchestrate the reverse outro sequence when toast is dismissed
  const handleDismiss = () => {
    clearAllTimeouts();

    // 1. Fade out the text contents (capsule shape remains)
    setPhase("capsule");

    // 2. Shrink back to the circle shape
    addTimeout(() => {
      setPhase("shrink");
    }, 350);

    // 3. Fade out the circle and translate up
    addTimeout(() => {
      setPhase("exit");
    }, 850);

    // 4. Unmount the toast component
    addTimeout(() => {
      setToast(null);
      setPhase("idle");
    }, 1150);
  };

  // Trigger and orchestrate the intro sequence when toast is activated
  const triggerToast = (type: "success" | "error") => {
    clearAllTimeouts();
    setToast({ show: true, type });
    setPhase("circle");

    // 1. Expand to capsule shape
    addTimeout(() => {
      setPhase("capsule");
    }, 450);

    // 2. Show rich content (text + icons)
    addTimeout(() => {
      setPhase("content");
    }, 950);

    // 3. Auto-dismiss timer after 6.5 seconds of visibility
    addTimeout(() => {
      handleDismiss();
    }, 6500);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);
    
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "dcf59fb6-b2ff-48db-82f4-63ae4a7e2431");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        triggerToast("success");
        form.reset();
      } else {
        triggerToast("error");
      }
    } catch {
      triggerToast("error");
    } finally {
      setIsSending(false);
    }
  };

  // Compute container style (padding is moved to the child to prevent layout squeeze glitches)
  const getContainerStyle = () => {
    const targetWidth = windowWidth < 640 ? "92vw" : "420px";

    switch (phase) {
      case "circle":
        return {
          width: "80px",
          height: "80px",
          borderRadius: "9999px",
          padding: "0px",
          opacity: 1,
          y: 0,
        };
      case "capsule":
        return {
          width: targetWidth,
          height: "80px",
          borderRadius: "9999px",
          padding: "0px",
          opacity: 1,
          y: 0,
        };
      case "content":
        return {
          width: targetWidth,
          height: "80px",
          borderRadius: "40px",
          padding: "0px",
          opacity: 1,
          y: 0,
        };
      case "shrink":
        return {
          width: "80px",
          height: "80px",
          borderRadius: "9999px",
          padding: "0px",
          opacity: 1,
          y: 0,
        };
      case "exit":
        return {
          width: "80px",
          height: "80px",
          borderRadius: "9999px",
          padding: "0px",
          opacity: 0,
          y: -40,
        };
      default:
        return {
          width: "80px",
          height: "80px",
          borderRadius: "9999px",
          padding: "0px",
          opacity: 0,
          y: -40,
        };
    }
  };

  return (
    <>
      <motion.form 
        onSubmit={onSubmit}
        className="flex flex-col gap-5 w-full max-w-[700px] mt-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="contact-name" className="text-xs sm:text-sm font-semibold text-text-primary/70 font-body">Nama Anda</label>
            <input 
              id="contact-name"
              type="text" 
              name="name" 
              placeholder="Nama Anda"
              required
              className="bg-interaction/10 border border-interaction/30 rounded-[9px] px-4 sm:px-5 py-3 text-sm sm:text-base text-text-primary placeholder:text-text-primary/50 font-body focus:outline-none focus:border-interaction focus:ring-1 focus:ring-interaction transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <label htmlFor="contact-email" className="text-xs sm:text-sm font-semibold text-text-primary/70 font-body">Email Anda</label>
            <input 
              id="contact-email"
              type="email" 
              name="email" 
              placeholder="Email Anda"
              required
              className="bg-interaction/10 border border-interaction/30 rounded-[9px] px-4 sm:px-5 py-3 text-sm sm:text-base text-text-primary placeholder:text-text-primary/50 font-body focus:outline-none focus:border-interaction focus:ring-1 focus:ring-interaction transition-colors"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="contact-message" className="text-xs sm:text-sm font-semibold text-text-primary/70 font-body">Pesan Anda</label>
          <textarea 
            id="contact-message"
            name="message" 
            placeholder="Pesan Anda"
            required 
            rows={5}
            className="bg-interaction/10 border border-interaction/30 rounded-[9px] px-4 sm:px-5 py-3 text-sm sm:text-base text-text-primary placeholder:text-text-primary/50 font-body focus:outline-none focus:border-interaction focus:ring-1 focus:ring-interaction transition-colors resize-none"
          ></textarea>
        </div>
        <div className="flex items-center gap-5">
          <button 
            type="submit"
            disabled={isSending}
            className="bg-interaction text-background font-body font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-[9px] hover:bg-interaction/90 transition-colors shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interaction focus-visible:ring-offset-2 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? "Sending..." : "Kirim Pesan"}
          </button>
        </div>
      </motion.form>

      {/* Dynamic Island Toast Notification */}
      <AnimatePresence>
        {toast && toast.show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -40 }}
            animate={getContainerStyle()}
            style={{ x: "-50%" }}
            transition={{ 
              type: "spring", 
              stiffness: 220, 
              damping: 18 
            }}
            className="fixed top-6 left-1/2 z-9999 flex items-center justify-center bg-text-primary text-background border border-interaction/20 shadow-[0_12px_40px_rgba(1,50,55,0.35)] origin-center overflow-hidden"
          >
            {/* 
              Continuous content layout (opacity/scale/y mapped directly to phase values.
              Padding is placed here to avoid squeeze artifacts during stretching phase).
            */}
            <motion.div
              animate={{ 
                opacity: phase === "content" ? 1 : 0, 
                scale: phase === "content" ? 1 : 0.92,
                y: phase === "content" ? 0 : 6
              }}
              transition={{ 
                duration: 0.32, 
                ease: [0.25, 1, 0.5, 1] 
              }}
              style={{
                pointerEvents: phase === "content" ? "auto" : "none",
                visibility: (phase === "content" || phase === "capsule") ? "visible" : "hidden"
              }}
              className="px-7 sm:px-8 flex items-center justify-between w-full h-full select-none"
            >
              {/* Text on the Left */}
              <span className="font-heading font-black text-lg sm:text-xl md:text-[22px] tracking-wide text-white uppercase">
                {toast.type === "success" ? "Berhasil mengirim" : "Gagal mengirim"}
              </span>

              {/* Glowing Clickable Status Logo on the Right */}
              <button
                onClick={handleDismiss}
                className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-interaction rounded-full transition-transform hover:scale-105 active:scale-95"
                aria-label="Tutup notifikasi"
              >
                {toast.type === "success" ? (
                  <div className="flex items-center justify-center size-9 bg-emerald-500/20 rounded-full shrink-0 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.6)] hover:bg-emerald-500/30 transition-colors">
                    <svg
                      className="size-5 text-emerald-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                ) : (
                  <div className="flex items-center justify-center size-9 bg-rose-500/20 rounded-full shrink-0 border border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.6)] hover:bg-rose-500/30 transition-colors">
                    <svg
                      className="size-5 text-rose-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                )}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
