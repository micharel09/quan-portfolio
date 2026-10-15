"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import { gsap, ScrollTrigger, motionTokens } from "@/lib/motion";
import type { Language } from "@/lib/portfolio-data";

export function useSiteScrollMotion(root: RefObject<HTMLDivElement | null>, language: Language) {
  useLayoutEffect(() => {
    const element = root.current!;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        element.querySelectorAll<HTMLElement>("[data-reveal]").forEach((target) => {
          gsap.fromTo(target.querySelectorAll(".reveal-word > span"), { yPercent: 100 }, { yPercent: 0, duration: 1, stagger: 0.01, ease: "power3.out", scrollTrigger: { trigger: target, start: "top bottom", end: "bottom top", toggleActions: "play none none reset" } });
        });
        element.querySelectorAll<HTMLElement>("[data-fade]").forEach((target) => {
          gsap.fromTo(target, { y: "2em", opacity: 0 }, { y: 0, opacity: 1, duration: 1.75, ease: "expo.out", scrollTrigger: { trigger: target, start: "top 110%", end: "bottom top", toggleActions: "play none none reset" } });
        });
        const footer = element.querySelector(".footer-wrap");
        const curve = element.querySelector(".footer-round");
        if (footer && curve) gsap.to(curve, { height: 0, ease: "none", scrollTrigger: { trigger: footer, start: "top bottom", end: "bottom bottom", scrub: true } });
      }, element);
      return () => context.revert();
    });
    media.add("(min-width: 721px) and (prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const hero = element.querySelector(".hero");
        const arrow = element.querySelector(".hero-role > .arrow");
        if (hero && arrow) gsap.to(arrow, { rotation: 180, ease: "none", scrollTrigger: { trigger: hero, start: "bottom bottom", end: "bottom top", scrub: true } });
        const footer = element.querySelector(".footer-wrap");
        const footerArrow = element.querySelector(".footer-title > .arrow");
        if (footer && footerArrow) gsap.fromTo(footerArrow, { rotation: 105 }, { rotation: 90, ease: "none", scrollTrigger: { trigger: footer, start: "top bottom", end: "bottom bottom", scrub: true } });
        const portrait = element.querySelector(".about-portrait-frame");
        const aboutArrow = element.querySelector(".about-image-copy > .arrow");
        if (portrait && aboutArrow) gsap.to(aboutArrow, { rotation: 150, ease: "none", scrollTrigger: { trigger: portrait, start: "15% bottom", end: "bottom top", scrub: true } });
        const services = element.querySelector(".about-services-section");
        if (services) {
          const surfaces = element.querySelectorAll(".about-page > .page-heading,.about-image-section,.about-services-section");
          gsap.fromTo(surfaces, { backgroundColor: "#fff" }, { backgroundColor: "#e9eaeb", ease: "none", scrollTrigger: { trigger: services, start: "-25% bottom", end: "bottom bottom", scrub: true } });
        }
      }, element);
      return () => context.revert();
    });
    media.add("(min-width: 1025px) and (prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        element.querySelectorAll<HTMLElement>("[data-parallax]").forEach((target) => {
          const speed = Number(target.dataset.speed ?? -2) / 10;
          const anchor = target.parentElement!;
          const position = target.dataset.position;
          // Track the parallax transform so media/language cleanup restores it.
          gsap.set(target, { x: 0, y: 0 });
          const setPosition = gsap.quickSetter(target, target.dataset.direction === "horizontal" ? "x" : "y", "px");
          let middle = 0;
          const update = () => {
            const y = position === "bottom"
              ? (ScrollTrigger.maxScroll(window) - window.scrollY) * speed
              : position === "top"
                ? -window.scrollY * speed
                : -(window.scrollY + innerHeight / 2 - middle) * speed;
            setPosition(y);
          };
          ScrollTrigger.create({ trigger: anchor, start: "top bottom", end: "bottom top", onRefresh: () => {
            if (!position) { const rect = anchor.getBoundingClientRect(); middle = rect.top + window.scrollY + rect.height / 2; }
            update();
          }, onUpdate: update });
        });
      }, element);
      return () => context.revert();
    });
    let active = true;
    const refresh = () => { if (active) ScrollTrigger.refresh(); };
    const images = [...element.querySelectorAll("img")];
    images.forEach((image) => image.addEventListener("load", refresh));
    void document.fonts.ready.then(refresh);
    return () => { active = false; images.forEach((image) => image.removeEventListener("load", refresh)); media.revert(); };
  }, [root, language]);
}

export function NameTicker() {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const roll = gsap.timeline({ repeat: -1, onReverseComplete() { this.totalTime(this.rawTime() + this.duration() * 10); } });
        roll.to(".name-track > span", { xPercent: -100, duration: motionTokens.tickerSeconds, ease: "none" });
        let direction = 1;
        ScrollTrigger.create({ start: 0, end: "max", onUpdate: (self) => {
          if (self.direction !== direction) { direction = self.direction; gsap.to(roll, { timeScale: direction, duration: 0.5, overwrite: true }); }
        } });
      }, ref);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  return <div ref={ref} className="name-ticker"><h1 className="sr-only">Trần Minh Quân — Full-stack Developer</h1><div className="name-track" aria-hidden="true"><span>Trần Minh Quân — </span><span>Trần Minh Quân — </span></div></div>;
}
