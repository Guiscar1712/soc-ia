"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { DotField } from "@/components/dots/dot-field";
import { cluster, cubeWithDocs, spread } from "@/components/dots/shapes";
import { Buy, Eyebrow, REQUIREMENTS } from "@/components/ui";

const FRAGMENTS = [
  { text: "onde está o modelo?", x: "8%", y: "22%" },
  { text: "só você sabe responder", x: "62%", y: "16%" },
  { text: "quais documentos eu peço?", x: "64%", y: "38%" },
  { text: "a estagiária perguntou de novo", x: "14%", y: "68%", desktop: true },
  { text: "como você quer esse contrato?", x: "52%", y: "74%" },
  { text: "explica de novo?", x: "34%", y: "30%", desktop: true },
  { text: "o padrão está com você", x: "70%", y: "58%", desktop: true },
  { text: "cadê a procuração?", x: "6%", y: "46%" },
];

function shapesBuilder(open: () => number) {
  return (w: number, h: number, mobile: boolean) => {
    const n = mobile ? 1100 : 2400;
    const base = Math.min(w, h);
    return [
      mobile ? cluster(n, w * 0.5, h * 0.2, w * 0.48) : cluster(n, w * 0.68, h * 0.46, base * 0.6),
      spread(n, w, h),
      mobile
        ? cubeWithDocs(n, w * 0.5, h * 0.34, w * 0.5, true, open)
        : cubeWithDocs(n, w * 0.5, h * 0.36, base * 0.36, false, open),
    ];
  };
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
  const shape = useTransform(s, [0, 0.08, 0.38, 0.52, 0.72, 1], [0, 0, 1, 1, 2, 2]);
  const open = useTransform(s, [0.8, 0.97], [0, 1]);
  const [build] = useState(() => shapesBuilder(() => open.get()));

  const hero = useStage(s, [0, 0.07, 0.15], [1, 1, 0]);
  const heroY = useTransform(s, range(0, 0.15, 0, -60));
  const chaos = useStage(s, [0.2, 0.27, 0.47, 0.55], [0, 1, 1, 0]);
  const box = useStage(s, [0.72, 0.8, 1], [0, 1, 1]);
  const boxScale = useTransform(s, range(0.72, 0.85, 0.92, 1));

  return (
    <section id="top" ref={ref} className="relative h-[460vh] bg-background md:h-[600vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <DotField build={build} progress={shape} className="absolute inset-0 h-full w-full" />
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
              Tire o padrão do escritório da <span className="text-accent">sua cabeça.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-paper/80">
              Ferramentas de IA e processos de exemplo para registrar suas rotinas e
              criar materiais que você revisa e reutiliza.
            </p>
            <Buy className="mt-9" />
            <p className="mt-5 max-w-md text-sm font-normal leading-relaxed text-paper/60">
              Materiais digitais para aplicar no seu escritório. {REQUIREMENTS}
            </p>
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
              Você já explicou essa tarefa <span className="text-accent">antes.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-display text-xl leading-snug text-paper">
              “Onde está o modelo?” “Quais documentos eu peço?” “Como você quer esse
              contrato?”
            </p>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-paper/75 md:text-lg">
              Cada orientação repetida toma tempo de novo. Enquanto o padrão ficar só
              na sua cabeça, até as tarefas conhecidas continuam dependendo da sua
              resposta.
            </p>
          </div>
        </motion.div>

        {/* 3 — a caixa */}
        <motion.div
          style={{ ...box, scale: boxScale }}
          className="absolute inset-x-0 bottom-0 z-10 px-6 pb-28 text-center md:pb-14"
        >
          <h2 className="mx-auto max-w-4xl font-display text-4xl leading-[1.05] tracking-[-0.025em] text-paper text-balance md:text-6xl">
            Todo escritório que funciona tem uma{" "}
            <span className="text-accent">caixa preta.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-paper/75 md:mt-6 md:text-lg">
            Reuni ferramentas e processos a partir da minha experiência na operação
            do escritório. Você usa as orientações para definir o seu padrão e
            adaptar os materiais à sua rotina.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
