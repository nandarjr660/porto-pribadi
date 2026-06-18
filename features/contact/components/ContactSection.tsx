"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import ContactForm from "./ContactForm";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

interface ContactSectionProps {
  className?: string;
  entranceTrigger?: number;
  navEntrance?: boolean;
}

const socialLinks = [
  { name: "Facebook", url: "https://facebook.com/Hasmunandar" },
  { name: "Instagram", url: "https://instagram.com/hsmnandar" },
  { name: "LinkedIn", url: "https://linkedin.com/in/Hasmunandar" },
  { name: "GitHub", url: "https://github.com/nandarjr660" },
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const ContactSection = ({ className, entranceTrigger, navEntrance = false }: ContactSectionProps): React.JSX.Element => {
  const delay = navEntrance ? 1.8 : 0.3;
  const containerDelay = navEntrance ? 1.9 : 0.4;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: containerDelay,
      },
    },
  };

  return (
    <section className={cn("min-h-screen relative overflow-hidden pb-16 lg:pb-20", className)}>
      {/* CONTACT watermark */}
      <motion.span
        key={`${entranceTrigger}-wm`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-[-60px] sm:top-[-80px] lg:top-[-157px] right-0 text-[36px] sm:text-[50px] lg:text-[80px] font-light text-interaction/15 font-heading select-none pointer-events-none"
      >
        CONTACT
      </motion.span>

      <div className="overflow-hidden">
        <div className="w-full px-6 sm:px-8 lg:px-[88px] max-w-[1440px] mx-auto pt-[60px] sm:pt-[80px] lg:pt-[100px]">
          <motion.p
            key={`${entranceTrigger}-title`}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay }}
            className="text-[22px] sm:text-[30px] lg:text-[45px] font-bold text-text-primary font-heading mb-6 lg:mb-10"
          >
            Bagaimana kita bisa terhubung?
          </motion.p>

          <motion.div
            key={`${entranceTrigger}-container`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-10 lg:gap-12"
          >
            {/* Main layout: stacked on mobile, side-by-side on desktop */}
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20">
              {/* Left: description + form */}
              <div className="flex flex-col gap-6 lg:gap-8 flex-1">
                <motion.p
                  variants={itemVariants}
                  className="text-[13px] sm:text-[15px] lg:text-[20px] text-text-primary/80 font-body max-w-[700px] leading-relaxed"
                >
                  Saya percaya bahwa ide-ide terbaik lahir dari kolaborasi. Jika Anda tertarik untuk berdiskusi, berbagi pengalaman, atau membangun inovasi dalam dunia pendidikan dan teknologi pembelajaran, saya akan dengan senang hati menyambutnya.
                </motion.p>

                <motion.div variants={itemVariants}>
                  <ContactForm />
                </motion.div>
              </div>

              {/* Right: social links */}
              <motion.div variants={itemVariants} className="flex flex-col gap-4 lg:gap-6 min-w-[200px] lg:min-w-[250px]">
                <p className="text-[11px] sm:text-xs lg:text-[16px] font-bold text-text-primary/40 font-heading uppercase tracking-widest">
                  Media Sosial
                </p>
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 lg:gap-4"
                  >
                    <span className="text-[18px] sm:text-[22px] lg:text-[32px] font-bold text-text-primary font-heading group-hover:text-interaction transition-colors duration-300">
                      {link.name}
                    </span>
                    <svg
                      className="w-4 h-4 lg:w-5 lg:h-5 text-text-primary/40 group-hover:text-interaction transition-colors duration-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
