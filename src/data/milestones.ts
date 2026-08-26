export type MilestoneCategory = 'personal' | 'business' | 'global'
export type CoordinatePrecision = 'poi' | 'district' | 'city'

export type Milestone = {
  id: string
  order: number
  year: string
  shortTitle: string
  title: string
  place: string
  mapLabel: string
  coordinates: [number, number]
  story: string
  chapter: string
  unlockChapterIdx: number
  category: MilestoneCategory
  precision: CoordinatePrecision
  source: { label: string; url: string }
}

export const categoryMeta: Record<MilestoneCategory, { label: string; color: string }> = {
  personal: { label: '个人轨迹', color: '#f07f68' },
  business: { label: '商业转折', color: '#d5a33f' },
  global: { label: '全球化', color: '#6578b8' },
}

export const precisionLabel: Record<CoordinatePrecision, string> = {
  poi: '具体地点',
  district: '区域坐标',
  city: '城市坐标',
}

const weread = 'https://weread.qq.com/book-detail?type=1&v=55e32900813ab9640g017ec0'
const prospectus = 'https://www.hkexnews.hk/listedco/listconews/sehk/2020/1201/2020120100100_c.pdf'
const annual2024 = 'https://prod-out-res.popmart.com/cms/ANNUAL_REPORT_2024_976e7e443e.pdf'
const annual2023 = 'https://prod-out-res.popmart.com/cms/ANNUAL_REPORT_2023_c2e4bab1ae.pdf'
const directors = 'https://www1.hkexnews.hk/listedco/listconews/sehk/2024/0425/2024042500731_c.pdf'
const hangLung = 'https://www.hanglung.com/zh-cn/media/connections/our-stories/corporate/2025/202504_popmart'

export const milestones: Milestone[] = [
  {
    id: 'sias', order: 1, year: '2005', shortTitle: '西亚斯', title: '把大学当成实验场', place: '河南新郑 · 郑州西亚斯学院', mapLabel: '西亚斯', coordinates: [113.765489, 34.401558],
    story: '王宁在这里读广告学，结识后来一起创业的伙伴。校园也是他最早练习做生意的地方。', chapter: '学生时代', unlockChapterIdx: 5, category: 'personal', precision: 'poi',
    source: { label: '泡泡玛特董事履历', url: directors },
  },
  {
    id: 'box-street', order: 2, year: '2008', shortTitle: '格子街', title: '第一间真正的店', place: '河南新郑 · 西亚斯校外商业街', mapLabel: '格子街', coordinates: [113.7681, 34.3988],
    story: '还在上大学时，他和同学开了格子铺“格子街”。这笔小生意后来成为去北京创业的启动资金。', chapter: '第一次创业', unlockChapterIdx: 26, category: 'business', precision: 'district',
    source: { label: '《因为独特》', url: weread },
  },
  {
    id: 'beijing-work', order: 3, year: '2009', shortTitle: '北漂', title: '住在五道口，工作在中关村', place: '北京海淀 · 五道口 / 中关村', mapLabel: '北漂', coordinates: [116.337855, 39.9928],
    story: '毕业后到北京，他先后在教育机构和新浪工作。生活半径也把下一次创业锁定在中关村。', chapter: '到北京去', unlockChapterIdx: 26, category: 'personal', precision: 'district',
    source: { label: '《因为独特》', url: weread },
  },
  {
    id: 'first-store', order: 4, year: '2010', shortTitle: '一号店', title: '泡泡玛特第一家店亮灯', place: '北京中关村 · 欧美汇购物中心 B1', mapLabel: '一号店', coordinates: [116.31398, 39.979567],
    story: '2010 年 11 月 17 日，泡泡玛特第一家店开门。年轻团队从货架和走廊开始试出自己的零售模型。', chapter: '泡泡玛特诞生', unlockChapterIdx: 7, category: 'business', precision: 'poi',
    source: { label: '泡泡玛特招股书', url: prospectus },
  },
  {
    id: 'hong-kong-toys', order: 5, year: '2014', shortTitle: '潮玩启蒙', title: '在香港看见设计师玩具', place: '中国香港', mapLabel: '潮玩启蒙', coordinates: [114.170714, 22.278354],
    story: '香港成熟的潮玩与零售场景，让“卖有趣的东西”逐渐变成更清晰的品类判断。', chapter: '潮玩生意浮现', unlockChapterIdx: 11, category: 'business', precision: 'city',
    source: { label: '《因为独特》', url: weread },
  },
  {
    id: 'tianjin-riverside', order: 6, year: '2016', shortTitle: '天津恒隆', title: '从集合店走向 IP 生意', place: '天津和平 · 天津恒隆广场', mapLabel: '天津恒隆', coordinates: [117.200935, 39.127128],
    story: '天津门店记录了泡泡玛特从零售集合店向潮玩与 IP 运营转向的关键阶段。', chapter: '重新定义泡泡玛特', unlockChapterIdx: 34, category: 'business', precision: 'poi',
    source: { label: '恒隆地产品牌故事', url: hangLung },
  },
  {
    id: 'shanghai-grand-gateway', order: 7, year: '2016', shortTitle: '上海港汇', title: '把新模型带进核心商场', place: '上海徐汇 · 港汇恒隆广场', mapLabel: '上海港汇', coordinates: [121.437775, 31.195296],
    story: '核心商场里的门店，让泡泡玛特的新形态进入更大的城市消费场景。', chapter: '重新定义泡泡玛特', unlockChapterIdx: 34, category: 'business', precision: 'poi',
    source: { label: '恒隆地产品牌故事', url: hangLung },
  },
  {
    id: 'sanlitun', order: 8, year: '2017', shortTitle: '三里屯', title: '年轻人的城市坐标', place: '北京朝阳 · 三里屯', mapLabel: '三里屯', coordinates: [116.45399, 39.934871],
    story: '三里屯代表泡泡玛特进入年轻人高频出现的城市空间，也让潮玩更像一种生活方式。', chapter: '进入主流商圈', unlockChapterIdx: 32, category: 'business', precision: 'district',
    source: { label: '《因为独特》', url: weread },
  },
  {
    id: 'pku', order: 9, year: '2017', shortTitle: '北大光华', title: '创业途中再回到课堂', place: '北京海淀 · 北京大学光华管理学院', mapLabel: '北大光华', coordinates: [116.310039, 39.993092],
    story: '王宁在创业期间完成北京大学光华管理学院工商管理硕士学位。', chapter: '创业者再学习', unlockChapterIdx: 40, category: 'personal', precision: 'poi',
    source: { label: '泡泡玛特董事履历', url: directors },
  },
  {
    id: 'dongguan-supply', order: 10, year: '2017', shortTitle: '东莞', title: '把想象交给供应链', place: '广东东莞', mapLabel: '供应链', coordinates: [113.751884, 23.021016],
    story: '潮玩最终要从设计稿变成手里的产品。东莞代表支撑量产、工艺与品质的制造网络。', chapter: '寻找上游能力', unlockChapterIdx: 11, category: 'business', precision: 'city',
    source: { label: '《因为独特》', url: weread },
  },
  {
    id: 'shenzhen-supply', order: 11, year: '2018', shortTitle: '深圳', title: '在珠三角继续找答案', place: '广东深圳', mapLabel: '深圳', coordinates: [114.057939, 22.543527],
    story: '深圳连接设计、制造与新消费，也是观察潮玩产业链效率的一扇窗口。', chapter: '供应链与零售', unlockChapterIdx: 50, category: 'business', precision: 'city',
    source: { label: '《因为独特》', url: weread },
  },
  {
    id: 'wangjing-hq', order: 12, year: '2019', shortTitle: '望京总部', title: '从店铺走进组织', place: '北京朝阳 · 望京', mapLabel: '总部', coordinates: [116.487146, 39.995238],
    story: '成长不只发生在门店，也发生在团队和组织里。望京成为泡泡玛特继续扩张的工作坐标。', chapter: '公司成长', unlockChapterIdx: 6, category: 'business', precision: 'district',
    source: { label: '《因为独特》', url: weread },
  },
  {
    id: 'hkex', order: 13, year: '2020', shortTitle: '港交所', title: '从中关村走到港交所', place: '中国香港 · 交易广场', mapLabel: '上市', coordinates: [114.163103, 22.281218],
    story: '2020 年 12 月 11 日，泡泡玛特股份在香港联交所开始买卖。', chapter: '成为上市公司', unlockChapterIdx: 45, category: 'business', precision: 'poi',
    source: { label: '泡泡玛特招股书', url: prospectus },
  },
  {
    id: 'seoul', order: 14, year: '2020', shortTitle: '首尔', title: '海外故事从亚洲展开', place: '韩国首尔', mapLabel: '首尔', coordinates: [126.978, 37.5665],
    story: '韩国是泡泡玛特较早深耕的海外市场之一，门店与本地合作让 IP 进入新的文化语境。', chapter: '海外起步', unlockChapterIdx: 46, category: 'global', precision: 'city',
    source: { label: '泡泡玛特 2024 年报', url: annual2024 },
  },
  {
    id: 'singapore', order: 15, year: '2021', shortTitle: '新加坡', title: '东南亚的第一块拼图', place: '新加坡', mapLabel: '新加坡', coordinates: [103.819499, 1.357107],
    story: '新加坡成为泡泡玛特连接东南亚市场的重要支点。', chapter: '进入东南亚', unlockChapterIdx: 65, category: 'global', precision: 'city',
    source: { label: '泡泡玛特 2024 年报', url: annual2024 },
  },
  {
    id: 'tokyo', order: 16, year: '2022', shortTitle: '东京', title: '走进成熟的 IP 市场', place: '日本东京', mapLabel: '东京', coordinates: [139.763895, 35.67686],
    story: '在角色文化成熟的日本，泡泡玛特需要用产品和空间证明自己的原创 IP 能力。', chapter: '走进日本', unlockChapterIdx: 64, category: 'global', precision: 'city',
    source: { label: '泡泡玛特 2024 年报', url: annual2024 },
  },
  {
    id: 'osaka', order: 17, year: '2022', shortTitle: '大阪', title: '从一座城市走向多城网络', place: '日本大阪', mapLabel: '大阪', coordinates: [135.501454, 34.693757],
    story: '大阪把日本市场从单点尝试扩展为多城市经营。', chapter: '走进日本', unlockChapterIdx: 65, category: 'global', precision: 'city',
    source: { label: '泡泡玛特 2024 年报', url: annual2024 },
  },
  {
    id: 'busan', order: 18, year: '2022', shortTitle: '釜山', title: '韩国市场继续向南', place: '韩国釜山', mapLabel: '釜山', coordinates: [129.075237, 35.179953],
    story: '从首尔到釜山，门店网络开始覆盖韩国更多城市。', chapter: '海外门店网络', unlockChapterIdx: 65, category: 'global', precision: 'city',
    source: { label: '泡泡玛特 2024 年报', url: annual2024 },
  },
  {
    id: 'taipei', order: 19, year: '2022', shortTitle: '台北', title: '在华语市场继续长大', place: '中国台北', mapLabel: '台北', coordinates: [121.56368, 25.03752],
    story: '台北把海外及港澳台业务的城市版图又向前推了一步。', chapter: '海外门店网络', unlockChapterIdx: 65, category: 'global', precision: 'city',
    source: { label: '泡泡玛特 2024 年报', url: annual2024 },
  },
  {
    id: 'pop-land', order: 20, year: '2023', shortTitle: '城市乐园', title: '把 IP 世界搬进城市', place: '北京朝阳 · 朝阳公园 POP LAND', mapLabel: 'POP LAND', coordinates: [116.47864, 39.933611],
    story: '泡泡玛特城市乐园开放，故事从一间小店走到一座可以亲自进入的 IP 世界。', chapter: '不止是玩具', unlockChapterIdx: 23, category: 'business', precision: 'poi',
    source: { label: '泡泡玛特 2023 年报', url: annual2023 },
  },
  {
    id: 'bangkok-centralworld', order: 21, year: '2023', shortTitle: '曼谷旗舰店', title: '东南亚旗舰店亮相', place: '泰国曼谷 · CentralWorld', mapLabel: '曼谷旗舰店', coordinates: [100.539041, 13.746577],
    story: 'CentralWorld 旗舰店成为泡泡玛特在东南亚展示完整品牌体验的重要窗口。', chapter: '深耕东南亚', unlockChapterIdx: 55, category: 'global', precision: 'poi',
    source: { label: '泡泡玛特 2024 年报', url: annual2024 },
  },
  {
    id: 'bangkok-crybaby', order: 22, year: '2024', shortTitle: 'CRYBABY', title: '一个 IP 拥有自己的空间', place: '泰国曼谷 · Central Ladprao', mapLabel: 'CRYBABY', coordinates: [100.561361, 13.816839],
    story: 'CRYBABY 主题店把一个角色从产品扩展成可进入、可分享的品牌空间。', chapter: 'IP 的全球表达', unlockChapterIdx: 49, category: 'global', precision: 'poi',
    source: { label: '泡泡玛特 2024 年报', url: annual2024 },
  },
  {
    id: 'suvarnabhumi', order: 23, year: '2024', shortTitle: '机场店', title: '把潮玩带到旅途入口', place: '泰国曼谷 · 素万那普机场', mapLabel: '机场店', coordinates: [100.74858, 13.681877],
    story: '机场店让泡泡玛特出现在全球旅行者的第一站和最后一站。', chapter: '深耕东南亚', unlockChapterIdx: 55, category: 'global', precision: 'poi',
    source: { label: '泡泡玛特 2024 年报', url: annual2024 },
  },
  {
    id: 'london-oxford', order: 24, year: '2024', shortTitle: '伦敦', title: '走上牛津街', place: '英国伦敦 · Oxford Street', mapLabel: '伦敦', coordinates: [-0.15818, 51.513407],
    story: '牛津街门店把中国原创潮玩带进欧洲最繁忙的商业街之一。', chapter: '进入欧洲', unlockChapterIdx: 47, category: 'global', precision: 'district',
    source: { label: '泡泡玛特 2024 年报', url: annual2024 },
  },
  {
    id: 'paris-louvre', order: 25, year: '2024', shortTitle: '巴黎', title: '在卢浮宫旁开店', place: '法国巴黎 · 卢浮宫商圈', mapLabel: '巴黎', coordinates: [2.338028, 48.861147],
    story: '巴黎门店让潮玩与艺术之都发生连接，也成为全球化版图里的醒目一站。', chapter: '进入欧洲', unlockChapterIdx: 47, category: 'global', precision: 'district',
    source: { label: '泡泡玛特 2024 年报', url: annual2024 },
  },
]
