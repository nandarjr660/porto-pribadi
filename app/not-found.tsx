import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-background flex flex-col items-center justify-center px-6 pt-[56px] sm:pt-[70px]">
      <span className="text-[100px] xs:text-[130px] sm:text-[180px] lg:text-[200px] font-heading font-bold text-interaction/30 leading-none select-none">
        404
      </span>
      <h1 className="text-[20px] xs:text-[24px] sm:text-[28px] lg:text-[32px] font-heading font-bold text-text-primary mt-[-10px] sm:mt-[-20px]">
        Halaman tidak ditemukan
      </h1>
      <p className="text-[13px] xs:text-[15px] sm:text-[17px] lg:text-[18px] text-text-primary/60 font-body mt-2 sm:mt-3 text-center max-w-[400px] px-4">
        Halaman yang kamu cari mungkin sudah dipindah, dihapus, atau tidak pernah ada.
      </p>
      <Link
        href="/"
        className="mt-6 sm:mt-8 px-6 py-2.5 sm:px-8 sm:py-3 bg-interaction text-text-primary font-heading font-bold text-[14px] sm:text-[16px] lg:text-[18px] rounded-lg hover:opacity-80 transition-opacity"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
