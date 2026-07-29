import { PortfolioSite } from "@/components/portfolio-site";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PortfolioSite page="project" slug={slug} />;
}
