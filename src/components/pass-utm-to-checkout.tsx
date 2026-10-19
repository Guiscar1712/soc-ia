"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Copia utm_* e fbclid (e, fora da oferta da isca, o resto da query) para o checkout da Eduzz. */
export function PassUtmToCheckout() {
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (![...params.keys()].length) return;

    const offerPage = pathname === "/skill-gratuita";

    document.querySelectorAll<HTMLAnchorElement>('a[href*="eduzz.com"]').forEach((a) => {
      const url = new URL(a.href);
      params.forEach((value, key) => {
        if (offerPage && key !== "fbclid" && !key.startsWith("utm_")) return;
        if (!url.searchParams.has(key)) url.searchParams.set(key, value);
      });
      a.href = url.toString();
    });
  }, [pathname]);

  return null;
}
