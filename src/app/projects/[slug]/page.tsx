import { notFound } from "next/navigation";
import { PortfolioSite } from "@/components/portfolio-site";
import { projects } from "@/lib/portfolio-data";
import { pageMetadata } from "@/lib/site-metadata";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((project) => project.slug === slug);
  if (!project) notFound();
  return pageMetadata(`${project.title} — Trần Minh Quân`, project.summary.en, `/projects/${project.slug}`);
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!projects.some((project) => project.slug === slug)) notFound();
  return <PortfolioSite page="project" slug={slug} />;
}
