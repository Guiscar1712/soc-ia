"use client";

import { useEffect, useState } from "react";
import { CTA_HREF, CTA_LABEL } from "@/components/ui";

/** Botão fixo do celular. Some quando outro botão de compra já está na tela. */
export function FloatingCta({ href = CTA_HREF, label = CTA_LABEL }: { href?: string; label?: string } = {}) {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setHidden(visible.size > 0);
      },
      // só conta o botão que está longe da faixa onde o fixo aparece
      { rootMargin: "0px 0px -96px 0px" },
    );
    document.querySelectorAll("[data-cta]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      className={`btn-cta fixed inset-x-4 bottom-4 z-40 flex min-h-14 items-center justify-center rounded-[var(--radius-btn)] px-4 py-3 text-center text-base font-semibold text-accent-fg md:hidden ${
        hidden ? "pointer-events-none translate-y-4 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      {label}
    </a>
  );
}
