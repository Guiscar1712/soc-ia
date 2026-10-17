import { Accordion } from "@/components/accordion";
import { PriceBox } from "@/components/story-sections";
import { SKILLS } from "@/components/box-carousel";
import { Cta, Price, PRICE_FROM, PRICE_VALUE, REQUIREMENTS } from "@/components/ui";

const INCLUDED = [
  `${SKILLS.length} skills com arquivo de instalação e guia de uso`,
  "Boas-vindas e Guia de início",
  "Mapa do caso, para ver onde usar cada ferramenta",
  "Manual do Claude para o escritório",
  "30 prompts para copiar e adaptar",
  "Como criar seu primeiro projeto, com 5 POPs de exemplo",
];

const NOT_INCLUDED = [
  "Aulas ou acompanhamento individual",
  "Configuração individual no seu Claude ou ChatGPT",
  "Integrações com sistemas externos",
  "Custos da assinatura do Claude ou do ChatGPT",
];

const FOR_WHOM = [
  "Advogadas e advogados que trabalham sozinhos",
  "Escritórios com equipe que querem padronizar a rotina",
  "Quem prefere instalar e aplicar no próprio ritmo",
];

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="mt-[0.3em] h-4 w-4 shrink-0 text-accent" fill="none" aria-hidden="true">
      <path d="M3 8.5 6.2 12 13 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Dash() {
  return <span className="mt-[0.7em] h-px w-3 shrink-0 bg-muted" aria-hidden="true" />;
}

/** O cartão de compra: produto, valor e botão, sempre à vista no desktop. */
function PriceCard({ requirements = true }: { requirements?: boolean }) {
  return (
    <div className="rounded-[var(--radius-card)] border-[0.5pt] border-accent bg-surface p-5 sm:p-6 md:p-7 lg:sticky lg:top-24">
      <div className="flex flex-col items-center text-center">
        <PriceBox className="w-28 md:w-36" />
        <p className="mt-5 font-mono text-xs uppercase tracking-[0.23em] text-accent md:text-sm">
          Caixa Preta SÓC.IA
        </p>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-paper/60 md:text-sm">
          de <s className="decoration-paper/50">{PRICE_FROM}</s> por
        </p>
        <p className="mt-2 font-display text-7xl leading-none tracking-[-0.03em] text-paper md:text-8xl">
          {PRICE_VALUE}
        </p>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-paper/75 md:text-sm">
          pagamento único
        </p>
      </div>

      <Cta className="mt-7 w-full" />
      {requirements && (
        <p className="mt-4 text-center text-xs font-normal leading-relaxed text-paper/60">
          {REQUIREMENTS} As skills exigem execução de código e criação de arquivos
          habilitadas no Claude ou no ChatGPT.
        </p>
      )}
    </div>
  );
}

export interface OfferCopy {
  title?: React.ReactNode;
  paragraphs?: React.ReactNode[];
  included?: string[];
  forWhom?: string[];
  /** Lista (como na principal) ou uma frase só. */
  notIncluded?: string[] | string;
  notIncludedTitle?: string;
  /** Mostra o aviso de requisitos abaixo do botão do cartão de compra. */
  cardRequirements?: boolean;
}

/** A oferta: o que vem, para quem e o que não está incluído. Sem props usa a copy da principal. */
export function Offer({
  title = (
    <>
      Comece pelo que você <span className="text-accent">repete.</span>
    </>
  ),
  paragraphs = [
    <>
      De {PRICE_FROM} por {PRICE_VALUE}, você recebe as ferramentas de IA, os processos de exemplo e
      os guias para começar a registrar e reutilizar seu padrão de trabalho.
    </>,
    "Para advogadas e advogados que trabalham sozinhos ou com equipe. Você instala, configura e aplica os materiais no seu ritmo.",
  ],
  included = INCLUDED,
  forWhom = FOR_WHOM,
  notIncluded = NOT_INCLUDED,
  notIncludedTitle = "Não faz parte da compra",
  cardRequirements = true,
}: OfferCopy = {}) {
  return (
    <section id="oferta" className="border-t border-line bg-background px-6 py-12 md:px-12 md:py-28">
      <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2 className="font-display text-4xl leading-[1.05] tracking-[-0.025em] text-paper text-balance md:text-6xl">
            {title}
          </h2>
          <div className="mt-6 max-w-2xl space-y-4 text-base md:mt-8 md:space-y-5 md:text-lg leading-relaxed text-paper/75">
            {paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>

          <h3 className="mt-10 font-mono md:mt-12 text-[11px] uppercase tracking-[0.23em] text-accent">
            O que você recebe
          </h3>
          <ul className="mt-5 grid gap-x-8 gap-y-3 border-y-[0.5pt] border-line py-6 sm:grid-cols-2">
            {included.map((item) => (
              <li key={item} className="flex gap-3 text-base leading-relaxed text-paper/85">
                <Check />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-2 md:gap-10">
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.23em] text-accent">Para quem é</h3>
              <ul className="mt-5 space-y-3">
                {forWhom.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-relaxed text-paper/80">
                    <Check />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.23em] text-paper/50">
                {notIncludedTitle}
              </h3>
              {typeof notIncluded === "string" ? (
                <p className="mt-5 text-base leading-relaxed text-muted">{notIncluded}</p>
              ) : (
                <ul className="mt-5 space-y-3">
                  {notIncluded.map((item) => (
                    <li key={item} className="flex gap-3 text-base leading-relaxed text-muted">
                      <Dash />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:self-stretch">
          <PriceCard requirements={cardRequirements} />
        </div>
      </div>
    </section>
  );
}

const FAQ: [string, string][] = [
  [
    "Preciso saber usar IA?",
    "Você recebe guias de instalação e uso. Comece com uma ferramenta e siga as orientações de configuração e revisão.",
  ],
  [
    "Preciso do Claude ou do ChatGPT?",
    "Sim, de um dos dois. As skills desta edição exigem execução de código e criação de arquivos habilitadas. A ferramenta de legislação também exige pesquisa na web. Os custos da plataforma não estão incluídos.",
  ],
  [
    "Consigo adaptar ao meu escritório?",
    "Sim. Os guias orientam a configurar as ferramentas e adaptar os materiais ao seu padrão. Você conduz essa configuração e confere os resultados.",
  ],
  [
    "É um curso ou consultoria?",
    "É um pacote de ferramentas e materiais para aplicação autônoma. Não inclui aulas nem acompanhamento individual.",
  ],
  [
    "As mensagens são enviadas automaticamente?",
    "Não. As ferramentas preparam os textos; você confere e envia. Integrações com sistemas externos não fazem parte da compra.",
  ],
  [
    "Posso usar os documentos sem revisar?",
    "Não. Revise antes de enviar, assinar ou protocolar. A IA pode cometer erros.",
  ],
  [
    "Posso usar dados de clientes?",
    "Os guias orientam a reduzir a exposição de dados. Revise o que você compartilha e use apenas as informações necessárias, observando o sigilo profissional e as regras aplicáveis.",
  ],
  [
    "E se eu quiser ajuda na configuração?",
    "A Implementação SÓC.IA é um serviço separado em que participo do diagnóstico e da configuração, dentro do escopo contratado.",
  ],
];

/** Dúvidas; sem props usa as perguntas da principal. */
export function Faq({ items = FAQ, title = "Dúvidas frequentes" }: { items?: [string, string][]; title?: string } = {}) {
  return (
    <section id="duvidas" className="bg-background px-6 py-12 md:px-12 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-4xl leading-[1.05] tracking-[-0.025em] text-paper md:text-6xl">
          {title}
        </h2>
        <Accordion
          className="mt-8 border-y-[0.5pt] border-line md:mt-10"
          items={items.map(([q, a]) => ({
            id: q,
            header: <span key="h" className="font-display text-xl text-paper md:text-2xl">{q}</span>,
            body: <p key="b" className="max-w-2xl text-base leading-relaxed text-muted">{a}</p>,
          }))}
        />
      </div>
    </section>
  );
}

/** Chamada final; sem props usa a copy da página principal. */
export function FinalCall({
  title = (
    <>
      Dê um padrão à <span className="text-accent">próxima tarefa.</span>
    </>
  ),
  lead = "Escolha uma rotina que se repete. Use a Caixa Preta para registrá-la e começar a reutilizar o que hoje depende da sua memória.",
}: {
  title?: React.ReactNode;
  lead?: string;
} = {}) {
  return (
    <section className="border-t border-line bg-surface px-6 py-14 md:px-12 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-4xl leading-[1.05] tracking-[-0.025em] text-paper text-balance md:text-6xl">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-paper/75">
          {lead}
        </p>
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-paper/70">Caixa Preta SÓC.IA</p>
        <Price className="mt-3 justify-center" />
        <div className="mt-8">
          <Cta />
        </div>
      </div>
    </section>
  );
}
