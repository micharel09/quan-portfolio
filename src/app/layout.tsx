import type { Metadata } from "next";
import { ScrollProgress } from "@/components/scroll-progress";
import { Bebas_Neue, DM_Mono, Manrope } from "next/font/google";
import "./globals.css";

const sans = Manrope({ variable: "--font-sans", subsets: ["latin", "vietnamese"] });
const display = Bebas_Neue({ variable: "--font-display", subsets: ["latin"], weight: "400" });
const mono = DM_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "Tran Minh Quan — Full Stack Developer",
  description: "Portfolio of Tran Minh Quan, a full-stack developer based in Ho Chi Minh City.",
  metadataBase: new URL("https://quan-portfolio-ten.vercel.app"),
  icons: { icon: "/portfolio-mark.svg" },
  openGraph: {
    title: "Tran Minh Quan — Full Stack Developer",
    description: "Portfolio of Tran Minh Quan, a full-stack developer based in Ho Chi Minh City.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tran Minh Quan — Full Stack Developer",
    description: "Portfolio of Tran Minh Quan, a full-stack developer based in Ho Chi Minh City.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body><ScrollProgress />{children}</body>
    </html>
  );
}
