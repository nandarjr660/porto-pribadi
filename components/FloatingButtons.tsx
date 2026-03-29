"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function FloatingButtons() {
  const { language, toggleLanguage } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Tombol hanya muncul setelah scroll 400px
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-center gap-2 z-[9999] md:hidden">
      {/* Tombol Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-[#FDFDF1]/30 backdrop-blur-md border border-[#1B3022]/10 shadow-lg text-[#1B3022] hover:bg-[#1B3022] hover:text-[#FDFDF1] transition-all hover:scale-105 focus:outline-none"
            aria-label="Scroll to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Tombol Language Toggle (Beranimasi pas pertama load atau click) */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        onClick={toggleLanguage}
        className="relative w-11 h-11 flex items-center justify-center rounded-full bg-[#FDFDF1]/30 backdrop-blur-md border border-[#1B3022]/10 shadow-lg text-[#1B3022] hover:bg-[#1B3022] hover:text-[#FDFDF1] transition-colors focus:outline-none font-bold text-sm"
        aria-label="Toggle language"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={language}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute"
          >
            {language}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
