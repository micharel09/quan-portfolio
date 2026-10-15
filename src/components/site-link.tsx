"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useSiteNavigation } from "./site-provider";

export function SiteLink({ onNavigate, ...props }: ComponentProps<typeof Link>) {
  const beginNavigation = useSiteNavigation();
  return <Link {...props} onNavigate={(event) => {
    let prevented = false;
    onNavigate?.({ preventDefault: () => { prevented = true; event.preventDefault(); } });
    if (!prevented && typeof props.href === "string" && beginNavigation(props.href, { replace: props.replace, scroll: props.scroll })) event.preventDefault();
  }} />;
}
