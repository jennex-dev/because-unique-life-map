import AMapLoader from '@amap/amap-jsapi-loader'
import { useEffect, useRef, useState } from 'react'
import { categoryMeta, type Milestone, type MilestoneCategory } from '../data/milestones'

declare global {
  interface Window { _AMapSecurityConfig?: { securityJsCode: string } }
}

type CategoryFilter = 'all' | MilestoneCategory

type Props = {
  milestones: Milestone[]
  unlockedIds: string[]
  selectedId: string
  showUnlockedOnly: boolean
  category: CategoryFilter
  onSelect: (id: string) => void
}

const key = import.meta.env.VITE_AMAP_JS_KEY as string | undefined
const securityJsCode = import.meta.env.VITE_AMAP_SECURITY_JS_CODE as string | undefined

export function LifeMap({ milestones, unlockedIds, selectedId, showUnlockedOnly, category, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const objectsRef = useRef<any[]>([])
  const onSelectRef = useRef(onSelect)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => { onSelectRef.current = onSelect }, [onSelect])

  useEffect(() => {
    if (!containerRef.current || !key || !securityJsCode) {
      setStatus('error')
      return
    }
    let cancelled = false
    window._AMapSecurityConfig = { securityJsCode }
    AMapLoader.load({ key, version: '2.0', plugins: ['AMap.Scale', 'AMap.ToolBar'] })
      .then((AMap: any) => {
        if (cancelled || !containerRef.current) return
        const map = new AMap.Map(containerRef.current, {
          center: [114.93, 33.1], zoom: 4.6, mapStyle: 'amap://styles/whitesmoke',
          viewMode: '2D', showLabel: false, zooms: [2, 18], animateEnable: true,
        })
        map.addControl(new AMap.Scale({ position: 'LB', offset: [18, 72] }))
        mapRef.current = map
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
    return () => {
      cancelled = true
      mapRef.current?.destroy()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map || status !== 'ready') return
    const AMap = (window as any).AMap
    if (!AMap) return
    for (const object of objectsRef.current) map.remove(object)
    objectsRef.current = []

    const visible = milestones.filter((milestone) =>
      (category === 'all' || milestone.category === category)
      && (!showUnlockedOnly || unlockedIds.includes(milestone.id)))

    const markers = visible.map((milestone) => {
      const unlocked = unlockedIds.includes(milestone.id)
      const selected = selectedId === milestone.id
      const node = document.createElement('button')
      node.type = 'button'
      node.className = `life-marker category-${milestone.category} ${unlocked ? 'is-unlocked' : 'is-locked'} ${selected ? 'is-selected' : ''}`
      node.style.setProperty('--marker-color', categoryMeta[milestone.category].color)
      node.setAttribute('aria-label', unlocked ? `${milestone.year} ${milestone.title}，已点亮` : `第 ${milestone.order} 站，地图迷雾`)
      node.innerHTML = unlocked
        ? `<span class="life-marker__flag"><span class="life-marker__number">${String(milestone.order).padStart(2, '0')}</span><span class="life-marker__label">${milestone.mapLabel}</span></span>`
        : `<span class="life-marker__fog"><span>${String(milestone.order).padStart(2, '0')}</span></span>`
      node.addEventListener('click', () => onSelectRef.current(milestone.id))
      const marker = new AMap.Marker({
        position: milestone.coordinates,
        content: node,
        anchor: 'bottom-center',
        offset: new AMap.Pixel(0, -4),
        zIndex: selected ? 180 : unlocked ? 130 : 80,
      })
      marker.setMap(map)
      return marker
    })

    const categories = category === 'all'
      ? (Object.keys(categoryMeta) as MilestoneCategory[])
      : [category]

    for (const categoryKey of categories) {
      const categoryPoints = milestones
        .filter((milestone) => milestone.category === categoryKey)
        .map((milestone) => milestone.coordinates)
      const unlockedPoints = milestones
        .filter((milestone) => milestone.category === categoryKey && unlockedIds.includes(milestone.id))
        .map((milestone) => milestone.coordinates)

      if (!showUnlockedOnly && categoryPoints.length > 1) {
        const futurePath = new AMap.Polyline({
          path: categoryPoints,
          strokeColor: categoryMeta[categoryKey].color,
          strokeOpacity: .24,
          strokeWeight: 2,
          strokeStyle: 'dashed',
          strokeDasharray: [4, 9],
          lineJoin: 'round',
          zIndex: 45,
        })
        futurePath.setMap(map)
        objectsRef.current.push(futurePath)
      }
      if (unlockedPoints.length > 1) {
        const litPath = new AMap.Polyline({
          path: unlockedPoints,
          strokeColor: categoryMeta[categoryKey].color,
          strokeOpacity: .92,
          strokeWeight: 5,
          borderWeight: 2,
          outlineColor: '#fffdf7',
          lineJoin: 'round',
          zIndex: 60,
        })
        litPath.setMap(map)
        objectsRef.current.push(litPath)
      }
    }

    objectsRef.current.push(...markers)
    if (visible.length > 1 && category !== 'all') {
      map.setFitView(markers, false, [100, 80, 100, 80], 12)
    } else if (category === 'all') {
      map.setZoomAndCenter(4.6, [114.93, 33.1], false)
    } else {
      const selected = visible.find((milestone) => milestone.id === selectedId)
      if (selected) map.panTo(selected.coordinates, 450)
    }
  }, [category, milestones, selectedId, showUnlockedOnly, status, unlockedIds])

  return (
    <div ref={containerRef} className={`map-canvas ${status === 'loading' ? 'is-loading' : ''} ${status === 'error' ? 'has-error' : ''}`}>
      <div className="map-vignette" aria-hidden="true" />
      {status !== 'ready' && (
        <div className="map-fallback">
          <strong>{status === 'loading' ? '地图正在展开…' : '地图暂时迷路了'}</strong>
          <span>{status === 'loading' ? '正在连接高德地图' : '刷新页面再试一次'}</span>
        </div>
      )}
    </div>
  )
}
