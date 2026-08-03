"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";

const BULLETS = [
  "Processos prontos para adaptar",
  "Ferramentas de gestão editáveis",
  "Agentes de IA configurados para o jurídico",
  "Sem depender só de você",
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduceMotion === true) {
      video.pause();
      video.currentTime = 0;
      return;
    }
    void video.play().catch(() => {});
  }, [reduceMotion]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] w-full flex-col justify-end overflow-hidden bg-ink"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <video
          ref={videoRef}
          src="/caixa-preta-clean.mp4"
          className="absolute inset-0 h-full w-full object-cover object-center"
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/45 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pt-28 md:pt-32 pb-14 md:pb-20">
        <div className="max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-bronze-2 mb-6 md:mb-8">
            Caixa Preta SÓC.IA
          </div>

          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduceMotion === true
                ? { duration: 0 }
                : { duration: 0.6, ease }
            }
            className="font-serif text-[2.5rem] sm:text-5xl md:text-[4rem] lg:text-[4.75rem] leading-[1.02] tracking-[-0.02em] text-paper text-balance"
          >
            A operação do escritório não precisa viver na cabeça da sócia.
          </motion.h1>

          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduceMotion === true
                ? { duration: 0 }
                : { duration: 0.6, delay: 0.15, ease }
            }
            className="mt-6 md:mt-8 max-w-xl text-lg leading-relaxed text-paper/75"
          >
            Processos, ferramentas e agentes prontos para adaptar e aplicar no
            seu escritório. Sem aulas, sem consultoria cara, sem começar do
            zero.
          </motion.p>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduceMotion === true
                ? { duration: 0 }
                : { duration: 0.6, delay: 0.3, ease }
            }
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <a
              href="#oferta"
              className="group inline-flex items-center gap-2 h-12 px-6 text-sm font-medium text-accent-fg bg-accent rounded-full hover:brightness-110 transition active:scale-[0.98]"
            >
              Quero abrir a Caixa Preta agora
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                weight="regular"
              />
            </a>
            <a
              href="#o-que-e"
              className="text-sm text-paper/70 hover:text-paper underline underline-offset-4 decoration-paper/25 hover:decoration-paper transition"
            >
              Saber mais sobre o método
            </a>
          </motion.div>
        </div>

        <div className="mt-16 md:mt-24 border-t border-line pt-8 md:pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-8">
          {BULLETS.map((item, i) => (
            <div
              key={item}
              className="flex items-baseline gap-4 text-[14px] leading-snug text-paper/85"
            >
              <span className="font-mono text-[11px] text-accent tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
