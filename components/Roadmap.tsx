"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const content = {
  ID: {
    subtitle: "Jejak Langkah",
    title: "Roadmap Pendidikan",
    roadmapData: [
      {
        id: 1,
        year: "PPG - Sekarang",
        title: "Pendidikan Profesi Guru (PPG) Prajabatan",
        institution: "Universitas Muhammadiyah Indonesia",
        institutionLink: "https://unismabekasi.ac.id",
        location: "Bekasi, Jawa Barat",
        description: "Memperdalam kompetensi pedagogik dan profesional, serta fokus pada pengembangan media pembelajaran interaktif untuk siswa SD di era digital."
      },
      {
        id: 2,
        year: "S1 - 2024",
        title: "S1 Pendidikan Guru Sekolah Dasar (PGSD)",
        institution: "Universitas Negeri Makassar",
        institutionLink: "https://unm.ac.id/",
        location: "Makassar, Sulawesi Selatan",
        description: "Mempelajari fondasi pendidikan, psikologi anak, dan berbagai metode pengajaran kreatif untuk anak usia sekolah dasar."
      }
    ]
  },
  EN: {
    subtitle: "Academic Journey",
    title: "Educational Roadmap",
    roadmapData: [
      {
        id: 1,
        year: "PPG - Present",
        title: "Pre-service Teacher Professional Education (PPG)",
        institution: "Universitas Muhammadiyah Indonesia",
        institutionLink: "https://unismabekasi.ac.id",
        location: "Bekasi, West Java",
        description: "Deepening pedagogical and professional competencies, focusing on developing interactive learning media for primary students in the digital era."
      },
      {
        id: 2,
        year: "Bachelor's - 2024",
        title: "Bachelor of Primary School Teacher Education (PGSD)",
        institution: "Universitas Negeri Makassar",
        institutionLink: "https://unm.ac.id/",
        location: "Makassar, South Sulawesi",
        description: "Studying educational foundations, child psychology, and creative teaching methods for primary school-aged children."
      }
    ]
  }
};

export default function Roadmap() {
  const { language } = useLanguage();
  const t = content[language as keyof typeof content] || content.ID;

  return (
    <section id="roadmap" className="w-full min-h-screen bg-[#FDFDF1] px-6 py-24 relative z-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Judul Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold tracking-[0.4em] uppercase block mb-4 text-[#43766C]">
            {t.subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1B3022]">
            {t.title}
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-[#43766C]/30 ml-3 md:ml-6 space-y-12">
          
          {t.roadmapData.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Titik Timeline (Dot) */}
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#FDFDF1] border-4 border-[#43766C] shadow-[0_0_10px_rgba(67,118,108,0.5)]"></div>
              
              {/* Konten Kotak */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-[#1B3022]/5 hover:shadow-xl transition-shadow duration-300 group">
                
                {/* 1. Tahun Lulus */}
                <span className="inline-block py-1 px-3 rounded-full bg-[#43766C]/10 text-[#43766C] text-xs font-bold tracking-wider mb-4">
                  {item.year}
                </span>
                
                {/* 2. Jurusan */}
                <h3 className="text-2xl md:text-3xl font-bold text-[#1B3022] mb-2 group-hover:text-[#43766C] transition-colors">
                  {item.title}
                </h3>
                
                {/* 3. Nama Kampus (Bisa di-klik, mengarah ke web kampus) */}
                <a 
                  href={item.institutionLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-md font-semibold text-[#43766C] hover:text-[#1B3022] hover:underline mb-4 transition-all"
                >
                  {item.institution}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
                
                {/* 4. Deskripsi Singkat */}
                <p className="text-[#1B3022]/80 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* 5. Lokasi Kampus */}
                <div className="flex items-center gap-2 text-[#1B3022]/50 text-sm font-medium border-t border-[#1B3022]/10 pt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  {item.location}
                </div>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}