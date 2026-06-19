import Image from "next/image";

export const metadata = {
  title: "Maintenance | Hasmunandar",
  description: "Halaman sedang dalam perbaikan",
};

export default function MaintenancePage() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6">
      <div className="relative size-[250px] sm:size-[300px] lg:size-[350px]">
        <Image
          src="/images/mainten.gif"
          alt="Under maintenance"
          fill
          className="object-contain"
          priority
        />
      </div>
      <p className="mt-8 text-lg sm:text-xl lg:text-[24px] text-text-primary/70 font-body text-center">
        Halaman ini sedang dalam perbaikan
      </p>
    </main>
  );
}
