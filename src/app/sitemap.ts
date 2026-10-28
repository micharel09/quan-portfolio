import type { MetadataRoute } from "next";
import { projects } from "@/lib/portfolio-data";
import { siteUrl } from "@/lib/site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/about", "/contact", "/projects", ...projects.map((project) => `/projects/${project.slug}`)]
    .map((path) => ({ url: new URL(path, siteUrl).href }));
}
