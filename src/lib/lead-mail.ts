const MAIL_ENABLED = false;
const RECIPIENTS = ["guiscar1712@gmail.com", "nathaliafava@gmail.com"];

function formatPhone(digits: string) {
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return digits;
}

export function mailConfigured() {
  return MAIL_ENABLED && Boolean(process.env.RESEND_API_KEY && process.env.LEADS_FROM_EMAIL);
}

export async function notifyLead(lead: { name: string; email: string; phone: string }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.LEADS_FROM_EMAIL;
  if (!key || !from) return false;

  const text = [
    "Novo cadastro na lista da Caixa Preta SÓC.IA.",
    "",
    `Nome: ${lead.name}`,
    `E-mail: ${lead.email}`,
    `WhatsApp: ${formatPhone(lead.phone)}`,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "User-Agent": "soc-ia-lead-mail",
    },
    body: JSON.stringify({
      from,
      to: RECIPIENTS,
      reply_to: lead.email,
      subject: `Lista da Caixa Preta · ${lead.name}`,
      text,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("lead mail failed", response.status, detail.slice(0, 300));
    return false;
  }

  return true;
}
