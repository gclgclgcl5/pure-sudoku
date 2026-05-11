// 游戏页控制器（方案 B：createGameController(page)）
const Shudu = require('../../../utils/shudu.js');
const themeModule = require('../../../utils/theme.js');
const collectionUnlock = require('../../../utils/collectionUnlock.js');
const petStorage = require('../../../utils/petStorage.js');
const petConfig = require('../../../utils/petConfig.js');
const petDockLayout = require('../../../utils/petDockLayout.js');
const GAME_PROGRESS_KEY = 'gameProgress';
const NUMBER_PAD_LAYOUT_KEY = 'numberPadLayout';

function createGameController(page) {
  const petBubbleTimers = [null, null];
  const petBubbleHideTimers = [null, null];
  const petBubbleFadeInTimers = [null, null];
  const petStaggerTimeouts = [];
  const BUBBLE_FADE_IN_MS = 40;
  const BUBBLE_DISPLAY_MS = 2500;
  const BUBBLE_FADE_OUT_MS = 300;
  const DUAL_STAGGER_MS = 500;

  /** 出战列表变化时重置单宠站位 */
  let lastSyncedSquadKey = null;

  function clearPetStaggerTimeouts() {
    while (petStaggerTimeouts.length) {
      const id = petStaggerTimeouts.pop();
      if (id) clearTimeout(id);
    }
  }

  function cancelPetBubbleTimersOnly() {
    clearPetStaggerTimeouts();
    for (let s = 0; s < 2; s++) {
      if (petBubbleFadeInTimers[s]) {
        clearTimeout(petBubbleFadeInTimers[s]);
        petBubbleFadeInTimers[s] = null;
      }
      if (petBubbleTimers[s]) {
        clearTimeout(petBubbleTimers[s]);
        petBubbleTimers[s] = null;
      }
      if (petBubbleHideTimers[s]) {
        clearTimeout(petBubbleHideTimers[s]);
        petBubbleHideTimers[s] = null;
      }
    }
  }

  function petClearBubbleSlot(slot) {
    if (petBubbleFadeInTimers[slot]) {
      clearTimeout(petBubbleFadeInTimers[slot]);
      petBubbleFadeInTimers[slot] = null;
    }
    if (petBubbleTimers[slot]) {
      clearTimeout(petBubbleTimers[slot]);
      petBubbleTimers[slot] = null;
    }
    if (petBubbleHideTimers[slot]) {
      clearTimeout(petBubbleHideTimers[slot]);
      petBubbleHideTimers[slot] = null;
    }
    if (slot === 0) {
      page.setData({ petBubbleText: '', petBubbleFadeIn: false });
    } else {
      page.setData({ petBubble1Text: '', petBubble1FadeIn: false });
    }
  }

  function petClearBubble() {
    clearPetStaggerTimeouts();
    petClearBubbleSlot(0);
    petClearBubbleSlot(1);
  }

  function petSpeakAtSlot(slot, petId, lineKey) {
    const text = petConfig.getLine(petId, lineKey);
    if (!text) return;
    petClearBubbleSlot(slot);

    const startFadeOut = () => {
      if (slot === 0) {
        page.setData({ petBubbleFadeIn: false });
      } else {
        page.setData({ petBubble1FadeIn: false });
      }
      petBubbleHideTimers[slot] = setTimeout(() => {
        petBubbleHideTimers[slot] = null;
        if (slot === 0) {
          page.setData({ petBubbleText: '' });
        } else {
          page.setData({ petBubble1Text: '' });
        }
      }, BUBBLE_FADE_OUT_MS);
    };

    if (slot === 0) {
      page.setData({ petBubbleText: text, petBubbleFadeIn: false });
    } else {
      page.setData({ petBubble1Text: text, petBubble1FadeIn: false });
    }

    petBubbleFadeInTimers[slot] = setTimeout(() => {
      petBubbleFadeInTimers[slot] = null;
      if (slot === 0) {
        page.setData({ petBubbleFadeIn: true });
      } else {
        page.setData({ petBubble1FadeIn: true });
      }
    }, BUBBLE_FADE_IN_MS);

    petBubbleTimers[slot] = setTimeout(() => {
      petBubbleTimers[slot] = null;
      startFadeOut();
    }, BUBBLE_FADE_IN_MS + BUBBLE_DISPLAY_MS);
  }

  /** 双宠自动台词：另一只延迟 DUAL_STAGGER_MS 再播（与 petSpeak 随机 stagger 共用清理） */
  function schedulePetSpeakSlot(slot, petId, lineKey, delayMs) {
    if (delayMs <= 0) {
      petSpeakAtSlot(slot, petId, lineKey);
      return;
    }
    const id = setTimeout(() => {
      const i = petStaggerTimeouts.indexOf(id);
      if (i >= 0) petStaggerTimeouts.splice(i, 1);
      petSpeakAtSlot(slot, petId, lineKey);
    }, delayMs);
    petStaggerTimeouts.push(id);
  }

  /**
   * 自动事件（填对/填错/撤销/提示等）：单宠只左槽。
   * 双宠：1/3 同时说；1/3 左先右 0.5s；1/3 右先左 0.5s（各自一条随机台词）。
   */
  function petSpeak(lineKey) {
    clearPetStaggerTimeouts();
    const ids = petStorage.getActivePetIds();
    if (!ids.length) return;
    if (ids.length === 1) {
      petClearBubbleSlot(1);
      petSpeakAtSlot(0, ids[0], lineKey);
      return;
    }
    const mode = Math.floor(Math.random() * 3);
    if (mode === 0) {
      petSpeakAtSlot(0, ids[0], lineKey);
      petSpeakAtSlot(1, ids[1], lineKey);
    } else if (mode === 1) {
      petSpeakAtSlot(0, ids[0], lineKey);
      schedulePetSpeakSlot(1, ids[1], lineKey, DUAL_STAGGER_MS);
    } else {
      petSpeakAtSlot(1, ids[1], lineKey);
      schedulePetSpeakSlot(0, ids[0], lineKey, DUAL_STAGGER_MS);
    }
  }

  function syncPetDockUI() {
    cancelPetBubbleTimersOnly();
    const ids = petStorage.getActivePetIds();
    const show = ids.length > 0;
    const key = JSON.stringify(ids);
    const patch = {
      showGamePet: show,
      activePetIds: ids,
      gamePetImageSrc: '',
      gamePetImageFailed: false,
      petDual0Image: '',
      petDual1Image: '',
      petDual0Failed: false,
      petDual1Failed: false,
      petDual0Shake: false,
      petDual1Shake: false,
      petBubbleText: '',
      petBubble1Text: '',
      petBubbleFadeIn: false,
      petBubble1FadeIn: false
    };
    if (!show) {
      lastSyncedSquadKey = null;
      petClearBubble();
      page.setData(patch);
      return;
    }
    if (ids.length === 1) {
      const pet = petConfig.getPetById(ids[0]);
      patch.gamePetImageSrc = pet && pet.image ? pet.image : '';
    } else {
      const p0 = petConfig.getPetById(ids[0]);
      const p1 = petConfig.getPetById(ids[1]);
      patch.petDual0Image = p0 && p0.image ? p0.image : '';
      patch.petDual1Image = p1 && p1.image ? p1.image : '';
    }
    if (lastSyncedSquadKey !== key) {
      lastSyncedSquadKey = key;
      petDockLayout.setPetDockLayout('center');
    }
    patch.petDockLayout = petDockLayout.getPetDockLayout();
    page.setData(patch);
  }

  const api = {
    onLoad(options) {
      console.log('\n========================================');
      console.log('🎮 数独小程序 - 阶段10：数据统计和存档');
      console.log('========================================\n');
      
      // 创建数独实例
      page.shudu = new Shudu();
      
      // 加载主题
      api.applyTheme();
      
      // 加载统计数据
      api.loadStatistics();
      
      // 加载最佳时间
      api.loadBestTime();
      
      // 加载数字菜单布局
      api.loadNumberPadLayout();
      
      // 优先尝试恢复存档
      api.tryRestoreGame();

      syncPetDockUI();
    },

    // 应用主题
    applyTheme() {
      const theme = themeModule.getCurrentTheme();
      page.setData({
        theme: theme
      });
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
      
      console.log('🎨 已应用主题:', theme.name);
    },
    
    onUnload() {
      petClearBubble();
      // 页面卸载前自动保存进度
      api.saveGameProgress();
      api.stopTimer();
    },
    
    onHide() {
      petClearBubble();
      // 页面隐藏时自动保存进度
      api.saveGameProgress();
      api.stopTimer();
    },
    
    onShow() {
      // 页面显示时重新应用主题，并在可恢复场景继续计时
      api.applyTheme();
      api.loadNumberPadLayout();
      syncPetDockUI();
      if (!page.data.isPaused && page.data.cells.length > 0 && !api.checkWinCondition()) {
        api.startTimer();
      }
    },
    
    // 开始新游戏
    startNewGame() {
      console.log('🔄 开始新游戏');

      page.setData({
        showWinPetOverlay: false,
        winPetImageSrc: '',
        winPetImageSrc1: '',
        winPetImageFailed: false,
        winPetImageFailed1: false,
        winPetPetName: '',
        winPetBody: ''
      });

      // 停止当前计时器
      api.stopTimer();

      // 新开一局时清理旧存档
      api.clearGameProgress();
      
      const difficulty = page.data.currentDifficulty;
      
      // 更新游戏开始统计
      api.updateGameStart();
      
      // 生成数独
      const startTime = Date.now();
      page.shudu.generate(difficulty);
      const endTime = Date.now();
      
      console.log('✅ 数独生成完成，耗时:', endTime - startTime, 'ms');
      console.log('题目难度:', difficulty);
      
      // 转换为显示数据
      const cells = [];
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          const value = page.shudu.board[i][j];
          const isFixed = page.shudu.initialBoard[i][j] !== 0;
          
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
            notes: [],  // 初始化笔记数组为空
            isRightBorder: j === 2 || j === 5,
            isBottomBorder: i === 2 || i === 5
          });
        }
      }
      
      // 重置游戏状态
      page.setData({
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
      
      // 计算数字剩余数量
      api.updateNumberCounts();
      
      // 启动计时器
      api.startTimer();
      
      console.log('✅ 阶段6+ 视觉优化完成！');
      console.log('💡 新增功能: 区域高亮、相同数字高亮');
      console.log('========================================');
    },

    // 尝试恢复存档
    tryRestoreGame() {
      const progress = wx.getStorageSync(GAME_PROGRESS_KEY);
      if (!progress || !progress.cells || progress.cells.length !== 81) {
        api.startNewGame();
        return;
      }
      // 检测到未完成对局时，直接恢复（不再弹窗询问）
      const restored = api.restoreGameProgress(progress);
      if (!restored) {
        api.clearGameProgress();
        api.startNewGame();
      }
    },

    // 恢复存档
    restoreGameProgress(progress) {
      try {
        page.shudu.board = progress.shuduBoard.map(row => row.map(v => Number(v)));
        page.shudu.solution = progress.shuduSolution.map(row => row.map(v => Number(v)));
        page.shudu.initialBoard = progress.shuduInitialBoard.map(row => row.map(v => Number(v)));

        const elapsedTime = progress.elapsedTime || 0;
        const currentDifficulty = progress.currentDifficulty || 'easy';
        const difficultyIndex = page.data.difficulties.findIndex(d => d.value === currentDifficulty);

        page.setData({
          cells: progress.cells || [],
          selectedIndex: typeof progress.selectedIndex === 'number' ? progress.selectedIndex : -1,
          difficultyIndex: difficultyIndex >= 0 ? difficultyIndex : 0,
          currentDifficulty: currentDifficulty,
          errorCount: progress.errorCount || 0,
          currentTime: api.formatTime(elapsedTime),
          elapsedTime: elapsedTime,
          isNoteMode: !!progress.isNoteMode,
          canUndo: !!progress.canUndo,
          history: progress.history || [],
          // 恢复后统一进入暂停态：由暂停面板提供“继续/新游戏”决策
          isPaused: true,
          numberCounts: progress.numberCounts || [9, 9, 9, 9, 9, 9, 9, 9, 9]
        });

        // 恢复成功后按状态恢复计时器（未暂停且未完成时继续计时）
        if (!page.data.isPaused && page.data.cells.length > 0 && !api.checkWinCondition()) {
          api.startTimer();
        } else {
          api.stopTimer();
        }

        api.loadBestTime();
        api.updateNumberCounts();
        console.log('💾 已恢复上次游戏进度');
        return true;
      } catch (error) {
        console.error('恢复进度失败:', error);
        return false;
      }
    },

    // 获取当前已用时间
    getCurrentElapsedTime() {
      if (page.data.timerInterval && page.data.startTime) {
        return Date.now() - page.data.startTime;
      }
      return page.data.elapsedTime || 0;
    },

    // 自动保存进度
    saveGameProgress() {
      try {
        if (!page.data.cells || page.data.cells.length !== 81) return;
        if (api.checkWinCondition()) return;

        const elapsedTime = api.getCurrentElapsedTime();
        const progress = {
          version: 1,
          savedAt: Date.now(),
          currentDifficulty: page.data.currentDifficulty,
          difficultyIndex: page.data.difficultyIndex,
          errorCount: page.data.errorCount,
          currentTime: api.formatTime(elapsedTime),
          elapsedTime: elapsedTime,
          isNoteMode: page.data.isNoteMode,
          canUndo: page.data.canUndo,
          history: JSON.parse(JSON.stringify(page.data.history || [])),
          isPaused: page.data.isPaused,
          selectedIndex: page.data.selectedIndex,
          numberCounts: [...(page.data.numberCounts || [])],
          cells: JSON.parse(JSON.stringify(page.data.cells)),
          shuduBoard: page.shudu.board.map(row => [...row]),
          shuduSolution: page.shudu.solution.map(row => [...row]),
          shuduInitialBoard: page.shudu.initialBoard.map(row => [...row])
        };

        wx.setStorageSync(GAME_PROGRESS_KEY, progress);
        console.log('💾 游戏进度已自动保存');
      } catch (error) {
        console.error('保存进度失败:', error);
      }
    },

    // 清除存档
    clearGameProgress() {
      wx.removeStorageSync(GAME_PROGRESS_KEY);
    },

    // 读取数字菜单排列设置
    loadNumberPadLayout() {
      const layout = wx.getStorageSync(NUMBER_PAD_LAYOUT_KEY) || 'single';
      api.applyNumberPadLayout(layout);
    },

    // 应用数字菜单排列
    applyNumberPadLayout(layout) {
      const normalizedLayout = layout === 'double' ? 'double' : 'single';
      const rows = normalizedLayout === 'double'
        ? [[1, 2, 3, 4, 5], [6, 7, 8, 9]]
        : [[1, 2, 3, 4, 5, 6, 7, 8, 9]];

      page.setData({
        numberPadLayout: normalizedLayout,
        numberPadRows: rows
      });
    },
    
    // 点击格子
    onCellTap(e) {
      const index = e.currentTarget.dataset.index;
      const cell = page.data.cells[index];
      
      // 如果是固定数字，也可以选中（用于查看相关区域和相同数字）
      console.log('📍 选中格子:', cell.row, cell.col, '值:', cell.value);
      
      // 更新选中状态并高亮相关格子
      api.updateHighlights(index);
    },
    
    // 更新高亮显示
    updateHighlights(selectedIndex) {
      const cells = page.data.cells;
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
      
      page.setData({
        cells: cells,
        selectedIndex: selectedIndex
      });
      
      console.log('✨ 高亮显示: 相关区域 + 相同数字');
    },
    
    // 点击数字按钮
    onNumberTap(e) {
      const num = Number(e.currentTarget.dataset.num);
      const selectedIndex = page.data.selectedIndex;
      
      if (selectedIndex === -1) {
        console.log('⚠️ 请先选择一个格子');
        wx.showToast({
          title: '请先选择格子',
          icon: 'none'
        });
        return;
      }
      
      const cell = page.data.cells[selectedIndex];
      
      // 如果是固定数字，不能修改
      if (cell.isFixed) {
        wx.showToast({
          title: '初始数字不能修改',
          icon: 'none'
        });
        return;
      }
      
      // 保存历史记录（用于撤销）
      api.saveHistory(selectedIndex, cell.value, cell.notes || []);
      
      if (page.data.isNoteMode) {
        // 笔记模式：添加/删除候选数字
        api.toggleNote(selectedIndex, num);
      } else {
        // 填数模式：填入数字
        api.fillNumber(selectedIndex, num);
      }
    },
    
    // 填入数字
    fillNumber(selectedIndex, num) {
      const inputNum = Number(num);
      const cell = page.data.cells[selectedIndex];
      console.log('🔢 填入数字:', inputNum, '到格子', cell.row, cell.col);
      
      // 更新数独数据
      page.shudu.board[cell.row][cell.col] = inputNum;
      
      // 检查是否有冲突
      const hasConflict = page.shudu.hasConflict(cell.row, cell.col, inputNum);
      
      // 更新显示
      const cells = page.data.cells;
      cells[selectedIndex].value = inputNum;
      cells[selectedIndex].hasError = hasConflict;
      cells[selectedIndex].notes = [];  // 清除当前格子的笔记
      cells[selectedIndex].noteFlags = null;  // 清除笔记标志
      
      // 🆕 自动清除相关格子的候选数字
      api.clearRelatedNotes(cell.row, cell.col, inputNum, cells);
      
      // 如果有冲突，错误计数+1
      if (hasConflict) {
        const newErrorCount = page.data.errorCount + 1;
        page.setData({
          cells: cells,
          errorCount: newErrorCount
        });
        
        console.log('❌ 数字冲突，错误次数:', newErrorCount);
        
        if (newErrorCount >= 3) {
          petSpeak('errorFinal');
          wx.showToast({
            title: '错误较多，加油！',
            icon: 'none'
          });
        } else {
          petSpeak('errorNormal');
        }
      } else {
        console.log('✅ 数字正确');
        
        page.setData({
          cells: cells
        });
        petSpeak('fillCorrect');
      }
      
      // 更新高亮显示（因为数字变了）
      api.updateHighlights(selectedIndex);
      
      // 更新数字剩余数量
      api.updateNumberCounts();
      
      // 检查是否完成
      if (api.checkWinCondition()) {
        console.log('🎉 牛逼，你成功了！');
        api.showWinMessage();
      }
    },
    
    // 清除相关格子的候选数字
    clearRelatedNotes(row, col, num, cells) {
      console.log('🧹 清除相关格子的候选数字:', num);
      
      const boxStartRow = Math.floor(row / 3) * 3;
      const boxStartCol = Math.floor(col / 3) * 3;
      
      for (let i = 0; i < 81; i++) {
        const cell = cells[i];
        
        // 跳过已填入数字的格子
        if (cell.value) continue;
        
        // 检查是否在同一行、列或宫
        const inSameRow = cell.row === row;
        const inSameCol = cell.col === col;
        const inSameBox = cell.row >= boxStartRow && cell.row < boxStartRow + 3 &&
                          cell.col >= boxStartCol && cell.col < boxStartCol + 3;
        
        // 如果在相关区域，从候选数字中移除
        if (inSameRow || inSameCol || inSameBox) {
          if (cell.notes && cell.notes.length > 0) {
            const index = cell.notes.indexOf(num);
            if (index !== -1) {
              cell.notes.splice(index, 1);
              console.log('  ↳ 清除格子', cell.row, cell.col, '的候选数字', num);
              
              // 更新笔记标志
              if (cell.notes.length > 0) {
                cell.noteFlags = {
                  n1: cell.notes.includes(1),
                  n2: cell.notes.includes(2),
                  n3: cell.notes.includes(3),
                  n4: cell.notes.includes(4),
                  n5: cell.notes.includes(5),
                  n6: cell.notes.includes(6),
                  n7: cell.notes.includes(7),
                  n8: cell.notes.includes(8),
                  n9: cell.notes.includes(9)
                };
              } else {
                cell.noteFlags = null;  // 没有候选数字时清除标志
              }
            }
          }
        }
      }
    },
    
    // 切换笔记（添加/删除候选数字）
    toggleNote(selectedIndex, num) {
      const cells = page.data.cells;
      const cell = cells[selectedIndex];
      
      // 初始化笔记数组
      if (!cell.notes) {
        cell.notes = [];
      }
      
      // 切换笔记
      const index = cell.notes.indexOf(num);
      if (index > -1) {
        cell.notes.splice(index, 1);  // 删除
        console.log('🗑️ 删除笔记:', num, '当前笔记:', JSON.stringify(cell.notes));
      } else {
        cell.notes.push(num);  // 添加
        cell.notes.sort((a, b) => a - b);  // 排序
        console.log('✎ 添加笔记:', num, '当前笔记:', JSON.stringify(cell.notes));
      }
      
      // 🆕 生成笔记显示标志（用于WXML条件渲染）
      cell.noteFlags = {
        n1: cell.notes.includes(1),
        n2: cell.notes.includes(2),
        n3: cell.notes.includes(3),
        n4: cell.notes.includes(4),
        n5: cell.notes.includes(5),
        n6: cell.notes.includes(6),
        n7: cell.notes.includes(7),
        n8: cell.notes.includes(8),
        n9: cell.notes.includes(9)
      };
      
      console.log('📝 格子', cell.row, cell.col, '的笔记标志:', JSON.stringify(cell.noteFlags));
      
      page.setData({
        cells: cells
      });
    },
    
    // 清除数字
    onClearTap() {
      const selectedIndex = page.data.selectedIndex;
      
      if (selectedIndex === -1) {
        wx.showToast({
          title: '请先选择格子',
          icon: 'none'
        });
        return;
      }
      
      const cell = page.data.cells[selectedIndex];
      
      // 如果是固定数字，不能清除
      if (cell.isFixed) {
        wx.showToast({
          title: '初始数字不能清除',
          icon: 'none'
        });
        return;
      }
      
      // 保存历史记录
      api.saveHistory(selectedIndex, cell.value, cell.notes || []);
      
      console.log('🗑️ 清除格子:', cell.row, cell.col);
      
      // 更新数独数据
      page.shudu.board[cell.row][cell.col] = 0;
      
      // 更新显示
      const cells = page.data.cells;
      cells[selectedIndex].value = '';
      cells[selectedIndex].hasError = false;
      cells[selectedIndex].notes = [];
      cells[selectedIndex].noteFlags = null;  // 清除笔记标志
      
      page.setData({
        cells: cells
      });
      petSpeak('clear');
      
      // 更新高亮
      api.updateHighlights(selectedIndex);
      
      // 更新数字剩余数量
      api.updateNumberCounts();
    },
    
    // 取消选中
    onCancelSelect() {
      page.setData({
        selectedIndex: -1
      });
    },
    
    // ==================== 阶段7: 工具按钮功能 ====================
    
    // 保存操作历史
    saveHistory(index, oldValue, oldNotes) {
      const history = page.data.history;
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
      
      page.setData({
        history: history,
        canUndo: true
      });
    },
    
    // 撤销操作
    onUndo() {
      const history = page.data.history;
      
      if (history.length === 0) {
        wx.showToast({
          title: '没有可撤销的操作',
          icon: 'none'
        });
        return;
      }
      
      // 取出最后一步操作
      const lastStep = history.pop();
      const cells = page.data.cells;
      const cell = cells[lastStep.index];
      
      // 恢复状态
      cell.value = lastStep.oldValue;
      cell.notes = lastStep.oldNotes;
      cell.hasError = false;
      
      // 重新生成笔记标志
      if (cell.notes && cell.notes.length > 0) {
        cell.noteFlags = {
          n1: cell.notes.includes(1),
          n2: cell.notes.includes(2),
          n3: cell.notes.includes(3),
          n4: cell.notes.includes(4),
          n5: cell.notes.includes(5),
          n6: cell.notes.includes(6),
          n7: cell.notes.includes(7),
          n8: cell.notes.includes(8),
          n9: cell.notes.includes(9)
        };
      } else {
        cell.noteFlags = null;
      }
      
      // 更新数独数据
      const row = cell.row;
      const col = cell.col;
      page.shudu.board[row][col] = lastStep.oldValue === '' ? 0 : parseInt(lastStep.oldValue);
      
      page.setData({
        cells: cells,
        history: history,
        canUndo: history.length > 0,
        selectedIndex: lastStep.index
      });
      
      // 更新高亮
      api.updateHighlights(lastStep.index);
      
      // 更新数字剩余数量
      api.updateNumberCounts();
      
      console.log('↶ 撤销操作');
      petSpeak('undo');
      
      wx.showToast({
        title: '已撤销',
        icon: 'success',
        duration: 1000
      });
    },
    
    // 切换笔记模式
    onToggleNoteMode() {
      const newMode = !page.data.isNoteMode;
      
      page.setData({
        isNoteMode: newMode
      });
      petSpeak('note');
      
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
      const hint = page.shudu.getSmartHint();
      
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
      const cells = page.data.cells;
      cells[index].hintValue = num;
      cells[index].showHint = true;
      
      page.setData({
        cells: cells,
        selectedIndex: index
      });
      petSpeak('hint');
      
      // 高亮提示的格子
      api.updateHighlights(index);
      
      // 3秒后自动隐藏提示
      setTimeout(() => {
        const cells = page.data.cells;
        if (cells[index]) {
          cells[index].showHint = false;
          page.setData({
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
      const isPaused = page.data.isPaused;
      
      if (isPaused) {
        // 当前是暂停状态，点击后继续游戏
        console.log('▶️ 继续游戏');
        
        page.setData({
          isPaused: false
        });
        
        // 恢复计时器
        api.startTimer();
        petSpeak('resume');
        
        wx.showToast({
          title: '继续游戏',
          icon: 'none',
          duration: 1000
        });
      } else {
        // 当前是游戏状态，点击后暂停
        console.log('⏸ 暂停游戏');
        
        page.setData({
          isPaused: true
        });
        
        // 停止计时器
        api.stopTimer();
        petSpeak('pause');
        
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
      const difficulty = page.data.difficulties[index];
      
      console.log('切换难度:', difficulty.label);
      
      page.setData({
        difficultyIndex: index,
        currentDifficulty: difficulty.value
      });
      
      // 加载该难度的最佳时间
      api.loadBestTime();
    },
    
    // 计时器管理
    startTimer() {
      // 清除旧的计时器
      api.stopTimer();
      
      // 设置开始时间
      page.data.startTime = Date.now() - (page.data.elapsedTime || 0);
      
      // 启动计时器（每秒更新）
      const timer = setInterval(() => {
        const elapsed = Date.now() - page.data.startTime;
        page.setData({
          currentTime: api.formatTime(elapsed),
          elapsedTime: elapsed
        });
      }, 1000);
      
      page.data.timerInterval = timer;
      
      console.log('⏱️ 计时器已启动');
    },
    
    stopTimer() {
      if (page.data.timerInterval) {
        clearInterval(page.data.timerInterval);
        page.data.timerInterval = null;
        console.log('⏹️ 计时器已停止');
      }
    },
    
    formatTime(milliseconds) {
      const totalSeconds = Math.floor(milliseconds / 1000);
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${api.padZero(minutes)}:${api.padZero(seconds)}`;
    },
    
    padZero(num) {
      return num < 10 ? '0' + num : num.toString();
    },
    
    // 加载最佳时间
    loadBestTime() {
      const difficulty = page.data.currentDifficulty;
      const key = `bestTime_${difficulty}`;
      const bestTime = wx.getStorageSync(key);
      
      if (bestTime) {
        page.setData({
          bestTime: api.formatTime(bestTime)
        });
        console.log(`🏆 ${difficulty} 最佳时间:`, api.formatTime(bestTime));
      } else {
        page.setData({
          bestTime: ''
        });
      }
    },
    
    // 保存最佳时间
    saveBestTime() {
      const difficulty = page.data.currentDifficulty;
      const key = `bestTime_${difficulty}`;
      const currentTime = page.data.elapsedTime;
      const bestTime = wx.getStorageSync(key);
      
      // 如果没有最佳时间，或者当前时间更短
      if (!bestTime || currentTime < bestTime) {
        wx.setStorageSync(key, currentTime);
        page.setData({
          bestTime: api.formatTime(currentTime)
        });
        console.log('🎉 新纪录！', api.formatTime(currentTime));
        return true;
      }
      return false;
    },
    
    // 阶段10: 数据统计功能
    loadStatistics() {
      const stats = wx.getStorageSync('gameStatistics');
      if (stats) {
        page.setData({
          statistics: stats
        });
        console.log('📊 加载统计数据:', stats);
      } else {
        console.log('📊 初始化统计数据');
      }
    },
    
    saveStatistics() {
      wx.setStorageSync('gameStatistics', page.data.statistics);
      console.log('💾 保存统计数据:', page.data.statistics);
    },
    
    // 更新游戏开始统计
    updateGameStart() {
      const stats = page.data.statistics;
      stats.totalGames += 1;
      stats.lastPlayDate = new Date().toLocaleDateString('zh-CN');
      
      page.setData({
        statistics: stats
      });
      
      api.saveStatistics();
      console.log('📈 游戏开始统计更新:', stats);
    },
    
    // 更新游戏完成统计
    updateGameComplete() {
      const stats = page.data.statistics;
      stats.completedGames += 1;
      stats.totalErrors += page.data.errorCount;
      stats.totalTime += page.data.elapsedTime;
      
      page.setData({
        statistics: stats
      });
      
      api.saveStatistics();
      console.log('📈 游戏完成统计更新:', stats);
    },
    
    
    
    // 检查胜利条件
    checkWinCondition() {
      // 检查是否所有格子都填满
      const allFilled = page.data.cells.every(cell => cell.value !== '');
      if (!allFilled) return false;
      
      // 检查是否有错误
      const hasError = page.data.cells.some(cell => cell.hasError);
      if (hasError) return false;
      
      // 验证数独是否正确
      for (let i = 0; i < 81; i++) {
        const cell = page.data.cells[i];
        const row = cell.row;
        const col = cell.col;
        const num = parseInt(cell.value);
        
        // 临时清空当前格子
        page.shudu.board[row][col] = 0;
        
        // 检查是否有冲突
        if (page.shudu.hasConflict(row, col, num)) {
          page.shudu.board[row][col] = num;
          return false;
        }
        
        // 恢复格子
        page.shudu.board[row][col] = num;
      }
      
      return true;
    },
    
    // 显示胜利提示
    showWinMessage() {
      api.stopTimer();
      api.clearGameProgress();
      
      // 更新游戏完成统计
      api.updateGameComplete();
      
      // 保存最佳时间
      const isNewRecord = api.saveBestTime();
      
      // 获取完成率
      const stats = page.data.statistics;
      const winRate = ((stats.completedGames / stats.totalGames) * 100).toFixed(1);
      
      const reward = collectionUnlock.applyClearReward(page.data.currentDifficulty);
      let unlockLine = '';
      if (reward.basicAdded.length || reward.advancedAdded.length) {
        unlockLine = `\n📚 图鉴：初级+${reward.basicAdded.length}，高级+${reward.advancedAdded.length}`;
      }

      const message = isNewRecord
        ? `🎉 恭喜完成！\n⏱️ 用时: ${page.data.currentTime}\n🏆 新纪录！\n📊 完成率: ${winRate}%${unlockLine}`
        : `✅ 恭喜完成！\n⏱️ 用时: ${page.data.currentTime}\n📊 完成率: ${winRate}%${unlockLine}`;

      const squad = petStorage.getActivePetIds();
      if (!squad.length) {
        wx.showModal({
          title: '游戏完成',
          content: message,
          confirmText: '再来一局',
          cancelText: '查看统计',
          success: (res) => {
            if (res.confirm) {
              api.startNewGame();
            } else if (res.cancel) {
              wx.navigateTo({
                url: '/pages/statistics/statistics'
              });
            }
          }
        });
        return;
      }

      const leftId = squad[0];
      const leftPet = petConfig.getPetById(leftId);
      const winExtra = petConfig.getWinLine(leftId);
      const winBlock = winExtra ? `${message}\n\n${winExtra}` : message;
      const p1 = squad[1] ? petConfig.getPetById(squad[1]) : null;
      const nameLine =
        squad.length === 2 && p1
          ? `${leftPet.name} · ${p1.name}`
          : leftPet.name || '';
      page.setData({
        showWinPetOverlay: true,
        winPetImageSrc: leftPet.image || '',
        winPetImageSrc1: p1 && p1.image ? p1.image : '',
        winPetTitle: '游戏完成',
        winPetBody: winBlock,
        winPetPetName: nameLine,
        winPetImageFailed: false,
        winPetImageFailed1: false
      });
    },

    onWinPetOverlayConfirm() {
      page.setData({ showWinPetOverlay: false });
      api.startNewGame();
    },

    onWinPetOverlayCancel() {
      page.setData({ showWinPetOverlay: false });
      wx.navigateTo({
        url: '/pages/statistics/statistics'
      });
    },

    onPetGameTap() {
      const ids = petStorage.getActivePetIds();
      if (ids.length !== 1) return;
      const petId = ids[0];
      if (!petId) return;
      const next = petDockLayout.cyclePetDockLayout();
      page.setData({ petGameShake: true, petDockLayout: next });
      setTimeout(() => {
        page.setData({ petGameShake: false });
      }, 600);
      petSpeakAtSlot(0, petId, 'tapGame');
    },

    onPetDualTap(e) {
      const slot = parseInt(e.currentTarget.dataset.slot, 10);
      const ids = petStorage.getActivePetIds();
      if (ids.length !== 2 || (slot !== 0 && slot !== 1)) return;
      const tappedId = ids[slot];
      const otherId = ids[1 - slot];
      if (!tappedId || !otherId) return;
      const shakePatch =
        slot === 0
          ? { petDual0Shake: true, petDual1Shake: false }
          : { petDual1Shake: true, petDual0Shake: false };
      page.setData(shakePatch);
      setTimeout(() => {
        page.setData({ petDual0Shake: false, petDual1Shake: false });
      }, 600);
      clearPetStaggerTimeouts();
      petSpeakAtSlot(slot, tappedId, 'tapGame');
      const tid = setTimeout(() => {
        const i = petStaggerTimeouts.indexOf(tid);
        if (i >= 0) petStaggerTimeouts.splice(i, 1);
        petSpeakAtSlot(1 - slot, otherId, 'peerTap');
      }, DUAL_STAGGER_MS);
      petStaggerTimeouts.push(tid);
    },
    
    // 新游戏 - 先选择难度
    onNewGame() {
      console.log('🔄 点击新游戏');
      
      // 弹出难度选择
      const difficultyLabels = page.data.difficulties.map(d => d.label);
      
      wx.showActionSheet({
        itemList: difficultyLabels,
        success: (res) => {
          const selectedIndex = res.tapIndex;
          console.log('选择难度:', difficultyLabels[selectedIndex]);
          
          // 切换难度
          api.changeDifficulty(selectedIndex);
          
          // 开始新游戏
          api.startNewGame();
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
    },
    
    // 计算每个数字的剩余数量 (1-9)
    updateNumberCounts() {
      const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // 初始化计数器
      
      // 遍历棋盘，统计每个数字出现的次数
      page.data.cells.forEach(cell => {
        if (cell.value && cell.value >= 1 && cell.value <= 9) {
          counts[cell.value - 1]++;
        }
      });
      
      // 计算剩余数量 (每个数字应该出现9次)
      const numberCounts = counts.map(count => 9 - count);
      
      page.setData({
        numberCounts: numberCounts
      });
      
      console.log('📊 数字剩余数量:', numberCounts);
    }
  };
  return api;
}

module.exports = createGameController;
