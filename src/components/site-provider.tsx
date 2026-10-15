"use client";

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { copy, projects, type Language } from "@/lib/portfolio-data";
import { gsap, ScrollTrigger, motionTokens } from "@/lib/motion";

const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({ language: "en", setLanguage: () => {} });
type NavigationOptions = { replace?: boolean; scroll?: boolean };
const NavigationContext = createContext<(href: string, options?: NavigationOptions) => boolean>(() => false);
function subscribeLanguage(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("portfolio-language", callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener("portfolio-language", callback); };
}
function getLanguage(): Language { return localStorage.getItem("portfolio-language") === "vi" ? "vi" : "en"; }
function setLanguage(language: Language) {
  localStorage.setItem("portfolio-language", language);
  window.dispatchEvent(new Event("portfolio-language"));
}
export function useLanguage() { return useContext(LanguageContext); }
export function useSiteNavigation() { return useContext(NavigationContext); }

function routeLabel(pathname: string) {
  const language = getLanguage();
  const project = projects.find((item) => pathname === `/projects/${item.slug}`);
  return project?.title ?? copy.nav[language][pathname === "/" ? 0 : pathname === "/about" ? 2 : pathname === "/contact" ? 3 : 1];
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore<Language>(subscribeLanguage, getLanguage, () => "en");
  const pathname = usePathname();
  const router = useRouter();
  const layer = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const startRef = useRef<(href: string, options?: NavigationOptions) => boolean>(() => false);
  const enterRef = useRef<(path: string) => void>(() => {});
  const beginNavigation = useCallback((href: string, options?: NavigationOptions) => startRef.current(href, options), []);

  useEffect(() => { document.documentElement.lang = language; document.documentElement.dataset.language = language; }, [language]);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9 });
      lenisRef.current = lenis;
      const tick = (seconds: number) => lenis.raf(seconds * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      return () => { gsap.ticker.remove(tick); lenisRef.current = null; lenis.destroy(); };
    });
    return () => media.revert();
  }, []);

  useLayoutEffect(() => {
    const curtain = layer.current!;
    const screen = curtain.querySelector(".curtain-screen")!;
    const words = curtain.querySelector(".curtain-words")!;
    const label = curtain.querySelector(".curtain-label")!;
    const greetings = gsap.utils.toArray<HTMLElement>(".loader-greeting", curtain);
    const top = curtain.querySelector(".curtain-curve-top")!;
    const bottom = curtain.querySelector(".curtain-curve-bottom")!;
    let timeline: gsap.core.Timeline | undefined;
    let currentPath = window.location.pathname;
    let destination = currentPath;
    let ready = true;
    let initial = true;
    let generation = 0;
    let pendingCommit: (() => void) | undefined;
    const media = gsap.matchMedia();

    const setBusy = (busy: boolean) => {
      const shell = document.querySelector<HTMLElement>(".portfolio-shell");
      if (shell) shell.inert = busy;
      document.documentElement.toggleAttribute("data-route-busy", busy);
      if (busy) lenisRef.current?.stop(); else lenisRef.current?.start();
    };
    // Decode the eager/visible images before moving their entrance wrappers.
    // Rejected decodes (broken images) must not trap the visitor behind a loader.
    const prepare = async () => {
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      const images = Array.from(document.querySelectorAll<HTMLImageElement>(".portfolio-shell img"));
      await Promise.allSettled(images.filter((image) => {
        const rect = image.getBoundingClientRect();
        return image.loading === "eager" || (rect.bottom > 0 && rect.top < window.innerHeight);
      }).map((image) => image.decode()));
    };

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const curveHeight = () => window.innerWidth > 540 ? "10vh" : "5vh";
        const enter = (at: number, homeLoader = false) => {
          const targets = document.querySelector(".portfolio-shell")!.querySelectorAll("[data-once]");
          gsap.set(targets, { y: window.innerWidth > 540 ? "50vh" : initial ? "10vh" : "20vh" });
          timeline!.to(targets, { y: 0, duration: homeLoader ? 1.5 : 1, stagger: homeLoader ? 0.07 : 0.05, ease: "expo.out", clearProps: "transform" }, at);
        };
        const finish = () => {
          gsap.set(curtain, { autoAlpha: 0 });
          lenisRef.current?.scrollTo(window.scrollY, { immediate: true, force: true });
          setBusy(false);
          if (!initial) document.querySelector<HTMLElement>(".portfolio-shell main")?.focus({ preventScroll: true });
          curtain.dataset.state = "idle";
          initial = false;
          ScrollTrigger.refresh();
        };
        const start = (path: string, commit?: () => void) => {
          const startY = curtain.dataset.state === "idle" ? 100 : Number(gsap.getProperty(screen, "yPercent"));
          generation++;
          pendingCommit = commit;
          destination = path;
          ready = false;
          initial = false;
          timeline?.kill();
          gsap.killTweensOf("[data-once]");
          gsap.set("[data-once]", { clearProps: "transform" });
          setBusy(true);
          label.textContent = routeLabel(path);
          curtain.dataset.state = "transition";
          timeline = gsap.timeline({ onComplete: finish });
          timeline.set(curtain, { autoAlpha: 1 })
            .set(screen, { yPercent: startY })
            .set(greetings, { display: "none" })
            .set(label, { display: "block" })
            .set(words, { opacity: 0, y: 0 })
            .set(top, { height: 0 })
            .set(bottom, { height: curveHeight() })
            .to(screen, { yPercent: 0, duration: motionTokens.curtainIn, ease: "power4.in" }, 0)
            .to(top, { height: "10vh", duration: 0.4, ease: "power4.in" }, 0)
            .call(() => {
              curtain.dataset.state = "covered";
              const navigate = pendingCommit;
              pendingCommit = undefined;
              navigate?.();
            }, [], motionTokens.curtainIn)
            .to(words, { opacity: 1, y: -50, duration: 0.8, ease: "power4.out" }, 0.55)
            .addPause(motionTokens.curtainLeaveAt, () => { if (ready) timeline?.play(); })
            .call(() => { curtain.dataset.state = "revealing"; }, [], motionTokens.curtainLeaveAt)
            .set(top, { height: 0 }, motionTokens.curtainLeaveAt)
            .to(screen, { yPercent: -100, duration: motionTokens.curtainOut, ease: "power3.inOut" }, motionTokens.curtainLeaveAt)
            .to(words, { opacity: 0, duration: 0.6, ease: "none" }, motionTokens.curtainLeaveAt)
            .to(bottom, { height: 0, duration: 0.85, ease: "power3.inOut" }, 1.35);
        };
        // Event-driven tweens also belong to this context and are reverted on cleanup.
        startRef.current = (href, options) => {
          const url = new URL(href, window.location.href);
          if (url.origin !== window.location.origin || url.pathname === currentPath) return false;
          context.add(() => start(url.pathname, () => {
            if (options?.replace) router.replace(href, { scroll: options.scroll });
            else router.push(href, { scroll: options?.scroll });
          }));
          return true;
        };
        enterRef.current = (path) => {
          if (curtain.dataset.state === "idle") { currentPath = path; return; }
          if (path === currentPath && path !== destination) return;
          if (path === currentPath && initial) return;
          currentPath = path;
          // Ignore an obsolete commit; the latest router request remains covered.
          if (path !== destination) return;
          const ticket = generation;
          setBusy(true);
          void prepare().then(() => {
            if (ticket !== generation) return;
            context.add(() => {
              ready = true;
              enter(Math.max(timeline!.time() + 0.15, motionTokens.contentEnterAt));
              if (timeline!.paused()) timeline!.play();
            });
          });
        };

        label.textContent = routeLabel(currentPath);
        const homeLoader = currentPath === "/";
        setBusy(true);
        curtain.dataset.state = "loading";
        const loader = gsap.timeline({ onComplete: finish });
        timeline = loader;
        loader.set(curtain, { autoAlpha: 1 })
          .set(screen, { yPercent: 0 })
          .set(top, { height: 0 })
          .set(bottom, { height: curveHeight() })
          .set(words, { opacity: homeLoader ? 0 : 1, y: -50 })
          .set(label, { display: homeLoader ? "none" : "block" })
          .set(greetings, { display: homeLoader ? "block" : "none", opacity: 0 });
        let leaveAt = 0.5;
        if (homeLoader) {
          loader.set(greetings[0], { opacity: 1 })
            .to(words, { opacity: 1, duration: 0.8, ease: "power4.out" }, 0.5);
          greetings.forEach((word, index) => {
            if (index > 0) loader.set(word, { opacity: 1 }, 0.9 + index * 0.15);
            if (index < greetings.length - 1) loader.set(word, { opacity: 0 }, 1.05 + index * 0.15);
          });
          leaveAt = 2.32;
        }
        ready = false;
        const ticket = generation;
        void prepare().then(() => {
          if (ticket !== generation) return;
          context.add(() => {
            ready = true;
            enter(leaveAt + 0.2, homeLoader);
            if (loader.paused()) loader.play();
          });
        });
        loader.addPause(leaveAt, () => { if (ready) loader.play(); })
          .to(screen, { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, leaveAt)
          .to(bottom, { height: 0, duration: 1, ease: "power4.inOut" }, leaveAt)
          .to(words, { opacity: 0, duration: 0.3, ease: "none" }, leaveAt + 0.2);
      });
      const onPopState = () => {
        // Next owns the history traversal and restores scroll; never push here.
        context.add(() => {
          generation++;
          pendingCommit = undefined;
          timeline?.kill();
          currentPath = window.location.pathname;
          destination = currentPath;
          initial = false;
          gsap.set(curtain, { autoAlpha: 0 });
          gsap.set("[data-once]", { clearProps: "transform" });
          setBusy(false);
          curtain.dataset.state = "idle";
        });
      };
      window.addEventListener("popstate", onPopState);
      return () => {
        window.removeEventListener("popstate", onPopState);
        generation++;
        startRef.current = () => false;
        enterRef.current = () => {};
        timeline?.kill();
        context.revert();
        setBusy(false);
        gsap.set(curtain, { autoAlpha: 0 });
        curtain.dataset.state = "idle";
      };
    });
    media.add("(prefers-reduced-motion: reduce)", () => {
      generation++;
      timeline?.kill();
      pendingCommit?.();
      pendingCommit = undefined;
      startRef.current = () => false;
      enterRef.current = () => {};
      setBusy(false);
      gsap.set(curtain, { autoAlpha: 0 });
      gsap.set(document.querySelector(".portfolio-shell")!.querySelectorAll("[data-once]"), { clearProps: "transform" });
      curtain.dataset.state = "idle";
      initial = false;
    });
    return () => media.revert();
  }, [router]);

  useLayoutEffect(() => { enterRef.current(pathname); }, [pathname]);

  return <LanguageContext.Provider value={{ language, setLanguage }}><NavigationContext.Provider value={beginNavigation}><MotionConfig reducedMotion="user">{children}<div ref={layer} className="route-curtain" data-state="pending" aria-hidden="true"><div className="curtain-screen"><div className="curtain-curve curtain-curve-top"><div /></div><div className="curtain-words"><span className="curtain-label" />{["Hello", "Bonjour", "स्वागत हे", "Ciao", "Olá", "おい", "Hallå", "Guten tag", "Hallo"].map((word) => <span className="loader-greeting" key={word}>{word}</span>)}</div><div className="curtain-curve curtain-curve-bottom"><div /></div></div></div></MotionConfig></NavigationContext.Provider></LanguageContext.Provider>;
}
