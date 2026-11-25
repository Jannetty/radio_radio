// Accounts and sync through Supabase (auth + one Postgres table, see supabase/schema.sql).
// Without SUPABASE_URL / SUPABASE_ANON_KEY in config.js this returns null and the app
// runs on this device's storage alone.
import { merge, same } from '../core/merge.js';
import { getOwner, setOwner, clearLocal } from './local.js';

const TABLE = 'progress';

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src; s.onload = resolve; s.onerror = reject;
    document.head.append(s);
  });
}

/**
 * store: { ids, get(id), put(id, p, fromServer), normalize(id, p) }  — the app's in-memory progress;
 *   normalize brings a record from the server up to the current format before merging
 * onState(state): called with { configured, user, status, message }
 *   status: 'signed-out' | 'syncing' | 'synced' | 'offline' | 'error'
 */
export async function createCloud(config, store, onState) {
  if (!config.SUPABASE_URL || !config.SUPABASE_ANON_KEY) return null;
  await loadScript('vendor/supabase.js');
  // The project URL is the bare https://<ref>.supabase.co; tolerate a pasted API path after it.
  const url = config.SUPABASE_URL.trim().replace(/\/(rest|auth)\/v1\/?$/, '').replace(/\/+$/, '');
  const sb = window.supabase.createClient(url, config.SUPABASE_ANON_KEY.trim(), {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  });

  const state = { configured: true, user: null, status: 'signed-out', message: '' };
  const emit = patch => { Object.assign(state, patch); onState({ ...state }); };
  const timers = {}, inflight = {}, again = {};

  async function fetchRows(ids) {
    const { data, error } = await sb.from(TABLE).select('pool,data').in('pool', ids);
    if (error) throw error;
    return Object.fromEntries(data.map(r => [r.pool, r.data]));
  }

  async function upsert(id, p) {
    const { error } = await sb.from(TABLE).upsert(
      { user_id: state.user.id, pool: id, data: p, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,pool' },
    );
    if (error) throw error;
  }

  function fail(e) {
    const offline = !navigator.onLine || /fetch|network/i.test(String(e && (e.message || e)));
    emit({ status: offline ? 'offline' : 'error', message: offline ? '' : String(e.message || e) });
  }

  /** Pull every pool, merge with this device, and push back whatever the server is missing. */
  async function syncAll() {
    if (!state.user) return;
    emit({ status: 'syncing' });
    try {
      const remote = await fetchRows(store.ids);
      const owner = getOwner();
      // Progress on this device belongs to someone else: replace it instead of merging.
      const foreign = owner && owner !== state.user.id;
      for (const id of store.ids) {
        const r = store.normalize(id, remote[id] || null);
        const merged = foreign ? merge(null, r) || null : merge(store.get(id), r);
        if (merged) store.put(id, merged, true);
        if (merged && merged.u && !same(merged, r)) await upsert(id, merged);
      }
      setOwner(state.user.id);
      emit({ status: 'synced', message: '' });
    } catch (e) { fail(e); }
  }

  /** Called after every local change; batches writes and merges with the server first. */
  function schedule(id) {
    if (!state.user) return;
    clearTimeout(timers[id]);
    timers[id] = setTimeout(() => push(id), 2500);
  }

  async function push(id) {
    if (inflight[id]) { again[id] = true; return; }
    inflight[id] = true;
    emit({ status: 'syncing' });
    try {
      const remote = store.normalize(id, (await fetchRows([id]))[id] || null);
      const merged = merge(store.get(id), remote);
      if (!same(merged, store.get(id))) store.put(id, merged, true);
      if (!same(merged, remote)) await upsert(id, merged);
      emit({ status: 'synced', message: '' });
    } catch (e) { fail(e); }
    inflight[id] = false;
    if (again[id]) { again[id] = false; push(id); }
  }

  sb.auth.onAuthStateChange((event, session) => {
    const user = session?.user || null;
    const changed = (user?.id || null) !== (state.user?.id || null);
    emit({ user: user ? { id: user.id, email: user.email } : null, status: user ? state.status : 'signed-out' });
    if (user && changed) setTimeout(syncAll, 0);
  });

  window.addEventListener('online', syncAll);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') syncAll();
    else Object.keys(timers).forEach(id => { clearTimeout(timers[id]); push(id); });
  });

  const redirect = () => location.origin + location.pathname;
  return {
    get state() { return { ...state }; },
    schedule,
    syncAll,
    async signIn(email, password) {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) throw error;
    },
    async signUp(email, password) {
      const { data, error } = await sb.auth.signUp({ email, password, options: { emailRedirectTo: redirect() } });
      if (error) throw error;
      return { needsConfirm: !data.session };
    },
    async sendLink(email) {
      const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: redirect(), shouldCreateUser: false } });
      if (error) throw error;
    },
    async setPassword(password) {
      const { error } = await sb.auth.updateUser({ password });
      if (error) throw error;
    },
    async signOut() {
      for (const id of Object.keys(timers)) { clearTimeout(timers[id]); await push(id); }
      await sb.auth.signOut();
      clearLocal(store.ids);
      setOwner(null);
      store.ids.forEach(id => store.put(id, null, true));
    },
  };
}
