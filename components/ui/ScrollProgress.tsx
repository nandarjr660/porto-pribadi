"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const springProgress = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const update = () => {
      const about = document.getElementById("about");
      if (!about) {
        setProgress(0);
        return;
      }
      const rect = about.getBoundingClientRect();
      const viewH = window.innerHeight;
      const sectionH = rect.height;
      const total = sectionH + viewH;
      const scrolled = viewH - rect.top;
      setProgress(Math.min(1, Math.max(0, scrolled / total)));
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent/40 origin-left z-[9999]"
      style={{ scaleX: springProgress }}
    />
  );
}
