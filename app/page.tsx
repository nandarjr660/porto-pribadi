"use client";

import { useRef, useCallback, ViewTransition } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick" | "className" | "children">) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.15);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.15);
  }, [x, y]);

  const handleLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  const Comp = href ? motion.a : motion.button;
  const compProps = href ? { href } : { onClick };
  return (
    <Comp ref={ref as React.RefObject<HTMLAnchorElement | HTMLButtonElement>} className={className} style={{ x: springX, y: springY }} onMouseMove={handleMouse} onMouseLeave={handleLeave} whileTap={{ scale: 0.95 }} {...compProps} {...props}>
      {children}
    </Comp>
  );
}

const nameChars = "Hasmunandar".split("");

const charVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.03,
      duration: 0.5,
      ease,
    },
  }),
};

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.3, duration: 0.6, ease },
  },
};

const cornerVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.5 + i * 0.1,
      duration: 0.4,
      type: "spring" as const,
      stiffness: 200,
      damping: 12,
    },
  }),
};

const Home = () => {
  const { scrollYProgress } = useScroll();
  const portraitY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.6]);

  return (
    <ViewTransition enter="fade-in" exit="fade-out" default="none">
    <section className="min-h-dvh relative overflow-hidden">
      <div className="h-[3px] bg-accent w-full" />

      <motion.div style={{ opacity: heroOpacity }} className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 pt-[88px] sm:pt-[100px] lg:pt-[110px] pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-16 items-start">
          {/* Left */}
          <div className="flex flex-col gap-6 sm:gap-8">
            <motion.div custom={0.1} initial="hidden" animate="visible" variants={fadeUp} className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-playful-teal animate-pulse" />
              <span className="font-mono text-[11px] text-muted uppercase tracking-widest">Terbuka untuk kolaborasi</span>
            </motion.div>

            <h1 className="font-display font-bold text-[52px] sm:text-[72px] lg:text-[96px] xl:text-[110px] leading-[0.9] tracking-tight text-ink">
              {nameChars.map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={charVariants}
                  style={{ display: "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>

            <motion.p custom={0.5} initial="hidden" animate="visible" variants={fadeUp} className="font-body text-[16px] sm:text-[18px] lg:text-[20px] text-muted max-w-[480px] leading-relaxed">
              Guru &amp; pendidik yang berfokus pada{" "}
              <span className="text-ink font-semibold">inovasi pembelajaran</span>{" "}
              dan{" "}
              <span className="text-ink font-semibold">teknologi pendidikan</span>{" "}
              untuk sekolah dasar.
            </motion.p>

            <motion.div custom={0.7} initial="hidden" animate="visible" variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <MagneticButton href="/projects" className="inline-flex items-center justify-center px-7 py-3.5 bg-ink text-paper font-display font-semibold text-[14px] tracking-tight brutalist-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-150 cursor-pointer">
                Lihat Projek
              </MagneticButton>
              <MagneticButton href="https://drive.google.com/file/d/1_wOUIG4XkeXgoGzk7TXX1zSceT-FDTxs" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-7 py-3.5 bg-transparent text-ink font-display font-semibold text-[14px] tracking-tight border-[2.5px] border-border hover:bg-surface transition-colors duration-150 cursor-pointer">
                Download CV
                <svg className="ml-2 size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </MagneticButton>
            </motion.div>

            <motion.div custom={0.9} initial="hidden" animate="visible" variants={fadeUp} className="flex flex-wrap gap-2 mt-2">
              {[
                { label: "PPG Prajabatan", dot: "bg-playful-coral", border: "border-playful-coral" },
                { label: "PGSD", dot: "bg-playful-teal", border: "border-playful-teal" },
                { label: "Kurikulum Merdeka", dot: "bg-playful-amber", border: "border-playful-amber" },
                { label: "Media Pembelajaran", dot: "bg-playful-purple", border: "border-playful-purple" },
              ].map((tag, i) => (
                <motion.span
                  key={tag.label}
                  custom={1.0 + i * 0.08}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-[11px] font-mono font-bold uppercase tracking-wider border-[2.5px] bg-paper text-ink brutalist-shadow-sm ${tag.border}`}
                >
                  <span className={`size-2 rounded-full ${tag.dot}`} />
                  {tag.label}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Right — Portrait + Parallax */}
          <div className="relative flex justify-center lg:justify-end">
            <motion.div initial="hidden" animate="visible" variants={scaleIn} className="relative">
              <motion.div custom={0} initial="hidden" animate="visible" variants={cornerVariants} className="absolute -top-3 -left-3 w-6 h-6 border-t-[3px] border-l-[3px] border-accent" />
              <motion.div custom={1} initial="hidden" animate="visible" variants={cornerVariants} className="absolute -bottom-3 -right-3 w-6 h-6 border-b-[3px] border-r-[3px] border-accent" />

              <motion.div style={{ y: portraitY }} className="relative w-[280px] h-[340px] sm:w-[320px] sm:h-[380px] lg:w-[360px] lg:h-[420px] border-[3px] border-border bg-surface overflow-hidden">
                <Image src="/images/potrait.webp" alt="Hasmunandar" fill className="object-cover" priority sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 400px" />
              </motion.div>

              <motion.div custom={0.9} initial="hidden" animate="visible" variants={fadeUp} className="absolute -bottom-4 -left-6 sm:-left-8 bg-playful-coral text-ink px-4 py-2 font-display font-bold text-[13px] tracking-tight brutalist-shadow-sm">
                Guru Masa Depan
                <svg className="size-3 ml-1 inline-block" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 18.27L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z"/></svg>
              </motion.div>

              <motion.div custom={1.0} initial="hidden" animate="visible" variants={fadeUp} className="absolute -top-4 -right-6 sm:-right-8 bg-ink text-paper px-3 py-2 font-mono font-bold text-[13px]">
                #01
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-border" />
    </section>
    </ViewTransition>
  );
};

export default Home;
export { MagneticButton };
