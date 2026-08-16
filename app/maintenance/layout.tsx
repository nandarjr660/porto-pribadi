import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pemeliharaan | Hasmunandar",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MaintenanceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}