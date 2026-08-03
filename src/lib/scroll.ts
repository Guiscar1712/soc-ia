import type { MouseEvent } from "react";

const HEADER_OFFSET = 72;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToHash(hash: string) {
  if (typeof window === "undefined") return;

  const id = hash.replace(/^#/, "");
  if (!id) return;

  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });

  window.history.pushState(null, "", `#${id}`);
}

export function handleHashClick(
  e: MouseEvent<HTMLAnchorElement>,
  href: string,
  after?: () => void
) {
  if (!href.startsWith("#")) return;
  e.preventDefault();
  scrollToHash(href);
  after?.();
}
