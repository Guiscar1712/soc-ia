"use client";

import { motion } from "motion/react";
import { Cta, Eyebrow, Shout } from "@/components/ui";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-15% 0px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
} as const;

const SKILL_STEPS = [
  "Peça RG, CPF e comprovante de residência.",
  "Pergunte o que aconteceu e anote as datas.",
  "Liste os documentos que estão faltando.",
  "Entregue um resumo para o advogado revisar.",
];

/** 4 — IA explicada para quem não é de tecnologia. */
export function Explain() {
  return (
    <section id="ia" className="bg-background py-16 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-12 md:gap-16 md:px-12">
        <motion.div {...reveal} className="md:col-span-6">
          <Eyebrow>Sem complicação</Eyebrow>
          <h2 className="font-display text-4xl leading-[1.05] tracking-[-0.025em] text-paper text-balance md:text-6xl">
            Você não precisa entender de IA.
          </h2>
          <p className="mt-8 max-w-lg font-display text-2xl leading-snug text-paper/90">
            Precisa saber como o seu escritório funciona. Isso você já sabe.
          </p>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-paper/70">
            <strong className="font-semibold text-paper">Skill é um manual de instruções para a IA.</strong>{" "}
            Você explica uma vez e ela segue sempre, do jeito do seu escritório.
          </p>
          <p className="mt-6 max-w-lg border-l-2 border-accent pl-6 text-lg leading-relaxed text-paper/85">
            É como treinar um estagiário que nunca esquece e nunca falta.
          </p>
        </motion.div>

        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.15 }} className="md:col-span-6">
          <div className="rounded-[var(--radius-card)] border border-line bg-surface p-7 md:p-9">
            <div className="flex items-center justify-between border-b border-line pb-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Skill · exemplo</p>
              <p className="font-mono text-[11px] text-paper/40">atendimento-inicial</p>
            </div>
            <h3 className="mt-6 font-display text-2xl text-paper">Quando chegar um cliente novo:</h3>
            <ol className="mt-6 space-y-4">
              {SKILL_STEPS.map((step, i) => (
                <motion.li
                  key={step}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                  className="flex gap-4 text-[17px] leading-relaxed text-paper/80"
                >
                  <span className="mt-1 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </motion.li>
              ))}
            </ol>
            <p className="mt-8 border-t border-line pt-5 font-display text-lg text-paper">
              Você escreve uma vez. A IA segue toda vez.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const SWAPS = [
  ["Cada demanda começa do zero.", "Cada demanda segue um padrão."],
  ["Tudo depende de você.", "A equipe sabe o que fazer."],
  ["“Me lembra como faz?”", "Está no POP."],
  ["Cliente esquecido no WhatsApp.", "Todo contato tem próximo passo."],
];

/** 6 — antes e depois, uma linha por vez. */
export function BeforeAfter() {
  return (
    <section id="antes-depois" className="bg-background py-16 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <Eyebrow>Antes · Depois</Eyebrow>
        <ul className="divide-y divide-line border-y border-line">
          {SWAPS.map(([before, after], i) => (
            <li key={before} className="grid gap-3 py-8 md:grid-cols-2 md:gap-12 md:py-10">
              <p className="relative w-fit font-display text-2xl text-paper/40 md:text-4xl">
                {before}
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-20% 0px" }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
                  className="absolute left-0 top-1/2 h-[2px] w-full origin-left bg-alert"
                  aria-hidden="true"
                />
              </p>
              <motion.p
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20% 0px" }}
                transition={{ delay: 0.7 + i * 0.05, duration: 0.6 }}
                className="font-display text-2xl text-paper md:text-4xl"
              >
                <span className="mr-3 text-accent">→</span>
                {after}
              </motion.p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** 7 — manifesto em tela cheia. */
export function Manifesto() {
  return (
    <section className="flex items-center overflow-hidden border-y border-line bg-ink py-20 md:min-h-[90dvh] md:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
        <motion.div {...reveal}>
          <Shout>Menos você.</Shout>
        </motion.div>
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.2 }}>
          <Shout className="mt-2">
            Mais <span className="text-accent">escritório.</span>
          </Shout>
        </motion.div>
        <motion.p
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.4 }}
          className="mt-10 max-w-xl text-lg leading-relaxed text-paper/70"
        >
          O objetivo não é trabalhar mais rápido. É o escritório funcionar sem
          depender de você para cada detalhe.
        </motion.p>
      </div>
    </section>
  );
}

/** 9 — controle: a responsabilidade continua com o advogado. */
export function Control() {
  return (
    <section id="controle" className="border-y border-line bg-surface py-16 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div {...reveal}>
          <Shout size="md">A IA não assina nada.</Shout>
          <Shout size="md" className="mt-2">
            <span className="text-accent">Você assina.</span>
          </Shout>
        </motion.div>
        <div className="mt-8 grid gap-6 text-lg md:mt-12 leading-relaxed text-paper/70 md:grid-cols-2 md:gap-16">
          <p>
            Ela organiza e prepara. Você revisa e aprova. A análise jurídica e a
            responsabilidade profissional continuam com você.
          </p>
          <p className="border-l-2 border-accent pl-6">
            Dado de cliente só entra em ferramenta compatível com o sigilo
            profissional. Comece por um processo, teste e só depois amplie.
          </p>
        </div>
        <div className="mt-8 md:mt-12">
          <Cta />
        </div>
      </div>
    </section>
  );
}
