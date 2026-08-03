"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface Feature {
  step: string;
  title: string;
  content: string;
  bullets: string[];
}

const FEATURES: Feature[] = [
  {
    step: "01",
    title: "Processos internos",
    content:
      "Fluxos, checklists, modelo editável de POP, manuais, rotinas e mensagens padronizadas.",
    bullets: [
      "Fluxos operacionais",
      "Checklists prontos",
      "Modelo de POP editável",
      "Mensagens padronizadas",
    ],
  },
  {
    step: "02",
    title: "Gestão e equipe",
    content:
      "Organograma, cargos, matriz de responsabilidades, reunião, planejamento e feedback.",
    bullets: [
      "Organograma e cargos",
      "Matriz de responsabilidades",
      "Modelo de reunião",
      "Integração e feedback",
    ],
  },
  {
    step: "03",
    title: "Comercial e organização",
    content:
      "Roteiro de atendimento, follow-up, leads, proposta, metas e indicadores básicos.",
    bullets: [
      "Roteiro de atendimento",
      "Follow-up e leads",
      "Modelo de proposta",
      "Painel de metas",
    ],
  },
  {
    step: "04",
    title: "Agentes SÓC.IA",
    content:
      "Três agentes prontos: criar processos, estruturar equipe e organizar a gestão do escritório.",
    bullets: [
      "Criador de Processos",
      "Estruturação de Equipe",
      "Gestão de Escritório",
      "Prompts e skills prontos",
    ],
  },
];

export function Stack() {
  const [current, setCurrent] = useState(0);

  return (
    <section id="stack" className="w-full bg-background py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-14 md:mb-20 max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted mb-6">
            O que tem dentro
          </div>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-paper text-balance">
            Não é um curso. É a operação pronta.
          </h2>
          <p className="mt-6 text-lg text-paper/60 max-w-xl">
            Procedimentos e ferramentas para baixar, editar e implementar. Mais
            três agentes de IA prontos para o jurídico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="order-2 md:order-1 md:col-span-6 flex flex-col gap-3">
            {FEATURES.map((feature, index) => {
              const active = index === current;
              return (
                <button
                  key={feature.step}
                  type="button"
                  onClick={() => setCurrent(index)}
                  aria-expanded={active}
                  aria-controls="stack-panel"
                  className={cn(
                    "w-full text-left rounded-2xl border border-line px-5 py-5 md:px-6 md:py-6 group cursor-pointer select-none",
                    "transition-all hover:border-accent/40 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
                    active
                      ? "bg-surface border-accent/50 shadow-[0_0_0_1px_rgba(199,132,74,0.2)]"
                      : "bg-background/40"
                  )}
                >
                  <div className="flex items-baseline gap-5 md:gap-6">
                    <span
                      className={cn(
                        "text-[11px] font-mono tracking-widest tabular-nums transition-colors",
                        active
                          ? "text-accent"
                          : "text-muted group-hover:text-accent/80"
                      )}
                    >
                      {feature.step}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3
                          className={cn(
                            "font-serif text-2xl md:text-3xl leading-tight tracking-[-0.015em] transition-colors",
                            active
                              ? "text-paper"
                              : "text-paper/50 group-hover:text-paper/85"
                          )}
                        >
                          {feature.title}
                        </h3>
                        <span
                          className={cn(
                            "shrink-0 text-[11px] uppercase tracking-[0.16em] transition-colors",
                            active
                              ? "text-accent"
                              : "text-muted/60 group-hover:text-muted"
                          )}
                          aria-hidden
                        >
                          {active ? "Aberto" : "Ver"}
                        </span>
                      </div>
                      <AnimatePresence initial={false}>
                        {active && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <p className="mt-3 text-[15px] leading-relaxed text-paper/60 max-w-md">
                              {feature.content}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="order-1 md:order-2 md:col-span-6 md:sticky md:top-24 md:self-start">
            <div
              id="stack-panel"
              role="region"
              aria-live="polite"
              className="relative min-h-[400px] md:min-h-[520px] rounded-2xl bg-surface border border-line overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-muted">
                    <span>Bloco {FEATURES[current].step}</span>
                    <span>{FEATURES[current].title}</span>
                  </div>

                  <ul className="space-y-1">
                    {FEATURES[current].bullets.map((b, i) => (
                      <motion.li
                        key={b}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + i * 0.04 }}
                        className="flex items-baseline gap-4 border-b border-line py-4 last:border-b-0"
                      >
                        <span className="text-[11px] font-mono text-muted tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-serif text-xl md:text-2xl text-paper leading-tight">
                          {b}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-muted">
                    <span>Baixar · Editar · Aplicar</span>
                    <span className="tabular-nums">
                      {String(current + 1).padStart(2, "0")} /{" "}
                      {String(FEATURES.length).padStart(2, "0")}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
