"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import { DotField } from "@/components/dots/dot-field";
import { cluster, cubeWithDocs, spread } from "@/components/dots/shapes";
import { Buy, Eyebrow, REQUIREMENTS } from "@/components/ui";

const STEPS = [
  { title: "Instale", body: "Cada ferramenta vem com arquivo de instalação e guia passo a passo." },
  { title: "Ensine o seu padrão", body: "Informe como o seu escritório faz contrato, checklist ou petição." },
  { title: "Revise e reutilize", body: "Confira o que a IA preparou, ajuste e use de novo na próxima vez." },
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
        <div className="relative order-first -mx-6 h-72 sm:h-80 md:order-none md:col-span-5 md:mx-0 md:h-[34rem]">
          <BoxAnimation />
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
