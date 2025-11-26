// 公告页面
const themeModule = require('../../utils/theme.js');

Page({
  data: {
    announcements: [
      {
        id: 1,
        title: '欢迎来到纯粹数独训练！',
        date: '2025-01-12',
        type: 'welcome',
        content: '感谢您使用纯粹数独训练！这是一款专注于数独游戏本身的小程序，就像数独本身一样纯粹。'
      }
    ],
    
    theme: null,
    
    tutorials: [
      {
        id: 'rules',
        title: '📋 游戏规则',
        icon: '📋',
        content: [
          '• 数独是9×9的方格游戏',
          '• 目标：在空格中填入1-9的数字',
          '• 规则1：每一行都包含1-9，不能重复',
          '• 规则2：每一列都包含1-9，不能重复',
          '• 规则3：每个3×3宫格都包含1-9，不能重复',
          '• 已有的数字是题目，不能修改'
        ]
      },
      {
        id: 'basic',
        title: '🎮 基础操作',
        icon: '🎮',
        content: [
          '1. 点击空白格子选中',
          '2. 点击底部数字1-9填入',
          '3. 选中格子后点击"清除"可以删除数字',
          '4. 错误的数字会显示为红色',
          '5. 选中格子后会高亮相关行、列、宫',
          '6. 相同数字也会高亮显示'
        ]
      },
      {
        id: 'advanced',
        title: '🛠️ 高级功能',
        icon: '🛠️',
        content: [
          '• 撤销：回退上一步操作，可无限次撤销',
          '• 笔记模式：标记候选数字，帮助推理',
          '  - 点击"笔记"进入笔记模式',
          '  - 在格子中可标记多个候选数字',
          '  - 填入正式数字后自动清除相关笔记',
          '• 智能提示：自动找到最容易填入的格子',
          '• 暂停：隐藏数字和停止计时，休息一下'
        ]
      },
      {
        id: 'difficulty',
        title: '🎯 难度说明',
        icon: '🎯',
        content: [
          '• 简单：适合新手，空格较少（30-40个）',
          '• 中等：有一定挑战，空格适中（40-50个）',
          '• 困难：需要技巧，空格较多（50-55个）',
          '• 专家：高手挑战，空格很多（55-60个）',
          '',
          '💡 建议从简单难度开始，熟悉规则后再挑战更高难度'
        ]
      },
      {
        id: 'tips',
        title: '💡 解题技巧',
        icon: '💡',
        content: [
          '1. 唯一候选数法：格子只有一个可能的数字',
          '2. 排除法：在行/列/宫中排除已有数字',
          '3. 区块排除法：某个数字只能在特定位置',
          '4. 数对/数组法：多个格子共享候选数字',
          '5. 使用笔记功能记录候选数字',
          '6. 从数字最多的行/列/宫开始分析',
          '',
          '⏱️ 不要着急，慢慢推理更容易成功'
        ]
      },
      {
        id: 'statistics',
        title: '📊 统计说明',
        icon: '📊',
        content: [
          '• 总游戏数：开始的所有游戏（包括未完成）',
          '• 完成数：成功完成的游戏数量',
          '• 完成率：完成数 ÷ 总游戏数',
          '• 平均用时：完成游戏的平均时长',
          '• 平均错误：每局游戏的平均错误次数',
          '• 最佳时间：按难度分别记录最快完成时间',
          '',
          '🏆 挑战自己的最佳纪录吧！'
        ]
      }
    ],
    
    activeIndex: 0
  },

  onLoad() {
    console.log('📢 公告页面加载');
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

  // 切换教程展开/收起
  onTutorialTap(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      activeIndex: this.data.activeIndex === index ? -1 : index
    });
  }
});

