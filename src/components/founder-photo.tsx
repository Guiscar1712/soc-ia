"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Cta, Eyebrow } from "@/components/ui";
import { assets } from "@/lib/assets";

export function FounderPhoto() {
  return (
    <section id="nathalia" className="bg-background py-16 md:py-32">
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
          <Eyebrow>Quem está por trás · Nathalia Fava</Eyebrow>
          <h2 className="font-display text-4xl leading-[1.05] tracking-[-0.025em] text-paper text-balance md:text-6xl">
            Tudo começa num <span className="text-accent">ponto.</span>
          </h2>
          <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-paper/70">
            <p>
              Criei a Caixa Preta para advogados que estão cansados de ser o
              processo do próprio escritório.
            </p>
            <p>
              Não é curso de tecnologia. É o jeito de trabalhar do escritório
              colocado em POPs, cargos, roteiros e instruções que a IA consegue
              seguir.
            </p>
            <p className="font-display text-xl text-paper">
              Você não precisa virar especialista em IA. Precisa parar de
              carregar tudo sozinho.
            </p>
          </div>
          <div className="mt-9 flex flex-col items-start gap-4">
            <Cta />
            <a
              href="/links"
              className="text-sm text-paper/60 underline decoration-paper/25 underline-offset-4 transition hover:text-paper hover:decoration-paper"
            >
              Linktree
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
