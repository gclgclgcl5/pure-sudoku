// 开始页面 - 首页
const themeModule = require('../../utils/theme.js');

Page({
  data: {
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
        id: 'settings',
        title: '设置',
        icon: '⚙️',
        desc: '自定义游戏设置',
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
  },

  applyTheme() {
    const theme = themeModule.getCurrentTheme();
    this.setData({ theme: theme });
    
    // 设置导航栏颜色
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: theme.colors.primary,
      animation: {
        duration: 300,
        timingFunc: 'easeInOut'
      }
    });
    
    // 设置TabBar颜色
    wx.setTabBarStyle({
      color: theme.colors.textLight,
      selectedColor: theme.colors.primary,
      backgroundColor: '#FFFFFF',
      borderStyle: 'white'
    });
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

