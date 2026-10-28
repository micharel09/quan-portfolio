import { PortfolioSite } from "@/components/portfolio-site";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata(
  "About — Trần Minh Quân",
  "Meet Trần Minh Quân, a full-stack developer building backend APIs, web interfaces, and mobile apps. Explore his experience, skills, and approach.",
  "/about",
);

export default function AboutPage() {
  return <PortfolioSite page="about" />;
}
