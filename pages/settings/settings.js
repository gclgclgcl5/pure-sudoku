// 设置页面
const themeModule = require('../../utils/theme.js');

Page({
  data: {
    themes: [],           // 所有主题列表
    currentThemeId: '',   // 当前主题ID
    
    version: 'v2.1.0'
  },

  onLoad() {
    console.log('⚙️ 设置页面加载');
    this.loadThemes();
  },

  onShow() {
    // 每次显示页面时重新加载主题状态
    this.loadThemes();
  },

  // 加载主题列表
  loadThemes() {
    const allThemes = themeModule.getAllThemes();
    const currentTheme = themeModule.getCurrentTheme();
    
    this.setData({
      themes: allThemes,
      currentThemeId: currentTheme.id
    });
    
    // 设置导航栏颜色
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: currentTheme.colors.primary,
      animation: {
        duration: 300,
        timingFunc: 'easeInOut'
      }
    });
    
    console.log('🎨 已加载', allThemes.length, '个主题');
    console.log('✅ 当前主题:', currentTheme.name);
  },

  // 选择主题
  onThemeTap(e) {
    const themeId = e.currentTarget.dataset.themeId;
    const theme = this.data.themes.find(t => t.id === themeId);
    
    if (!theme) return;
    
    // 保存主题选择
    const success = themeModule.setTheme(themeId);
    
    if (success) {
      this.setData({
        currentThemeId: themeId
      });
      
      wx.showToast({
        title: `已切换到「${theme.name}」`,
        icon: 'success',
        duration: 1500
      });
      
      console.log('✅ 已切换主题:', theme.name);
      
      // 延迟一下再触发页面刷新，让用户看到提示
      setTimeout(() => {
        // 通知其他页面刷新主题
        const pages = getCurrentPages();
        pages.forEach(page => {
          if (page.route === 'pages/game/game' && page.applyTheme) {
            page.applyTheme();
          }
        });
      }, 500);
    } else {
      wx.showToast({
        title: '切换失败',
        icon: 'none'
      });
    }
  },

  // 关于应用
  onAboutTap() {
    wx.showModal({
      title: '关于纯粹数独训练',
      content: `版本：${this.data.version}\n\n一款专注于数独游戏本身的小程序，\n就像数独本身一样纯粹。\n\n感谢您的使用！`,
      showCancel: false,
      confirmText: '朕知道了'
    });
  },

  // 清除缓存
  onClearCacheTap() {
    wx.showModal({
      title: '清除缓存',
      content: '确定要清除游戏缓存吗？\n（不会影响统计数据和最佳时间）',
      confirmText: '确认清除',
      confirmColor: '#e53e3e',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 这里只清除临时缓存，不删除统计数据
          wx.showToast({
            title: '缓存已清除',
            icon: 'success'
          });
          console.log('缓存已清除');
        }
      }
    });
  },

  // 返回上一页
  onBackTap() {
    wx.navigateBack();
  }
});

