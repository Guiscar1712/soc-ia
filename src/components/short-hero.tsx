"use client";

import { motion, useReducedMotion } from "motion/react";
import { PriceBox } from "@/components/story-sections";
import { Buy, Eyebrow, REQUIREMENTS } from "@/components/ui";

const STEPS = [
  { title: "Instale", body: "Cada ferramenta vem com arquivo de instalação e guia passo a passo." },
  { title: "Ensine o seu padrão", body: "Informe como o seu escritório faz contrato, checklist ou petição." },
  { title: "Revise e reutilize", body: "Confira o que a IA preparou, ajuste e use de novo na próxima vez." },
];

const ease = [0.22, 1, 0.36, 1] as const;

/** Topo da LP curta (/b): promessa direta, compra à vista e o como funciona em 3 passos. */
export function ShortHero() {
  const reduce = useReducedMotion();
  const enter = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease } };

  return (
    <section id="top" className="relative overflow-hidden bg-background px-6 pb-12 pt-28 md:px-12 md:pb-24 md:pt-40">
      <div
        className="pointer-events-none absolute -right-40 top-10 h-[36rem] w-[36rem] rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <motion.div {...enter(0)}>
            <Eyebrow>Caixa Preta SÓC.IA</Eyebrow>
            <h1 className="font-display text-[2.6rem] leading-[1.02] tracking-[-0.03em] text-paper text-balance sm:text-6xl lg:text-[5rem]">
              Pare de explicar a mesma tarefa <span className="text-accent">toda semana.</span>
            </h1>
          </motion.div>
          <motion.p {...enter(0.12)} className="mt-7 max-w-xl text-lg leading-relaxed text-paper/80">
            Ferramentas de IA, processos de exemplo e guias para registrar o padrão do
            seu escritório uma vez e reutilizar nas próximas. Você instala, revisa e
            aplica no seu ritmo.
          </motion.p>
          <motion.div {...enter(0.24)}>
            <Buy className="mt-9" />
            <p className="mt-5 max-w-md text-sm font-normal leading-relaxed text-paper/60">
              Materiais digitais para aplicar no seu escritório. {REQUIREMENTS}
            </p>
          </motion.div>
        </div>
        <div className="hidden justify-center md:col-span-5 md:flex">
          <PriceBox className="w-64 lg:w-80" />
        </div>
      </div>

      <div id="como-funciona" className="relative mx-auto mt-16 grid max-w-7xl gap-6 border-t-[0.5pt] border-line pt-8 md:mt-24 md:grid-cols-3 md:gap-10 md:pt-10">
        {STEPS.map((step, i) => (
          <motion.div key={step.title} {...enter(0.3 + i * 0.1)} className="flex gap-4">
            <span className="mt-1 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className="font-display text-xl text-paper md:text-2xl">{step.title}</p>
              <p className="mt-2 text-base leading-relaxed text-paper/65">{step.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
