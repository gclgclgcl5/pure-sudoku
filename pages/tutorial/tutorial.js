// 游戏教程页面
const themeModule = require('../../utils/theme.js');

Page({
  data: {
    theme: null,
    currentStep: 0, // 当前教程步骤
    totalSteps: 4, // 总步骤数
    
    // 教程步骤配置
    steps: [
      {
        id: 0,
        title: '欢迎来到数独世界',
        description: '数独是一个经典的数字逻辑游戏\n让我们一起学习如何玩吧！',
        icon: '🎉',
        showBoard: false,
        buttonText: '开始学习'
      },
      {
        id: 1,
        title: '规则一：行（Row）',
        description: '横向的9个格子称为"行"\n每行都必须包含1-9的数字，不能重复',
        icon: '↔️',
        showBoard: true,
        highlightType: 'row',
        highlightIndex: 4, // 高亮第5行（E行）
        exampleNumbers: [1, 2, 3, 4, 5, '', 7, 8, 9], // 缺少数字6
        missingNumber: 6,
        buttonText: '下一步'
      },
      {
        id: 2,
        title: '规则二：列（Column）',
        description: '纵向的9个格子称为"列"\n每列都必须包含1-9的数字，不能重复',
        icon: '↕️',
        showBoard: true,
        highlightType: 'column',
        highlightIndex: 4, // 高亮第5列
        exampleNumbers: [1, 2, '', 4, 5, 6, 7, 8, 9], // 缺少数字3
        missingNumber: 3,
        buttonText: '下一步'
      },
      {
        id: 3,
        title: '规则三：宫（Block）',
        description: '3×3的格子称为"宫"\n每个宫都必须包含1-9的数字，不能重复',
        icon: '⬜',
        showBoard: true,
        highlightType: 'block',
        highlightIndex: 4, // 高亮中间宫
        exampleNumbers: [1, 2, 3, 4, '', 6, 7, 8, 9], // 缺少数字5
        missingNumber: 5,
        buttonText: '下一步'
      },
      {
        id: 4,
        title: '开始游戏！',
        description: '你已经掌握了数独的基本规则！\n现在可以开始你的数独之旅了',
        icon: '🎊',
        showBoard: false,
        buttonText: '开始游戏'
      }
    ],
    
    // 示例棋盘（用于展示）
    demoBoard: []
  },

  onLoad() {
    console.log('📖 教程页面加载');
    this.applyTheme();
    this.initDemoBoard();
  },

  onShow() {
    this.applyTheme();
  },

  applyTheme() {
    const theme = themeModule.getCurrentTheme();
    this.setData({ theme: theme });
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

  // 初始化示例棋盘
  initDemoBoard() {
    const board = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        board.push({
          index: i * 9 + j,
          row: i,
          col: j,
          value: '',
          isHighlight: false,
          isRightBorder: j === 2 || j === 5,
          isBottomBorder: i === 2 || i === 5
        });
      }
    }
    this.setData({ demoBoard: board });
  },

  // 更新棋盘高亮
  updateBoardHighlight() {
    const { currentStep, steps, demoBoard } = this.data;
    const step = steps[currentStep];
    
    if (!step.showBoard) {
      return;
    }

    const newBoard = demoBoard.map(cell => {
      let isHighlight = false;
      let value = '';

      if (step.highlightType === 'row' && cell.row === step.highlightIndex) {
        isHighlight = true;
        value = step.exampleNumbers[cell.col];
      } else if (step.highlightType === 'column' && cell.col === step.highlightIndex) {
        isHighlight = true;
        value = step.exampleNumbers[cell.row];
      } else if (step.highlightType === 'block') {
        const blockRow = Math.floor(cell.row / 3);
        const blockCol = Math.floor(cell.col / 3);
        const blockIndex = blockRow * 3 + blockCol;
        if (blockIndex === step.highlightIndex) {
          isHighlight = true;
          const indexInBlock = (cell.row % 3) * 3 + (cell.col % 3);
          value = step.exampleNumbers[indexInBlock];
        }
      }

      return { ...cell, isHighlight, value };
    });

    this.setData({ demoBoard: newBoard });
  },

  // 下一步
  onNext() {
    const { currentStep, totalSteps } = this.data;
    
    if (currentStep >= totalSteps) {
      // 完成教程，跳转到游戏页面
      wx.redirectTo({
        url: '/pages/game/game'
      });
      return;
    }

    this.setData({ 
      currentStep: currentStep + 1 
    }, () => {
      this.updateBoardHighlight();
    });
  },

  // 上一步
  onPrev() {
    const { currentStep } = this.data;
    
    if (currentStep > 0) {
      this.setData({ 
        currentStep: currentStep - 1 
      }, () => {
        this.updateBoardHighlight();
      });
    }
  },

  // 跳过教程
  onSkip() {
    wx.navigateBack();
  }
});

