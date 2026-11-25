# Radio Exam Study

A free study app for all three amateur radio license exams and four FCC commercial radio operator exams:

| Exam | Pool | Practice exam |
|---|---|---|
| **Amateur** | | |
| Technician (Element 2, 2026–2030) | 409 questions, 3 figures | 35 questions, pass with 26 |
| General (Element 3, 2023–2027) | 423 questions, 1 figure | 35 questions, pass with 26 |
| Amateur Extra (Element 4, 2024–2028) | 599 questions, 10 figures | 50 questions, pass with 37 |
| **Commercial** | | |
| Element 1, Marine Radio Operator Permit | 144 questions | 24 questions, pass with 18 |
| Element 3, General Radiotelephone | 600 questions, 17 figures | 100 questions, pass with 75 |
| Element 7, GMDSS Radio Operator | 600 questions | 100 questions, pass with 75 |
| Element 8, Ship Radar Endorsement | 300 questions, 12 figures | 50 questions, pass with 38 |

- **Learn**: in order (picking up where you left off) or random, filtered by subelement or by
  never seen / missed / not mastered. Rounds of 10, 20 or 40; misses come back in retry rounds
  until you get each one right. A question is *mastered* after three right answers in a row.
- **Practice exam**: one random question from each key topic (or group), like the real test.
  No feedback until you submit, then a breakdown by subelement and a one-click study session
  of what you missed.
- **Read the pool**: every question with its answer, searchable, with answers hidden on request.

It's a static site (plain HTML, CSS and ES modules, no build step) with an optional
[Supabase](https://supabase.com) backend for accounts. Without an account, progress is
saved on the device. With one, it syncs between devices.

## Run it locally

```sh
python3 -m http.server 8642 -d app
```

Open http://localhost:8642. The service worker is skipped on localhost, so edits show on reload.

## Run the tests

```sh
npm test
```

No dependencies; tests use Node's built-in test runner. They cover the progress logic,
the study-session rounds, merging progress from two devices, and the question data itself.

## Deploy to GitHub Pages

Pushing to `main` runs `.github/workflows/pages.yml`: it runs the tests, then publishes `app/`.
One time only: in the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.

Each deploy stamps the commit into the service worker's cache name, so installed copies pick up
the new version on their next launch. If you add or rename a file under `app/`, add it to
`FILES` in `app/sw.js`.

## Set up accounts (optional)

1. Create a free project at https://supabase.com.
2. In the dashboard, open **SQL Editor → New query**, paste `supabase/schema.sql`, and run it.
   This creates the `progress` table with row-level security, so each person can read and
   write only their own rows.
3. Open **Authentication → URL Configuration**. Set **Site URL** to your Pages URL
   (for example `https://yourname.github.io/radio_radio/`) and add it, plus
   `http://localhost:8642/`, under **Redirect URLs**. Confirmation and sign-in-link emails
   send people back there.
4. Click **Connect** at the top of the project page and copy the **Project URL**
   (`https://<ref>.supabase.co`) and the **publishable key** (`sb_publishable_…`) into `app/config.js`.
   They're also under **Integrations → Data API** and **Project Settings → API Keys**; a legacy
   `anon` key works too. These are designed to be public; row-level security is what protects the data.
   Never put a secret key (`sb_secret_…`) or the `service_role` key in the app.
   If you turned off the Data API when creating the project, turn it on under **Integrations → Data API**.
5. Commit and push.

If your `progress` table was created before the Technician and Extra pools were added, run
`supabase/migrations/2026-11-25-amateur-pools.sql` once in the SQL Editor so it accepts them.

People sign up with an email and password. Supabase emails a confirmation link first
(you can turn that off under **Authentication → Providers → Email**). "Forgot your password?"
emails a one-time sign-in link, after which they can set a new password from the account menu.
Supabase's built-in email sender is rate-limited and meant for testing. For more than a
handful of users, add your own SMTP provider under **Authentication → Emails**.

### How syncing works

- Progress is one JSON record per person per exam (about 10–40 KB). It holds, for each
  question, right and wrong counts, the current streak, and when it was last answered; the
  unfinished study session; the unfinished practice exam; and the last 40 exam results.
- Every change is saved on the device first, so the app works offline. A few seconds later it
  is merged with the server copy and uploaded. The app also syncs when it opens, when it comes
  back to the foreground, and when the connection returns.
- Merging is per question: whichever device answered a question most recently wins. Exam
  history from both devices is combined. The study session and the practice exam are
  merged separately, and the copy that changed last wins. "Reset progress" on one device
  wipes everything older than the reset on every device.
- Signing out removes the progress from that device; it stays in the account. Progress made
  on a device before signing in is merged into the account on first sign-in.

## Adding or updating question pools

Progress, sessions and exam history refer to questions by their pool ID (for example `T1A01`),
so pools can change without scrambling anyone's progress:

- **Errata that withdraw a question**: rebuild `pools.json`. The withdrawn question drops out of
  unfinished sessions and exam history the next time each person opens the app; everything else stays.
- **A new exam**: add it to `pools.json` with a new pool id, add a flag in `src/ui/flags.js`, and add
  the id to the `progress_pool_check` constraint (a small migration in `supabase/migrations/`).
- **A replacement pool** (the next General pool starts July 1, 2027): add it as a new pool id
  such as `gen2027` instead of overwriting `gen`. The new pool reuses question IDs for different
  questions, and a new id keeps old stats from being attached to them.

## Install on a phone or laptop

- **iPhone**: open the site in Safari, tap **Share → Add to Home Screen**.
- **Android**: open it in Chrome, tap **⋮ → Add to Home screen** (or **Install app**).
- **Mac**: in Safari, **File → Add to Dock**; in Chrome, **⋮ → Cast, save, and share → Install page as app**.

It opens full screen and works offline after the first visit.

## Project layout

```
app/                 everything that is deployed
  index.html, styles.css, config.js, manifest.webmanifest, sw.js
  data/pools.json    all questions, answers, subelements and key topics
  figs/              the 43 diagrams referenced by questions
  vendor/supabase.js supabase-js 2.118.0 (MIT), loaded only when config.js is filled in
  src/core/          pure logic (progress, study sessions, merging), covered by tests
  src/storage/       device storage and Supabase sync
  src/ui/            rendering and events
supabase/schema.sql  database table and security rules
supabase/migrations/ one-off changes for databases created earlier
tests/               node --test
tools/pools/         how the question data was built, and scripts to rebuild it
```

## The flags

Each exam is marked with a flag from the International Code of Signals. Amateur: G (Golf,
"I require a pilot") for Technician, Q (Quebec) for General as a nod to Q-codes, and H (Hotel,
"I have a pilot on board") for Extra. Commercial: P (Papa, "about to put to sea") for Element 1,
K (Kilo, "I wish to communicate with you") for Element 3, U (Uniform, "you are running into
danger") for GMDSS, and E (Echo) for radar. They're decoration.

## Question pools

The FCC commercial pools are U.S. government works and the NCVEC amateur pools are released into
the public domain. See `tools/pools/README.md` for exact versions and how the data was
checked. The amateur pools are replaced on a four-year cycle: General on July 1, 2027,
Extra on July 1, 2028, and Technician on July 1, 2030.
