"use client";

import { useRef, ViewTransition } from "react";
import Image from "next/image";
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
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardSlide: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const tagSlide: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease },
  },
};

const projects = [
  {
    id: "01",
    title: "Portofolio PPL Digital",
    desc: "Website portofolio yang dikembangkan untuk mendokumentasikan kegiatan Praktik Pengalaman Lapangan (PPL), perangkat pembelajaran, refleksi mengajar, dan proses pengembangan kompetensi sebagai calon guru profesional.",
    url: "https://ppl-hasmunandar.vercel.app/",
    tags: ["PPL", "Refleksi", "Perangkat Pembelajaran"],
    color: "bg-playful-coral",
    image: "/images/project01.webp",
  },
  {
    id: "02",
    title: "Media Pembelajaran Interaktif",
    desc: "Media pembelajaran berbasis web yang dirancang untuk mendukung proses belajar siswa sekolah dasar melalui pengalaman belajar yang interaktif, visual, dan mudah digunakan.",
    url: "https://wheelduc.vercel.app/",
    tags: ["Media Pembelajaran", "Interaktif", "Web"],
    color: "bg-playful-teal",
    image: "/images/project02.webp",
  },
];

const Projects = () => {
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

  return (
    <ViewTransition enter="fade-in" exit="fade-out" default="none">
    <section ref={sectionRef} className="min-h-dvh relative overflow-hidden">
      <div className="h-[3px] bg-playful-purple w-full" />

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
              <span className="font-mono text-[11px] text-muted uppercase tracking-widest">03</span>
              <div className="h-[1.5px] w-12 bg-border" />
            </motion.div>
            <motion.h1
              variants={fadeUp}
              custom={0.1}
              className="font-display font-bold text-[36px] sm:text-[48px] lg:text-[64px] leading-[0.95] tracking-tight text-ink"
            >
              Projek
              <br />
              <span className="text-playful-purple">Saya</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="font-body text-[15px] sm:text-[16px] text-muted mt-4 max-w-[500px] leading-relaxed"
            >
              Beberapa projek yang telah saya kerjakan dalam pengembangan media
              pembelajaran dan teknologi pendidikan.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Projects */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col gap-12 sm:gap-16"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} shouldReduceMotion={shouldReduceMotion} />
          ))}
        </motion.div>
      </div>
    </section>
    </ViewTransition>
  );
};

function ProjectCard({ project, shouldReduceMotion }: { project: typeof projects[0]; shouldReduceMotion: boolean | null }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduce = !!shouldReduceMotion;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Thumbnail parallax — moves up slower than scroll
  const thumbnailY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 40, reduce ? 0 : -40]);
  // Content slides in from right on scroll
  const contentX = useTransform(scrollYProgress, [0, 0.3, 0.6], [reduce ? 0 : 30, 0, 0]);

  return (
    <motion.div
      ref={cardRef}
      variants={cardSlide}
      className="group grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 lg:gap-10 items-start"
    >
      {/* Thumbnail — scroll parallax */}
      <motion.div
        style={{ y: thumbnailY }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative border-[3px] border-border bg-surface overflow-hidden brutalist-shadow cursor-pointer"
      >
        <Image
          src={project.image}
          alt={project.title}
          width={1448}
          height={1086}
          className="w-full h-[220px] sm:h-[260px] object-cover"
        />
        <div className="absolute top-0 left-0 bg-ink text-paper px-3 py-1.5 font-mono font-bold text-[13px]">
          #{project.id}
        </div>
      </motion.div>

      {/* Content — scroll-linked slide */}
      <motion.div style={{ x: contentX }} className="flex flex-col gap-4">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <motion.span
              key={tag}
              variants={tagSlide}
              className="inline-flex items-center px-3 py-1.5 bg-surface border border-border text-[11px] font-mono text-muted hover:border-accent hover:text-accent transition-colors cursor-pointer"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
        <h2 className="font-display font-bold text-[24px] sm:text-[28px] lg:text-[32px] tracking-tight text-ink leading-tight">
          {project.title}
        </h2>
        <p className="font-body text-[14px] sm:text-[15px] text-muted leading-[1.65] max-w-[600px]">
          {project.desc}
        </p>
        <div className="flex items-center gap-4 mt-2">
          <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 2, y: 2 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-paper font-display font-semibold text-[13px] tracking-tight brutalist-shadow-sm hover:shadow-none transition-shadow duration-150 cursor-pointer"
          >
            Kunjungi
            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" /><path d="M7 7h10v10" />
            </svg>
          </motion.a>
          <span className={`w-2.5 h-2.5 rounded-full ${project.color}`} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Projects;
