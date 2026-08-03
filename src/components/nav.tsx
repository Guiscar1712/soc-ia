"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { handleHashClick } from "@/lib/scroll";

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
          className="inline-flex items-center gap-2.5 shrink-0"
          aria-label="SÓC.IA"
        >
          <Image
            src="/brand/icon-mark.svg"
            alt=""
            width={28}
            height={28}
            priority
            className="h-7 w-7"
          />
          <span className="text-[15px] font-medium tracking-[-0.03em] leading-none">
            <span className="text-accent">SÓC</span>
            <span className="text-paper">.IA</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleHashClick(e, item.href)}
              className="text-[13px] text-paper/60 hover:text-paper transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#oferta"
          onClick={(e) => handleHashClick(e, "#oferta")}
          className="hidden md:inline-flex items-center justify-center h-9 px-4 text-[13px] font-medium text-accent-fg bg-accent rounded-full hover:brightness-110 transition"
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
              <span className="inline-flex items-center gap-2.5">
                <Image
                  src="/brand/icon-mark.svg"
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7"
                />
                <span className="text-[15px] font-medium tracking-[-0.03em] leading-none">
                  <span className="text-accent">SÓC</span>
                  <span className="text-paper">.IA</span>
                </span>
              </span>
              <button
                className="p-2 text-paper -mr-2"
                onClick={close}
                aria-label="Fechar"
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
                  className="text-2xl font-serif text-paper"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#oferta"
                onClick={(e) => handleHashClick(e, "#oferta", close)}
                className="mt-6 inline-flex items-center justify-center h-12 px-5 text-sm font-medium text-accent-fg bg-accent rounded-full"
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
