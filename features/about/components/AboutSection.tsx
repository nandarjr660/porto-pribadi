"use client";

import Image from "next/image";
import { motion, useAnimation, AnimatePresence, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface AboutSectionProps {
  entranceTrigger?: number;
  navEntrance?: boolean;
}

const makeSlideFromLeft = (delay: number) => ({
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay },
  },
});

const makeSlideFromRight = (delay: number) => ({
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay },
  },
});

const makeFadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay },
  },
});

const makeScaleIn = (delay: number) => ({
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay },
  },
});

const blurIn = {
  opacity: 1,
  filter: "blur(0px)",
  transition: { duration: 0.4, ease: "easeOut" as const },
};

const blurOut = {
  opacity: 0,
  filter: "blur(4px)",
};

const AboutSection = ({ navEntrance = false }: AboutSectionProps): React.JSX.Element => {
  // Delay 1.8s saat masuk via navbar (menunggu animasi close navbar selesai sepenuhnya + 1s delay)
  const introDelay = navEntrance
    ? { heading: 1.8, main: 1.9, quote: 2.1 }
    : { heading: 0.3, main: 0.4, quote: 0.6 };

  const slideFromLeft = makeSlideFromLeft(introDelay.main);
  const slideFromRight = makeSlideFromRight(introDelay.main);
  const fadeUp = makeFadeUp(introDelay.heading);
  const scaleIn = makeScaleIn(introDelay.quote);
  const roadmapRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: roadmapRef,
    offset: ["start end", "center 30%"]
  });

  const clipPercent = useTransform(scrollYProgress, [0.15, 0.85], [100, 0]);
  const clipPath = useMotionTemplate`inset(0% 0% ${clipPercent}% 0%)`;

  const card1Controls = useAnimation();
  const card2Controls = useAnimation();
  const c1Item1 = useAnimation();
  const c1Item2 = useAnimation();
  const c1Item3 = useAnimation();
  const c1Item4 = useAnimation();

  const c2Item1 = useAnimation();
  const c2Item2 = useAnimation();
  const c2Item3 = useAnimation();
  const c2Item4 = useAnimation();

  const [expandedSkill, setExpandedSkill] = useState<number | null>(null);

  // Dynamic Roadmap Scale
  const [scale, setScale] = useState(1);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateScale = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        setIsDesktop(width > 1024);
        if (width > 1024) {
          const contentWidth = Math.min(1264, width - 176);
          setScale(contentWidth / 1264);
        } else {
          setScale(1);
        }
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    let active = true;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (!active) return;

      // Card 1 triggers when progress passes 0.35
      if (latest > 0.35) {
        card1Controls.start({
          clipPath: "inset(0% 0% 0% 0%)",
          transition: { duration: 0.7, ease: "easeInOut" },
        });
        c1Item1.start({ ...blurIn, transition: { ...blurIn.transition, delay: 0.2 } });
        c1Item2.start({ ...blurIn, transition: { ...blurIn.transition, delay: 0.4 } });
        c1Item3.start({ ...blurIn, transition: { ...blurIn.transition, delay: 0.6 } });
        c1Item4.start({ ...blurIn, transition: { ...blurIn.transition, delay: 0.8 } });
      } else {
        card1Controls.start({
          clipPath: "inset(0% 100% 0% 0%)",
          transition: { duration: 0.4, ease: "easeInOut" },
        });
        c1Item1.set(blurOut);
        c1Item2.set(blurOut);
        c1Item3.set(blurOut);
        c1Item4.set(blurOut);
      }

      // Card 2 triggers when progress passes 0.75
      if (latest > 0.75) {
        card2Controls.start({
          clipPath: "inset(0% 0% 0% 0%)",
          transition: { duration: 0.7, ease: "easeInOut" },
        });
        c2Item1.start({ ...blurIn, transition: { ...blurIn.transition, delay: 0.2 } });
        c2Item2.start({ ...blurIn, transition: { ...blurIn.transition, delay: 0.4 } });
        c2Item3.start({ ...blurIn, transition: { ...blurIn.transition, delay: 0.6 } });
        c2Item4.start({ ...blurIn, transition: { ...blurIn.transition, delay: 0.8 } });
      } else {
        card2Controls.start({
          clipPath: "inset(0% 0% 0% 100%)",
          transition: { duration: 0.4, ease: "easeInOut" },
        });
        c2Item1.set(blurOut);
        c2Item2.set(blurOut);
        c2Item3.set(blurOut);
        c2Item4.set(blurOut);
      }
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [scrollYProgress, card1Controls, card2Controls, c1Item1, c1Item2, c1Item3, c1Item4, c2Item1, c2Item2, c2Item3, c2Item4]);

  return (
    <section id="about" className="bg-background pt-[56px] sm:pt-[70px]">
      {/* About Introduction */}
      <div className="min-h-[600px] lg:min-h-[900px] flex items-center py-12 lg:py-0">
        <div className="w-full px-6 sm:px-8 lg:px-[88px] max-w-[1440px] mx-auto">
          {/* Siapa Saya */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="text-[22px] sm:text-[30px] lg:text-[45px] font-bold text-text-primary font-heading mb-6 lg:mb-10"
          >
            Siapa saya?
          </motion.p>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-start">
            {/* Left - Text Content */}
            <motion.div
              variants={slideFromLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="flex flex-col gap-4 lg:gap-5"
            >
              <h2 className="text-[32px] sm:text-[48px] lg:text-[70px] font-bold text-text-primary leading-[0.9] font-heading">
                HASMUNANDAR
              </h2>

              <p className="text-[15px] sm:text-lg lg:text-[24px] font-bold text-text-primary font-heading">
                Mahasiswa PPG Prajabatan
              </p>

              <p className="text-[14px] sm:text-base lg:text-[21px] text-text-primary/80 leading-relaxed font-body text-pretty mt-2 lg:mt-4">
                Halo! Saya <span className="font-bold">Nandar</span>, lulusan S1
                Pendidikan Guru Sekolah Dasar (PGSD) yang saat ini sedang
                menempuh Program Pendidikan Profesi Guru (PPG). Saya memiliki
                minat pada pengembangan media pembelajaran, pemanfaatan teknologi
                dalam pendidikan, serta inovasi pembelajaran yang mendukung
                terciptanya pengalaman belajar yang kreatif, bermakna, dan
                berpusat pada peserta didik.
              </p>
            </motion.div>

            {/* Right - Portrait + Watermark */}
            <motion.div
              variants={slideFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="relative flex justify-center lg:justify-end lg:pr-[200px] overflow-hidden"
            >
              {/* ABOUT watermark */}
              <span className="absolute top-[-50px] sm:top-[-80px] lg:top-[-157px] right-0 text-[44px] sm:text-[68px] lg:text-[100px] font-light text-interaction/15 font-heading select-none pointer-events-none overflow-hidden max-w-full">
                ABOUT
              </span>

              {/* Portrait */}
              <div className="relative w-[170px] h-[210px] xs:w-[190px] xs:h-[235px] sm:w-[230px] sm:h-[270px] lg:w-[280px] lg:h-[320px] overflow-hidden z-10">
                <Image
                  src="/images/about.webp"
                  alt="Hasmunandar"
                  fill
                  sizes="(max-width: 640px) 170px, (max-width: 1024px) 230px, 280px"
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </div>

          {/* Quote */}
          <div className="mt-12 lg:mt-20 flex flex-col items-center gap-4">
            <div className="w-full flex items-center gap-4">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                className="h-[2px] flex-1 bg-interaction origin-right"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.35 }}
                className="w-2 h-2 rounded-full bg-interaction shrink-0"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
                className="h-[2px] flex-1 bg-interaction origin-left"
              />
            </div>

            <motion.blockquote
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="text-center max-w-[600px] px-2"
            >
              <p className="text-[15px] sm:text-[18px] lg:text-[26px] text-text-primary italic font-body leading-relaxed">
                &ldquo;Pendidikan tidak mengubah dunia, Pendidikan merubah
                manusia, Manusia merubah dunia&rdquo;
              </p>
              <cite className="block mt-3 text-sm lg:text-[16px] text-text-primary/60 font-body not-italic">
                — Paulo Freire
              </cite>
            </motion.blockquote>
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div ref={roadmapRef} className="flex flex-col items-center justify-center min-h-[500px] lg:min-h-[700px]">
        <div className="w-full px-6 sm:px-8 lg:px-[88px] max-w-[1440px] mx-auto">
          <p className="text-[22px] sm:text-[30px] lg:text-[45px] font-bold text-text-primary font-heading mb-6 lg:mb-10">
            Bagaimana perjalanan saya?
          </p>

          {isDesktop ? (
            <div className="roadmap-wrapper w-full flex justify-center overflow-hidden">
              <div
                className="relative shrink-0 origin-top animate-roadmap-fade"
                style={{
                  width: "1264px",
                  height: "632px",
                  transform: `scale(${scale})`,
                  marginBottom: `${(scale - 1) * 632}px`,
                }}
              >
                {/* Background Roadmap Image */}
                <motion.div style={{ clipPath }} className="absolute inset-0 z-0">
                  <Image
                    src="/images/roadmap.png"
                    alt="Roadmap Perjalanan"
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>

                {/* Absolute Card 1 */}
                <motion.div
                  initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
                  animate={card1Controls}
                  className="absolute w-[946px] h-[235px] bg-[#FFF1E8] rounded-xl px-8 py-7 flex flex-col justify-center shadow-sm z-20"
                  style={{ top: "57px", left: "255px" }}
                >
                  <span className="absolute top-3 right-4 text-[45px] font-heading text-text-primary/30 select-none pointer-events-none -z-10">
                    2024
                  </span>
                  <div className="flex flex-col gap-3">
                    <motion.p
                      initial={blurOut}
                      animate={c1Item1}
                      className="text-[24px] font-bold text-text-primary font-heading"
                    >
                      Pendidikan Guru Sekolah Dasar
                    </motion.p>
                    <motion.p
                      initial={blurOut}
                      animate={c1Item2}
                      className="text-[18px] font-bold text-text-primary/70 font-body"
                    >
                      Universitas Negeri Makassar
                    </motion.p>
                    <motion.p
                      initial={blurOut}
                      animate={c1Item3}
                      className="text-[16px] text-text-primary/80 leading-relaxed"
                    >
                      Untuk membekali calon pendidik dengan pengetahuan, keterampilan, dan sikap profesional yang dibutuhkan untuk mengajar, membimbing, dan mengevaluasi siswa di tingkat sekolah dasar
                    </motion.p>
                    <motion.span
                      initial={blurOut}
                      animate={c1Item4}
                      className="inline-flex self-start px-3 py-1 rounded-full text-[14px] text-text-primary font-medium"
                      style={{ backgroundColor: "#FEAE96" }}
                    >
                      Makassar, Sulawesi Selatan
                    </motion.span>
                  </div>
                </motion.div>

                {/* Absolute Card 2 */}
                <motion.div
                  initial={{ clipPath: "inset(0% 0% 0% 100%)" }}
                  animate={card2Controls}
                  className="absolute w-[946px] h-[235px] bg-[#FFF1E8] rounded-xl px-8 py-7 flex flex-col justify-center shadow-sm z-20"
                  style={{ top: "319px", left: "58px" }}
                >
                  <span className="absolute top-3 right-4 text-[45px] font-heading text-text-primary/30 select-none pointer-events-none -z-10">
                    2026
                  </span>
                  <div className="flex flex-col gap-3">
                    <motion.p
                      initial={blurOut}
                      animate={c2Item1}
                      className="text-[24px] font-bold text-text-primary font-heading"
                    >
                      Pendidikan Profesi Guru
                    </motion.p>
                    <motion.p
                      initial={blurOut}
                      animate={c2Item2}
                      className="text-[18px] font-bold text-text-primary/70 font-body"
                    >
                      Universitas Muhammadiyah Indonesia
                    </motion.p>
                    <motion.p
                      initial={blurOut}
                      animate={c2Item3}
                      className="text-[16px] text-text-primary/80 leading-relaxed"
                    >
                      Untuk menghasilkan guru profesional yang beradab, berilmu, adaptif, kreatif, inovatif, dan kompetitif dalam menghadapi tantangan pendidikan di abad ke-21
                    </motion.p>
                    <motion.span
                      initial={blurOut}
                      animate={c2Item4}
                      className="inline-flex self-start px-3 py-1 rounded-full text-[14px] text-text-primary font-medium"
                      style={{ backgroundColor: "#FEAE96" }}
                    >
                      Bekasi, Jawa Barat
                    </motion.span>
                  </div>
                </motion.div>
              </div>
            </div>
          ) : (
            /* Mobile & Tablet layout — vertical timeline */
            <div className="flex flex-col gap-6 w-full">
              {/* Timeline line on left for tablet */}
              {/* Mobile Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="w-full bg-[#FFF1E8] rounded-2xl p-5 sm:p-6 flex flex-col gap-2 relative shadow-sm border-l-4 border-interaction"
              >
                <span className="absolute top-3 right-4 text-[28px] sm:text-[32px] font-heading text-text-primary/30 select-none pointer-events-none">
                  2024
                </span>
                <div className="flex flex-col gap-2">
                  <p className="text-lg sm:text-[20px] font-bold text-text-primary font-heading pr-14">
                    Pendidikan Guru Sekolah Dasar
                  </p>
                  <p className="text-sm sm:text-[16px] font-bold text-text-primary/70 font-body">
                    Universitas Negeri Makassar
                  </p>
                  <p className="text-sm sm:text-[14px] text-text-primary/80 leading-relaxed">
                    Untuk membekali calon pendidik dengan pengetahuan, keterampilan, dan sikap profesional yang dibutuhkan untuk mengajar, membimbing, dan mengevaluasi siswa di tingkat sekolah dasar
                  </p>
                  <span className="inline-flex self-start px-3 py-1 rounded-full text-xs sm:text-[12px] text-text-primary font-medium bg-interaction mt-2">
                    Makassar, Sulawesi Selatan
                  </span>
                </div>
              </motion.div>

              {/* Mobile Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="w-full bg-[#FFF1E8] rounded-2xl p-5 sm:p-6 flex flex-col gap-2 relative shadow-sm border-l-4 border-interaction"
              >
                <span className="absolute top-3 right-4 text-[28px] sm:text-[32px] font-heading text-text-primary/30 select-none pointer-events-none">
                  2026
                </span>
                <div className="flex flex-col gap-2">
                  <p className="text-lg sm:text-[20px] font-bold text-text-primary font-heading pr-14">
                    Pendidikan Profesi Guru
                  </p>
                  <p className="text-sm sm:text-[16px] font-bold text-text-primary/70 font-body">
                    Universitas Muhammadiyah Indonesia
                  </p>
                  <p className="text-sm sm:text-[14px] text-text-primary/80 leading-relaxed">
                    Untuk menghasilkan guru profesional yang beradab, berilmu, adaptif, kreatif, inovatif, dan kompetitif dalam menghadapi tantangan pendidikan di abad ke-21
                  </p>
                  <span className="inline-flex self-start px-3 py-1 rounded-full text-xs sm:text-[12px] text-text-primary font-medium bg-interaction mt-2">
                    Bekasi, Jawa Barat
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Skills Placeholder */}
      <div id="skills" className="relative min-h-[600px] lg:min-h-[900px]">
        <div className="w-full px-6 sm:px-8 lg:px-[88px] max-w-[1440px] mx-auto pt-[60px] lg:pt-[100px]">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="text-[22px] sm:text-[30px] lg:text-[45px] font-bold text-text-primary font-heading mb-6 lg:mb-[68px]"
          >
            Apa yang saya kuasai?
          </motion.p>

          {/* Skill Item 1 */}
          <div>
            <button
              className="text-left w-full"
              onClick={() => setExpandedSkill(expandedSkill === 0 ? null : 0)}
            >
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
            className="text-[18px] xs:text-[20px] sm:text-[28px] lg:text-[50px] font-bold text-text-primary font-heading uppercase mb-4 sm:mb-6 lg:mb-10 cursor-pointer"
              >
                Kompetensi guru profesional
              </motion.p>
            </button>
            <AnimatePresence>
              {expandedSkill === 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 pt-2 flex flex-col gap-2.5">
                    <p className="text-[13px] sm:text-[15px] lg:text-[18px] text-text-primary/80 font-body">Merancang pembelajaran yang efektif dan adaptif</p>
                    <p className="text-[13px] sm:text-[15px] lg:text-[18px] text-text-primary/80 font-body">Mengelola kelas dengan pendekatan yang inklusif</p>
                    <p className="text-[13px] sm:text-[15px] lg:text-[18px] text-text-primary/80 font-body">Menerapkan strategi evaluasi berbasis kompetensi</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
              <div className="relative w-full mt-5 mb-[30px]">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full h-[5px] bg-text-primary origin-left"
              ></motion.div>
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="absolute right-0 top-[-44px] sm:top-[-54px] lg:top-[-60px] w-[28px] sm:w-[30px] h-[28px] sm:h-[30px] flex items-center justify-center text-text-primary font-black text-[32px] sm:text-[36px] lg:text-[40px] leading-none"
              >
                {expandedSkill === 0 ? "−" : "+"}
              </motion.span>
            </div>
          </div>

          {/* Skill Item 2 */}
          <div>
            <button
              className="text-left w-full"
              onClick={() => setExpandedSkill(expandedSkill === 1 ? null : 1)}
            >
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
            className="text-[18px] xs:text-[20px] sm:text-[28px] lg:text-[50px] font-bold text-text-primary font-heading uppercase mb-4 sm:mb-6 lg:mb-10 cursor-pointer"
              >
                Pemanfaatan teknologi pendidikan
              </motion.p>
            </button>
            <AnimatePresence>
              {expandedSkill === 1 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 pt-2 flex flex-col gap-2.5">
                    <p className="text-[13px] sm:text-[15px] lg:text-[18px] text-text-primary/80 font-body">Mengembangkan kurikulum yang sesuai dengan kebutuhan siswa</p>
                    <p className="text-[13px] sm:text-[15px] lg:text-[18px] text-text-primary/80 font-body">Memanfaatkan teknologi dalam proses pembelajaran</p>
                    <p className="text-[13px] sm:text-[15px] lg:text-[18px] text-text-primary/80 font-body">Ber kolaborasi dengan sesama pendidik</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
              <div className="relative w-full mt-5 mb-[30px]">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full h-[5px] bg-text-primary origin-left"
              ></motion.div>
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="absolute right-0 top-[-44px] sm:top-[-54px] lg:top-[-60px] w-[28px] sm:w-[30px] h-[28px] sm:h-[30px] flex items-center justify-center text-text-primary font-black text-[32px] sm:text-[36px] lg:text-[40px] leading-none"
              >
                {expandedSkill === 1 ? "−" : "+"}
              </motion.span>
            </div>
          </div>

          {/* Skill Item 3 */}
          <div>
            <button
              className="text-left w-full"
              onClick={() => setExpandedSkill(expandedSkill === 2 ? null : 2)}
            >
              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
            className="text-[18px] xs:text-[20px] sm:text-[28px] lg:text-[50px] font-bold text-text-primary font-heading uppercase mb-4 sm:mb-6 lg:mb-10 cursor-pointer"
              >
                Pengembangan media pembelajaran
              </motion.p>
            </button>
            <AnimatePresence>
              {expandedSkill === 2 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pb-4 pt-2 flex flex-col gap-2.5">
                    <p className="text-[13px] sm:text-[15px] lg:text-[18px] text-text-primary/80 font-body">Refleksi diri sebagai pendidik yang terus bertumbuh</p>
                    <p className="text-[13px] sm:text-[15px] lg:text-[18px] text-text-primary/80 font-body">Menerapkan penelitian tindakan kelas</p>
                    <p className="text-[13px] sm:text-[15px] lg:text-[18px] text-text-primary/80 font-body">Mengembangkan profesionalisme berkelanjutan</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="relative w-full mt-5">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full h-[5px] bg-text-primary origin-left"
              ></motion.div>
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="absolute right-0 top-[-44px] sm:top-[-54px] lg:top-[-60px] w-[28px] sm:w-[30px] h-[28px] sm:h-[30px] flex items-center justify-center text-text-primary font-black text-[32px] sm:text-[36px] lg:text-[40px] leading-none"
              >
                {expandedSkill === 2 ? "−" : "+"}
              </motion.span>
            </div>
          </div>

        </div>
        <p className="absolute bottom-6 sm:bottom-10 left-0 right-0 text-center text-sm sm:text-[16px] lg:text-[18px] font-light text-text-primary/40 font-body">
          Belajar akan menambah kemampuanmu
        </p>
      </div>

      {/* Project Removed */}
    </section>
  );
};

export default AboutSection;
