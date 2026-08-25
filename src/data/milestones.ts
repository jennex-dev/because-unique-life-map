export type Milestone = {
  id: string
  year: string
  shortTitle: string
  title: string
  place: string
  mapLabel: string
  coordinates: [number, number]
  story: string
  source: { label: string; url: string }
}

export const milestones: Milestone[] = [
  {
    id: 'sias', year: '2005', shortTitle: '西亚斯', title: '把大学当成实验场', place: '河南新郑 · 郑州西亚斯学院', mapLabel: '西亚斯', coordinates: [113.765489, 34.401558],
    story: '王宁在这里读广告学。很多后来一起创业的人，也是在校园里认识的。',
    source: { label: '泡泡玛特 2024 年报 · 董事履历', url: 'https://www1.hkexnews.hk/listedco/listconews/sehk/2024/0425/2024042500731_c.pdf' },
  },
  {
    id: 'box-street', year: '2008', shortTitle: '格子街', title: '第一间真正的店', place: '河南新郑 · 西亚斯校外商业街', mapLabel: '格子街', coordinates: [113.7681, 34.3988],
    story: '还在上大学时，王宁和同学开了“格子街”。这间格子铺后来成为去北京创业的启动资金。',
    source: { label: '经济观察网 · 泡泡玛特创始人访谈', url: 'https://www.eeo.com.cn/2020/1216/446272.shtml' },
  },
  {
    id: 'beijing-work', year: '2009', shortTitle: '北漂', title: '住在五道口，工作在中关村', place: '北京海淀 · 五道口 / 中关村', mapLabel: '北漂', coordinates: [116.337855, 39.9928],
    story: '毕业后到北京，他先后在教育机构和新浪工作。住处与工作把下一次创业锁定在中关村。',
    source: { label: '经济观察网 · 泡泡玛特的第二曲线', url: 'https://www.eeo.com.cn/2022/0826/552711.shtml' },
  },
  {
    id: 'first-store', year: '2010', shortTitle: '第一家店', title: '泡泡玛特一号店亮灯', place: '北京中关村 · 欧美汇购物中心 B1', mapLabel: '一号店', coordinates: [116.31398, 39.979567],
    story: '2010 年 11 月 17 日，第一家泡泡玛特在中关村开门。货架、吧台、走廊，都是年轻团队一点点试出来的。',
    source: { label: '港交所招股书 · 历史与公司架构', url: 'https://www1.hkexnews.hk/listedco/listconews/sehk/2020/1201/2020120100100_c.pdf' },
  },
  {
    id: 'pku', year: '2017', shortTitle: '北大光华', title: '创业途中再回到课堂', place: '北京海淀 · 北京大学光华管理学院', mapLabel: '北大', coordinates: [116.310039, 39.993092],
    story: '王宁在创业期间完成北京大学光华管理学院工商管理硕士学位。',
    source: { label: '泡泡玛特 2024 年报 · 董事履历', url: 'https://www1.hkexnews.hk/listedco/listconews/sehk/2024/0425/2024042500731_c.pdf' },
  },
  {
    id: 'hkex', year: '2020', shortTitle: '港交所', title: '从中关村走到港交所', place: '中国香港 · 交易广场', mapLabel: '上市', coordinates: [114.163103, 22.281218],
    story: '2020 年 12 月 11 日，泡泡玛特股份开始在香港联交所买卖。',
    source: { label: '港交所 · 泡泡玛特招股章程', url: 'https://www.hkexnews.hk/listedco/listconews/sehk/2020/1201/2020120100100_c.pdf' },
  },
  {
    id: 'pop-land', year: '2023', shortTitle: '城市乐园', title: '把 IP 世界搬进城市', place: '北京朝阳 · 朝阳公园 POP LAND', mapLabel: '乐园', coordinates: [116.47864, 39.933611],
    story: '泡泡玛特城市乐园在朝阳公园开放，故事从一间小店走到一座可以进入的 IP 世界。',
    source: { label: '泡泡玛特 2023 ESG 报告', url: 'https://prod-out-res.popmart.com/cms/ANNUAL_REPORT_2023_c2e4bab1ae.pdf' },
  },
]
