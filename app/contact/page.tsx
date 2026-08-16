"use client";

import { useRef, ViewTransition } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from "framer-motion";
import ContactForm from "@/features/contact/components/ContactForm";

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
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease },
  },
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

const socialLinks = [
  { name: "Facebook", url: "https://facebook.com/Hasmunandar" },
  { name: "Instagram", url: "https://instagram.com/hsmnandar" },
  { name: "LinkedIn", url: "https://linkedin.com/in/Hasmunandar" },
  { name: "GitHub", url: "https://github.com/nandarjr660" },
];

const Contact = () => {
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
      <div className="h-[3px] bg-playful-amber w-full" />

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
              <span className="font-mono text-[11px] text-muted uppercase tracking-widest">04</span>
              <div className="h-[1.5px] w-12 bg-border" />
            </motion.div>
            <motion.h1
              variants={fadeUp}
              custom={0.1}
              className="font-display font-bold text-[36px] sm:text-[48px] lg:text-[64px] leading-[0.95] tracking-tight text-ink"
            >
              Hubungi
              <br />
              <span className="text-playful-amber">Saya</span>
            </motion.h1>
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_350px] gap-10 lg:gap-12">
          {/* Left — Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={slideUp}
          >
            <div className="flex flex-col gap-6">
              <p className="font-body text-[15px] sm:text-[16px] text-muted max-w-[600px] leading-relaxed">
                Saya terbuka untuk diskusi, kolaborasi, atau sekadar ngobrol tentang
                pendidikan dan teknologi pembelajaran. Kirim pesan dan saya akan
                merespon sesegera mungkin.
              </p>
              <ContactForm />
            </div>
          </motion.div>

          {/* Divider */}
          <div className="hidden lg:block bg-border" />

          {/* Right — Social */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-4"
          >
            <motion.p variants={slideRight} className="font-mono text-[10px] text-muted uppercase tracking-widest mb-2">Media Sosial</motion.p>
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={slideRight}
                whileHover={{ x: 4 }}
                className="group flex items-center justify-between py-3 border-b-[1.5px] border-border hover:border-accent transition-colors cursor-pointer w-full"
              >
                <span className="font-display font-bold text-[18px] sm:text-[20px] text-ink group-hover:text-accent transition-colors tracking-tight">
                  {link.name}
                </span>
                <svg className="size-4 text-muted group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                </svg>
              </motion.a>
            ))}

            <motion.div variants={slideRight} className="mt-4 bg-playful-amber/10 border-[2px] border-playful-amber/30 px-4 py-3">
              <p className="font-mono text-[11px] text-playful-amber font-medium">
                <svg className="size-3 mr-1.5 inline-block" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 18.27L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z"/></svg>
                Biasanya merespon dalam 24 jam
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
    </ViewTransition>
  );
};

export default Contact;
