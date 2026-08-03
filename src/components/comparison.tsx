"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const ROWS: { feature: string; antes: string; depois: string }[] = [
  {
    feature: "Materiais e processos",
    antes: "Espalhados e só na cabeça da sócia",
    depois: "Prontos para adaptar e aplicar",
  },
  {
    feature: "Uso de IA",
    antes: "Improvisado, prompts soltos",
    depois: "Métodos padronizados e agentes configurados",
  },
  {
    feature: "Autonomia da equipe",
    antes: "Dependência total de você",
    depois: "Padrão claro, menos interrupção",
  },
  {
    feature: "Rotina virando método",
    antes: "Difícil de transformar e documentar",
    depois: "Escritório que roda com padrão",
  },
];

export function Comparison() {
  return (
    <section id="antes-depois" className="w-full bg-surface py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted mb-6">
          Antes / depois
        </div>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-paper max-w-3xl text-balance">
          O escritório antes da Caixa Preta e depois dela.
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mt-12 md:mt-16 overflow-x-auto rounded-2xl border border-line bg-surface"
        >
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="p-4 md:p-6 text-[11px] uppercase tracking-[0.22em] text-muted font-normal w-[22%]">
                  Ponto
                </th>
                <th className="p-4 md:p-6 text-[11px] uppercase tracking-[0.22em] text-muted font-normal w-[39%]">
                  Antes
                </th>
                <th className="p-4 md:p-6 text-[11px] uppercase tracking-[0.22em] text-accent font-normal w-[39%] bg-accent/5">
                  Depois
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={row.feature}
                  className={cn(
                    "align-top",
                    i < ROWS.length - 1 && "border-b border-line"
                  )}
                >
                  <td className="p-4 md:p-6 font-serif text-lg md:text-xl text-paper leading-tight">
                    {row.feature}
                  </td>
                  <td className="p-4 md:p-6 text-[15px] leading-relaxed text-paper/45 line-through decoration-paper/20">
                    {row.antes}
                  </td>
                  <td className="p-4 md:p-6 text-[15px] leading-relaxed text-paper bg-accent/5">
                    {row.depois}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
