/* Wedding invitation – separate keys from birthday app */
export const STORAGE_KEY = 'wd-invi-joiners';
export const SENT_LIST_KEY = 'wd-invi-sent-joiners';
export const REMOVED_IDS_KEY = 'wd-invi-removed-ids';
export const LIST_AUTH_KEY = 'wd-invi-list-auth';
export const LIST_ACCESS_SECRET = 'eventhandler';

export function getJoiners() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function setJoiners(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function getSentJoiners() {
  try {
    const raw = localStorage.getItem(SENT_LIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function setSentJoiners(list) {
  try {
    localStorage.setItem(SENT_LIST_KEY, JSON.stringify(list));
  } catch (e) {}
}

export function getRemovedIds() {
  try {
    const raw = localStorage.getItem(REMOVED_IDS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function setRemovedIds(ids) {
  try {
    localStorage.setItem(REMOVED_IDS_KEY, JSON.stringify(ids));
  } catch (e) {}
}
