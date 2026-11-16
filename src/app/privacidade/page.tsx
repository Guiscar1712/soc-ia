import type { Metadata } from "next";
import Link from "next/link";
import { BrandLockup } from "@/components/brand-mark";

export const metadata: Metadata = {
  title: "Política de Privacidade | SÓC.IA",
  description: "Como a SÓC.IA coleta, usa e protege os dados enviados pelo site, formulários e anúncios.",
};

const EMAIL = "nathaliafava@gmail.com";
const WHATSAPP = "5541988797899";
const WHATSAPP_LABEL = "(41) 98879-7899";

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "Quem somos",
    body: (
      <p>
        Esta política se aplica ao site metodosocia.com.br, aos formulários de cadastro e aos anúncios da SÓC.IA, marca
        de Fava Sociedade Individual de Advocacia, CNPJ 62.669.819/0001-01, com sede em Curitiba/PR (&ldquo;nós&rdquo;).
      </p>
    ),
  },
  {
    title: "Quais dados coletamos",
    body: (
      <>
        <p>Quando você preenche nossos formulários (no site, no Facebook ou no Instagram), podemos coletar:</p>
        <ul>
          <li>Nome, e-mail e telefone/WhatsApp;</li>
          <li>Respostas sobre o seu escritório (tamanho da equipe, área de atuação e principais desafios);</li>
          <li>
            Dados de navegação, como páginas visitadas, dispositivo e interações com anúncios, por meio de cookies e do
            Pixel da Meta.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Para que usamos seus dados",
    body: (
      <ul>
        <li>Entrar em contato com você sobre o que você solicitou (diagnóstico, aula, materiais ou consultoria);</li>
        <li>Enviar convites, conteúdos e ofertas relacionados a gestão e IA para escritórios de advocacia;</li>
        <li>Entender e melhorar nossos anúncios, site e serviços.</li>
      </ul>
    ),
  },
  {
    title: "Base legal (LGPD – Lei 13.709/2018)",
    body: (
      <p>
        Tratamos seus dados com base no seu consentimento, ao preencher o formulário, e no nosso legítimo interesse em
        responder ao seu contato e divulgar nossos serviços.
      </p>
    ),
  },
  {
    title: "Com quem compartilhamos",
    body: (
      <>
        <p>Não vendemos seus dados. Eles podem ser processados por ferramentas que usamos para operar:</p>
        <ul>
          <li>Meta (Facebook, Instagram e WhatsApp), em anúncios e formulários;</li>
          <li>Eduzz, em compras e acessos a produtos;</li>
          <li>Ferramentas de planilha, e-mail e CRM usadas no atendimento.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Por quanto tempo guardamos",
    body: (
      <p>
        Mantemos seus dados enquanto houver relacionamento ou interesse legítimo, ou até você pedir a exclusão, exceto
        quando a lei exigir guardá-los por mais tempo.
      </p>
    ),
  },
  {
    title: "Seus direitos",
    body: (
      <p>
        Você pode, a qualquer momento, pedir: confirmação e acesso aos seus dados, correção, exclusão, portabilidade,
        revogação do consentimento e informações sobre o compartilhamento. Também pode deixar de receber nossas
        mensagens quando quiser.
      </p>
    ),
  },
  {
    title: "Cookies e Pixel",
    body: (
      <p>
        Usamos cookies e o Pixel da Meta para medir visitas e melhorar nossos anúncios. Você pode bloquear cookies nas
        configurações do seu navegador.
      </p>
    ),
  },
  {
    title: "Segurança",
    body: <p>Adotamos medidas razoáveis para proteger seus dados contra acesso não autorizado, perda ou uso indevido.</p>,
  },
  {
    title: "Contato",
    body: (
      <p>
        Para exercer seus direitos ou tirar dúvidas: <a href={`mailto:${EMAIL}`}>{EMAIL}</a> | WhatsApp{" "}
        <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">
          {WHATSAPP_LABEL}
        </a>
        .
      </p>
    ),
  },
  {
    title: "Alterações",
    body: <p>Esta política pode ser atualizada. A versão vigente estará sempre nesta página.</p>,
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <header className="border-b border-line py-5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Link href="/" aria-label="Voltar para a página inicial" className="inline-block">
            <BrandLockup className="h-7 md:h-8" />
          </Link>
        </div>
      </header>
      <main className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <h1 className="font-display text-[clamp(2rem,5vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.03em] text-paper">
            Política de Privacidade
          </h1>
          <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.18em] text-paper-dim">
            Última atualização: 14 de novembro de 2026
          </p>
          <ol className="mt-12 space-y-10">
            {SECTIONS.map((section, i) => (
              <li key={section.title}>
                <h2 className="font-display text-xl font-semibold tracking-[-0.01em] text-paper">
                  <span className="text-bronze">{i + 1}.</span> {section.title}
                </h2>
                <div className="mt-3 space-y-3 text-paper/75 [&_a]:text-bronze-2 [&_a]:underline [&_a]:underline-offset-2 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
                  {section.body}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </main>
    </>
  );
}
