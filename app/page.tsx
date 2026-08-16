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

  const Comp: React.ElementType = href ? motion.a : motion.button;
  const compProps = href ? { href } : { onClick };
  return (
    <Comp ref={ref as never} className={className} style={{ x: springX, y: springY }} onMouseMove={handleMouse} onMouseLeave={handleLeave} whileTap={{ scale: 0.95 }} {...compProps} {...props}>
      {children}
    </Comp>
  );
}

const nameChars = "Hasmunandar".split("");

const marqueeWords = [
  "PPG Prajabatan",
  "PGSD",
  "Kurikulum Merdeka",
  "Media Pembelajaran",
  "Teknologi Pendidikan",
];

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
    <section className="min-h-dvh flex flex-col overflow-hidden">
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

      <div className="mt-auto border-t-[3px] border-border bg-surface overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {marqueeWords.map((w) => (
                <span key={w} className="mx-6 font-display text-[14px] font-bold uppercase tracking-widest text-ink flex items-center gap-6">
                  {w}
                  <span className="text-accent">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="border-t-[3px] border-border bg-paper">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">
        <motion.div custom={0.1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] text-muted uppercase tracking-widest">Projek Unggulan / 01</p>
            <h2 className="mt-3 font-display font-bold text-[28px] sm:text-[36px] lg:text-[44px] leading-[0.95] tracking-tight text-ink">Karya yang sedang dikerjakan</h2>
          </div>
          <a href="/projects" className="group inline-flex items-center gap-2 font-display font-semibold text-[14px] tracking-tight text-ink border-[2.5px] border-border px-5 py-2.5 hover:bg-ink hover:text-paper transition-colors duration-150">
            Lihat Semua Projek
            <span className="group-hover:translate-x-1 transition-transform duration-150">→</span>
          </a>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <motion.a href="/projects" custom={0.2} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="group block border-[3px] border-border bg-paper brutalist-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-150">
            <div className="h-2 bg-playful-teal" />
            <div className="p-6 sm:p-8 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted">PPL / 2026</span>
                <span className="text-[20px] text-ink group-hover:translate-x-1 transition-transform duration-150">→</span>
              </div>
              <h3 className="font-display font-bold text-[22px] sm:text-[26px] tracking-tight text-ink">Portofolio PPL Digital</h3>
              <p className="font-body text-[15px] text-muted leading-relaxed">E-portofolio pengalaman Praktik Pengalaman Lapangan di SDN Pengasinan IX — dokumentasi dan refleksi pembelajaran.</p>
            </div>
          </motion.a>

          <motion.a href="/projects" custom={0.3} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="group block border-[3px] border-border bg-paper brutalist-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-150">
            <div className="h-2 bg-playful-coral" />
            <div className="p-6 sm:p-8 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted">MEDIA / 2026</span>
                <span className="text-[20px] text-ink group-hover:translate-x-1 transition-transform duration-150">→</span>
              </div>
              <h3 className="font-display font-bold text-[22px] sm:text-[26px] tracking-tight text-ink">Media Pembelajaran Interaktif</h3>
              <p className="font-body text-[15px] text-muted leading-relaxed">Media belajar interaktif untuk siswa Sekolah Dasar berbasis teknologi pendidikan.</p>
            </div>
          </motion.a>
        </div>

        <motion.div custom={0.4} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t-[3px] border-border pt-8">
          <div>
            <p className="font-mono text-[11px] text-muted uppercase tracking-widest">Kampus</p>
            <p className="mt-2 font-display font-bold text-[24px] sm:text-[28px] tracking-tight text-ink">UNM & UMI</p>
          </div>
          <div>
            <p className="font-mono text-[11px] text-muted uppercase tracking-widest">Projek</p>
            <p className="mt-2 font-display font-bold text-[24px] sm:text-[28px] tracking-tight text-ink">4+ Digital</p>
          </div>
          <div>
            <p className="font-mono text-[11px] text-muted uppercase tracking-widest">Fokus</p>
            <p className="mt-2 font-display font-bold text-[24px] sm:text-[28px] tracking-tight text-ink">Media & Inovasi</p>
          </div>
        </motion.div>
      </div>
    </section>
    </ViewTransition>
  );
};

export default Home;
export { MagneticButton };
