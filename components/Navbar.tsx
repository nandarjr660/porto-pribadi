"use client";

import Link from "next/link";
// 1. Import hook useLanguage yang kita buat tadi
import { useLanguage } from "../context/LanguageContext"; 

export default function Navbar() {
  // 2. Ambil state language dan fungsi toggle-nya
  const { language, toggleLanguage } = useLanguage();

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
      <div className="bg-[#FDFDF1] px-7 py-1.5 rounded-full shadow-sm flex items-center gap-6 text-[#1B3022] font-medium text-sm">
        
        {/* Link Navigasi Tetap Sama */}
        <Link href="#hero" className="hover:text-[#43766C] transition-colors">Home</Link>
        <Link href="#about" className="hover:text-[#43766C] transition-colors">About</Link>
        <Link href="#roadmap" className="hover:text-[#43766C] transition-colors">Roadmap</Link>
        <Link href="#experience" className="hover:text-[#43766C] transition-colors">Experience</Link>
        <Link href="#projects" className="hover:text-[#43766C] transition-colors">Project</Link>
        <Link href="#contact" className="hover:text-[#43766C] transition-colors">Contact</Link>
        
        {/* Garis Pembatas */}
        <span className="text-[#1B3022]/20 font-light">|</span>
        
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