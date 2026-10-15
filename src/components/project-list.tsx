"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { projects, type Language } from "@/lib/portfolio-data";
import { projectPhotos } from "@/lib/portfolio-media";
import { gsap, motionTokens, ScrollTrigger } from "@/lib/motion";
import { SiteLink } from "./site-link";
import { Arrow, MagneticButton } from "./site-elements";

type Selection = { category: string; view: "list" | "grid" };

function ViewIcon({ grid }: { grid: boolean }) {
  return <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">{grid ? <><rect x="4" y="4" width="6" height="6" /><rect x="14" y="4" width="6" height="6" /><rect x="4" y="14" width="6" height="6" /><rect x="14" y="14" width="6" height="6" /></> : <path d="M3 6h18M3 12h18M3 18h18" />}</svg>;
}

export function ProjectCollection({ language, home = false }: { language: Language; home?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const collection = useRef<HTMLDivElement>(null);
  const exit = useRef<gsap.core.Timeline | null>(null);
  const [selection, setSelection] = useState<Selection>({ category: "all", view: "list" });
  const [rendered, setRendered] = useState(selection);
  const previousRendered = useRef(rendered);
  const visible = projects.filter((project) => rendered.category === "all" || project.category.en === rendered.category);

  const select = (next: Selection) => {
    setSelection(next);
    exit.current?.kill();
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setRendered(next); return; }
    exit.current = gsap.timeline().to(collection.current, { opacity: 0, duration: 0.25, overwrite: "auto" }).call(() => setRendered(next), [], 0.3);
  };

  useLayoutEffect(() => {
    if (previousRendered.current === rendered) return;
    previousRendered.current = rendered;
    const context = gsap.context(() => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) { gsap.set(collection.current, { clearProps: "opacity,transform" }); return; }
      gsap.fromTo(collection.current, { opacity: 0, y: "5em" }, { opacity: 1, y: 0, duration: 1, ease: "expo.out", delay: 0.1, clearProps: "opacity,transform", onComplete: () => ScrollTrigger.refresh() });
    }, root);
    return () => context.revert();
  }, [rendered]);

  useLayoutEffect(() => {
    const element = root.current!;
    const media = gsap.matchMedia();
    media.add("(min-width: 1025px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const image = element.querySelector<HTMLElement>(".preview-image")!;
      const strip = element.querySelector(".preview-strip")!;
      const button = element.querySelector<HTMLElement>(".preview-button")!;
      const label = element.querySelector<HTMLElement>(".preview-label")!;
      const text = label.querySelector("span")!;
      const followers = [image, button, label].map((node, i) => ({ node, x: 0, y: 0, divisor: [12, 7, 6][i], left: gsap.quickSetter(node, "left", "px"), top: gsap.quickSetter(node, "top", "px") }));
      const mouse = { x: 0, y: 0 };
      const move = (event: PointerEvent) => { mouse.x = event.clientX; mouse.y = event.clientY; };
      const tick = (_time: number, delta: number) => followers.forEach((follower) => {
        // Source lerps at 120Hz: preserve its lag independently of display refresh.
        const amount = 1 - Math.pow(1 - 1 / follower.divisor, delta / (1000 / 120));
        follower.x += (mouse.x - follower.x) * amount; follower.y += (mouse.y - follower.y) * amount;
        follower.left(follower.x); follower.top(follower.y);
      });
      const context = gsap.context(() => {}, element);
      const size = () => Math.min(25 * parseFloat(getComputedStyle(element).fontSize), Math.max(10 * parseFloat(getComputedStyle(element).fontSize), innerWidth * 0.275));
      const buttonSize = () => Math.min(5 * parseFloat(getComputedStyle(element).fontSize), Math.max(3.75 * parseFloat(getComputedStyle(element).fontSize), innerWidth * 0.055));
      let active = false;
      const show = (index: number) => context.add(() => {
        active = true;
        gsap.to(image, { width: size(), duration: motionTokens.preview, ease: "dennisPreviewIn", overwrite: true });
        const cursorSize = buttonSize() * (!home && rendered.view === "grid" ? 1.66 : 1);
        gsap.to(button, { width: cursorSize, height: cursorSize, duration: motionTokens.preview, ease: "dennisPreviewIn", overwrite: true });
        gsap.to(label, { width: size(), height: buttonSize(), duration: motionTokens.preview, ease: "dennisPreviewIn", overwrite: true });
        gsap.to(text, { fontSize: "1em", duration: motionTokens.preview, ease: "dennisPreviewIn", overwrite: true });
        gsap.to(strip, { yPercent: -index * 100 / projects.length, duration: motionTokens.previewSlide, ease: "power2.inOut", overwrite: true });
      });
      const hide = () => context.add(() => {
        active = false;
        gsap.to(image, { width: 0, duration: motionTokens.preview, ease: "dennisPreviewOut", overwrite: true });
        gsap.to([button, label], { width: 0, height: 0, duration: motionTokens.preview, ease: "dennisPreviewOut", overwrite: true });
        gsap.to(text, { fontSize: 0, duration: motionTokens.preview, ease: "dennisPreviewOut", overwrite: true });
      });
      const press = (event: PointerEvent) => context.add(() => { if (active) gsap.to(button, { width: buttonSize() * (event.type === "pointerdown" ? 1.4 : 1), height: buttonSize() * (event.type === "pointerdown" ? 1.4 : 1), duration: motionTokens.preview, ease: "dennisPreviewIn", overwrite: true }); });
      const cleanups = [...element.querySelectorAll<HTMLElement>(".project-row")].map((row) => {
        const enter = () => show(projects.findIndex((project) => project.slug === row.dataset.slug));
        row.addEventListener("pointerenter", enter); row.addEventListener("pointerleave", hide); row.addEventListener("focus", hide);
        row.addEventListener("pointerdown", press); row.addEventListener("pointerup", press);
        return () => { row.removeEventListener("pointerenter", enter); row.removeEventListener("pointerleave", hide); row.removeEventListener("focus", hide); row.removeEventListener("pointerdown", press); row.removeEventListener("pointerup", press); };
      });
      window.addEventListener("pointermove", move);
      gsap.ticker.add(tick);
      return () => { cleanups.forEach((cleanup) => cleanup()); window.removeEventListener("pointermove", move); gsap.ticker.remove(tick); context.revert(); };
    });
    return () => media.revert();
  }, [rendered, home]);

  useLayoutEffect(() => () => { exit.current?.kill(); }, []);

  return <div ref={root} className={`project-rows ${home ? "home-rows" : "index-rows"}`} data-view={rendered.view}>
    {!home && <div className="work-filters" data-once>
      <div className="work-filter-options" aria-label={language === "en" ? "Project category" : "Lĩnh vực dự án"}>
        <MagneticButton type="button" className="pill-button filter-button" aria-pressed={selection.category === "all"} onClick={() => select({ ...selection, category: "all" })}>{language === "en" ? "All" : "Tất cả"}<sup>{projects.length}</sup></MagneticButton>
        {projects.map((project) => <MagneticButton key={project.category.en} type="button" className="pill-button filter-button" aria-pressed={selection.category === project.category.en} onClick={() => select({ ...selection, category: project.category.en })}>{project.category[language]}</MagneticButton>)}
      </div>
      <div className="work-view-options" aria-label={language === "en" ? "Project view" : "Cách xem dự án"}>{(["list", "grid"] as const).map((view) => <MagneticButton type="button" className="view-button" key={view} aria-pressed={selection.view === view} aria-label={language === "en" ? `${view === "list" ? "List" : "Grid"} view` : view === "list" ? "Xem danh sách" : "Xem lưới"} onClick={() => select({ ...selection, view })}><ViewIcon grid={view === "grid"} /></MagneticButton>)}</div>
    </div>}
    <div className="project-collection-entry" data-once={!home || undefined}><div ref={collection} className="project-collection" data-view={rendered.view}>
      {!home && <div className="project-table-heading label"><span>{language === "en" ? "Project" : "Dự án"}</span><span>{language === "en" ? "Organization" : "Tổ chức"}</span><span>{language === "en" ? "Field" : "Lĩnh vực"}</span><span>{language === "en" ? "Year" : "Năm"}</span></div>}
      {visible.map((project, index) => <SiteLink key={project.slug} href={`/projects/${project.slug}`} data-slug={project.slug} className={`project-row ${home && index > 1 ? "home-extra-project" : ""}`}>
        <div className="project-mobile-image"><Image src={projectPhotos(project.slug)[0].src} alt={project.organization} unoptimized width={1200} height={1200} sizes="(max-width: 620px) 90vw, 44vw" /></div>
        <h2>{project.title}</h2>
        {!home && <span className="project-organization">{project.organization}</span>}
        <span className="project-category">{project.category[language]}</span>
        <span className="project-year">{project.year}</span>
        <span className="project-row-arrow"><Arrow /></span>
      </SiteLink>)}
    </div></div>
    <div className="project-preview-layer" aria-hidden="true"><div className="preview-image"><div className="preview-strip">{projects.map((project) => <div key={project.slug}><Image src={projectPhotos(project.slug)[0].src} alt="" fill unoptimized loading="eager" sizes="400px" /></div>)}</div></div><div className="preview-button" /><div className="preview-label"><span>{language === "en" ? "View" : "Xem"}</span></div></div>
  </div>;
}
