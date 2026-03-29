"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

const content = {
  ID: {
    subtitle: "Kompetensi",
    title: "Skills & Experience",
    experienceData: [
      {
        id: 0,
        title: "Pengembangan Media Ajar",
        summary: "Media visual & interaktif untuk antusiasme belajar.",
        desc: "Mendesain media visual dan interaktif yang memantik antusiasme belajar siswa sekolah dasar, mengubah konsep rumit menjadi materi yang menyenangkan secara visual."
      },
      {
        id: 1,
        title: "Bahan Ajar & LKPD",
        summary: "Modul terstruktur & Lembar Kerja berpikir kritis.",
        desc: "Merancang modul terstruktur dan Lembar Kerja Peserta Didik (LKPD) yang mendorong siswa berpikir kritis (HOTS) dengan cara yang terarah dan ramah anak."
      },
      {
        id: 2,
        title: "AI & Tech Integration",
        summary: "Pemanfaatan Prompt Engineering untuk solusi edukatif.",
        desc: "Mampu berkolaborasi dengan Kecerdasan Buatan (Prompt Engineering) untuk merancang dan mempercepat pembuatan solusi digital edukatif, seperti web portofolio ini."
      },
      {
        id: 3,
        title: "Tools & Languages",
        summary: "Perangkat lunak dan bahasa pendukung produktivitas:",
        isTools: true
      }
    ],
    langId: "Indonesia",
    langIdLevel: "NATIVE / PENUTUR ASLI",
    langEn: "Inggris",
    langEnLevel: "BASIC / PEMULA"
  },
  EN: {
    subtitle: "Competencies",
    title: "Skills & Experience",
    experienceData: [
      {
        id: 0,
        title: "Learning Media Development",
        summary: "Visual & interactive media for learning enthusiasm.",
        desc: "Designing visual and interactive media that sparks the learning enthusiasm of primary school students, transforming complex concepts into visually enjoyable materials."
      },
      {
        id: 1,
        title: "Teaching Materials & Worksheets",
        summary: "Structured modules & critical thinking worksheets.",
        desc: "Designing structured modules and Student Worksheets (LKPD) that encourage critical thinking (HOTS) in a guided and child-friendly manner."
      },
      {
        id: 2,
        title: "AI & Tech Integration",
        summary: "Utilizing Prompt Engineering for educational solutions.",
        desc: "Able to collaborate with Artificial Intelligence (Prompt Engineering) to design and accelerate the creation of digital educational solutions, such as this web portfolio."
      },
      {
        id: 3,
        title: "Tools & Languages",
        summary: "Software and languages supporting productivity:",
        isTools: true
      }
    ],
    langId: "Indonesian",
    langIdLevel: "NATIVE SPEAKER",
    langEn: "English",
    langEnLevel: "BASIC / BEGINNER"
  }
};

export default function Experience() {
  const [expandedId, setExpandedId] = useState<number | null>(0);
  const { language } = useLanguage();
  const t = content[language as keyof typeof content] || content.ID;

  return (
    <section id="experience" className="w-full min-h-screen bg-[#FDFDF1] px-6 py-24 relative z-10 flex flex-col justify-center">
      
      <div className="max-w-4xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4 text-[#43766C]">
            {t.subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1B3022]">
            {t.title}
          </h2>
        </div>

        {/* ACCORDION CONTAINER */}
        <div className="space-y-4">
          {t.experienceData.map((item, index) => {
            const isOpen = expandedId === item.id;

            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                
                className={`relative p-2 border rounded-[2rem] overflow-hidden transition-all duration-300 shadow-xl ${
                  isOpen ? "bg-[#43766C] border-[#43766C] shadow-2xl scale-[1.01]" : "bg-white/50 border-[#1B3022]/10 hover:border-[#43766C]/50"
                }`}
              >
                {/* Tekstur layer saat terbuka */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.30 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-[url('/texture.png')] mix-blend-soft-light pointer-events-none rounded-[2rem]"
                    />
                  )}
                </AnimatePresence>

                {/* Tombol Header Accordion (Buka-Tutup) */}
                <button
                  onClick={() => setExpandedId(isOpen ? null : item.id)}
                  className="relative z-10 w-full flex items-center justify-between p-4 md:px-6 text-left outline-none"
                >
                  <div className="flex flex-col gap-1 pr-4">
                      <h3 className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
                        isOpen ? "text-[#FDFDF1]" : "text-[#1B3022]"
                      }`}>
                        {item.title}
                      </h3>
                      <p className={`text-sm transition-colors duration-300 ${
                        isOpen ? "text-[#FDFDF1]/80" : "text-[#1B3022]/60"
                      }`}>
                        {item.summary}
                      </p>
                  </div>
                  
                  {/* Ikon Panah Putar */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-300 ${
                      isOpen ? "bg-white text-[#43766C]" : "bg-white text-[#1B3022]"
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </motion.div>
                </button>

                {/* Konten yang Buka-Tutup dengan Animasi Smooth */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="relative z-10 px-4 md:px-6 pb-6 pt-2">
                        <p className="text-[#FDFDF1] leading-relaxed text-lg max-w-2xl">
                          {item.desc}
                        </p>

                        {/* ========================================================= */}
                        {/* Jika ini bagian Tools, tampilkan grid BADGES UNIFORM PILL */}
                        {/* ========================================================= */}
                        {item.isTools && (
                          <div className="mt-8 flex flex-wrap gap-3">
                            {/* --- Bagian TOOLS (Ms Office, Canva, Antigravity) --- */}
                            <div className="flex justify-center items-center gap-2 px-5 py-2.5 bg-white text-[#1B3022] rounded-full text-sm font-semibold border border-white/20 shadow-md">
                              <Image src="/ms-office.png" alt="Ms Office" width={20} height={20} className="object-contain" />
                              Ms. Office
                            </div>
                            <div className="flex justify-center items-center gap-2 px-5 py-2.5 bg-white text-[#1B3022] rounded-full text-sm font-semibold border border-white/20 shadow-md">
                              <Image src="/canva.png" alt="Canva" width={20} height={20} className="object-contain" />
                              Canva
                            </div>
                            <div className="flex justify-center items-center gap-2 px-5 py-2.5 bg-white text-[#1B3022] rounded-full text-sm font-semibold border border-white/20 shadow-md">
                              <Image src="/antigravity.png" alt="Antigravity AI" width={20} height={20} className="object-contain" />
                              Antigravity AI
                            </div>
                            
                            {/* --- Jeda Garis Pemisah (Opsional) --- */}
                            <div className="w-full h-[1px] bg-white/10 my-1"></div>

                            {/* --- Bagian LANGUAGES --- */}
                            <div className="flex justify-center items-center gap-3 px-5 py-2.5 bg-white text-[#1B3022] rounded-full text-sm font-semibold border border-white/20 shadow-md">
                                <Image src="/flag-id.png" alt="Indonesia" width={24} height={16} className="object-contain drop-shadow-sm" /> 
                                <span>{t.langId} <span className="font-medium opacity-70 text-xs tracking-wide">({t.langIdLevel})</span></span>
                            </div>
                            <div className="flex justify-center items-center gap-3 px-5 py-2.5 bg-white text-[#1B3022] rounded-full text-sm font-semibold border border-white/20 shadow-md">
                                <Image src="/flag-UK.jpg" alt="English" width={24} height={16} className="object-contain drop-shadow-sm" /> 
                                <span>{t.langEn} <span className="font-medium opacity-70 text-xs tracking-wide">({t.langEnLevel})</span></span>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}