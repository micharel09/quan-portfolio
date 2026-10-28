import { PortfolioSite } from "@/components/portfolio-site";
import { pageMetadata } from "@/lib/site-metadata";

export const metadata = pageMetadata(
  "Trần Minh Quân — Full-stack Developer",
  "Portfolio of Trần Minh Quân, a full-stack developer based in Ho Chi Minh City.",
  "/",
);

export default function Home() {
  return <PortfolioSite page="home" />;
}
