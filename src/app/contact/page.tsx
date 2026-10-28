import { PortfolioSite } from "@/components/portfolio-site";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata(
  "Contact — Trần Minh Quân",
  "Contact Trần Minh Quân for full-stack development projects. Find email, social profiles, and a downloadable CV.",
  "/contact",
);

export default function ContactPage() {
  return <PortfolioSite page="contact" />;
}
