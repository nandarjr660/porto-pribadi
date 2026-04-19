"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // ─── Deteksi posisi scroll ───────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Cek posisi awal saat mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "Experience", href: "#experience" },
    { name: "Project", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  // ─── Variant animasi untuk container nav ────────────────────────────────
  const navVariants = {
    top: {
      maxWidth: "100%",
      borderRadius: "0px",
      paddingTop: "24px",
      paddingBottom: "24px",
      paddingLeft: "32px",
      paddingRight: "32px",
      backgroundColor: "rgba(253, 253, 241, 0)",
      borderColor: "rgba(255, 255, 255, 0)",
      boxShadow: "0 0px 0px rgba(0,0,0,0)",
      backdropFilter: "blur(0px)",
    },
    scrolled: {
      maxWidth: "56rem", // ≈ max-w-4xl
      borderRadius: "9999px",
      paddingTop: "6px",
      paddingBottom: "6px",
      paddingLeft: "6px",
      paddingRight: "6px",
      backgroundColor: "rgba(253, 253, 241, 0.3)",
      borderColor: "rgba(255, 255, 255, 0.4)",
      boxShadow:
        "0 4px 30px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)",
      backdropFilter: "blur(16px)",
    },
  };

  return (
    <motion.nav
      // ── Layout animation agar transisi lebar terasa smooth ──────────────
      layout
      variants={navVariants}
      animate={isScrolled ? "scrolled" : "top"}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 30,
        duration: 0.4,
        // border & shadow transisi dengan ease biasa agar tidak aneh
        backgroundColor: { duration: 0.3, ease: "easeInOut" },
        borderColor: { duration: 0.3, ease: "easeInOut" },
        boxShadow: { duration: 0.3, ease: "easeInOut" },
        backdropFilter: { duration: 0.3, ease: "easeInOut" },
      }}
      style={{
        border: "1px solid",
        // overflow hidden agar konten tidak overflow saat menyusut
        overflow: "visible",
      }}
      className={`
        hidden md:flex
        fixed top-5 left-1/2 -translate-x-1/2
        z-50 w-[calc(100%-4rem)] lg:w-[calc(100%-8rem)] xl:w-[calc(100%-16rem)]
        justify-between items-center
      `}
    >
      {/* ================================================================ */}
      {/* KIRI: Logo dalam Pill Solid Warna Krem                           */}
      {/* ================================================================ */}
      <motion.div
        layout
        className="bg-[#43766C] px-6 py-1.5 rounded-full shadow-sm flex items-center justify-center"
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        <Link
          href="#hero"
          className="text-2xl font-extrabold text-[#FDFDF1] tracking-tight hover:opacity-70 transition-opacity"
        >
          Nand.
        </Link>
      </motion.div>

      {/* ================================================================ */}
      {/* KANAN: Menu & Switcher dalam Pill Solid Warna Krem               */}
      {/* ================================================================ */}
      <motion.div
        layout
        className="bg-[#43766C] px-5 py-1.5 rounded-full shadow-sm flex items-center gap-1 text-[#FDFDF1] font-medium text-sm"
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        {/* Sliding Glider Menu */}
        {menuItems.map((item, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <Link
              key={item.name}
              href={item.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative px-4 py-1.5 rounded-full outline-none"
            >
              <motion.span
                animate={{ y: isHovered ? -2 : 0 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className={`relative z-10 block transition-colors duration-300 ${
                  isHovered ? "text-[#1B3022]" : "text-[#FDFDF1]"
                }`}
              >
                {item.name}
              </motion.span>

              {isHovered && (
                <motion.div
                  layoutId="hover-pill"
                  className="absolute inset-0 bg-[#FDFDF1]/20 rounded-full backdrop-blur-sm"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                />
              )}
            </Link>
          );
        })}

        {/* Garis Pembatas */}
        <span className="text-[#FDFDF1]/40 font-light mx-2">|</span>

        {/* Tombol Toggle Bahasa (Sakelar) */}
        <button
          onClick={toggleLanguage}
          className="relative flex items-center w-14 h-7 bg-[#FDFDF1]/15 rounded-full p-1 cursor-pointer transition-colors duration-300 shadow-inner border border-[#FDFDF1]/20"
          aria-label="Toggle Language"
        >
          {/* Label statis */}
          <span className="absolute left-1.5 text-[9px] font-bold text-[#FDFDF1]/70 z-0">
            ID
          </span>
          <span className="absolute right-1 text-[9px] font-bold text-[#FDFDF1]/70 z-0">
            EN
          </span>

          {/* Lingkaran sakelar yang bergeser */}
          <div
            className={`w-5 h-5 bg-[#FDFDF1] rounded-full shadow-sm transform transition-transform duration-300 z-10 flex items-center justify-center ${
              language === "EN" ? "translate-x-7" : "translate-x-0"
            }`}
          >
            <span className="text-[8px] font-extrabold text-[#43766C]">
              {language}
            </span>
          </div>
        </button>
      </motion.div>
    </motion.nav>
  );
}