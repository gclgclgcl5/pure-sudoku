// 开始页面 - 首页
const themeModule = require('../../utils/theme.js');
const collectionModule = require('../../utils/collection.js');

Page({
  data: {
    homeLogoEmoji: collectionModule.getHomeLogoEmoji(),
    menuItems: [
      {
        id: 'start',
        title: '开始游戏',
        icon: '🎮',
        desc: '开始新的数独挑战',
        path: '/pages/game/game'
      },
      {
        id: 'tutorial',
        title: '游戏教程',
        icon: '📖',
        desc: '学习数独游戏规则',
        path: '/pages/tutorial/tutorial'
      },
      {
        id: 'statistics',
        title: '游戏统计',
        icon: '📊',
        desc: '查看你的游戏数据',
        path: '/pages/statistics/statistics'
      },
      {
        id: 'collection',
        title: '收集',
        icon: '🎨',
        desc: '图鉴与成就图标一览',
        path: '/pages/collection/collection'
      },
      {
        id: 'settings',
        title: '设置',
        icon: '⚙️',
        desc: '自定义游戏外观和设置',
        path: '/pages/settings/settings'
      }
    ],
    theme: null
  },

  onLoad() {
    console.log('🏠 开始页面加载');
    this.applyTheme();
  },

  onShow() {
    this.applyTheme();
    wx.showShareMenu({
      menus: ['shareAppMessage', 'shareTimeline'],
      fail() {}
    });
  },

  /** 分享给好友（右上角菜单 / open-type="share"） */
  onShareAppMessage() {
    return {
      title: '纯粹数独训练 — 经典数独，随时开一局',
      path: '/pages/home/home?from=share'
    };
  },

  /** 分享到朋友圈（需微信 8.0.24+；打开后为单页模式，见官方文档） */
  onShareTimeline() {
    return {
      title: '纯粹数独训练 — 放松大脑，来玩数独吧',
      query: 'from=timeline'
    };
  },

  applyTheme() {
    const theme = themeModule.getCurrentTheme();
    const homeLogoEmoji = collectionModule.getHomeLogoEmoji();
    this.setData({ theme: theme, homeLogoEmoji });
    themeModule.applySystemTheme(theme);
    
    // 设置导航栏颜色
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: theme.colors.primary,
      animation: {
        duration: 300,
        timingFunc: 'easeInOut'
      }
    });
    
    // TabBar 与系统根层背景色由 themeModule.applySystemTheme 统一处理
  },

  // 点击菜单项
  onMenuTap(e) {
    const item = e.currentTarget.dataset.item;
    console.log('点击菜单:', item.title);
    
    if (item.id === 'start') {
      // 开始游戏，跳转到游戏页面
      wx.navigateTo({
        url: item.path
      });
    } else {
      // 其他页面也使用navigateTo
      wx.navigateTo({
        url: item.path
      });
    }
  }
});

