import Image from "next/image";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps): React.JSX.Element => {
  return (
    <footer
      className={cn(
        "h-[140px] bg-background border-t border-text-primary/10 flex items-center px-[88px] max-lg:px-8 max-md:px-6",
        className
      )}
    >
      <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="NAND. Logo"
            width={80}
            height={32}
            className="h-[28px] w-auto object-contain"
          />
          <span className="text-text-primary font-body font-extrabold text-[20px] leading-none tracking-tight">
            NAND.
          </span>
        </div>

        <span className="text-text-primary/40 font-body font-extralight text-[14px]">
          &copy; {new Date().getFullYear()} Hasmunandar
        </span>
      </div>
    </footer>
  );
};

export default Footer;
