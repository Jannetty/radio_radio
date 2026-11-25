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

It's a static site (plain HTML, CSS and ES modules, no build step) hosted on GitHub Pages,
with a [Supabase](https://supabase.com) backend for accounts. Without an account, progress is
saved on the device. With one, it's saved to the account and available on any device.

Deploying, Supabase administration, database changes, question pool updates and setup from
scratch are covered in [docs/maintenance.md](docs/maintenance.md).

## Run it locally

```sh
python3 -m http.server 8642 -d app
```

Open http://localhost:8642. The service worker is skipped on localhost, so edits show on reload.
Pushing to `main` deploys to GitHub Pages after the tests pass.

## Run the tests

```sh
npm test
```

No dependencies; tests use Node's built-in test runner. They cover the progress logic,
the study-session rounds, merging progress from two devices, and the question data itself.

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
docs/maintenance.md  how to keep it running
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
