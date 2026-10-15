"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { motionTokens } from "@/lib/motion";

// Native dialog owns focus trapping, background inertness, and focus restoration.
export function SiteDialog({ open, onClose, label, children }: { open: boolean; onClose: () => void; label: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const controls = useAnimationControls();
  const reduce = useReducedMotion();
  const generation = useRef(0);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const current = ++generation.current;
    controls.stop();
    const hidden = { opacity: 0 };
    if (open) {
      if (!dialog.open) { controls.set(reduce ? { opacity: 1 } : hidden); dialog.showModal(); }
      void controls.start({ opacity: 1, transition: { duration: reduce ? 0 : motionTokens.fast, ease: motionTokens.ease } });
    } else if (dialog.open) {
      void controls.start({ ...(reduce ? { opacity: 0 } : hidden), transition: { duration: reduce ? 0 : motionTokens.fast, ease: motionTokens.ease } }).then(() => { if (generation.current === current) dialog.close(); });
    }
  }, [open, reduce, controls]);
  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = previous; };
  }, [open]);
  useEffect(() => { const dialog = ref.current; return () => { dialog?.close(); }; }, []);
  return <dialog ref={ref} className="site-dialog gallery-dialog" aria-label={label} inert={!open} data-lenis-prevent onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}><motion.div className="lightbox-content" animate={controls}>{children}</motion.div></dialog>;
}
