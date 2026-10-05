import { ArrowRight } from "@phosphor-icons/react/ssr";

export const CTA_LABEL = "Entrar na fila de espera";
export const WHATSAPP_GROUP = "https://chat.whatsapp.com/FF1YtwtqbVUHXkLZGwIuKN";

export function Cta({
  children = CTA_LABEL,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={WHATSAPP_GROUP}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-accent px-6 py-3 text-center text-sm font-medium text-accent-fg transition hover:bg-bronze-2 active:scale-[0.98] ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

export function WaitlistCard() {
  return (
    <div className="rounded-[var(--radius-card)] border-[0.5pt] border-accent bg-background p-7 md:p-9">
      <h3 className="font-display text-3xl leading-tight tracking-[-0.025em] text-paper md:text-4xl">
        Ainda não abrimos.
      </h3>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Entre no grupo e receba o link quando a Caixa Preta SÓC.IA abrir.
      </p>
      <div className="mt-8">
        <Cta className="w-full sm:w-auto">Entrar no grupo de espera</Cta>
      </div>
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
