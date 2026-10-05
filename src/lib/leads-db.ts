import postgres from "postgres";

type Sql = ReturnType<typeof postgres>;

const globalForDb = globalThis as typeof globalThis & { leadsSql?: Sql };

function databaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!url.startsWith("postgresql://") && !url.startsWith("postgres://")) return null;
  return url;
}

function leadsSql() {
  const url = databaseUrl();
  if (!url) return null;
  if (!globalForDb.leadsSql) {
    globalForDb.leadsSql = postgres(url, {
      prepare: false,
      max: 1,
      idle_timeout: 5,
      connect_timeout: 8,
      ssl: "require",
    });
  }
  return globalForDb.leadsSql;
}

export function leadsConfigured() {
  return Boolean(databaseUrl());
}

export async function submitLead(name: string, email: string, phone: string) {
  const sql = leadsSql();
  if (!sql) return false;
  await sql`select public.submit_lead(${name}, ${email}, ${phone})`;
  return true;
}
