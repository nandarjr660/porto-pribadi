import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-display font-semibold text-[13px] sm:text-[14px] tracking-tight transition-all duration-150 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-ink text-paper hover:bg-ink/90 brutalist-shadow-sm",
        destructive: "bg-playful-coral text-ink hover:bg-playful-coral/90 brutalist-shadow-sm",
        outline: "bg-transparent text-ink border-[2.5px] border-border hover:bg-surface",
        secondary: "bg-accent text-paper hover:bg-accent/90 brutalist-shadow-sm",
        ghost: "bg-transparent text-ink hover:bg-surface",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "px-6 py-3",
        sm: "px-4 py-2 text-[12px]",
        lg: "px-8 py-3.5",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
