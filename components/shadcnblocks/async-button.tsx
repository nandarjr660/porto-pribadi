"use client";

import { Check, Loader2, X } from "lucide-react";
import { motion } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";

type AsyncButtonVariant = "default" | "secondary" | "outline" | "ghost";
type AsyncButtonStatus = "idle" | "loading" | "success" | "error";

export interface AsyncButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AsyncButtonVariant;
  status?: AsyncButtonStatus;
  progress?: number;
  resetDelay?: number;
  onReset?: () => void;
  successIcon?: React.ReactNode;
  errorIcon?: React.ReactNode;
}

export const AsyncButton = ({
  children,
  variant = "default",
  status = "idle",
  progress,
  resetDelay = 2000,
  onReset,
  successIcon = <Check className="size-4" />,
  errorIcon = <X className="size-4" />,
  className,
  disabled,
  type = "button",
  ...props
}: AsyncButtonProps) => {
  const isLoading = status === "loading";
  const isResult = status === "success" || status === "error";

  React.useEffect(() => {
    if (!isResult) return;
    const timer = window.setTimeout(() => onReset?.(), resetDelay);
    return () => clearTimeout(timer);
  }, [isResult, resetDelay, onReset]);

  const showProgress = isLoading && progress !== undefined;

  const baseStyles =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-display font-semibold text-[13px] sm:text-[14px] tracking-tight transition-all duration-150 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer";

  const variantStyles = {
    default: "bg-ink text-paper hover:bg-ink/90 brutalist-shadow-sm",
    secondary: "bg-accent text-paper hover:bg-accent/90 brutalist-shadow-sm",
    outline: "bg-transparent text-ink border-[2.5px] border-border hover:bg-surface",
    ghost: "bg-transparent text-ink hover:bg-surface",
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading || isResult}
      className={cn(baseStyles, variantStyles[variant], "px-6 py-3 relative overflow-hidden", className)}
      {...props}
    >
      {showProgress && (
        <motion.span
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-paper/30"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}

      <span className={cn("flex items-center justify-center gap-2 transition-opacity duration-150", (isLoading || isResult) && "opacity-0")}>
        {children}
      </span>

      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="size-4 animate-spin" />
        </span>
      )}

      {status === "success" && (
        <motion.span
          className="absolute inset-0 flex items-center justify-center text-paper"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {successIcon}
        </motion.span>
      )}

      {status === "error" && (
        <motion.span
          className="absolute inset-0 flex items-center justify-center text-paper"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {errorIcon}
        </motion.span>
      )}
    </button>
  );
};
