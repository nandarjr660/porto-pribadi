"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  
  // Menggunakan useSpring untuk membuat pergerakan animasi scroll lebih kenyal dan halus
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[#43766C] z-[9999] origin-left"
      style={{ scaleX }}
    />
  );
}
