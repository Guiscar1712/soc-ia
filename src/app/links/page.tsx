import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Jost, Nunito_Sans } from "next/font/google";
import { DotsBackground, OpenSheet, Sheet } from "./links-client";
import { LexMark } from "./lex-mark";
import "./links.css";

const jost = Jost({ variable: "--font-jost", subsets: ["latin"], weight: ["300", "400", "500", "600"] });
const nunito = Nunito_Sans({ variable: "--font-nunito", subsets: ["latin"], weight: ["400", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Nathalia Fava",
  description:
    "A vida real de quem empreende na advocacia. Estruturo escritórios e negócios com gestão, estratégia e IA.",
  openGraph: { title: "Nathalia Fava", images: ["/links/avatar.jpg"], locale: "pt_BR" },
};

const WHATSAPP = "https://wa.me/5541988797899?text=";
const wa = (text: string) => WHATSAPP + encodeURIComponent(text);

export default function LinksPage() {
  return (
    <div className={`lp ${jost.variable} ${nunito.variable}`}>
      <DotsBackground />
      <main className="wrap">
        <header className="hero">
          <div className="avatar">
            <Image src="/links/avatar.jpg" alt="Foto de Nathalia Fava" width={106} height={106} priority />
          </div>
          <h1>
            Nathalia <span>Fava</span>
          </h1>
          <span className="handle">@nathaliafava</span>
          <p className="bio">
            A vida real de quem empreende na advocacia. Estruturo escritórios e negócios com gestão,
            estratégia e IA.
          </p>
        </header>

        <section>
          <div className="label">Em destaque</div>
          <article className="feature">
            <div className="cover" role="img" aria-label="Nathalia Fava, Implementação SÓC.IA">
              <Image className="lockup" src="/links/lockup-socia.png" alt="SÓC.IA" width={100} height={34} />
              <span className="kind">Implementação</span>
              <h2>
                Eu instalo a IA <span>para você</span>
              </h2>
            </div>
            <div className="feature-body">
              <p className="promise">
                Pare de ser o <b>gargalo</b> do seu escritório.
              </p>
              <p>
                Eu entro na sua operação, identifico onde a IA realmente pode ganhar eficiência e
                implemento isso para você. Ao final, você recebe os agentes, fluxos, bases e
                procedimentos de IA configurados e prontos para a sua equipe usar no dia a dia.
              </p>
              <a
                className="btn btn-solid"
                href={wa("Oi, Nathalia! Vim pelo Instagram e quero saber da Implementação SÓC.IA.")}
                target="_blank"
                rel="noopener"
              >
                Quero a implementação
              </a>
            </div>
          </article>
        </section>

        <section>
          <div className="label">Como posso te ajudar</div>
          <div className="offers">
            <article className="offer">
              <div className="mark txt" aria-hidden="true">
                S.O.S
              </div>
              <div>
                <h3>Consultoria S.O.S</h3>
                <p>3 meses comigo estruturando o seu escritório.</p>
                <OpenSheet target="d-sos">Ver detalhes →</OpenSheet>
              </div>
            </article>
            <article className="offer">
              <div className="mark" aria-hidden="true">
                <LexMark />
              </div>
              <div>
                <h3>LexHub</h3>
                <p>A IA que entende advocacia.</p>
                <OpenSheet target="d-lex">Ver detalhes →</OpenSheet>
              </div>
            </article>
            <article className="offer">
              <div className="mark" aria-hidden="true">
                <Image src="/links/caixa-preta-mark.png" alt="" width={38} height={34} />
              </div>
              <div>
                <h3>
                  Caixa Preta SÓC.IA <span className="soon">Em breve</span>
                </h3>
                <p>A estrutura que eu uso, pronta para você instalar sozinha.</p>
                <OpenSheet target="d-caixa">Ver detalhes →</OpenSheet>
              </div>
            </article>
          </div>
        </section>

        <section>
          <div className="label">Fale comigo</div>
          <div className="contacts">
            <a
              className="contact"
              href={wa("Oi, Nathalia! Vim pelo Instagram e quero falar sobre parceria ou palestra.")}
              target="_blank"
              rel="noopener"
            >
              <span>
                <b>Parcerias e palestras</b>
                <small>WhatsApp · (41) 98879-7899</small>
              </span>
              <span className="go">Conversar →</span>
            </a>
            <a className="contact" href="https://www.favaevitorino.com.br/" target="_blank" rel="noopener">
              <span>
                <b>Fava e Vitorino Advocacia</b>
                <small>Atuação em todo o Brasil</small>
              </span>
              <span className="go">Visitar →</span>
            </a>
          </div>
        </section>

        <footer>
          <b>Nathalia Fava</b>
          <span>Gestão, estratégia e IA na advocacia</span>
        </footer>
      </main>

      <Sheet id="d-sos" label="Consultoria S.O.S">
        <div
          className="cover"
          style={
            {
              "--cover": "url('/links/capa-sos.jpg')",
              backgroundPosition: "center top",
              aspectRatio: "1 / 1",
            } as React.CSSProperties
          }
        >
          <span className="kind">Sua outra sócia</span>
          <h3>
            Eu estruturo o seu escritório <span>com você</span>
          </h3>
        </div>
        <div className="sheet-body">
          <p>
            Durante 3 meses, eu entro no seu escritório como uma outra sócia de gestão. Analisamos
            juntas o comercial, a operação, a gestão, a experiência do cliente, a equipe e a IA para
            estruturar o escritório, implementar as mudanças prioritárias e acompanhar até elas
            funcionarem na prática.
          </p>
          <p>
            <b>O que fica estruturado</b>
          </p>
          <ul>
            <li>Processos do escritório</li>
            <li>Responsabilidades de cada pessoa da equipe</li>
            <li>Rotinas de gestão</li>
          </ul>
          <a className="btn btn-solid" href="https://form.respondi.app/bMNF44Jx" target="_blank" rel="noopener">
            Fazer minha aplicação
          </a>
        </div>
      </Sheet>

      <Sheet id="d-lex" label="LexHub">
        <div className="cover brand">
          <div className="emblem lex">
            <LexMark />
            <span>lexhub</span>
          </div>
          <span className="kind">IA para a advocacia</span>
          <h3>
            A IA que <span>entende</span> advocacia
          </h3>
        </div>
        <div className="sheet-body">
          <p>
            IA genérica começa escrevendo. A LexHub começa entendendo o caso, e só depois monta a peça
            com você.
          </p>
          <ul>
            <li>Petições em Visual Law, mais claras para o juiz ler</li>
            <li>Jurisprudência real, com o link do tribunal</li>
            <li>Cálculos e consultas dentro da conversa</li>
          </ul>
          <a className="btn btn-solid" href="https://lexhubtech.com/" target="_blank" rel="noopener">
            Conhecer a LexHub
          </a>
        </div>
      </Sheet>

      <Sheet id="d-caixa" label="Caixa Preta SÓC.IA">
        <div className="cover brand">
          <Image
            className="emblem cp"
            src="/links/caixa-preta-emblem.png"
            alt="Caixa Preta SÓC.IA"
            width={262}
            height={87}
          />
          <span className="kind">Instale sozinha</span>
          <h3>
            Eu te entrego <span>o que usar</span>
          </h3>
        </div>
        <div className="sheet-body">
          <p>A estrutura que eu uso no meu escritório, pronta para você adaptar e instalar sozinha no seu.</p>
          <ul>
            <li>Agentes de IA prontos para configurar</li>
            <li>POPs, checklists e fluxos</li>
            <li>Prompts e modelos editáveis</li>
            <li>Materiais de gestão e IA</li>
          </ul>
          <div className="stack-btn">
            <a
              className="btn btn-solid"
              href={wa("Oi, Nathalia! Quero entrar na lista de espera da Caixa Preta SÓC.IA.")}
              target="_blank"
              rel="noopener"
            >
              Entrar na lista de espera
            </a>
            <Link className="link-quiet" href="/">
              Ver tudo o que vem na caixa
            </Link>
          </div>
        </div>
      </Sheet>
    </div>
  );
}
