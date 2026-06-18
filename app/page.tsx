"use client";

import { useState, useEffect, useRef } from "react";
import HomeSection from "@/features/home";
import AboutSection from "@/features/about";
import ProjectSection from "@/features/project";
import ContactSection from "@/features/contact";

const Home = (): React.JSX.Element => {
  const [active, setActive] = useState("home");
  const [entranceTrigger, setEntranceTrigger] = useState(0);
  const [navEntrance, setNavEntrance] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const initRef = useRef(true);
  const navPendingRef = useRef(false);
  const ENTRANCE_DELAY = 500;

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        document.documentElement.style.zoom = "1";
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (typeof window !== "undefined") {
        document.documentElement.style.zoom = "1";
      }
    };
  }, []);

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
      setActive(section);
      window.scrollTo(0, 0);
      if (!navPendingRef.current) {
        setNavEntrance(false);
        setEntranceTrigger((prev) => prev + 1);
      } else {
        setNavEntrance(true);
      }
      navPendingRef.current = false;
    };

    window.addEventListener("popstate", onPopState);

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
      <div 
        className="transition-opacity duration-700 ease-in-out"
        style={{ opacity: isLoaded ? 1 : 0 }}
      >
        {isLoaded && (
          <>
            {active === "home" && (
              <section id="home">
                <HomeSection entranceTrigger={entranceTrigger} navEntrance={navEntrance} />
              </section>
            )}

            {active === "about" && <AboutSection key={entranceTrigger} entranceTrigger={entranceTrigger} navEntrance={navEntrance} />}

            {active === "project" && <ProjectSection key={entranceTrigger} entranceTrigger={entranceTrigger} navEntrance={navEntrance} />}

            {active === "contact" && <ContactSection key={entranceTrigger} entranceTrigger={entranceTrigger} navEntrance={navEntrance} />}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
