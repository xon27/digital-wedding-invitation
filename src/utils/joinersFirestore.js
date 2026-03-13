import { getSentJoiners, setSentJoiners, getRemovedIds, setRemovedIds } from './storage';

/** Static data folder – same as birthday invitation: single JSON file, name + lastname only */
const DATA_JOINERS_URL = '/data/joiners.json';

/** URL for saving RSVPs to server (Hostinger PHP appends to data/joiners.json) */
function getSaveRsvpUrl() {
  return new URL('save-rsvp.php', window.location.href).href;
}

/** Send joiners to server so they appear in data/joiners.json. No-op if server fails (localStorage still used). */
async function saveJoinersToServer(joiners) {
  try {
    const res = await fetch(getSaveRsvpUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ joiners }),
    });
    const data = await res.json().catch(() => ({}));
    return data.ok === true;
  } catch {
    return false;
  }
}

async function fetchStaticJoiners() {
  const res = await fetch(DATA_JOINERS_URL);
  if (!res.ok) return [];
  const list = await res.json();
  return Array.isArray(list) ? list : [];
}

export async function fetchJoinersList() {
  const staticList = await fetchStaticJoiners();
  const removedIds = getRemovedIds();
  const added = getSentJoiners();

  const fromStatic = staticList
    .map((j, i) => ({
      id: j.id || `static-${i}`,
      name: j.name ?? '',
      lastname: j.lastname ?? '',
    }))
    .filter((j) => !removedIds.includes(j.id));

  const fromLocal = added.map((j, i) => ({
    id: `local-${i}`,
    name: j.name ?? '',
    lastname: j.lastname ?? '',
  }));

  return [...fromStatic, ...fromLocal];
}

export async function addJoinersToList(joiners) {
  if (!joiners || joiners.length === 0) return;
  const existing = getSentJoiners();
  setSentJoiners(existing.concat(joiners));
  // Also send to server so data/joiners.json is updated on Hostinger
  await saveJoinersToServer(joiners);
}

export async function removeJoinerFromList(id) {
  if (!id) return;
  if (id.startsWith('local-')) {
    const list = getSentJoiners();
    const idx = parseInt(id.replace('local-', ''), 10);
    if (idx >= 0 && idx < list.length) {
      list.splice(idx, 1);
      setSentJoiners(list);
    }
    return;
  }
  const removed = getRemovedIds();
  if (!removed.includes(id)) {
    setRemovedIds([...removed, id]);
  }
}

/** Add guests only to localStorage (for "Generate test guests"). */
export function addTestJoinersToStorage(joiners) {
  if (!joiners || joiners.length === 0) return;
  const existing = getSentJoiners();
  setSentJoiners(existing.concat(joiners));
}
