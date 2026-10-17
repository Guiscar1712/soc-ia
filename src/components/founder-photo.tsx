"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Eyebrow } from "@/components/ui";
import { assets } from "@/lib/assets";

/** Quem criou; sem props usa a copy da página principal. */
export function FounderPhoto({
  title = (
    <>
      Eu também tenho escritório e <span className="text-accent">cliente esperando.</span>
    </>
  ),
  paragraphs = [
    "Sou Nathalia Fava, advogada e empresária. No Fava & Vitorino, gestão e IA fazem parte da operação.",
    "A Caixa Preta reúne ferramentas e processos construídos a partir dessa experiência para você adaptar ao seu escritório.",
  ],
}: {
  title?: React.ReactNode;
  paragraphs?: string[];
} = {}) {
  return (
    <section id="nathalia" className="bg-background py-12 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 md:grid-cols-12 md:gap-16 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-square w-full max-w-md overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface md:col-span-5"
        >
          <Image
            src={assets.nathaliaPortrait}
            alt="Nathalia Fava, fundadora da SÓC.IA"
            fill
            sizes="(min-width: 768px) 42vw, 100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="md:col-span-7">
          <Eyebrow>Quem criou</Eyebrow>
          <h2 className="font-display text-4xl leading-[1.05] tracking-[-0.025em] text-paper text-balance md:text-6xl">
            {title}
          </h2>
          <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-paper/70">
            {paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
