// 统计页面
const themeModule = require('../../utils/theme.js');

Page({
  data: {
    statistics: {
      totalGames: 0,
      completedGames: 0,
      totalErrors: 0,
      totalTime: 0,
      lastPlayDate: ''
    },
    
    bestTimes: {
      easy: '',
      medium: '',
      hard: '',
      expert: ''
    },
    
    difficultyLabels: {
      easy: '简单',
      medium: '中等',
      hard: '困难',
      expert: '专家'
    },
    completionRate: '0.0',
    averageTime: '00:00',
    averageErrors: '0.0',
    
    theme: null
  },

  onLoad() {
    console.log('📊 统计页面加载');
    this.applyTheme();
    this.loadStatistics();
    this.loadBestTimes();
  },
  
  onShow() {
    // 每次显示时重新加载数据（可能从游戏页面返回）
    this.applyTheme();
    this.loadStatistics();
    this.loadBestTimes();
  },

  applyTheme() {
    const theme = themeModule.getCurrentTheme();
    this.setData({ theme: theme });
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
  },

  // 加载统计数据
  loadStatistics() {
    const stats = wx.getStorageSync('gameStatistics');
    if (stats) {
      this.setData({
        statistics: stats
      });
      console.log('📊 加载统计数据:', stats);
    } else {
      console.log('📊 暂无统计数据');
    }

    this.updateComputedStats();
  },

  // 加载最佳时间
  loadBestTimes() {
    const difficulties = ['easy', 'medium', 'hard', 'expert'];
    const bestTimes = {};
    
    difficulties.forEach(difficulty => {
      const key = `bestTime_${difficulty}`;
      const time = wx.getStorageSync(key);
      bestTimes[difficulty] = time ? this.formatTime(time) : '暂无';
    });
    
    this.setData({
      bestTimes: bestTimes
    });
    
    console.log('🏆 最佳时间:', bestTimes);
  },

  // 格式化时间
  formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  },

  padZero(num) {
    return num.toString().padStart(2, '0');
  },

  // 计算完成率
  getCompletionRate() {
    const stats = this.data.statistics;
    if (stats.totalGames === 0) return '0.0';
    return ((stats.completedGames / stats.totalGames) * 100).toFixed(1);
  },

  // 计算平均用时
  getAverageTime() {
    const stats = this.data.statistics;
    if (stats.completedGames === 0) return '00:00';
    return this.formatTime(Math.floor(stats.totalTime / stats.completedGames));
  },

  // 计算平均错误
  getAverageErrors() {
    const stats = this.data.statistics;
    if (stats.completedGames === 0) return '0.0';
    return (stats.totalErrors / stats.completedGames).toFixed(1);
  },

  // 更新页面展示用统计字段（WXML 不支持直接调用 Page 方法）
  updateComputedStats() {
    this.setData({
      completionRate: this.getCompletionRate(),
      averageTime: this.getAverageTime(),
      averageErrors: this.getAverageErrors()
    });
  },

  // 重置统计数据
  onResetTap() {
    wx.showModal({
      title: '确认重置',
      content: '确定要重置所有统计数据吗？此操作不可恢复。',
      confirmText: '确认重置',
      confirmColor: '#e53e3e',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          this.resetStatistics();
        }
      }
    });
  },

  // 执行重置
  resetStatistics() {
    // 重置统计数据
    const stats = {
      totalGames: 0,
      completedGames: 0,
      totalErrors: 0,
      totalTime: 0,
      lastPlayDate: ''
    };
    
    wx.setStorageSync('gameStatistics', stats);
    
    // 重置最佳时间
    const difficulties = ['easy', 'medium', 'hard', 'expert'];
    difficulties.forEach(difficulty => {
      wx.removeStorageSync(`bestTime_${difficulty}`);
    });
    
    this.setData({
      statistics: stats,
      bestTimes: {
        easy: '暂无',
        medium: '暂无',
        hard: '暂无',
        expert: '暂无'
      },
      completionRate: '0.0',
      averageTime: '00:00',
      averageErrors: '0.0'
    });
    
    wx.showToast({
      title: '统计已重置',
      icon: 'success'
    });
    
    console.log('🗑️ 统计数据已重置');
  },

  // 返回上一页
  onBackTap() {
    wx.navigateBack();
  }
});

