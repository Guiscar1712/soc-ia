import type { ReactNode } from "react";
import { WaitlistCard } from "@/components/ui";

const SKILLS = [
  ["Contrato e Procuração", "monta o contrato de honorários e a procuração a partir dos dados do cliente."],
  ["Checklist de Documentos", "monta a lista de documentos de cada ação, escreve a mensagem, cobra o que falta e confere o que chegou."],
  ["Pesquisa de Legislação", "busca a lei na fonte oficial, confere a vigência e entrega o texto com o link."],
  ["Petição Inicial", "organiza os fatos, aponta o que falta e monta a inicial."],
  ["Revisão de Peças", "confere a peça antes do protocolo e aponta o que corrigir."],
  ["Comunicação Humana", "tira a cara de IA de peças e textos e escreve para o cliente em linguagem simples."],
  ["Criador de POP", "transforma o jeito que o escritório faz algo em procedimento escrito, em PDF."],
];

const FOLDERS: { n: string; name: string; body: ReactNode }[] = [
  {
    n: "01",
    name: "Comece aqui",
    body: (
      <p>Guia de início: plano, instalação, ordem de uso, sigilo e revisão humana.</p>
    ),
  },
  {
    n: "02",
    name: "Skills",
    body: (
      <>
        <p>7 skills do Claude, cada uma com o passo a passo de instalação.</p>
        <ol className="mt-4">
          {SKILLS.map(([name, line], i) => (
            <li key={name} className="grid grid-cols-[1.25rem_1fr] gap-3 border-t-[0.5pt] border-line py-3">
              <span className="font-mono text-xs text-accent">{i + 1}</span>
              <p>
                <span className="text-paper">{name}: </span>
                <span>{line}</span>
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm">
          A skill Pesquisa de Legislação precisa da busca na web ligada no Claude.
        </p>
      </>
    ),
  },
  {
    n: "03",
    name: "Modelos",
    body: (
      <p>
        5 POPs (Contrato e Procuração, Documentos da Ação, Elaboração da Inicial,
        Revisão e Protocolo, Comunicação com o Cliente), checklist-base de
        documentos e dicionário do cliente. Em Word editável e PDF.
      </p>
    ),
  },
  {
    n: "04",
    name: "Gestão e Equipe",
    body: <p>Guia de Estruturação de Cargos e 4 modelos de referência.</p>,
  },
];

/** O que a pessoa baixa, desenhado como a árvore do arquivo. */
export function InTheBox() {
  return (
    <section id="caixa" className="bg-background px-6 py-16 md:px-12 md:py-28">
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.75fr)] lg:gap-16">
        <div className="min-w-0">
          <h2 className="max-w-3xl font-display text-4xl leading-[1.05] tracking-[-0.025em] text-paper text-balance md:text-6xl">
            Você compra e recebe o acesso para baixar tudo na hora.
          </h2>
          <p className="mt-6 max-w-xl font-display text-2xl leading-snug text-paper/90">
            Você instala sozinha, no seu ritmo.
          </p>

          <div className="mt-12 border-y-[0.5pt] border-line">
            {FOLDERS.map((folder) => (
              <details key={folder.n} className="group border-b-[0.5pt] border-line last:border-b-0">
                <summary className="flex min-h-12 cursor-pointer list-none items-center gap-4 py-5 marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-xs text-accent">{folder.n}</span>
                  <span className="font-display text-2xl text-paper">{folder.name}</span>
                  <span className="ml-auto font-mono text-lg leading-none text-accent group-open:hidden" aria-hidden="true">
                    +
                  </span>
                  <span className="ml-auto hidden font-mono text-lg leading-none text-accent group-open:inline" aria-hidden="true">
                    −
                  </span>
                </summary>
                <div className="pb-6 pl-8 text-base leading-relaxed text-muted">{folder.body}</div>
              </details>
            ))}
          </div>
        </div>

        <WaitlistCard />
      </div>
    </section>
  );
}
