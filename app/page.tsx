"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeSection from "@/features/home";
import AboutSection from "@/features/about";
import ProjectSection from "@/features/project";
import ContactSection from "@/features/contact";
import { useSmoothScroll } from "@/lib/useSmoothScroll";

const Home = (): React.JSX.Element => {
  const [active, setActive] = useState("home");
  const [entranceTrigger, setEntranceTrigger] = useState(0);
  const [navEntrance, setNavEntrance] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const initRef = useRef(true);
  const navPendingRef = useRef(false);
  const ENTRANCE_DELAY = 500;
  const isScrolling = active === "about";
  useSmoothScroll(isScrolling);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const wrapper = document.getElementById("content-wrapper");

        // Skala hanya aktif di layar desktop/tablet landscape (lebar >= 1024px)
        if (width >= 1024) {
          let baseHeight = 1024;
          if (active === "home") {
            baseHeight = 700; // Home muat penuh dan terisi lebih baik dengan tinggi desain 700px
          } else if (active === "contact") {
            baseHeight = 800; // Contact muat penuh dengan tinggi desain 800px (ditingkatkan dari 740 agar cukup ruang di layar pendek)
          } else if (active === "project") {
            baseHeight = 860; // Project muat penuh dengan tinggi desain 860px
          } else if (active === "about") {
            baseHeight = 900; // About intro muat penuh dengan tinggi desain 900px
          }

          const baseWidth = 1440;
          const scaleX = width / baseWidth;
          const scaleY = height / baseHeight;
          
          // Menggunakan rasio terkecil agar muat secara vertikal & horizontal
          const zoomFactor = Math.min(1, Math.min(scaleX, scaleY));
          
          // Batas zoom minimum agar konten tidak terlalu kecil di layar pendek
          const safeZoom = Math.max(0.7, zoomFactor); 
          
          if (wrapper) {
            wrapper.style.zoom = safeZoom.toString();
          }
          document.documentElement.style.zoom = "1";
        } else {
          // Reset zoom ke normal (1) di layar mobile dan tablet portrait
          if (wrapper) {
            wrapper.style.zoom = "1";
          }
          document.documentElement.style.zoom = "1";
        }

        // Hapus scrollbar window untuk halaman viewport-lock agar tidak muncul track scrollbar abu-abu
        if (active === "home" || active === "project" || active === "contact") {
          document.documentElement.style.overflow = "hidden";
          document.body.style.overflow = "hidden";
        } else {
          document.documentElement.style.overflow = "unset";
          document.body.style.overflow = "unset";
        }
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (typeof window !== "undefined") {
        const wrapper = document.getElementById("content-wrapper");
        if (wrapper) {
          wrapper.style.zoom = "1";
        }
        document.documentElement.style.zoom = "1";
        document.documentElement.style.overflow = "unset";
        document.body.style.overflow = "unset";
      }
    };
  }, [active, isLoaded]);

  useEffect(() => {
    // Jika preloader sudah pernah ditampilkan di sesi ini (misal saat refresh/F5),
    // langsung set isLoaded dan jalankan animasi agar konten tidak kosong.
    if (typeof window !== "undefined" && sessionStorage.getItem("preloader_shown") === "true") {
      requestAnimationFrame(() => {
        setIsLoaded(true);
        setEntranceTrigger((prev) => prev + 1);
      });
    }

    // Preloader: mount HomeSection at 4.8s (background load)
    let loadTimer: number | null = null;
    const handleLoadTrigger = () => {
      setIsLoaded(true);
      if (!navPendingRef.current) {
        loadTimer = window.setTimeout(() => {
          setEntranceTrigger((prev) => prev + 1);
        }, ENTRANCE_DELAY - 200);
      }
    };
    // Preloader selesai → trigger entranceTrigger (explicit)
    const handleAnimateTrigger = () => setEntranceTrigger((prev) => prev + 1);

    window.addEventListener("trigger-home-load", handleLoadTrigger);
    window.addEventListener("trigger-home-animation", handleAnimateTrigger);

    // Navbar navigation started — delay entrance animation
    const handleNavStart = () => { navPendingRef.current = true; };
    window.addEventListener("navbar-navigate-start", handleNavStart);

    const validSections = ["home", "about", "project", "contact"];

    const sanitizePath = (path: string): string => {
      const cleaned = path.replace("/", "").toLowerCase();
      return validSections.includes(cleaned) ? cleaned : "home";
    };

    const onPopState = () => {
      const section = sanitizePath(window.location.pathname);
      window.scrollTo(0, 0);
      if (navPendingRef.current) {
        navPendingRef.current = false;
      } else {
        setActive(section);
        setNavEntrance(false);
        setEntranceTrigger((prev) => prev + 1);
      }
    };

    const onSectionEntrance = (e: Event) => {
      const section = (e as CustomEvent).detail as string;
      if (validSections.includes(section)) {
        setActive(section);
        setNavEntrance(true);
        setEntranceTrigger((prev) => prev + 1);
      }
    };

    window.addEventListener("popstate", onPopState);
    window.addEventListener("section-entrance", onSectionEntrance);

    if (initRef.current) {
      initRef.current = false;
      const section = sanitizePath(window.location.pathname);
      if (section !== "home") {
        requestAnimationFrame(() => {
          setActive(section);
          setNavEntrance(false); // Direct load — pakai delay pendek
          setEntranceTrigger((prev) => prev + 1);
        });
      }
    }

    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("section-entrance", onSectionEntrance);
      window.removeEventListener("trigger-home-load", handleLoadTrigger);
      window.removeEventListener("trigger-home-animation", handleAnimateTrigger);
      window.removeEventListener("navbar-navigate-start", handleNavStart);
      if (loadTimer) {
        clearTimeout(loadTimer);
      }
    };
  }, []);

  return (
    <div className="relative min-h-dvh bg-background">
      <motion.div
        id="content-wrapper"
        initial={{ opacity: 0, y: 24 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {isLoaded && (
          <AnimatePresence mode="wait">
            {active === "home" && (
              <section id="home">
                <HomeSection entranceTrigger={entranceTrigger} navEntrance={navEntrance} />
              </section>
            )}

            {active === "about" && <AboutSection key={entranceTrigger} entranceTrigger={entranceTrigger} navEntrance={navEntrance} />}

            {active === "project" && <ProjectSection key={entranceTrigger} entranceTrigger={entranceTrigger} navEntrance={navEntrance} />}

            {active === "contact" && <ContactSection key={entranceTrigger} entranceTrigger={entranceTrigger} navEntrance={navEntrance} />}
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
};

export default Home;
