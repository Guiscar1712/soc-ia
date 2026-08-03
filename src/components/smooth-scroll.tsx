"use client";

import { useEffect } from "react";
import { scrollToHash } from "@/lib/scroll";

/** Intercepts all in-page #anchor clicks (CTAs, nav, footer) for smooth scroll. */
export function SmoothScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href^='#']");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      // External / modified clicks
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      e.preventDefault();
      scrollToHash(href);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      // Defer so layout/fonts are ready
      requestAnimationFrame(() => scrollToHash(window.location.hash));
    }
  }, []);

  return null;
}
