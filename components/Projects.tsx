"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom"; // <-- Jurus Teleportasi
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "../context/LanguageContext";

const content = {
  ID: {
    subtitle: "Karya & Kontribusi",
    title: "Featured Projects",
    projectsData: [
      {
        id: 1,
        title: "Web Portofolio PPL",
        subtitle: "SDN Pengasinan IX • Praktik Lapangan",
        desc: "Platform digital yang merangkum seluruh dokumentasi mengajar selama PPL. Menjadi bukti nyata integrasi teknologi dalam pendokumentasian pedagogik.",
        tags: ["Web Portofolio", "Dokumentasi Digital"],
        imageSrc: "/mockup-ppg.png",
        type: "link",
        buttonText: "Kunjungi Web Portofolio",
        details: { url: "https://ppl-hasmunandar.vercel.app/" }
      },
      {
        id: 2,
        title: "Desain Media Ajar & LKPD",
        subtitle: "Pengembangan Perangkat Pembelajaran",
        desc: "Kumpulan media presentasi visual dan LKPD dirancang khusus memantik berpikir kritis (HOTS) siswa, sesuai tahap perkembangan anak usia dasar.",
        tags: ["Canva", "Desain Visual", "HOTS"],
        imageSrc: "/mockup-lkpd.png",
        type: "modal",
        buttonText: "Lihat Detail Media",
        details: {
            images: [
                "https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?q=80&w=1200&auto=format&fit=crop", 
                "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop", 
                "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=1200&auto=format&fit=crop"
            ]
        }
      },
      {
        id: 3,
        title: "E-Portofolio Profesional",
        subtitle: "Web Development & AI Integration",
        desc: "Membangun website portofolio interaktif ini dari nol (Next.js), memanfaatkan kolaborasi AI (Prompt Engineering) untuk merancang UI/UX pendidik profesional.",
        tags: ["Next.js", "AI Prompting"],
        imageSrc: "/mockup-porto.png",
        type: "link",
        buttonText: "Jelajahi Source Code",
        details: { url: "https://github.com/nandarjr660/porto-pribadi" }
      }
    ],
    mockupSpace: "Ruang Untuk Foto / Web Mockup",
    photoWord: "Foto",
    fromWord: "dari"
  },
  EN: {
    subtitle: "Works & Contributions",
    title: "Featured Projects",
    projectsData: [
      {
        id: 1,
        title: "PPL Web Portfolio",
        subtitle: "SDN Pengasinan IX • Field Practice",
        desc: "A digital platform summarizing all teaching documentation during PPL. Serving as tangible evidence of technology integration in pedagogical documentation.",
        tags: ["Web Portfolio", "Digital Documentation"],
        imageSrc: "/mockup-ppg.png",
        type: "link",
        buttonText: "Visit Web Portfolio",
        details: { url: "https://ppl-hasmunandar.vercel.app/" }
      },
      {
        id: 2,
        title: "Learning Media & Worksheet Design",
        subtitle: "Teaching Device Development",
        desc: "A collection of visual presentation media and worksheets specifically designed to spark students' critical thinking (HOTS), suitable for the developmental stage of primary-aged children.",
        tags: ["Canva", "Visual Design", "HOTS"],
        imageSrc: "/mockup-lkpd.png",
        type: "modal",
        buttonText: "View Media Details",
        details: {
            images: [
                "https://images.unsplash.com/photo-1510070112810-d4e9a46d9e91?q=80&w=1200&auto=format&fit=crop", 
                "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop", 
                "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=1200&auto=format&fit=crop"
            ]
        }
      },
      {
        id: 3,
        title: "Professional E-Portfolio",
        subtitle: "Web Development & AI Integration",
        desc: "Building this interactive portfolio website from scratch (Next.js), utilizing AI collaboration (Prompt Engineering) to design the UI/UX for a professional educator.",
        tags: ["Next.js", "AI Prompting"],
        imageSrc: "/mockup-porto.png",
        type: "link",
        buttonText: "Explore Source Code",
        details: { url: "https://github.com/nandarjr660/porto-pribadi" }
      }
    ],
    mockupSpace: "Space for Photo / Web Mockup",
    photoWord: "Photo",
    fromWord: "of"
  }
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // State untuk memastikan window sudah ter-load (syarat pakai Portal di Next.js)
  const [mounted, setMounted] = useState(false);
  const { language } = useLanguage();
  const t = content[language as keyof typeof content] || content.ID;

  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = (project: any) => {
    if (project.type === "modal") {
      setSelectedProject(project);
      setCurrentImageIndex(0);
      document.body.style.overflow = 'hidden'; 
    }
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset'; 
  };

  const nextImage = (e: any) => {
    e.stopPropagation(); 
    setCurrentImageIndex((prev) => (prev + 1) % selectedProject.details.images.length);
  };
  
  const prevImage = (e: any) => {
    e.stopPropagation(); 
    setCurrentImageIndex((prev) => (prev - 1 + selectedProject.details.images.length) % selectedProject.details.images.length);
  };

  return (
    <section id="projects" className="w-full min-h-screen bg-[#1B3022] px-6 py-24 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.4em] uppercase block mb-4 text-[#FDFDF1]/50"
          >
            {t.subtitle}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-[#FDFDF1]"
          >
            {t.title}
          </motion.h2>
        </div>

        {/* List Projects */}
        <div className="space-y-24 md:space-y-32">
          {t.projectsData.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col gap-8 md:gap-16 items-center ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                
                {/* Bagian Gambar */}
                <div className="w-full md:w-1/2">
                  <div className="w-full aspect-video p-2 rounded-[2.5rem] bg-white/5 border border-white/10 shadow-2xl relative group overflow-hidden">
                    <div className="w-full h-full rounded-[2rem] bg-[#FDFDF1] relative overflow-hidden">
                      <Image 
                        src={project.imageSrc} 
                        alt={project.title} 
                        fill 
                        className="object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-500 cursor-pointer"
                        onClick={() => {
                          if (project.type === "link") {
                            window.open(project.details.url, "_blank", "noopener,noreferrer");
                          } else if (project.type === "modal") {
                            openModal(project);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bagian Teks */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <h4 className="text-[#43766C] font-bold text-sm tracking-widest uppercase mb-3">
                    {project.subtitle}
                  </h4>
                  <h3 className="text-3xl md:text-4xl font-bold text-[#FDFDF1] mb-6 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-[#FDFDF1]/70 leading-relaxed text-lg mb-8">
                    {project.desc}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="px-4 py-1.5 bg-[#FDFDF1]/5 border border-[#FDFDF1]/10 rounded-full text-sm text-[#FDFDF1]/90 font-medium hover:bg-[#43766C]/50 transition-colors cursor-default">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Tombol Aksi */}
                  {project.type === "link" && (
                    <a 
                      href={project.details.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-fit flex items-center gap-2 text-[#FDFDF1] font-semibold pb-1 border-b-2 border-[#43766C] hover:pr-4 hover:border-white transition-all duration-300 group outline-none"
                    >
                        <span>{project.buttonText}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </a>
                  )}

                  {project.type === "modal" && (
                    <button 
                      onClick={() => openModal(project)}
                      className="w-fit flex items-center gap-2 text-[#FDFDF1] font-semibold pb-1 border-b-2 border-[#43766C] hover:pr-4 hover:border-white transition-all duration-300 group outline-none"
                    >
                        <span>{project.buttonText}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                  )}
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* ========================================================= */}
      {/* JURUS PORTAL: Melempar Modal langsung ke <body> website  */}
      {/* ========================================================= */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal} 
              // z-[9999] memastikan dia ada di lapisan paling puncak sejagat raya web lu
              className="fixed inset-0 bg-black/95 z-[9999] p-6 md:p-12 flex flex-col justify-center items-center backdrop-blur-md cursor-pointer"
            >
              {/* Tombol Silang */}
              <button 
                onClick={closeModal} 
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors duration-300 p-2 z-[10000]"
              >
                <XMarkIcon className="w-10 h-10" />
              </button>

              <motion.div 
                  onClick={(e) => e.stopPropagation()} 
                  className="max-w-7xl w-full h-[80vh] flex items-center justify-center relative cursor-default"
              >
                  <AnimatePresence mode="wait">
                      <motion.img 
                          key={currentImageIndex} 
                          src={selectedProject.details.images[currentImageIndex]} 
                          alt={`${selectedProject.title} detail ${currentImageIndex + 1}`}
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ duration: 0.4 }}
                          className="max-w-full max-h-full rounded-2xl object-contain shadow-2xl border border-white/10"
                      />
                  </AnimatePresence>
                  
                  {selectedProject.details.images.length > 1 && (
                      <>
                          <button 
                              onClick={prevImage} 
                              className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 p-3 bg-white/5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300 z-[10000]"
                          >
                              <ChevronLeftIcon className="w-8 h-8" />
                          </button>
                          <button 
                              onClick={nextImage} 
                              className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 p-3 bg-white/5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300 z-[10000]"
                          >
                              <ChevronRightIcon className="w-8 h-8" />
                          </button>
                      </>
                  )}
              </motion.div>
              
              <p className="text-white/70 text-sm font-medium tracking-wide mt-8">
                  {selectedProject.title} • {t.photoWord} {currentImageIndex + 1} {t.fromWord} {selectedProject.details.images.length}
              </p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body // <-- Ini yang melempar pop-up lu bebas dari Navbar
      )}

    </section>
  );
}