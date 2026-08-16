"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Tentang" },
  { href: "/projects", label: "Projek" },
  { href: "/contact", label: "Kontak" },
];

const socialLinks = [
  { name: "Facebook", url: "https://facebook.com/Hasmunandar" },
  { name: "Instagram", url: "https://instagram.com/hsmnandar" },
  { name: "LinkedIn", url: "https://linkedin.com/in/Hasmunandar" },
  { name: "GitHub", url: "https://github.com/nandarjr660" },
];

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer
      className="bg-ink text-paper"
      style={{ borderTop: "3px solid var(--color-border)" }}
    >
      {/* Marquee */}
      <div className="overflow-hidden py-4 border-b border-paper/10">
        <div className="animate-marquee whitespace-nowrap flex">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="font-display font-bold text-[14px] tracking-widest uppercase text-paper/20 mx-8"
            >
              Guru · Pendidikan · Teknologi · Pembelajaran · Inovasi · Kreatif ·
            </span>
          ))}
        </div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 py-10 sm:py-12"
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
          {/* Left — Brand */}
          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            <Link href="/" className="font-display font-bold text-[28px] text-paper tracking-tight">
              HSMN<span className="text-accent">.</span>
            </Link>
            <p className="font-body text-[14px] text-paper/50 max-w-[300px] leading-relaxed">
              Guru profesional yang berfokus pada inovasi pembelajaran dan teknologi pendidikan.
            </p>
          </motion.div>

          {/* Middle — Nav */}
          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <p className="font-mono text-[10px] text-paper/30 uppercase tracking-widest mb-2">
              Navigasi
            </p>
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-display text-[15px] transition-colors",
                  pathname === link.href
                    ? "text-accent"
                    : "text-paper/60 hover:text-paper"
                )}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>

          {/* Right — Social */}
          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <p className="font-mono text-[10px] text-paper/30 uppercase tracking-widest mb-2">
              Sosial
            </p>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-[15px] text-paper/60 hover:text-paper transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div variants={fadeUp} className="mt-10 pt-6 border-t border-paper/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-paper/30">
            © 2025 Hasmunandar. Dibuat dengan hati.
          </p>
          <p className="font-mono text-[11px] text-paper/30">
            Bandung, Indonesia
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
