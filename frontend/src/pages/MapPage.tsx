// ============================================================
// src/pages/MapPage.tsx
// 핵심 수정: NaverMap은 전체 RESTAURANTS를 딱 한 번만 받음
// 필터는 마커 show/hide로 처리 → 지도가 사라지지 않음
// ============================================================
import { useState, useEffect, useRef, useCallback } from 'react'

interface Restaurant {
  id: number; name: string; category: string; address: string
  phone: string; ratingAvg: number; location: { lat: number; lng: number }
  distance?: string; tag?: string; tagColor?: string
}

const RESTAURANTS: Restaurant[] = [
  { id:1, name:'을지로 골뱅이',   category:'안주·포차',   address:'을지로3가 을지로 152',  phone:'02-2264-0123', ratingAvg:4.8, location:{lat:37.5665,lng:126.9920}, distance:'350m',  tag:'인기',   tagColor:'#E53E3E' },
  { id:2, name:'광장시장 빈대떡', category:'전통·분식',   address:'종로구 창경궁로 88',     phone:'02-2267-0621', ratingAvg:4.6, location:{lat:37.5699,lng:126.9994}, distance:'720m',  tag:'맛집',   tagColor:'#D69E2E' },
  { id:3, name:'해방촌 이탈리안', category:'양식·파스타', address:'용산구 신흥로 83',        phone:'02-790-4231',  ratingAvg:4.5, location:{lat:37.5468,lng:126.9890}, distance:'1.2km', tag:'신규',   tagColor:'#2F855A' },
  { id:4, name:'마포 돼지갈비',   category:'고기·구이',   address:'마포구 마포대로 155',     phone:'02-714-8877',  ratingAvg:4.7, location:{lat:37.5500,lng:126.9500}, distance:'2.1km', tag:'인기',   tagColor:'#E53E3E' },
  { id:5, name:'연남동 브런치',   category:'카페·브런치', address:'마포구 연남로 3',          phone:'02-334-2200',  ratingAvg:4.4, location:{lat:37.5598,lng:126.9220}, distance:'3.0km', tag:'힙',     tagColor:'#6B46C1' },
  { id:6, name:'용산 순대국밥',   category:'국밥·탕',     address:'용산구 한강대로 23',       phone:'02-792-0001',  ratingAvg:4.9, location:{lat:37.5326,lng:126.9644}, distance:'1.8km', tag:'찐맛집', tagColor:'#C05621' },
]

const CATS = ['전체','고기·구이','국밥·탕','안주·포차','전통·분식','양식·파스타','카페·브런치']

function getNaverNavUrl(r: Restaurant) {
  return `https://map.naver.com/v5/directions/-/-/${encodeURIComponent(r.name)},${r.location.lat},${r.location.lng},,,ADDRESS_ALL/walk`
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#F59E0B' : '#E0E0E0' }}>★</span>
      ))}
      <span className="rating-num">{rating.toFixed(1)}</span>
    </span>
  )
}

// ─── 네이버 지도 컴포넌트 ────────────────────────────────────
// ✅ filteredIds, selected만 prop으로 받음
// ✅ 전체 마커는 최초 1회만 생성, 필터는 show/hide로 처리
function NaverMap({ filteredIds, selected, onSelect }: {
  filteredIds: number[]
  selected: Restaurant | null
  onSelect: (r: Restaurant) => void
}) {
  const containerRef  = useRef<HTMLDivElement>(null)
  const mapRef        = useRef<any>(null)
  const markersRef    = useRef<Record<number, any>>({})
  const infoWindowRef = useRef<any>(null)
  const initializedRef = useRef(false)

  // 지도 + 전체 마커 최초 1회만 초기화
  useEffect(() => {
    if (initializedRef.current) return
    let attempts = 0
    const timer = setInterval(() => {
      attempts++
      const naver = (window as any).naver
      if (naver?.maps && containerRef.current) {
        clearInterval(timer)
        initializedRef.current = true
        initMap(naver)
      } else if (attempts > 50) {
        clearInterval(timer)
        console.error('네이버 지도 SDK 로드 실패')
      }
    }, 100)
    return () => clearInterval(timer)
  }, []) // ✅ 빈 배열 — 최초 1회만 실행

  function initMap(naver: any) {
    if (!containerRef.current) return

    mapRef.current = new naver.maps.Map(containerRef.current, {
      center: new naver.maps.LatLng(37.5560, 126.9720),
      zoom: 13,
    })

    // 전체 식당 마커 한 번에 생성
    RESTAURANTS.forEach(r => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(r.location.lat, r.location.lng),
        map: mapRef.current,
        title: r.name,
      })

      const infoWindow = new naver.maps.InfoWindow({
        content: `
          <div style="padding:10px 14px;min-width:150px;font-family:sans-serif">
            <div style="font-weight:700;font-size:13px;margin-bottom:3px">${r.name}</div>
            <div style="font-size:11px;color:#666;margin-bottom:4px">${r.category}</div>
            <div style="font-size:11px;color:#F59E0B">${'★'.repeat(Math.round(r.ratingAvg))} ${r.ratingAvg.toFixed(1)}</div>
          </div>
        `,
        borderWidth: 0,
        borderRadius: '8px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
      })

      naver.maps.Event.addListener(marker, 'click', () => {
        if (infoWindowRef.current) infoWindowRef.current.close()
        infoWindow.open(mapRef.current, marker)
        infoWindowRef.current = infoWindow
        onSelect(r)
      })

      markersRef.current[r.id] = { marker, infoWindow }
    })
  }

  // 필터 변경 시 마커 show/hide (지도 재생성 없음)
  useEffect(() => {
    const naver = (window as any).naver
    if (!naver?.maps || !mapRef.current) return
    RESTAURANTS.forEach(r => {
      const m = markersRef.current[r.id]
      if (!m) return
      const visible = filteredIds.includes(r.id)
      m.marker.setMap(visible ? mapRef.current : null)
    })
  }, [filteredIds])

  // 선택된 식당으로 지도 이동
  useEffect(() => {
    const naver = (window as any).naver
    if (!naver?.maps || !mapRef.current || !selected) return
    const pos = new naver.maps.LatLng(selected.location.lat, selected.location.lng)
    mapRef.current.panTo(pos)
    mapRef.current.setZoom(16, true)
    const m = markersRef.current[selected.id]
    if (m) {
      if (infoWindowRef.current) infoWindowRef.current.close()
      m.infoWindow.open(mapRef.current, m.marker)
      infoWindowRef.current = m.infoWindow
    }
  }, [selected])

  return (
    <div className="map-wrapper">
      <div ref={containerRef} className="naver-map-container" />
    </div>
  )
}

// ─── MapPage ────────────────────────────────────────────────
export default function MapPage() {
  const [selected, setSelected] = useState<Restaurant | null>(null)
  const [category, setCategory] = useState('전체')
  const [search, setSearch]     = useState('')
  const [listOpen, setListOpen] = useState(false)

  const filtered = RESTAURANTS.filter(r =>
    (category === '전체' || r.category === category) &&
    (r.name.includes(search) || r.address.includes(search))
  )

  // ✅ id 배열만 전달 — 배열 참조가 바뀌어도 NaverMap은 리마운트 안 됨
  const filteredIds = filtered.map(r => r.id)

  const handleSelect = useCallback((r: Restaurant) => {
    setSelected(prev => prev?.id === r.id ? null : r)
    setListOpen(false)
  }, [])

  return (
    <div className="map-page">
      <div className="map-topbar">
        <div className="search-box">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            className="search-input"
            placeholder="식당 이름 또는 주소 검색"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button className="search-clear" onClick={() => setSearch('')}>✕</button>}
        </div>
        <div className="cat-bar">
          {CATS.map(cat => (
            <button key={cat} className={`cat-chip ${category === cat ? 'on' : ''}`} onClick={() => setCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="map-body">
        {/* 왼쪽: 식당 리스트 */}
        <aside className={`list-panel ${listOpen ? 'open' : ''}`}>
          <p className="list-meta">{filtered.length}개 발견됨</p>
          <div className="list">
            {filtered.length === 0 && <div className="empty">검색 결과가 없어요 😅</div>}
            {filtered.map(r => (
              <div
                key={r.id}
                className={`card ${selected?.id === r.id ? 'card--active' : ''}`}
                onClick={() => handleSelect(r)}
              >
                <div className="card__top">
                  <div className="card__title-row">
                    <span className="card__name">{r.name}</span>
                    {r.tag && <span className="card__tag" style={{ background: r.tagColor }}>{r.tag}</span>}
                  </div>
                  <span className="card__dist">{r.distance}</span>
                </div>
                <div className="card__cat">{r.category} · {r.address.slice(0, 11)}…</div>
                <div className="card__bottom">
                  <Stars rating={r.ratingAvg} />
                  <button
                    className="card__nav-btn"
                    onClick={e => { e.stopPropagation(); window.open(getNaverNavUrl(r), '_blank') }}
                  >
                    길찾기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* 오른쪽: 네이버 지도 */}
        <main className="map-panel">
          {/* ✅ filteredIds와 selected만 전달 — restaurants prop 제거 */}
          <NaverMap
            filteredIds={filteredIds}
            selected={selected}
            onSelect={handleSelect}
          />
          {selected && (
            <div className="map-sel-bar show">
              <div>
                <div className="map-sel-name">{selected.name}</div>
                <div className="map-sel-addr">{selected.address} · {selected.phone}</div>
              </div>
              <button className="btn-naver" onClick={() => window.open(getNaverNavUrl(selected), '_blank')}>
                네이버 지도 길찾기 ↗
              </button>
            </div>
          )}
          <button className="mobile-list-toggle" onClick={() => setListOpen(v => !v)}>
            {listOpen ? '지도 보기 🗺' : `목록 보기 (${filtered.length})`}
          </button>
        </main>
      </div>
    </div>
  )
}