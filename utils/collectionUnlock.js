/**
 * 图鉴通关解锁：已解锁 id 按「越新越靠前」存储（unshift），展示时先已解锁再未收录。
 */
const collectionModule = require('./collection.js');

const UNLOCK_STORAGE_KEY = 'collectionUnlockV1';

/** 每次通关获得的「解锁机会」次数（梯度明显，且均 ≥1） */
const GRANTS_BY_DIFFICULTY = {
  easy: 3,
  medium: 5,
  hard: 7,
  expert: 9
};

/** 单次机会走「高级图鉴」池的概率（专家封顶 75%） */
const ADVANCE_CHANCE_BY_DIFFICULTY = {
  easy: 0.2,
  medium: 0.3,
  hard: 0.45,
  expert: 0.75
};

function dedupeIdsPreserveOrder(ids) {
  const seen = new Set();
  const out = [];
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
}

function loadState() {
  try {
    const raw = wx.getStorageSync(UNLOCK_STORAGE_KEY);
    if (raw && typeof raw === 'object') {
      let basic = Array.isArray(raw.basic) ? raw.basic.filter(Boolean) : [];
      let advanced = Array.isArray(raw.advanced) ? raw.advanced.filter(Boolean) : [];

      basic = dedupeIdsPreserveOrder(basic);
      advanced = dedupeIdsPreserveOrder(advanced);

      // 旧版用 push：数组为「从旧到新」；新版用 unshift：应为「从新到旧」。迁移一次。
      if (raw.newestFirstFormat !== true && (basic.length > 0 || advanced.length > 0)) {
        basic = basic.length ? [...basic].reverse() : [];
        advanced = advanced.length ? [...advanced].reverse() : [];
        saveStateInner(basic, advanced);
      }

      return { basic, advanced };
    }
  } catch (e) {
    // ignore
  }
  return { basic: [], advanced: [] };
}

function saveStateInner(basic, advanced) {
  try {
    wx.setStorageSync(UNLOCK_STORAGE_KEY, {
      basic,
      advanced,
      newestFirstFormat: true
    });
  } catch (e) {
    console.error('collectionUnlock saveState', e);
  }
}

function saveState(state) {
  saveStateInner(state.basic, state.advanced);
}

function getLockedIdsFromState(state, scope) {
  const s = collectionModule.normalizeScope(scope);
  const allIds = collectionModule.getAllItems(s).map((x) => x.id);
  const unlocked = new Set(
    s === collectionModule.SCOPE_ADVANCED ? state.advanced : state.basic
  );
  return allIds.filter((id) => !unlocked.has(id));
}

function pickRandomId(ids) {
  if (!ids.length) return null;
  return ids[Math.floor(Math.random() * ids.length)];
}

/**
 * 在 state 上解锁一条：插到数组头部（最新在前）
 */
function tryUnlockOne(state, wantAdvanced) {
  const scope = wantAdvanced
    ? collectionModule.SCOPE_ADVANCED
    : collectionModule.SCOPE_BASIC;
  const pool = getLockedIdsFromState(state, scope);
  if (!pool.length) return null;
  const id = pickRandomId(pool);
  if (scope === collectionModule.SCOPE_ADVANCED) {
    state.advanced.unshift(id);
  } else {
    state.basic.unshift(id);
  }
  return { id, scope };
}

/**
 * 通关发奖：每次机会先判定走高级池或初级池；若目标池已空则尝试另一池。
 */
function applyClearReward(difficulty) {
  const n = GRANTS_BY_DIFFICULTY[difficulty] ?? GRANTS_BY_DIFFICULTY.easy;
  const p = ADVANCE_CHANCE_BY_DIFFICULTY[difficulty] ?? ADVANCE_CHANCE_BY_DIFFICULTY.easy;
  const state = loadState();
  const basicAdded = [];
  const advancedAdded = [];

  for (let i = 0; i < n; i++) {
    const wantAdvanced = Math.random() < p;
    let res = tryUnlockOne(state, wantAdvanced);
    if (!res) {
      res = tryUnlockOne(state, !wantAdvanced);
    }
    if (res) {
      if (res.scope === collectionModule.SCOPE_ADVANCED) {
        advancedAdded.push(res.id);
      } else {
        basicAdded.push(res.id);
      }
    }
  }

  saveState(state);
  return { basicAdded, advancedAdded };
}

function isUnlocked(id, scope) {
  const s = collectionModule.normalizeScope(scope);
  const st = loadState();
  const arr = s === collectionModule.SCOPE_ADVANCED ? st.advanced : st.basic;
  return arr.includes(id);
}

function getProgress(scope) {
  const s = collectionModule.normalizeScope(scope);
  const st = loadState();
  const total = collectionModule.getAllItems(s).length;
  const unlocked = s === collectionModule.SCOPE_ADVANCED ? st.advanced.length : st.basic.length;
  return { unlocked, total };
}

/**
 * 已解锁条目按存储顺序（新→旧），与收集页/详情 swiper 一致；仅含已解锁，不含未解锁。
 */
function getUnlockedItemsInDisplayOrder(scope) {
  const s = collectionModule.normalizeScope(scope);
  const st = loadState();
  const ids = s === collectionModule.SCOPE_ADVANCED ? st.advanced : st.basic;
  const idMap = new Map(collectionModule.getAllItems(s).map((x) => [x.id, x]));
  return ids.map((id) => idMap.get(id)).filter(Boolean);
}

/**
 * 九宫格分页：先「已解锁（新→旧）」，再「未解锁（图鉴表原始顺序）」；格子带 unlocked
 */
function buildDisplaySwiperPages(scope) {
  const s = collectionModule.normalizeScope(scope);
  const st = loadState();
  const all = collectionModule.getAllItems(s);
  const idMap = new Map(all.map((x) => [x.id, x]));
  const unlockedIds = s === collectionModule.SCOPE_ADVANCED ? st.advanced : st.basic;
  const unlockedSet = new Set(unlockedIds);

  const unlockedItems = unlockedIds.map((id) => idMap.get(id)).filter(Boolean);
  const lockedItems = all.filter((it) => !unlockedSet.has(it.id));
  const ordered = [...unlockedItems, ...lockedItems];

  const pages = collectionModule.chunkIntoPages(ordered, collectionModule.PAGE_SIZE);
  return pages.map((cells, pageId) => ({
    pageId,
    cells: cells.map((cell) => {
      if (!cell || cell._empty) return cell;
      return {
        ...cell,
        unlocked: unlockedSet.has(cell.id)
      };
    })
  }));
}

module.exports = {
  UNLOCK_STORAGE_KEY,
  GRANTS_BY_DIFFICULTY,
  ADVANCE_CHANCE_BY_DIFFICULTY,
  loadState,
  saveState,
  applyClearReward,
  isUnlocked,
  getProgress,
  buildDisplaySwiperPages,
  getUnlockedItemsInDisplayOrder
};
