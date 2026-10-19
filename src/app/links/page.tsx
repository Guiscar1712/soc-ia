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
    "Seu escritório pode trabalhar de outro jeito. Gestão e IA para organizar a rotina e simplificar o trabalho.",
  openGraph: { title: "Nathalia Fava", images: ["/links/avatar.jpg"], locale: "pt_BR" },
};

const WHATSAPP = "https://wa.me/5541988797899?text=";
const wa = (text: string) => WHATSAPP + encodeURIComponent(text);
const CONSULTORIA = "https://consultoria.metodosocia.com.br";

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
          <a className="handle" href="https://www.instagram.com/nathaliafava/" target="_blank" rel="noopener">
            @nathaliafava
          </a>
          <p className="bio">
            <b>Seu escritório pode trabalhar de outro jeito.</b> Gestão e IA para organizar a rotina e
            simplificar o trabalho.
          </p>
        </header>

        <section>
          <div className="label">Destaque</div>
          <a className="feature" href={CONSULTORIA} target="_blank" rel="noopener">
            <div className="cover" role="img" aria-label="Nathalia Fava, Implementação SÓC.IA">
              <Image className="lockup" src="/links/lockup-socia.png" alt="SÓC.IA" width={100} height={34} />
              <span className="kind">Implementação</span>
              <h2>
                Você conhece a rotina. <span>Eu configuro a IA.</span>
              </h2>
            </div>
            <div className="feature-body">
              <p>
                Identifico o que pode ser automatizado e configuro as ferramentas para o seu escritório.
              </p>
              <span className="btn btn-solid">Quero IA no meu escritório</span>
            </div>
          </a>
        </section>

        <section>
          <div className="label">Como posso te ajudar</div>
          <div className="offers">
            <OpenSheet target="d-sos" className="offer">
              <div className="mark txt" aria-hidden="true">
                S.O.S
              </div>
              <div>
                <h3>Consultoria S.O.S</h3>
                <p>Organize o escritório com acompanhamento.</p>
                <span className="more">Conhecer a consultoria →</span>
              </div>
            </OpenSheet>
            <OpenSheet target="d-lex" className="offer">
              <div className="mark" aria-hidden="true">
                <LexMark />
              </div>
              <div>
                <h3>LexHub</h3>
                <p>Cálculos jurídicos e jurisprudência no seu fluxo de trabalho.</p>
                <span className="more">Conhecer a LexHub →</span>
              </div>
            </OpenSheet>
            <OpenSheet target="d-caixa" className="offer">
              <div className="mark" aria-hidden="true">
                <Image src="/links/caixa-preta-mark.png" alt="" width={38} height={34} />
              </div>
              <div>
                <h3>Caixa Preta SÓC.IA</h3>
                <p>Comece pela tarefa que mais se repete. R$ 97 · pagamento único.</p>
                <span className="more">Ver o que vem na Caixa →</span>
              </div>
            </OpenSheet>
          </div>
        </section>

        <section>
          <div className="label">Contatos</div>
          <div className="contacts">
            <a
              className="contact"
              href={wa("Oi, Nathalia! Vim pelo Instagram e quero falar sobre parceria ou palestra.")}
              target="_blank"
              rel="noopener"
            >
              <span>
                <b>Parcerias e palestras</b>
                <small>Vamos levar essa conversa para o seu público.</small>
                <span className="go">Falar sobre parceria ou palestra →</span>
              </span>
            </a>
            <a className="contact" href="https://www.favaevitorino.com.br/" target="_blank" rel="noopener">
              <span>
                <b>Fava e Vitorino Advocacia</b>
                <small>Conheça nosso escritório e áreas de atuação.</small>
                <span className="go">Conhecer o escritório →</span>
              </span>
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
            Organize o escritório <span>com acompanhamento</span>
          </h3>
        </div>
        <div className="sheet-body">
          <p>3 meses comigo para estruturar processos, responsabilidades e gestão.</p>
          <p>
            <b>O que fica estruturado</b>
          </p>
          <ul>
            <li>Processos do escritório</li>
            <li>Responsabilidades de cada pessoa da equipe</li>
            <li>Rotinas de gestão</li>
          </ul>
          <a className="btn btn-solid" href={CONSULTORIA} target="_blank" rel="noopener">
            Candidatar meu escritório
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
            Cálculos e <span>jurisprudência</span>
          </h3>
        </div>
        <div className="sheet-body">
          <p>
            Conheça o plugin de cálculos jurídicos e pesquise jurisprudência para fundamentar suas
            peças.
          </p>
          <ul>
            <li>Cálculos jurídicos dentro da conversa</li>
            <li>Jurisprudência real, com o link do tribunal</li>
            <li>Apoio na construção de peças a partir do material do caso</li>
          </ul>
          <a className="btn btn-solid" href="https://lexhubtech.com/" target="_blank" rel="noopener">
            Acessar a LexHub
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
            Comece pelo <span>que se repete</span>
          </h3>
        </div>
        <div className="sheet-body">
          <p>Skills de IA, guias e processos de exemplo para aplicar no seu ritmo.</p>
          <ul>
            <li>7 skills com arquivo de instalação e guia de uso</li>
            <li>Guia de início, Mapa do caso e Manual do Claude para o escritório</li>
            <li>30 prompts e 5 POPs de exemplo para adaptar</li>
            <li>R$ 97 · pagamento único</li>
          </ul>
          <p>Requer Claude ou ChatGPT. Assinatura da plataforma não incluída.</p>
          <Link className="btn btn-solid" href="/">
            Conhecer a Caixa Preta
          </Link>
        </div>
      </Sheet>
    </div>
  );
}
