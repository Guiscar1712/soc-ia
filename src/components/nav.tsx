"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, List, X } from "@phosphor-icons/react";
import { handleHashClick } from "@/lib/scroll";
import { BrandLockup } from "@/components/brand-mark";
import { CTA_LABEL } from "@/components/ui";

const NAV_ITEMS = [
  { label: "Como funciona", href: "#ia" },
  { label: "O que vem na caixa", href: "#caixa" },
  { label: "Quem fez", href: "#nathalia" },
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
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const toggle = () => setIsOpen((v) => !v);
  const close = () => setIsOpen(false);

  const logo = (onClick?: () => void) => (
    <a
      href="#top"
      onClick={(e) => handleHashClick(e, "#top", onClick)}
      className="shrink-0"
      aria-label="Caixa Preta SÓC.IA"
    >
      <BrandLockup priority />
    </a>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm transition-[border-color] ${
          scrolled ? "border-b border-line" : "border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 h-16">
          {logo()}

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
            href="#cadastro"
            onClick={(e) => handleHashClick(e, "#cadastro")}
            className="hidden md:inline-flex items-center justify-center h-9 px-4 text-[13px] font-medium text-accent-fg bg-accent rounded-[var(--radius-btn)] hover:bg-bronze-2 transition"
          >
            {CTA_LABEL}
          </a>

          <button
            type="button"
            className="md:hidden flex h-11 w-11 items-center justify-center -mr-2.5 text-paper"
            onClick={toggle}
            aria-label="Abrir menu"
            aria-expanded={isOpen}
            aria-controls="menu-mobile"
          >
            <List className="h-6 w-6" weight="regular" />
          </button>
        </div>
      </header>

      {/* Fora do header: o backdrop-blur dele prenderia o fixed à altura da barra */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col bg-background md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-6">
              {logo(close)}
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center -mr-2.5 text-paper"
                onClick={close}
                aria-label="Fechar menu"
              >
                <X className="h-6 w-6" weight="regular" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 pt-4">
              <p className="pt-6 pb-2 font-mono text-[11px] uppercase tracking-[0.23em] text-accent">
                Caixa Preta SÓC.IA
              </p>
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleHashClick(e, item.href, close)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                  className="flex items-baseline gap-4 border-b border-line py-5"
                >
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-3xl leading-tight text-paper">
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className="shrink-0 px-6 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              <a
                href="#cadastro"
                onClick={(e) => handleHashClick(e, "#cadastro", close)}
                className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-accent px-6 py-3 text-sm font-medium text-accent-fg transition hover:bg-bronze-2 active:scale-[0.98]"
              >
                {CTA_LABEL}
                <ArrowRight className="h-4 w-4 shrink-0" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
