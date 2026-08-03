import {
  InstagramLogo,
  LinkedinLogo,
  FacebookLogo,
} from "@phosphor-icons/react/ssr";
import { ArrowRight } from "@phosphor-icons/react/ssr";

export function Closing() {
  return (
    <section className="w-full bg-background pt-24 md:pt-32 pb-20 md:pb-28 border-t border-line">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-4xl">
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em] text-paper text-balance">
            Seu escritório não precisa depender da sua memória para funcionar.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/65">
            Transforme rotinas soltas em processos, ferramentas e estruturas que
            possam ser adaptadas, aplicadas e utilizadas pela sua equipe.
          </p>
          <p className="mt-10 max-w-3xl font-serif text-xl md:text-2xl leading-[1.3] text-paper/90">
            Sistemas criam padrão. Organização cria clareza. Crescimento cria
            direção. IA cria alavancagem.
          </p>
          <a
            href="#oferta"
            className="group mt-12 md:mt-16 inline-flex items-center gap-2 h-12 px-6 text-sm font-medium text-accent-fg bg-accent rounded-full hover:brightness-110 transition"
          >
            Abrir a Caixa Preta
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              weight="regular"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="w-full border-t border-line bg-background py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-paper/50">
          © 2026 SÓC.IA
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-paper/50 hover:text-paper transition-colors"
          >
            <InstagramLogo className="h-5 w-5" weight="regular" />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-paper/50 hover:text-paper transition-colors"
          >
            <LinkedinLogo className="h-5 w-5" weight="regular" />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-paper/50 hover:text-paper transition-colors"
          >
            <FacebookLogo className="h-5 w-5" weight="regular" />
          </a>
        </div>
      </div>
    </footer>
  );
}
