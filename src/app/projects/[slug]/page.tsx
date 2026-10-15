import { notFound } from "next/navigation";
import { PortfolioSite } from "@/components/portfolio-site";
import { projects } from "@/lib/portfolio-data";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!projects.some((project) => project.slug === slug)) notFound();
  return <PortfolioSite page="project" slug={slug} />;
}
