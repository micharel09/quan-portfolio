import type { Metadata } from "next";
import { SiteProvider } from "@/components/site-provider";
import { Manrope } from "next/font/google";
import "./globals.css";

const sans = Manrope({ variable: "--font-sans", subsets: ["latin", "vietnamese"] });

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
    <html lang="en" className={sans.variable}>
      <body><noscript><style>{`.route-curtain { display: none !important; }`}</style></noscript><SiteProvider>{children}</SiteProvider></body>
    </html>
  );
}
