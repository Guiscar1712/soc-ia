"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { handleHashClick } from "@/lib/scroll";
import { BrandLockup } from "@/components/brand-mark";

const NAV_ITEMS = [
  { label: "O que é", href: "#o-que-e" },
  { label: "O que recebe", href: "#stack" },
  { label: "Oferta", href: "#oferta" },
];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const toggle = () => setIsOpen((v) => !v);
  const close = () => setIsOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm transition-[border-color] ${
        scrolled ? "border-b border-line" : "border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 h-16">
        <a
          href="#top"
          onClick={(e) => handleHashClick(e, "#top")}
          className="shrink-0"
          aria-label="Caixa Preta SÓC.IA"
        >
          <BrandLockup priority />
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleHashClick(e, item.href)}
              className="text-[13px] font-normal text-muted hover:text-paper transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#oferta"
          onClick={(e) => handleHashClick(e, "#oferta")}
          className="hidden md:inline-flex items-center justify-center h-9 px-4 text-[13px] font-medium text-accent-fg bg-accent rounded-[var(--radius-btn)] hover:bg-bronze-2 transition"
        >
          Ver oferta
        </a>

        <button
          className="md:hidden flex items-center text-paper -mr-2 p-2"
          onClick={toggle}
          aria-label="Menu"
        >
          <List className="h-5 w-5" weight="regular" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-background z-50 pt-6 px-6 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between h-10">
              <BrandLockup />
              <button
                className="p-2 text-paper -mr-2"
                onClick={close}
                aria-label="Fechar"
                type="button"
              >
                <X className="h-5 w-5" weight="regular" />
              </button>
            </div>
            <div className="mt-12 flex flex-col space-y-6 border-t border-line pt-10">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleHashClick(e, item.href, close)}
                  className="text-2xl font-display text-paper"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#oferta"
                onClick={(e) => handleHashClick(e, "#oferta", close)}
                className="mt-6 inline-flex items-center justify-center h-12 px-5 text-sm font-medium text-accent-fg bg-accent rounded-[var(--radius-btn)]"
              >
                Ver oferta
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
