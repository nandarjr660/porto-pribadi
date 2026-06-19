"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: "filled" | "outlined";
}

export default function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  variant = "filled",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const scale = useTransform(
    [springX, springY],
    ([latestX, latestY]) =>
      1 + Math.abs(latestX as number) * 0.001 + Math.abs(latestY as number) * 0.001
  );

  const Component = href ? motion.a : motion.button;
  const componentProps = href ? { href } : { onClick };

  const baseStyles =
    "inline-flex items-center justify-center min-w-[110px] sm:min-w-[144px] h-[38px] sm:h-[44px] px-4 sm:px-6 rounded-[9px] font-body text-[13px] sm:text-[16px] font-semibold transition-shadow duration-300 whitespace-nowrap cursor-pointer";

  const shadowStyle = {
    boxShadow: "0px 34px 9px rgba(254,174,150,0.06), 0px 22px 9px rgba(254,174,150,0.06), 0px 12px 7px rgba(254,174,150,0.06), 0px 5px 5px rgba(254,174,150,0.06), 0px 1px 3px rgba(254,174,150,0.06)",
  };

  const variantStyles =
    variant === "filled"
      ? "bg-interaction text-background"
      : "bg-transparent text-interaction border-2 border-interaction hover:bg-interaction/10";

  return (
    <Component
      ref={ref as never}
      className={cn(baseStyles, variantStyles, className)}
      style={{
        x: springX,
        y: springY,
        scale,
        ...shadowStyle,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      {...componentProps}
    >
      {children}
    </Component>
  );
}
