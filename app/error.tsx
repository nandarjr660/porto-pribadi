"use client";

import Image from "next/image";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-dvh bg-background flex flex-col items-center justify-center px-6">
      <span className="text-[200px] max-md:text-[120px] font-heading font-bold text-interaction/30 leading-none select-none">
        !
      </span>
      <h1 className="text-[32px] max-md:text-[24px] font-heading font-bold text-text-primary mt-[-20px]">
        Terjadi kesalahan
      </h1>
      <p className="text-[18px] max-md:text-[16px] text-text-primary/60 font-body mt-3 text-center max-w-[400px]">
        Maaf, terjadi sesuatu yang tidak terduga. Silakan coba lagi.
      </p>
      <button
        onClick={reset}
        className="mt-8 px-8 py-3 bg-interaction text-text-primary font-heading font-bold text-[18px] rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
      >
        Coba Lagi
      </button>
      <div className="absolute top-6 left-[88px] max-lg:left-8 max-md:left-6 flex items-center gap-2">
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
    </div>
  );
}
