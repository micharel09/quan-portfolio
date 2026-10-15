"use client";

import Image from "next/image";
import { useState } from "react";
import { SiteDialog } from "./site-dialog";
import type { Language } from "@/lib/portfolio-data";

import type { ProjectPhoto } from "@/lib/portfolio-media";
export function ProjectGallery({ photos, language }: { photos: readonly ProjectPhoto[]; language: Language }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const photo = photos[activeIndex ?? 0];
  const change = (direction: number) => setActiveIndex((index) => index === null ? null : (index + direction + photos.length) % photos.length);
  return <><div className={`team-photo-grid team-photo-grid-${photos.length}`}>{photos.map((item, index) => <figure key={item.src}><button type="button" onClick={() => setActiveIndex(index)} aria-label={`${language === "en" ? "View" : "Xem"} ${item.alt}`}><Image src={item.src} alt={item.alt} width={item.width} height={item.height} quality={item.quality} sizes="(max-width: 720px) 88vw, 60vw" /></button></figure>)}</div><SiteDialog open={activeIndex !== null} onClose={() => setActiveIndex(null)} label={language === "en" ? "Project photos" : "Ảnh dự án"}><div onKeyDown={(event) => { if (event.key === "ArrowRight") { event.preventDefault(); change(1); } if (event.key === "ArrowLeft") { event.preventDefault(); change(-1); } }}><button type="button" className="lightbox-close" onClick={() => setActiveIndex(null)}>{language === "en" ? "Close" : "Đóng"} ×</button>{photo && <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} unoptimized />}{photos.length > 1 && <div className="lightbox-controls"><button type="button" onClick={() => change(-1)}>← {language === "en" ? "Previous" : "Trước"}</button><span aria-live="polite">{(activeIndex ?? 0) + 1} / {photos.length}</span><button type="button" onClick={() => change(1)}>{language === "en" ? "Next" : "Sau"} →</button></div>}</div></SiteDialog></>;
}
