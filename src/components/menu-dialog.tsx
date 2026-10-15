"use client";

import { useLayoutEffect, useRef, type ReactNode, type KeyboardEvent } from "react";
import { usePathname } from "next/navigation";
import { gsap, motionTokens } from "@/lib/motion";

export function MenuDialog({ open, onClose, label, children, closeControl }: { open: boolean; onClose: () => void; label: string; children: ReactNode; closeControl: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const previousPath = useRef<string | null>(null);
  const sync = useRef<(opening: boolean, reset?: boolean) => void>(() => {});
  const pathname = usePathname();

  const keepFocus = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab") return;
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]')).filter((element) => !element.closest("[inert]") && element.getClientRects().length > 0);
    const index = controls.indexOf(document.activeElement as HTMLElement);
    const next = event.shiftKey ? (index <= 0 ? controls.length - 1 : index - 1) : (index + 1) % controls.length;
    event.preventDefault();
    controls[next]?.focus({ preventScroll: true });
  };

  useLayoutEffect(() => {
    const dialog = ref.current!;
    const panel = dialog.querySelector(".menu-panel")!;
    const inner = dialog.querySelector(".menu-inner")!;
    const curve = dialog.querySelector(".menu-curve")!;
    const scrim = dialog.querySelector(".menu-scrim")!;
    const links = dialog.querySelectorAll(".drawer-nav > a");
    const control = dialog.querySelector(".menu-close-position")!;
    const button = dialog.querySelector<HTMLButtonElement>(".menu-close")!;
    const bars = button.querySelectorAll(".menu-bars > span");
    const mobile = window.innerWidth <= 540;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const styles = getComputedStyle(dialog);
    const ink = styles.getPropertyValue("--ink").trim();
    const blue = styles.getPropertyValue("--blue").trim();
    let opening = false;
    let controlScale = 0;
    let opener: HTMLElement | null = null;
    let timeline: gsap.core.Timeline;

    const closeDialog = (restoreFocus = true) => {
      dialog.dataset.state = "idle";
      if (dialog.open) dialog.close();
      if (restoreFocus && opener?.isConnected) opener.focus({ preventScroll: true });
      opener = null;
    };
    const context = gsap.context(() => {
      timeline = gsap.timeline({ paused: true, defaults: { ease: motionTokens.menuCurve }, onComplete: () => { dialog.dataset.state = "open"; }, onReverseComplete: closeDialog });
      timeline.fromTo(panel, { xPercent: 100, x: () => innerWidth * (mobile ? 0.2 : 0.06) }, { xPercent: 0, x: 0, duration: motionTokens.menu }, 0)
        .fromTo(curve, { width: mobile ? "20vw" : "6vw" }, { width: 0, duration: 0.85 }, 0)
        .fromTo(inner, { x: mobile ? "20vw" : 0 }, { x: 0, duration: 0.6 }, mobile ? 0.1 : 0)
        .fromTo(links, { x: "15vw" }, { x: 0, duration: motionTokens.menu, stagger: motionTokens.menuStagger }, mobile ? 0.1 : 0)
        .fromTo(scrim, { opacity: 0 }, { opacity: 0.35, duration: motionTokens.menu }, 0)
        .fromTo(control, { scale: () => controlScale }, { scale: 1, duration: 0.4, ease: "dennisPreviewOut" }, 0)
        .fromTo(button, { backgroundColor: ink }, { backgroundColor: blue, duration: 0.25, ease: "dennisPreviewOut" }, 0)
        .fromTo(bars[0], { y: -4, rotation: 0 }, { y: 0, rotation: 45, duration: motionTokens.fast, ease: "dennisFast" }, 0)
        .fromTo(bars[1], { y: 4, rotation: 0 }, { y: 0, rotation: -45, duration: motionTokens.fast, ease: "dennisFast" }, 0);
    }, dialog);

    const settle = () => {
      if (!media.matches) return;
      timeline.progress(opening ? 1 : 0).pause();
      if (!opening) closeDialog();
    };
    sync.current = (next, reset = false) => {
      opening = next;
      if (reset) { timeline.pause(0, true); closeDialog(false); return; }
      if (opening) {
        if (!dialog.open) {
          opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
          const floating = opener?.closest(".menu-toggle-position");
          controlScale = floating ? Number(gsap.getProperty(floating, "scaleX")) : 0;
          timeline.invalidate().progress(0, true);
          // Native autofocus targets the viewport-sized dialog, never an offscreen link.
          dialog.showModal();
          if (floating && opener) {
            context.add(() => {
              gsap.set(button, { x: gsap.getProperty(opener!, "x"), y: gsap.getProperty(opener!, "y") });
              const sourceText = opener!.querySelector(".magnetic-text");
              if (sourceText) gsap.set(button.querySelector(".magnetic-text"), { x: gsap.getProperty(sourceText, "x"), y: gsap.getProperty(sourceText, "y") });
            });
          }
          button.focus({ preventScroll: true });
        }
        dialog.dataset.state = "opening";
        if (media.matches) settle(); else timeline.play();
      } else if (dialog.open) {
        dialog.dataset.state = "closing";
        if (media.matches || timeline.progress() === 0) { timeline.pause(0, true); closeDialog(); }
        else timeline.reverse();
      }
    };
    media.addEventListener("change", settle);
    return () => {
      media.removeEventListener("change", settle);
      sync.current = () => {};
      closeDialog(false);
      context.revert();
    };
  }, []);

  useLayoutEffect(() => {
    const routeChanged = previousPath.current !== null && previousPath.current !== pathname;
    previousPath.current = pathname;
    sync.current(routeChanged ? false : open, routeChanged);
    if (routeChanged && open) onClose();
  }, [open, pathname, onClose]);

  return <dialog ref={ref} id="site-navigation" className="site-dialog drawer-dialog" aria-label={label} tabIndex={-1} autoFocus data-state="idle" data-lenis-prevent onKeyDown={keepFocus} onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget || (event.target as HTMLElement).classList.contains("menu-scrim")) onClose(); }}><div className="menu-scrim" aria-hidden="true" /><div className="menu-panel"><div className="menu-curve" aria-hidden="true"><div /></div><div className="menu-inner">{children}</div></div>{closeControl}</dialog>;
}
