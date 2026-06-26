"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPortraitClicked, setIsPortraitClicked] = useState(false);
  const [emptyAreaHint, setEmptyAreaHint] = useState(false);
  const [hintPosition, setHintPosition] = useState({ x: 0, y: 0 });
  const [hoverDirections, setHoverDirections] = useState<Record<string, "left" | "right">>({});
  const navRef = useRef<HTMLElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const pendingSectionRef = useRef<string | null>(null);
  const portraitTimerRef = useRef<NodeJS.Timeout | null>(null);
  const emptyAreaTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!navRef.current) return;

    const nav = navRef.current;
    const overlayContent = nav.querySelector(".overlay-content") as HTMLElement;
    const menuItems = nav.querySelectorAll(".menu-item");
    const portrait = nav.querySelector(".portrait") as HTMLElement;
    const socialNames = nav.querySelector(".social-names") as HTMLElement;

    gsap.set(overlayContent, { opacity: 0 });
    gsap.set(menuItems, { opacity: 0, x: -80 });
    gsap.set(portrait, { opacity: 0, x: 80 });
    gsap.set(socialNames, { opacity: 0, x: 80 });

    const tl = gsap.timeline({ paused: true });

    tl.to(nav, {
      height: "100dvh",
      duration: 0.8,
      ease: "power2.out",
    })
      .to(overlayContent, { opacity: 1, duration: 0.3 }, "-=0.3")
      .to(
        menuItems,
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.4)" },
        "-=0.2"
      )
      .to(
        portrait,
        { opacity: 1, x: 0, duration: 0.6, ease: "back.out(1.4)" },
        "-=0.4"
      )
      .to(
        socialNames,
        { opacity: 1, x: 0, duration: 0.5, ease: "back.out(1.4)" },
        "-=0.3"
      );

    tlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const logo = navRef.current?.querySelector(".logo-container");
    const hamburger = navRef.current?.querySelector(".hamburger-container");

    if (!logo || !hamburger) return;

    // Set initial animated states
    gsap.set(logo, { opacity: 0, y: -20 });
    gsap.set(hamburger, { opacity: 0, y: -20 });

    const runEntrance = () => {
      gsap.to([logo, hamburger], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.2,
      });
    };

    if (sessionStorage.getItem("preloader_shown")) {
      // Run immediately if preloader was already shown
      runEntrance();
    } else {
      // Wait for trigger-home-animation event from preloader
      window.addEventListener("trigger-home-animation", runEntrance);
    }

    return () => {
      window.removeEventListener("trigger-home-animation", runEntrance);
    };
  }, []);

  useEffect(() => {
    if (!navRef.current) return;

    if (isOpen) {
      tlRef.current?.play();
      pendingSectionRef.current = null;
    } else {
      if (tlRef.current) {
        tlRef.current.eventCallback("onReverseComplete", null);
      }
      tlRef.current?.reverse();

      if (tlRef.current && pendingSectionRef.current) {
        const target = pendingSectionRef.current;
        tlRef.current.eventCallback("onReverseComplete", () => {
          pendingSectionRef.current = null;
          window.dispatchEvent(
            new CustomEvent("section-entrance", { detail: target })
          );
          // ensure other listeners use same delay if needed
          window.dispatchEvent(new CustomEvent("navbar-animation-complete"));
        });
      }
    }
  }, [isOpen]);

  const handleMenuClick = useCallback(
    (e: React.MouseEvent, item: string) => {
      e.preventDefault();
      const target = item.toLowerCase();
      window.dispatchEvent(new CustomEvent("navbar-navigate-start"));
      pendingSectionRef.current = target;
      setIsOpen(false);

      const currentPath = window.location.pathname.replace("/", "").toLowerCase();
      const isValidPath = ["", "home", "about", "project", "contact"].includes(currentPath);

      if (!isValidPath) {
        window.location.href = `/${target}`;
        return;
      }

      if (currentPath === target) {
        window.dispatchEvent(new PopStateEvent("popstate"));
      } else {
        history.pushState(null, "", `/${target}`);
        window.dispatchEvent(new PopStateEvent("popstate"));
      }
    },
    []
  );

  const handlePortraitClick = useCallback(() => {
    if (portraitTimerRef.current) {
      clearTimeout(portraitTimerRef.current);
    }
    setIsPortraitClicked(true);
    portraitTimerRef.current = setTimeout(() => {
      setIsPortraitClicked(false);
    }, 7000);
  }, []);

  const handleMenuMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const midpoint = rect.left + rect.width / 2;
    const direction = e.clientX < midpoint ? "left" : "right";
    setHoverDirections((prev) => ({ ...prev, [item]: direction }));
  }, []);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const posX = e.clientX - rect.left;
      const posY = e.clientY - rect.top;

      if (emptyAreaTimerRef.current) {
        clearTimeout(emptyAreaTimerRef.current);
        emptyAreaTimerRef.current = null;
        setEmptyAreaHint(false);
        setIsOpen(false);
      } else {
        setHintPosition({ x: posX, y: posY });
        setEmptyAreaHint(true);
        emptyAreaTimerRef.current = setTimeout(() => {
          setEmptyAreaHint(false);
          emptyAreaTimerRef.current = null;
        }, 3000);
      }
    },
    []
  );

  const handleLogoClick = useCallback(() => {
    const target = "home";
    const currentPath = window.location.pathname.replace("/", "").toLowerCase();
    const isValidPath = ["", "home", "about", "project", "contact"].includes(currentPath);

    if (isOpen) {
      window.dispatchEvent(new CustomEvent("navbar-navigate-start"));
      pendingSectionRef.current = target;
      setIsOpen(false);
    }

    if (!isValidPath) {
      window.location.href = `/${target}`;
      return;
    }

    if (currentPath === target) {
      window.dispatchEvent(new PopStateEvent("popstate"));
    } else {
      history.pushState(null, "", `/${target}`);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (portraitTimerRef.current) clearTimeout(portraitTimerRef.current);
      if (emptyAreaTimerRef.current) clearTimeout(emptyAreaTimerRef.current);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 h-[56px] sm:h-[70px] bg-background z-50 overflow-hidden",
        className
      )}
    >
      <div className="h-[56px] sm:h-[70px] px-[88px] max-lg:px-8 max-md:px-6 flex items-center justify-between max-w-[1440px] mx-auto">
        {/* Logo */}
        <div
          className="logo-container flex items-center gap-2 cursor-pointer"
          onClick={handleLogoClick}
        >
          <Image
            src="/logo.svg"
            alt="NAND. Logo"
            width={80}
            height={32}
            className="h-[28px] sm:h-[34px] w-auto object-contain"
            priority
          />
          <span className="text-text-primary font-body font-extrabold text-[20px] sm:text-[24px] leading-none tracking-tight">
            NAND.
          </span>
        </div>

        {/* Hamburger Menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hamburger-container flex flex-col justify-center items-center size-[36px] sm:size-[44px] gap-[5px] sm:gap-[6px] cursor-pointer z-50 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interaction focus-visible:ring-offset-2 rounded-md"
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              "w-[22px] h-[3px] sm:w-[28px] sm:h-[4px] bg-text-primary transition-all duration-300",
              isOpen && "rotate-45 translate-y-[8px] sm:translate-y-[10px]"
            )}
          />
          <span
            className={cn(
              "w-[22px] h-[3px] sm:w-[28px] sm:h-[4px] bg-text-primary transition-all duration-300",
              isOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "w-[22px] h-[3px] sm:w-[28px] sm:h-[4px] bg-text-primary transition-all duration-300",
              isOpen && "-rotate-45 translate-y-[-8px] sm:translate-y-[-10px]"
            )}
          />
        </button>
      </div>

      {/* Overlay Content */}
      <div
        className={cn(
          "overlay-content absolute inset-0 h-full flex items-start pt-[clamp(80px,12vh,140px)] sm:pt-[clamp(100px,12vh,140px)] lg:pt-[clamp(120px,12vh,140px)] overflow-y-auto pb-10 px-[88px] max-lg:px-8 max-md:px-6 max-w-[1440px] mx-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none",
          !isOpen && "pointer-events-none"
        )}
        style={{ opacity: 0 }}
        onClick={handleOverlayClick}
      >
        {/* Menu */}
        <nav className="flex flex-col gap-[clamp(12px,3vh,32px)]">
          {["Home", "About", "Project", "Contact"].map((item) => {
            const dir = hoverDirections[item] || "left";
            return (
              <a
                key={item}
                href={item.toLowerCase()}
                className="menu-item group relative text-text-primary font-heading font-bold text-[clamp(36px,8vh,96px)] leading-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interaction focus-visible:ring-offset-4 rounded-lg"
                onClick={(e) => handleMenuClick(e, item)}
                onMouseMove={(e) => handleMenuMouseMove(e, item)}
              >
                <span className="relative inline-block">
                  {item}
                  <span
                    className={cn(
                      "absolute bottom-0 h-[3px] w-0 bg-interaction transition-all duration-300 group-hover:w-full",
                      dir === "left" ? "left-0" : "right-0"
                    )}
                  />
                </span>
                <span className="absolute inset-0 -translate-y-1 group-hover:translate-y-0 transition-transform duration-200" />
              </a>
            );
          })}
          <div className="mt-[clamp(16px,4vh,48px)] flex flex-col gap-1">
            <span className="text-text-primary/60 font-body font-extralight text-[14px] sm:text-[15px] lg:text-[18px]">
              PPG Prajabatan
            </span>
            <span className="text-text-primary/60 font-body font-extralight text-[14px] sm:text-[15px] lg:text-[18px]">
              Calon Guru Profesional
            </span>
            <span className="text-text-primary/60 font-body font-extralight text-[14px] sm:text-[15px] lg:text-[18px] mt-[10px] lg:mt-[13px]">
              Bekasi, Indonesia
            </span>
          </div>
        </nav>
        
        {/* Portrait - hidden on mobile/tablet, visible on desktop */}
        <div
          className={cn(
            "portrait hidden lg:block absolute right-[338px] top-[clamp(120px,12vh,140px)] cursor-pointer transition-transform duration-300",
            isPortraitClicked && "scale-[1.05]"
          )}
          style={{ opacity: 0 }}
          onClick={handlePortraitClick}
        >
          <div className="relative w-[220px] h-[232px] xl:w-[302px] xl:h-[318px] overflow-hidden">
            <Image
              src="/images/navbar.webp"
              alt="Hasmunandar"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Social Names */}
        <div className="social-names absolute right-6 sm:right-8 lg:right-[88px] bottom-[clamp(24px,8vh,100px)] flex flex-col gap-1 text-left" style={{ opacity: 0 }}>
          {[
            { name: "Facebook", href: "https://facebook.com/Hasmunandar" },
            { name: "Instagram", href: "https://instagram.com/hsmnandar" },
            { name: "LinkedIn", href: "https://linkedin.com/in/Hasmunandar" },
            { name: "GitHub", href: "https://github.com/nandarjr660" },
          ].map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary/60 font-heading font-normal text-[14px] sm:text-[16px] lg:text-[20px] hover:text-interaction transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interaction rounded"
              aria-label={social.name}
            >
              {social.name}
            </a>
          ))}
        </div>

        {/* Empty Area Hint */}
        {emptyAreaHint && (
          <span
            className="absolute text-text-primary/60 font-body text-[14px] pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{ left: hintPosition.x, top: hintPosition.y }}
          >
            Klik lagi untuk keluar
          </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
