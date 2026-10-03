import { ArrowRight } from "@phosphor-icons/react/ssr";

export const CTA_LABEL = "Quero a Caixa Preta";

export function Cta({ children = CTA_LABEL }: { children?: React.ReactNode }) {
  return (
    <a
      href="#cadastro"
      className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-accent px-6 py-3 text-center text-sm font-medium text-accent-fg transition hover:bg-bronze-2 active:scale-[0.98]"
    >
      {children}
      <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
    </a>
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
