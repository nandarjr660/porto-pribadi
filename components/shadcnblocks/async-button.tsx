"use client";

import { Check, Loader2, X } from "lucide-react";
import { motion } from "framer-motion";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
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

  return (
    <button
      type={type}
      disabled={disabled || isLoading || isResult}
      className={cn(
        buttonVariants({ variant, size: "default" }),
        "relative overflow-hidden cursor-pointer disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      {/* Progress bar */}
      {showProgress && (
        <motion.span
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-background/50"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}

      {/* Content */}
      <span
        className={cn(
          "flex items-center justify-center gap-2 transition-opacity duration-150",
          (isLoading || isResult) && "opacity-0",
        )}
      >
        {children}
      </span>

      {/* Loading state */}
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="size-4 animate-spin" />
        </span>
      )}

      {/* Success state */}
      {status === "success" && (
        <motion.span
          className="absolute inset-0 flex items-center justify-center text-background"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {successIcon}
        </motion.span>
      )}

      {/* Error state */}
      {status === "error" && (
        <motion.span
          className="absolute inset-0 flex items-center justify-center text-white"
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
