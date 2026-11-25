# Maintaining Radio Exam Study

Everything needed to keep the site running, update the question pools, and rebuild it from
scratch. Day-to-day, the site needs no attention: GitHub Pages serves the files and Supabase
handles accounts. The dated items below are what will actually need doing.

## What runs where

| Piece | Where | Notes |
|---|---|---|
| The site | GitHub Pages, from the `Jannetty/radio_radio` repo | Deployed by `.github/workflows/pages.yml` on every push to `main` |
| Accounts and synced progress | Supabase project `rrwqdawubtkskxdydapd` (Free plan) | One table, `public.progress`, plus Supabase's built-in auth |
| Question pools | `app/data/pools.json` and `app/figs/` in the repo | Built from the official FCC and NCVEC pools; see `tools/pools/README.md` |
| supabase-js | `app/vendor/supabase.js` (v2.118.0) | Vendored, so the site doesn't depend on a CDN |

The site works without Supabase: if the project is paused or down, progress is still saved on
each device and syncs once Supabase is back.

## Calendar

| When | Task | Section |
|---|---|---|
| Any week without use | Supabase pauses Free projects after about a week with no activity | [Supabase pausing](#supabase-pausing-and-restoring) |
| Every few months | Check NCVEC for errata to the amateur pools; export a backup | [Errata](#errata-to-an-existing-pool), [Backups](#backups) |
| Once a year | Update GitHub Actions and supabase-js versions; run the Security Advisor | [Keeping dependencies current](#keeping-dependencies-current) |
| Early 2027 → **July 1, 2027** | New **General** pool (2027–2031) replaces the current one | [Replacing a pool](#replacing-a-pool-with-a-new-version) |
| Early 2028 → **July 1, 2028** | New **Extra** pool replaces 2024–2028 | Same |
| Early 2030 → **July 1, 2030** | New **Technician** pool replaces 2026–2030 | Same |
| Rarely, by FCC public notice | A commercial pool (Elements 1, 3, 7, 8) is revised | Same |

NCVEC usually publishes a new pool several months before it takes effect. Add it to the site when
it's published, as a separate exam, so people can start studying it early. Retire the old
pool after its last valid exam date (June 30 of the changeover year).

## Deploying

Pushing to `main` runs the tests, then publishes `app/`. Two jobs run: **build** (tests, cache
stamp, upload) and **deploy** (publish). In the repo's **Settings → Pages**, **Source** must be
**GitHub Actions**.

Each deploy writes the commit into the service worker's cache name (`app/sw.js`). Installed copies
download the new version in the background and use it on their next launch, so a change can take
two opens to show on a phone.

**If a deploy fails:**
- **The build job fails**: a test failed. Run `npm test` locally and fix it.
- **Deploy fails with "Failed to create deployment (status: 500)"**: this is a GitHub-side
  error. Open the run, click **Re-run jobs → Re-run failed jobs**, and check
  https://www.githubstatus.com if it keeps happening.
- **Deploy fails with "No artifacts named github-pages were found"**: upload and deploy must stay
  in separate jobs (deploy has `needs: build`). This happened when they were in one job.

## Supabase

Dashboard: https://supabase.com/dashboard. The project's URL and publishable key live in
`app/config.js`. They are public by design; row-level security on `public.progress` is what keeps
each person's data private.

### Keys

- The **publishable key** (`sb_publishable_…`) is in `app/config.js`. To replace it, create a new one
  under **Project Settings → API Keys**, update `config.js`, push, and delete the old key once the
  deploy is live.
- **Never** put a secret key (`sb_secret_…`) or the legacy `service_role` key in the repo or the app.
  They bypass row-level security.

### Supabase pausing and restoring

On the Free plan, Supabase pauses a project after about a week with little activity. Normal use
of the site keeps it awake. Supabase emails a warning before pausing.

- **While paused**: the site keeps working, but sign-in and sync fail. Progress stays on each device.
- **To restore**: open the project in the dashboard and click **Restore**. Restoring is possible for
  90 days after the pause; after that the project can't be brought back.
- **To prevent it**: use the site, open the dashboard once in a while, or upgrade to Pro
  (paid projects are never paused). A scheduled GitHub Action that pings the project every few
  days also works.

### Backups

The Free plan has no automatic backups. Every few months, and before any database migration,
export the table:

1. **SQL Editor → New query**: `select * from public.progress;`
2. Run it and use the results' export/download option to save a CSV.

Each row is one person's progress for one exam. Restoring means inserting the rows back
(`user_id`, `pool`, `data`); the users must still exist in **Authentication → Users**.

### Auth and email

- **URLs**: **Authentication → URL Configuration**. **Site URL** must be the live site, and
  **Redirect URLs** must include it, plus `http://localhost:8642/` for local testing. Update both if
  the site ever moves (for example to a custom domain), or confirmation and sign-in-link emails
  will point to the wrong place.
- **Email sending**: Supabase's built-in sender only sends a few emails an hour and is meant for
  testing. If more than a handful of people use the site, set up a provider such as Resend or
  Postmark under **Authentication → Emails → SMTP Settings**.
- **Email confirmation** (on by default) is under **Authentication → Providers → Email**. Leave it
  on; it stops fake sign-ups.

### Helping users

- **Forgot password**: the sign-in form has "Email me a sign-in link". After signing in, they set
  a new password from the account menu.
- **Delete an account**: **Authentication → Users → … → Delete user**. Their progress rows are
  deleted with them (`on delete cascade`).
- **Look at someone's progress**: `select pool, updated_at, data from public.progress where user_id = '…';`

### Useful queries

Who has synced recently:

```sql
select u.email, p.pool, p.updated_at
from public.progress p join auth.users u on u.id = p.user_id
order by p.updated_at desc;
```

The SQL Editor runs with full admin rights. Anything with `update`, `delete`, `drop` or
`alter` changes real data, so take a backup first.

## Database changes

- `supabase/schema.sql` is the complete current schema. Running it on a new project gives
  the full setup.
- `supabase/migrations/` holds one file per change made after a project already existed, named
  `YYYY-MM-DD-what-it-does.sql`. To change the database: write the migration, update `schema.sql` to
  match, take a backup, run the migration in the SQL Editor, then push the app change that needs it.
- Applied so far: `2026-11-25-amateur-pools.sql` (allowed the `tech` and `extra` pools).

**Security Advisor**: run **Advisors → Security Advisor** after any database change and once a
year. Any new table must have row-level security enabled, or anyone with the publishable key can
read it.

## Question pools

How the data is built and checked is in `tools/pools/README.md`. After any change to
`pools.json`, run `npm test`. The data tests check pool sizes, one exam question per topic or
group, every figure file, and spot answers against the official keys. Update the expected
counts in `tests/data.test.js` to match the new pool.

Progress, sessions and exam history refer to questions by ID (for example `T1A01`), never by
position, so the rules below keep everyone's progress intact.

### Errata to an existing pool

NCVEC posts errata on each pool's page (withdrawn or reworded questions):
- Technician: https://ncvec.org/index.php/2026-2030-technician-question-pool
- General: https://ncvec.org/index.php/2023-2027-general-question-pool-release
- Extra: https://ncvec.org/index.php/2024-2028-extra-class-question-pool-release

Download the new .docx, rebuild `pools.json`, and update the `src` text for that pool (shown in
the site's footer). Withdrawn questions drop out of people's unfinished sessions and exam history
the next time they open the site. Reworded questions keep their stats.

### Adding a new exam

1. Add the pool to `pools.json` with a new id (`tools/pools/build_data.py`), and set its `cat`
   (`amateur` or `commercial`), exam size `n`, and pass mark `p`.
2. Add a flag for the id in `app/src/ui/flags.js`.
3. Add any new figure files to `FILES` in `app/sw.js`.
4. Write a migration that adds the id to the `progress_pool_check` constraint (copy
   `2026-11-25-amateur-pools.sql`), update `schema.sql`, and run the migration **before** pushing.
   Until it runs, syncing fails for anyone who studies the new exam.
5. Add expected counts in `tests/data.test.js`, run `npm test`, and push.

### Replacing a pool with a new version

A new pool reuses question IDs (G1A01 and so on) for different questions, so never overwrite the
old pool's id. Old stats would attach to the wrong questions.

1. Add the new pool as a **new exam** following the steps above, with an id like `gen2027`, a
   name like "General Class (2027–2031)", and the old pool's flag.
2. Keep both until the old one expires (June 30), so people mid-study can finish.
3. After it expires, remove the old pool from `pools.json`. Its rows stay in the database and the
   site ignores them. Leave its id in the constraint so old rows remain valid.

The FCC commercial pools change rarely, and only by public notice on the FCC's
[commercial operator examinations page](https://www.fcc.gov/wireless/bureau-divisions/mobility-division/commercial-radio-operator-license-program/examinations).
Treat a revision the same way.

## Keeping dependencies current

- **GitHub Actions** (`.github/workflows/pages.yml`): GitHub warns in the run log when an action
  version is deprecated. Move to the newest major version of `checkout`, `setup-node`,
  `configure-pages`, `upload-pages-artifact` and `deploy-pages` together.
- **supabase-js** (`app/vendor/supabase.js`): download the UMD build from the npm package
  (`https://registry.npmjs.org/@supabase/supabase-js/-/supabase-js-<version>.tgz`, file
  `package/dist/umd/supabase.js`), replace the vendored file and its license, update the version
  in this document and the README, and test signing in, syncing and signing out on the live site.
  Pick a release at least a couple of weeks old.
- **Files**: if you add, rename or remove a file under `app/`, update `FILES` in `app/sw.js`. A
  missing file breaks the offline install.

## How sync works

- Progress is one JSON record per person per exam, about 10–40 KB. It holds, for each question,
  right and wrong counts, the current streak and when it was last answered; the unfinished study
  session; the unfinished practice exam; and the last 40 exam results. A question is mastered
  after 3 right answers in a row (`MASTERY_STREAK` in `app/src/core/progress.js`).
- Every change is saved on the device first. A few seconds later it is merged with the server copy
  and uploaded. The site also syncs when it opens, when it comes back to the foreground, and when
  the connection returns.
- Merging is per question: whichever device answered most recently wins. Exam history from both
  devices is combined. The study session and the practice exam each keep the copy that changed
  last. "Reset progress" wipes everything older than the reset, on every device.
- Signing out removes progress from that device; it stays in the account. Progress made before
  signing in is merged into the account on first sign-in.
- Records carry a format version (`v`). Older records are converted when loaded
  (`normalize` in `progress.js`). Any future format change should do the same.

## Setting up from scratch

To rebuild everything, for example after losing the Supabase project or forking the repo:

**GitHub Pages**
1. Push the repo to GitHub. In **Settings → Pages**, set **Source** to **GitHub Actions**.
2. Push to `main` (or run the workflow by hand from the Actions tab).

**Supabase**
1. Create a project at https://supabase.com. Keep the Data API turned on.
2. **SQL Editor → New query**: paste `supabase/schema.sql` and run it. Migrations aren't needed;
   `schema.sql` already includes them.
3. **Authentication → URL Configuration**: set **Site URL** to the Pages URL and add it, plus
   `http://localhost:8642/`, to **Redirect URLs**.
4. Click **Connect** at the top of the project page and copy the **Project URL**
   (`https://<ref>.supabase.co`, with nothing after it) and the **publishable key** into
   `app/config.js`. They're also under **Integrations → Data API** and **Project Settings → API Keys**.
5. Push. The site shows a **Sign in** button once `config.js` is filled in.
6. Restore progress from a backup if you have one (see [Backups](#backups)). Users have to sign up
   again first, so their new user IDs would need mapping. In practice, a fresh start is simpler.
7. Run the Security Advisor and update the project ID at the top of this document.
