# Explanations

Source files for the "Why is this correct?" panels and the study-guide pages. Element 1 is the only exam with explanations so far.

```
tools/explanations/
  sources.json        every cited rule section (heading + eCFR link) and outside document (title + link)
  e1/questions.json   one entry per question: why, optional note, optional basis, sources with quotes, status
  e1/topics.json      one entry per key topic: intro, key facts with a source each, further reading, status
  build.py            writes app/data/explanations/<pool>.json
  review.py           writes docs/explanations/<pool>-review.md for a human read-through
```

## Rules for an entry

- Every factual sentence must be backed by a source in `src`, and every `quote` must appear word for word in that source. Prefer the current eCFR text (47 CFR Part 80, 47 CFR Part 13, 33 CFR) and official ITU, IMO, NOAA, NWS and FAA documents.
- If today's rule differs from the 2009 answer key, say so in `note`. The exam still grades on its key, so the explanation explains the keyed answer and the note says what changed.
- If no official text states the answer (operating practice or general radio knowledge), set `"basis": "practice"`. The app labels these "General operating practice, not a quoted rule".
- If you can't support an answer, leave the question out. The app simply shows no explanation for it.
- An entry is published only once it has `"status": "verified"`. Set that only after someone other than the author has checked it against the sources.

## Workflow

1. Download the source texts. For CFR sections use the eCFR API, e.g.
   `curl --compressed -H 'Accept: application/xml' 'https://www.ecfr.gov/api/versioner/v1/full/2026-11-01/title-47.xml?part=80&section=80.203'`
   For documents, save the official PDF or page and convert it to text (`pdftotext -layout`).
2. Write or edit entries in `<pool>/questions.json` and `<pool>/topics.json`.
3. Check every quote appears verbatim in its downloaded source (whitespace-normalized).
4. Have the entries independently reviewed: each explanation checked against its quotes, and each quote against the source. Fix or remove anything flagged, then mark the rest `"status": "verified"`.
5. From the repo root: `python3 tools/explanations/build.py e1` and `python3 tools/explanations/review.py e1`.
6. `npm test` checks that every published entry belongs to a real question, cites a source, and is marked verified.

## Re-checking

CFR sections get amended. Once a year (alongside the pool calendar in `docs/maintenance.md`), re-download the cited sections and re-run the quote check. Any quote that no longer matches means the rule changed: re-review that entry.

## Adding another exam

Create `tools/explanations/<pool>/`, follow the workflow, then add the pool id to `EXPLAINED` in `app/src/ui/explain.js` and in `tests/explanations.test.js`, and add the built file to `FILES` in `app/sw.js`.
