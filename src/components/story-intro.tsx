"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { DotField } from "@/components/dots/dot-field";
import { cluster, cube, spread } from "@/components/dots/shapes";
import { Cta, Eyebrow } from "@/components/ui";

const FRAGMENTS = [
  { text: "cadê o modelo?", x: "8%", y: "22%" },
  { text: "só você sabe responder", x: "62%", y: "16%" },
  { text: "a inicial espera", x: "78%", y: "38%" },
  { text: "a estagiária perguntou de novo", x: "14%", y: "68%", desktop: true },
  { text: "onde fica o modelo?", x: "58%", y: "74%" },
  { text: "o contrato saiu diferente", x: "34%", y: "30%", desktop: true },
  { text: "o processo está com você", x: "70%", y: "58%", desktop: true },
  { text: "cadê a procuração?", x: "6%", y: "46%" },
];

function buildShapes(w: number, h: number, mobile: boolean) {
  const n = mobile ? 1100 : 2400;
  const base = Math.min(w, h);
  return [
    mobile ? cluster(n, w * 0.5, h * 0.2, w * 0.48) : cluster(n, w * 0.68, h * 0.46, base * 0.6),
    spread(n, w, h),
    mobile ? cube(n, w * 0.5, h * 0.34, w * 0.5) : cube(n, w * 0.5, h * 0.36, base * 0.36),
  ];
}

/** Mapeia [a, b] → [from, to] com clamp. Forma de função: evita transições presas. */
function range(a: number, b: number, from: number, to: number) {
  return (v: number) => from + (to - from) * Math.min(Math.max((v - a) / (b - a), 0), 1);
}

function useStage(s: MotionValue<number>, input: number[], output: number[]) {
  const opacity = useTransform(s, input, output);
  const visibility = useTransform(opacity, (o) => (o < 0.02 ? "hidden" : "visible"));
  return { opacity, visibility };
}

function Fragment({ f, s, i }: { f: (typeof FRAGMENTS)[number]; s: MotionValue<number>; i: number }) {
  const start = 0.09 + i * 0.012;
  const opacity = useTransform(s, [start, start + 0.06, 0.42, 0.5], [0, 1, 1, 0]);
  const y = useTransform(s, range(start, 0.5, 16, -24));
  return (
    <motion.span
      style={{ left: f.x, top: f.y, opacity, y }}
      className={`absolute whitespace-nowrap rounded-full border border-line bg-ink/80 px-3 py-1.5 font-mono text-[11px] text-paper/80 md:text-xs ${
        f.desktop ? "hidden md:block" : ""
      }`}
    >
      {f.text}
    </motion.span>
  );
}

export function StoryIntro() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: s } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const shape = useTransform(s, [0, 0.08, 0.38, 0.52, 0.78, 1], [0, 0, 1, 1, 2, 2]);

  const hero = useStage(s, [0, 0.07, 0.15], [1, 1, 0]);
  const heroY = useTransform(s, range(0, 0.15, 0, -60));
  const chaos = useStage(s, [0.2, 0.27, 0.47, 0.55], [0, 1, 1, 0]);
  const box = useStage(s, [0.72, 0.8, 1], [0, 1, 1]);
  const boxScale = useTransform(s, range(0.72, 0.85, 0.92, 1));

  return (
    <section id="top" ref={ref} className="relative h-[400vh] bg-background md:h-[520vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <DotField build={buildShapes} progress={shape} className="absolute inset-0 h-full w-full" />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent"
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {FRAGMENTS.map((f, i) => (
            <Fragment key={f.text} f={f} s={s} i={i} />
          ))}
        </div>

        {/* 1 — o problema */}
        <motion.div
          style={{ ...hero, y: heroY }}
          className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-7xl px-6 pb-24 md:px-12 md:pb-20"
        >
          <div className="max-w-3xl">
            <Eyebrow>Caixa Preta SÓC.IA</Eyebrow>
            <h1 className="font-display text-[2.6rem] leading-[1.02] tracking-[-0.03em] text-paper text-balance sm:text-6xl lg:text-[5.25rem]">
              Seu escritório inteiro está na sua cabeça.
            </h1>
            <p className="mt-4 font-display text-2xl text-accent sm:text-3xl lg:text-4xl">
              Esse é o problema.
            </p>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-paper/80">
              Se você para, o escritório para. A Caixa Preta SÓC.IA tira o seu
              jeito de trabalhar da sua cabeça e coloca no papel, na equipe e na IA.
            </p>
            <div className="mt-9">
              <Cta />
            </div>
          </div>
          <p
            className="absolute bottom-6 right-12 hidden font-mono text-[11px] uppercase tracking-[0.23em] text-paper/45 md:block"
            aria-hidden="true"
          >
            Role para organizar ↓
          </p>
        </motion.div>

        {/* 2 — o caos */}
        <motion.div
          style={chaos}
          className="absolute inset-0 z-10 flex items-center justify-center px-6"
        >
          <div className="max-w-3xl rounded-[var(--radius-card)] bg-ink/85 px-6 py-8 text-center shadow-[0_0_80px_40px_rgba(12,10,8,0.85)] md:px-10">
            <h2 className="font-display text-4xl leading-[1.05] tracking-[-0.025em] text-paper text-balance md:text-6xl">
              Tudo passa por <span className="text-accent">você.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-paper/75">
              O cliente pergunta do processo e só você sabe responder. A estagiária
              pergunta pela terceira vez onde fica o modelo. A inicial espera você
              ter tempo. O contrato sai de um jeito diferente a cada vez.
            </p>
            <p className="mx-auto mt-4 max-w-xl font-display text-xl leading-snug text-paper">
              Você não tem um escritório. Você tem um gargalo, e o gargalo é você.
            </p>
          </div>
        </motion.div>

        {/* 3 — a caixa */}
        <motion.div
          style={{ ...box, scale: boxScale }}
          className="absolute inset-x-0 bottom-0 z-10 px-6 pb-16 text-center md:pb-14"
        >
          <h2 className="mx-auto max-w-4xl font-display text-4xl leading-[1.05] tracking-[-0.025em] text-paper text-balance md:text-6xl">
            Todo escritório que funciona tem uma{" "}
            <span className="text-accent">caixa preta.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-paper/75">
            A Caixa Preta SÓC.IA é a do meu escritório, aberta. Os processos que
            fazem a nossa operação andar, escritos para a equipe seguir e para a IA
            executar.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
