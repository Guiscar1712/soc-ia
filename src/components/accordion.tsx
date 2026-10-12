"use client";

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export type AccordionItem = { id: string; header: ReactNode; body: ReactNode };

const ease = [0.23, 1, 0.32, 1] as const;

/** Lista que abre um item por vez, com altura e conteúdo animados. */
export function Accordion({
  items,
  defaultOpen = null,
  className = "",
  bodyClassName = "",
}: {
  items: AccordionItem[];
  defaultOpen?: string | null;
  className?: string;
  bodyClassName?: string;
}) {
  const [open, setOpen] = useState<string | null>(defaultOpen);
  const reduce = useReducedMotion();
  const uid = useId();

  return (
    <div className={className}>
      {items.map((item) => {
        const isOpen = open === item.id;
        const panelId = `${uid}-${item.id}`;
        return (
          <div key={item.id} className="border-b-[0.5pt] border-line last:border-b-0">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : item.id)}
              className="group flex min-h-12 w-full cursor-pointer items-center gap-4 py-5 text-left"
            >
              {item.header}
              <span
                className="relative ml-auto h-3.5 w-3.5 shrink-0 text-accent"
                aria-hidden="true"
              >
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
                <motion.span
                  className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current"
                  animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
                  transition={{ duration: reduce ? 0 : 0.2, ease }}
                />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  // fecha mais rápido do que abre
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: { duration: reduce ? 0 : 0.2, ease },
                  }}
                  transition={{
                    height: { duration: reduce ? 0 : 0.3, ease },
                    opacity: { duration: reduce ? 0 : 0.22, ease },
                  }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ y: reduce ? 0 : -8 }}
                    animate={{ y: 0 }}
                    exit={{ y: reduce ? 0 : -8 }}
                    transition={{ duration: reduce ? 0 : 0.3, ease }}
                    className={`pb-6 ${bodyClassName}`}
                  >
                    {item.body}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
