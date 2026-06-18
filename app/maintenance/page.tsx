import Image from "next/image";

export const metadata = {
  title: "Maintenance | Hasmunandar",
  description: "Halaman sedang dalam perbaikan",
};

export default function MaintenancePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[350px] lg:h-[350px]">
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
