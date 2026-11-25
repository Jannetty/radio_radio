-- Run once if you created the progress table before Technician and Extra were added
-- (Dashboard → SQL Editor → New query → paste → Run). New projects can skip this:
-- schema.sql already includes it.
alter table public.progress drop constraint if exists progress_pool_check;
alter table public.progress add constraint progress_pool_check
  check (pool in ('tech', 'gen', 'extra', 'e1', 'e3', 'e7', 'e8'));
