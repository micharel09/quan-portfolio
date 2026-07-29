import Image from "next/image";
import { PortfolioSite } from "@/components/portfolio-site";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const galleryByProject = {
    "fcr-customer-request-system": {
      label: "TEAM MOMENTS / FPT TELECOM",
      title: "Built with the team.",
      photos: [
        { src: "/assets/fpt-telecom-team-01.jpg", alt: "FPT Telecom team moment", width: 1200, height: 900 },
        { src: "/assets/fpt-telecom-team-02.jpg", alt: "FPT Telecom team at the office", width: 1200, height: 1600 },
        { src: "/assets/fpt-telecom-team-03.jpg", alt: "FPT Telecom team group photo", width: 1600, height: 1200 },
      ],
    },
    "vds-ai-cctv-weighbridge": {
      label: "TEAM MOMENT / ITD SOLUTIONS",
      title: "Learning in the field.",
      photos: [
        { src: "/assets/itd-team.jpg", alt: "ITD Solutions team working together", width: 1200, height: 1600 },
      ],
    },
    "eigakan-movie-sharing-platform": {
      label: "TEAM MOMENT / EIGAKAN",
      title: "Graduation project team.",
      photos: [
        { src: "/assets/eigakan-team.jpg", alt: "Eigakan graduation project team", width: 1200, height: 1600 },
      ],
    },
  } as const;
  const gallery = galleryByProject[slug as keyof typeof galleryByProject];

  return <div className={`project-page project-${slug}`}>
    <PortfolioSite page="project" slug={slug} />
    {gallery && (
      <section className="team-gallery">
        <div className="team-gallery-inner">
          <div>
            <p>{gallery.label}</p>
            <h2>{gallery.title}</h2>
          </div>
          <div className={`team-photo-grid team-photo-grid-${gallery.photos.length}`}>
            {gallery.photos.map((photo) => (
              <figure key={photo.src}>
                <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} unoptimized />
              </figure>
            ))}
          </div>
        </div>
      </section>
    )}
  </div>;
}
