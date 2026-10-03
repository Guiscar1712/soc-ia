import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { BrandLockup } from "@/components/brand-mark";
import { DotsCloud } from "@/components/dots/dots-cloud";

export const metadata = { title: "Página não encontrada | Caixa Preta SÓC.IA" };

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-ink px-6 md:px-12">
      <DotsCloud className="opacity-50" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(12,10,8,0.92)_0%,rgba(12,10,8,0.55)_45%,transparent_75%)]"
        aria-hidden="true"
      />

      <header className="relative z-10 mx-auto flex h-16 w-full max-w-7xl items-center">
        <Link href="/" aria-label="Caixa Preta SÓC.IA">
          <BrandLockup priority />
        </Link>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center py-16 text-center">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.23em] text-accent">Erro 404</p>
        <h1 className="font-display text-[clamp(2.5rem,8vw,5.5rem)] font-semibold uppercase leading-[0.95] tracking-[-0.03em] text-paper text-balance">
          Essa página não está <span className="text-accent">na caixa.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/70">
          O link pode estar errado ou a página mudou de lugar. O resto está tudo
          organizado.
        </p>
        <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <Link
            href="/"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-accent px-6 py-3 text-sm font-medium text-accent-fg transition hover:bg-bronze-2 active:scale-[0.98] sm:w-auto"
          >
            Voltar para o início
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/links"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-[var(--radius-btn)] border border-line px-6 py-3 text-sm font-medium text-paper transition hover:border-accent sm:w-auto"
          >
            Ver links da Nathalia
          </Link>
        </div>
      </div>
    </main>
  );
}
