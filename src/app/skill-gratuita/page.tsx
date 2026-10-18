import type { Metadata } from "next";
import { BrandLockup } from "@/components/brand-mark";
import Script from "next/script";
import { FloatingCta } from "@/components/floating-cta";
import { FounderPhoto } from "@/components/founder-photo";
import { Faq } from "@/components/offer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { UpsellFinal, UpsellHero, UpsellHowTo, UpsellIncluded, UpsellOffer } from "@/components/upsell";

// Link "Vou começar pela skill gratuita": preencha FREE_SKILL quando houver a página de acesso.
const CHECKOUT_67 = "https://chk.eduzz.com/zoaqb3cw";
const FREE_SKILL: string | undefined = undefined;

// Página depois do cadastro da skill gratuita: confirma o envio e oferece a Caixa Preta por R$ 67.
export const metadata: Metadata = {
  title: "Caixa Preta SÓC.IA | Sua skill gratuita está a caminho",
  description: "Sua skill gratuita está a caminho do seu e-mail. Leve a Caixa Preta completa por R$ 67.",
  robots: { index: false, follow: false },
};

const FAQ: [string, string][] = [
  ["Preciso comprar para receber a gratuita?", "Não. Seu acesso à skill gratuita independe desta oferta."],
  ["Vou receber só os arquivos?", "Você recebe as skills, os guias de instalação e uso e os materiais complementares listados acima."],
  ["É uma assinatura?", "Não. A Caixa Preta custa R$ 67 em pagamento único. Eventuais custos do Claude ou do ChatGPT são separados."],
];

export default function FreeSkillUpsell() {
  return (
    <>
      <Script
        id="eduzz-thankyou"
        src="https://cdn.eduzzcdn.com/sun/thankyou/thankyou.js"
        strategy="afterInteractive"
      />
      <Script id="eduzz-post-acquisition-checkout" strategy="afterInteractive">
        {`(function () {
  // Keep the current URL intact: Eduzz reads the free acquisition's transaction here.
  // Only verified campaign labels may cross into the separate paid checkout.
  var allowed = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
  var incoming = new URLSearchParams(window.location.search);
  var tracking = new URLSearchParams();
  allowed.forEach(function (key) {
    var values = incoming.getAll(key);
    var value = values[0];
    if (values.length !== 1 || !value || !/^[a-zA-Z0-9][a-zA-Z0-9._~-]{0,99}$/.test(value)) return;
    if (/^[0-9]{11,}$/.test(value) || /^[a-f0-9]{32,}$/i.test(value) || /^[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}$/i.test(value)) return;
    tracking.set(key, value);
  });
  document.querySelectorAll('a[href^="https://chk.eduzz.com/"]').forEach(function (btn) {
    var checkout = new URL(btn.href);
    if (checkout.origin !== 'https://chk.eduzz.com' || checkout.pathname !== '/zoaqb3cw') return;
    checkout.search = tracking.toString();
    checkout.hash = '';
    btn.href = checkout.toString();
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
        <UpsellHero checkout={CHECKOUT_67} />
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
        <UpsellOffer checkout={CHECKOUT_67} freeSkill={FREE_SKILL} />
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
