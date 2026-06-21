import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[9px] text-sm font-semibold font-body transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interaction disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-interaction text-background hover:bg-interaction/90 shadow-lg",
        destructive:
          "bg-rose-500 text-white hover:bg-rose-600 shadow-lg",
        outline:
          "border border-interaction/30 bg-background hover:bg-interaction/10 text-text-primary",
        secondary:
          "bg-accent text-background hover:bg-accent/90 shadow-lg",
        ghost: "hover:bg-interaction/10 text-text-primary",
        link: "text-interaction underline-offset-4 hover:underline",
      },
      size: {
        default: "px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
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
