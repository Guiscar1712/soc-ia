"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import { DotField } from "@/components/dots/dot-field";
import { cluster, cubeWithDocs, spread } from "@/components/dots/shapes";
import { Buy, Eyebrow } from "@/components/ui";

const STEPS = [
  { title: "Instale", body: "Siga o guia e configure a primeira ferramenta." },
  { title: "Registre seu jeito de fazer", body: "Adapte as instruções ao padrão dos documentos e das rotinas do seu escritório." },
  { title: "Use no próximo caso", body: "Informe os novos dados, peça uma versão e revise antes de usar." },
];

const ease = [0.22, 1, 0.36, 1] as const;

/** Pontos espalhados → nuvem → a caixa preta, que depois se abre com os documentos. */
function shapesBuilder(open: () => number) {
  return (w: number, h: number, mobile: boolean) => {
    const n = mobile ? 900 : 2000;
    const size = Math.min(w, h) * (mobile ? 0.42 : 0.44);
    return [
      spread(n, w, h),
      cluster(n, w * 0.5, h * 0.5, Math.min(w, h) * 0.4),
      cubeWithDocs(n, w * 0.5, h * (mobile ? 0.56 : 0.52), size, mobile, open),
    ];
  };
}

/** A animação da caixa toca sozinha ao abrir a página (sem depender da rolagem). */
function BoxAnimation() {
  const reduce = useReducedMotion();
  const progress = useMotionValue(reduce ? 2 : 0);
  const open = useMotionValue(reduce ? 1 : 0);
  const [build] = useState(() => shapesBuilder(() => open.get()));

  useEffect(() => {
    if (reduce) return;
    const forming = animate(progress, [0, 1, 2], { duration: 3.2, times: [0, 0.4, 1], ease: "easeInOut", delay: 0.3 });
    const opening = animate(open, 1, { duration: 2.4, delay: 3.6, ease: "easeInOut" });
    return () => {
      forming.stop();
      opening.stop();
    };
  }, [reduce, progress, open]);

  return <DotField build={build} progress={progress} className="absolute inset-0 h-full w-full" />;
}

/** Topo da LP curta (/b): promessa direta, compra à vista e o como funciona em 3 passos. */
export function ShortHero() {
  const reduce = useReducedMotion();
  const enter = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease } };

  return (
    <section id="top" className="relative overflow-hidden bg-background px-6 pb-12 pt-20 md:px-12 md:pb-24 md:pt-36">
      <div
        className="pointer-events-none absolute -right-40 top-10 h-[36rem] w-[36rem] rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <motion.div {...enter(0)}>
            <Eyebrow>Caixa Preta SÓC.IA</Eyebrow>
            <h1 className="font-display text-[2.6rem] leading-[1.02] tracking-[-0.03em] text-paper text-balance sm:text-6xl lg:text-[5rem]">
              Pare de explicar a mesma tarefa <span className="text-accent">toda semana</span>
            </h1>
          </motion.div>
          <motion.div {...enter(0.12)} className="mt-7 max-w-xl space-y-4 text-lg leading-relaxed text-paper/80">
            <p>7 ferramentas de IA para registrar o jeito do seu escritório trabalhar e reutilizar nas próximas tarefas.</p>
            <p className="text-paper/65">
              Contratos, checklists e peças: você adapta as instruções, informa os dados do caso e revisa o resultado.
            </p>
          </motion.div>
          <motion.div {...enter(0.24)}>
            <Buy className="mt-9" />
            <p className="mt-5 max-w-md text-sm font-normal leading-relaxed text-paper/60">
              Materiais digitais com instalação e guias de uso. Requer Claude ou ChatGPT, conforme o material. Custos da plataforma não incluídos.
            </p>
          </motion.div>
        </div>
        <div className="relative order-first -mx-6 h-72 sm:h-80 md:order-none md:col-span-5 md:mx-0 md:h-[34rem]">
          <BoxAnimation />
        </div>
      </div>

      <div id="como-funciona" className="relative mx-auto mt-16 max-w-7xl border-t-[0.5pt] border-line pt-8 md:mt-24 md:pt-10">
        <motion.h2 {...enter(0.3)} className="font-display text-3xl leading-[1.05] tracking-[-0.025em] text-paper md:text-5xl">
          Seu padrão pronto para <span className="text-accent">usar de novo</span>
        </motion.h2>
        <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-3 md:gap-10">
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
      </div>
    </section>
  );
}
