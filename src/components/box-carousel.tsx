import { Fragment, type ReactNode } from "react";
import { Accordion } from "@/components/accordion";
import { Buy } from "@/components/ui";

export const SKILLS = [
  ["Contrato e Procuração", "defina o padrão do escritório e prepare minutas de contrato de honorários e procuração para revisão."],
  ["Checklist de Documentos", "monte a lista para o caso e prepare a solicitação ao cliente. Você confere e envia."],
  ["Pesquisa de Legislação", "busque dispositivos em fontes oficiais e receba links para conferir a redação e a vigência."],
  ["Revisão de Peças", "identifique lacunas e inconsistências, com apontamentos por gravidade e sugestões de correção."],
  ["Comunicação Humana", "prepare explicações ao cliente em linguagem simples e ajuste a redação dos seus textos."],
  ["Criador de POP", "transforme uma rotina em procedimento com responsáveis, etapas e pontos de controle."],
];

const MATERIALS = [
  "Mapa do caso para visualizar a jornada e onde usar cada ferramenta.",
  "Manual do Claude para o escritório, com orientações de uso e cuidados com dados.",
  "30 prompts para copiar e adaptar a tarefas complementares.",
  "Como criar seu primeiro projeto, com 5 POPs de exemplo, com prompts de adaptação.",
];

function List({ items }: { items: ReactNode[] }) {
  return (
    <ol className="mt-4">
      {items.map((item, i) => (
        <li key={i} className="grid grid-cols-[1.25rem_1fr] gap-3 border-t-[0.5pt] border-line py-3">
          <span className="font-mono text-xs text-accent">{i + 1}</span>
          <p>{item}</p>
        </li>
      ))}
    </ol>
  );
}

const MODULES: { n: string; name: string; body: ReactNode }[] = [
  {
    n: "01",
    name: "Comece aqui",
    body: (
      <p>
        Boas-vindas e Guia de início para configurar os recursos, instalar a primeira
        ferramenta e conferir os resultados.
      </p>
    ),
  },
  {
    n: "02",
    name: "Ferramentas para a rotina",
    body: (
      <>
        <List
          items={SKILLS.map(([name, line]) => (
            <span key={name}>
              <span className="text-paper">{name}: </span>
              {line}
            </span>
          ))}
        />
        <p className="mt-4 text-sm font-normal">Revise os documentos, fatos e referências antes de usar.</p>
      </>
    ),
  },
  {
    n: "03",
    name: "Materiais para aplicar",
    body: (
      <>
        <List items={MATERIALS} />
        <p className="mt-4">
          Os POPs cobrem abertura de caso novo, documentos da ação, controle de
          prazos, revisão e protocolo de peças e caso protocolado.
        </p>
        <p className="mt-4 text-sm font-normal">
          Adapte os exemplos à equipe ou à sua rotina de trabalho individual.
        </p>
      </>
    ),
  },
];

/** O conteúdo da Caixa Preta, módulo a módulo. */
export function InTheBox() {
  return (
    <section id="caixa" className="bg-background px-6 py-12 md:px-12 md:py-28">
      <div className="mx-auto max-w-4xl">
        <h2 className="max-w-3xl font-display text-4xl leading-[1.05] tracking-[-0.025em] text-paper text-balance md:text-6xl">
          Escolha a tarefa que trava <span className="text-accent">seu dia.</span>
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/75 md:text-lg">
          As ferramentas, chamadas skills, ajudam a preparar documentos e textos no
          Claude ou no ChatGPT. Cada uma acompanha arquivo de instalação e guia de uso.
        </p>

        <Accordion
          className="mt-8 border-y-[0.5pt] border-line md:mt-12"
          bodyClassName="text-base leading-relaxed text-muted md:pl-20"
          defaultOpen="02"
          items={MODULES.map((m) => ({
            id: m.n,
            header: (
              <span key="h" className="flex min-w-0 flex-col gap-1 md:flex-row md:items-center md:gap-4">
                <span className="font-mono text-xs text-accent">Módulo {m.n}</span>
                <span className="font-display text-xl text-paper md:text-2xl">{m.name}</span>
              </span>
            ),
            body: <Fragment key="b">{m.body}</Fragment>,
          }))}
        />

        <Buy className="mt-8 md:mt-10" />
      </div>
    </section>
  );
}
