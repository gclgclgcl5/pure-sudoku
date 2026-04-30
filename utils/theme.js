// 主题配置文件
const THEMES = {
  // 主题1：宁静青蓝（默认）
  calmTeal: {
    name: '宁静青蓝',
    id: 'calmTeal',
    icon: '🌊',
    description: '清新宁静，专注思考',
    colors: {
      // 主色调
      primary: '#5EAAA8',           // 青蓝
      primaryLight: '#94D1D1',      // 淡青蓝
      primaryDark: '#4A8886',       // 深青蓝
      
      // 背景色
      background: '#F8FAFB',        // 极淡蓝灰
      boardBg: '#FFFFFF',           // 棋盘背景
      cardBg: '#FFFFFF',            // 卡片背景
      
      // 文字颜色
      textDark: '#2C5F5D',          // 深青色文字
      textMedium: '#6B9A99',        // 中青色文字
      textLight: '#9BBCBB',         // 浅青色文字
      textWhite: '#FFFFFF',         // 白色文字
      
      // 功能色
      selected: '#7FCCC9',          // 选中高亮
      selectedText: '#FFFFFF',      // 选中文字
      related: '#C8E8E7',           // 相关格子
      sameNumber: '#D4EDEC',        // 相同数字
      fixed: '#F0F9F8',             // 固定数字背景
      error: '#E89BA3',             // 错误提示
      errorBg: '#FFF0F2',           // 错误背景
      success: '#95D5B2',           // 正确提示
      successBg: '#F0F9F4',         // 正确背景
      note: '#A8DADC',              // 笔记颜色
      hint: '#48bb78',              // 提示颜色
      
      // 边框颜色
      border: '#e2e8f0',            // 细边框
      borderStrong: '#1a202c',      // 粗边框（3x3宫格）
      
      // 阴影
      shadow: 'rgba(94, 170, 168, 0.15)',
      shadowStrong: 'rgba(94, 170, 168, 0.25)'
    }
  },

  // 主题2：温暖日落
  warmSunset: {
    name: '温暖日落',
    id: 'warmSunset',
    icon: '🌅',
    description: '温暖舒适，活力充沛',
    colors: {
      primary: '#FF8A65',
      primaryLight: '#FFAB91',
      primaryDark: '#FF7043',
      
      background: '#FFF8F5',
      boardBg: '#FFFFFF',
      cardBg: '#FFFFFF',
      
      textDark: '#5D3A2E',
      textMedium: '#A67C6D',
      textLight: '#C9A99B',
      textWhite: '#FFFFFF',
      
      selected: '#FFAB91',
      selectedText: '#FFFFFF',
      related: '#FFE0D1',
      sameNumber: '#FFCCBC',
      fixed: '#FFF5F0',
      error: '#EF5350',
      errorBg: '#FFEBEE',
      success: '#66BB6A',
      successBg: '#F1F8E9',
      note: '#FFCC80',
      hint: '#FFB74D',
      
      border: '#FFE0D1',
      borderStrong: '#3E2723',
      
      shadow: 'rgba(255, 138, 101, 0.15)',
      shadowStrong: 'rgba(255, 138, 101, 0.25)'
    }
  },

  // 主题3：清新森林
  freshForest: {
    name: '清新森林',
    id: 'freshForest',
    icon: '🌲',
    description: '自然清新，护眼舒适',
    colors: {
      primary: '#66BB6A',
      primaryLight: '#81C784',
      primaryDark: '#4CAF50',
      
      background: '#F6FBF6',
      boardBg: '#FFFFFF',
      cardBg: '#FFFFFF',
      
      textDark: '#2E5D3A',
      textMedium: '#6D9A7C',
      textLight: '#9BBCA8',
      textWhite: '#FFFFFF',
      
      selected: '#81C784',
      selectedText: '#FFFFFF',
      related: '#C8E6C9',
      sameNumber: '#E0F2E0',
      fixed: '#F1F8F1',
      error: '#EF5350',
      errorBg: '#FFEBEE',
      success: '#66BB6A',
      successBg: '#E8F5E9',
      note: '#A5D6A7',
      hint: '#66BB6A',
      
      border: '#E0F2E0',
      borderStrong: '#1B5E20',
      
      shadow: 'rgba(102, 187, 106, 0.15)',
      shadowStrong: 'rgba(102, 187, 106, 0.25)'
    }
  },

  // 主题4：优雅紫罗兰
  elegantViolet: {
    name: '优雅紫罗兰',
    id: 'elegantViolet',
    icon: '💜',
    description: '优雅浪漫，独特风格',
    colors: {
      primary: '#AB47BC',
      primaryLight: '#BA68C8',
      primaryDark: '#9C27B0',
      
      background: '#FAF8FB',
      boardBg: '#FFFFFF',
      cardBg: '#FFFFFF',
      
      textDark: '#4A2E5D',
      textMedium: '#8B6D9A',
      textLight: '#B399BC',
      textWhite: '#FFFFFF',
      
      selected: '#BA68C8',
      selectedText: '#FFFFFF',
      related: '#E1BEE7',
      sameNumber: '#F3E5F5',
      fixed: '#F9F5FA',
      error: '#EF5350',
      errorBg: '#FFEBEE',
      success: '#66BB6A',
      successBg: '#F1F8E9',
      note: '#CE93D8',
      hint: '#AB47BC',
      
      border: '#E1BEE7',
      borderStrong: '#4A148C',
      
      shadow: 'rgba(171, 71, 188, 0.15)',
      shadowStrong: 'rgba(171, 71, 188, 0.25)'
    }
  },

  // 主题5：经典海洋
  oceanBlue: {
    name: '经典海洋',
    id: 'oceanBlue',
    icon: '🌊',
    description: '深邃稳重，经典百搭',
    colors: {
      primary: '#42A5F5',
      primaryLight: '#64B5F6',
      primaryDark: '#2196F3',
      
      background: '#F5F9FC',
      boardBg: '#FFFFFF',
      cardBg: '#FFFFFF',
      
      textDark: '#1E3A5F',
      textMedium: '#5B7C9A',
      textLight: '#8FA9BC',
      textWhite: '#FFFFFF',
      
      selected: '#64B5F6',
      selectedText: '#FFFFFF',
      related: '#BBDEFB',
      sameNumber: '#E3F2FD',
      fixed: '#F5F9FC',
      error: '#EF5350',
      errorBg: '#FFEBEE',
      success: '#66BB6A',
      successBg: '#F1F8E9',
      note: '#90CAF9',
      hint: '#42A5F5',
      
      border: '#E3F2FD',
      borderStrong: '#0D47A1',
      
      shadow: 'rgba(66, 165, 245, 0.15)',
      shadowStrong: 'rgba(66, 165, 245, 0.25)'
    }
  },

  // 主题6：简约灰调
  minimalistGray: {
    name: '简约灰调',
    id: 'minimalistGray',
    icon: '⚫',
    description: '简洁专业，低调优雅',
    colors: {
      primary: '#78909C',
      primaryLight: '#90A4AE',
      primaryDark: '#607D8B',
      
      background: '#F8F9FA',
      boardBg: '#FFFFFF',
      cardBg: '#FFFFFF',
      
      textDark: '#37474F',
      textMedium: '#607D8B',
      textLight: '#90A4AE',
      textWhite: '#FFFFFF',
      
      selected: '#90A4AE',
      selectedText: '#FFFFFF',
      related: '#CFD8DC',
      sameNumber: '#ECEFF1',
      fixed: '#F8F9FA',
      error: '#EF5350',
      errorBg: '#FFEBEE',
      success: '#66BB6A',
      successBg: '#F1F8E9',
      note: '#B0BEC5',
      hint: '#78909C',
      
      border: '#ECEFF1',
      borderStrong: '#263238',
      
      shadow: 'rgba(120, 144, 156, 0.15)',
      shadowStrong: 'rgba(120, 144, 156, 0.25)'
    }
  },
  // 主题7：雨晴（鲜艳版）
rainShine: {
  name: '雨晴',
  id: 'rainShine',
  icon: '🌦️',
  description: '归去，也无风雨也无晴',
  colors: {
    // 主色调：洗过的明澈天空蓝，比“经典海洋”更亮、更透
    primary: '#00ACC1',           // 亮潮蓝
    primaryLight: '#4DD0E1',      // 晴空浅蓝
    primaryDark: '#00838F',       // 深潮绿（像湖水深处）

    // 背景：雨后空气的清爽感，不灰，带极淡蓝调
    background: '#F0FCFE',        // 水雾白（比纯白多一丝凉意）
    boardBg: '#FFFFFF',           // 棋盘纯白，保证亮度对比
    cardBg: '#FAFEFF',            // 极浅天光

    // 文字：湿润的深绿色，像挂满水珠的树叶
    textDark: '#0B3C41',          // 深潭墨绿
    textMedium: '#2E7D82',        // 中等翠绿
    textLight: '#5BA8AE',         // 浅湖蓝
    textWhite: '#FFFFFF',

    // 选中高亮：穿透云层的阳光，明黄但不刺眼
    selected: '#FFB300',          // 正午暖金
    selectedText: '#1E3B2F',      // 深苔藓绿，对比清晰
    related: '#B2EBF2',           // 轻快水蓝
    sameNumber: '#D4F1F4',        // 薄云白蓝
    fixed: '#F4FCFD',             // 固定格子的清透背景

    // 错误/成功：不加灰，保持鲜艳但色调偏暖/偏冷
    error: '#FF6B6B',             // 鲜活珊瑚红
    errorBg: '#FFF0F0',
    success: '#69D2A0',           // 雨后新叶翠绿
    successBg: '#F2FCF7',

    note: '#7DD3DE',              // 笔记浅潮蓝
    hint: '#FFA000',              // 琥珀色提示

    // 边框：像尚未干透的水渍，轻且透
    border: '#C4EDF2',
    borderStrong: '#0D5057',      // 深水色，分隔明确

    // 阴影：带透明蓝，像雨后地面上的水洼反光
    shadow: 'rgba(0, 172, 193, 0.25)',
    shadowStrong: 'rgba(0, 172, 193, 0.38)'
  }
}
};

// 默认主题
const DEFAULT_THEME = 'calmTeal';

// 获取当前主题
function getCurrentTheme() {
  try {
    const themeId = wx.getStorageSync('currentTheme') || DEFAULT_THEME;
    return THEMES[themeId] || THEMES[DEFAULT_THEME];
  } catch (e) {
    return THEMES[DEFAULT_THEME];
  }
}

// 设置主题
function setTheme(themeId) {
  try {
    wx.setStorageSync('currentTheme', themeId);
    return true;
  } catch (e) {
    console.error('设置主题失败:', e);
    return false;
  }
}

// 获取所有主题列表
function getAllThemes() {
  return Object.values(THEMES);
}

module.exports = {
  THEMES,
  DEFAULT_THEME,
  getCurrentTheme,
  setTheme,
  getAllThemes
};

