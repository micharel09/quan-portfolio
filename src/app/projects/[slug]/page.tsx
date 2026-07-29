import Image from "next/image";
import { PortfolioSite } from "@/components/portfolio-site";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const isFptTelecomProject = slug === "fcr-customer-request-system";

  return <div className={`project-page project-${slug}`}>
    <PortfolioSite page="project" slug={slug} />
    {isFptTelecomProject && (
      <section className="fpt-team-gallery">
        <div className="fpt-team-gallery-inner">
          <div>
            <p>TEAM MOMENTS / FPT TELECOM</p>
            <h2>Built with the team.</h2>
          </div>
          <div className="fpt-team-photo-grid">
            <figure><Image src="/assets/fpt-telecom-team-01.jpg" alt="FPT Telecom team moment" width={1200} height={900} unoptimized /></figure>
            <figure><Image src="/assets/fpt-telecom-team-02.jpg" alt="FPT Telecom team at the office" width={1200} height={1600} unoptimized /></figure>
            <figure><Image src="/assets/fpt-telecom-team-03.jpg" alt="FPT Telecom team group photo" width={1600} height={1200} unoptimized /></figure>
          </div>
        </div>
      </section>
    )}
  </div>;
}
