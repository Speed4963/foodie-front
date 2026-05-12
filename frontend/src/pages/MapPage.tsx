import { useState, useEffect, useRef, useCallback } from 'react'
import { restaurantService } from '../services/restaurantService'
import type { Restaurant } from '../types/restaurant'

// ─── 카테고리 필터 탭 ────────────────────────────────────────
const CAT_TABS = [
  { label: '전체',     value: '' },
  { label: '🥩 고기',  value: 'MEAT' },
  { label: '🍲 국밥',  value: 'SOUP' },
  { label: '🍺 포차',  value: 'BIZARRE' },
  { label: '☕ 카페',  value: 'CULTURE' },
  { label: '🍣 일식',  value: 'EXOTIC' },
  { label: '⭐ 미슐랭',value: 'MICHELIN' },
  { label: '👨‍🍳 셰프',  value: 'FAMOUS_CHEF' },
]

// ─── 별점 컴포넌트 ───────────────────────────────────────────
function Stars({ rating = 0, size = 11 }: { rating?: number; size?: number }) {
  return (
    <span style={{ display:'flex', alignItems:'center', gap:1, fontSize:size }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#FAB700' : '#E0E0E0' }}>★</span>
      ))}
    </span>
  )
}

// ─── 네이버 지도 마커 SVG ────────────────────────────────────
function makeMarkerHtml(name: string, selected: boolean) {
  const bg = selected ? '#E8272A' : '#FFFFFF'
  const color = selected ? '#FFFFFF' : '#E8272A'
  const border = selected ? '#B01E20' : '#E8272A'
  const shadow = selected ? '0 4px 12px rgba(232,39,42,0.45)' : '0 2px 8px rgba(0,0,0,0.18)'
  return `
    <div style="position:relative; display:flex;flex-direction:column;align-items:center; cursor:pointer;">
      <div style="background:${bg}; color:${color}; border:2px solid ${border}; border-radius:${selected ? '20px' : '16px'}; padding:${selected ? '5px 10px' : '4px 9px'}; font-size:${selected ? '12px' : '11px'}; font-weight:700; font-family:'Noto Sans KR',sans-serif; white-space:nowrap; box-shadow:${shadow}; transition:all 0.15s; max-width:120px; overflow:hidden; text-overflow:ellipsis;">${name}</div>
      <div style="width:0;height:0; border-left:5px solid transparent; border-right:5px solid transparent; border-top:6px solid ${border}; margin-top:-1px;"></div>
    </div>
  `
}

// ─── 네이버 지도 컴포넌트 ────────────────────────────────────
function NaverMap({ restaurants, selected, onSelect }: {
  restaurants: Restaurant[]
  selected: Restaurant | null
  onSelect: (r: Restaurant) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<Record<number, any>>({})
  const infoWindowRef = useRef<any>(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (initializedRef.current) return
    const naver = (window as any).naver
    if (naver?.maps && containerRef.current) {
      initializedRef.current = true
      const map = new naver.maps.Map(containerRef.current, {
        center: new naver.maps.LatLng(37.5560, 126.9720),
        zoom: 13,
      })
      mapRef.current = map
    }
  }, [])

  useEffect(() => {
    const naver = (window as any).naver
    if (!naver?.maps || !mapRef.current) return
    Object.values(markersRef.current).forEach((m: any) => m.marker.setMap(null))
    markersRef.current = {}

    restaurants.forEach(r => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(r.lat, r.lng),
        map: mapRef.current,
        icon: {
          content: makeMarkerHtml(r.name, false),
          anchor: new naver.maps.Point(60, 42),
        },
        zIndex: 100,
      })

      const infoWindow = new naver.maps.InfoWindow({
        content: `<div style="padding:12px; min-width:150px;"><b>${r.name}</b><br/><small>${r.category}</small></div>`,
        borderWidth: 0,
        disableAutoPan: false,
      })

      // ✅ 마커 클릭 시 onSelect 호출
      naver.maps.Event.addListener(marker, 'click', () => {
        onSelect(r) 
      })

      markersRef.current[r.restId] = { marker, infoWindow }
    })
  }, [restaurants, onSelect])

  useEffect(() => {
    const naver = (window as any).naver
    if (!naver?.maps || !selected) return
    
    // 선택된 마커 강조 및 이동
    mapRef.current.panTo(new naver.maps.LatLng(selected.lat, selected.lng), { duration: 300 })
    
    // 이전 인포윈도우 닫기
    if (infoWindowRef.current) infoWindowRef.current.close()
    
    const m = markersRef.current[selected.restId]
    if (m) {
      m.infoWindow.open(mapRef.current, m.marker)
      infoWindowRef.current = m.infoWindow
    }
  }, [selected])

  return <div ref={containerRef} style={{ width:'100%', height:'100%' }} />
}

// ─── 식당 카드 컴포넌트 ──────────────────────────────────────────
function RestaurantCard({ r, selected, onClick }: { r: Restaurant; selected: boolean; onClick: () => void }) {
  const thumb = r.images?.[0]?.thumbUrl || r.images?.[0]?.imgUrl
  return (
    <div className={`mp-card ${selected ? 'mp-card--active' : ''}`} onClick={onClick}>
      <div className="mp-card__thumb">
        {thumb ? <img src={thumb} alt={r.name} /> : <div className="mp-card__thumb-empty">🍽️</div>}
      </div>
      <div className="mp-card__body">
        <div className="mp-card__name">{r.name}</div>
        <div className="mp-card__cat">{r.category} · {r.address.slice(0,10)}...</div>
        <div className="mp-card__footer"><Stars rating={4.5} /><button className="mp-card__nav">길찾기</button></div>
      </div>
    </div>
  )
}

// ─── 상세 패널 컴포넌트 ──────────────────────────────────────────
function DetailPanel({ r, onClose }: { r: Restaurant; onClose: () => void }) {
  return (
    <div className="mp-detail">
      <div className="mp-detail__header">
        <div className="mp-detail__name">{r.name}</div>
        <button className="mp-detail__close" onClick={onClose}>✕</button>
      </div>
      <div className="mp-detail__content">
        <p>📍 {r.address}</p>
        <p>💰 평균 {r.avgPrice.toLocaleString()}원</p>
        <button className="mp-detail__nav-btn" onClick={() => window.open(`https://map.naver.com/v5/directions/-/-/${encodeURIComponent(r.name)},${r.lat},${r.lng},,,ADDRESS_ALL/walk`, '_blank')}>
          네이버 지도 길찾기 ↗
        </button>
      </div>
    </div>
  )
}

// ─── 메인 MapPage ───────────────────────────────────────────────
export default function MapPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [selected, setSelected] = useState<Restaurant | null>(null)
  const [category, setCategory] = useState('')
  const [listOpen, setListOpen] = useState(false)

  useEffect(() => {
    restaurantService.getNearbyRestaurants().then(setRestaurants).catch(console.error)
  }, [])

  const filtered = restaurants.filter(r => !category || r.category === category)

  const handleSelect = useCallback((r: Restaurant) => {
    setSelected(r)
    // ✅ 마커 클릭 시 리스트 패널(바텀시트)은 닫고 상세 패널이 보이게 함
    setListOpen(false) 
  }, [])

  return (
    <div className="mp-root">
      <div className="mp-topbar">
        <div className="mp-cat-tabs">
          {CAT_TABS.map(tab => (
            <button key={tab.value} className={`mp-cat-tab ${category === tab.value ? 'on' : ''}`} onClick={() => setCategory(tab.value)}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mp-body">
        <aside className={`mp-list-panel ${listOpen ? 'open' : ''}`}>
          <div className="mp-list-handle" onClick={() => setListOpen(!listOpen)} />
          <div className="mp-list">
            {filtered.map(r => (
              <RestaurantCard key={r.restId} r={r} selected={selected?.restId === r.restId} onClick={() => handleSelect(r)} />
            ))}
          </div>
        </aside>

        <main className="mp-map">
          <NaverMap restaurants={filtered} selected={selected} onSelect={handleSelect} />
          
          {/* ✅ 선택된 식당이 있을 때만 상세 패널 표시 */}
          {selected && (
            <div className="mp-detail-wrap">
              <DetailPanel r={selected} onClose={() => setSelected(null)} />
            </div>
          )}
          
          <button className="mp-mobile-toggle" onClick={() => setListOpen(!listOpen)}>
            {listOpen ? '지도 보기' : '목록 보기'}
          </button>
        </main>
      </div>
    </div>
  )
}