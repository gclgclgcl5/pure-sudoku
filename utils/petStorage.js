const ACTIVE_PETS_KEY = 'activePetIds';
/** 旧版单 id 存储，首次读取时迁移 */
const LEGACY_ACTIVE_PET_KEY = 'activePetId';

const petConfig = require('./petConfig.js');

function normalizeSquad(arr) {
  if (!Array.isArray(arr)) return [];
  const out = [];
  const seen = {};
  for (let i = 0; i < arr.length; i++) {
    const id = arr[i];
    if (!petConfig.isPlayablePetId(id) || seen[id]) continue;
    seen[id] = true;
    out.push(id);
    if (out.length >= 2) break;
  }
  return out;
}

function migrateLegacyIfNeeded() {
  try {
    const cur = wx.getStorageSync(ACTIVE_PETS_KEY);
    if (Array.isArray(cur)) return;
    const leg = wx.getStorageSync(LEGACY_ACTIVE_PET_KEY);
    const squad =
      leg && leg !== 'none' && petConfig.isPlayablePetId(leg) ? [leg] : [];
    wx.setStorageSync(ACTIVE_PETS_KEY, squad);
  } catch (e) {
    // ignore
  }
}

function getActivePetIds() {
  migrateLegacyIfNeeded();
  try {
    const v = wx.getStorageSync(ACTIVE_PETS_KEY);
    return normalizeSquad(Array.isArray(v) ? v : []);
  } catch (e) {
    return [];
  }
}

function setActivePetIds(ids) {
  const norm = normalizeSquad(ids);
  try {
    wx.setStorageSync(ACTIVE_PETS_KEY, norm);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * 已在队则移除；未满则加入队尾（先选左、后选右）；已满且不在队则 { ok:false, reason:'full' }
 */
function togglePetInSquad(petId) {
  if (!petConfig.isPlayablePetId(petId)) {
    return { ok: false, reason: 'invalid', ids: getActivePetIds() };
  }
  const cur = getActivePetIds();
  const i = cur.indexOf(petId);
  if (i >= 0) {
    const next = cur.filter((_, idx) => idx !== i);
    setActivePetIds(next);
    return { ok: true, action: 'removed', ids: next };
  }
  if (cur.length >= 2) {
    return { ok: false, reason: 'full', ids: cur };
  }
  const next = [...cur, petId];
  setActivePetIds(next);
  return { ok: true, action: 'added', ids: next };
}

function getLeftPetId() {
  const ids = getActivePetIds();
  return ids[0] || null;
}

module.exports = {
  ACTIVE_PETS_KEY,
  LEGACY_ACTIVE_PET_KEY,
  getActivePetIds,
  setActivePetIds,
  togglePetInSquad,
  getLeftPetId
};
