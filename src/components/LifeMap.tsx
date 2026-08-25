import AMapLoader from '@amap/amap-jsapi-loader'
import { useEffect, useRef, useState } from 'react'
import type { Milestone } from '../data/milestones'

declare global {
  interface Window { _AMapSecurityConfig?: { securityJsCode: string } }
}

type Props = {
  milestones: Milestone[]
  unlockedIds: string[]
  selectedId: string
  showUnlockedOnly: boolean
  onSelect: (id: string) => void
}

const key = import.meta.env.VITE_AMAP_JS_KEY as string | undefined
const securityJsCode = import.meta.env.VITE_AMAP_SECURITY_JS_CODE as string | undefined

export function LifeMap({ milestones, unlockedIds, selectedId, showUnlockedOnly, onSelect }: Props) {
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
          center: [114.93, 33.1], zoom: 5, mapStyle: 'amap://styles/whitesmoke',
          viewMode: '2D', showLabel: false, zooms: [3, 18],
        })
        map.addControl(new AMap.Scale({ position: 'LB', offset: [18, 65] }))
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

    const visible = milestones.filter((milestone) => !showUnlockedOnly || unlockedIds.includes(milestone.id))
    const markers = visible.map((milestone) => {
      const unlocked = unlockedIds.includes(milestone.id)
      const chronologicalIndex = milestones.findIndex((item) => item.id === milestone.id)
      const node = document.createElement('button')
      node.type = 'button'
      node.className = `life-marker ${unlocked ? 'is-unlocked' : 'is-locked'} ${selectedId === milestone.id ? 'is-selected' : ''}`
      node.setAttribute('aria-label', `${milestone.year} ${milestone.title}${unlocked ? '，已点亮' : '，待读到'}`)
      node.innerHTML = `<span class="life-marker__flag"><span class="life-marker__number">${String(chronologicalIndex + 1).padStart(2, '0')}</span><span class="life-marker__label">${unlocked ? milestone.mapLabel : '未解锁'}</span></span>`
      node.addEventListener('click', () => onSelectRef.current(milestone.id))
      const marker = new AMap.Marker({
        position: milestone.coordinates, content: node, anchor: 'bottom-center',
        offset: new AMap.Pixel(0, -4), zIndex: selectedId === milestone.id ? 160 : unlocked ? 120 : 90,
      })
      marker.setMap(map)
      return marker
    })

    const unlockedPoints = milestones.filter((milestone) => unlockedIds.includes(milestone.id)).map((milestone) => milestone.coordinates)
    const allPoints = milestones.map((milestone) => milestone.coordinates)
    if (allPoints.length > 1) {
      const futurePath = new AMap.Polyline({
        path: allPoints, strokeColor: '#89848d', strokeOpacity: .4, strokeWeight: 3,
        strokeStyle: 'dashed', strokeDasharray: [5, 8], lineJoin: 'round', zIndex: 50,
      })
      futurePath.setMap(map)
      objectsRef.current.push(futurePath)
    }
    if (unlockedPoints.length > 1) {
      const litPath = new AMap.Polyline({
        path: unlockedPoints, strokeColor: '#e77b65', strokeOpacity: .94, strokeWeight: 5,
        borderWeight: 2, outlineColor: '#fffaf0', lineJoin: 'round', zIndex: 60,
      })
      litPath.setMap(map)
      objectsRef.current.push(litPath)
    }
    objectsRef.current.push(...markers)
    const selected = milestones.find((milestone) => milestone.id === selectedId)
    if (selected) map.panTo(selected.coordinates, 450)
  }, [milestones, selectedId, showUnlockedOnly, status, unlockedIds])

  return (
    <div ref={containerRef} className={`map-canvas ${status === 'loading' ? 'is-loading' : ''} ${status === 'error' ? 'has-error' : ''}`}>
      {status !== 'ready' && (
        <div className="map-fallback">
          <strong>{status === 'loading' ? '地图正在展开…' : '地图暂时迷路了'}</strong>
          <span>{status === 'loading' ? '正在连接高德地图' : '刷新页面再试一次'}</span>
        </div>
      )}
    </div>
  )
}
