"use client";

import * as HoverCard from "@radix-ui/react-hover-card";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useState, type ReactNode, type MouseEvent } from "react";

type LinkPreviewProps = {
  children: ReactNode;
  url: string;
  name: string;
  color: string;
  isStatic: true;
  imageSrc: string;
};

export function LinkPreview({ children, url, name, color, imageSrc }: LinkPreviewProps) {
  const [open, setOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const content = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLAnchorElement>(null);
  const touchPointer = useRef(false);
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const translateX = useSpring(x, { stiffness: 100, damping: 15 });

  function handleMouseMove(event: MouseEvent<HTMLAnchorElement>) {
    if (reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const offset = (event.clientX - rect.left - rect.width / 2) / 2;
    // Reserve room for the spring's horizontal travel inside Radix's collision boundary.
    x.set(Math.max(-20, Math.min(20, offset)));
  }

  function closeOnBlur(nextTarget: EventTarget | null) {
    if (!(nextTarget instanceof Node) || (!trigger.current?.contains(nextTarget) && !content.current?.contains(nextTarget))) {
      setOpen(false);
    }
  }

  return <HoverCard.Root open={open} onOpenChange={setOpen} openDelay={50} closeDelay={100}>
    <HoverCard.Trigger
      ref={trigger}
      className="technology"
      style={{ color }}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onPointerDown={(event) => { touchPointer.current = event.pointerType === "touch"; }}
      // Radix cancels touchstart by default. Keep the anchor's native single-tap navigation.
      onTouchStartCapture={(event) => event.stopPropagation()}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => x.set(0)}
      onFocus={(event) => { if (touchPointer.current) event.preventDefault(); else setOpen(true); }}
      onBlur={(event) => closeOnBlur(event.relatedTarget)}
      onKeyDown={(event) => { touchPointer.current = false; if (event.key === "Escape") setOpen(false); }}
    >{children}</HoverCard.Trigger>
    <HoverCard.Portal>
        <HoverCard.Content
          ref={content}
          className="technology-preview-position"
          side="top"
          align="center"
          sideOffset={10}
          collisionPadding={32}
          onEscapeKeyDown={() => setOpen(false)}
          onBlur={(event) => closeOnBlur(event.relatedTarget)}
        >
          <AnimatePresence>
          {open && <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: reducedMotion ? { duration: 0.15 } : { type: "spring", stiffness: 260, damping: 20 } }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.6 }}
            style={{ x: reducedMotion ? 0 : translateX }}
          >
            <a className="technology-preview" href={url} target="_blank" rel="noopener noreferrer" aria-label={`${name} — ${new URL(url).hostname}`}>
              {imageFailed ? <span className="technology-preview-fallback"><strong>{name}</strong><span>{new URL(url).hostname}</span></span> :
                <Image unoptimized loading="eager" src={imageSrc} width={200} height={125} alt={name} onError={() => setImageFailed(true)} />}
            </a>
          </motion.div>}
          </AnimatePresence>
        </HoverCard.Content>
    </HoverCard.Portal>
  </HoverCard.Root>;
}
