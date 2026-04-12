"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

const content = {
  ID: {
    greeting: "Halo, Saya",
    name: "Hasmunandar.",
    desc: "Calon Pendidik Sekolah Dasar & Web Enthusiast. Menggabungkan ilmu keguruan (PGSD/PPG) dengan solusi kreatif di dunia digital.",
    btnProject: "Lihat Project",
    btnCv: "Unduh CV",
    scroll: "Scroll for more"
  },
  EN: {
    greeting: "Hello, I Am",
    name: "Hasmunandar.",
    desc: "Aspiring Primary School Educator & Web Enthusiast. Combining educational expertise (PGSD/PPG) with creative digital solutions.",
    btnProject: "View Projects",
    btnCv: "Download CV",
    scroll: "Scroll for more"
  }
};

export default function Hero() {
  const { scrollY } = useScroll();
  const { language } = useLanguage();
  const t = content[language as keyof typeof content] || content.ID;
  
  // Efek tenggelam saat di-scroll (tetap pakai Framer Motion karena ini aman)
  const scale = useTransform(scrollY, [0, 500], [1, 0.9]);
  const scrollOpacity = useTransform(scrollY, [0, 500], [1, 0.2]);

  return (
    <>
      {/* JURUS CSS MURNI: Animasi yang tidak mungkin gagal / di-block Next.js */}
      <style>{`
        @keyframes fadeInZoom {
          0% { opacity: 0; transform: scale(0.8); filter: blur(10px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0px); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .anim-zoom { animation: fadeInZoom 1.2s ease-out forwards; }
        .anim-up-1 { animation: fadeInUp 0.8s ease-out 0.3s forwards; opacity: 0; }
        .anim-up-2 { animation: fadeInUp 0.8s ease-out 0.6s forwards; opacity: 0; }
        .anim-up-3 { animation: fadeInUp 0.8s ease-out 0.9s forwards; opacity: 0; }
        .anim-up-4 { animation: fadeInUp 0.8s ease-out 1.2s forwards; opacity: 0; }
      `}</style>

      <motion.section 
        style={{ scale, opacity: scrollOpacity }}
        id="home" 
        className="sticky top-0 flex flex-col items-center justify-center min-h-screen w-full bg-[#FDFDF1] px-6 pt-20 z-0 origin-top"
      >
        <div className="text-center max-w-3xl">
          
          {/* ANIMASI 1: "Halo, Saya" (Zoom out & Blur to Clear) */}
          <p className="anim-zoom text-[#43766C] font-medium tracking-wider mb-3 uppercase">
            {t.greeting}
          </p>
          
          {/* ANIMASI 2: Nama */}
          <h1 className="anim-up-1 text-5xl md:text-7xl font-extrabold text-[#1B3022] mb-6 tracking-tighter">
            {t.name}
          </h1>
          
          {/* ANIMASI 3: Deskripsi */}
          <p className="anim-up-2 text-lg md:text-xl text-[#1B3022]/80 mb-10 leading-relaxed">
            {t.desc}
          </p>

          {/* Tombol Action */}
          <div className="anim-up-3 flex flex-col sm:flex-row items-center justify-center gap-4 font-semibold mb-10">
            <Link href="#projects" className="flex items-center justify-center gap-2 px-8 py-4 bg-[#43766C] text-white rounded-full hover:bg-[#1B3022] transition-all shadow-lg" scroll={true}>
              {t.btnProject}
            </Link>
            <a href="https://drive.google.com/file/d/1_wOUIG4XkeXgoGzk7TXX1zSceT-FDTxs/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#43766C] text-[#43766C] rounded-full hover:bg-[#43766C]/10 transition-all">
              {t.btnCv}
            </a>
          </div>

          {/* Ikon Sosmed */}
          <div className="anim-up-4 flex items-center justify-center gap-6 text-[#43766C] font-bold">
            <a href="https://www.linkedin.com/in/hasmunandar/" className="hover:underline">LINKEDIN</a>
            <span>•</span>
            <a href="https://www.instagram.com/hsmnandar/" className="hover:underline">INSTAGRAM</a>
          </div>
        </div>

        {/* Animasi Scroll Down */}
        <div className="anim-up-4 absolute bottom-10 flex flex-col items-center gap-2 text-[#43766C]">
          <div className="animate-bounce flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em]">{t.scroll}</span>
            <div className="w-[1px] h-8 bg-[#43766C]"></div>
          </div>
        </div>
      </motion.section>
    </>
  );
}