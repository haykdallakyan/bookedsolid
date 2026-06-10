import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Conversion Machine — Websites & SMS Automations for GTA Local Businesses",
  description:
    "We build professional websites and automated SMS follow-up systems for local service businesses in Ontario. Close more jobs, collect more 5-star reviews — with just two text messages.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
