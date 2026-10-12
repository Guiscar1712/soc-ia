"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-15% 0px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
} as const;

const STEPS = [
  "Instale a ferramenta seguindo o guia.",
  "Informe o contexto e o padrão do seu escritório.",
  "Confira o resultado e faça os ajustes.",
  "Salve o padrão conforme o guia para reutilizar.",
];

/** A caixa entra subindo e girando com a rolagem, depois flutua de leve. */
function BoxImage() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-9, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { y, rotate, scale, opacity }}
      className="relative mx-auto aspect-[1122/1402] w-full max-w-sm md:col-span-5 md:max-w-none"
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -12, 0], rotate: [0, 0.8, 0] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
        className="absolute inset-0"
      >
        <Image
          src="/images/caixa-preta-box.webp"
          alt="Caixa Preta SÓC.IA aberta com o guia de boas-vindas, o guia do primeiro projeto, um POP e um contrato"
          fill
          sizes="(min-width: 768px) 40vw, 90vw"
          className="object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]"
        />
      </motion.div>
    </motion.div>
  );
}

/** A caixa do cartão de preço: entra quicando, flutua e brilha por trás. */
export function PriceBox({ className = "w-40 md:w-48" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.8, rotate: -8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ type: "spring", stiffness: 140, damping: 14 }}
      whileHover={reduce ? undefined : { scale: 1.06, rotate: 2 }}
      className={`relative aspect-[1122/1402] shrink-0 ${className}`}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-[15%] rounded-full bg-accent/40 blur-3xl"
        animate={reduce ? undefined : { opacity: [0.35, 0.75, 0.35], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-0"
        animate={reduce ? undefined : { y: [0, -10, 0], rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
      >
        <Image
          src="/images/caixa-preta-box.webp"
          alt=""
          fill
          sizes="12rem"
          className="object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]"
        />
      </motion.div>
    </motion.div>
  );
}

/** Como o padrão sai da cabeça e vira referência, em quatro passos. */
export function Explain() {
  return (
    <section id="como-funciona" className="bg-background py-12 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-12 md:gap-16 md:px-12">
        <BoxImage />

        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.15 }}
          className="md:col-span-7 md:self-center"
        >
          <h2 className="font-display text-4xl leading-[1.05] tracking-[-0.025em] text-paper text-balance md:text-6xl">
            Você conduz a configuração e revisa <span className="text-accent">cada entrega.</span>
          </h2>
          <div className="mt-10 rounded-[var(--radius-card)] border-[0.5pt] border-line bg-background p-7 md:p-9">
            <div className="flex items-center justify-between gap-4 border-b-[0.5pt] border-line pb-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Como funciona</p>
            </div>
            <ol className="mt-6 space-y-4">
              {STEPS.map((step, i) => (
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
