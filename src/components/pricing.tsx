"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { assets } from "@/lib/assets";

const FEATURE_GROUPS = [
  {
    title: "Procedimentos e ferramentas",
    items: [
      "Processos internos (fluxos, POP, checklists)",
      "Gestão e equipe (cargos, reunião, feedback)",
      "Comercial e organização (atendimento, leads, metas)",
      "Modelos editáveis para adaptar à sua realidade",
    ],
  },
  {
    title: "Agentes SÓC.IA",
    items: [
      "Agente Criador de Processos",
      "Agente de Estruturação de Equipe",
      "Agente de Gestão de Escritório",
      "Prompts e skills prontos para o jurídico",
    ],
  },
];

export function Pricing() {
  return (
    <section id="oferta" className="w-full bg-surface py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted mb-6">
          Oferta
        </div>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-paper max-w-3xl text-balance">
          Tudo isso por um valor de entrada.
        </h2>
        <p className="mt-6 max-w-xl text-lg text-paper/60">
          Processos, ferramentas e os três agentes de IA. Pagamento único.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mt-14 md:mt-20 rounded-2xl border border-line bg-background/50 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 p-8 md:p-10 lg:p-12">
            <div className="lg:col-span-5">
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted">
                Pack completo
              </div>
              <div className="mt-2 font-serif text-4xl md:text-5xl text-paper leading-tight">
                Caixa Preta SÓC.IA
              </div>

              <div className="mt-10 flex items-baseline gap-3">
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted">
                  R$
                </span>
                <span className="font-serif text-7xl md:text-8xl leading-none tracking-[-0.03em] text-paper tabular-nums">
                  79,90
                </span>
              </div>
              <div className="mt-3 text-sm text-paper/50">
                Pagamento único. Acesso imediato.
              </div>

              <div className="mt-8 flex items-center gap-3">
                <div className="relative h-11 w-11 overflow-hidden rounded-full border border-line shrink-0">
                  <Image
                    src={assets.nathaliaCard}
                    alt=""
                    fill
                    sizes="44px"
                    quality={85}
                    className="object-cover object-[center_20%]"
                  />
                </div>
                <div className="text-sm leading-snug">
                  <div className="text-paper/90 font-medium">
                    Criado por Nathalia Fava
                  </div>
                  <div className="text-muted text-[13px]">
                    Fundadora da SÓC.IA
                  </div>
                </div>
              </div>

              <a
                href="#oferta"
                className="group mt-8 inline-flex items-center gap-2 h-12 px-6 text-sm font-medium text-accent-fg bg-accent rounded-full hover:brightness-110 transition active:scale-[0.98]"
              >
                Quero minha Caixa Preta
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  weight="regular"
                />
              </a>
            </div>

            <div className="lg:col-span-7 lg:border-l lg:border-line lg:pl-12">
              <div className="space-y-10">
                {FEATURE_GROUPS.map((group) => (
                  <div key={group.title}>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-muted mb-5">
                      {group.title}
                    </div>
                    <ul>
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-baseline gap-4 border-b border-line py-4 last:border-b-0"
                        >
                          <span className="font-mono text-[11px] text-accent tabular-nums shrink-0">
                            ·
                          </span>
                          <span className="text-[15px] leading-snug text-paper/85">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
