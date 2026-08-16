"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 },
  },
};

export default function MaintenancePage() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6">
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="relative size-[250px] sm:size-[300px] lg:size-[350px]"
      >
        <Image
          src="/images/mainten.gif"
          alt="Under maintenance"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mt-8 text-lg sm:text-xl lg:text-[24px] text-text-primary/70 font-body text-center"
      >
        Halaman ini sedang dalam perbaikan
      </motion.p>
    </main>
  );
}
