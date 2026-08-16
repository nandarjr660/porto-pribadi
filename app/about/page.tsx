"use client";

import { useRef, ViewTransition } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease },
  }),
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const chipPop: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease },
  },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease },
  },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease },
  },
};

const dotPop: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, type: "spring", stiffness: 300, damping: 15 },
  },
};

const About = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-linked parallax for header
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -80]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const headerScale = useTransform(scrollYProgress, [0, 0.5], [1, shouldReduceMotion ? 1 : 0.95]);

  const skills = [
    { name: "Media Pembelajaran", color: "bg-playful-coral", border: "border-playful-coral" },
    { name: "Kurikulum Merdeka", color: "bg-playful-teal", border: "border-playful-teal" },
    { name: "Teknologi Pendidikan", color: "bg-playful-purple", border: "border-playful-purple" },
    { name: "Penelitian Tindakan Kelas", color: "bg-playful-amber", border: "border-playful-amber" },
    { name: "Desain Instruksional", color: "bg-accent", border: "border-accent" },
    { name: "Google Workspace", color: "bg-playful-teal", border: "border-playful-teal" },
  ];

  const timeline = [
    {
      year: "2024–Sekarang",
      title: "PPG Prajabatan",
      desc: "Program Pendidikan Profesi Guru untuk menjadi guru profesional yang kompeten dan berkualitas.",
      color: "bg-playful-coral",
    },
    {
      year: "2020–2024",
      title: "PGSD – Universitas Muhammadiyah Indonesia",
      desc: "Pendidikan Guru Sekolah Dasar, fokus pada metodologi pengajaran dan pengembangan kurikulum.",
      color: "bg-playful-teal",
    },
    {
      year: "Sertifikasi",
      title: "Google for Education Trainer",
      desc: "Sertifikasi resmi dari Google untuk pelatihan dan implementasi teknologi pendidikan.",
      color: "bg-playful-purple",
    },
  ];

  return (
    <ViewTransition enter="fade-in" exit="fade-out" default="none">
    <section ref={sectionRef} className="min-h-dvh relative overflow-hidden">
      <div className="h-[3px] bg-playful-teal w-full" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 pt-[88px] sm:pt-[100px] lg:pt-[110px] pb-16 sm:pb-20">
        {/* Page header — scroll parallax */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity, scale: headerScale }}
          className="mb-12 sm:mb-16"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-baseline gap-3 mb-4">
              <span className="font-mono text-[11px] text-muted uppercase tracking-widest">02</span>
              <div className="h-[1.5px] w-12 bg-border" />
            </motion.div>
            <motion.h1
              variants={fadeUp}
              custom={0.1}
              className="font-display font-bold text-[36px] sm:text-[48px] lg:text-[64px] leading-[0.95] tracking-tight text-ink"
            >
              Tentang
              <br />
              <span className="text-accent">Saya</span>
            </motion.h1>
          </motion.div>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-10 lg:gap-12">
          {/* Left — Story */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideLeft}
            >
              <div className="bg-surface border-[2.5px] border-border p-6 sm:p-8 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none brutalist-shadow transition-all duration-200">
                <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-4">Cerita Singkat</p>
                <p className="font-body text-[15px] sm:text-[16px] text-ink leading-[1.65]">
                  Saya adalah mahasiswa <strong>PPG Prajabatan</strong> dengan latar belakang{" "}
                  <strong>PGSD</strong> yang percaya bahwa pendidikan dapat berubah melalui
                  pendekatan kreatif dan pemanfaatan teknologi. Fokus saya adalah mengembangkan{" "}
                  <strong>media pembelajaran interaktif</strong> yang membuat proses belajar
                  menjadi lebih menyenangkan dan efektif bagi siswa sekolah dasar.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideLeft}
              transition={{ delay: 0.15 }}
            >
              <div className="bg-ink text-paper border-[2.5px] border-ink p-6 sm:p-8">
                <p className="font-mono text-[10px] text-paper/40 uppercase tracking-widest mb-4">Visi</p>
                <p className="font-display font-bold text-[20px] sm:text-[24px] leading-snug tracking-tight">
                  &quot;Menciptakan pembelajaran yang tidak hanya transfer ilmu,
                  tetapi menginspirasi rasa ingin tahu dan kreativitas siswa.&quot;
                </p>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block bg-border" />

          {/* Right — Skills + Timeline */}
          <div className="flex flex-col gap-10">
            {/* Skills */}
            <div>
              <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-4">Keahlian</p>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="flex flex-wrap gap-2.5"
              >
                {skills.map((skill) => (
                  <motion.span
                    key={skill.name}
                    variants={chipPop}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 bg-paper border-[2px] ${skill.border} font-display font-medium text-[13px] text-ink brutalist-shadow-sm hover:shadow-none transition-all duration-150 cursor-pointer min-h-[44px]`}
                  >
                    <span className={`w-2 h-2 rounded-full ${skill.color}`} />
                    {skill.name}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            {/* Timeline */}
            <div>
              <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-6">Perjalanan</p>
              <div className="flex flex-col gap-6">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={slideRight}
                    transition={{ delay: i * 0.12 }}
                    className="flex gap-4"
                  >
                    <div className="flex flex-col items-center pt-1.5">
                      <motion.div
                        variants={dotPop}
                        className={`w-3 h-3 rounded-full ${item.color}`}
                      />
                      {i < timeline.length - 1 && <div className="w-[1.5px] h-full bg-border mt-2" />}
                    </div>
                    <div className="flex flex-col gap-1 pb-6">
                      <span className="font-mono text-[11px] text-muted">{item.year}</span>
                      <h3 className="font-display font-bold text-[16px] sm:text-[18px] text-ink tracking-tight">{item.title}</h3>
                      <p className="font-body text-[14px] text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </ViewTransition>
  );
};

export default About;
