import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide";
}

export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-10",
        size === "narrow" && "max-w-[1000px]",
        size === "default" && "max-w-[1400px]",
        size === "wide" && "max-w-[1600px]",
        className
      )}
      {...props}
    />
  );
}
