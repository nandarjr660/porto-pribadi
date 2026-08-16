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
    "inline-flex items-center justify-center min-w-[110px] sm:min-w-[144px] h-[38px] sm:h-[44px] px-4 sm:px-6 rounded-full font-body text-[13px] sm:text-[15px] font-medium transition-shadow duration-300 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2";

  const shadowStyle = {
    boxShadow: "0px 2px 8px rgba(45,42,38,0.06)",
  };

  const variantStyles =
    variant === "filled"
      ? "bg-ink text-paper hover:bg-ink/90"
      : "bg-transparent text-ink border border-border hover:bg-surface";

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
