import type { Metadata } from "next";

export const siteUrl = "https://quantm.is-a.dev";

const sharingImage = {
  url: `${siteUrl}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "Tran Minh Quan — Full Stack Developer",
};

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      type: "website",
      url: path,
      images: [sharingImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [sharingImage],
    },
  };
}
