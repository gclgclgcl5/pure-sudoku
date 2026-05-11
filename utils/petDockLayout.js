/**
 * 宠物条站位：游戏页与收集图鉴共用同一存储，点击循环 中→右→左→中
 */
const STORAGE_KEY = 'petDockLayout';
const ORDER = ['center', 'right', 'left'];
const ALLOWED = new Set(ORDER);

function normalize(v) {
  return ALLOWED.has(v) ? v : 'center';
}

function getPetDockLayout() {
  try {
    const v = wx.getStorageSync(STORAGE_KEY);
    return normalize(v);
  } catch (e) {
    return 'center';
  }
}

function setPetDockLayout(layout) {
  const v = normalize(layout);
  try {
    wx.setStorageSync(STORAGE_KEY, v);
  } catch (e) {
    // ignore
  }
  return v;
}

/** 返回下一档并已写入存储 */
function cyclePetDockLayout() {
  const cur = getPetDockLayout();
  const idx = ORDER.indexOf(cur);
  const i = idx < 0 ? 0 : idx;
  const next = ORDER[(i + 1) % ORDER.length];
  setPetDockLayout(next);
  return next;
}

module.exports = {
  STORAGE_KEY,
  ORDER,
  getPetDockLayout,
  setPetDockLayout,
  cyclePetDockLayout
};
