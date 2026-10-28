import { PortfolioSite } from "@/components/portfolio-site";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata(
  "Projects — Trần Minh Quân",
  "Explore Trần Minh Quân’s web, mobile, and real-time projects, including Fly products and work at FPT Telecom, ITD Solutions, and FPT University.",
  "/projects",
);

export default function ProjectsPage() {
  return <PortfolioSite page="projects" />;
}
