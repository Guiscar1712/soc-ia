"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight } from "@phosphor-icons/react";

const inputClass =
  "mt-2 h-12 w-full rounded-[var(--radius-btn)] border border-line bg-ink/80 px-4 text-[15px] text-paper outline-none transition placeholder:text-paper/30 focus:border-accent";

function phoneDigits(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("55") && (digits.length === 12 || digits.length === 13)) {
    digits = digits.slice(2);
  }
  return digits.slice(0, 11);
}

function maskPhone(value: string) {
  const digits = phoneDigits(value);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

type Challenge = {
  issuedAt: number;
  nonce: string;
  signature: string;
};

function LeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/leads", {
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: controller.signal,
    })
      .then(async (response) => {
        const body = (await response.json().catch(() => null)) as
          | (Challenge & { ok?: boolean })
          | null;
        if (!response.ok || !body?.ok || !body.nonce || !body.signature) return;
        setChallenge({
          issuedAt: body.issuedAt,
          nonce: body.nonce,
          signature: body.signature,
        });
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!challenge) {
      setError("Atualize a página e tente de novo.");
      setStatus("error");
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          company: data.get("company"),
          issuedAt: challenge.issuedAt,
          nonce: challenge.nonce,
          signature: challenge.signature,
        }),
      });
      const body = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !body?.ok) {
        setError(body?.error || "Não foi possível enviar. Tente de novo.");
        setStatus("error");
        return;
      }

      form.reset();
      setPhone("");
      setStatus("success");
    } catch {
      setError("Não foi possível enviar. Tente de novo.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="mt-8 rounded-[var(--radius-card)] border border-accent/40 bg-accent/5 p-6"
        role="status"
      >
        <p className="font-display text-2xl text-paper">Cadastro recebido.</p>
        <p className="mt-2 text-sm text-paper/65">
          Obrigado pelo interesse na Caixa Preta SÓC.IA.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 flex max-w-md flex-col gap-4">
      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          Nome
        </span>
        <input
          name="name"
          type="text"
          required
          autoComplete="name"
          minLength={2}
          maxLength={80}
          placeholder="Seu nome"
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          E-mail
        </span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={254}
          placeholder="voce@escritorio.com"
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          WhatsApp
        </span>
        <input
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          minLength={14}
          maxLength={15}
          pattern="\(\d{2}\) \d{4,5}-\d{4}"
          title="Use o formato (11) 99999-9999"
          placeholder="(11) 99999-9999"
          value={phone}
          onChange={(event) => {
            event.target.setCustomValidity("");
            setPhone(maskPhone(event.target.value));
          }}
          onInvalid={(event) => {
            event.currentTarget.setCustomValidity(
              "Informe um telefone com DDD, no formato (11) 99999-9999.",
            );
          }}
          className={inputClass}
        />
      </label>
      <div className="sr-only" aria-hidden="true">
        <label>
          Empresa
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {status === "error" && (
        <p className="text-sm text-alert" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="group mt-2 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-accent px-6 py-3 text-center text-sm font-medium text-accent-fg transition hover:bg-bronze-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
      >
        {status === "loading" ? "Enviando…" : "Quero entrar na lista"}
        {status !== "loading" && (
          <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
        )}
      </button>
    </form>
  );
}

export function Pricing() {
  return (
    <section id="cadastro" className="bg-background py-16 pb-28 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-12 md:gap-16 md:px-12">
        <div className="md:col-span-6">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.23em] text-accent">
            Cadastro
          </p>
          <h2 className="font-display text-4xl leading-[1.08] tracking-[-0.025em] text-paper text-balance md:text-5xl lg:text-6xl">
            As vendas ainda não abriram.
          </h2>
          <p className="mt-8 max-w-xl font-display text-2xl leading-snug text-paper/90">
            Entre na lista e saiba primeiro.
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
            Você recebe os detalhes da Caixa Preta e o aviso de abertura antes
            de todo mundo.
          </p>
        </div>
        <div className="rounded-[var(--radius-card)] border border-line bg-surface p-7 md:col-span-6 md:p-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            Caixa Preta SÓC.IA
          </p>
          <h3 className="mt-5 font-display text-2xl leading-snug text-paper md:text-3xl">
            Tire o escritório da sua cabeça
          </h3>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
