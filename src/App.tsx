import { useMemo, useState, type CSSProperties } from 'react'
import {
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  MapPinned,
  Sparkles,
} from 'lucide-react'
import './App.css'
import { LifeMap } from './components/LifeMap'
import readingState from './data/reading-state.json'
import {
  categoryMeta,
  milestones,
  precisionLabel,
  type MilestoneCategory,
} from './data/milestones'

type CategoryFilter = 'all' | MilestoneCategory

const automaticUnlocks = milestones
  .filter((milestone) => milestone.unlockChapterIdx <= readingState.chapterIdx)
  .map((milestone) => milestone.id)
const unlockedIds = Array.from(new Set([...readingState.unlockedMilestoneIds, ...automaticUnlocks]))

function App() {
  const latestUnlocked = [...milestones].reverse().find((milestone) => unlockedIds.includes(milestone.id))
  const [selectedId, setSelectedId] = useState(latestUnlocked?.id ?? milestones[0].id)
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false)
  const [category, setCategory] = useState<CategoryFilter>('all')

  const visibleMilestones = useMemo(
    () => milestones.filter((milestone) =>
      (category === 'all' || milestone.category === category)
      && (!showUnlockedOnly || unlockedIds.includes(milestone.id))),
    [category, showUnlockedOnly],
  )

  const selected = useMemo(
    () => milestones.find((milestone) => milestone.id === selectedId) ?? milestones[0],
    [selectedId],
  )
  const selectedIndex = milestones.findIndex((milestone) => milestone.id === selected.id)
  const visibleIndex = visibleMilestones.findIndex((milestone) => milestone.id === selected.id)
  const isUnlocked = unlockedIds.includes(selected.id)
  const selectedCategory = categoryMeta[selected.category]
  const nextLocked = milestones.find((milestone) => !unlockedIds.includes(milestone.id))

  const selectCategory = (nextCategory: CategoryFilter) => {
    setCategory(nextCategory)
    const firstMatch = milestones.find((milestone) =>
      (nextCategory === 'all' || milestone.category === nextCategory)
      && (!showUnlockedOnly || unlockedIds.includes(milestone.id)))
    if (firstMatch) setSelectedId(firstMatch.id)
  }

  const toggleUnlockedOnly = () => {
    const nextValue = !showUnlockedOnly
    setShowUnlockedOnly(nextValue)
    if (nextValue && !isUnlocked) {
      const firstUnlocked = milestones.find((milestone) =>
        unlockedIds.includes(milestone.id) && (category === 'all' || milestone.category === category))
      if (firstUnlocked) setSelectedId(firstUnlocked.id)
    }
  }

  const moveSelection = (direction: -1 | 1) => {
    const currentIndex = visibleIndex >= 0 ? visibleIndex : 0
    const nextIndex = Math.min(visibleMilestones.length - 1, Math.max(0, currentIndex + direction))
    if (visibleMilestones[nextIndex]) setSelectedId(visibleMilestones[nextIndex].id)
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
        <section className="map-stage" aria-label="王宁与泡泡玛特成长地图">
          <LifeMap
            milestones={milestones}
            unlockedIds={unlockedIds}
            selectedId={selectedId}
            showUnlockedOnly={showUnlockedOnly}
            category={category}
            onSelect={setSelectedId}
          />

          <div className="map-intro paper-card">
            <div className="eyebrow"><Sparkles size={13} /> READING QUEST 01</div>
            <h1>王宁与泡泡玛特<br />成长地图</h1>
            <p>读《因为独特》，读到哪里，地图就亮到哪里。</p>
          </div>

          <div className="map-controls" aria-label="地图筛选">
            <div className="category-tabs">
              <button className={category === 'all' ? 'is-active' : ''} onClick={() => selectCategory('all')}>全部</button>
              {(Object.keys(categoryMeta) as MilestoneCategory[]).map((key) => (
                <button
                  key={key}
                  className={category === key ? 'is-active' : ''}
                  style={{ '--category-color': categoryMeta[key].color } as CSSProperties}
                  onClick={() => selectCategory(key)}
                >
                  <i />{categoryMeta[key].label}
                </button>
              ))}
            </div>
            <button type="button" className={`map-filter ${showUnlockedOnly ? 'is-active' : ''}`} onClick={toggleUnlockedOnly}>
              <span className="map-filter__check"><Check size={13} /></span>
              只看已点亮
            </button>
          </div>

          <div className="map-legend" aria-hidden="true">
            <span><i className="legend-dot legend-dot--personal" />个人轨迹</span>
            <span><i className="legend-dot legend-dot--business" />商业转折</span>
            <span><i className="legend-dot legend-dot--global" />全球化</span>
            <span><i className="legend-dot legend-dot--locked" />地图迷雾</span>
          </div>

          <div className="map-credit">25 个真实地点 · 来源校验 · 章节解锁</div>
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
                <circle className="progress-orbit__value" cx="22" cy="22" r="18" pathLength="100" strokeDasharray={`${readingState.progress} 100`} />
              </svg>
              <strong>{readingState.progress}%</strong>
            </div>
          </section>

          <section className="quest-progress">
            <div className="quest-progress__topline">
              <span>当前章节</span>
              <strong>{readingState.chapterTitle}</strong>
            </div>
            <div className="quest-progress__bar"><span style={{ width: `${readingState.progress}%` }} /></div>
            <div className="quest-progress__meta">
              <span>{readingState.underlineCount} 条划线</span>
              <span>{unlockedIds.length}/{milestones.length} 地点点亮</span>
            </div>
            {nextLocked && <p className="next-stop">下一站：继续阅读，点亮「{nextLocked.chapter}」</p>}
          </section>

          <section className={`milestone-card ${isUnlocked ? 'is-unlocked' : 'is-locked'}`} style={{ '--category-color': selectedCategory.color } as CSSProperties}>
            <div className="milestone-card__header">
              <div>
                <span className="milestone-number">{String(selected.order).padStart(2, '0')}</span>
                <span className="milestone-year">{isUnlocked ? selected.year : '未读章节'}</span>
              </div>
              <span className={`category-pill category-pill--${selected.category}`}>{selectedCategory.label}</span>
              <span className="status-pill">{isUnlocked ? <><Sparkles size={13} /> 已点亮</> : <><Eye size={13} /> 地图迷雾</>}</span>
            </div>
            <div className="milestone-card__place">
              <MapPinned size={18} />
              <div>
                <h3>{isUnlocked ? selected.title : '这个地点还藏在书里'}</h3>
                <p>{isUnlocked ? selected.place : `读到「${selected.chapter}」后揭晓`}</p>
              </div>
            </div>
            <p className="milestone-card__story">
              {isUnlocked ? selected.story : '继续读，等书中线索出现后，它会从地图迷雾里亮起来。'}
            </p>
            {isUnlocked && (
              <div className="source-row">
                <span>{selected.chapter} · {precisionLabel[selected.precision]}</span>
                <a className="source-link" href={selected.source.url} target="_blank" rel="noreferrer">
                  来源：{selected.source.label} <ExternalLink size={12} />
                </a>
              </div>
            )}
            <div className="milestone-card__nav">
              <button type="button" onClick={() => moveSelection(-1)} disabled={visibleIndex <= 0} aria-label="上一个地点"><ChevronLeft size={18} /></button>
              <span>{selectedIndex + 1} / {milestones.length}</span>
              <button type="button" onClick={() => moveSelection(1)} disabled={visibleIndex < 0 || visibleIndex === visibleMilestones.length - 1} aria-label="下一个地点"><ChevronRight size={18} /></button>
            </div>
          </section>

          <section className="timeline" aria-label="探索路线">
            <div className="section-heading">
              <span>探索路线</span>
              <small>{visibleMilestones.length} 个地点 · 横向滑动</small>
            </div>
            <div className="timeline__rail" key={`${category}-${showUnlockedOnly}`}>
              {visibleMilestones.map((milestone) => {
                const unlocked = unlockedIds.includes(milestone.id)
                return (
                  <button
                    type="button"
                    key={milestone.id}
                    className={`${selectedId === milestone.id ? 'is-selected' : ''} ${unlocked ? 'is-unlocked' : 'is-locked'} category-${milestone.category}`}
                    style={{ '--category-color': categoryMeta[milestone.category].color } as CSSProperties}
                    onClick={() => setSelectedId(milestone.id)}
                  >
                    <span className="timeline__index">{String(milestone.order).padStart(2, '0')}</span>
                    <strong>{unlocked ? milestone.year : '···'}</strong>
                    <small>{unlocked ? milestone.shortTitle : '地图迷雾'}</small>
                  </button>
                )
              })}
            </div>
          </section>

          <footer className="footer-note">
            <p>只点亮已经读到、且能由书中内容或可靠公开资料确认的地点。</p>
            <span>上次同步 {readingState.lastReadAt}</span>
          </footer>
        </aside>
      </main>
    </div>
  )
}

export default App
