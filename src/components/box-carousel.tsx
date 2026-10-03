"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import {
  ChatsCircle,
  FileText,
  Funnel,
  MagicWand,
  TreeStructure,
  UsersThree,
  type Icon,
} from "@phosphor-icons/react";
import { Eyebrow } from "@/components/ui";

const ITEMS: { label: string; title: string; line: string; icon: Icon }[] = [
  { label: "POPs", title: "POPs prontos", line: "Copie, ajuste o nome do escritório, use amanhã.", icon: FileText },
  { label: "Equipe", title: "Organograma e cargos", line: "Cada um sabe o que é seu. Inclusive você.", icon: TreeStructure },
  { label: "Atendimento", title: "Roteiro de atendimento", line: "Todo cliente recebido do mesmo jeito.", icon: ChatsCircle },
  { label: "Comercial", title: "Controle de leads e follow-up", line: "Nenhum cliente esquecido no WhatsApp.", icon: Funnel },
  { label: "Skill", title: "Skill de criação de processos", line: "A IA escreve o processo com você.", icon: MagicWand },
  { label: "Skill", title: "Skill de estrutura de equipe", line: "A IA monta cargos e delegação.", icon: UsersThree },
];

const STEP = 38;

/** Para em cada card: só gira no miolo de cada trecho de rolagem. */
function dwell(x: number) {
  const base = Math.floor(x);
  const f = Math.min(Math.max((x - base - 0.3) / 0.4, 0), 1);
  return base + f * f * (3 - 2 * f);
}

function Card({
  item,
  index,
  rot,
  radius,
}: {
  item: (typeof ITEMS)[number];
  index: number;
  rot: MotionValue<number>;
  radius: number;
}) {
  const angle = useTransform(rot, (r) => index * STEP - r);
  const transform = useTransform(angle, (a) => `rotateY(${a}deg) translateZ(${radius}px)`);
  const opacity = useTransform(angle, (a) => Math.max(0, 1 - Math.max(Math.abs(a) - 20, 0) / 75));
  const glow = useTransform(angle, (a) => Math.max(0, 1 - Math.abs(a) / STEP));
  const borderColor = useTransform(glow, (g) => `rgba(199, 132, 74, ${0.12 + g * 0.5})`);
  const Icon = item.icon;

  return (
    <motion.article
      style={{ transform, opacity, borderColor }}
      className="absolute left-1/2 top-1/2 -ml-[130px] -mt-[180px] flex h-[360px] w-[260px] flex-col rounded-[var(--radius-card)] border bg-surface-2 p-6 [backface-visibility:hidden] md:-ml-[150px] md:-mt-[200px] md:h-[400px] md:w-[300px]"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">
        {String(index + 1).padStart(2, "0")} · {item.label}
      </p>
      <div className="relative mt-6 flex flex-1 items-center justify-center">
        <motion.div
          style={{ opacity: glow }}
          className="absolute h-32 w-32 rounded-full bg-accent/35 blur-3xl"
          aria-hidden="true"
        />
        <Icon className="relative h-20 w-20 text-accent md:h-24 md:w-24" weight="duotone" />
      </div>
      <h3 className="mt-6 font-display text-2xl leading-tight text-paper">{item.title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-paper/65">{item.line}</p>
    </motion.article>
  );
}

export function BoxCarousel() {
  const ref = useRef<HTMLElement>(null);
  const [radius, setRadius] = useState(560);
  const { scrollYProgress: s } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const rot = useTransform(s, (v) => {
    const x = Math.min(Math.max((v - 0.1) / 0.8, 0), 1) * (ITEMS.length - 1);
    return dwell(x) * STEP;
  });
  const lid = useTransform(s, (v) => Math.min(Math.max(v / 0.1, 0), 1));
  const cardsY = useTransform(lid, (v) => (1 - v) * 80);

  useEffect(() => {
    const onResize = () => setRadius(window.innerWidth < 768 ? 360 : 560);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section id="caixa" ref={ref} className="relative h-[260vh] border-y border-line bg-ink md:h-[340vh]">
      <div className="sticky top-0 flex h-[100dvh] flex-col overflow-hidden pt-20 md:pt-28">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
          <Eyebrow>O que vem na caixa</Eyebrow>
          <h2 className="max-w-3xl font-display text-4xl leading-[1.05] tracking-[-0.025em] text-paper text-balance md:text-6xl">
            Abra a caixa. <span className="text-paper/45">Está tudo pronto.</span>
          </h2>
        </div>

        <motion.div
          style={{ opacity: lid, y: cardsY, perspective: 1400 }}
          className="relative flex-1"
        >
          <div
            className="absolute inset-0 [transform-style:preserve-3d]"
            style={{ transform: `translateZ(-${radius}px)` }}
          >
            {ITEMS.map((item, i) => (
              <Card key={item.title} item={item} index={i} rot={rot} radius={radius} />
            ))}
          </div>
        </motion.div>

        <ul className="mx-auto mb-8 flex max-w-7xl flex-wrap justify-center gap-2 px-6 md:mb-10">
          {["POPs", "Fluxos", "Checklists", "Cargos", "Reuniões", "Atendimento", "Leads", "Metas"].map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/55"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
