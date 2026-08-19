-- Run this in the Supabase SQL Editor (Project → SQL Editor → New query)

create table rides (
  id uuid primary key default gen_random_uuid(),
  driver_name text not null,
  origin text not null,
  destination text not null,
  departure_time timestamptz not null,
  seats_total int not null default 1,
  seats_taken int not null default 0,
  contact text not null,
  created_at timestamptz default now()
);

-- For Week 0, keep RLS simple: allow public read/write with the anon key.
-- (Tighten this later once you add real authentication.)
alter table rides enable row level security;

create policy "public read rides" on rides for select using (true);
create policy "public write rides" on rides for insert with check (true);
create policy "public update rides" on rides for update using (true);
