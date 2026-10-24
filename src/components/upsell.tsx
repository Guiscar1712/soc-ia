"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { PriceBox } from "@/components/story-sections";
import { SKILLS } from "@/components/box-carousel";
import { Cta, Eyebrow, Price } from "@/components/ui";

export interface UpsellLinks {
  checkout: string;
  /** Página de acesso à gratuita; sem ela o link secundário não aparece. */
  freeSkill?: string;
}

const FROM = "R$ 147";
const VALUE = "R$ 67";

const ease = [0.22, 1, 0.36, 1] as const;

/** Entrada ao rolar, igual às outras seções do site. */
const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-15% 0px" },
  transition: { duration: 0.7, ease },
} as const;

/** Itens de lista entrando um depois do outro. */
const item = (i: number) =>
  ({
    initial: { opacity: 0, x: -12 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { delay: 0.15 + i * 0.06, duration: 0.5, ease },
  }) as const;

const STEPS = ["Instale seguindo o guia", "Ajuste as instruções ao seu padrão", "Informe os dados do caso e revise o resultado"];

/** Topo da oferta. `confirmFreeSkill` mostra a confirmação de envio da página pós-cadastro. */
export function UpsellHero({
  checkout,
  confirmFreeSkill = true,
}: Pick<UpsellLinks, "checkout"> & { confirmFreeSkill?: boolean }) {
  const reduce = useReducedMotion();
  const enter = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease } };
  return (
    <section id="top" className="relative overflow-hidden bg-background px-6 pb-14 pt-28 md:px-12 md:pb-24 md:pt-36">
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <motion.div {...enter(0)}>
            {confirmFreeSkill && <Eyebrow>Sua skill gratuita está a caminho do seu e-mail</Eyebrow>}
            <h1 className="font-display text-[2.6rem] leading-[1.02] tracking-[-0.03em] text-paper text-balance sm:text-6xl lg:text-[4.75rem]">
              {confirmFreeSkill ? "Agora, leve" : "Leve"} a Caixa Preta completa por <span className="text-accent">R$ 67</span>
            </h1>
          </motion.div>
          <motion.p {...enter(0.12)} className="mt-7 max-w-xl text-lg leading-relaxed text-paper/80">
            Tenha 7 skills para preparar contratos, organizar documentos, revisar peças e padronizar
            tarefas do escritório, com guias para instalar e usar.
          </motion.p>
          <motion.div {...enter(0.24)}>
            <Price className="mt-8" from={FROM} value={VALUE} />
            <Cta href={checkout} className="mt-6 w-full sm:w-auto">
              Quero minha Caixa Preta por R$ 67
            </Cta>
            {confirmFreeSkill && (
              <p className="mt-5 max-w-md text-sm font-normal leading-relaxed text-paper/60">
                Seu material gratuito já está liberado. A compra é opcional.
              </p>
            )}
          </motion.div>
        </div>
        <div className="hidden justify-center md:col-span-5 md:flex">
          <PriceBox className="w-64 lg:w-80" />
        </div>
      </div>
    </section>
  );
}

/** As 7 skills e os materiais que acompanham. */
export function UpsellIncluded() {
  return (
    <section id="caixa" className="border-t border-line bg-background px-6 py-14 md:px-12 md:py-28">
      <motion.div {...reveal} className="mx-auto max-w-5xl">
        <Eyebrow>O que você recebe</Eyebrow>
        <h2 className="max-w-3xl font-display text-4xl leading-[1.05] tracking-[-0.025em] text-paper text-balance md:text-6xl">
          Uma ferramenta para cada tarefa que <span className="text-accent">se repete</span>
        </h2>
        <ul className="mt-10 grid gap-x-10 border-y-[0.5pt] border-line sm:grid-cols-2">
          {SKILLS.map(([name], i) => (
            <motion.li key={name} {...item(i)} className="flex items-baseline gap-4 border-b-[0.5pt] border-line py-4 last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0">
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-xl text-paper md:text-2xl">{name}</span>
            </motion.li>
          ))}
        </ul>
        <p className="mt-6 text-base leading-relaxed text-paper/75 md:text-lg">Cada skill acompanha arquivo de instalação e guia de uso.</p>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Também estão incluídos: Guia de início, Mapa do caso, Manual do Claude, 30 prompts, Primeiro projeto no
          Claude e 5 POPs de exemplo.
        </p>
      </motion.div>
    </section>
  );
}

/** Como usar em 3 passos. */
export function UpsellHowTo() {
  return (
    <section id="como-usar" className="bg-surface px-6 py-14 md:px-12 md:py-24">
      <motion.div {...reveal} className="mx-auto max-w-5xl">
        <Eyebrow>Como usar</Eyebrow>
        <h2 className="max-w-3xl font-display text-4xl leading-[1.05] tracking-[-0.025em] text-paper text-balance md:text-6xl">
          Adapte ao seu escritório. Reutilize no <span className="text-accent">próximo caso</span>
        </h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3 md:gap-10">
          {STEPS.map((step, i) => (
            <motion.li key={step} {...item(i)} className="flex gap-4 border-t-[0.5pt] border-line pt-5">
              <span className="mt-1 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-xl leading-snug text-paper md:text-2xl">{step}</span>
            </motion.li>
          ))}
        </ol>
        <p className="mt-8 text-base leading-relaxed text-paper/70 md:text-lg">
          Você aplica no seu ritmo, começando pela tarefa que mais se repete.
        </p>
      </motion.div>
    </section>
  );
}

/** Cartão da oferta com o link secundário para quem prefere começar pela gratuita. */
export function UpsellOffer({ checkout, freeSkill }: UpsellLinks) {
  return (
    <section id="oferta" className="border-t border-line bg-background px-6 py-14 md:px-12 md:py-28">
      <motion.div {...reveal} className="mx-auto max-w-xl text-center">
        <h2 className="font-display text-4xl leading-[1.05] tracking-[-0.025em] text-paper text-balance md:text-5xl">
          R$ 80 de desconto para dar o <span className="text-accent">próximo passo</span>
        </h2>
        <div className="mt-10 rounded-[var(--radius-card)] border-[0.5pt] border-accent bg-surface p-6 md:p-8">
          <div className="flex flex-col items-center">
            <PriceBox className="w-28 md:w-36" />
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.23em] text-accent md:text-sm">Caixa Preta SÓC.IA</p>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-paper/60 md:text-sm">
              de <s className="decoration-paper/50">{FROM}</s> por
            </p>
            <p className="mt-2 font-display text-7xl leading-none tracking-[-0.03em] text-paper md:text-8xl">{VALUE}</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-paper/75 md:text-sm">pagamento único</p>
          </div>
          <Cta href={checkout} className="mt-7 w-full">
            Quero a Caixa Preta por R$ 67
          </Cta>
          {freeSkill && (
            <a
              href={freeSkill}
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-paper/70 underline decoration-paper/30 underline-offset-4 transition hover:text-paper hover:decoration-paper"
            >
              Vou começar pela skill gratuita
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          <p className="mt-6 text-xs font-normal leading-relaxed text-paper/60">
            Materiais digitais. Requer Claude ou ChatGPT, conforme o guia. Assinaturas, aulas, configuração
            individual e acompanhamento não estão incluídos. Revise os resultados antes de usar.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

/** Chamada final. */
export function UpsellFinal({ checkout }: Pick<UpsellLinks, "checkout">) {
  return (
    <section className="border-t border-line bg-surface px-6 py-14 md:px-12 md:py-28">
      <motion.div {...reveal} className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-4xl leading-[1.05] tracking-[-0.025em] text-paper text-balance md:text-6xl">
          Comece com uma skill. Tenha as outras <span className="text-accent">à disposição</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-paper/75">
          Leve a Caixa Preta completa por R$ 67 e aplique conforme precisar.
        </p>
        <Price className="mt-8 justify-center" from={FROM} value={VALUE} />
        <div className="mt-8">
          <Cta href={checkout}>Quero aproveitar os R$ 80 de desconto</Cta>
        </div>
      </motion.div>
    </section>
  );
}
