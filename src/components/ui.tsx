import { ArrowRight } from "@phosphor-icons/react/ssr";

export const CTA_LABEL = "Quero minha Caixa Preta";
export const CTA_HREF = "https://sun.eduzz.com/69K1OYO7WO";
export const PRICE_VALUE = "R$ 97";
export const REQUIREMENTS = "Requer Claude ou ChatGPT. Custos da plataforma não incluídos.";

export function Cta({
  children = CTA_LABEL,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={CTA_HREF}
      target="_blank"
      rel="noopener noreferrer"
      data-cta=""
      className={`btn-cta group relative inline-flex min-h-14 items-center justify-center gap-2.5 whitespace-nowrap rounded-[var(--radius-btn)] px-6 py-4 text-center text-[15px] font-semibold text-accent-fg sm:px-8 sm:text-base ${className}`}
    >
      {children}
      <ArrowRight weight="bold" className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

/** O valor em destaque: número grande, condição pequena. */
export function Price({ className = "" }: { className?: string }) {
  return (
    <p className={`flex items-baseline gap-3 ${className}`}>
      <span className="font-display text-4xl leading-none tracking-[-0.02em] text-accent md:text-5xl">
        {PRICE_VALUE}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/70">pagamento único</span>
    </p>
  );
}

/** Botão + preço, sempre juntos. */
export function Buy({ className = "" }: { className?: string }) {
  return (
    <div className={`flex w-full flex-col items-start gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-8 ${className}`}>
      <Cta className="w-full sm:w-auto" />
      <Price />
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.23em] text-accent">
      {children}
    </p>
  );
}

/** Título-manifesto em caixa alta, ocupando a largura da tela. */
const SHOUT_SIZE = {
  lg: "text-[clamp(3rem,11vw,10rem)]",
  md: "text-[clamp(2.5rem,7vw,6.5rem)]",
};

export function Shout({
  children,
  size = "lg",
  className = "",
}: {
  children: React.ReactNode;
  size?: keyof typeof SHOUT_SIZE;
  className?: string;
}) {
  return (
    <p
      className={`font-display ${SHOUT_SIZE[size]} font-semibold uppercase leading-[0.9] tracking-[-0.035em] text-paper ${className}`}
    >
      {children}
    </p>
  );
}
