# Rebuilding the question pools

`app/data/pools.json` and `app/figs/` are generated. You only need this when a pool changes
(the General pool is replaced on July 1, 2027; FCC pools change rarely).

## Sources

| Pool | Official source | Text source |
|---|---|---|
| Element 1 | FCC, approved June 25, 2009 | fccexam package |
| Element 3 | FCC, approved June 25, 2009 (17 figures) | fccexam package |
| Element 7 | FCC, approved Oct 6, 2021 (DA 21-1250) | fccexam package |
| Element 8 | FCC, 2009 pool updated Mar 6, 2024 (12 figures) | fccexam package |
| Technician | NCVEC 2026–2030 pool with errata (Feb 19, 2026), figures T-1 to T-3 | the NCVEC .docx itself |
| General | NCVEC 2023–2027 pool with 6th errata (Feb 4, 2026), figure G7-1 | the NCVEC .docx itself |
| Amateur Extra | NCVEC 2024–2028 pool with 4th errata (Feb 4, 2026), figures E5-1 to E9-3 | the NCVEC .docx itself |

- FCC pools: https://www.fcc.gov/wireless/bureau-divisions/mobility-division/commercial-radio-operator-license-program/examinations
- NCVEC pools: https://ncvec.org/index.php/2026-2030-technician-question-pool, https://ncvec.org/index.php/2023-2027-general-question-pool-release, https://ncvec.org/index.php/2024-2028-extra-class-question-pool-release
- fccexam (clean text of the FCC pools, plus the Element 3 and 8 figures): https://deb.debian.org/debian/pool/main/f/fccexam/

The FCC PDFs use a two-column layout for answer choices, and plain `pdftotext` reads the
columns in the wrong order, so question and choice text comes from fccexam. Subelement and
key topic names come from the official PDFs, and the answer keys were checked against them:
all 1,644 commercial keys match.

## Scripts

These are the scripts that produced the current data. Paths at the top of each assume the
sources were downloaded into `tools/pools/sources/` (git-ignored).

1. `parse_fccexam.py`: fccexam `E1.txt E3.txt E7.txt E8.txt` → questions and keys
2. `parse_official.py`: official PDFs (as `pdftotext` output) → subelement and key topic names, keys, and a diff against step 1
3. `parse_ncvec.py`: any NCVEC amateur pool .docx (via `pandoc -t plain`) → questions, groups, withdrawn questions. Figures are the images embedded in the .docx (`word/media/`).
4. `build_data.py`: combines them, extracts and resizes figures, writes `app/data/pools.json` and `app/figs/`

After rebuilding, run `npm test`. `tests/data.test.js` checks pool sizes, the one-question-per-topic
exam format, figures, and some spot answers against the official keys.

## Data format

```
{ "pools": [ { "id", "code", "name", "desc", "n" (exam questions), "p" (pass mark), "gl" ("Key topic" | "Group"), "src",
               "sections": [ { "id", "t", "g": [ { "id", "t", "q": [question indexes] } ] } ],
               "q": [ [id, question, [A, B, C, D], answerIndex, figure?] ] } ] }
```
