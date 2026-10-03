import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_POSTS = 5;
const MAX_CHALLENGES = 20;
const MIN_AGE_MS = 1500;
const MAX_AGE_MS = 30 * 60 * 1000;
const hits = new Map<string, number[]>();
const usedNonces = new Map<string, number>();

const NAME = /^[\p{L}][\p{L}\s'.-]{1,79}$/u;
const ALLOWED = new Set([
  "name",
  "email",
  "phone",
  "company",
  "issuedAt",
  "nonce",
  "signature",
]);

function json(
  body: {
    ok: boolean;
    error?: string;
    issuedAt?: number;
    nonce?: string;
    signature?: string;
  },
  status = 200,
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(key: string, max: number) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= max) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    const oldest = hits.keys().next().value;
    if (oldest) hits.delete(oldest);
  }
  return false;
}

function browserRequest(request: Request) {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!host) return false;
  if (fetchSite && fetchSite !== "same-origin") return false;

  let originMatches = false;
  if (origin) {
    try {
      originMatches = new URL(origin).host === host;
    } catch {
      return false;
    }
    if (!originMatches) return false;
  }

  return Boolean(fetchSite || originMatches);
}

function signingKey() {
  return (
    process.env.LEADS_SIGNING_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    ""
  );
}

function sign(payload: string) {
  return createHmac("sha256", signingKey()).update(payload).digest("base64url");
}

function signatureMatches(payload: string, signature: string) {
  const expected = sign(payload);
  const left = Buffer.from(expected);
  const right = Buffer.from(signature);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function consumeNonce(nonce: string, expiresAt: number) {
  const now = Date.now();
  for (const [key, expiry] of usedNonces) {
    if (expiry <= now) usedNonces.delete(key);
  }
  if (usedNonces.has(nonce)) return false;
  usedNonces.set(nonce, expiresAt);
  if (usedNonces.size > 5000) {
    const oldest = usedNonces.keys().next().value;
    if (oldest) usedNonces.delete(oldest);
  }
  return true;
}

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001F\u007F\u200B-\u200D\uFEFF]/g, "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, max);
}

function validEmail(email: string) {
  if (email.length < 5 || email.length > 254 || email.includes("..")) return false;
  const parts = email.split("@");
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (!local || !domain || local.length > 64) return false;
  if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(local)) return false;
  return /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(domain);
}

function normalizePhone(value: unknown) {
  if (typeof value !== "string") return "";
  let digits = value.replace(/\D/g, "").slice(0, 13);
  if (digits.startsWith("55") && (digits.length === 12 || digits.length === 13)) {
    digits = digits.slice(2);
  }
  return digits;
}

function validPhone(digits: string) {
  return /^[1-9]\d(?:[2-5]\d{7}|9\d{8})$/.test(digits);
}

function supabaseOrigin() {
  const raw = process.env.SUPABASE_URL;
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" || url.username || url.password) return null;
    if (url.pathname !== "/" || url.search || url.hash) return null;
    return url.origin;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  if (!browserRequest(request)) {
    return json({ ok: false, error: "Não foi possível preparar o formulário." }, 403);
  }
  if (!signingKey()) {
    return json({ ok: false, error: "O formulário está temporariamente indisponível." }, 503);
  }
  if (isRateLimited(`challenge:${clientIp(request)}`, MAX_CHALLENGES)) {
    return json(
      { ok: false, error: "Muitas tentativas. Espere alguns minutos e tente de novo." },
      429,
    );
  }

  const issuedAt = Date.now();
  const nonce = randomBytes(16).toString("base64url");
  return json({
    ok: true,
    issuedAt,
    nonce,
    signature: sign(`${issuedAt}.${nonce}`),
  });
}

export async function POST(request: Request) {
  if (!browserRequest(request)) {
    return json({ ok: false, error: "Não foi possível enviar." }, 403);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return json({ ok: false, error: "Não foi possível enviar." }, 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > 4000) {
    return json({ ok: false, error: "Não foi possível enviar." }, 413);
  }

  let text: string;
  try {
    text = await request.text();
  } catch {
    return json({ ok: false, error: "Não foi possível enviar." }, 400);
  }
  if (text.length > 4000) {
    return json({ ok: false, error: "Não foi possível enviar." }, 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return json({ ok: false, error: "Não foi possível enviar." }, 400);
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return json({ ok: false, error: "Não foi possível enviar." }, 400);
  }

  const raw = body as Record<string, unknown>;
  if (Object.keys(raw).some((key) => !ALLOWED.has(key))) {
    return json({ ok: false, error: "Não foi possível enviar." }, 400);
  }
  if (clean(raw.company, 200)) {
    return json({ ok: true });
  }

  if (isRateLimited(`post:${clientIp(request)}`, MAX_POSTS)) {
    return json(
      { ok: false, error: "Muitas tentativas. Espere alguns minutos e tente de novo." },
      429,
    );
  }

  const issuedAt = raw.issuedAt;
  const nonce = clean(raw.nonce, 64);
  const signature = clean(raw.signature, 128);
  const fresh =
    typeof issuedAt === "number" &&
    Number.isSafeInteger(issuedAt) &&
    Date.now() - issuedAt >= MIN_AGE_MS &&
    Date.now() - issuedAt <= MAX_AGE_MS;
  const nonceOk = /^[A-Za-z0-9_-]{16,64}$/.test(nonce);
  if (
    !signingKey() ||
    !fresh ||
    !nonceOk ||
    !signatureMatches(`${issuedAt}.${nonce}`, signature) ||
    !consumeNonce(nonce, issuedAt + MAX_AGE_MS)
  ) {
    return json(
      { ok: false, error: "Atualize a página e tente de novo." },
      400,
    );
  }

  const name = clean(raw.name, 80);
  const email = clean(raw.email, 254).toLowerCase();
  const phone = normalizePhone(raw.phone);

  if (!NAME.test(name) || /https?:|www\./i.test(name)) {
    return json({ ok: false, error: "Informe seu nome." }, 400);
  }
  if (!validEmail(email)) {
    return json({ ok: false, error: "Informe um e-mail válido." }, 400);
  }
  if (!validPhone(phone)) {
    return json({ ok: false, error: "Informe um telefone válido." }, 400);
  }

  const origin = supabaseOrigin();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!origin || !serviceKey) {
    return json({ ok: false, error: "O formulário está temporariamente indisponível." }, 503);
  }

  let response: Response;
  try {
    response = await fetch(`${origin}/rest/v1/rpc/submit_lead`, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ p_name: name, p_email: email, p_phone: phone }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    return json({ ok: false, error: "Não foi possível enviar. Tente de novo." }, 502);
  }

  if (!response.ok && response.status !== 409) {
    return json({ ok: false, error: "Não foi possível enviar. Tente de novo." }, 502);
  }

  return json({ ok: true });
}
