import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const skillVersion = '1.0.4'
const bookId = '3300122247'
const apiKey = process.env.WEREAD_API_KEY
const here = path.dirname(fileURLToPath(import.meta.url))
const statePath = path.join(here, '..', 'src', 'data', 'reading-state.json')

if (!apiKey) throw new Error('缺少 WEREAD_API_KEY 环境变量')

async function request(apiName, params = {}) {
  const response = await fetch('https://i.weread.qq.com/api/agent/gateway', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_name: apiName, ...params, skill_version: skillVersion }),
  })
  if (!response.ok) throw new Error(`微信读书接口失败：${response.status}`)
  const data = await response.json()
  if (data.upgrade_info) throw new Error(data.upgrade_info.message || '微信读书 Skill 需要升级')
  if (data.errcode) throw new Error(data.errmsg || `微信读书错误 ${data.errcode}`)
  return data
}

const [progressData, chapterData, bookmarkData] = await Promise.all([
  request('/book/getprogress', { bookId }),
  request('/book/chapterinfo', { bookId }),
  request('/book/bookmarklist', { bookId }),
])
const oldState = JSON.parse(await fs.readFile(statePath, 'utf8'))
const progress = progressData.book || {}
const chapter = chapterData.chapters?.find((item) => item.chapterUid === progress.chapterUid)
const lastReadAt = progress.updateTime
  ? new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai' }).format(new Date(progress.updateTime * 1000))
  : oldState.lastReadAt
const nextState = {
  ...oldState,
  progress: progress.progress ?? oldState.progress,
  chapterUid: progress.chapterUid ?? oldState.chapterUid,
  chapterIdx: progress.chapterIdx ?? chapter?.chapterIdx ?? oldState.chapterIdx,
  chapterTitle: chapter?.title ?? oldState.chapterTitle,
  underlineCount: bookmarkData.updated?.length ?? oldState.underlineCount,
  lastReadAt,
  syncedAt: new Date().toISOString(),
}
await fs.writeFile(statePath, `${JSON.stringify(nextState, null, 2)}\n`)
process.stdout.write(`已同步《因为独特》：${nextState.progress}% · ${nextState.chapterTitle}\n`)
