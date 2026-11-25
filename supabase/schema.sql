-- Radio Exam Study: one row of progress per person per question pool.
-- Run this once in your Supabase project: Dashboard → SQL Editor → New query → paste → Run.

create table if not exists public.progress (
  user_id    uuid        not null references auth.users (id) on delete cascade,
  pool       text        not null check (pool in ('e1', 'e3', 'e7', 'e8', 'gen')),
  data       jsonb       not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, pool),
  -- one pool's progress is ~10–40 KB; this cap stops runaway writes
  constraint progress_size check (pg_column_size(data) < 500000)
);

-- Row-level security: each signed-in person can read and write only their own rows.
-- This is what makes it safe to put the anon key in config.js.
alter table public.progress enable row level security;

drop policy if exists "read own progress" on public.progress;
create policy "read own progress" on public.progress
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "insert own progress" on public.progress;
create policy "insert own progress" on public.progress
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "update own progress" on public.progress;
create policy "update own progress" on public.progress
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "delete own progress" on public.progress;
create policy "delete own progress" on public.progress
  for delete to authenticated using ((select auth.uid()) = user_id);
