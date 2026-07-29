"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export function ProjectGallery({ photos }: { photos: readonly Photo[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex((index) => index === null ? null : (index + 1) % photos.length);
      if (event.key === "ArrowLeft") setActiveIndex((index) => index === null ? null : (index - 1 + photos.length) % photos.length);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, photos.length]);

  return <>
    <div className={`team-photo-grid team-photo-grid-${photos.length}`}>
      {photos.map((photo, index) => (
        <figure key={photo.src}>
          <button type="button" onClick={() => setActiveIndex(index)} aria-label={`View ${photo.alt}`}>
            <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} unoptimized />
          </button>
        </figure>
      ))}
    </div>
    <AnimatePresence>
      {activeIndex !== null && (
        <motion.div className="gallery-lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveIndex(null)}>
          <motion.div className="gallery-lightbox-content" initial={{ opacity: 0, scale: .96, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .96, y: 24 }} onClick={(event) => event.stopPropagation()}>
            <button type="button" className="lightbox-close" onClick={() => setActiveIndex(null)}>Close ×</button>
            <Image src={photos[activeIndex].src} alt={photos[activeIndex].alt} width={photos[activeIndex].width} height={photos[activeIndex].height} unoptimized />
            {photos.length > 1 && <div className="lightbox-controls"><button type="button" onClick={() => setActiveIndex((activeIndex - 1 + photos.length) % photos.length)}>← Previous</button><span>{activeIndex + 1} / {photos.length}</span><button type="button" onClick={() => setActiveIndex((activeIndex + 1) % photos.length)}>Next →</button></div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </>;
}
