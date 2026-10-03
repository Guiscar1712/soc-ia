create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  created_at timestamptz not null default now(),
  constraint leads_name_len check (char_length(name) between 2 and 80),
  constraint leads_email_len check (char_length(email) between 5 and 254),
  constraint leads_phone_len check (phone ~ '^[0-9]{10,13}$'),
  constraint leads_email_unique unique (email)
);

alter table public.leads drop constraint if exists leads_phone_len;
alter table public.leads
  add constraint leads_phone_len check (phone ~ '^[0-9]{10,13}$');

alter table public.leads enable row level security;
alter table public.leads force row level security;

revoke all on table public.leads from public, anon, authenticated, service_role;

create or replace function public.submit_lead(p_name text, p_email text, p_phone text)
returns void
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
begin
  if p_name is null
    or char_length(btrim(p_name)) < 2
    or char_length(btrim(p_name)) > 80
    or btrim(p_name) ~ '[[:cntrl:]]'
  then
    raise exception 'invalid lead' using errcode = '22023';
  end if;

  if p_email is null
    or char_length(p_email) > 254
    or p_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  then
    raise exception 'invalid lead' using errcode = '22023';
  end if;

  if p_phone is null or p_phone !~ '^[0-9]{10,13}$' then
    raise exception 'invalid lead' using errcode = '22023';
  end if;

  insert into public.leads (name, email, phone)
  values (btrim(p_name), lower(btrim(p_email)), p_phone)
  on conflict (email) do nothing;
end;
$$;

revoke all on function public.submit_lead(text, text, text) from public, anon, authenticated;
grant execute on function public.submit_lead(text, text, text) to service_role;
