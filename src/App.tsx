import { useMemo, useState } from 'react'
import {
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MapPinned,
  Sparkles,
} from 'lucide-react'
import './App.css'
import { LifeMap } from './components/LifeMap'
import readingState from './data/reading-state.json'
import { milestones } from './data/milestones'

function App() {
  const latestUnlocked = [...milestones]
    .reverse()
    .find((milestone) => readingState.unlockedMilestoneIds.includes(milestone.id))
  const [selectedId, setSelectedId] = useState(latestUnlocked?.id ?? milestones[0].id)
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false)

  const selected = useMemo(
    () => milestones.find((milestone) => milestone.id === selectedId) ?? milestones[0],
    [selectedId],
  )
  const selectedIndex = milestones.findIndex((milestone) => milestone.id === selected.id)
  const isUnlocked = readingState.unlockedMilestoneIds.includes(selected.id)

  const moveSelection = (direction: -1 | 1) => {
    const nextIndex = Math.min(
      milestones.length - 1,
      Math.max(0, selectedIndex + direction),
    )
    setSelectedId(milestones[nextIndex].id)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand__seal">JX</span>
          <div>
            <strong>Jennex Reading Quest</strong>
            <span>把读过的地方，变成走得到的地图</span>
          </div>
        </div>
        <div className="sync-status" title={`最后同步：${readingState.lastReadAt}`}>
          <span className="sync-status__dot" />
          已同步微信读书
        </div>
      </header>

      <main className="workspace">
        <section className="map-stage" aria-label="王宁人生轨迹地图">
          <LifeMap
            milestones={milestones}
            unlockedIds={readingState.unlockedMilestoneIds}
            selectedId={selectedId}
            showUnlockedOnly={showUnlockedOnly}
            onSelect={setSelectedId}
          />

          <div className="map-intro paper-card">
            <div className="eyebrow"><Sparkles size={13} /> READING QUEST 01</div>
            <h1>王宁的人生轨迹</h1>
            <p>读《因为独特》，读到哪里，地图就亮到哪里。</p>
          </div>

          <button
            type="button"
            className={`map-filter ${showUnlockedOnly ? 'is-active' : ''}`}
            onClick={() => setShowUnlockedOnly((value) => !value)}
          >
            <span className="map-filter__check"><Check size={13} /></span>
            只看已点亮
          </button>

          <div className="map-legend" aria-hidden="true">
            <span><i className="legend-dot legend-dot--lit" />已点亮</span>
            <span><i className="legend-dot" />待读到</span>
          </div>

          <div className="map-credit">真实地点 · 来源校验 · 非自动脑补</div>
        </section>

        <aside className="story-panel">
          <div className="panel-handle" />

          <section className="book-summary">
            <div className="book-cover" aria-label="《因为独特》书封示意">
              <span>因<br />为<br />独<br />特</span>
              <small>李翔</small>
            </div>
            <div className="book-summary__copy">
              <span className="book-kicker"><BookOpen size={14} /> 正在阅读</span>
              <h2>因为独特</h2>
              <p>李翔 · 中信出版集团</p>
              <a href={readingState.deepLink} target="_blank" rel="noreferrer">
                回到微信读书 <ExternalLink size={13} />
              </a>
            </div>
            <div className="progress-orbit" aria-label={`阅读进度 ${readingState.progress}%`}>
              <svg viewBox="0 0 44 44" role="presentation">
                <circle cx="22" cy="22" r="18" />
                <circle
                  className="progress-orbit__value"
                  cx="22"
                  cy="22"
                  r="18"
                  pathLength="100"
                  strokeDasharray={`${readingState.progress} 100`}
                />
              </svg>
              <strong>{readingState.progress}%</strong>
            </div>
          </section>

          <section className="quest-progress">
            <div className="quest-progress__topline">
              <span>当前章节</span>
              <strong>{readingState.chapterTitle}</strong>
            </div>
            <div className="quest-progress__bar">
              <span style={{ width: `${readingState.progress}%` }} />
            </div>
            <div className="quest-progress__meta">
              <span>{readingState.underlineCount} 条划线</span>
              <span>{readingState.unlockedMilestoneIds.length}/{milestones.length} 地点点亮</span>
            </div>
          </section>

          <section className={`milestone-card ${isUnlocked ? 'is-unlocked' : 'is-locked'}`}>
            <div className="milestone-card__header">
              <div>
                <span className="milestone-number">{String(selectedIndex + 1).padStart(2, '0')}</span>
                <span className="milestone-year">{selected.year}</span>
              </div>
              <span className="status-pill">
                {isUnlocked ? <><Sparkles size={13} /> 已点亮</> : '待读到'}
              </span>
            </div>
            <div className="milestone-card__place">
              <MapPinned size={18} />
              <div>
                <h3>{selected.title}</h3>
                <p>{selected.place}</p>
              </div>
            </div>
            <p className="milestone-card__story">
              {isUnlocked ? selected.story : '这个地点还藏在后面的章节里。继续读，等证据出现后再把它点亮。'}
            </p>
            {isUnlocked && (
              <a className="source-link" href={selected.source.url} target="_blank" rel="noreferrer">
                事实来源：{selected.source.label} <ExternalLink size={12} />
              </a>
            )}
            <div className="milestone-card__nav">
              <button type="button" onClick={() => moveSelection(-1)} disabled={selectedIndex === 0} aria-label="上一个地点">
                <ChevronLeft size={18} />
              </button>
              <span>{selectedIndex + 1} / {milestones.length}</span>
              <button type="button" onClick={() => moveSelection(1)} disabled={selectedIndex === milestones.length - 1} aria-label="下一个地点">
                <ChevronRight size={18} />
              </button>
            </div>
          </section>

          <section className="timeline" aria-label="人生轨迹时间线">
            <div className="section-heading">
              <span>点亮记录</span>
              <small>横向滑动</small>
            </div>
            <div className="timeline__rail">
              {milestones.map((milestone, index) => {
                const unlocked = readingState.unlockedMilestoneIds.includes(milestone.id)
                return (
                  <button
                    type="button"
                    key={milestone.id}
                    className={`${selectedId === milestone.id ? 'is-selected' : ''} ${unlocked ? 'is-unlocked' : 'is-locked'}`}
                    onClick={() => setSelectedId(milestone.id)}
                  >
                    <span className="timeline__index">{String(index + 1).padStart(2, '0')}</span>
                    <strong>{milestone.year}</strong>
                    <small>{unlocked ? milestone.shortTitle : '???'}</small>
                  </button>
                )
              })}
            </div>
          </section>

          <footer className="footer-note">
            <p>地图只收录能由书中内容或可靠公开资料交叉确认的地点。</p>
            <span>上次同步 {readingState.lastReadAt}</span>
          </footer>
        </aside>
      </main>
    </div>
  )
}

export default App
