"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image"; 
// 1. Import Hook Bahasa
import { useLanguage } from "../context/LanguageContext"; 

export default function About() {
  // 2. Ambil state language global
  const { language } = useLanguage();

  // 3. Kamus Terjemahan
  const content = {
    ID: {
      badge: "Mengenal Lebih Dekat",
      title: "Tentang Saya",
      p1: "Saya adalah lulusan S1 Pendidikan Guru Sekolah Dasar (PGSD) yang saat ini sedang menempuh program Pendidikan Profesi Guru (PPG). Berdomisili di Bekasi, saya memiliki semangat besar dalam memajukan dunia pendidikan anak usia dasar.",
      p2: "Selain dedikasi di bidang pedagogik, saya juga memiliki ketertarikan mendalam pada teknologi. Saya percaya bahwa integrasi teknologi modern—seperti AI dan Web Development—dapat menciptakan pengalaman belajar yang jauh lebih interaktif, relevan, dan menyenangkan bagi siswa.",
      motto: "Pendidikan tidak merubah dunia, Pendidikan merubah manusia, Manusia merubah dunia",
    },
    EN: {
      badge: "Get to Know Me",
      title: "About Me",
      p1: "I am a graduate of Elementary School Teacher Education (PGSD) currently pursuing the Teacher Professional Education (PPG) program. Based in Bekasi, I am deeply passionate about advancing the world of primary education.",
      p2: "Beyond my dedication to pedagogy, I have a profound interest in technology. I believe that integrating modern technology—such as AI and Web Development—can create learning experiences that are far more interactive, relevant, and enjoyable for students.",
      motto: "Education does not change the world, education changes people, people change the world",
    }
  };

  // Pilih konten berdasarkan bahasa aktif
  const t = language === "ID" ? content.ID : content.EN;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="about" className="w-full min-h-screen bg-[#43766C] px-6 py-24 relative z-10 flex items-center justify-center overflow-hidden border-t border-white/5 shadow-inner">
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-16">

        {/* BAGIAN KIRI: Foto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true, amount: 0.3 }} 
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full md:w-2/5 flex justify-center"
        >
          <div className="w-64 h-[350px] md:w-80 md:h-[450px] lg:w-[340px] lg:h-[500px] bg-[#FDFDF1]/10 rounded-[2.5rem] border border-[#FDFDF1]/10 shadow-2xl relative overflow-hidden group backdrop-blur-sm p-2">
            <div className="w-full h-full bg-[#FDFDF1] rounded-[2rem] relative overflow-hidden group shadow-inner border border-[#1B3022]/10">
                <Image 
                    src="/images/profil.jpg" 
                    alt="Hasmunandar - Profile"
                    fill
                    sizes="(max-width: 768px) 16rem, 20rem" 
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    priority 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </motion.div>

        {/* BAGIAN KANAN: Teks (Sudah Terhubung ke Kamus Bahasa) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} 
          className="w-full md:w-3/5 flex flex-col text-center md:text-left text-[#FDFDF1]"
        >
          {/* Ganti teks manual jadi {t.badge}, {t.title}, dsb. */}
          <motion.span variants={itemVariants} className="text-xs font-bold tracking-[0.4em] uppercase mb-4 text-[#FDFDF1]/60">
            {t.badge}
          </motion.span>

          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6">
            {t.title}
          </motion.h2>

          <motion.div variants={itemVariants} className="w-20 h-1 bg-[#FDFDF1]/30 rounded-full mb-8 mx-auto md:mx-0"></motion.div>

          <motion.p variants={itemVariants} className="text-lg leading-relaxed text-[#FDFDF1]/80 mb-6 max-w-2xl mx-auto md:mx-0">
            {t.p1}
          </motion.p>

          <motion.p variants={itemVariants} className="text-lg leading-relaxed text-[#FDFDF1]/80 mb-10 max-w-2xl mx-auto md:mx-0">
            {t.p2}
          </motion.p>

          {/* Motto */}
          <motion.div variants={itemVariants} className="bg-[#FDFDF1]/10 border border-[#FDFDF1]/20 p-8 rounded-3xl backdrop-blur-sm shadow-xl text-center flex flex-col gap-4 relative overflow-hidden group">
            <span className="absolute -left-5 -top-10 text-[10rem] font-bold text-[#FDFDF1]/5 group-hover:opacity-10 transition-opacity duration-300">“</span>
            <p className="text-white leading-relaxed text-xl italic font-semibold max-w-xl mx-auto relative z-10">
              “ {t.motto} ”
            </p>
            <p className="text-xs text-[#FDFDF1]/70 font-bold tracking-wider uppercase relative z-10">
                - Paulo Freire
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}