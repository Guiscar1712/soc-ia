"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { assets } from "@/lib/assets";

const BULLETS = [
  {
    title: "Procedimentos prontos para adaptar",
    body: "Use como base processos que já foram estruturados e aplicados na rotina de um escritório.",
  },
  {
    title: "Ferramentas de gestão editáveis",
    body: "Organize equipe, funções, reuniões, atendimento e operação sem criar tudo do zero.",
  },
  {
    title: "Métodos de gestão e skills",
    body: "Aplique formas de criar processos, estruturar a equipe e conduzir a rotina do escritório.",
  },
  {
    title: "Menos operação presa em você",
    body: "Transforme conhecimento solto em padrão, rotina e estrutura para o escritório.",
  },
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

    const tryPlay = () => {
      void video.play().catch(() => {});
    };

    tryPlay();
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("loadeddata", tryPlay);
    return () => {
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("loadeddata", tryPlay);
    };
  }, [reduceMotion]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] w-full flex-col justify-end overflow-hidden bg-ink"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <video
          ref={videoRef}
          src={assets.heroVideo}
          poster={assets.heroPoster}
          className="absolute inset-0 h-full w-full scale-105 object-cover object-[center_40%]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 pt-28 md:pt-32 pb-14 md:pb-20">
        <div className="max-w-3xl">
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduceMotion === true
                ? { duration: 0 }
                : { duration: 0.6, ease }
            }
            className="font-display text-[2.5rem] sm:text-5xl md:text-[4rem] lg:text-[4.75rem] leading-[1.02] tracking-[-0.02em] text-paper text-balance"
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
            className="mt-6 md:mt-8 max-w-2xl text-lg font-light leading-[1.6] text-paper/75"
          >
            Tenha acesso aos procedimentos, ferramentas editáveis, métodos de
            gestão e skills desenvolvidos a partir da operação de um escritório real,
            prontos para adaptar, organizar e aplicar na sua rotina. Sem aulas,
            sem consultoria individual e sem começar do zero.
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
              className="group inline-flex items-center gap-2 h-12 px-6 text-sm font-medium text-accent-fg bg-accent rounded-[var(--radius-btn)] hover:bg-bronze-2 transition active:scale-[0.98]"
            >
              Quero abrir a Caixa Preta
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                weight="regular"
              />
            </a>
            <a
              href="#stack"
              className="text-sm text-paper/70 hover:text-paper underline underline-offset-4 decoration-paper/25 hover:decoration-paper transition"
            >
              Ver o que tem dentro
            </a>
          </motion.div>
        </div>

        <div className="mt-16 md:mt-24 border-t border-line pt-8 md:pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-8">
          {BULLETS.map((item, i) => (
            <div key={item.title} className="flex items-start gap-4">
              <span className="font-mono text-[11px] text-accent tabular-nums mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="text-[14px] leading-snug text-paper/90">
                  {item.title}
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-paper/55">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
