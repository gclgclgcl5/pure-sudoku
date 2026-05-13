// 设置页面
const themeModule = require('../../utils/theme.js');
const debugFlags = require('../../utils/debugFlags.js');
const NUMBER_PAD_LAYOUT_KEY = 'numberPadLayout';

Page({
  data: {
    themes: [],           // 所有主题列表
    currentThemeId: '',   // 当前主题ID
    theme: themeModule.getCurrentTheme(),
    activeTab: 'theme',
    numberPadLayout: 'single',
    numberLayoutOptions: [
      {
        id: 'single',
        title: '单行排列',
        desc: '1-9 一行展示（当前布局）'
      },
      {
        id: 'double',
        title: '双行排列',
        desc: '第一行 1-5，第二行 6-9（更易点击）'
      }
    ],
    
    version: 'v2.1.0',
    debugInstantWin: false
  },

  onLoad() {
    console.log('⚙️ 设置页面加载');
    this.loadThemes();
    this.loadGameSettings();
  },

  onShow() {
    // 每次显示页面时重新加载主题状态
    this.loadThemes();
    this.loadGameSettings();
  },

  // 切换 Tab
  onTabTap(e) {
    const tab = e.currentTarget.dataset.tab;
    if (!tab || tab === this.data.activeTab) return;
    this.setData({
      activeTab: tab
    });
  },

  // 加载主题列表
  loadThemes() {
    const allThemes = themeModule.getAllThemes();
    const currentTheme = themeModule.getCurrentTheme();
    
    this.setData({
      themes: allThemes,
      currentThemeId: currentTheme.id,
      theme: currentTheme
    });
    themeModule.applySystemTheme(currentTheme);
    
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

  // 加载游戏设置
  loadGameSettings() {
    const numberPadLayout = wx.getStorageSync(NUMBER_PAD_LAYOUT_KEY) || 'single';
    this.setData({
      numberPadLayout: numberPadLayout,
      debugInstantWin: debugFlags.isDebugInstantWinEnabled()
    });
  },

  /** 关闭「胜利」调试（恢复「提示」按钮） */
  onDebugInstantWinOffTap() {
    debugFlags.setDebugInstantWinEnabled(false);
    this.setData({ debugInstantWin: false });
    const pages = getCurrentPages();
    pages.forEach(p => {
      if (p.route === 'pages/game/game') {
        p.setData({ debugInstantWin: false });
      }
    });
    wx.showToast({ title: '已关闭', icon: 'none' });
  },

  // 切换数字菜单排列
  onNumberLayoutTap(e) {
    const layout = e.currentTarget.dataset.layout;
    if (!layout || layout === this.data.numberPadLayout) return;

    wx.setStorageSync(NUMBER_PAD_LAYOUT_KEY, layout);
    this.setData({
      numberPadLayout: layout
    });

    const layoutLabel = layout === 'double' ? '双行排列' : '单行排列';
    wx.showToast({
      title: `已切换为${layoutLabel}`,
      icon: 'none',
      duration: 1200
    });

    // 尝试通知游戏页立即应用
    const pages = getCurrentPages();
    pages.forEach(page => {
      if (page.route === 'pages/game/game' && page.applyNumberPadLayout) {
        page.applyNumberPadLayout(layout);
      }
    });
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
        currentThemeId: themeId,
        theme: theme
      });
      themeModule.applySystemTheme(theme);

      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: theme.colors.primary,
        animation: {
          duration: 300,
          timingFunc: 'easeInOut'
        }
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

  // 关于应用（双按钮：朕知道了 / 友谊密码）
  onAboutTap() {
    const content = `版本：${this.data.version}\n\n我的天这都被你发现了\n恭喜周雨晴小朋友再次发现了属于你的彩蛋。\n\n下个版本还会继续藏哦！`;
    wx.showModal({
      title: '关于纯粹数独训练',
      content,
      showCancel: true,
      cancelText: '友谊密码',
      confirmText: '朕知道了',
      success: res => {
        if (res.confirm) return;
        if (!res.cancel) return;
        wx.showModal({
          title: '友谊密码',
          content: '你猜？哈哈哈哈哈！',
          editable: true,
          placeholderText: '请输入友谊密码',
          confirmText: '确定',
          cancelText: '取消',
          success: r2 => {
            if (!r2.confirm) return;
            const pwd = String(r2.content || '').trim();
            if (pwd === '0411') {
              const wasOn = debugFlags.isDebugInstantWinEnabled();
              if (wasOn) {
                debugFlags.setDebugInstantWinEnabled(false);
                this.setData({ debugInstantWin: false });
                wx.showToast({ title: '已恢复普通模式', icon: 'success' });
              } else {
                debugFlags.setDebugInstantWinEnabled(true);
                this.setData({ debugInstantWin: true });
                wx.showToast({ title: '已开启调试', icon: 'success' });
              }
              const pages = getCurrentPages();
              pages.forEach(p => {
                if (p.route === 'pages/game/game') {
                  p.setData({ debugInstantWin: !wasOn });
                }
              });
            } else {
              wx.showToast({ title: '密码不正确', icon: 'none' });
            }
          }
        });
      }
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
          // 只清除临时缓存，不删除统计数据、最佳时间和当前主题
          const tempKeys = [
            'gameProgress',
            'currentGameState',
            'tempGameState',
            'draftGame',
            'lastGameState'
          ];

          try {
            tempKeys.forEach(key => wx.removeStorageSync(key));
            wx.showToast({
              title: '缓存已清除',
              icon: 'success'
            });
            console.log('缓存已清除:', tempKeys);
          } catch (error) {
            console.error('清除缓存失败:', error);
            wx.showToast({
              title: '清除失败，请重试',
              icon: 'none'
            });
          }
        }
      }
    });
  },

  // 返回上一页
  onBackTap() {
    wx.navigateBack();
  }
});

