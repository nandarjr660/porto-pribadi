"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

interface ProjectSectionProps {
  className?: string;
  entranceTrigger?: number;
  navEntrance?: boolean;
}

const ProjectSection = ({ className, navEntrance = false }: ProjectSectionProps): React.JSX.Element => {
  const delay = navEntrance ? 1.8 : 0.3;
  const containerDelay = navEntrance ? 1.9 : 0.4;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: containerDelay,
      },
    },
  };

  const projects = [
    {
      id: 1,
      title: "Portofolio PPL Digital",
      desc: "Website portofolio yang dikembangkan untuk mendokumentasikan kegiatan Praktik Pengalaman Lapangan (PPL), perangkat pembelajaran, refleksi mengajar, dan proses pengembangan kompetensi sebagai calon guru profesional.",
    },
    {
      id: 2,
      title: "Media Pembelajaran Interaktif",
      desc: "Media pembelajaran berbasis web yang dirancang untuk mendukung proses belajar siswa sekolah dasar melalui pengalaman belajar yang interaktif, visual, dan mudah digunakan.",
    },
  ];

  return (
    <section className={cn("min-h-screen relative overflow-hidden", className)}>
      {/* PROJECT watermark */}
      <span className="absolute top-[-60px] sm:top-[-80px] lg:top-[-157px] right-0 text-[36px] sm:text-[50px] lg:text-[80px] font-light text-interaction/15 font-heading select-none pointer-events-none">
        PROJECT
      </span>

      <div className="overflow-hidden">
        <div className="w-full px-6 sm:px-8 lg:px-[88px] max-w-[1440px] mx-auto pt-[60px] sm:pt-[80px] lg:pt-[100px]">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay }}
            className="text-[22px] sm:text-[30px] lg:text-[45px] font-bold text-text-primary font-heading mb-6 lg:mb-10"
          >
            Apa yang telah saya kerjakan?
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="flex flex-col gap-10 lg:gap-12"
          >
            {projects.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8 lg:gap-12"
              >
                {/* Thumbnail */}
                <div className="w-full sm:w-[240px] lg:w-[411px] h-[200px] sm:h-[210px] lg:h-[294px] shrink-0 bg-text-primary/10 rounded-xl flex items-center justify-center">
                  <span className="text-text-primary/30 font-body text-sm">
                    Placeholder {item.id}
                  </span>
                </div>

                {/* Text */}
                <div className="flex flex-col flex-1 gap-2 sm:h-auto lg:h-[294px]">
                  <span
                    className="font-heading font-bold text-[36px] sm:text-[48px] lg:text-[80px] leading-none"
                    style={{ color: "#FEAE96", opacity: 0.2 }}
                  >
                    0{item.id}
                  </span>
                  <p
                    className="font-heading font-bold text-[17px] sm:text-[22px] lg:text-[35px] -mt-1 lg:-mt-5"
                    style={{ color: "#013237" }}
                  >
                    {item.title}
                  </p>
                  <p className="font-body text-[13px] sm:text-[15px] lg:text-[20px] text-text-primary/80 leading-relaxed">
                    {item.desc}
                  </p>
                  <p className="font-body text-[13px] sm:text-[15px] lg:text-[20px] text-text-primary/60 mt-auto pt-3 sm:pt-4">
                    Ke halaman{" "}
                    <svg
                      className="inline-block -rotate-45 ml-1"
                      width="18"
                      height="18"
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
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
