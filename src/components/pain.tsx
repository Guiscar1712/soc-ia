"use client";

import * as React from "react";
import { HTMLMotionProps, motion } from "motion/react";
import { cn } from "@/lib/utils";

interface CardStickyProps extends HTMLMotionProps<"div"> {
  index: number;
  incrementY?: number;
}

const ContainerScroll = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("relative w-full", className)} {...props}>
      {children}
    </div>
  );
});
ContainerScroll.displayName = "ContainerScroll";

const CardSticky = React.forwardRef<HTMLDivElement, CardStickyProps>(
  ({ index, incrementY = 16, children, className, style, ...props }, ref) => {
    const y = 96 + index * incrementY;
    return (
      <motion.div
        ref={ref}
        layout="position"
        style={{ top: y, ...style }}
        className={cn("sticky", className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
CardSticky.displayName = "CardSticky";

const ROLES = [
  {
    title: "Tudo passa por você",
    body: "A equipe espera sua confirmação, sua revisão e sua decisão para praticamente tudo.",
  },
  {
    title: "Você revisa e controla cada detalhe",
    body: "Nenhuma entrega parece segura sem o seu olhar, e a fila só aumenta.",
  },
  {
    title: "Você repete as mesmas orientações",
    body: "As instruções se perdem em mensagens, reuniões e conversas que precisam acontecer de novo.",
  },
  {
    title: "O escritório cresce, mas o caos cresce junto",
    body: "Mais clientes aumentam o faturamento, mas também aumentam a sobrecarga e a desorganização.",
  },
];

export function Pain() {
  return (
    <section
      id="dor"
      className="w-full bg-background pt-24 md:pt-32 pb-8 md:pb-16"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-paper text-balance">
            O seu escritório cresceu. A operação acompanhou?
          </h2>
          <p className="mt-6 text-lg text-paper/60 max-w-2xl">
            Quando processos, decisões e orientações vivem apenas na cabeça da
            sócia, o escritório até funciona, mas funciona com dependência,
            interrupções e retrabalho.
          </p>
        </div>

        <ContainerScroll className="min-h-[160vh] md:min-h-[180vh]">
          {ROLES.map((role, index) => (
            <CardSticky key={role.title} index={index} className="mb-6">
              <div
                className={cn(
                  "rounded-2xl border border-line p-8 md:p-12 min-h-[220px] md:min-h-[280px] flex flex-col justify-between",
                  index % 2 === 0 ? "bg-surface" : "bg-surface-2"
                )}
              >
                <div className="text-[11px] font-mono tracking-widest text-muted">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(ROLES.length).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-serif text-3xl md:text-5xl leading-[1.05] tracking-[-0.02em] text-paper max-w-xl">
                    {role.title}
                  </h3>
                  <p className="mt-6 text-base md:text-lg text-paper/65 max-w-lg leading-relaxed">
                    {role.body}
                  </p>
                </div>
              </div>
            </CardSticky>
          ))}
        </ContainerScroll>

        <p className="mt-20 md:mt-28 max-w-3xl font-serif text-2xl md:text-4xl leading-[1.15] tracking-[-0.015em] text-paper">
          O problema não é apenas falta de tempo. É uma operação que ainda
          depende demais de você.
        </p>
      </div>
    </section>
  );
}
