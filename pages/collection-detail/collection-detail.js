const themeModule = require('../../utils/theme.js');
const collectionModule = require('../../utils/collection.js');
const collectionUnlock = require('../../utils/collectionUnlock.js');

Page({
  data: {
    theme: themeModule.getCurrentTheme(),
    scope: collectionModule.SCOPE_BASIC,
    items: [],
    current: 0,
    ready: false
  },

  onLoad(options) {
    const id = options.id || '';
    const scope = collectionModule.normalizeScope(options.scope);
    const unlockedItems = collectionUnlock.getUnlockedItemsInDisplayOrder(scope);
    const idx = unlockedItems.findIndex((x) => x.id === id);

    if (idx < 0 || !unlockedItems.length) {
      wx.showToast({ title: id ? '尚未收录该图鉴' : '参数无效', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }

    const first = unlockedItems[idx];
    this.setData({
      scope,
      items: unlockedItems,
      current: idx,
      ready: true
    });
    wx.setNavigationBarTitle({ title: first.name });
    this.applyTheme();
  },

  onShow() {
    this.applyTheme();
  },

  applyTheme() {
    const theme = themeModule.getCurrentTheme();
    this.setData({ theme });
    themeModule.applySystemTheme(theme);
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: theme.colors.primary,
      animation: {
        duration: 300,
        timingFunc: 'easeInOut'
      }
    });
  },

  onDetailSwiperChange(e) {
    const current = e.detail.current;
    const items = this.data.items;
    const item = items[current];
    if (item) {
      wx.setNavigationBarTitle({ title: item.name });
    }
    this.setData({ current });
  },

  onSetHomeLogoTap() {
    const items = this.data.items;
    const item = items[this.data.current];
    if (!item || !item.emoji) return;
    const ok = collectionModule.setHomeLogoEmoji(item.emoji);
    if (ok) {
      wx.showToast({
        title: '已设为主页图标',
        icon: 'success',
        duration: 1500
      });
    } else {
      wx.showToast({ title: '保存失败', icon: 'none' });
    }
  }
});
