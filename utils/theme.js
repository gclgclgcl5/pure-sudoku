// 主题配置文件
// sameDigit*：棋盘同数字格；boardBg / boardFrame：格子底色与格缝；relatedText：关联格数字色；sameDigitRing：同数格内描边。
// sameNumber：统计/最佳时间等装饰底，与同数字格语义分离。
const THEMES = {
  mintBreeze: {
    name: '薄荷微风',
    id: 'mintBreeze',
    icon: '🍃',
    description: '清爽冰凉，醒目怡人',
    colors: {
      // ===== 主色（用于导航栏、主按钮、强调元素）=====
      // 主品牌色：导航栏、主要按钮、激活态强调
      primary: '#26A69A',
      // 主色浅阶：悬浮/选中弱态、次级强调背景
      primaryLight: '#4DB6AC',
      // 主色深阶：主色渐变终点、深色强调区
      primaryDark: '#00897B',
      
      // ===== 背景色（页面与容器底色）=====
      // 页面根背景色（空白区域、系统背景建议同步此值）
      background: '#F3FAF7',
      // 棋盘背景色（数独宫格区域底板）
      boardBg: '#FFFFFF',
      // 卡片背景色（列表卡片、面板容器）
      cardBg: '#FCFFFD',
      
      // ===== 文字色（不同层级文案）=====
      // 主文字色（标题、核心信息）
      textDark: '#1D4D44',
      // 次级文字色（说明文、辅助信息）
      textMedium: '#5C857A',
      // 弱提示文字色（占位、提示、注释）
      textLight: '#8FB3A8',
      // 白色文字（深色背景上的文字）
      textWhite: '#FFFFFF',
      
      // ===== 功能/状态色（游戏态、交互态）=====
      // 当前选中格背景色
      selected: '#4DB6AC',
      // 当前选中格内文字色
      selectedText: '#FFFFFF',
      // 同行/同列/同宫高亮背景色
      related: '#B9E4DE',
      // 相同数字高亮背景色（统计卡片、最佳时间条等装饰，非棋盘同数字格）
      sameNumber: '#D7F0EC',
      // 棋盘：与当前选中格「数字相同」的其它格背景 / 数字色（独立词条，勿用 sameNumber 替代）
      sameDigitHighlight: '#7FD1C0',
      sameDigitHighlightText: '#004D40',
      // 固定题目数字格背景色
      fixed: '#ECF7F4',
      // 错误状态主色（边框/图标/警示）
      error: '#EF5350',
      // 错误状态背景色
      errorBg: '#FFECEE',
      // 成功状态主色
      success: '#66BB6A',
      // 成功状态背景色
      successBg: '#EBF7EB',
      // 笔记数字颜色
      note: '#80CBC4',
      // 提示高亮颜色
      hint: '#26A69A',
      
      // ===== 边框色（线框与分隔）=====
      // 常规边框色（卡片、按钮、浅分隔）
      border: '#D7F0EC',
      // 强边框色（棋盘粗分隔、高对比边框）
      borderStrong: '#004D40',
      
      // ===== 阴影色（层次感）=====
      // 常规阴影（卡片浮层、轻阴影）
      shadow: 'rgba(38, 166, 154, 0.15)',
      // 强阴影（悬浮态、激活态）
      shadowStrong: 'rgba(38, 166, 154, 0.28)'
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
      sameDigitHighlight: '#FFB74D',
      sameDigitHighlightText: '#5D3A2E',
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
      sameDigitHighlight: '#AED581',
      sameDigitHighlightText: '#1B5E20',
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
      sameDigitHighlight: '#CE93D8',
      sameDigitHighlightText: '#4A148C',
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
      sameDigitHighlight: '#90CAF9',
      sameDigitHighlightText: '#0D47A1',
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
      sameDigitHighlight: '#B0BEC5',
      sameDigitHighlightText: '#263238',
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
    // 同数字：淡乌云灰（比上一版浅，仍偏冷灰云）
    sameDigitHighlight: '#B4C0CB',
    sameDigitHighlightText: '#2E4050',
    sameDigitRing: '#8A9BA8',
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
},


sakuraPink: {
  name: '樱花物语',
  id: 'sakuraPink',
  icon: '🌸',
  description: '温柔浪漫，甜美清新',
  colors: {
    primary: '#F48FB1',
    primaryLight: '#F8BBD0',
    primaryDark: '#EC407A',
    
    background: '#FFF5F7',
    boardBg: '#FFFFFF',
    cardBg: '#FFFBFC',
    
    textDark: '#5D2E42',
    textMedium: '#A26B7D',
    textLight: '#C99BA9',
    textWhite: '#FFFFFF',
    
    selected: '#F48FB1',
    selectedText: '#FFFFFF',
    related: '#FDE0E8',
    sameNumber: '#FDEAF2',
    sameDigitHighlight: '#F8BBD0',
    sameDigitHighlightText: '#880E4F',
    fixed: '#FFF0F4',
    error: '#EF5350',
    errorBg: '#FFEAED',
    success: '#81C784',
    successBg: '#F1F8E9',
    note: '#F8BBD0',
    hint: '#F06292',
    
    border: '#FDE0E8',
    borderStrong: '#880E4F',
    
    shadow: 'rgba(244, 143, 177, 0.2)',
    shadowStrong: 'rgba(244, 143, 177, 0.35)'
  }
},

autumnMaple: {
  name: '秋日私语',
  id: 'autumnMaple',
  icon: '🍂',
  description: '温暖浓郁，复古文艺',
  colors: {
    primary: '#D4825A',
    primaryLight: '#E3A680',
    primaryDark: '#B8623B',
    
    background: '#FDF6F0',
    boardBg: '#FFFFFF',
    cardBg: '#FFFBF8',
    
    textDark: '#4B2E1E',
    textMedium: '#8B6354',
    textLight: '#B8947E',
    textWhite: '#FFFFFF',
    
    selected: '#E3A680',
    selectedText: '#FFFFFF',
    related: '#F5E1D1',
    sameNumber: '#FAEDE3',
    sameDigitHighlight: '#FFCC80',
    sameDigitHighlightText: '#4E342E',
    fixed: '#FFF4EC',
    error: '#E75C5C',
    errorBg: '#FFEEEE',
    success: '#7CB877',
    successBg: '#EFF7EC',
    note: '#ECC7A6',
    hint: '#C67644',
    
    border: '#F2D9C2',
    borderStrong: '#6B3A21',
    
    shadow: 'rgba(212, 130, 90, 0.18)',
    shadowStrong: 'rgba(212, 130, 90, 0.3)'
  }
},

lavenderField: {
  name: '薰衣草田',
  id: 'lavenderField',
  icon: '💐',
  description: '宁静淡雅，舒缓情绪',
  colors: {
    primary: '#9A8BEB',
    primaryLight: '#B5A8FF',
    primaryDark: '#7A6ED6',
    
    background: '#F9F8FF',
    boardBg: '#FFFFFF',
    cardBg: '#FDFCFF',
    
    textDark: '#3A3160',
    textMedium: '#776EA3',
    textLight: '#A69CC5',
    textWhite: '#FFFFFF',
    
    selected: '#B5A8FF',
    selectedText: '#FFFFFF',
    related: '#DFD9FF',
    sameNumber: '#EDE8FF',
    sameDigitHighlight: '#C4B5FD',
    sameDigitHighlightText: '#4527A0',
    fixed: '#F5F2FF',
    error: '#EF6C6C',
    errorBg: '#FFF0F0',
    success: '#81C784',
    successBg: '#EFFAEF',
    note: '#C4B8FF',
    hint: '#9A8BEB',
    
    border: '#DFD9FF',
    borderStrong: '#362F75',
    
    shadow: 'rgba(154, 139, 235, 0.2)',
    shadowStrong: 'rgba(154, 139, 235, 0.35)'
  }
},
blackAndWhite: {
  name: '黑白分明',
  id: 'blackAndWhite',
  icon: '⬛',
  description: '极致黑白，锐利清晰',
  colors: {
    // ===== 主色（导航栏、主按钮、强调元素）=====
    primary: '#000000',           // 纯黑
    primaryLight: '#1A1A1A',      // 深黑，用于悬浮浅阶
    primaryDark: '#000000',       // 纯黑

    // ===== 背景色（页面与容器底色）=====
    background: '#FFFFFF',        // 页面根背景：纯白
    boardBg: '#FFFFFF',           // 棋盘背景：纯白
    cardBg: '#FFFFFF',            // 卡片背景：纯白

    // ===== 文字色（不同层级文案）=====
    textDark: '#000000',          // 主文字：纯黑
    textMedium: '#000000',        // 次级文字：纯黑（不分级，对比到底）
    textLight: '#404040',         // 弱提示文字：深灰，保证可读且不刺眼
    textWhite: '#FFFFFF',         // 深色底文字：纯白

    // ===== 功能/状态色（游戏核心交互态）=====
    // 选中格：纯黑背景+白色数字，最强烈的视觉焦点
    selected: '#000000',
    selectedText: '#FFFFFF',

    // 同行/同列/同宫高亮：接近白色的极浅灰，只为在白底上产生微弱层级感，
    // 维持“看到关联区域”的功能，避免与选中格混淆。
    related: '#F5F5F5',

    // 相同数字高亮：比related深一丁点，方便扫视相同数字
    sameNumber: '#EBEBEB',
    sameDigitHighlight: '#D0D0D0',
    sameDigitHighlightText: '#000000',

    // 固定题目数字格背景：纯白，完全与普通格一致，靠数字的不可编辑感区分
    fixed: '#FFFFFF',

    // 错误状态：保留红色，因为错误需要立即引起注意，
    // 这里使用高饱和红，背景纯白，保持醒目的同时不引入多余颜色。
    error: '#FF0000',
    errorBg: '#FFFFFF',

    // 正确/完成状态：黑色字，极浅灰背景，低调提示
    success: '#000000',
    successBg: '#F5F5F5',

    // 笔记数字：深黑（与数字同色，靠尺寸区分）
    note: '#1A1A1A',

    // 提示高亮：纯黑，与primary保持一致
    hint: '#000000',

    // ===== 边框色（线框与分隔）=====
    // 所有边框皆为纯黑，无灰色线条
    border: '#000000',
    // 宫块粗线同样是纯黑，对比强硬
    borderStrong: '#000000',

    // ===== 阴影色（完全去除）=====
    shadow: 'rgba(0, 0, 0, 0)',
    shadowStrong: 'rgba(0, 0, 0, 0)'
  }
},
honeyAmber: {
  name: '蜂蜜琥珀',
  id: 'honeyAmber',
  icon: '🍯',
  description: '温暖甜蜜，如沐晨光',
  colors: {
    // ===== 主色 =====
    primary: '#F9A825',          // 琥珀金，明亮不刺眼
    primaryLight: '#FFB74D',     // 浅蜜黄，悬浮柔和
    primaryDark: '#F57F17',      // 浓金，深阶强调

    // ===== 背景色 =====
    background: '#FFFDF3',       // 极浅乳酪白，透着暖意
    boardBg: '#FFFFFF',          // 棋盘纯白
    cardBg: '#FFFEF9',           // 卡片微暖

    // ===== 文字色 =====
    textDark: '#3D340B',         // 深橄榄褐，柔和对比
    textMedium: '#716A3F',       // 中灰黄
    textLight: '#A39B70',        // 浅灰黄
    textWhite: '#FFFFFF',

    // ===== 功能/状态色 =====
    selected: '#FFB74D',         // 选中格：浅蜜黄
    selectedText: '#FFFFFF',
    related: '#FFF0C7',          // 同行/列/宫高亮：淡麦秆色
    sameNumber: '#FFEAB3',       // 相同数字：更浅的暖光
    sameDigitHighlight: '#FFCA28',
    sameDigitHighlightText: '#4E342E',
    fixed: '#FFFDF3',            // 固定格：融入背景
    error: '#E57373',            // 柔和红色，保留警示作用
    errorBg: '#FFF0F0',
    success: '#81C784',          // 清新绿
    successBg: '#F2FCF5',
    note: '#FFD54F',             // 笔记：柔和金
    hint: '#F9A825',             // 提示：主色

    // ===== 边框色 =====
    border: '#F2E0B7',           // 浅麦穗色
    borderStrong: '#5D4700',     // 深褐，强化宫块分隔

    // ===== 阴影色 =====
    shadow: 'rgba(249, 168, 37, 0.15)',
    shadowStrong: 'rgba(249, 168, 37, 0.28)'
  }
},
lemonFizz: {
  name: '柠檬汽水',
  id: 'lemonFizz',
  icon: '🍋',
  description: '暖柠气泡，叶绿清新',
  colors: {
    // ===== 主色：暖调柠檬黄 =====
    primary: '#F5C400',           // 鲜榨暖柠
    primaryLight: '#FFDB4D',      // 柠檬汽水泡沫
    primaryDark: '#E6B300',       // 柠檬凝露

    // ===== 背景：微暖柠檬奶泡白 =====
    background: '#FFFEF5',
    boardBg: '#FFFFFF',
    cardBg: '#FFFFFB',

    // ===== 文字：深醇柠檬茶色 =====
    textDark: '#4A3D00',
    textMedium: '#736D2F',
    textLight: '#A69C5C',
    textWhite: '#FFFFFF',

    // ===== 小巧思：选中色为闪闪发亮的柠檬叶绿 =====
    selected: '#5CDB6E',          // ✦ 柠檬叶绿，鲜亮不刺眼
    selectedText: '#FFFFFF',
    related: '#FFF2C8',           // 淡柠黄泡沫
    sameNumber: '#FFFBE1',        // 极浅柠檬水
    // 同数字：树上熟柠檬亮黄（与选中叶绿、related 淡黄区分）
    sameDigitHighlight: '#FFEB3B',
    sameDigitHighlightText: '#5C4810',
    sameDigitRing: '#D4A017',
    fixed: '#FFFEF7',             // 固定格近乎白
    error: '#EF6C6C',             // 柔和珊瑚红
    errorBg: '#FFF0F0',
    success: '#5EBD6E',           // 稍深叶绿，用于完成状态
    successBg: '#F1FAF2',
    note: '#FFE57A',              // 笔记暖柠
    hint: '#5CDB6E',              // 提示柠檬叶绿

    // ===== 边框 =====
    border: '#F0E5A0',            // 浅柠汽水边
    borderStrong: '#5C4F00',      // 深柠檬籽棕

    // ===== 阴影 =====
    shadow: 'rgba(245, 196, 0, 0.15)',
    shadowStrong: 'rgba(245, 196, 0, 0.28)'
  }
},
superSudoku: {
  name: '数独超人',
  id: 'superSudoku',
  icon: '🦸',
  description: '而我的朋友，你才是真正的数独超人！',
  colors: {
    primary: '#1D4ED8',
    primaryLight: '#3B82F6',
    primaryDark: '#1E3A8A',

    background: '#E8F2FC',
    boardBg: '#D2E8FC',
    boardFrame: '#1E3A8A',
    cardBg: '#FFFFFF',

    textDark: '#0F172A',
    textMedium: '#334155',
    textLight: '#64748B',
    textWhite: '#FFFFFF',

    selected: '#FFE500',
    selectedText: '#0F172A',

    related: '#2563EB',
    relatedText: '#FFFFFF',
    sameNumber: '#E0ECFA',
    sameDigitHighlight: '#D32F2F',
    sameDigitHighlightText: '#FFF5F5',
    sameDigitRing: '#B91C1C',

    fixed: '#C8DDF5',
    error: '#DC2626',
    errorBg: '#FEE2E2',
    success: '#15803D',
    successBg: '#DCFCE7',
    note: '#60A5FA',
    hint: '#CA8A04',

    border: '#CBD5E1',
    borderStrong: '#1E3A8A',

    shadow: 'rgba(29, 78, 216, 0.18)',
    shadowStrong: 'rgba(29, 78, 216, 0.28)'
  }
}

};

// 默认主题：取 THEMES 中声明的第一个键（书写顺序），增删主题时无需再改此处
const THEME_IDS_ORDERED = Object.keys(THEMES);
const DEFAULT_THEME = THEME_IDS_ORDERED[0] || 'mintBreeze';

/**
 * 主题色兜底：同数字高亮、棋盘格缝、关联格数字色、同数描边等（缺省时不挪用 sameNumber 作同数字底）
 */
function enrichThemeColors(colors) {
  if (!colors) return colors;
  const out = { ...colors };
  if (!out.sameDigitHighlight) {
    out.sameDigitHighlight = '#8FD4C8';
  }
  if (!out.sameDigitHighlightText) {
    out.sameDigitHighlightText = out.textDark || '#1a1a1a';
  }
  if (!out.boardFrame) {
    out.boardFrame = '#2d3748';
  }
  if (!out.relatedText) {
    out.relatedText = out.textDark || '#1a1a1a';
  }
  if (!out.sameDigitRing) {
    out.sameDigitRing = out.primaryDark || '#1a1a1a';
  }
  return out;
}

function cloneThemeWithColors(theme) {
  if (!theme) return theme;
  return {
    ...theme,
    colors: enrichThemeColors(theme.colors)
  };
}

// 获取当前主题
function getCurrentTheme() {
  try {
    const themeId = wx.getStorageSync('currentTheme') || DEFAULT_THEME;
    const resolved = THEMES[themeId] || THEMES[DEFAULT_THEME];
    if (resolved) return cloneThemeWithColors(resolved);
    const firstId = THEME_IDS_ORDERED[0];
    return firstId ? cloneThemeWithColors(THEMES[firstId]) : null;
  } catch (e) {
    const firstId = THEME_IDS_ORDERED[0];
    return firstId ? cloneThemeWithColors(THEMES[firstId]) : null;
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
  return Object.values(THEMES).map((t) => cloneThemeWithColors(t));
}

// 应用系统层主题（页面根层背景 + TabBar）
function applySystemTheme(theme) {
  if (!theme || !theme.colors) return;

  try {
    // 让页面内容之外的空白区域也跟随主题背景
    wx.setBackgroundColor({
      backgroundColor: theme.colors.background,
      backgroundColorTop: theme.colors.background,
      backgroundColorBottom: theme.colors.background
    });
  } catch (e) {
    console.warn('设置系统背景色失败:', e);
  }

  try {
    // TabBar 同步主题背景，避免底部区域出现固定白底
    wx.setTabBarStyle({
      color: theme.colors.textLight,
      selectedColor: theme.colors.primary,
      backgroundColor: theme.colors.background,
      borderStyle: 'white'
    });
  } catch (e) {
    // 非 tab 页面或时机不对时可能失败，这里静默降级
  }
}

module.exports = {
  THEMES,
  DEFAULT_THEME,
  getCurrentTheme,
  setTheme,
  getAllThemes,
  applySystemTheme
};

