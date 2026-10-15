"use client";

import { useLayoutEffect, useRef, type ComponentProps, type ReactNode } from "react";
import { SiteLink } from "./site-link";
import { gsap, motionTokens } from "@/lib/motion";
import { socialLinks } from "@/lib/portfolio-media";

export function Arrow({ down = false }: { down?: boolean }) {
  return <svg className={`arrow ${down ? "arrow-down" : ""}`} aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M3 21 21 3M3 3h18v18" stroke="currentColor" strokeWidth="1.5" /></svg>;
}
export function Globe() {
  return <span className="globe" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="24" cy="24" r="20" /><ellipse cx="24" cy="24" rx="10" ry="20" /><ellipse cx="24" cy="24" rx="20" ry="8" /><path d="M4 24h40M24 4v40" /></svg></span>;
}
export function Socials() {
  return <div className="socials">{socialLinks.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noreferrer">{item.label}</a>)}</div>;
}

function useMagnetic<T extends HTMLElement>(strength: number, textStrength: number) {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const element = ref.current!;
    const text = element.querySelector(".magnetic-text")!;
    const fill = element.querySelector(".button-fill")!;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => { gsap.set(fill, { yPercent: 76, visibility: "visible" }); }, element);
      let hovered = false;
      let active = false;
      let fillTimeline: gsap.core.Timeline | undefined;
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" || !matchMedia("(min-width: 541px) and (hover:hover) and (pointer:fine)").matches) return;
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / element.offsetWidth - 0.5;
        const y = (event.clientY - rect.top) / element.offsetHeight - 0.5;
        context.add(() => {
          gsap.to(element, { x: x * strength, y: y * strength, duration: motionTokens.magnetic, ease: "power4.out", overwrite: "auto" });
          gsap.to(text, { x: x * textStrength, y: y * textStrength, duration: motionTokens.magnetic, ease: "power4.out", overwrite: "auto" });
        });
      };
      const update = () => context.add(() => {
        const next = hovered || element.matches(":focus-visible");
        if (next === active) return;
        active = next;
        fillTimeline?.kill();
        gsap.killTweensOf(text, "color");
        fillTimeline = gsap.timeline();
        if (active) {
          // Reset both layers together when reversing an unfinished exit.
          gsap.set(text, { clearProps: "color" });
          fillTimeline.fromTo(fill, { yPercent: 76 }, { yPercent: 0, duration: motionTokens.fill, ease: "power2.inOut" });
          if (!element.classList.contains("nav-link")) fillTimeline.to(text, { color: "#fff", duration: 0.3, ease: "power3.in" }, 0);
          return;
        }
        gsap.to([element, text], { x: 0, y: 0, duration: motionTokens.magnetic, ease: "elastic.out(1,0.3)", overwrite: "auto" });
        const colorDelay = Math.abs(Number(gsap.getProperty(fill, "yPercent"))) < 1 ? 0.3 : 0;
        fillTimeline.to(fill, { yPercent: -76, duration: motionTokens.fill, ease: "power2.inOut" });
        if (!element.classList.contains("nav-link")) fillTimeline.to(text, { color: getComputedStyle(element).color, duration: 0.3, ease: "power3.out", onComplete: () => { gsap.set(text, { clearProps: "color" }); } }, colorDelay);
      });
      const enter = () => { hovered = true; update(); };
      const leave = () => { hovered = false; update(); };
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerenter", enter);
      element.addEventListener("pointerleave", leave);
      element.addEventListener("focus", update);
      element.addEventListener("blur", update);
      return () => {
        element.removeEventListener("pointermove", move); element.removeEventListener("pointerenter", enter); element.removeEventListener("pointerleave", leave);
        element.removeEventListener("focus", update); element.removeEventListener("blur", update); fillTimeline?.kill(); context.revert();
      };
    });
    return () => media.revert();
  }, [strength, textStrength]);
  return ref;
}

type MagneticProps = { children: ReactNode; strength?: number; textStrength?: number };
export function MagneticLink({ children, className = "", strength = 100, textStrength = 50, ...props }: Omit<ComponentProps<typeof SiteLink>, "children"> & MagneticProps) {
  const ref = useMagnetic<HTMLAnchorElement>(strength, textStrength);
  return <SiteLink {...props} ref={ref} className={`${className} magnetic-button`}><span className="button-fill" aria-hidden="true" /><span className="magnetic-text">{children}</span></SiteLink>;
}
export function MagneticButton({ children, className = "", strength = 25, textStrength = 15, ...props }: ComponentProps<"button"> & MagneticProps) {
  const ref = useMagnetic<HTMLButtonElement>(strength, textStrength);
  return <button {...props} ref={ref} className={`${className} magnetic-button`}><span className="button-fill" aria-hidden="true" /><span className="magnetic-text">{children}</span></button>;
}

export function RevealText({ children }: { children: string }) {
  return <span className="reveal-text" data-reveal aria-label={children}>{children.split(/(\s+)/).map((word, index) => /\s+/.test(word) ? word : <span className="reveal-word" aria-hidden="true" key={index}><span>{word}</span></span>)}</span>;
}
