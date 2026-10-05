"use client";

import { motion } from "motion/react";
import { Cta, Shout } from "@/components/ui";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-15% 0px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
} as const;

/** A responsabilidade continua com o advogado, no formato do bloco anterior. */
export function Control() {
  return (
    <section id="controle" className="border-y border-line bg-surface py-16 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div {...reveal}>
          <Shout size="md">A IA prepara.</Shout>
          <Shout size="md" className="mt-2">
            Quem confere <span className="text-accent">é você.</span>
          </Shout>
        </motion.div>
        <div className="mt-8 grid gap-6 text-lg leading-relaxed text-paper/70 md:mt-12 md:grid-cols-2 md:gap-16">
          <p>
            As skills montam o rascunho, organizam o caso e apontam o que está faltando.
            A análise jurídica, a decisão e a assinatura continuam com você, como
            sempre foi.
          </p>
          <div className="space-y-6 border-l-2 border-accent pl-6">
            <p>
              Elas não inventam artigo nem jurisprudência: trabalham com o que você
              fornece e com o que busca em fonte oficial.
            </p>
            <p>
              E o sigilo vem primeiro. O guia de início mostra como usar sem expor
              dado de cliente.
            </p>
          </div>
        </div>
        <div className="mt-8 md:mt-12">
          <Cta />
        </div>
      </div>
    </section>
  );
}

const SKILL_STEPS = [
  "Solicite os documentos.",
  "Colete as informações.",
  "Identifique as lacunas.",
  "Faça o resumo para revisão.",
];

/** Skill explicada para quem não é de tecnologia. */
export function Explain() {
  return (
    <section id="como-funciona" className="bg-background py-16 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-12 md:gap-16 md:px-12">
        <motion.div {...reveal} className="md:col-span-6">
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
        </motion.div>

        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.15 }} className="md:col-span-6">
          <div className="rounded-[var(--radius-card)] border-[0.5pt] border-line bg-background p-7 md:p-9">
            <div className="flex items-center justify-between gap-4 border-b-[0.5pt] border-line pb-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Skill · exemplo</p>
              <p className="font-mono text-[11px] text-paper/40">checklist-de-documentos</p>
            </div>
            <h3 className="mt-6 font-display text-2xl text-paper">Quando entrar um caso novo:</h3>
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
            <p className="mt-8 border-t-[0.5pt] border-line pt-5 font-display text-lg text-paper">
              Você explica uma vez. A IA faz igual toda vez.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const FOR_YOU = [
  "é dona ou sócia de escritório e tudo ainda passa por você;",
  "já usa o Claude, ou quer começar, e não sabe por onde;",
  "quer padronizar o escritório sem montar tudo do zero.",
];

function CheckMark() {
  return (
    <svg viewBox="0 0 16 16" className="mt-1.5 h-4 w-4 shrink-0 text-accent" fill="none" aria-hidden="true">
      <path d="M3 8.5 6.2 12 13 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Para quem a Caixa Preta SÓC.IA serve, e para quem não serve. */
export function ForWhom() {
  return (
    <section id="para-quem" className="bg-background px-6 pt-16 pb-8 md:px-12 md:pt-28 md:pb-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid border-y-[0.5pt] border-line md:grid-cols-2">
          <div className="py-8 md:py-12 md:pr-12">
            <h2 className="font-display text-3xl leading-tight text-paper md:text-5xl">É para você se:</h2>
            <ul className="mt-8">
              {FOR_YOU.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 border-t-[0.5pt] border-line py-5 text-[1.24rem] leading-relaxed text-paper/85 first:border-t-0"
                >
                  <CheckMark />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t-[0.5pt] border-line py-8 md:border-t-0 md:border-l-[0.5pt] md:py-12 md:pl-12">
            <h2 className="font-display text-3xl leading-tight text-muted md:text-5xl">Não é para você se:</h2>
            <ul className="mt-8">
              <li className="flex gap-4 border-t-[0.5pt] border-line py-5 text-[1.24rem] leading-relaxed text-muted first:border-t-0">
                <span className="mt-[0.7em] h-px w-3 shrink-0 bg-muted" aria-hidden="true" />
                <span>procura uma IA que faça tudo sem você revisar;</span>
              </li>
              <li className="flex gap-4 border-t-[0.5pt] border-line py-5 text-[1.24rem] leading-relaxed text-muted">
                <span className="mt-[0.7em] h-px w-3 shrink-0 bg-muted" aria-hidden="true" />
                <span>
                  quer que alguém monte tudo no seu Claude por você. Para isso existe a{" "}
                  <a
                    href="/links"
                    className="underline decoration-accent decoration-[0.5pt] underline-offset-[5px]"
                  >
                    Implementação SÓC.IA
                  </a>
                  .
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
