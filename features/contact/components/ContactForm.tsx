"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Send, AlertCircle, Check, X } from "lucide-react";
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

  const shouldReduceMotion = useReducedMotion();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToast({ show: true, type });
    timeoutRef.current = setTimeout(() => setToast(null), 6000);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    if (!validateEmail(emailInput.value)) return;

    setStatus("loading");
    const formData = new FormData(form);
    formData.append("access_key", "dcf59fb6-b2ff-48db-82f4-63ae4a7e2431");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
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
        className="flex flex-col gap-5 w-full max-w-[700px]"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-name" className="font-mono text-[11px] text-muted uppercase tracking-wider">
              Nama
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="Nama Anda"
              required
              className="bg-paper border-[2.5px] border-border px-4 py-3 text-[14px] text-ink placeholder:text-muted/40 font-body focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-email" className="font-mono text-[11px] text-muted uppercase tracking-wider">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="email@contoh.com"
              required
              onBlur={(e) => validateEmail(e.target.value)}
              onChange={() => setEmailError(false)}
              className={`bg-paper border-[2.5px] px-4 py-3 text-[14px] text-ink placeholder:text-muted/40 font-body focus:outline-none transition-colors ${
                emailError
                  ? "border-playful-coral focus:border-playful-coral"
                  : "border-border focus:border-accent"
              }`}
            />
            {emailError && (
              <p className="flex items-center gap-1.5 text-[12px] text-playful-coral font-body mt-0.5">
                <AlertCircle className="size-3.5 shrink-0" />
                Format email tidak valid
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-message" className="font-mono text-[11px] text-muted uppercase tracking-wider">
            Pesan
          </label>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Tulis pesan Anda di sini..."
            required
            rows={5}
            className="bg-paper border-[2.5px] border-border px-4 py-3 text-[14px] text-ink placeholder:text-muted/40 font-body focus:outline-none focus:border-accent transition-colors resize-none"
          />
        </div>

        <div className="flex items-center gap-4">
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

      {/* Toast */}
      <AnimatePresence>
        {toast && toast.show && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            role="status"
            aria-live="polite"
            className="fixed bottom-6 right-6 left-6 sm:left-auto z-[var(--z-toast)] max-w-[400px] bg-ink text-paper border-[2.5px] border-ink brutalist-shadow-sm"
          >
            <div className="px-5 py-4 flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                {toast.type === "success" ? (
                  <Check className="size-5 text-playful-teal" strokeWidth={2.5} aria-hidden="true" />
                ) : (
                  <X className="size-5 text-playful-coral" strokeWidth={2.5} aria-hidden="true" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-bold text-[14px] text-paper">
                  {toast.type === "success" ? "Terkirim!" : "Gagal"}
                </h4>
                <p className="font-body text-[12px] text-paper/60 mt-0.5">
                  {toast.type === "success"
                    ? "Terima kasih, saya akan segera merespon."
                    : "Terjadi kesalahan. Silakan coba lagi."}
                </p>
              </div>
              <button
                onClick={handleDismiss}
                className="shrink-0 text-paper/40 hover:text-paper transition-colors cursor-pointer font-bold"
                aria-label="Tutup"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
