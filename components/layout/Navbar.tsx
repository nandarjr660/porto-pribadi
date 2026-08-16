"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", num: "01" },
  { href: "/about", label: "Tentang", num: "02" },
  { href: "/projects", label: "Projek", num: "03" },
  { href: "/contact", label: "Kontak", num: "04" },
];

const overlayVariants = {
  hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: {
    opacity: 0,
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.25, ease: [0.55, 0, 1, 0.45] as const },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: -30, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.1 + i * 0.06,
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: 20,
    filter: "blur(4px)",
    transition: {
      delay: i * 0.03,
      duration: 0.2,
    },
  }),
};

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsOpen(false));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    // Navigate after exit animation starts
    setTimeout(() => {
      router.push(href);
    }, 100);
  };

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          height: scrolled ? 56 : 72,
          borderBottomWidth: scrolled ? 2 : 3,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[var(--z-nav)] border-border",
          scrolled
            ? "bg-paper/80 backdrop-blur-lg shadow-[0_1px_3px_rgba(26,26,26,0.06)]"
            : "bg-paper"
        )}
        style={{
          borderBottomStyle: "solid",
          borderBottomColor: "var(--color-border)",
          boxSizing: "content-box",
          paddingTop: "env(safe-area-inset-top)",
        }}
        role="navigation"
        aria-label="Navigasi utama"
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 flex items-center justify-between h-full">
          {/* Wordmark */}
          <Link
            href="/"
            className="font-display font-bold text-[22px] sm:text-[26px] text-ink tracking-tight hover:text-accent transition-colors"
            aria-label="Beranda"
          >
            HSMN<span className="text-accent">.</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative font-display font-medium text-[15px] tracking-tight transition-colors py-1",
                    isActive ? "text-accent-strong" : "text-ink hover:text-accent"
                  )}
                >
                  <span className="font-mono text-[10px] text-muted mr-1.5 opacity-50 group-hover:opacity-100 transition-opacity">
                    {link.num}
                  </span>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-0.5 left-0 right-0 h-[2.5px] bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 -mr-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-[22px] h-[2.5px] bg-ink block origin-center"
            />
            <motion.span
              animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="w-[22px] h-[2.5px] bg-ink block"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-[22px] h-[2.5px] bg-ink block origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Overlay — smooth clipPath reveal */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[var(--z-overlay)] bg-paper flex flex-col md:hidden overflow-y-auto overscroll-behavior:contain"
            style={{ top: "64px" }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi"
          >
            <div className="flex flex-col px-6 pt-8 gap-1">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={cn(
                        "flex items-baseline gap-3 py-4 font-display font-bold text-[32px] tracking-tight transition-colors w-full text-left cursor-pointer",
                        isActive
                          ? "text-accent"
                          : "text-ink hover:text-accent"
                      )}
                    >
                      <span className="font-mono text-[13px] text-muted font-normal">
                        {link.num}
                      </span>
                      {link.label}
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="mt-auto px-6 pb-8"
            >
              <div className="h-[2px] bg-border mb-6" />
              <p className="font-mono text-[11px] text-muted uppercase tracking-widest">
                Hsmnandar © 2025
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
