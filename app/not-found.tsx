import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-paper flex flex-col items-center justify-center px-6">
      <span className="text-[200px] max-md:text-[120px] font-display font-bold text-accent/20 leading-none select-none">
        404
      </span>
      <h1 className="text-[32px] max-md:text-[24px] font-display font-bold text-ink mt-[-20px]">
        Halaman tidak ditemukan
      </h1>
      <p className="text-[18px] max-md:text-[16px] text-muted font-body mt-3 text-center max-w-[400px]">
        Halaman yang kamu cari mungkin sudah dipindah, dihapus, atau tidak pernah ada.
      </p>
      <Link
        href="/"
        className="mt-8 px-8 py-3 bg-ink text-paper font-display font-bold text-[16px] brutalist-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-150 cursor-pointer"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
