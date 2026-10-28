import type { Metadata } from "next";
import { SiteProvider } from "@/components/site-provider";
import { Manrope } from "next/font/google";
import "./globals.css";

const sans = Manrope({ variable: "--font-sans", subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Trần Minh Quân — Full-stack Developer",
  description: "Portfolio of Trần Minh Quân, a full-stack developer based in Ho Chi Minh City.",
  metadataBase: new URL("https://quan-portfolio-ten.vercel.app"),
  icons: {
    icon: [
      { url: "/tran-minh-quan-avatar.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { url: "/tran-minh-quan-avatar-32.png", sizes: "32x32", type: "image/png" },
      { url: "/tran-minh-quan-avatar-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/tran-minh-quan-avatar-180.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Trần Minh Quân — Full-stack Developer",
    description: "Portfolio of Trần Minh Quân, a full-stack developer based in Ho Chi Minh City.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trần Minh Quân — Full-stack Developer",
    description: "Portfolio of Trần Minh Quân, a full-stack developer based in Ho Chi Minh City.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={sans.variable}>
      <body><noscript><style>{`.route-curtain { display: none !important; }`}</style></noscript><SiteProvider>{children}</SiteProvider></body>
    </html>
  );
}
