"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Send, AlertCircle } from "lucide-react";
import { AsyncButton } from "@/components/shadcnblocks/async-button";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com|icloud\.com|live\.com|protonmail\.com|proton\.me|mail\.com|aol\.com|zoho\.com|yandex\.com|gmx\.com|protonmail\.ch)$/i;

interface ToastState {
  show: boolean;
  type: "success" | "error";
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [toast, setToast] = useState<ToastState | null>(null);
  const [emailError, setEmailError] = useState(false);
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 380
  );

  const shouldReduceMotion = useReducedMotion();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Resize listener for layout size values
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Clean up timeout on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleDismiss = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setToast(null);
  };

  const validateEmail = (value: string) => {
    const valid = EMAIL_REGEX.test(value);
    setEmailError(!valid);
    return valid;
  };

  const triggerToast = (type: "success" | "error") => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setToast({ show: true, type });

    timeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 6000);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    if (!validateEmail(emailInput.value)) {
      return;
    }

    setStatus("loading");

    const formData = new FormData(form);
    formData.append("access_key", "dcf59fb6-b2ff-48db-82f4-63ae4a7e2431");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        setStatus("success");
        triggerToast("success");
        form.reset();
      } else {
        setStatus("error");
        triggerToast("error");
      }
    } catch {
      setStatus("error");
      triggerToast("error");
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
              onBlur={(e) => validateEmail(e.target.value)}
              onChange={() => setEmailError(false)}
              className={`bg-interaction/10 border rounded-[9px] px-4 sm:px-5 py-3 text-sm sm:text-base text-text-primary placeholder:text-text-primary/50 font-body focus:outline-none focus:ring-1 transition-colors ${
                emailError
                  ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/30"
                  : "border-interaction/30 focus:border-interaction focus:ring-interaction"
              }`}
            />
            {emailError && (
              <p className="flex items-center gap-1.5 text-xs text-rose-500 font-body mt-0.5">
                <AlertCircle className="size-3.5 shrink-0" />
                Format email yang anda masukkan salah
              </p>
            )}
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
          <AsyncButton 
            type="submit"
            status={status}
            onReset={() => setStatus("idle")}
          >
            <Send className="size-4" />
            Kirim Pesan
          </AsyncButton>
        </div>
      </motion.form>

      {/* Slide-in Toast Notification */}
      <AnimatePresence>
        {toast && toast.show && (
          <motion.div
            initial={
              shouldReduceMotion 
                ? { opacity: 0 } 
                : windowWidth < 640 
                  ? { opacity: 0, y: 80 } 
                  : { opacity: 0, x: 80 }
            }
            animate={
              shouldReduceMotion 
                ? { opacity: 1 } 
                : windowWidth < 640 
                  ? { opacity: 1, y: 0 } 
                  : { opacity: 1, x: 0 }
            }
            exit={
              shouldReduceMotion 
                ? { opacity: 0 } 
                : windowWidth < 640 
                  ? { opacity: 0, y: 80 } 
                  : { opacity: 0, x: 80 }
            }
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 24
            }}
            className="fixed bottom-6 right-6 left-6 sm:left-auto z-9999 max-w-[420px] bg-background/95 backdrop-blur-md text-text-primary rounded-xl shadow-[0_10px_30px_rgba(1,50,55,0.12)] border border-text-primary/10 overflow-hidden"
          >
            {/* Colored Accent Stripe on the Left */}
            <div 
              className={`absolute left-0 top-0 bottom-0 w-[5px] ${
                toast.type === "success" ? "bg-emerald-500" : "bg-rose-500"
              }`} 
            />
            
            <div className="pl-6 pr-5 py-4 flex items-start gap-4">
              {/* Icon Container */}
              <div className="shrink-0 mt-0.5">
                {toast.type === "success" ? (
                  <div className="flex items-center justify-center size-9 rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    <svg
                      className="size-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                ) : (
                  <div className="flex items-center justify-center size-9 rounded-lg bg-rose-500/10 text-rose-600 border border-rose-500/20">
                    <svg
                      className="size-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Text Container */}
              <div className="flex-1 min-w-0 text-left">
                <h4 className="font-heading font-bold text-sm sm:text-base text-text-primary leading-tight">
                  {toast.type === "success" ? "Pesan Terkirim!" : "Gagal Mengirim"}
                </h4>
                <p className="font-body text-xs sm:text-[13px] text-text-primary/70 leading-normal mt-1 pr-2">
                  {toast.type === "success" 
                    ? "Terima kasih, saya akan segera menghubungi Anda." 
                    : "Terjadi kesalahan. Silakan coba kembali."}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={handleDismiss}
                className="shrink-0 size-7 flex items-center justify-center rounded-lg hover:bg-text-primary/5 text-text-primary/45 hover:text-text-primary/80 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interaction"
                aria-label="Tutup notifikasi"
              >
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
