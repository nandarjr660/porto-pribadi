"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const getPreloaderText = (progress: number) => {
    if (progress < 30) return "Please Wait";
    if (progress < 60) return "Progress berjalan";
    if (progress < 90) return "Tunggu yaa, dikit lagi :*";
    return "Welcome and Enjoy";
  };

  useEffect(() => {
    // Check if we have already shown the preloader in this session
    if (sessionStorage.getItem("preloader_shown")) {
      if (containerRef.current) {
        containerRef.current.style.display = "none";
      }
      // Trigger load and animation immediately if skipped
      window.dispatchEvent(new CustomEvent("trigger-home-load"));
      window.dispatchEvent(new CustomEvent("trigger-home-animation"));
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("preloader_shown", "true");
        }
      });

      // Disable scrolling during preloader
      document.body.style.overflow = "hidden";

      // Progress animation — ends at 4.8s (100%)
      tl.to({ val: 0 }, {
        val: 100,
        duration: 4.8,
        ease: "power2.inOut",
        onUpdate: function () {
          setProgress(Math.round(this.targets()[0].val));
        },
      });

      // Trigger content load in background at 3.6s
      tl.call(() => {
        window.dispatchEvent(new CustomEvent("trigger-home-load"));
      }, undefined, 3.6);

      // Split: fade content + top/bottom slide — starts right after progress
      tl.to(contentRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
      tl.to(topRef.current, {
        y: "-100%",
        duration: 1.2,
        ease: "power3.inOut",
      }, "<"); // "<" means same start as previous tween
      tl.to(bottomRef.current, {
        y: "100%",
        duration: 1.2,
        ease: "power3.inOut",
      }, "<"); // "<" means same start as previous tween

      // Trigger animation + hide preloader + re-enable scroll — after split
      tl.call(() => {
        window.dispatchEvent(new CustomEvent("trigger-home-animation"));
        if (containerRef.current) containerRef.current.style.display = "none";
        document.body.style.overflow = "";
      });
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="global-preloader"
      className="fixed inset-0 z-9999 pointer-events-none"
    >
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined' && window.sessionStorage && window.sessionStorage.getItem('preloader_shown')) {
              var preloader = document.getElementById('global-preloader');
              if (preloader) {
                preloader.style.display = 'none';
              }
            }
          `,
        }}
      />
      {/* Background Halves with Text */}
      <div
        ref={topRef}
        className="absolute left-0 top-0 w-full h-1/2 bg-[#F7DDC8] flex flex-col justify-end items-center pb-4 z-10"
      >
        <span className="font-heading text-[20px] font-bold text-text-primary text-center">
          {getPreloaderText(progress)}
        </span>
      </div>
      <div
        ref={bottomRef}
        className="absolute left-0 bottom-0 w-full h-1/2 bg-[#F7DDC8] flex flex-col justify-start items-center pt-4 z-10"
      >
        <span className="font-heading text-[20px] font-bold text-text-primary">{progress}%</span>
      </div>

      {/* Content (Just the line) */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center w-full"
      >
        {/* Solid line expanding from center */}
        <div className="w-full h-[3px] relative opacity-60 flex justify-center">
          <div
            className="h-full bg-text-primary"
            style={{
              width: `${progress}%`,
              transition: "width 0.1s linear"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
