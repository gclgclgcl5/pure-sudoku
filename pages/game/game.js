// 游戏页面 - 阶段4+5版本（可玩的demo）
const Shudu = require('../../utils/shudu.js');

Page({
  data: {
    stage: '阶段6：顶部信息栏',
    cells: [],
    selectedIndex: -1,
    showNumberPad: false,
    
    // 阶段6: 顶部信息栏数据
    difficulties: [
      { value: 'easy', label: '简单' },
      { value: 'medium', label: '中等' },
      { value: 'hard', label: '困难' },
      { value: 'expert', label: '专家' }
    ],
    difficultyIndex: 0,
    currentDifficulty: 'easy',
    errorCount: 0,
    currentTime: '00:00',
    bestTime: '',
    
    // 计时器
    timerInterval: null,
    startTime: 0,
    elapsedTime: 0,
    
    // 阶段7: 功能按钮
    isNoteMode: false,
    canUndo: false,
    history: [],  // 操作历史栈
    
    // 阶段8: 暂停功能
    isPaused: false
  },
  
  onLoad(options) {
    console.log('\n========================================');
    console.log('🎮 数独小程序 - 阶段6：顶部信息栏');
    console.log('========================================\n');
    
    // 创建数独实例
    this.shudu = new Shudu();
    
    // 加载最佳时间
    this.loadBestTime();
    
    // 开始新游戏
    this.startNewGame();
  },
  
  onUnload() {
    // 页面卸载时清除计时器
    this.stopTimer();
  },
  
  onHide() {
    // 页面隐藏时暂停计时器
    this.stopTimer();
  },
  
  onShow() {
    // 页面显示时恢复计时器
    if (this.data.cells.length > 0 && !this.checkWinCondition()) {
      this.startTimer();
    }
  },
  
  // 开始新游戏
  startNewGame() {
    console.log('🔄 开始新游戏');
    
    // 停止当前计时器
    this.stopTimer();
    
    const difficulty = this.data.currentDifficulty;
    
    // 生成数独
    const startTime = Date.now();
    this.shudu.generate(difficulty);
    const endTime = Date.now();
    
    console.log('✅ 数独生成完成，耗时:', endTime - startTime, 'ms');
    console.log('题目难度:', difficulty);
    
    // 转换为显示数据
    const cells = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const value = this.shudu.board[i][j];
        const isFixed = this.shudu.initialBoard[i][j] !== 0;
        
        cells.push({
          index: i * 9 + j,
          row: i,
          col: j,
          value: value === 0 ? '' : value,
          isFixed: isFixed,
          hasError: false,
          isRelated: false,
          isSameNumber: false,
          showHint: false,
          hintValue: '',
          isRightBorder: j === 2 || j === 5,
          isBottomBorder: i === 2 || i === 5
        });
      }
    }
    
    // 重置游戏状态
    this.setData({
      cells: cells,
      selectedIndex: -1,
      errorCount: 0,
      currentTime: '00:00',
      elapsedTime: 0,
      isNoteMode: false,
      canUndo: false,
      history: [],
      isPaused: false
    });
    
    // 启动计时器
    this.startTimer();
    
    console.log('✅ 阶段6+ 视觉优化完成！');
    console.log('💡 新增功能: 区域高亮、相同数字高亮');
    console.log('========================================');
  },
  
  // 点击格子
  onCellTap(e) {
    const index = e.currentTarget.dataset.index;
    const cell = this.data.cells[index];
    
    // 如果是固定数字，也可以选中（用于查看相关区域和相同数字）
    console.log('📍 选中格子:', cell.row, cell.col, '值:', cell.value);
    
    // 更新选中状态并高亮相关格子
    this.updateHighlights(index);
  },
  
  // 更新高亮显示
  updateHighlights(selectedIndex) {
    const cells = this.data.cells;
    const selectedCell = cells[selectedIndex];
    const selectedValue = selectedCell.value;
    
    // 遍历所有格子，更新高亮状态
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      
      // 判断是否在同一行、同一列、同一宫格
      const sameRow = cell.row === selectedCell.row;
      const sameCol = cell.col === selectedCell.col;
      const sameBox = Math.floor(cell.row / 3) === Math.floor(selectedCell.row / 3) &&
                      Math.floor(cell.col / 3) === Math.floor(selectedCell.col / 3);
      
      // 判断是否是相同数字（且不为空）
      const sameNumber = selectedValue !== '' && cell.value === selectedValue;
      
      // 设置高亮状态
      cell.isRelated = (sameRow || sameCol || sameBox) && i !== selectedIndex;
      cell.isSameNumber = sameNumber && i !== selectedIndex;
    }
    
    this.setData({
      cells: cells,
      selectedIndex: selectedIndex
    });
    
    console.log('✨ 高亮显示: 相关区域 + 相同数字');
  },
  
  // 点击数字按钮
  onNumberTap(e) {
    const num = e.currentTarget.dataset.num;
    const selectedIndex = this.data.selectedIndex;
    
    if (selectedIndex === -1) {
      console.log('⚠️ 请先选择一个格子');
      wx.showToast({
        title: '请先选择格子',
        icon: 'none'
      });
      return;
    }
    
    const cell = this.data.cells[selectedIndex];
    
    // 如果是固定数字，不能修改
    if (cell.isFixed) {
      wx.showToast({
        title: '初始数字不能修改',
        icon: 'none'
      });
      return;
    }
    
    // 保存历史记录（用于撤销）
    this.saveHistory(selectedIndex, cell.value, cell.notes || []);
    
    if (this.data.isNoteMode) {
      // 笔记模式：添加/删除候选数字
      this.toggleNote(selectedIndex, num);
    } else {
      // 填数模式：填入数字
      this.fillNumber(selectedIndex, num);
    }
  },
  
  // 填入数字
  fillNumber(selectedIndex, num) {
    const cell = this.data.cells[selectedIndex];
    console.log('🔢 填入数字:', num, '到格子', cell.row, cell.col);
    
    // 更新数独数据
    this.shudu.board[cell.row][cell.col] = num;
    
    // 检查是否有冲突
    const hasConflict = this.shudu.hasConflict(cell.row, cell.col, num);
    
    // 更新显示
    const cells = this.data.cells;
    cells[selectedIndex].value = num;
    cells[selectedIndex].hasError = hasConflict;
    cells[selectedIndex].notes = [];  // 清除笔记
    
    // 如果有冲突，错误计数+1
    if (hasConflict) {
      const newErrorCount = this.data.errorCount + 1;
      this.setData({
        cells: cells,
        errorCount: newErrorCount
      });
      
      console.log('❌ 数字冲突，错误次数:', newErrorCount);
      
      // 如果错误超过3次，给提示
      if (newErrorCount >= 3) {
        wx.showToast({
          title: '错误较多，加油！',
          icon: 'none'
        });
      }
    } else {
      console.log('✅ 数字正确');
      
      this.setData({
        cells: cells
      });
    }
    
    // 更新高亮显示（因为数字变了）
    this.updateHighlights(selectedIndex);
    
    // 检查是否完成
    if (this.checkWinCondition()) {
      console.log('🎉 游戏完成！');
      this.showWinMessage();
    }
  },
  
  // 切换笔记（添加/删除候选数字）
  toggleNote(selectedIndex, num) {
    const cells = this.data.cells;
    const cell = cells[selectedIndex];
    
    // 初始化笔记数组
    if (!cell.notes) {
      cell.notes = [];
    }
    
    // 切换笔记
    const index = cell.notes.indexOf(num);
    if (index > -1) {
      cell.notes.splice(index, 1);  // 删除
      console.log('🗑️ 删除笔记:', num);
    } else {
      cell.notes.push(num);  // 添加
      cell.notes.sort();  // 排序
      console.log('✎ 添加笔记:', num);
    }
    
    this.setData({
      cells: cells
    });
  },
  
  // 清除数字
  onClearTap() {
    const selectedIndex = this.data.selectedIndex;
    
    if (selectedIndex === -1) {
      wx.showToast({
        title: '请先选择格子',
        icon: 'none'
      });
      return;
    }
    
    const cell = this.data.cells[selectedIndex];
    
    // 如果是固定数字，不能清除
    if (cell.isFixed) {
      wx.showToast({
        title: '初始数字不能清除',
        icon: 'none'
      });
      return;
    }
    
    // 保存历史记录
    this.saveHistory(selectedIndex, cell.value, cell.notes || []);
    
    console.log('🗑️ 清除格子:', cell.row, cell.col);
    
    // 更新数独数据
    this.shudu.board[cell.row][cell.col] = 0;
    
    // 更新显示
    const cells = this.data.cells;
    cells[selectedIndex].value = '';
    cells[selectedIndex].hasError = false;
    cells[selectedIndex].notes = [];
    
    this.setData({
      cells: cells
    });
    
    // 更新高亮
    this.updateHighlights(selectedIndex);
  },
  
  // 取消选中
  onCancelSelect() {
    this.setData({
      selectedIndex: -1
    });
  },
  
  // ==================== 阶段7: 工具按钮功能 ====================
  
  // 保存操作历史
  saveHistory(index, oldValue, oldNotes) {
    const history = this.data.history;
    history.push({
      index: index,
      oldValue: oldValue,
      oldNotes: [...oldNotes],
      timestamp: Date.now()
    });
    
    // 限制历史记录数量（最多50步）
    if (history.length > 50) {
      history.shift();
    }
    
    this.setData({
      history: history,
      canUndo: true
    });
  },
  
  // 撤销操作
  onUndo() {
    const history = this.data.history;
    
    if (history.length === 0) {
      wx.showToast({
        title: '没有可撤销的操作',
        icon: 'none'
      });
      return;
    }
    
    // 取出最后一步操作
    const lastStep = history.pop();
    const cells = this.data.cells;
    const cell = cells[lastStep.index];
    
    // 恢复状态
    cell.value = lastStep.oldValue;
    cell.notes = lastStep.oldNotes;
    cell.hasError = false;
    
    // 更新数独数据
    const row = cell.row;
    const col = cell.col;
    this.shudu.board[row][col] = lastStep.oldValue === '' ? 0 : parseInt(lastStep.oldValue);
    
    this.setData({
      cells: cells,
      history: history,
      canUndo: history.length > 0,
      selectedIndex: lastStep.index
    });
    
    // 更新高亮
    this.updateHighlights(lastStep.index);
    
    console.log('↶ 撤销操作');
    
    wx.showToast({
      title: '已撤销',
      icon: 'success',
      duration: 1000
    });
  },
  
  // 切换笔记模式
  onToggleNoteMode() {
    const newMode = !this.data.isNoteMode;
    
    this.setData({
      isNoteMode: newMode
    });
    
    console.log(newMode ? '✎ 切换到笔记模式' : '🔢 切换到填数模式');
    
    wx.showToast({
      title: newMode ? '笔记模式' : '填数模式',
      icon: 'none',
      duration: 1000
    });
  },
  
  // 提示功能
  onHint() {
    console.log('💡 请求提示');
    
    // 调用数独算法的智能提示
    const hint = this.shudu.getSmartHint();
    
    if (!hint) {
      wx.showToast({
        title: '暂无可提示内容',
        icon: 'none'
      });
      return;
    }
    
    const { row, col, value } = hint;
    const num = value;
    const index = row * 9 + col;
    
    console.log('💡 提示:', `(${row}, ${col}) = ${num}`);
    
    // 在格子中显示提示数字（带动画）
    const cells = this.data.cells;
    cells[index].hintValue = num;
    cells[index].showHint = true;
    
    this.setData({
      cells: cells,
      selectedIndex: index
    });
    
    // 高亮提示的格子
    this.updateHighlights(index);
    
    // 3秒后自动隐藏提示
    setTimeout(() => {
      const cells = this.data.cells;
      if (cells[index]) {
        cells[index].showHint = false;
        this.setData({
          cells: cells
        });
      }
    }, 3000);
    
    wx.showToast({
      title: '💡 查看提示',
      icon: 'none',
      duration: 1500
    });
  },
  
  // 暂停/继续功能
  onPause() {
    const isPaused = this.data.isPaused;
    
    if (isPaused) {
      // 当前是暂停状态，点击后继续游戏
      console.log('▶️ 继续游戏');
      
      this.setData({
        isPaused: false
      });
      
      // 恢复计时器
      this.startTimer();
      
      wx.showToast({
        title: '继续游戏',
        icon: 'none',
        duration: 1000
      });
    } else {
      // 当前是游戏状态，点击后暂停
      console.log('⏸ 暂停游戏');
      
      this.setData({
        isPaused: true
      });
      
      // 停止计时器
      this.stopTimer();
      
      wx.showToast({
        title: '游戏已暂停',
        icon: 'none',
        duration: 1000
      });
    }
  },
  
  // ==================== 阶段6: 新增功能 ====================
  
  // 难度切换（内部方法）
  changeDifficulty(index) {
    const difficulty = this.data.difficulties[index];
    
    console.log('切换难度:', difficulty.label);
    
    this.setData({
      difficultyIndex: index,
      currentDifficulty: difficulty.value
    });
    
    // 加载该难度的最佳时间
    this.loadBestTime();
  },
  
  // 计时器管理
  startTimer() {
    // 清除旧的计时器
    this.stopTimer();
    
    // 设置开始时间
    this.data.startTime = Date.now() - (this.data.elapsedTime || 0);
    
    // 启动计时器（每秒更新）
    const timer = setInterval(() => {
      const elapsed = Date.now() - this.data.startTime;
      this.setData({
        currentTime: this.formatTime(elapsed),
        elapsedTime: elapsed
      });
    }, 1000);
    
    this.data.timerInterval = timer;
    
    console.log('⏱️ 计时器已启动');
  },
  
  stopTimer() {
    if (this.data.timerInterval) {
      clearInterval(this.data.timerInterval);
      this.data.timerInterval = null;
      console.log('⏹️ 计时器已停止');
    }
  },
  
  formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  },
  
  padZero(num) {
    return num < 10 ? '0' + num : num.toString();
  },
  
  // 加载最佳时间
  loadBestTime() {
    const difficulty = this.data.currentDifficulty;
    const key = `bestTime_${difficulty}`;
    const bestTime = wx.getStorageSync(key);
    
    if (bestTime) {
      this.setData({
        bestTime: this.formatTime(bestTime)
      });
      console.log(`🏆 ${difficulty} 最佳时间:`, this.formatTime(bestTime));
    } else {
      this.setData({
        bestTime: ''
      });
    }
  },
  
  // 保存最佳时间
  saveBestTime() {
    const difficulty = this.data.currentDifficulty;
    const key = `bestTime_${difficulty}`;
    const currentTime = this.data.elapsedTime;
    const bestTime = wx.getStorageSync(key);
    
    // 如果没有最佳时间，或者当前时间更短
    if (!bestTime || currentTime < bestTime) {
      wx.setStorageSync(key, currentTime);
      this.setData({
        bestTime: this.formatTime(currentTime)
      });
      console.log('🎉 新纪录！', this.formatTime(currentTime));
      return true;
    }
    return false;
  },
  
  // 检查胜利条件
  checkWinCondition() {
    // 检查是否所有格子都填满
    const allFilled = this.data.cells.every(cell => cell.value !== '');
    if (!allFilled) return false;
    
    // 检查是否有错误
    const hasError = this.data.cells.some(cell => cell.hasError);
    if (hasError) return false;
    
    // 验证数独是否正确
    for (let i = 0; i < 81; i++) {
      const cell = this.data.cells[i];
      const row = cell.row;
      const col = cell.col;
      const num = parseInt(cell.value);
      
      // 临时清空当前格子
      this.shudu.board[row][col] = 0;
      
      // 检查是否有冲突
      if (this.shudu.hasConflict(row, col, num)) {
        this.shudu.board[row][col] = num;
        return false;
      }
      
      // 恢复格子
      this.shudu.board[row][col] = num;
    }
    
    return true;
  },
  
  // 显示胜利提示
  showWinMessage() {
    this.stopTimer();
    
    const isNewRecord = this.saveBestTime();
    const message = isNewRecord 
      ? `🎉 恭喜完成！\n⏱️ 用时: ${this.data.currentTime}\n🏆 新纪录！`
      : `✅ 恭喜完成！\n⏱️ 用时: ${this.data.currentTime}`;
    
    wx.showModal({
      title: '游戏完成',
      content: message,
      confirmText: '再来一局',
      cancelText: '休息一下',
      success: (res) => {
        if (res.confirm) {
          this.startNewGame();
        }
      }
    });
  },
  
  // 新游戏 - 先选择难度
  onNewGame() {
    console.log('🔄 点击新游戏');
    
    // 弹出难度选择
    const difficultyLabels = this.data.difficulties.map(d => d.label);
    
    wx.showActionSheet({
      itemList: difficultyLabels,
      success: (res) => {
        const selectedIndex = res.tapIndex;
        console.log('选择难度:', difficultyLabels[selectedIndex]);
        
        // 切换难度
        this.changeDifficulty(selectedIndex);
        
        // 开始新游戏
        this.startNewGame();
      },
      fail: (res) => {
        console.log('取消选择难度');
      }
    });
  },
  
  onReady() {
    console.log('\n✅ 可玩Demo加载完成！');
    console.log('💡 点击空格填入数字');
    console.log('========================================\n');
  }
});
