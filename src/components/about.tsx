const AUDIENCE_POINTS = [
  "querem organizar processos e rotinas;",
  "precisam documentar o que hoje depende da memória;",
  "desejam dar mais clareza à equipe;",
  "querem usar IA de forma prática na gestão;",
  "conseguem adaptar e implementar os materiais sem acompanhamento individual;",
  "não querem começar cada processo do zero.",
];

export function About() {
  return (
    <section id="o-que-e" className="w-full bg-background py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl">
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-paper text-balance">
            Não é um curso. É estrutura pronta para adaptar e aplicar.
          </h2>
          <div className="mt-8 max-w-xl space-y-5 text-lg md:text-xl leading-relaxed text-paper/70">
            <p>
              A Caixa Preta SÓC.IA é um pack digital de gestão e inteligência
              artificial para escritórios de advocacia.
            </p>
            <p>
              Você recebe procedimentos, modelos e ferramentas editáveis, além
              de agentes de IA que ajudam a adaptar os materiais e criar novas
              estruturas conforme a realidade da sua operação.
            </p>
            <p>
              A maioria dos packs entrega arquivos estáticos. A Caixa Preta
              entrega materiais prontos e inteligência para trabalhar sobre
              eles.
            </p>
          </div>
          <p className="mt-10 max-w-xl font-serif text-2xl md:text-3xl leading-[1.2] text-paper">
            Sem aulas. Sem conteúdo para acumular. Sem esperar acompanhamento
            individual.
          </p>
        </div>

        <div className="mt-20 md:mt-28 max-w-3xl border-t border-line pt-14 md:pt-16">
          <h3 className="font-serif text-2xl md:text-4xl leading-[1.1] tracking-[-0.02em] text-paper text-balance">
            Mais do que documentos prontos.
          </h3>
          <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-paper/70">
            <p>Um pack comum entrega um arquivo para você preencher.</p>
            <p>
              A Caixa Preta SÓC.IA entrega o arquivo e a inteligência necessária
              para adaptar, melhorar e criar novas estruturas conforme a
              realidade do seu escritório.
            </p>
          </div>
          <p className="mt-8 max-w-xl font-serif text-xl md:text-2xl leading-[1.25] text-paper">
            Você recebe o que já existe e uma forma mais inteligente de
            construir o que ainda falta.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Audience() {
  return (
    <section id="para-quem" className="w-full bg-background py-24 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="font-serif text-3xl md:text-5xl leading-[1.05] tracking-[-0.02em] text-paper max-w-3xl text-balance">
          Para quem está pronta para tirar a gestão da cabeça e colocar na
          operação.
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/70">
          A Caixa Preta SÓC.IA foi criada para donas e donos de escritórios de
          advocacia que:
        </p>
        <ul className="mt-8 max-w-2xl space-y-0">
          {AUDIENCE_POINTS.map((item) => (
            <li
              key={item}
              className="flex items-baseline gap-4 border-b border-line py-4 text-[15px] leading-snug text-paper/85"
            >
              <span className="font-mono text-[11px] text-accent tabular-nums shrink-0">
                ·
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
