// 主题配置文件。各 colors 字段在界面中的用途以「薄荷微风」主题下每条内联注释为准；其它主题仅写色值，语义相同。
const THEMES = {
  mintBreeze: {
    name: '薄荷微风',
    id: 'mintBreeze',
    icon: '🍃',
    description: '清爽冰凉，醒目怡人',
    colors: {
      // 主品牌色：wx.setNavigationBarColor 导航栏背景、首页「纯粹数独训练」标题、统计顶栏/设置主题卡选中边、收藏 Tab 选中渐变起点、教程步骤条与按钮、游戏顶栏「难度/计时」条、暂停里「再来一局」等主按钮渐变的一端
      primary: '#26A69A',
      // 主色浅阶：与 primary 组成渐变（如按钮、Tab 选中条）；游戏底部工具栏「笔记」「暂停」为开启态时的按钮背景
      primaryLight: '#4DB6AC',
      // 主色深阶：同上各类 linear-gradient(135deg, primary, primaryDark) 的深色端；设置/收藏里选中卡片阴影强调
      primaryDark: '#00897B',

      // 页面大背景：各页根容器渐变底色、wx.setBackgroundColor 上下拉露底、wx.setTabBarStyle 的 TabBar 背景、游戏页底部宠物条区域底色
      background: '#F3FAF7',
      // 棋盘「普通空格」底色：9×9 内未高亮、非题目给定、非选中时的单元格背景（game.wxml 棋盘格）
      boardBg: '#FFFFFF',
      // 棋盘外框底板：包住整块 9×9 的 view 背景，形成格与格外围的「沟槽/底板」色，与宫格线视觉衔接
      boardFrame: '#004D40',
      // 卡片/面板浅底：游戏页底部数字键盘整条 toolbar 外层的浅条、宠物对话气泡背景、收藏/设置等页面的卡片与 Tab 条背景（与下方「浮层块表面」可区分：条带用 cardBg，独立按钮块用 surfaceElevated）
      cardBg: '#FCFFFD',
      // 浮层块表面色：首页五大菜单行、游戏页「撤销/清除/笔记/提示/暂停」与数字 1～9 键的默认底、暂停遮罩铺满色、公告页教程折叠卡底；叠在页面 background 之上。暗色主题宜略亮于 background，避免死白一块
      surfaceElevated: '#FFFFFF',

      // 主文案色：页面标题、棋盘里玩家填入的数字默认色、工具栏图标与「撤销/清除/提示」等主标签字色
      textDark: '#1D4D44',
      // 次级说明：统计项说明、菜单副标题、教程正文、公告折叠内容等
      textMedium: '#5C857A',
      // 弱提示/脚注：页脚小字、未选中 Tab 文字（applySystemTheme 里 TabBar 默认项 color）、图鉴底部提示等
      textLight: '#8FB3A8',
      // 深色底上的字：导航栏前景（配合深色导航栏）、主按钮上的字、笔记模式开启时按钮内主数字等
      textWhite: '#FFFFFF',

      // 当前选中格背景：填纯色（如 #4DB6AC）或 CSS 渐变（如 linear-gradient(135deg, #a, #b)）；游戏格用 background 而非 background-color 以支持渐变
      selected: '#4DB6AC',
      // 选中格内数字颜色：该格已填数字在选中态下的字色（常与主色对比）
      selectedText: '#FFFFFF',
      // 关联区域背景：与选中格同同行、同列、同宫的其它格底色（高亮「相关区域」）
      related: '#B9E4DE',
      // 关联格数字色：处于 related 高亮但非「当前选中格」时，格内已填数字的颜色（可与普通 textDark 区分冷暖）
      relatedText: '#1D4D44',

      // 统计/装饰浅条底：游戏页「最佳时间」胶囊条、统计页各难度「最佳时间」行背景；注意不是棋盘「同数字高亮」格（那是 sameDigit*）
      sameNumber: '#D7F0EC',
      // 棋盘同数字高亮底：与当前选中格数字相同、且不是选中格本身的其它格背景
      sameDigitHighlight: '#7FD1C0',
      // 棋盘同数字高亮字色：同上格子里显示的数字颜色
      sameDigitHighlightText: '#004D40',
      // 棋盘同数字高亮描边：同上格子内圈 inset 细线（box-shadow），让同数格在复杂背景下仍清晰
      sameDigitRing: '#00897B',

      // 题目给定格背景：数独初始就有的、不可清除的数字所在格底色
      fixed: '#ECF7F4',

      // 错误主色：填错规则时的强调、统计页「重置数据」按钮主色等
      error: '#EF5350',
      // 错误格背景：与错误态叠加时覆盖在格子上的浅红底
      errorBg: '#FFECEE',
      // 成功/正向主色：提示高亮渐变的一端、完成态点缀等（与 hint 常成对出现在渐变里）
      success: '#66BB6A',
      // 成功浅底：成功类提示条、浅绿背景块
      successBg: '#EBF7EB',

      // 笔记数字色：开启笔记模式时，格内小号 1～9 候选数字颜色
      note: '#80CBC4',
      // 提示高亮：使用「提示」功能时格子高亮渐变的一端
      hint: '#26A69A',

      // 浅分割/描边：数字键外框、卡片细边框、宠物气泡边框、工具栏上下分隔线等
      border: '#D7F0EC',
      // 强分割/宫线感：需要更重对比的边框（如粗宫格线语义、强调描边）；可与 boardFrame 同色或略区分，按视觉统一即可
      borderStrong: '#004D40',
      // 棋盘九宫粗分割线：3×3 宫块之间的加粗竖/横线（game.wxss 中 .cell.border-right::after / .border-bottom::before）；可与 borderStrong 同色，也可单独调亮/调暗以适配暗色棋盘
      boardPalaceLine: '#004D40',

      // 轻阴影：菜单卡片、数据卡片、普通按钮投影
      shadow: 'rgba(38, 166, 154, 0.15)',
      // 重阴影：选中主题卡、主操作按钮等略更强的浮起感
      shadowStrong: 'rgba(38, 166, 154, 0.28)'
    },
  },

  warmSunset: {
    name: '温暖日落',
    id: 'warmSunset',
    icon: '🌇',
    description: '温暖舒适，活力充沛',
    colors: {
      primary: '#FF8A65',
      primaryLight: '#FFAB91',
      primaryDark: '#FF7043',
      background: '#FFF8F5',
      boardBg: '#FFFFFF',
      boardFrame: '#3E2723',
      cardBg: '#FFFFFF',
      surfaceElevated: '#FFFFFF',
      textDark: '#5D3A2E',
      textMedium: '#A67C6D',
      textLight: '#C9A99B',
      textWhite: '#FFFFFF',
      selected: '#FFAB91',
      selectedText: '#FFFFFF',
      related: '#FFE0D1',
      relatedText: '#5D3A2E',
      sameNumber: '#FFCCBC',
      sameDigitHighlight: '#FFB74D',
      sameDigitHighlightText: '#5D3A2E',
      sameDigitRing: '#FF7043',
      fixed: '#FFF5F0',
      error: '#EF5350',
      errorBg: '#FFEBEE',
      success: '#66BB6A',
      successBg: '#F1F8E9',
      note: '#FFCC80',
      hint: '#FFB74D',
      border: '#FFE0D1',
      borderStrong: '#3E2723',
      boardPalaceLine: '#3E2723',
      shadow: 'rgba(255, 138, 101, 0.15)',
      shadowStrong: 'rgba(255, 138, 101, 0.25)'
    }
  },

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
      boardFrame: '#1B5E20',
      cardBg: '#FFFFFF',
      surfaceElevated: '#FFFFFF',
      textDark: '#2E5D3A',
      textMedium: '#6D9A7C',
      textLight: '#9BBCA8',
      textWhite: '#FFFFFF',
      selected: '#81C784',
      selectedText: '#FFFFFF',
      related: '#C8E6C9',
      relatedText: '#2E5D3A',
      sameNumber: '#E0F2E0',
      sameDigitHighlight: '#AED581',
      sameDigitHighlightText: '#1B5E20',
      sameDigitRing: '#4CAF50',
      fixed: '#F1F8F1',
      error: '#EF5350',
      errorBg: '#FFEBEE',
      success: '#66BB6A',
      successBg: '#E8F5E9',
      note: '#A5D6A7',
      hint: '#66BB6A',
      border: '#E0F2E0',
      borderStrong: '#1B5E20',
      boardPalaceLine: '#1B5E20',
      shadow: 'rgba(102, 187, 106, 0.15)',
      shadowStrong: 'rgba(102, 187, 106, 0.25)'
    }
  },

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
      boardFrame: '#4A148C',
      cardBg: '#FFFFFF',
      surfaceElevated: '#FFFFFF',
      textDark: '#4A2E5D',
      textMedium: '#8B6D9A',
      textLight: '#B399BC',
      textWhite: '#FFFFFF',
      selected: '#BA68C8',
      selectedText: '#FFFFFF',
      related: '#E1BEE7',
      relatedText: '#4A2E5D',
      sameNumber: '#F3E5F5',
      sameDigitHighlight: '#CE93D8',
      sameDigitHighlightText: '#4A148C',
      sameDigitRing: '#9C27B0',
      fixed: '#F9F5FA',
      error: '#EF5350',
      errorBg: '#FFEBEE',
      success: '#66BB6A',
      successBg: '#F1F8E9',
      note: '#CE93D8',
      hint: '#AB47BC',
      border: '#E1BEE7',
      borderStrong: '#4A148C',
      boardPalaceLine: '#4A148C',
      shadow: 'rgba(171, 71, 188, 0.15)',
      shadowStrong: 'rgba(171, 71, 188, 0.25)'
    }
  },

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
      boardFrame: '#0D47A1',
      cardBg: '#FFFFFF',
      surfaceElevated: '#FFFFFF',
      textDark: '#1E3A5F',
      textMedium: '#5B7C9A',
      textLight: '#8FA9BC',
      textWhite: '#FFFFFF',
      selected: '#64B5F6',
      selectedText: '#FFFFFF',
      related: '#BBDEFB',
      relatedText: '#1E3A5F',
      sameNumber: '#E3F2FD',
      sameDigitHighlight: '#90CAF9',
      sameDigitHighlightText: '#0D47A1',
      sameDigitRing: '#2196F3',
      fixed: '#F5F9FC',
      error: '#EF5350',
      errorBg: '#FFEBEE',
      success: '#66BB6A',
      successBg: '#F1F8E9',
      note: '#90CAF9',
      hint: '#42A5F5',
      border: '#E3F2FD',
      borderStrong: '#0D47A1',
      boardPalaceLine: '#0D47A1',
      shadow: 'rgba(66, 165, 245, 0.15)',
      shadowStrong: 'rgba(66, 165, 245, 0.25)'
    }
  },

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
      boardFrame: '#263238',
      cardBg: '#FFFFFF',
      surfaceElevated: '#FFFFFF',
      textDark: '#37474F',
      textMedium: '#607D8B',
      textLight: '#90A4AE',
      textWhite: '#FFFFFF',
      selected: '#90A4AE',
      selectedText: '#FFFFFF',
      related: '#CFD8DC',
      relatedText: '#37474F',
      sameNumber: '#ECEFF1',
      sameDigitHighlight: '#B0BEC5',
      sameDigitHighlightText: '#263238',
      sameDigitRing: '#607D8B',
      fixed: '#F8F9FA',
      error: '#EF5350',
      errorBg: '#FFEBEE',
      success: '#66BB6A',
      successBg: '#F1F8E9',
      note: '#B0BEC5',
      hint: '#78909C',
      border: '#ECEFF1',
      borderStrong: '#263238',
      boardPalaceLine: '#263238',
      shadow: 'rgba(120, 144, 156, 0.15)',
      shadowStrong: 'rgba(120, 144, 156, 0.25)'
    }
  },

  rainShine: {
    name: '雨晴',
    id: 'rainShine',
    icon: '🌦️',
    description: '归去，也无风雨也无晴',
    colors: {
      primary: '#00ACC1',
      primaryLight: '#4DD0E1',
      primaryDark: '#00838F',
      background: '#F0FCFE',
      boardBg: '#FFFFFF',
      boardFrame: '#0D5057',
      cardBg: '#FAFEFF',
      surfaceElevated: '#FFFFFF',
      textDark: '#0B3C41',
      textMedium: '#2E7D82',
      textLight: '#5BA8AE',
      textWhite: '#FFFFFF',
      selected: '#FFB300',
      selectedText: '#1E3B2F',
      related: '#B2EBF2',
      relatedText: '#0B3C41',
      sameNumber: '#D4F1F4',
      sameDigitHighlight: '#B4C0CB',
      sameDigitHighlightText: '#2E4050',
      sameDigitRing: '#8A9BA8',
      fixed: '#F4FCFD',
      error: '#FF6B6B',
      errorBg: '#FFF0F0',
      success: '#69D2A0',
      successBg: '#F2FCF7',
      note: '#7DD3DE',
      hint: '#FFA000',
      border: '#C4EDF2',
      borderStrong: '#0D5057',
      boardPalaceLine: '#0D5057',
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
      boardFrame: '#880E4F',
      cardBg: '#FFFBFC',
      surfaceElevated: '#FFFFFF',
      textDark: '#5D2E42',
      textMedium: '#A26B7D',
      textLight: '#C99BA9',
      textWhite: '#FFFFFF',
      selected: '#F48FB1',
      selectedText: '#FFFFFF',
      related: '#FDE0E8',
      relatedText: '#5D2E42',
      sameNumber: '#FDEAF2',
      sameDigitHighlight: '#F8BBD0',
      sameDigitHighlightText: '#880E4F',
      sameDigitRing: '#EC407A',
      fixed: '#FFF0F4',
      // 错误态：避免与主色粉、related 浅粉同色相叠在一起；用偏冷的雾蓝紫底 + 略深红，棋盘上一眼可辨又不跳戏
      error: '#C62828',
      errorBg: '#E4E8F4',
      success: '#81C784',
      successBg: '#F1F8E9',
      note: '#F8BBD0',
      hint: '#F06292',
      border: '#FDE0E8',
      borderStrong: '#880E4F',
      boardPalaceLine: '#880E4F',
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
      boardFrame: '#6B3A21',
      cardBg: '#FFFBF8',
      surfaceElevated: '#FFFFFF',
      textDark: '#4B2E1E',
      textMedium: '#8B6354',
      textLight: '#B8947E',
      textWhite: '#FFFFFF',
      selected: '#E3A680',
      selectedText: '#FFFFFF',
      related: '#F5E1D1',
      relatedText: '#4B2E1E',
      sameNumber: '#FAEDE3',
      sameDigitHighlight: '#FFCC80',
      sameDigitHighlightText: '#4E342E',
      sameDigitRing: '#B8623B',
      fixed: '#FFF4EC',
      error: '#E75C5C',
      errorBg: '#FFEEEE',
      success: '#7CB877',
      successBg: '#EFF7EC',
      note: '#ECC7A6',
      hint: '#C67644',
      border: '#F2D9C2',
      borderStrong: '#6B3A21',
      boardPalaceLine: '#6B3A21',
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
      boardFrame: '#362F75',
      cardBg: '#FDFCFF',
      surfaceElevated: '#FFFFFF',
      textDark: '#3A3160',
      textMedium: '#776EA3',
      textLight: '#A69CC5',
      textWhite: '#FFFFFF',
      selected: '#B5A8FF',
      selectedText: '#FFFFFF',
      related: '#DFD9FF',
      relatedText: '#3A3160',
      sameNumber: '#EDE8FF',
      sameDigitHighlight: '#C4B5FD',
      sameDigitHighlightText: '#4527A0',
      sameDigitRing: '#7A6ED6',
      fixed: '#F5F2FF',
      error: '#EF6C6C',
      errorBg: '#FFF0F0',
      success: '#81C784',
      successBg: '#EFFAEF',
      note: '#C4B8FF',
      hint: '#9A8BEB',
      border: '#DFD9FF',
      borderStrong: '#362F75',
      boardPalaceLine: '#362F75',
      shadow: 'rgba(154, 139, 235, 0.2)',
      shadowStrong: 'rgba(154, 139, 235, 0.35)'
    }
  },

  blackAndWhite: {
    name: '钢琴键', // 建议改名，提升高级感
    id: 'blackAndWhite',
    icon: '🎹',
    description: '黑白相衬，简单就是高级',
    colors: {
      // 主品牌色：放弃纯黑，改用深碳灰（iOS系统级深色），不刺眼且极具质感
      primary: '#1C1C1E',
      primaryLight: '#48484A',
      primaryDark: '#000000',

      // 页面大背景：使用非常淡的冷灰色铺底，让白色的棋盘和卡片能“浮”出来
      background: '#F2F2F7',
      // 棋盘底色：纯白，与背景灰形成第一层物理高度
      boardBg: '#FFFFFF',
      // 棋盘外框：深碳灰，像高级相框一样稳稳锁住盘面
      boardFrame: '#1C1C1E',
      // 卡片/面板浅底：纯白。配合极其微弱的阴影，底部键盘区会变成干净的悬浮卡片，告别“线框感”
      cardBg: '#FFFFFF',
      surfaceElevated: '#FFFFFF',

      // 主文案色：深碳灰
      textDark: '#1C1C1E',
      // 次级说明：高级中灰，拉开文案阅读的层次
      textMedium: '#636366',
      // 弱提示/脚注：浅灰
      textLight: '#8E8E93',
      textWhite: '#FFFFFF',

      // 当前选中格：深碳灰，文字反白。配合周围的灰色，它会像一枚精致的黑色钢琴按键
      selected: '#1C1C1E',
      selectedText: '#FFFFFF',
      // 关联区域背景：极浅的银灰色，玩家能看清十字高亮，但绝对不会抢风头
      related: '#E5E5EA',
      relatedText: '#1C1C1E',

      // 统计浅条底：配合背景的浅灰
      sameNumber: '#F2F2F7',
      // 棋盘同数字高亮底：深一阶的灰色，让同数字稳稳地显现出来
      sameDigitHighlight: '#D1D1D6',
      sameDigitHighlightText: '#1C1C1E',
      // 棋盘同数字高亮描边：稍微深一点的灰线内圈，勾勒边界
      sameDigitRing: '#8E8E93',

      // 题目给定格背景：在纯白中加入极其微弱的灰度，让“固定数字”具有物理上的重量感
      fixed: '#FAFAFA',

      // 错误主色：在极简黑白中，保留一点克制的暗红色作为错误提示，是提升 UX 的必要手段
      error: '#D32F2F',
      errorBg: '#FDECEA',
      // 成功主色：深灰
      success: '#1C1C1E',
      successBg: '#F2F2F7',

      // 笔记数字色：中灰，不干扰主数字
      note: '#8E8E93',
      hint: '#636366',

      // 【关键修改】浅分割/描边：使用极浅的灰色。底部键盘区的黑色描边会变成温柔的浅灰，瞬间变得现代且干净
      border: '#E5E5EA',
      // 强分割/宫线感：深碳灰，保留九宫格的逻辑清晰度
      borderStrong: '#1C1C1E',
      boardPalaceLine: '#1C1C1E',

      // 轻阴影：使用非常柔和的弥散阴影来代替黑色描边，制造空间感
      shadow: 'rgba(0, 0, 0, 0.05)',
      shadowStrong: 'rgba(0, 0, 0, 0.12)'
    }
  },

  honeyAmber: {
    name: '蜂蜜琥珀',
    id: 'honeyAmber',
    icon: '🍯',
    description: '温暖甜蜜，如沐晨光',
    colors: {
      primary: '#F9A825',
      primaryLight: '#FFB74D',
      primaryDark: '#F57F17',
      background: '#FFFDF3',
      boardBg: '#FFFFFF',
      boardFrame: '#5D4700',
      cardBg: '#FFFEF9',
      surfaceElevated: '#FFFFFF',
      textDark: '#3D340B',
      textMedium: '#716A3F',
      textLight: '#A39B70',
      textWhite: '#FFFFFF',
      selected: '#FFB74D',
      selectedText: '#FFFFFF',
      related: '#FFF0C7',
      relatedText: '#3D340B',
      sameNumber: '#FFEAB3',
      sameDigitHighlight: '#FFCA28',
      sameDigitHighlightText: '#4E342E',
      sameDigitRing: '#F57F17',
      fixed: '#FFFDF3',
      error: '#E57373',
      errorBg: '#FFF0F0',
      success: '#81C784',
      successBg: '#F2FCF5',
      note: '#FFD54F',
      hint: '#F9A825',
      border: '#F2E0B7',
      borderStrong: '#5D4700',
      boardPalaceLine: '#5D4700',
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
      primary: '#F5C400',
      primaryLight: '#FFDB4D',
      primaryDark: '#E6B300',
      background: '#FFFEF5',
      boardBg: '#FFFFFF',
      boardFrame: '#5C4F00',
      cardBg: '#FFFFFB',
      surfaceElevated: '#FFFFFF',
      textDark: '#4A3D00',
      textMedium: '#736D2F',
      textLight: '#A69C5C',
      textWhite: '#FFFFFF',
      selected: '#5CDB6E',
      selectedText: '#FFFFFF',
      related: '#FFF2C8',
      relatedText: '#4A3D00',
      sameNumber: '#FFFBE1',
      sameDigitHighlight: '#FFEB3B',
      sameDigitHighlightText: '#5C4810',
      sameDigitRing: '#E6B300',
      fixed: '#FFFEF7',
      error: '#EF6C6C',
      errorBg: '#FFF0F0',
      success: '#5EBD6E',
      successBg: '#F1FAF2',
      note: '#FFE57A',
      hint: '#5CDB6E',
      border: '#F0E5A0',
      borderStrong: '#5C4F00',
      boardPalaceLine: '#5C4F00',
      shadow: 'rgba(245, 196, 0, 0.15)',
      shadowStrong: 'rgba(245, 196, 0, 0.28)'
    }
  },

  superSudoku: {
    name: '数独超人',
    id: 'superSudoku',
    icon: '🦸‍♂️',
    description: '而我的朋友，你才是真正的数独超人！',
    colors: {
      // 主品牌色：经典的“超人战衣蓝 (Action Blue)”
      primary: '#005CE6',
      primaryLight: '#4D8DFF',
      primaryDark: '#003DAA',

      // 页面大背景：带一点点极其微弱蓝调的漫画纸张白
      background: '#F0F5FA',
      // 棋盘底色：纯白
      boardBg: '#FFFFFF',
      // 棋盘外框：极深的藏青蓝，类似漫画里超级英雄的阴影色
      boardFrame: '#002B7F',
      cardBg: '#FFFFFF',
      surfaceElevated: '#FFFFFF',

      // 主文案色：放弃死黑，改用极深的藏青蓝，让整个画面的色彩基因高度统一
      textDark: '#001A4D',
      textMedium: '#4A658A',
      textLight: '#8C9EB5',
      textWhite: '#FFFFFF',

      // 【核心灵魂 1：S盾牌黄】当前选中格
      selected: '#FFCC00', 
      selectedText: '#001A4D', // 藏青色数字在黄色上极其锐利
      
      // 【核心灵魂 2：战衣蓝】关联区域：恢复你最喜欢的实心蓝色背景！
      // 但我将之前的暗沉蓝(#2563EB)改成了更明亮、更漫画的“明亮动感蓝(#3385FF)”
      // 这样配上白字，既有强烈的视觉冲击，又不会像“黑洞”一样沉重
      related: '#3385FF',
      relatedText: '#FFFFFF',

      sameNumber: '#E6F0FF',
      
      // 【核心灵魂 3：披风红】同数字高亮：恢复实心大红块！
      // 颜色校准为纯正的“英雄红(#E62E2E)”，配上白色数字，绝对吸睛
      sameDigitHighlight: '#E62E2E',
      sameDigitHighlightText: '#FFFFFF',
      sameDigitRing: '#B30000', // 暗红色的内圈描边，增加美漫上色的厚涂质感

      // 固定格：微微透出一丁点蓝灰，区分于可填空格
      fixed: '#F5F8FF',

      // 错误主色：更暗的深血红，与同数字高亮的“英雄红”拉开差距
      error: '#990000',
      errorBg: '#FFCCCC',
      // 成功主色：氪星石绿 (Kryptonite Green)
      success: '#00B359',
      successBg: '#E6FFF2',

      note: '#005CE6',
      hint: '#FFCC00',

      // 分割线体系：漫画重墨勾线风格
      border: '#B3D1FF', // 浅蓝色的普通格子线
      borderStrong: '#002B7F', // 藏青蓝色的粗分割线，镇住这些强烈的色块
      boardPalaceLine: '#002B7F',

      shadow: 'rgba(0, 92, 230, 0.25)',
      shadowStrong: 'rgba(0, 92, 230, 0.45)'
    }
  },
  shootingStar: {
    name: '暗夜流星',
    id: 'shootingStar',
    icon: '🌠',
    description: '一颗流星划过深邃的夜空',
    colors: {
      // 主色：深邃夜空的星际蓝，降低明度，提升质感
      primary: '#42567A',
      primaryLight: '#627A9F',
      primaryDark: '#2B3A55',

      // 页面大背景：真正的深空黑蓝，比之前更暗，让后续的发光元素能“亮”起来
      background: '#0B0F19',
      // 棋盘底色：幽暗的夜空，拉开与大背景的层次
      boardBg: '#131A2A',
      // 棋盘外框：极暗的黑洞色
      boardFrame: '#05070C',
      // 卡片/面板浅底：底部键盘区的底色，稍微透出一点点紫蓝色的星云光芒
      cardBg: '#1A2235',
      // 浮层块表面：键盘按钮的本色
      surfaceElevated: '#242F49',

      // 主文案色：星光白（略带一点点蓝调，千万不能用死白）
      textDark: '#E2EAF5',
      // 次级说明：远星的灰蓝色
      textMedium: '#8293B6',
      // 弱提示/脚注：更暗的星尘色
      textLight: '#5A698C',
      textWhite: '#FFFFFF',

      // 【优化点1】当前选中格（流星）：改用更高亮的青蓝渐变，并将内部数字改为绝对反白，打造“高热流星核”的视觉中心
      selected: 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)',
      selectedText: '#FFFFFF',
      
      // 【优化点2】关联区域（流星尾迹）：使用深邃的星云紫蓝，替换掉之前生硬的灰蓝，显得非常浪漫且不抢戏
      related: '#1E2845',
      relatedText: '#E2EAF5',

      // 【优化点3修复】统计浅条底（修复苍白条 Bug）：使用深空灰蓝，完美融入暗色背景
      sameNumber: '#1A2235',
      
      // 【优化点4】同数字高亮（群星）：放弃扁平的明黄色。改为稍微内敛的“恒星金”，并让文字变成深空色，使其像是一颗颗独立发光的星星
      sameDigitHighlight: '#F2C94C',
      sameDigitHighlightText: '#0B0F19',
      // 给星星加一圈橙金色的光晕（内描边）
      sameDigitRing: '#F2994A',

      // 固定格：比普通格子更暗一点，像不可撼动的暗物质
      fixed: '#0E1320',

      // 错误与成功：采用赛博朋克感的霓虹红与霓虹绿，在暗夜中极具穿透力
      error: '#FF3D71',
      errorBg: '#2B1221',
      success: '#00E096',
      successBg: '#0D2B26',

      // 笔记数字色：星芒碎光，极浅的青冰色
      note: '#80E5FF',
      hint: '#D0A0FF',

      // 【优化点5】分隔线体系：大幅度压暗！让线条隐入夜空，只起分割作用，不再像“铁丝网”
      border: '#1F2B45',
      borderStrong: '#2A3A5C', // 宫线不再刺眼
      boardPalaceLine: '#2A3A5C',

      // 阴影：深邃的黑洞投影
      shadow: 'rgba(0, 0, 0, 0.4)',
      shadowStrong: 'rgba(0, 0, 0, 0.7)'
    }
  },
  morningGlow: {
    name: '清晨',
    id: 'morningGlow',
    icon: '🌅',
    description: '晨光微露，破晓生辉',
    colors: {
      // 主品牌色：原色 #3ec1d3 (天青色)，大面积用于导航栏、主按钮，奠定清爽的基调
      primary: '#3EC1D3',
      primaryLight: '#78D6E3',
      primaryDark: '#2A9AA9',

      // 页面大背景：在原色 #f6f7d7 基础上大幅提亮，避免大面积发黄导致视觉疲劳
      background: '#FDFDF7',
      boardBg: '#FFFFFF',
      // 外框底板：使用深邃的青蓝色压住阵脚，避免整体色调飘在空中
      boardFrame: '#1D6B76',
      // 卡片/固定元素：精准使用原色 #f6f7d7，作为柔和的暖色过渡
      cardBg: '#F6F7D7',
      surfaceElevated: '#FFFFFF',

      // 主文案色：从天青色推演出的深墨蓝，比纯黑更柔和，契合清晨主题
      textDark: '#164F58',
      textMedium: '#498B94',
      textLight: '#8EBDC4',
      textWhite: '#FFFFFF',

      // 当前选中格：原色 #ff9a00 (朝阳橙)，作为视觉绝对中心，像初升的太阳
      selected: '#FF9A00',
      selectedText: '#FFFFFF',
      // 关联区域：极浅的青蓝色，像晨雾散开的天空
      related: '#E0F5F8',
      relatedText: '#164F58',

      // 统计浅条底：配合橙色的极浅暖调
      sameNumber: '#FFF5E5',
      // 同数字高亮底：使用破晓粉红的极浅版，柔和不刺眼
      sameDigitHighlight: '#FFDCE6',
      sameDigitHighlightText: '#8C002B',
      // 同数字高亮描边：原色 #ff165d (破晓粉红)，极其醒目，勾勒出朝霞的边缘
      sameDigitRing: '#FF165D',

      // 题目给定格背景：铺垫原色 #f6f7d7，让固定数字带有清晨微光的温度
      fixed: '#FCFDEA',

      // 错误主色：完美复用破晓粉红 #ff165d，警示性极强且不偏离主题色盘
      error: '#FF165D',
      errorBg: '#FFEAF0',
      // 成功主色：向青绿色偏移，与主色相呼应
      success: '#3AC2A0',
      successBg: '#E8F7F3',

      // 笔记数字色：使用朝阳橙
      note: '#FF9A00',
      // 提示高亮：使用破晓粉红
      hint: '#FF165D',

      // 分割与阴影
      border: '#D0EDF1',
      borderStrong: '#2A9AA9',
      boardPalaceLine: '#2A9AA9',
      shadow: 'rgba(62, 193, 211, 0.15)',
      shadowStrong: 'rgba(62, 193, 211, 0.3)'
    }
  },
  bloodSunset: {
    name: '残阳如血',
    id: 'bloodSunset',
    icon: '🩸',
    description: '从头越，苍山如海，残阳如血。',
    colors: {
      // 主品牌色：原色 #e23e57 (残阳红)，作为画面的高光和核心操作的指引
      primary: '#E23E57',
      // 主色浅阶：提亮后的残阳红，用于渐变高光或呼吸态
      primaryLight: '#EE7084',
      // 主色深阶：原色 #88304e (凝血紫)，承接残阳与夜幕的过渡
      primaryDark: '#88304E',

      // 页面大背景：比原辅色更深的暗紫黑，深不可测的夜幕底色，让所有元素浮现其上
      background: '#1F112A',
      // 棋盘底色：完美复用最深辅色 #311d3f，犹如暮色笼罩的大地
      boardBg: '#311D3F',
      // 棋盘外框：极暗的紫黑色，将数独盘面牢牢锁住，稳重压抑
      boardFrame: '#150B1D',
      // 卡片/面板浅底：稍微提亮的紫调，用于底部键盘、弹出面板的底色
      cardBg: '#3E254F',
      // 浮层块表面：菜单与按钮表面，区分于背景
      surfaceElevated: '#492D5D',

      // 主文案色：暗色主题下，文字不能纯白刺眼，采用带有微红紫倾向的灰白色
      textDark: '#F4E0E5',
      // 次级说明：融入暮色的暗玫瑰灰
      textMedium: '#B592A0',
      // 弱提示/脚注：更深沉的隐形文案
      textLight: '#836271',
      // 深色底上的字：绝对反白的字，用于高亮强调
      textWhite: '#FFFFFF',

      // 当前选中格：#e23e57 残阳红，宛如在幽暗盘面上升起的血色夕阳
      selected: '#E23E57',
      selectedText: '#FFFFFF',
      // 关联区域背景：原辅色 #522546，苍山的颜色，暗紫红色，沉稳且有层次
      related: '#522546',
      relatedText: '#F4E0E5',

      // 统计浅条底：隐约的紫灰条带
      sameNumber: '#432853',
      // 棋盘同数字高亮底：使用原色 #88304e (凝血紫)，像落日余晖在云层中的倒影
      sameDigitHighlight: '#88304E',
      sameDigitHighlightText: '#F4E0E5',
      // 棋盘同数字高亮描边：用残阳红勾勒边框，让同数字在暗沉的盘面中如同火种
      sameDigitRing: '#E23E57',

      // 题目给定格背景：在 boardBg 基础上稍微偏灰红一点，暗示这是“不可动摇的如海苍山”
      fixed: '#3D244D',

      // 错误主色：暗黑主题下需要比残阳更刺眼的猩红来警示
      error: '#FF4D4D',
      // 错误格背景：幽暗的血泊色
      errorBg: '#611C27',
      // 成功/正向主色：降低明度的墨绿色，避免在如此悲壮的主题中显得过于跳脱轻浮
      success: '#4A8F5D',
      // 成功浅底
      successBg: '#213328',

      // 笔记数字色：带灰度的粉紫色，不抢残阳的风头，但在暗底上清晰可见
      note: '#D98295',
      // 提示高亮：直接使用残阳红的耀眼光芒
      hint: '#E23E57',

      // 浅分割/描边：使用苍山色 #522546 进行普通分割
      border: '#522546',
      // 强分割/宫线感：几乎融入夜色的黑紫色，形成隐秘而强大的约束感
      borderStrong: '#1A0F21',
      // 九宫粗分割线：同上，极致的黑紫
      boardPalaceLine: '#120A17',

      // 轻阴影：暗色主题下用纯黑阴影压底
      shadow: 'rgba(0, 0, 0, 0.5)',
      // 重阴影：发光的残阳红阴影，营造“如血”的辉光感 (Glow effect)
      shadowStrong: 'rgba(226, 62, 87, 0.35)'
    }
  },
  dreamWorld: {
    name: '梦想世界',
    id: 'dreamWorld',
    icon: '🎈',
    description: '蓝天白云青草地，梦想中的世界',
    colors: {
      primary: '#4FC3F7',
      primaryLight: '#81D4FA',
      primaryDark: '#0288D1',

      background: '#F4FAFD',
      boardBg: '#FFFFFF',
      
      // 【修改点1：结构线变轻盈】外框改为清澈的深天空蓝，稳住边界但不刺眼
      boardFrame: '#0288D1',
      cardBg: '#FFFFFF',
      surfaceElevated: '#FFFFFF',

      textDark: '#263238',
      textMedium: '#546E7A',
      textLight: '#90A4AE',
      textWhite: '#FFFFFF',

      // 太阳（当前选中格）：保持不变，极佳的视觉焦点
      selected: '#FFD54F',
      selectedText: '#3E2723',
      // 天空（关联区域）：微风蓝，保持不变
      related: '#E1F5FE',
      relatedText: '#263238',

      // 浅条底：极其淡的青绿色，柔和过渡
      sameNumber: '#F1F8E9',
      
      // 【草地保留在这里】棋盘同数字高亮：鲜嫩的草绿色。平时隐藏，点击时浮现
      sameDigitHighlight: '#A5D6A7',
      sameDigitHighlightText: '#1B5E20',
      sameDigitRing: '#66BB6A', 

      // 题目给定格背景：极浅的蓝灰（云影）
      fixed: '#F5F9FA',

      error: '#FF5252',
      errorBg: '#FFEBEE',
      success: '#4CAF50',
      successBg: '#E8F5E9',

      note: '#4FC3F7',
      hint: '#FFA000',

      // 【修改点2：内部网格线隐形】
      // 普通小格子分割线：极浅的云朵蓝灰，几乎不抢视线
      border: '#E1EDF2',
      // 九宫格粗线/强分割：清澈的天空蓝，与外框呼应，保持干净纯粹
      borderStrong: '#29B6F6',
      boardPalaceLine: '#29B6F6',

      shadow: 'rgba(79, 195, 247, 0.15)',
      shadowStrong: 'rgba(79, 195, 247, 0.3)'
    }
  },
  matchaMilkGreen: {
    name: '抹茶奶绿',
    id: 'matchaMilkGreen',
    icon: '🍵',
    description: '清甜奶香，悠然茶韵',
    colors: {
      // 主品牌色：原辅色 #729d39 (标准抹茶绿)，明暗适中，非常适合做导航栏和主按钮
      primary: '#729D39',
      // 主色浅阶：原主色 #c6e377 (浅抹茶)，轻盈透亮
      primaryLight: '#C6E377',
      // 主色深阶：原辅色 #36622b (深茶绿)，稳重扎实
      primaryDark: '#36622B',

      // 页面大背景：在原奶黄色上稍作提亮，让“奶”的质感更清透，不至于全屏发黄
      background: '#FCFDF4',
      // 棋盘底色：纯白，确保数字阅读体验
      boardBg: '#FFFFFF',
      // 棋盘外框：使用最深的 #36622b。它足够暗，起到了收束视觉的作用，不会产生“绿光牢笼”感
      boardFrame: '#36622B',
      // 卡片/面板浅底：完美复用原主色 #fbfad3 (奶黄)，用在底部键盘区会有浓郁的奶香感
      cardBg: '#FBFAD3',
      // 浮层块表面：纯白块，叠加在奶黄底上显得很干净
      surfaceElevated: '#FFFFFF',

      // 主文案色：基于深茶绿推演出的极深墨绿，比死黑更贴合主题
      textDark: '#24421D',
      textMedium: '#53753A',
      textLight: '#8CA675',
      textWhite: '#FFFFFF',

      // 当前选中格：#729d39 (标准抹茶绿)，视觉中心点明确
      selected: '#729D39',
      selectedText: '#FFFFFF',
      // 关联区域背景：原主色 #fbfad3 (奶黄)。十字高亮区用温暖的奶黄色，极其护眼且温柔
      related: '#FBFAD3',
      relatedText: '#24421D',

      // 统计浅条底：极其淡的茶水色
      sameNumber: '#F2F6E3',
      // 棋盘同数字高亮底：原主色 #c6e377 (浅抹茶)，像抹茶粉撒在奶泡上
      sameDigitHighlight: '#C6E377',
      sameDigitHighlightText: '#1B3615',
      sameDigitRing: '#729D39',

      // 题目给定格背景：极浅的抹茶底色，与纯白填空格微微区分
      fixed: '#F6F8EB',

      // 错误主色：红豆沙色！与抹茶绿是绝佳的视觉与味觉互补色
      error: '#D9685B',
      errorBg: '#FDF0EE',
      // 成功主色：抹茶绿
      success: '#729D39',
      successBg: '#F2F6E3',

      // 笔记数字色：标准抹茶绿
      note: '#729D39',
      hint: '#9ECA4C',

      // 浅分割/描边：极浅的黄绿过渡色，让小网格线几乎隐形，保持盘面干净
      border: '#E8EDCD',
      // 强分割/宫线感：使用最深的 #36622b。它扮演了类似传统黑色宫格线的角色，清晰且不刺眼
      borderStrong: '#36622B',
      boardPalaceLine: '#36622B',

      // 轻重阴影：带有抹茶清香的绿色投影
      shadow: 'rgba(114, 157, 57, 0.15)',
      shadowStrong: 'rgba(114, 157, 57, 0.25)'
    }
  },
  morningMist: {
    name: '晨雾',
    id: 'morningMist',
    icon: '🌫️', // 或 ❄️ / 💧
    description: '空山新雨，雾隐初岚',
    colors: {
      // 主品牌色：原辅色 #71c9ce (最深的青蓝色)，作为导航栏、主按钮和高亮焦点
      primary: '#71C9CE',
      // 主色浅阶：原辅色 #a6e3e9
      primaryLight: '#A6E3E9',
      // 主色深阶：在最深色基础上再下沉一点，用于按钮按下的阴影或深色边缘
      primaryDark: '#56ACB1',

      // 页面大背景：在原主色 #e3fdfd 基础上加一点白，作为最底层的薄雾
      background: '#F4FEFE',
      // 棋盘底色：纯白，确保数字清透
      boardBg: '#FFFFFF',
      // 棋盘外框：使用比 #71c9ce 稍深一阶的冷青灰，稳住轻飘飘的界面，像雾中的远山轮廓
      boardFrame: '#519C9F',
      // 卡片/面板浅底：原主色 #e3fdfd，非常淡的冰蓝色，用于底部键盘区铺底
      cardBg: '#E3FDFD',
      // 浮层块表面：纯白
      surfaceElevated: '#FFFFFF',

      // 主文案色：【关键微调】绝不能用纯黑，采用深度极高的“雾青色”，确保在浅蓝背景上对比度极高，同时保持冷色调的统一
      textDark: '#225257',
      textMedium: '#538287',
      textLight: '#8CAFB2',
      textWhite: '#FFFFFF',

      // 当前选中格：#71c9ce，雾气中最浓郁的一块水色
      selected: '#71C9CE',
      selectedText: '#FFFFFF',
      // 关联区域背景：原主色 #e3fdfd，极浅极浅的十字蓝影，不打扰视线
      related: '#E3FDFD',
      relatedText: '#225257',

      // 统计浅条底：极其淡的水色
      sameNumber: '#EBFBFC',
      // 棋盘同数字高亮底：原主色 #cbf1f5，比关联区稍深一层，层次分明
      sameDigitHighlight: '#CBF1F5',
      sameDigitHighlightText: '#183F43',
      // 棋盘同数字高亮描边：原辅色 #a6e3e9
      sameDigitRing: '#A6E3E9',

      // 题目给定格背景：在纯白上透出一丝丝冰蓝
      fixed: '#F0FAFA',

      // 错误主色：为了不破坏极度清冷的氛围，使用稍微带有冷调的雾粉色
      error: '#FF8896',
      errorBg: '#FFF2F4',
      // 成功主色：偏冷的水绿色
      success: '#5BCCB1',
      successBg: '#E8F9F5',

      // 笔记数字色：#71c9ce
      note: '#71C9CE',
      hint: '#71C9CE',

      // 浅分割/描边：用原色 #cbf1f5 做小网格线，非常柔和
      border: '#CBF1F5',
      // 强分割/宫线感：用最深的晨雾色 #71c9ce，在这个主题里它作为宫格线显得非常清透，不会有“笼子”的感觉
      borderStrong: '#71C9CE',
      boardPalaceLine: '#71C9CE',

      // 轻重阴影：冷空气般的蓝色投影
      shadow: 'rgba(113, 201, 206, 0.15)',
      shadowStrong: 'rgba(113, 201, 206, 0.3)'
    }
  },
  iceCream: {
    name: '冰激凌',
    id: 'iceCream',
    icon: '🍦',
    description: '草莓香草开心果，夏日清凉马卡龙',
    colors: {
      // 主品牌色：基于原辅色海盐蓝 #a5dee5 稍微加深一点点，保证导航栏的视觉稳定性
      primary: '#85CAD2',
      // 主色浅阶：完美复用原辅色 #a5dee5 (海盐蓝)
      primaryLight: '#A5DEE5',
      // 主色深阶：更深的海盐蓝，用于渐变深色端
      primaryDark: '#62AAB3',

      // 页面大背景：极其淡的香草黄，像融化的冰激凌汁
      background: '#FEFDF4',
      // 棋盘底色：纯白，代表打发的鲜奶油
      boardBg: '#FFFFFF',
      // 棋盘外框：使用柔和的海盐蓝，清凉且不具有压迫感
      boardFrame: '#85CAD2',
      // 卡片/面板浅底：极淡的原辅色香草黄 #fefdca，用于底部区域铺底
      cardBg: '#FEFDE8',
      // 浮层块表面：纯白
      surfaceElevated: '#FFFFFF',

      // 【关键创新】主文案色：巧克力色 (可可棕)！不仅完美解决所有马卡龙色看不清字的问题，还极其符合冰激凌主题！
      textDark: '#5C4346',
      // 次级说明：牛奶巧克力色
      textMedium: '#8A6D71',
      // 弱提示/脚注：草莓巧克力灰
      textLight: '#B8A1A4',
      // 深色底上的字：反白
      textWhite: '#FFFFFF',

      // 当前选中格：完美复用原主色 #ffcfdf (草莓粉)，极其吸睛的视觉焦点
      selected: '#FFCFDF',
      // 选中格内数字颜色：巧克力色！因为草莓粉太浅，反白字看不清，用巧克力字完美契合“草莓巧克力”
      selectedText: '#5C4346',
      
      // 关联区域背景：完美复用原主色 #fefdca (香草黄)，大面积的十字高亮，温柔护眼
      related: '#FEFDCA',
      // 关联格数字色：巧克力色
      relatedText: '#5C4346',

      // 统计浅条底：极其淡的开心果绿
      sameNumber: '#F2FCED',
      // 棋盘同数字高亮底：完美复用原辅色 #e0f9b5 (开心果绿)
      sameDigitHighlight: '#E0F9B5',
      // 同数高亮字色：深一点的抹茶棕
      sameDigitHighlightText: '#4A612A',
      // 棋盘同数字高亮描边：稍微深一点的青苹果绿，勾勒边界
      sameDigitRing: '#B4D977',

      // 题目给定格背景：在纯白上加极少的海盐蓝，微微区分
      fixed: '#F4FAFB',

      // 错误主色：西瓜红，清脆的警告色
      error: '#FF7E93',
      errorBg: '#FFF0F3',
      // 成功主色：深一点的开心果绿
      success: '#8BC25E',
      successBg: '#F2FCED',

      // 笔记数字色：海盐蓝，点缀在纯白格子里非常清新
      note: '#85CAD2',
      // 提示高亮：稍微加深的草莓粉
      hint: '#FFB1C5',

      // 浅分割/描边：非常非常淡的蓝色小网格线，几乎融化在背景里
      border: '#DDF0F2',
      // 强分割/宫线感：柔和的海盐蓝，规避了刺眼的网格牢笼感，保持盘面清透
      borderStrong: '#9ACED4',
      boardPalaceLine: '#9ACED4',

      // 轻重阴影：海盐蓝的清凉投影
      shadow: 'rgba(165, 222, 229, 0.25)',
      shadowStrong: 'rgba(165, 222, 229, 0.4)'
    }
  },
  royalBlueGold: {
    name: '黄蓝打架',
    id: 'royalBlueGold',
    icon: '👑',
    description: '调得最累的一个主题色，累到不知道怎么介绍',
    colors: {
      // 保持优秀的顶部与按钮主色
      primary: '#1237A1',
      primaryLight: '#1873D3',
      primaryDark: '#00017A',

      // 页面大背景：极深的暗夜色
      background: '#030614',
      
      // 【核心调优 1：丝绒质感的底板】
      // 将棋盘底色从纯蓝稍微提亮一点点（#08133D），给更暗的线条留出空间
      boardBg: '#08133D',
      // 固定格：比底色再亮一个阶梯（#0D1C52），形成高级的隐约交错感，不再是死板的一整块
      fixed: '#0D1C52',
      
      // 卡片/面板：键盘区底板
      cardBg: '#050A24',
      surfaceElevated: '#1237A1',

      textDark: '#FFFFFF',
      textMedium: '#8AAEE0',
      textLight: '#4B88D6',
      textWhite: '#00017A',

      // 黄金交互焦点保持不变（极佳的冲击力）
      selected: '#FFB900',
      selectedText: '#00017A', 
      
      // 关联区域（十字架）：在丝绒底板上微微亮起的宝蓝
      related: '#163A99',
      relatedText: '#FFFFFF',

      sameNumber: '#1237A1',
      
      sameDigitHighlight: '#FFDE00',
      sameDigitHighlightText: '#00017A',
      sameDigitRing: '#FFB900', 

      // 错误与成功
      error: '#FF3B30',
      errorBg: '#4A000A',
      success: '#34C759',
      successBg: '#003311',

      note: '#FFDE00',
      hint: '#FFB900',

      // 【核心调优 2：沉降的骨架】彻底消灭发光的亮蓝线条！
      // 浅分割/描边：使用比格子底色稍微深/或微亮的暗蓝（#14296B），让小网格线刚好可见，但不刺眼
      border: '#14296B',
      
      // 强分割/宫线与外框：使用极其深邃的“极夜蓝/接近黑色”（#02040D）！！！
      // 这一步是灵魂。深暗色的粗线不仅能完美分割九宫格，还能像阴影一样沉入屏幕底端，
      // 让深蓝色的格子和金黄色的高亮像磁贴一样“悬浮”在屏幕表面。
      boardFrame: '#02040D',
      borderStrong: '#02040D',
      boardPalaceLine: '#02040D',

      // 阴影
      shadow: 'rgba(0, 0, 0, 0.6)',
      shadowStrong: 'rgba(0, 0, 0, 0.9)' 
    }
  },
  greenGrassland: {
    name: '四叶草',
    id: 'greenGrassland',
    icon: '🍀', // 也可以用 🍀
    description: '喜欢绿色，所以多调了一个',
    colors: {
      // 主品牌色：原主色1 #1fab89 (深薄荷/森绿)，作为全局的锚点，沉稳且清晰
      primary: '#1FAB89',
      // 主色浅阶：原主色2 #62d2a2 (青草绿)
      primaryLight: '#62D2A2',
      // 主色深阶：稍微加深的原主色1，用于按钮按下状态
      primaryDark: '#147A61',

      // 页面大背景：极其微弱的绿白，让眼睛彻底放松
      background: '#F2FCF7',
      // 棋盘底色：纯白。保留白色底板，让清新的绿色更加通透
      boardBg: '#FFFFFF',
      // 棋盘外框：使用最深的 #1fab89 框住盘面，像用树枝圈起一片草地
      boardFrame: '#1FAB89',
      
      cardBg: '#FFFFFF',
      surfaceElevated: '#FFFFFF',

      // 主文案色：极其深邃的墨绿色（而不是纯黑），保持整个主题的绿色基因纯正
      textDark: '#0B4D3D',
      // 次级说明：树叶的深绿
      textMedium: '#2B7A63',
      textLight: '#6B9E8E',
      textWhite: '#FFFFFF',

      // 【完美映射交互 1】当前选中格：原主色1 #1fab89。最深的绿作为视觉绝对中心
      selected: '#1FAB89',
      selectedText: '#FFFFFF', 
      
      // 【完美映射交互 2】关联区域（十字架）：原辅色2 #d7fbe8 (极浅薄荷)。
      // 铺在最底层，大面积出现时极其温柔，绝对不抢视线
      related: '#D7FBE8',
      relatedText: '#0B4D3D',

      // 统计浅条底：微弱的草绿底色
      sameNumber: '#E8FBF1',
      
      // 【完美映射交互 3】棋盘同数字高亮底：原辅色1 #9df3c4 (浅青绿)
      sameDigitHighlight: '#9DF3C4',
      sameDigitHighlightText: '#0B4D3D',
      // 棋盘同数字高亮描边：原主色2 #62d2a2。用深一阶的绿色勾边，让同数字像叶子一样浮现出来
      sameDigitRing: '#62D2A2', 

      // 固定格：带有一点点原辅色2的极淡底色，自然区分
      fixed: '#F6FCF9',

      // 错误主色：在薄荷绿的盘面里，用柔和的“西瓜红”做报错，红绿搭配显得清脆可爱
      error: '#FF6B6B',
      errorBg: '#FFF0F0',
      success: '#1FAB89',
      successBg: '#D7FBE8',

      note: '#62D2A2',
      hint: '#1FAB89',

      // 【骨架与分割线】
      // 浅分割/描边：复用最浅的辅色 #d7fbe8。让普通小网格线几乎融入白底，极其清透无压迫感
      border: '#D7FBE8',
      // 强分割/宫线感：复用最深的 #1fab89。粗线条撑起九宫格结构，清晰有力
      borderStrong: '#1FAB89',
      boardPalaceLine: '#1FAB89',

      // 阴影：带有一点森林气息的绿色投影
      shadow: 'rgba(31, 171, 137, 0.15)',
      shadowStrong: 'rgba(31, 171, 137, 0.3)' 
    }
  },
  witchForest: {
    name: '女巫森林',
    id: 'witchForest',
    icon: '🔮', // 也可以用 🌲 或 🧙‍♀️
    description: '幽暗密林深处，女巫在调制魔法药水',
    colors: {
      // 主品牌色：原色卡 #086972 (深邃青)，作为导航栏和主按钮的底色，神秘且幽暗
      primary: '#086972',
      primaryLight: '#118C96',
      primaryDark: '#04444A',

      // 页面大背景：比原色卡 #071a52 更深一点的深渊蓝夜空
      background: '#040E2D',
      // 棋盘底色：原色卡 #071a52 (幽暗深蓝)，构成整片女巫森林的暗黑底板
      boardBg: '#071A52',
      // 棋盘外框：极黑的蓝，像深夜里密不透风的参天大树
      boardFrame: '#030B22',
      
      // 卡片/面板：底部键盘区底色
      cardBg: '#071A52',
      // 浮层按钮表面：键盘按键微微浮起的青色
      surfaceElevated: '#0A2563',

      // 【发光符文】主文案色：暗黑底色上，玩家填入的数字不能用死白。
      // 我们用极其淡的“月光薄荷绿”，让普通数字也带有一丝魔法气息，且对比度极佳
      textDark: '#D4F9E3',
      // 次级说明：幽暗的青绿色
      textMedium: '#5C9A9E',
      textLight: '#3D727A',
      // 深色底上的字：反白或暗蓝
      textWhite: '#FFFFFF',

      // 【魔法爆发 1】当前选中格：原色卡最亮的 #a7ff83 (荧光魔法绿)！
      // 它是整个屏幕里最耀眼的光源，就像女巫坩埚里沸腾的药水顶端
      selected: '#A7FF83',
      // 选中文字：幽暗深蓝。在荧光绿底上极其锐利
      selectedText: '#071A52', 
      
      // 关联区域（十字架）：原色卡 #086972 (深邃青)。
      // 在深蓝的底色上，十字区会泛起一层幽幽的青光，非常迷人
      related: '#086972',
      // 关联区字色：用最亮的荧光绿，形成高级的悬浮发光感
      relatedText: '#A7FF83',

      // 统计浅条底：幽暗的青色底
      sameNumber: '#086972',
      
      // 【魔法爆发 2】棋盘同数字高亮底：原色卡 #17b978 (翡翠毒绿)！
      // 它比选中格稍微暗一阶，在盘面上亮起时，像是一串串发光的绿色藤蔓
      sameDigitHighlight: '#17B978',
      sameDigitHighlightText: '#040E2D',
      // 棋盘同数字高亮描边：用最亮的荧光绿 #a7ff83 勾边，制造“外发光”错觉
      sameDigitRing: '#A7FF83', 

      // 固定格：比幽暗深蓝底色稍微深沉一点的夜色，代表远古存在的树桩
      fixed: '#061440',

      // 错误主色：在绿蓝魔法森林里，用“剧毒紫红”来报错，极具奇幻感
      error: '#FF2A6D',
      errorBg: '#3D0A22',
      // 成功主色：荧光魔法绿
      success: '#A7FF83',
      successBg: '#143D32',

      // 笔记数字色：最亮的荧光绿 #a7ff83
      note: '#A7FF83',
      hint: '#A7FF83',

      // 【沉睡的骨架】
      // 浅分割/描边：极暗的青蓝色（#0B2F6E），让小网格线刚好可见，但不发光
      border: '#0B2B63',
      // 强分割/宫线感：极黑蓝 #030B22，让九宫格骨架深深沉入背景，杜绝“霓虹牢笼效应”
      borderStrong: '#030B22',
      boardPalaceLine: '#030B22',

      // 阴影：普通的暗夜阴影
      shadow: 'rgba(0, 0, 0, 0.6)',
      // 【彩蛋】重阴影：荧光绿色的魔法光晕！用在按键或卡片上会微微泛出绿光
      shadowStrong: 'rgba(167, 255, 131, 0.25)' 
    }
  },
  tasteOfSummer: {
    name: '夏天的味道',
    id: 'tasteOfSummer',
    icon: '🍉',
    description: '夏天最期待的就是大口吃冰镇西瓜了',
    colors: {
      // 保持最鲜艳的西瓜红
      primary: '#FE7171',
      primaryLight: '#FFB0B0',
      primaryDark: '#D94545',

      background: '#F6FCF4',
      boardBg: '#FFFFFF',
      // 深墨绿西瓜皮骨架
      boardFrame: '#335D2D',
      
      cardBg: '#FFFFFF',
      surfaceElevated: '#FFFFFF',

      // 西瓜籽（全局数字颜色）
      textDark: '#335D2D',
      textMedium: '#5A7D54',
      textLight: '#8BA686',
      textWhite: '#FFFFFF',

      // 最甜的红瓤心
      selected: '#FE7171',
      selectedText: '#FFFFFF', 
      
      // 【灵魂归位】关联区域：恢复原本浓郁的粉红色 #FFB0B0！
      // 大面积的粉红果肉，才是西瓜该有的样子。
      related: '#FFB0B0',
      relatedText: '#335D2D', 

      sameNumber: '#FFF0F0',
      
      // 【核心解药】棋盘同数字高亮底：恢复你最喜欢的浅草绿 #7EA04D！
      sameDigitHighlight: '#7EA04D',
      // 【神来之笔】：把这里的文字强制设为纯白（#FFFFFF）！！！
      // 纯白字压在草绿底上，瞬间除去了之前“发脏发闷”的青苔感，让它变得像清脆的翠衣/薄荷糖一样干净、通透、立体！
      sameDigitHighlightText: '#FFFFFF',
      // 用深绿加一圈描边，把绿色的格子框起来，显得极其精致
      sameDigitRing: '#335D2D', 

      // 固定格：极淡的灰白，把舞台彻底让给红和绿
      fixed: '#F8FBF6',

      error: '#D32F2F',
      errorBg: '#FDECEA',
      success: '#7EA04D',
      successBg: '#F0F7EB',

      note: '#FE7171',
      hint: '#7EA04D',

      // 骨架与分割线保持深邃的绿色，稳住鲜艳的红绿跳动
      border: '#E2EBDD',
      borderStrong: '#335D2D',
      boardPalaceLine: '#335D2D',

      shadow: 'rgba(254, 113, 113, 0.25)',
      shadowStrong: 'rgba(254, 113, 113, 0.4)' 
    }
  },
  redGrapefruit: {
    name: '红柚',
    id: 'redGrapefruit',
    icon: '🍊',
    description: '做这个配色单纯是因为想吃红柚了',
    colors: {
      // 保持鲜艳的主色调
      primary: '#F12B6B',
      primaryLight: '#FF467E',
      primaryDark: '#C21E53',

      background: '#FFF6F7',
      boardBg: '#FFFFFF',
      boardFrame: '#7A1A3A',
      
      cardBg: '#FFFFFF',
      surfaceElevated: '#FFFFFF',

      textDark: '#4A0E22',
      textMedium: '#8A3A54',
      textLight: '#B86F86',
      textWhite: '#FFFFFF',

      // 绝对焦点：红柚色心
      selected: '#F12B6B',
      selectedText: '#FFFFFF', 
      
      // 【核心优化 1：冰透十字区】
      // 将之前的浅粉色极度稀释成“微透粉白 (#FBE8EC)”。
      // 它现在只是一抹极其温柔的底晕，再也不会抢走白色棋盘的空间，盘面瞬间清爽 10 倍！
      related: '#FBE8EC',
      relatedText: '#4A0E22',

      sameNumber: '#FFF0F2',
      
      // 【核心优化 2：爆汁果肉】
      // 放弃容易发糊的“浅粉底+暗红字”，直接使用原色卡极其亮眼的 #FF467E (亮粉红)！
      sameDigitHighlight: '#FF467E',
      // 配上纯白色的数字，这些高亮格会像一块块晶莹剔透的红柚果肉一样，在盘面上闪闪发光
      sameDigitHighlightText: '#FFFFFF',
      sameDigitRing: '#F12B6B', 

      fixed: '#FDF0F3',

      // 【核心优化 3：极高对比度的报错】
      // 在粉色海洋中，普通的红色报错是隐形的。
      // 我们改用极度刺眼的“深血红 / 殷红色 (#A30014)”。它极其暗沉、锐利，只要填错，一眼就能发现！
      error: '#A30014',
      errorBg: '#FAD2D6',
      
      // 成功色保持清脆的绿，红绿对比极其惊艳
      success: '#4CAF50',
      successBg: '#E8F5E9',

      note: '#FF467E',
      hint: '#F12B6B',

      // 【软化网格】
      // 把普通的小网格线也稍微调淡一点点 (#F8DCE2)，让盘面显得更干净
      border: '#F8DCE2',
      borderStrong: '#7A1A3A',
      boardPalaceLine: '#7A1A3A',

      shadow: 'rgba(241, 43, 107, 0.15)',
      shadowStrong: 'rgba(241, 43, 107, 0.3)' 
    }
  }
};


// 默认主题：取 THEMES 中声明的第一个键（书写顺序），增删主题时无需再改此处
const THEME_IDS_ORDERED = Object.keys(THEMES);
const DEFAULT_THEME = THEME_IDS_ORDERED[0] || 'mintBreeze';

/**
 * 主题色兜底：旧数据或自定义主题若缺键，在此补默认（语义见 mintBreeze 内注释；缺省不挪用 sameNumber 作棋盘同数底）。surfaceElevated 缺省时回退为 cardBg；boardPalaceLine 缺省时回退为 borderStrong。
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
  if (!out.surfaceElevated) {
    out.surfaceElevated = out.cardBg || '#ffffff';
  }
  if (!out.boardPalaceLine) {
    out.boardPalaceLine = out.borderStrong || '#1a202c';
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

