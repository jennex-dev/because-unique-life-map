# 《因为独特》人生轨迹地图

Jennex.ai 的 AI 阅读实验：用微信读书的真实进度，逐步点亮《因为独特》中王宁的人生与创业地点。

## 数据原则

- 阅读进度、当前章节、划线数量来自腾讯官方 [WeChatReading Skill](https://github.com/Tencent/WeChatReading)。
- 地点只在书中内容或可靠公开资料能够确认后点亮，不按百分比自动猜测。
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

同步脚本只更新 `src/data/reading-state.json` 中的进度、章节与划线数量；地点点亮仍由 Codex 在核验内容和来源后编辑，避免把猜测写成事实。

## 部署

网站通过 GitHub Pages 的 `gh-pages` 分支发布。高德 Key 绑定 `jennex-dev.github.io` 域名；源代码分支不保存任何密钥。
