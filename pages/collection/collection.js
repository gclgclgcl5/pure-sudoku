const themeModule = require('../../utils/theme.js');
const collectionModule = require('../../utils/collection.js');
const collectionUnlock = require('../../utils/collectionUnlock.js');
const petConfig = require('../../utils/petConfig.js');
const petStorage = require('../../utils/petStorage.js');
const petDockLayout = require('../../utils/petDockLayout.js');

const TAB_BASIC = 'basic';
const TAB_ADVANCED = 'advanced';
const TAB_PET = 'pet';

function buildPetGalleryList(activeIds) {
  const ids = Array.isArray(activeIds) ? activeIds : [];
  return petConfig.getGalleryPetsOrdered().map((p) => ({
    ...p,
    inSquad: ids.indexOf(p.id) >= 0,
    goPlayLabel: ids.indexOf(p.id) >= 0 ? '取消携带' : '走，我们去玩！'
  }));
}

function buildActiveSquadHint(ids) {
  if (!ids.length) {
    return '当前出战：无（在图鉴点「走，我们去玩！」可携带，最多两只）';
  }
  if (ids.length === 1) {
    const pet = petConfig.getPetById(ids[0]);
    const n = pet && pet.name ? pet.name : '';
    return `当前出战：${n}（左；还可再带一只）`;
  }
  const a = petConfig.getPetById(ids[0]);
  const b = petConfig.getPetById(ids[1]);
  return `当前出战：${a.name}（左）· ${b.name}（右）`;
}

Page({
  data: {
    theme: themeModule.getCurrentTheme(),
    activeTab: TAB_BASIC,
    gridScope: collectionModule.SCOPE_BASIC,
    swiperPages: [],
    currentPage: 0,
    showPageDots: false,
    basicProgress: { unlocked: 0, total: 0 },
    advancedProgress: { unlocked: 0, total: 0 },

    petGalleryList: [],
    activePetIds: [],
    activeSquadHint: '',
    petSwiperCurrent: 0,
    petGalleryBubbleVisible: false,
    petGalleryBubbleText: '',
    petGalleryShakeId: '',
    petImgFail: {},
    petDockLayout: 'center'
  },

  _galleryBubbleTimer: null,

  _patchPetTabFromStorage() {
    const ids = petStorage.getActivePetIds();
    this.setData({
      activePetIds: ids,
      petGalleryList: buildPetGalleryList(ids),
      activeSquadHint: buildActiveSquadHint(ids),
      petDockLayout: petDockLayout.getPetDockLayout()
    });
  },

  onLoad() {
    this._patchPetTabFromStorage();
    this.refreshGalleryAndProgress();
    this.applyTheme();
  },

  onUnload() {
    this._clearGalleryBubble();
  },

  onShow() {
    this.applyTheme();
    this.refreshGalleryAndProgress();
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

  _clearGalleryBubble() {
    if (this._galleryBubbleTimer) {
      clearTimeout(this._galleryBubbleTimer);
      this._galleryBubbleTimer = null;
    }
    this.setData({
      petGalleryBubbleVisible: false,
      petGalleryBubbleText: ''
    });
  },

  _showGalleryBubble(text) {
    if (!text) return;
    if (this._galleryBubbleTimer) {
      clearTimeout(this._galleryBubbleTimer);
      this._galleryBubbleTimer = null;
    }
    this.setData({
      petGalleryBubbleVisible: true,
      petGalleryBubbleText: text
    });
    this._galleryBubbleTimer = setTimeout(() => {
      this._galleryBubbleTimer = null;
      this.setData({
        petGalleryBubbleVisible: false,
        petGalleryBubbleText: ''
      });
    }, 2500);
  },

  refreshGalleryAndProgress() {
    const b = collectionUnlock.getProgress(collectionModule.SCOPE_BASIC);
    const a = collectionUnlock.getProgress(collectionModule.SCOPE_ADVANCED);
    const tab = this.data.activeTab;

    if (tab === TAB_PET) {
      this._patchPetTabFromStorage();
      this.setData({
        basicProgress: b,
        advancedProgress: a
      });
      return;
    }

    const isBasic = tab === TAB_BASIC;
    const scope = isBasic ? collectionModule.SCOPE_BASIC : collectionModule.SCOPE_ADVANCED;
    const swiperPages = collectionUnlock.buildDisplaySwiperPages(scope);

    this.setData({
      activeTab: tab,
      gridScope: scope,
      swiperPages,
      currentPage: 0,
      showPageDots: swiperPages.length > 1,
      basicProgress: b,
      advancedProgress: a
    });
  },

  onTabTap(e) {
    const tab = e.currentTarget.dataset.tab;
    if (!tab || tab === this.data.activeTab) return;

    if (tab === TAB_PET) {
      this._clearGalleryBubble();
      this.setData({
        activeTab: TAB_PET,
        petSwiperCurrent: 0
      });
      this._patchPetTabFromStorage();
      this.refreshGalleryAndProgress();
      return;
    }

    const isBasic = tab === TAB_BASIC;
    const scope = isBasic ? collectionModule.SCOPE_BASIC : collectionModule.SCOPE_ADVANCED;
    const swiperPages = collectionUnlock.buildDisplaySwiperPages(scope);

    this.setData({
      activeTab: tab,
      gridScope: scope,
      swiperPages,
      currentPage: 0,
      showPageDots: swiperPages.length > 1,
      basicProgress: collectionUnlock.getProgress(collectionModule.SCOPE_BASIC),
      advancedProgress: collectionUnlock.getProgress(collectionModule.SCOPE_ADVANCED)
    });
  },

  onGridSwiperChange(e) {
    this.setData({
      currentPage: e.detail.current
    });
  },

  onCellTap(e) {
    const id = e.currentTarget.dataset.id;
    const scope = e.currentTarget.dataset.scope;
    if (!id || !scope) return;
    wx.navigateTo({
      url: `/pages/collection-detail/collection-detail?id=${id}&scope=${scope}`
    });
  },

  onLockedCellTap() {
    wx.showToast({
      title: '尚未收录',
      icon: 'none',
      duration: 1200
    });
  },

  onPetGallerySwiperChange(e) {
    this._clearGalleryBubble();
    this.setData({ petSwiperCurrent: e.detail.current });
  },

  onPetGalleryPetTap(e) {
    const id = e.currentTarget.dataset.id;
    if (!id || !petConfig.isPlayablePetId(id)) return;
    const line = petConfig.getTapGalleryLine(id);
    // 图鉴预览始终可轮换中/右/左；游戏内双宠条固定左右，不依赖本字段（见 game.wxml）
    const next = petDockLayout.cyclePetDockLayout();
    this.setData({ petGalleryShakeId: id, petDockLayout: next });
    setTimeout(() => {
      this.setData({ petGalleryShakeId: '' });
    }, 650);
    this._showGalleryBubble(line);
  },

  onPetGalleryImgError(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    this.setData({
      [`petImgFail.${id}`]: true
    });
  },

  onPetGoPlay(e) {
    if (this._suppressNextPetGoTap) {
      this._suppressNextPetGoTap = false;
      return;
    }
    const id = e.currentTarget.dataset.id;
    if (!id || !petConfig.isPlayablePetId(id)) return;
    const prev = petStorage.getActivePetIds();
    const res = petStorage.togglePetInSquad(id);
    if (!res.ok && res.reason === 'full') {
      wx.showToast({
        title: '最多两只，请先在对应图鉴里取消一只',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (!res.ok) return;

    this._patchPetTabFromStorage();

    if (res.action === 'removed') {
      wx.showToast({
        title: '已取消携带',
        icon: 'none',
        duration: 1400
      });
      return;
    }

    petDockLayout.setPetDockLayout('center');
    this.setData({ petDockLayout: petDockLayout.getPetDockLayout() });

    if (prev.length === 0 && res.ids.length === 1) {
      wx.showToast({
        title: '还能再带一只一起出战',
        icon: 'none',
        duration: 1800
      });
      return;
    }

    const pet = petConfig.getPetById(id);
    wx.showToast({
      title: pet && pet.name ? `已携带：${pet.name}` : '已携带',
      icon: 'none',
      duration: 1400
    });
  },

  /** 长按「走，我们去玩！」或「取消携带」：一键清空全部出战携带 */
  onPetGoPlayLongPress() {
    const ids = petStorage.getActivePetIds();
    if (!ids.length) {
      wx.showToast({
        title: '当前没有携带宠物',
        icon: 'none',
        duration: 1400
      });
      return;
    }
    petStorage.clearActiveSquad();
    petDockLayout.setPetDockLayout('center');
    this._patchPetTabFromStorage();
    this._suppressNextPetGoTap = true;
    wx.showToast({
      title: '已清空全部出战',
      icon: 'none',
      duration: 1600
    });
  }
});
