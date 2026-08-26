# 《因为独特》成长地图

Jennex.ai 的 AI 阅读实验：用微信读书的真实进度，逐步点亮《因为独特》中王宁与泡泡玛特走过的地点。

V2 收录 25 个可地图化节点，并把它们分为个人轨迹、商业转折与全球化三条探索路线。未读到的地点只显示为地图迷雾，不提前泄露地点与故事。

## 数据原则

- 阅读进度、当前章节、划线数量来自腾讯官方 [WeChatReading Skill](https://github.com/Tencent/WeChatReading)。
- 地点及对应章节预先人工核验；同步到章节后才自动解锁，同时保留已经人工确认的点亮记录。
- 公开网站只保存经过筛选的阅读状态，不包含私人划线正文、个人想法或 API Key。
- 地图事实来源在每张地点卡片中标注。

## 本地运行

```bash
npm install
cp .env.example .env.local
npm run dev
```

`.env.local`：

```dotenv
VITE_AMAP_JS_KEY=your_web_js_key
VITE_AMAP_SECURITY_JS_CODE=your_security_js_code
```

## 同步微信读书

```bash
WEREAD_API_KEY="..." npm run sync:weread
```

同步脚本更新 `src/data/reading-state.json` 中的进度、章节与划线数量。页面根据已核验的章节门槛解锁地点；新增地点与章节映射仍由 Codex 核验后编辑。

## 部署

网站通过 GitHub Pages 的 `gh-pages` 分支发布。高德 Key 绑定 `jennex-dev.github.io` 域名；源代码分支不保存任何密钥。
