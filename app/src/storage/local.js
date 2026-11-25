// This device's copy of progress, in localStorage. Always written first, so the app works
// offline and without an account. `owner` remembers which account the copy belongs to.
import { blank } from '../core/progress.js';

const KEY = 'radiostudy.';
const OWNER = 'radiostudy.owner';

export function loadLocal(id) {
  try {
    const v = JSON.parse(localStorage.getItem(KEY + id));
    if (v && v.st) return { ...blank(), ...v };
  } catch { /* storage unavailable or corrupt: start fresh */ }
  return blank();
}

export function saveLocal(id, p) {
  try { localStorage.setItem(KEY + id, JSON.stringify(p)); } catch { /* full or blocked */ }
}

export function clearLocal(ids) {
  try { ids.forEach(id => localStorage.removeItem(KEY + id)); } catch { /* ignore */ }
}

export function getOwner() {
  try { return localStorage.getItem(OWNER); } catch { return null; }
}

export function setOwner(uid) {
  try { uid ? localStorage.setItem(OWNER, uid) : localStorage.removeItem(OWNER); } catch { /* ignore */ }
}
