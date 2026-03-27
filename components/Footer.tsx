"use client";

import { useLanguage } from "../context/LanguageContext";

const content = {
  ID: {
    desc: "Pendidik Sekolah Dasar & Tech Enthusiast",
    copy: "Hak Cipta Dilindungi.",
    madeWith: "Dibuat dengan"
  },
  EN: {
    desc: "Primary School Educator & Tech Enthusiast",
    copy: "All Rights Reserved.",
    madeWith: "Made with"
  }
};

export default function Footer() {
  const { language } = useLanguage();
  const t = content[language as keyof typeof content] || content.ID;

  // Fungsi untuk menggulir layar halus ke paling atas
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#1B3022] pt-16 pb-8 px-6 relative z-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

        {/* ========================================================= */}
        {/* BAGIAN KIRI: Branding & Title                             */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-3xl font-bold text-[#FDFDF1] tracking-wide mb-2">
            Hasmunandar<span className="text-[#43766C]">.</span>
          </h2>
          <p className="text-[#FDFDF1]/60 text-sm font-medium tracking-wide">
            {t.desc}
          </p>
        </div>

        {/* ========================================================= */}
        {/* BAGIAN TENGAH/KANAN: Tombol Kembali ke Atas               */}
        {/* ========================================================= */}
        <button
          onClick={scrollToTop}
          className="p-4 rounded-full bg-white/5 hover:bg-[#43766C] border border-white/10 transition-all duration-300 group shadow-lg"
          aria-label="Kembali ke atas"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-[#FDFDF1] group-hover:-translate-y-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>

      </div>

      {/* ========================================================= */}
      {/* BAGIAN BAWAH: Copyright & Signature                       */}
      {/* ========================================================= */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#FDFDF1]/40 font-medium tracking-wide">
        
        <p>© {new Date().getFullYear()} Hasmunandar. {t.copy}</p>
        
        {/* Signature lu yang membanggakan AI! */}
        <p className="flex items-center gap-1.5">
          {t.madeWith} <span className="text-green-500 text-sm">Nand.</span> & AI Prompting
        </p>

      </div>
    </footer>
  );
}