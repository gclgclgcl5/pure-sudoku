// 游戏页面：薄层，逻辑在 modules/gameController.js（方案 B）
const createGameController = require('./modules/gameController.js');

Page({
  data: {
    stage: '阶段6：顶部信息栏',
    cells: [],
    selectedIndex: -1,
    showNumberPad: false,

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

    timerInterval: null,
    startTime: 0,
    elapsedTime: 0,

    isNoteMode: false,
    canUndo: false,
    history: [],

    isPaused: false,

    statistics: {
      totalGames: 0,
      completedGames: 0,
      totalErrors: 0,
      totalTime: 0,
      lastPlayDate: ''
    },

    numberCounts: [9, 9, 9, 9, 9, 9, 9, 9, 9],
    numberPadLayout: 'single',
    numberPadRows: [[1, 2, 3, 4, 5, 6, 7, 8, 9]],

    theme: null,

    showGamePet: false,
    activePetIds: [],
    gamePetImageSrc: '',
    gamePetImageFailed: false,
    petDual0Image: '',
    petDual1Image: '',
    petDual0Failed: false,
    petDual1Failed: false,
    petDual0Shake: false,
    petDual1Shake: false,
    petBubbleText: '',
    petBubbleFadeIn: false,
    petBubble1Text: '',
    petBubble1FadeIn: false,
    petGameShake: false,
    petDockLayout: 'center',

    showWinPetOverlay: false,
    winPetImageSrc: '',
    winPetImageSrc1: '',
    winPetImageFailed: false,
    winPetImageFailed1: false,
    winPetTitle: '',
    winPetBody: '',
    winPetPetName: '',

    debugInstantWin: false
  },

  onLoad(options) {
    this._game = createGameController(this);
    this._game.onLoad(options);
  },

  onUnload() {
    if (this._game) this._game.onUnload();
  },

  onHide() {
    if (this._game) this._game.onHide();
  },

  onShow() {
    if (this._game) this._game.onShow();
  },

  /** 供设置页等栈内页面调用 */
  applyTheme() {
    if (this._game) this._game.applyTheme();
  },

  /** 供设置页切换数字键盘布局时调用 */
  applyNumberPadLayout(layout) {
    if (this._game) this._game.applyNumberPadLayout(layout);
  },

  onCellTap(e) {
    this._game.onCellTap(e);
  },

  onNumberTap(e) {
    this._game.onNumberTap(e);
  },

  onClearTap() {
    this._game.onClearTap();
  },

  onUndo() {
    this._game.onUndo();
  },

  onToggleNoteMode() {
    this._game.onToggleNoteMode();
  },

  onHint() {
    this._game.onHint();
  },

  onDebugInstantWin() {
    if (this._game) this._game.onDebugInstantWin();
  },

  onPause() {
    this._game.onPause();
  },

  onNewGame() {
    this._game.onNewGame();
  },

  onPetGameTap() {
    if (this._game) this._game.onPetGameTap();
  },

  onPetDualTap(e) {
    if (this._game) this._game.onPetDualTap(e);
  },

  onPetGameImageError() {
    this.setData({ gamePetImageFailed: true });
  },

  onPetDual0ImageError() {
    this.setData({ petDual0Failed: true });
  },

  onPetDual1ImageError() {
    this.setData({ petDual1Failed: true });
  },

  onWinPetImageError() {
    this.setData({ winPetImageFailed: true });
  },

  onWinPetImage1Error() {
    this.setData({ winPetImageFailed1: true });
  },

  onWinPetOverlayConfirm() {
    if (this._game) this._game.onWinPetOverlayConfirm();
  },

  onWinPetOverlayCancel() {
    if (this._game) this._game.onWinPetOverlayCancel();
  },

  onWinPetMaskMove() {
    return false;
  },

  onReady() {
    this._game.onReady();
  }
});
