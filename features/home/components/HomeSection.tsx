"use client";

import { useRef } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import MagneticButton from "@/components/ui/MagneticButton";
import SocialLinks from "@/components/ui/SocialLinks";
import { cn } from "@/lib/utils";

interface HomeSectionProps {
  className?: string;
  entranceTrigger?: number;
  navEntrance?: boolean;
}

const HomeSection = ({ className, entranceTrigger, navEntrance = false }: HomeSectionProps): React.JSX.Element => {
  const portraitRef = useRef<HTMLDivElement>(null);

  const delay = navEntrance ? 1.8 : 0.2;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: delay,
      },
    },
  };

  const slideFromRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: delay },
    },
  };

  const childVariant = (xFrom: number): Variants => ({
    hidden: { opacity: 0, x: xFrom },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    },
  });

  return (
    <section
      className={cn("min-h-dvh flex flex-col relative overflow-hidden pt-[56px] sm:pt-[70px]", className)}
    >
      <div className="flex-1 flex items-center py-6 sm:py-10 lg:py-0">
        <div className="w-full px-6 sm:px-8 lg:px-[88px] max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">

            {/* Left Content */}
            <motion.div
              key={`${entranceTrigger}-left`}
              className="flex flex-col gap-5 lg:gap-6 order-2 lg:order-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Welcome Text */}
              <motion.p
                className="text-[15px] sm:text-lg lg:text-[30px] font-bold text-text-primary leading-tight font-body text-pretty"
                style={{ opacity: 0 }}
                variants={childVariant(-30)}
              >
                Hi, selamat datang
              </motion.p>

              {/* Main Title */}
              <motion.h1
                className="text-[44px] xs:text-[52px] sm:text-[76px] md:text-[88px] lg:text-[128px] font-bold text-text-primary leading-[0.88] tracking-tight font-heading text-balance"
                style={{ opacity: 0 }}
                variants={childVariant(-40)}
              >
                PORTOFOLIO
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-[13px] sm:text-[15px] lg:text-[16px] text-text-primary/80 leading-relaxed font-body text-pretty max-w-[560px]"
                style={{ opacity: 0 }}
                variants={childVariant(-30)}
              >
                Halo! Saya <span className="font-bold">Nandar</span>, Mahasiswa Program Pendidikan Profesi Guru (PPG). Portfolio ini berisi perjalanan belajar, pengalaman praktik, dan karya dalam pengembangan kompetensi sebagai calon pendidik.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex items-center gap-4 flex-wrap"
                style={{ opacity: 0 }}
                variants={childVariant(-30)}
              >
                <MagneticButton href="#project" variant="filled">
                  Lihat Karya
                </MagneticButton>
                <MagneticButton href="https://drive.google.com/file/d/1_wOUIG4XkeXgoGzk7TXX1zSceT-FDTxs/view?usp=sharing" variant="outlined">
                  Unduh CV
                </MagneticButton>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex flex-col gap-2 sm:gap-3 pt-2 sm:pt-3 lg:pt-[54px]"
                style={{ opacity: 0 }}
                variants={childVariant(-30)}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <p className="text-[12px] sm:text-sm lg:text-[16px] text-text-primary/70 text-pretty whitespace-nowrap">Mari Terhubung</p>
                  <div className="h-[2px] w-[50px] sm:w-[85px] bg-[#2A3E4B]" />
                </div>
                <SocialLinks />
              </motion.div>
            </motion.div>

            {/* Right - Portrait */}
            <motion.div
              key={`${entranceTrigger}-right`}
              className="order-1 lg:order-2 flex justify-center lg:justify-end"
              style={{ opacity: 0 }}
              variants={slideFromRight}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                ref={portraitRef}
                className="relative w-[170px] h-[235px] xs:w-[210px] xs:h-[290px] sm:w-[285px] sm:h-[395px] md:w-[340px] md:h-[470px] lg:w-[435px] lg:h-[580px] rounded-[24px] xs:rounded-[28px] sm:rounded-[32px] lg:rounded-[50px] overflow-hidden cursor-pointer"
                whileHover="hover"
                initial="rest"
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.02 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Image
                  src="/images/potrait.webp"
                  alt="Hasmunandar Portrait"
                  fill
                  sizes="(max-width: 640px) 210px, (max-width: 768px) 285px, (max-width: 1024px) 340px, 435px"
                  className="object-cover"
                  priority
                />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
