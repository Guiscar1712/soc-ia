import type { Metadata } from "next";
import { BrandLockup } from "@/components/brand-mark";
import Script from "next/script";
import { FloatingCta } from "@/components/floating-cta";
import { FounderPhoto } from "@/components/founder-photo";
import { Faq } from "@/components/offer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { UpsellFinal, UpsellHero, UpsellHowTo, UpsellIncluded, UpsellOffer } from "@/components/upsell";

const CHECKOUT_67 = "https://chk.eduzz.com/zoaqb3cw";

// Remarketing da oferta de R$ 67, sem a confirmação de envio da skill gratuita.
export const metadata: Metadata = {
  title: "Caixa Preta SÓC.IA | Leve a Caixa Preta completa por R$ 67",
  description:
    "Tenha 7 skills para preparar contratos, organizar documentos, revisar peças e padronizar tarefas do escritório. Caixa Preta completa por R$ 67.",
  robots: { index: false, follow: false },
};

const FAQ: [string, string][] = [
  ["Vou receber só os arquivos?", "Você recebe as skills, os guias de instalação e uso e os materiais complementares listados acima."],
  ["É uma assinatura?", "Não. A Caixa Preta custa R$ 67 em pagamento único. Eventuais custos do Claude ou do ChatGPT são separados."],
];

export default function RemarketingUpsell() {
  return (
    <>
      <Script id="eduzz-rmkt-checkout" strategy="afterInteractive">
        {`(function () {
  document.querySelectorAll('a[href^="https://chk.eduzz.com/"]').forEach(function (btn) {
    var checkout = new URL(btn.href);
    if (checkout.origin !== 'https://chk.eduzz.com' || checkout.pathname !== '/zoaqb3cw') return;
    if (btn.dataset.eduzzClickTracked) return;
    btn.dataset.eduzzClickTracked = 'true';
    btn.addEventListener('click', function () {
      if (typeof window.fbq === 'function') window.fbq('trackCustom', 'CliqueCheckout');
    });
  });
})();`}
      </Script>
      <SmoothScroll />
      <header className="absolute inset-x-0 top-0 z-30 px-6 py-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <BrandLockup className="opacity-90" />
        </div>
      </header>
      <main>
        <UpsellHero checkout={CHECKOUT_67} confirmFreeSkill={false} />
        <UpsellIncluded />
        <UpsellHowTo />
        <FounderPhoto
          title={
            <>
              Criada por quem também <span className="text-accent">tem escritório</span>
            </>
          }
          paragraphs={[
            "Sou Nathalia Fava, advogada e empresária. Reuni na Caixa Preta ferramentas e processos construídos a partir da minha experiência no Fava & Vitorino para você adaptar à sua rotina.",
          ]}
        />
        <UpsellOffer checkout={CHECKOUT_67} />
        <Faq items={FAQ} title="Dúvidas rápidas" />
        <UpsellFinal checkout={CHECKOUT_67} />
      </main>
      <footer className="border-t border-line bg-background px-6 py-10 pb-28 md:px-12 md:pb-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <BrandLockup className="opacity-90" />
          <p className="text-sm font-normal text-paper/55">© 2026 SÓC.IA</p>
        </div>
      </footer>
      <FloatingCta href={CHECKOUT_67} label="Quero minha Caixa Preta por R$ 67" />
    </>
  );
}
