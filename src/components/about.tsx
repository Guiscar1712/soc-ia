export function About() {
  return (
    <section id="o-que-e" className="w-full bg-background py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted mb-6">
            O que é
          </div>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-paper text-balance">
            O acesso aos bastidores de gestão e IA de um escritório real e
            estruturado.
          </h2>
          <p className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-paper/70">
            Em vez de documentos estáticos que a maioria dos packs entrega, você
            recebe materiais prontos e a inteligência para adaptar, melhorar e
            criar novos conforme a realidade do seu escritório.
          </p>
          <p className="mt-10 max-w-xl font-serif text-2xl md:text-3xl leading-[1.2] text-paper">
            Sem aulas. Sem começar do zero. Sem esperar acompanhamento
            individual.
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
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted mb-6">
          Para quem é
        </div>
        <h2 className="font-serif text-3xl md:text-5xl leading-[1.05] tracking-[-0.02em] text-paper max-w-3xl text-balance">
          Feito para donas e donos de escritórios que querem parar de segurar a
          operação sozinhos.
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/70">
          Que querem organizar a rotina, aplicar os materiais no próprio ritmo e
          começar a usar IA de forma prática, sem depender de consultoria
          individual.
        </p>
      </div>
    </section>
  );
}
