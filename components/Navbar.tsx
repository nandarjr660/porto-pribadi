"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
// 1. Import hook useLanguage yang kita buat tadi
import { useLanguage } from "../context/LanguageContext"; 

export default function Navbar() {
  // 2. Ambil state language dan fungsi toggle-nya
  const { language, toggleLanguage } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const menuItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "Experience", href: "#experience" },
    { name: "Project", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <nav className="hidden md:flex fixed top-5 left-8 right-8 lg:left-16 lg:right-16 xl:left-32 xl:right-32 z-50 justify-between items-center p-1.5 rounded-full bg-[#FDFDF1]/30 backdrop-blur-xl border border-white/40 shadow-lg transition-all duration-300">
      
      {/* ========================================================= */}
      {/* KIRI: Logo dalam Pill Solid Warna Krem                     */}
      {/* ========================================================= */}
      <div className="bg-[#FDFDF1] px-6 py-1.5 rounded-full shadow-sm flex items-center justify-center">
        <Link 
          href="#hero" 
          className="text-2xl font-extrabold text-[#1B3022] tracking-tight hover:opacity-70 transition-opacity"
        >
          Nand.
        </Link>
      </div>

      {/* ========================================================= */}
      {/* KANAN: Menu & Switcher dalam Pill Solid Warna Krem         */}
      {/* ========================================================= */}
      <div className="bg-[#FDFDF1] px-5 py-1.5 rounded-full shadow-sm flex items-center gap-1 text-[#1B3022] font-medium text-sm">
        
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
                  isHovered ? "text-[#43766C]" : "text-[#1B3022]"
                }`}
              >
                {item.name}
              </motion.span>
              
              {isHovered && (
                <motion.div
                  layoutId="hover-pill"
                  className="absolute inset-0 bg-[#43766C]/10 rounded-full backdrop-blur-sm"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                />
              )}
            </Link>
          );
        })}
        
        {/* Garis Pembatas */}
        <span className="text-[#1B3022]/20 font-light mx-2">|</span>
        
        {/* Tombol Toggle Bahasa (Sakelar) */}
        <button 
          // 3. Sekarang pakai fungsi dari Context
          onClick={toggleLanguage} 
          className="relative flex items-center w-14 h-7 bg-[#43766C]/10 rounded-full p-1 cursor-pointer transition-colors duration-300 shadow-inner border border-[#43766C]/10"
          aria-label="Toggle Language"
        >
          {/* Label statis */}
          <span className="absolute left-1.5 text-[9px] font-bold text-[#1B3022]/60 z-0">ID</span>
          <span className="absolute right-1 text-[9px] font-bold text-[#1B3022]/60 z-0">EN</span>

          {/* Lingkaran sakelar yang bergeser */}
          <div
            className={`w-5 h-5 bg-[#43766C] rounded-full shadow-sm transform transition-transform duration-300 z-10 flex items-center justify-center ${
              // 4. Kondisi posisi lingkaran berdasarkan state global
              language === "EN" ? "translate-x-7" : "translate-x-0"
            }`}
          >
            {/* 5. Teks di dalam lingkaran mengikuti state global */}
            <span className="text-[8px] font-extrabold text-[#FDFDF1]">
              {language}
            </span>
          </div>
        </button>

      </div>
    </nav>
  );
}