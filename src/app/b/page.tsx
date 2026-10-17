import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { SmoothScroll } from "@/components/smooth-scroll";
import { BrandLockup } from "@/components/brand-mark";
import { ShortHero } from "@/components/short-hero";
import { InTheBox, List, SKILLS } from "@/components/box-carousel";
import { FounderPhoto } from "@/components/founder-photo";
import { Faq, FinalCall, Offer } from "@/components/offer";
import { FloatingCta } from "@/components/floating-cta";
import { CheckoutTracking } from "@/components/checkout-tracking";

// Versão curta da LP para anúncios, com copy própria. Preço e checkout são os mesmos da principal.
export const metadata: Metadata = {
  title: "Caixa Preta SÓC.IA | Pare de explicar a mesma tarefa toda semana",
  description:
    "7 ferramentas de IA, processos de exemplo e guias para padronizar tarefas do seu escritório. Conheça a Caixa Preta SÓC.IA por R$ 97.",
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
};

const MODULES = [
  {
    n: "01",
    name: "Comece aqui",
    body: <p>Boas-vindas e Guia de início para configurar os recursos, instalar a primeira skill e conferir o resultado.</p>,
  },
  {
    n: "02",
    name: "Skills para a rotina",
    body: <List items={SKILLS.map(([name]) => name)} />,
  },
  {
    n: "03",
    name: "Materiais para aplicar",
    body: (
      <List
        items={[
          "Mapa do caso",
          "Manual do Claude",
          "30 prompts",
          "Guia do primeiro projeto no Claude",
          "5 POPs de exemplo para adaptar",
        ]}
      />
    ),
  },
];

const FAQ: [string, string][] = [
  ["Preciso saber usar IA?", "Você recebe um Guia de início e orientações para cada ferramenta. Comece por uma tarefa, siga os passos e confira o resultado."],
  ["Preciso do Claude ou do ChatGPT?", "Sim. Os materiais são usados nessas plataformas, conforme as orientações de cada guia. Eventuais assinaturas são pagas à parte."],
  ["Consigo adaptar ao meu escritório?", "Sim. Você ajusta as instruções, os modelos e os processos ao seu padrão. A cada novo caso, fornece os dados necessários e revisa o resultado."],
  ["É um curso ou consultoria?", "É um conjunto de ferramentas e materiais digitais para aplicar no próprio ritmo. Aulas, consultoria e acompanhamento não fazem parte da compra."],
  ["As mensagens são enviadas automaticamente?", "Não. A ferramenta ajuda a preparar o texto. Você revisa e decide quando e para quem enviar."],
  ["Posso usar os documentos sem revisar?", "Não. Confira informações, referências e adequação ao caso antes de usar qualquer documento produzido com IA."],
  ["Posso usar dados de clientes?", "Para começar, use exemplos fictícios ou anonimizados. Antes de inserir informações reais, confira as configurações da plataforma e as regras de confidencialidade do escritório."],
  ["E se eu quiser ajuda na configuração?", "Os guias incluídos orientam a aplicação. Configuração individual e acompanhamento não estão incluídos nesta compra."],
];

export default function ShortLanding() {
  return (
    <>
      <CheckoutTracking />
      <SmoothScroll />
      <Nav />
      <main>
        <ShortHero />
        <InTheBox
          title={
            <>
              Escolha a tarefa que trava <span className="text-accent">seu dia</span>
            </>
          }
          lead="As ferramentas, chamadas skills, reúnem instruções para tarefas específicas. Cada uma vem com arquivo de instalação e guia de uso."
          modules={MODULES}
        />
        <FounderPhoto
          title={
            <>
              Eu também tenho escritório e <span className="text-accent">cliente esperando</span>
            </>
          }
          paragraphs={[
            "Sou Nathalia Fava, advogada e empresária. No Fava & Vitorino, uso gestão e IA na rotina do escritório.",
            "Reuni na Caixa Preta ferramentas e processos construídos a partir dessa experiência. Você recebe uma base para adaptar ao seu jeito de trabalhar.",
          ]}
        />
        <Offer
          title={
            <>
              Comece pela tarefa que você <span className="text-accent">sempre repete</span>
            </>
          }
          paragraphs={["Escolha uma rotina, adapte as instruções e use como base nas próximas demandas."]}
          included={[
            "7 skills com instalação e guia de uso",
            "Boas-vindas e Guia de início",
            "Mapa do caso e Manual do Claude",
            "30 prompts",
            "Primeiro projeto no Claude e 5 POPs de exemplo",
          ]}
          forWhom={[
            "Advogados que trabalham sozinhos",
            "Escritórios que querem padronizar tarefas da equipe",
            "Quem quer aplicar os materiais no próprio ritmo",
          ]}
          notIncludedTitle="O que não está incluído"
          notIncluded="Aulas, acompanhamento, configuração individual, integrações ou assinatura do Claude e do ChatGPT."
          cardRequirements={false}
        />
        <Faq items={FAQ} />
        <FinalCall
          title={
            <>
              Na próxima vez, não comece <span className="text-accent">do zero</span>
            </>
          }
          lead="Adapte as instruções à sua rotina. Reutilize no próximo caso e revise o que a IA preparar."
        />
      </main>
      <footer className="border-t border-line bg-background px-6 py-10 pb-28 md:px-12 md:pb-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <BrandLockup className="opacity-90" />
          <p className="text-sm font-normal text-paper/55">© 2026 SÓC.IA</p>
        </div>
      </footer>
      <FloatingCta />
    </>
  );
}
