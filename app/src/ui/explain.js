// Answer explanations and topic study guides. Data lives in data/explanations/<pool>.json,
// built from the sourced drafts in tools/explanations/. Only pools listed here have them.
export const EXPLAINED = ['e1', 'e7', 'tech'];

const cache = {};

/** Fetch a pool's explanations once; resolves null if the pool has none or the fetch fails. */
export async function loadExplanations(poolId) {
  if (!EXPLAINED.includes(poolId)) return null;
  if (!(poolId in cache)) {
    cache[poolId] = fetch(`data/explanations/${poolId}.json`)
      .then(r => (r.ok ? r.json() : null))
      .catch(() => null);
  }
  return cache[poolId];
}

/** Explanations already loaded for a pool (null until loadExplanations resolves). */
export function loaded(poolId) {
  const c = cache[poolId];
  return c && !(c instanceof Promise) ? c : null;
}

// Promise values are swapped for the data once they resolve, so renders can read synchronously.
export async function warm(poolId) {
  const v = await loadExplanations(poolId);
  if (v) cache[poolId] = v;
  return v;
}

const safeUrl = u => (/^https:\/\//.test(u) ? u : '#');

/** Cited sources as a list: link text is the citation, followed by the exact quoted words. */
export function sourcesHtml(srcs, esc) {
  if (!srcs || !srcs.length) return '';
  return `<ul class="why-src">${srcs.map(s => `<li><a href="${esc(safeUrl(s.url))}" target="_blank" rel="noopener">${esc(s.cite)}</a>${s.quote ? `: <q>${esc(s.quote)}</q>` : ''}</li>`).join('')}</ul>`;
}

/**
 * The "why this is correct" panel for one question, or '' when the question has no explanation.
 * letter: the correct answer's letter as displayed; group: { id, t } of the question's key topic.
 */
export function whyHtml(ex, qid, letter, group, esc) {
  const e = ex && ex.q[qid];
  if (!e) return '';
  return `<div class="why">
    <div class="why-h">Why ${esc(letter)} is correct</div>
    <p>${esc(e.why)}</p>
    ${e.note ? `<p class="why-note"><b>Heads up:</b> ${esc(e.note)}</p>` : ''}
    ${e.basis === 'practice' ? '<p class="why-basis">Based on standard radio operating practice rather than one specific rule.</p>' : ''}
    ${e.basis === 'theory' ? '<p class="why-basis">Standard radio theory; no rule applies.</p>' : ''}
    ${sourcesHtml(e.src, esc)}
    ${group && ex.topics[group.id] ? `<button class="linkbtn" data-topic="${esc(group.id)}">Study guide: ${esc(group.t)} →</button>` : ''}
  </div>`;
}
