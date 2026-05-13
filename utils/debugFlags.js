/**
 * 作者调试：友谊密码开启后，游戏内「提示」替换为「胜利」一键填解通关。
 * 不向用户展示入口说明；开关仅存本地。
 */
const STORAGE_KEY = 'debugFriendshipInstantWin';

function isDebugInstantWinEnabled() {
  try {
    return wx.getStorageSync(STORAGE_KEY) === true;
  } catch (e) {
    return false;
  }
}

function setDebugInstantWinEnabled(on) {
  try {
    if (on) {
      wx.setStorageSync(STORAGE_KEY, true);
    } else {
      wx.removeStorageSync(STORAGE_KEY);
    }
  } catch (e) {
    console.warn('debugFlags storage', e);
  }
}

module.exports = {
  STORAGE_KEY,
  isDebugInstantWinEnabled,
  setDebugInstantWinEnabled
};
