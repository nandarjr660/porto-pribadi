import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak | Hasmunandar",
  description:
    "Hubungi Hasmunandar untuk diskusi, kolaborasi, atau seputar pendidikan dan teknologi pembelajaran.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}