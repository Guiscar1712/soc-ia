import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { SmoothScroll } from "@/components/smooth-scroll";
import { BrandLockup } from "@/components/brand-mark";
import { ShortHero } from "@/components/short-hero";
import { InTheBox } from "@/components/box-carousel";
import { FounderPhoto } from "@/components/founder-photo";
import { Faq, FinalCall, Offer } from "@/components/offer";
import { FloatingCta } from "@/components/floating-cta";
import { CheckoutTracking } from "@/components/checkout-tracking";

// Versão curta da LP para anúncios. O que vem na caixa e a oferta são os mesmos da página principal.
export const metadata: Metadata = {
  title: "Caixa Preta SÓC.IA — Pare de explicar a mesma tarefa toda semana",
  description:
    "Ferramentas de IA, processos de exemplo e guias para registrar o padrão do seu escritório e reutilizar. De R$ 147 por R$ 97, pagamento único.",
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
};

export default function ShortLanding() {
  return (
    <>
      <CheckoutTracking />
      <SmoothScroll />
      <Nav />
      <main>
        <ShortHero />
        <InTheBox />
        <FounderPhoto />
        <Offer />
        <Faq />
        <FinalCall
          title={
            <>
              Uma tarefa a menos <span className="text-accent">na sua cabeça.</span>
            </>
          }
          lead="Comece pela rotina que mais se repete. Registre o seu padrão uma vez e deixe a próxima versão pronta para você revisar."
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
