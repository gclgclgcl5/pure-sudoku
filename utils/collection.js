// 收集图鉴静态数据（后续可接成就/解锁系统）
const COLLECTION_ITEMS = [
  // === 第一章：落笔填数（抉择与行动） ===
  { id: 'ink', emoji: '🖊️', name: '落笔', desc: '落下的那一刻，世界就多了一份确定。' },
  { id: 'eraser', emoji: '🧹', name: '擦除', desc: '清零不可惜，每一次擦去，都是在靠近对的答案。' },
  { id: 'memo', emoji: '📝', name: '笔记', desc: '哪怕只缩小了一点范围，也是了不起的靠近。' },
  { id: 'sole', emoji: '1️⃣', name: '唯一', desc: '别犹豫，当全世界都为你让路时，只管走。' },
  { id: 'exclude', emoji: '🚫', name: '排除', desc: '划掉不想要的，真正的渴望自然会浮现。' },
  { id: 'assume', emoji: '🎲', name: '假设', desc: '试错也是一种前进，大不了推倒重来。' },
  { id: 'check', emoji: '🔍', name: '验证', desc: '对答案不用怕，对得上是惊喜，对不上是阅历。' },
  { id: 'chain', emoji: '🔗', name: '连锁', desc: '牵一发而动全身，微小的改变也能掀起蝴蝶效应。' },
  { id: 'final', emoji: '🔓', name: '终局', desc: '最后一块拼图归位，咔哒一声，一切刚好。' },

  // === 第二章：心流起伏（思绪与状态） ===
  { id: 'daze', emoji: '😶', name: '发呆', desc: '放空也没关系，大脑正在后台悄悄整理人生的线索。' },
  { id: 'eureka', emoji: '💡', name: '顿悟', desc: '叮！那根搭错的线突然接上了，满眼都是小星星。' },
  { id: 'tangle', emoji: '🧶', name: '纠结', desc: '选A还是B？先迈出那一步，路自然就出来了。' },
  { id: 'calm', emoji: '🧘', name: '平静', desc: '听见自己呼吸的时刻，周遭万物都变得温柔。' },
  { id: 'nap', emoji: '💤', name: '小憩', desc: '闭眼三分钟，再睁眼时，转机也许就在那里等你。' },
  { id: 'instinct', emoji: '🦉', name: '直觉', desc: '说不清为什么，但心就是往那走，信它！' },
  { id: 'focus', emoji: '👁️', name: '专注', desc: '世界退潮了，此刻只有你和当下的自己。' },
  { id: 'thrill', emoji: '🎢', name: '惊险', desc: '差点出错的瞬间，心跳加速，比过山车还上头。' },
  { id: 'relief', emoji: '😮', name: '释然', desc: '算了，不钻牛角尖，换个方向说不定就豁然开朗。' },

  // === 第三章：人间时辰（日常的锚点） ===
  { id: 'morning', emoji: '☕', name: '晨光', desc: '刚睡醒的清晨，最适合做几个确定的决定来开机。' },
  { id: 'commute', emoji: '🚇', name: '通勤', desc: '摇晃的车厢里，内心的秩序是你最稳的锚点。' },
  { id: 'coffee', emoji: '🍵', name: '咖啡', desc: '咽下一口苦涩，迎来一丝回甘，生活需要这种对冲。' },
  { id: 'wait', emoji: '⏳', name: '等待', desc: '等待太漫长？没关系，属于自己的时间永远不算浪费。' },
  { id: 'evening', emoji: '🎈', name: '晚风', desc: '吹散白天的喧嚣，留下清爽的灵魂。' },
  { id: 'midnight', emoji: '🦉', name: '深夜', desc: '万物沉睡，你的思绪却在暗夜里跳着踢踏舞。' },
  { id: 'weekend', emoji: '🛋️', name: '周末', desc: '不设闹钟的早晨，连发呆都带着伸懒腰的节奏。' },
  { id: 'fragment', emoji: '⏱️', name: '碎片', desc: '等电梯的三分钟，也够拼凑一个微小的梦想。' },

  // === 第四章：四季流转（自然的启示） ===
  { id: 'spring', emoji: '🌱', name: '春雨', desc: '淅淅沥沥，慢慢洗去多余的干扰，留下本心。' },
  { id: 'summer', emoji: '🎐', name: '夏风', desc: '掠过耳畔的凉意，把纠结的思绪也吹通透了。' },
  { id: 'autumn', emoji: '🍁', name: '秋叶', desc: '落叶不是结束，只是给新生的希望腾出空位。' },
  { id: 'winter', emoji: '❄️', name: '冬雪', desc: '白茫茫一片真干净，正好是从头再来的绝佳借口。' },
  { id: 'dew', emoji: '💧', name: '晨露', desc: '一点微小的光亮，足以折射出整个世界的温柔。' },
  { id: 'rainbow', emoji: '🌈', name: '彩虹', desc: '久违的顿悟，总是和雨后天晴一样绚烂。' },
  { id: 'breeze', emoji: '🍃', name: '微风', desc: '不用太用力，顺其自然，该来的总会来。' },
  { id: 'sky', emoji: '☁️', name: '云朵', desc: '抬头看看，再大的烦恼，在天际也不过一粒尘埃。' },
  { id: 'tide', emoji: '🌀', name: '潮汐', desc: '有进有退才是常态，走不通时退一步亦是向前。' },

  // === 第五章：生活小确幸（物件的陪伴） ===
  { id: 'cat', emoji: '🐈', name: '猫咪', desc: '不经意打乱的计划，也许正是生活给的小插曲。' },
  { id: 'headphone', emoji: '🎧', name: '耳机', desc: '戴上它，整个世界只剩我和我的内心。' },
  { id: 'sofa', emoji: '🛋️', name: '沙发', desc: '陷进柔软里，让疲惫的灵魂重新长出骨骼。' },
  { id: 'plant', emoji: '🌵', name: '盆栽', desc: '每天浇一点水，多一点耐心，总能枝繁叶茂。' },
  { id: 'pillow', emoji: '🧸', name: '抱枕', desc: '遇到死胡同时，先抱抱自己，别跟自己较劲。' },
  { id: 'lamp', emoji: '🏮', name: '台灯', desc: '黑暗里的一小圈光晕，照亮眼前的路就够。' },
  { id: 'envelope', emoji: '✉️', name: '信封', desc: '拆开未知的盲盒，就像收到远方寄来的期许。' },
  { id: 'key', emoji: '🗝️', name: '钥匙', desc: '恰好转对角度，咔嗒，紧闭的心门应声而开。' },
  { id: 'tape', emoji: '🩹', name: '胶带', desc: '修补裂痕的痕迹，不怕撕扯，残缺也是勋章。' },

  // === 第六章：存在哲学（抽象与隐喻） ===
  { id: 'zero', emoji: '⭕', name: '留白', desc: '看似一无所有，但留白本身便蕴含着无限可能。' },
  { id: 'one', emoji: '☝️', name: '起点', desc: '万物之始，第一步总是最难的，也最珍贵。' },
  { id: 'nine', emoji: '🔮', name: '圆满', desc: '走到终点才发现，圆满不过是下一段旅程的序章。' },
  { id: 'odd', emoji: '♧', name: '奇数', desc: '倔强地站在偶数之间，保持特立独行的节奏。' },
  { id: 'even', emoji: '♢', name: '偶数', desc: '稳稳当当的底座，不张扬，却是不可或缺的支撑。' },
  { id: 'order', emoji: '📶', name: '顺序', desc: '别急，按照自己的节奏来，每个人都有属于自己的位置。' },
  { id: 'reverse', emoji: '↩️', name: '逆序', desc: '换个角度看看？有时候终点，恰恰是新的起点。' },
  { id: 'repeat', emoji: '🔄', name: '重复', desc: '生活总是循环往复，但每一次的心境都已不同。' },
  { id: 'missing', emoji: '🧩', name: '缺失', desc: '正因为有遗憾，才有我们去追寻的意义。' },

  // === 第七章：人际羁绊（社交与独处） ===
  { id: 'alone', emoji: '🧍', name: '独处', desc: '一个人也不孤单，内心的声音是最默契的舞伴。' },
  { id: 'tacit', emoji: '🤝', name: '默契', desc: '不用说话，懂你的人自然懂你的珍贵。' },
  { id: 'rival', emoji: '🤺', name: '对手', desc: '那个比你快一步的人，也是推着你奔跑的风。' },
  { id: 'guide', emoji: '🧭', name: '指引', desc: '偶尔接受帮助不丢人，那是学会了温柔地借力。' },
  { id: 'share', emoji: '🔗', name: '分享', desc: '心头一热的欢喜，总想第一时间告诉全世界。' },
  { id: 'accompany', emoji: '👫', name: '陪伴', desc: '你在做你自己，我在看着你，时间就很有意义。' },
  { id: 'miss', emoji: '💨', name: '错过', desc: '错过了也没关系，对的人总会再重逢。' },
  { id: 'reunion', emoji: '🎉', name: '重逢', desc: '曾经百思不解的困惑，换个时间忽然就释怀了。' },
  { id: 'crowd', emoji: '👯', name: '群像', desc: '每个看似孤独的个体，都在世界里寻找同频的派对。' },

  // === 第八章：成长轨迹（蜕变与回望） ===
  { id: 'newbie', emoji: '🐣', name: '新手', desc: '慢慢来，谁不是从跌跌撞撞开始的呢？' },
  { id: 'upgrade', emoji: '⬆️', name: '进阶', desc: '技能树点亮！生活的套路，你已经渐渐看穿。' },
  { id: 'record', emoji: '🥇', name: '破纪录', desc: '打败昨天的自己，是人生里唯一的通关秘籍。' },
  { id: 'streak', emoji: '🔥', name: '连胜', desc: '乘胜追击！手感热得发烫，好运都在向你靠拢。' },
  { id: 'comeback', emoji: '🚀', name: '逆风', desc: '开局烂透了，但硬是靠韧性盘活了全场！' },
  { id: 'reset', emoji: '♻️', name: '归零', desc: '清空重来的勇气，比一次成功更酷。' },
  { id: 'habit', emoji: '📅', name: '习惯', desc: '每天前进一点，不知不觉，坚持就成了本能。' },
  { id: 'break', emoji: '🧱', name: '突破', desc: '瓶颈期突然碎裂，感觉灵魂都跟着轻盈了。' },
  { id: 'master', emoji: '👑', name: '大师', desc: '不再被规则束缚，你已经在享受创造规则的乐趣。' },

  // === 第九章：宇宙想象（浪漫与远方） ===
  { id: 'orbit', emoji: '🪐', name: '星轨', desc: '万物沿着轨迹运行，而你拥有属于自己的引力。' },
  { id: 'aurora', emoji: '🌌', name: '极光', desc: '极寒之地生出的奇迹，像极了绝境里的那道光。' },
  { id: 'route', emoji: '🗺️', name: '航线', desc: '迷局再复杂，也总有一条航线通往彼岸。' },
  { id: 'hole', emoji: '🕳️', name: '黑洞', desc: '看似吞噬一切，走进去才发现藏着折叠的时空。' },
  { id: 'meteor', emoji: '☄️', name: '陨石', desc: '毫无预兆地砸中心房，这就是天降的灵感。' },
  { id: 'dimension', emoji: '🔮', name: '维度', desc: '跳出单线的思维，在转角处看见多维的宇宙。' },
  { id: 'pulse', emoji: '📡', name: '脉冲', desc: '叮、叮、叮，那是心跳与宇宙同频共振的电波。' },
  { id: 'compass', emoji: '🧭', name: '罗盘', desc: '找不到北的时候，相信内心的磁针。' },
  { id: 'era', emoji: '🌠', name: '纪元', desc: '当最后一块拼图归位，一个新宇宙的纪元就此诞生。' },

  // === 第十章：城市漫游（街头巷尾的灵感） ===
  { id: 'cafe', emoji: '☕', name: '咖啡馆', desc: '偶尔也需要点外挂，咽下苦涩，思路就甜了。' },
  { id: 'signal', emoji: '🚦', name: '红绿灯', desc: '停一停没关系，等绿灯亮起再冲刺也不迟。' },
  { id: 'subway', emoji: '🚇', name: '地铁', desc: '穿梭在地下的孤独，是通向目的地的必经之路。' },
  { id: 'bench', emoji: '🪑', name: '长椅', desc: '坐下来看风景的人，也成了别人眼里的风景。' },
  { id: 'neon', emoji: '🌃', name: '霓虹', desc: '迷路也没事，最亮的地方就是方向。' },
  { id: 'graffiti', emoji: '🎨', name: '涂鸦', desc: '规矩之外的一抹色彩，是生活给你的小惊喜。' },
  { id: 'crossing', emoji: '🦓', name: '斑马线', desc: '横冲直撞不如按部就班，条条大路通对岸。' },
  { id: 'umbrella', emoji: '☂️', name: '雨伞', desc: '撑开属于自己的结界，风雨就只是背景音。' },
  { id: 'mailbox', emoji: '📮', name: '邮筒', desc: '把心事投递出去，总会有回音的。' },

  // === 第十一章：食物与慰藉（吃进去的哲理） ===
  { id: 'bread', emoji: '🥐', name: '面包', desc: '揉捏百遍才松软，好结果都值得等一等。' },
  { id: 'hotpot', emoji: '🍲', name: '火锅', desc: '沸腾的不仅是汤底，还有对生活滚烫的热爱。' },
  { id: 'dessert', emoji: '🍰', name: '甜品', desc: '给大脑一点糖分，它就会乖乖听话。' },
  { id: 'tea', emoji: '🍵', name: '清茶', desc: '沉浮之间才出味，人生也是，急不得。' },
  { id: 'noodle', emoji: '🍜', name: '泡面', desc: '三分钟的奇迹，偶尔速成一下也未尝不可。' },
  { id: 'cherry', emoji: '🍒', name: '樱桃', desc: '一口一个的小确幸，藏在生活缝隙里。' },
  { id: 'ice', emoji: '🧊', name: '冰块', desc: '降降温，清醒的头脑才能看清下一步。' },
  { id: 'bbq', emoji: '🥩', name: '烤肉', desc: '嘶嘶作响的焦虑，吃进肚子里就是能量。' },
  { id: 'spoon', emoji: '🥄', name: '汤匙', desc: '慢慢来，一口一口总能见底。' },

  // === 第十二章：手作与艺术（创造的专注） ===
  { id: 'brush', emoji: '🖌️', name: '画笔', desc: '哪怕只是一根线条，也是你独一无二的起手式。' },
  { id: 'palette', emoji: '🎨', name: '调色盘', desc: '混乱交融后，才会诞生新的奇迹。' },
  { id: 'knit', emoji: '🧶', name: '毛线', desc: '错了一针就拆掉重来，生活允许你返工。' },
  { id: 'clay', emoji: '🏺', name: '陶土', desc: '揉圆搓扁，你捏造的形状就是最好的形状。' },
  { id: 'camera', emoji: '📷', name: '相机', desc: '对焦当下的美好，模糊掉那些烦心事。' },
  { id: 'note', emoji: '🎵', name: '音符', desc: '休止符不是停顿，是为了下一个音更响亮。' },
  { id: 'sponge', emoji: '🧽', name: '海绵', desc: '擦得干干净净，给自己一张白纸的权利。' },
  { id: 'scissors', emoji: '✂️', name: '剪刀', desc: '果断剪断纠缠，也是一种高级的断舍离。' },
  { id: 'collage', emoji: '🧩', name: '拼贴', desc: '碎片也能拼成画，不完美也很艺术。' },

  // === 第十三章：梦境与潜意识（天马行空的内心） ===
  { id: 'maze', emoji: '🏰', name: '迷宫', desc: '迷路是常态，每条死胡同都在教你回头。' },
  { id: 'shadow', emoji: '👥', name: '影子', desc: '就算被拉得很长，你依然是那个实心的人。' },
  { id: 'dreamcatcher', emoji: '🕸️', name: '捕梦网', desc: '过滤掉噩梦，只留下闪闪发光的灵感。' },
  { id: 'telescope', emoji: '🔭', name: '望远镜', desc: '看远一点，眼前的烦恼不过是芝麻大点。' },
  { id: 'balloon', emoji: '🎈', name: '气球', desc: '放飞执念，也许心会变得更轻。' },
  { id: 'blindbox', emoji: '🎁', name: '盲盒', desc: '未知的惊喜，拆开那一刻才是高潮。' },
  { id: 'origami', emoji: '🦢', name: '折纸', desc: '平面的纸张也能生出双翼，别低估可塑性。' },

  // === 第十四章：微观世界（小事物的力量） ===
  { id: 'ant', emoji: '🐜', name: '蚂蚁', desc: '搬运一点点，再一点点，总能搬走大山。' },
  { id: 'dew', emoji: '💧', name: '露珠', desc: '藏在叶尖的微小，折射着整个早晨的太阳。' },
  { id: 'mushroom', emoji: '🍄', name: '蘑菇', desc: '默默在暗处长成伞，给路过的你遮一遮雨。' },
  { id: 'clip', emoji: '📎', name: '回形针', desc: '弯弯绕绕，总能把乱七八糟的心事夹紧。' },
  { id: 'dust', emoji: '🌀', name: '尘埃', desc: '哪怕微不足道，也在阳光里跳着舞呢。' },
  { id: 'cog', emoji: '⚙️', name: '齿轮', desc: '你不需要推动全局，转好自己这环就好。' },
  { id: 'firefly', emoji: '✨', name: '萤火', desc: '一点点微光，在黑夜里就是一座灯塔。' },
  { id: 'moss', emoji: '🌿', name: '苔藓', desc: '不争不抢，在角落里长出自己的绿洲。' },

  // === 第十五章：节日与仪式感（生活的锚点） ===
  { id: 'candle', emoji: '🕯️', name: '蜡烛', desc: '燃烧自己照亮角落，今晚你是自己的主角。' },
  { id: 'gift', emoji: '🎀', name: '礼物', desc: '拆开包装的过程，比结果更让人心跳加速。' },
  { id: 'firework', emoji: '🎆', name: '烟花', desc: '绽放一瞬，也足够惊艳那片夜空。' },
  { id: 'bell', emoji: '🔕', name: '钟声', desc: '倒计时结束，意味着新的开始正式上线。' },
  { id: 'confetti', emoji: '🎊', name: '彩带', desc: '把平淡的日子，抛洒出节日的氛围。' },
  { id: 'lucky', emoji: '🧧', name: '红包', desc: '塞满好运，送给自己一个兜底的底气。' },
  { id: 'greeting', emoji: '💌', name: '贺卡', desc: '给未来的自己写一句：你辛苦啦，你很棒。' },
  { id: 'wish', emoji: '💫', name: '许愿', desc: '闭上眼，宇宙会偷偷帮你实现的。' },

  // === 第十六章：情绪调色盘（接纳所有状态） ===
  { id: 'angry', emoji: '😤', name: '怄气', desc: '别跟世界较劲，更别跟自己较劲。' },
  { id: 'relief', emoji: '😌', name: '释怀', desc: '算了，放过那个执念，也放过那个自己。' },
  { id: 'hope', emoji: '🌟', name: '期待', desc: '下一秒也许就顺了，这种直觉往往很准。' },
  { id: 'pity', emoji: '🥀', name: '遗憾', desc: '错过的就错过，总会有别的惊喜在等你。' },
  { id: 'joy', emoji: '🦋', name: '雀跃', desc: '心里扑通扑通，那一刻全世界都在放烟花。' },
  { id: 'fog', emoji: '🌫️', name: '迷茫', desc: '漫天大雾也没事，往前走一步就清晰一步。' },
  { id: 'stubborn', emoji: '🧗', name: '倔强', desc: '偏不信这个邪，非要试出来，这就是你的超能力。' },
  { id: 'lazy', emoji: '🛁', name: '慵懒', desc: '泡在热水里，让思路自己浮上来。' },
  { id: 'brave', emoji: '🦁', name: '勇敢', desc: '深呼吸，迈出去，即使错了也错得轰轰烈烈。' },

   // === 第十七章：旅途拾遗（探索与经历） ===
   { id: 'backpack', emoji: '🎒', name: '背包', desc: '装上勇气和饼干，随时可以出发。' },
   { id: 'suitcase', emoji: '🧳', name: '行李箱', desc: '把沉重的过去装进去，拖着它走向轻盈。' },
   { id: 'ticket', emoji: '🎫', name: '车票', desc: '检票上车的瞬间，旧日子就留在站台了。' },
   { id: 'tent', emoji: '🏕️', name: '帐篷', desc: '给自己搭个临时避难所，歇够了再赶路。' },
   { id: 'bicycle', emoji: '🚲', name: '单车', desc: '不追求速度，迎着风，自己掌握方向。' },
   { id: 'railway', emoji: '🛤️', name: '铁轨', desc: '哪怕只能顺着走，窗外的风景也是独一份的。' },
   { id: 'island', emoji: '🏝️', name: '孤岛', desc: '偶尔与世界断联，也是给自己充电的方式。' },
   { id: 'pin', emoji: '📍', name: '定位', desc: '无论走到哪，别忘了最初的坐标。' },
   { id: 'sail', emoji: '🚢', name: '帆船', desc: '顺风逆风都是风，只要不抛锚，总会靠岸。' },
 
   // === 第十八章：光影交错（昼夜与明暗） ===
   { id: 'dusk', emoji: '🌇', name: '黄昏', desc: '不是结束，是给忙碌一天的体面退场。' },
   { id: 'gibbous', emoji: '🌖', name: '凸月', desc: '不圆满才是常态，缺憾里自有温柔。' },
   { id: 'torch', emoji: '🔦', name: '手电筒', desc: '照不亮全程没关系，看清脚下这一步就行。' },
   { id: 'sun', emoji: '☀️', name: '烈日', desc: '躲不过的炙烤，就当是给灵魂杀菌。' },
   { id: 'newmoon', emoji: '🌑', name: '新月', desc: '哪怕完全隐没，也知道它会在某刻亮起。' },
   { id: 'oillamp', emoji: '🪔', name: '油灯', desc: '添点油捻子，微弱的光也能熬过长夜。' },
   { id: 'sparkler', emoji: '🎇', name: '烟火', desc: '短暂的绚烂，足够定格一辈子的惊艳。' },
   { id: 'cloudy', emoji: '🌥️', name: '多云', desc: '遮不住阳光，只是让它变得更柔和了些。' },
 
   // === 第十九章：植物物语（坚韧与生长） ===
   { id: 'sunflower', emoji: '🌻', name: '向日葵', desc: '不抬头也没事，低头也能看到自己的影子。' },
   { id: 'clover', emoji: '🍀', name: '四叶草', desc: '运气不是等来的，是你在寻找的过程中遇见的。' },
   { id: 'hibiscus', emoji: '🌺', name: '芙蓉', desc: '开得热烈不丢人，安静地绽放也是一种勇敢。' },
   { id: 'wheat', emoji: '🌾', name: '麦穗', desc: '越饱满越低头，谦逊是成熟的副产品。' },
   { id: 'cherry', emoji: '🌸', name: '樱花', desc: '花期短暂，但看花的人会记住整个春天。' },
 
   // === 第二十章：器物之理（日常的哲学） ===
   { id: 'padlock', emoji: '🔒', name: '挂锁', desc: '把烦心事锁起来，密码只有你自己知道。' },
   { id: 'magnet', emoji: '🧲', name: '磁铁', desc: '同频相吸，你只管变好，对的人自会靠近。' },
   { id: 'scale', emoji: '⚖️', name: '天平', desc: '不偏不倚太难，偶尔向自己倾斜一点也没事。' },
   { id: 'bottle', emoji: '🧴', name: '瓶子', desc: '把情绪装起来摇晃几下，也许就澄清了。' },
   { id: 'beads', emoji: '📿', name: '念珠', desc: '拨弄一下，把杂乱的思绪捋成一条线。' },
   { id: 'amulet', emoji: '🧿', name: '护身符', desc: '不信魔法也没关系，它代表你对自己的保佑。' },
 
   // === 第二十一章：音符流转（节奏与心境） ===
   { id: 'piano', emoji: '🎹', name: '钢琴', desc: '黑白交错，才弹得出人生的起伏旋律。' },
   { id: 'drum', emoji: '🥁', name: '鼓', desc: '跟着心跳的节奏敲，不用管别人怎么看。' },
   { id: 'guitar', emoji: '🎸', name: '吉他', desc: '扫弦扫掉烦恼，只留下回响的余音。' },
   { id: 'trumpet', emoji: '🎺', name: '小号', desc: '嘹亮地吹一声，宣告你此刻的存在。' },
   { id: 'violin', emoji: '🎻', name: '提琴', desc: '揉弦有些哀伤，但拉完了心里就亮堂了。' },
   { id: 'score', emoji: '🎼', name: '乐谱', desc: '跑调也没事，那是你独创的变奏曲。' },
   { id: 'mic', emoji: '🎤', name: '麦克风', desc: '勇敢发声，哪怕只是对自己唱。' },
 
   // === 第二十二章：天气私语（气象与情绪） ===
   { id: 'storm', emoji: '⛈️', name: '雷暴', desc: '吵闹一点也好，能盖过心里的杂音。' },
   { id: 'sleet', emoji: '🌨️', name: '雨夹雪', desc: '又冷又湿的时候，撑把伞熬过去就是晴天。' },
   { id: 'gust', emoji: '🌬️', name: '阵风', desc: '吹乱头发没关系，顺便也吹走了刻板印象。' },
   { id: 'tornado', emoji: '🌪️', name: '龙卷风', desc: '旋转跳跃，混乱中也许能找到新出口。' },
   { id: 'lightning', emoji: '🌩️', name: '闪电', desc: '撕开黑暗的一瞬间，照亮了所有的路。' },
   { id: 'partly', emoji: '🌤️', name: '局部多云', desc: '哪怕生活只露出一小片蓝天，也值得开心。' },
   { id: 'thermo', emoji: '🌡️', name: '温度计', desc: '升降起伏，不过是感受人间冷暖的刻度。' },
   { id: 'blow', emoji: '💨', name: '狂风', desc: '吹走那些不属于你的东西，留下真实的。' },
   { id: 'globe', emoji: '🌏', name: '地球', desc: '退一步看，所有的风暴都只是大气层的呼吸。' },
 
   // === 第二十三章：星际微光（宇宙与渺小） ===
   { id: 'ufo', emoji: '🛸', name: '飞碟', desc: '偶尔逃离一下地心引力，去外太空度个假。' },
   { id: 'alien', emoji: '👽', name: '外星人', desc: '觉得格格不入？因为你来自更高级的星球。' },
   { id: 'satellite', emoji: '🛰️', name: '卫星', desc: '默默绕着圈，看似重复，却在时刻传递信号。' },
   { id: 'fullmoon', emoji: '🌕', name: '满月', desc: '盈满则亏，接受不完美才是长久之计。' },
   { id: 'waning', emoji: '🌘', name: '残月', desc: '马上就要隐没，但新的轮回已经在酝酿。' },
   { id: 'meteorshower', emoji: '🌠', name: '流星雨', desc: '承诺太多会落空，但许愿那一秒是真诚的。' },
   { id: 'waxing', emoji: '🌔', name: '盈月', desc: '快要圆满了，别在最后一步松懈。' },
   { id: 'astronaut', emoji: '🧑‍🚀', name: '宇航员', desc: '漂浮在失重里，换个维度看世界。' },
   { id: 'darkmoon', emoji: '🌚', name: '月背', desc: '哪怕背光的一面满是坑洼，也是完整的你。' },
 
   // === 第二十四章：动物寓言（本能与灵性） ===
   { id: 'fox', emoji: '🦊', name: '狐狸', desc: '狡黠一点，别让生活的难题把你绕进去。' },
   { id: 'turtle', emoji: '🐢', name: '乌龟', desc: '慢一点没关系，寿命长才是硬道理。' },
   { id: 'bee', emoji: '🐝', name: '蜜蜂', desc: '忙忙碌碌，记得给自己留一口甜。' },
   { id: 'whale', emoji: '🐋', name: '鲸鱼', desc: '潜入深海，享受只有自己听得见的回声。' },
   { id: 'hedgehog', emoji: '🦔', name: '刺猬', desc: '偶尔竖起刺，是为了保护柔软的肚皮。' },
   { id: 'wolf', emoji: '🐺', name: '孤狼', desc: '享受独行的自由，也要拥抱篝火的温暖。' },
   { id: 'squirrel', emoji: '🐿️', name: '松鼠', desc: '囤积点快乐，留着冬天慢慢嚼。' },
   { id: 'flamingo', emoji: '🦩', name: '火烈鸟', desc: '不合群也没事，单腿也能站得稳稳当当。' },
   { id: 'deer', emoji: '🦌', name: '麋鹿', desc: '迷路就顺其自然，也许能遇到新风景。' },
 
   // === 第二十五章：旧物时光（记忆与沉淀） ===
   { id: 'radio', emoji: '📻', name: '收音机', desc: '调频到对的波段，白噪音也是种陪伴。' },
   { id: 'fax', emoji: '📠', name: '传真机', desc: '有些话慢慢传，收到时更显得珍贵。' },
   { id: 'clock', emoji: '🕰️', name: '座钟', desc: '滴答滴答，时间不语，却回答了所有问题。' },
   { id: 'projector', emoji: '📽️', name: '放映机', desc: '倒带重温，那些模糊的画面也曾闪闪发亮。' },
   { id: 'scroll', emoji: '📜', name: '卷轴', desc: '慢慢铺开，好戏总是在后头。' },
   { id: 'nesting', emoji: '🎁', name: '套娃', desc: '剥开一层层的伪装，最里面还是那个小孩。' },
   { id: 'vhs', emoji: '📼', name: '录像带', desc: '哪怕卡带了，也是不可复制的独家记忆。' },
 
   // === 第二十六章：身体密码（感知与连接） ===
   { id: 'ear', emoji: '👂', name: '耳朵', desc: '听风听雨，也别忘了听听自己的心跳。' },
   { id: 'heart', emoji: '💗', name: '心脏', desc: '扑通扑通，它比你想象中更坚强。' },
   { id: 'brain', emoji: '🧠', name: '大脑', desc: '装太多会卡顿，记得定期清理内存。' },
   { id: 'hands', emoji: '🤲', name: '双手', desc: '摊开手掌，放走执念，才能抓住新的可能。' },
   { id: 'feet', emoji: '🦶', name: '双脚', desc: '只要还踩在地上，就没有过不去的坎。' },
   { id: 'bone', emoji: '🦴', name: '骨头', desc: '疼过的地方，长出的骨头最硬。' },
   { id: 'tooth', emoji: '🦷', name: '牙齿', desc: '咬牙挺过去，明天就能笑得更甜。' },
   { id: 'lovegesture', emoji: '💖', name: '比心', desc: '别忘了给自己比个心，你值得被偏爱。' },
 
   // === 第二十七章：色彩隐喻（视觉与心理） ===
   { id: 'red', emoji: '🔴', name: '红', desc: '偶尔热烈一次，烧掉所有的不敢。' },
   { id: 'orange', emoji: '🟠', name: '橙', desc: '像落日一样包容，给自己一个柔软的缓冲。' },
   { id: 'yellow', emoji: '🟡', name: '黄', desc: '明晃晃的开心，不需要任何理由。' },
   { id: 'green', emoji: '🟢', name: '绿', desc: '慢半拍也没事，按自己的节奏生根发芽。' },
   { id: 'blue', emoji: '🔵', name: '蓝', desc: '沉静下来，深海的包容能治愈一切喧嚣。' },
   { id: 'brown', emoji: '🟤', name: '棕', desc: '踏实接地气，稳稳当当才是真。' },
   { id: 'black', emoji: '⚫', name: '黑', desc: '融入夜色，给自己一个隐形的拥抱。' },
   { id: 'white', emoji: '⚪', name: '白', desc: '归零重来，每一刻都是干净的起点。' },
 
   // === 第二十八章：人生百味（复杂与纯粹） ===
   { id: 'salt', emoji: '🧂', name: '盐', desc: '生活太淡就加点盐，眼泪也是调味剂。' },
   { id: 'chili', emoji: '🌶️', name: '辣椒', desc: '刺激一下麻木的神经，痛也是活着的感觉。' },
   { id: 'honey', emoji: '🍯', name: '蜂蜜', desc: '甜度刚刚好，不腻人的快乐最长久。' },
   { id: 'lemon', emoji: '🍋', name: '柠檬', desc: '酸一下没关系，习惯了就能做柠檬水。' },
   { id: 'garlic', emoji: '🧄', name: '大蒜', desc: '爱的人爱死，恨的人躲远，做自己就好。' },
   { id: 'onion', emoji: '🧅', name: '洋葱', desc: '一层层剥开，总有一层让你泪流满面。' },
   { id: 'peanut', emoji: '🥜', name: '花生', desc: '扎实饱满，不声不响地积攒能量。' }
];

const COLLECTION_ITEMS_DUO = require('./collectionDuoData.js');

const SCOPE_BASIC = 'basic';
const SCOPE_ADVANCED = 'advanced';

const PAGE_SIZE = 9;

function normalizeScope(scope) {
  if (scope === SCOPE_ADVANCED) return SCOPE_ADVANCED;
  return SCOPE_BASIC;
}

function getItemsArray(scope) {
  const s = normalizeScope(scope);
  if (s === SCOPE_ADVANCED) return COLLECTION_ITEMS_DUO;
  return COLLECTION_ITEMS;
}

function chunkIntoPages(items, pageSize) {
  const pages = [];
  for (let i = 0; i < items.length; i += pageSize) {
    const slice = items.slice(i, i + pageSize);
    const pageIdx = pages.length;
    const row = slice.map((item, j) => ({
      ...item,
      _slot: `${pageIdx}-${j}`
    }));
    while (row.length < pageSize) {
      const j = row.length;
      row.push({ _empty: true, _slot: `${pageIdx}-${j}` });
    }
    pages.push(row);
  }
  return pages;
}

function getAllItems(scope) {
  return getItemsArray(scope);
}

function getItemById(id, scope) {
  const arr = getItemsArray(scope);
  return arr.find((item) => item.id === id) || null;
}

function getItemIndex(id, scope) {
  const arr = getItemsArray(scope);
  return arr.findIndex((item) => item.id === id);
}

function getSwiperPages(scope) {
  const pages = chunkIntoPages(getItemsArray(scope), PAGE_SIZE);
  return pages.map((cells, idx) => ({
    pageId: idx,
    cells
  }));
}

/** 首页大图标（emoji 字符串），存于本地 */
const HOME_LOGO_EMOJI_KEY = 'homeLogoEmoji';
const HOME_LOGO_DEFAULT = '🧩';

function getHomeLogoEmoji() {
  try {
    const v = wx.getStorageSync(HOME_LOGO_EMOJI_KEY);
    if (typeof v === 'string' && v.trim()) {
      return v.trim().slice(0, 32);
    }
  } catch (e) {
    // ignore
  }
  return HOME_LOGO_DEFAULT;
}

function setHomeLogoEmoji(emoji) {
  if (!emoji || typeof emoji !== 'string') return false;
  const s = emoji.trim().slice(0, 32);
  if (!s) return false;
  try {
    wx.setStorageSync(HOME_LOGO_EMOJI_KEY, s);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  COLLECTION_ITEMS,
  COLLECTION_ITEMS_DUO,
  SCOPE_BASIC,
  SCOPE_ADVANCED,
  PAGE_SIZE,
  normalizeScope,
  getAllItems,
  getItemById,
  getItemIndex,
  getSwiperPages,
  chunkIntoPages,
  HOME_LOGO_EMOJI_KEY,
  HOME_LOGO_DEFAULT,
  getHomeLogoEmoji,
  setHomeLogoEmoji
};
