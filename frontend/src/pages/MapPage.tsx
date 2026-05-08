<<<<<<< HEAD
=======
// ============================================================
// src/pages/MapPage.tsx
// 핵심 수정: NaverMap은 전체 RESTAURANTS를 딱 한 번만 받음
// 필터는 마커 show/hide로 처리 → 지도가 사라지지 않음
// ============================================================
>>>>>>> LSS
import { useState, useEffect, useRef, useCallback } from 'react'
import type { Restaurant } from '../types/restaurant'

// ✅ 1. 백엔드 Enum과 매핑되는 카테고리 설정 (UI 한글 : 서버 영문)
const CATEGORY_MAP: Record<string, string> = {
  '전체': 'ALL',
  '비건': 'VEGAN',
  '괴식': 'BIZARRE',
  '이국요리': 'EXOTIC',
  '컬쳐물': 'CULTURE',
  '유명셰프': 'FAMOUS_CHEF',
  '미슐랭': 'MICHELIN',
  '세계주류': 'WORLD_LIQUOR',
  '테마': 'THEME',
  '동물': 'ANIMAL'
};
const CATS = Object.keys(CATEGORY_MAP);

// ✅ 2. 길찾기 URL 수정 (r.location.lat -> r.lat)
function getNaverNavUrl(r: Restaurant) {
  return `https://map.naver.com/v5/directions/-/-/${encodeURIComponent(r.name)},${r.lat},${r.lng},,,ADDRESS_ALL/walk`
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="stars">
      {[1, 2, 3, 4, 5].map(i => (
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
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<Record<number, any>>({})
  const infoWindowRef = useRef<any>(null)
  const initializedRef = useRef(false)

<<<<<<< HEAD
  // 지도 초기화
  useEffect(() => {
=======
  // 지도 + 전체 마커 최초 1회만 초기화
  useEffect(() => {
    if (initializedRef.current) return
>>>>>>> LSS
    let attempts = 0
    const timer = setInterval(() => {
      attempts++
      const naver = (window as any).naver
      if (naver?.maps && containerRef.current) {
        clearInterval(timer)
<<<<<<< HEAD
        if (!mapRef.current) {
          mapRef.current = new naver.maps.Map(containerRef.current, {
            center: new naver.maps.LatLng(35.1795, 129.0756), // ✅ 초기 중심점 (부산)
            zoom: 13,
          })
        }
      } else if (attempts > 50) {
        clearInterval(timer)
=======
        initializedRef.current = true
        initMap(naver)
      } else if (attempts > 50) {
        clearInterval(timer)
        console.error('네이버 지도 SDK 로드 실패')
>>>>>>> LSS
      }
    }, 100)
    return () => clearInterval(timer)
  }, []) // ✅ 빈 배열 — 최초 1회만 실행

  // ✅ 3. 데이터가 변경될 때마다 마커를 새로 그리는 로직 추가
  useEffect(() => {
    const naver = (window as any).naver
    if (!naver || !mapRef.current) return

    // 기존 마커 제거
    Object.values(markersRef.current).forEach((m: any) => m.marker.setMap(null))
    markersRef.current = {}

<<<<<<< HEAD
    // 새 마커 생성
    restaurants.forEach(r => {
=======
    // 전체 식당 마커 한 번에 생성
    RESTAURANTS.forEach(r => {
>>>>>>> LSS
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(r.lat, r.lng), // ✅ r.lat, r.lng 사용
        map: mapRef.current,
        title: r.name,
      })

      const infoWindow = new naver.maps.InfoWindow({
        content: `
          <div style="padding:10px 14px;min-width:150px;font-family:sans-serif">
            <div style="font-weight:700;font-size:13px;margin-bottom:3px">${r.name}</div>
            <div style="font-size:11px;color:#666;margin-bottom:4px">${r.category}</div>
            <div style="font-size:11px;color:#F59E0B">★ ${r.avgPrice ? "평균 "+r.avgPrice : "정보없음"}</div>
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

      markersRef.current[r.restId] = { marker, infoWindow } // ✅ r.restId 사용
    })
  }, [restaurants, onSelect])

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
    const pos = new naver.maps.LatLng(selected.lat, selected.lng) // ✅ selected.lat 사용
    mapRef.current.panTo(pos)
    mapRef.current.setZoom(16, true)
    const m = markersRef.current[selected.restId]
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
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]); // ✅ 서버 데이터를 담을 상태
  const [selected, setSelected] = useState<Restaurant | null>(null)
  const [category, setCategory] = useState('전체')
  const [search, setSearch] = useState('')
  const [listOpen, setListOpen] = useState(false)

  // ✅ 4. 백엔드 데이터 Fetch 로직
  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverCat = CATEGORY_MAP[category];
        const url = serverCat === 'ALL' 
          ? '/api/restaurants' 
          : `/api/restaurants/category/${serverCat}`;

        const response = await fetch(url);
        const result = await response.json();
        
        // 스프링 Page 객체이므로 content 배열을 추출하여 저장
        setRestaurants(result.content || []);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    };
    fetchData();
  }, [category]);

  // ✅ 5. 서버에서 가져온 리스트를 검색어로 필터링
  const filtered = restaurants.filter(r =>
    (r.name.includes(search) || r.address.includes(search))
  )

  // ✅ id 배열만 전달 — 배열 참조가 바뀌어도 NaverMap은 리마운트 안 됨
  const filteredIds = filtered.map(r => r.id)

  const handleSelect = useCallback((r: Restaurant) => {
    setSelected(prev => prev?.restId === r.restId ? null : r)
    setListOpen(false)
  }, [])

  return (
    <div className="map-page">
      <div className="map-topbar">
        <div className="search-box">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
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
        <aside className={`list-panel ${listOpen ? 'open' : ''}`}>
          <p className="list-meta">{filtered.length}개 발견됨</p>
          <div className="list">
            {filtered.length === 0 && <div className="empty">검색 결과가 없어요 😅</div>}
            {filtered.map(r => (
              <div
                key={r.restId}
                className={`card ${selected?.restId === r.restId ? 'card--active' : ''}`}
                onClick={() => handleSelect(r)}
              >
                <div className="card__top">
                  <div className="card__title-row">
                    <span className="card__name">{r.name}</span>
                    {/* r.tags가 있을 경우 첫번째 태그 표시 예시 */}
                    {r.tags && r.tags.length > 0 && <span className="card__tag" style={{ background: '#E53E3E' }}>{r.tags[0].customTag}</span>}
                  </div>
                </div>
                <div className="card__cat">{r.category} · {r.address.slice(0, 15)}…</div>
                <div className="card__bottom">
                  {/* 별점 대신 평균 가격 표시 혹은 고정 별점 */}
                  <Stars rating={4.5} /> 
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
                <div className="map-sel-addr">{selected.address}</div>
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