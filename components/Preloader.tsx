"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Memeriksa session storage agar preloader hanya muncul sekali
    const hasSeen = sessionStorage.getItem("hasSeenPreloader");
    if (hasSeen) {
      setShow(false);
    } else {
      sessionStorage.setItem("hasSeenPreloader", "true");
    }
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ 
        duration: 0.5, 
        delay: 4.6, // Setelah fase 4 selesai (0.8 + 1.5 + 0.8 + 1.5 = 4.6)
        ease: "easeInOut" 
      }}
      onAnimationComplete={() => setShow(false)}
      className="fixed top-0 left-0 w-screen h-screen z-[9999] bg-[#FDFDF1] flex items-center justify-center overflow-hidden pointer-events-none"
    >
      <div className="relative flex items-center justify-center w-full h-full">
        {/* Teks Indo (Fase 1, 2, dan setengah Fase 3) */}
        <motion.h2
          initial={{ filter: "blur(15px)", scale: 0.8, opacity: 0 }}
          animate={{
            filter: ["blur(15px)", "blur(0px)", "blur(0px)", "blur(10px)"],
            scale: [0.8, 1, 1, 1],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3.1, // Berhenti setelah fase 3 (0.8 + 1.5 + 0.8 = 3.1)
            times: [
              0, 
              0.8 / 3.1, // Selesai Fase 1 masuk ke Fase 2
              2.3 / 3.1, // Selesai Fase 2 masuk ke Fase 3 (crossfade)
              1 // Akhir Fase 3
            ],
            ease: ["easeOut", "linear", "easeOut"],
          }}
          className="absolute text-3xl md:text-4xl text-center text-[#1B3022]"
        >
          Selamat datang di <span className="font-bold text-[#43766C]">portofolio</span> saya
        </motion.h2>

        {/* Teks Inggris (Fase 3 menyilang dan Fase 4) */}
        <motion.h2
          initial={{ filter: "blur(10px)", opacity: 0 }}
          animate={{
            filter: ["blur(10px)", "blur(10px)", "blur(0px)", "blur(0px)"],
            opacity: [0, 0, 1, 1],
          }}
          transition={{
            duration: 4.6, // Tersisa untuk fase 4 (sampai 4.6)
            times: [
              0, 
              2.3 / 4.6, // Mulai dari awal sampai sebelum fade in
              3.1 / 4.6, // Selesai fade in (bersamaan dengan Indo fade out)
              1 // Selesai ditahan selama 1.5s
            ],
            ease: ["linear", "easeOut", "linear"],
          }}
          className="absolute text-3xl md:text-4xl text-center text-[#1B3022]"
        >
          Welcome to my <span className="font-bold text-[#43766C]">portofolio</span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
