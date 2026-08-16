"use client";

import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    restDelta: 0.001,
  });

  const badgeX = useTransform(progress, (v) => `${v * 96}vw`);

  const [percent, setPercent] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPercent(Math.round(v * 100));
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
      <motion.div
        className="h-[2px] bg-accent origin-left"
        style={{ scaleX: progress }}
      />
      <motion.div
        className="absolute left-0 top-[3px] -translate-x-1/2 bg-ink text-paper font-mono text-[9px] font-bold px-1.5 py-px rounded-full shadow-md whitespace-nowrap leading-tight"
        style={{ x: badgeX }}
      >
        {percent}%
      </motion.div>
    </div>
  );
}
