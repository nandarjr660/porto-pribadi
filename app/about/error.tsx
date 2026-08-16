"use client";

export default function AboutError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-dvh bg-paper flex flex-col items-center justify-center px-6">
      <span className="text-[120px] font-display font-bold text-accent/20 leading-none select-none">
        !
      </span>
      <h1 className="text-[24px] font-display font-bold text-ink mt-[-10px]">
        Gagal memuat Tentang
      </h1>
      <p className="text-[16px] text-muted font-body mt-3 text-center max-w-[400px]">
        Terjadi kesalahan saat memuat halaman ini. Silakan coba lagi.
      </p>
      <button
        onClick={reset}
        className="mt-8 px-8 py-3 bg-ink text-paper font-display font-bold text-[16px] brutalist-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-150 cursor-pointer"
      >
        Coba Lagi
      </button>
    </div>
  );
}
