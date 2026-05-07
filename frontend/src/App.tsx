// App.tsx - 맛집 탐색 앱 (네이버 지도 연동 준비 완료)
import { useState, useEffect, useRef } from 'react'
import './index.css'

// ─── Types ───────────────────────────────────────────────
interface Restaurant {
  id: number
  name: string
  category: string
  address: string
  phone: string
  ratingAvg: number
  location: { lat: number; lng: number }
  distance?: string
  tag?: string
}

// ─── Mock Data (백엔드 연결 전 테스트용) ─────────────────
const MOCK_RESTAURANTS: Restaurant[] = [
  { id: 1, name: '을지로 골뱅이', category: '안주·포차', address: '을지로3가 을지로 152', phone: '02-2264-0123', ratingAvg: 4.8, location: { lat: 37.5665, lng: 126.9920 }, distance: '350m', tag: '인기' },
  { id: 2, name: '광장시장 빈대떡', category: '전통·분식', address: '종로구 창경궁로 88', phone: '02-2267-0621', ratingAvg: 4.6, location: { lat: 37.5699, lng: 126.9994 }, distance: '720m', tag: '맛집' },
  { id: 3, name: '해방촌 이탈리안', category: '양식·파스타', address: '용산구 신흥로 83', phone: '02-790-4231', ratingAvg: 4.5, location: { lat: 37.5468, lng: 126.9890 }, distance: '1.2km', tag: '신규' },
  { id: 4, name: '마포 돼지갈비', category: '고기·구이', address: '마포구 마포대로 155', phone: '02-714-8877', ratingAvg: 4.7, location: { lat: 37.5500, lng: 126.9500 }, distance: '2.1km', tag: '인기' },
  { id: 5, name: '연남동 브런치', category: '카페·브런치', address: '마포구 연남로 3', phone: '02-334-2200', ratingAvg: 4.4, location: { lat: 37.5598, lng: 126.9220 }, distance: '3.0km', tag: '힙' },
  { id: 6, name: '용산 순대국밥', category: '국밥·탕', address: '용산구 한강대로 23', phone: '02-792-0001', ratingAvg: 4.9, location: { lat: 37.5326, lng: 126.9644 }, distance: '1.8km', tag: '맛집' },
]

const CATEGORIES = ['전체', '고기·구이', '국밥·탕', '안주·포차', '전통·분식', '양식·파스타', '카페·브런치']

// ─── Star Rating ──────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <span className="stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={i <= Math.round(rating) ? 'star on' : 'star'}>{i <= Math.round(rating) ? '★' : '☆'}</span>
      ))}
      <span className="rating-num">{rating.toFixed(1)}</span>
    </span>
  )
}

// ─── Restaurant Card ──────────────────────────────────────
function RestaurantCard({ r, selected, onSelect }: { r: Restaurant; selected: boolean; onSelect: () => void }) {
  const tagColor: Record<string, string> = { '인기': '#ff5c5c', '맛집': '#f59e0b', '신규': '#22c55e', '힙': '#a855f7' }
  return (
    <div className={`card ${selected ? 'card--active' : ''}`} onClick={onSelect}>
      <div className="card__header">
        <div>
          <span className="card__name">{r.name}</span>
          {r.tag && <span className="card__tag" style={{ background: tagColor[r.tag] ?? '#888' }}>{r.tag}</span>}
        </div>
        <span className="card__distance">{r.distance}</span>
      </div>
      <div className="card__cat">{r.category}</div>
      <div className="card__footer">
        <Stars rating={r.ratingAvg} />
        <button
          className="card__nav-btn"
          onClick={e => {
            e.stopPropagation()
            const url = `https://map.naver.com/v5/directions/-/-/${encodeURIComponent(r.name)},${r.location.lat},${r.location.lng},,,ADDRESS_ALL/walk`
            window.open(url, '_blank')
          }}
        >
          길찾기 ↗
        </button>
      </div>
    </div>
  )
}

// ─── Map Placeholder (네이버 지도 연동 포인트) ──────────
function MapArea({ selected }: { selected: Restaurant | null }) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 네이버 지도 SDK가 로드된 경우 실제 지도 초기화
    if (typeof window !== 'undefined' && (window as any).naver?.maps) {
      const naver = (window as any).naver
      const center = selected
        ? new naver.maps.LatLng(selected.location.lat, selected.location.lng)
        : new naver.maps.LatLng(37.5665, 126.9780)
      if (mapRef.current) {
        new naver.maps.Map(mapRef.current, { center, zoom: 15 })
      }
    }
  }, [selected])

  return (
    <div className="map-area" ref={mapRef}>
      {/* 네이버 지도 SDK 미로드 시 fallback UI */}
      {!(typeof window !== 'undefined' && (window as any).naver?.maps) && (
        <div className="map-placeholder">
          <div className="map-pin-anim">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="20" r="10" fill="#ff5c5c" opacity="0.9"/>
              <path d="M24 30 L24 44" stroke="#ff5c5c" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="24" cy="20" r="4" fill="white"/>
            </svg>
          </div>
          {selected ? (
            <div className="map-info">
              <p className="map-info__name">{selected.name}</p>
              <p className="map-info__addr">{selected.address}</p>
              <p className="map-info__coord">위도 {selected.location.lat} / 경도 {selected.location.lng}</p>
            </div>
          ) : (
            <p className="map-hint">식당을 선택하면 위치를 볼 수 있어요</p>
          )}
          <p className="map-sdk-note">🗺 네이버 지도 SDK 연동 준비 완료</p>
        </div>
      )}
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────
export default function App() {
  const [restaurants] = useState<Restaurant[]>(MOCK_RESTAURANTS)
  const [selected, setSelected] = useState<Restaurant | null>(null)
  const [category, setCategory] = useState('전체')
  const [search, setSearch] = useState('')

  const filtered = restaurants.filter(r => {
    const matchCat = category === '전체' || r.category === category
    const matchSearch = r.name.includes(search) || r.address.includes(search)
    return matchCat && matchSearch
  })

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header__inner">
          <h1 className="logo">🍜 잇픽</h1>
          <p className="logo__sub">지금 내 주변 맛집 탐색 중</p>
        </div>
      </header>

      {/* Search */}
      <div className="search-bar">
        <input
          className="search-input"
          placeholder="🔍  식당 이름이나 주소로 검색"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="category-scroll">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`cat-btn ${category === cat ? 'cat-btn--active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Layout */}
      <div className="layout">
        {/* Left: List */}
        <aside className="list-panel">
          <p className="list-count">{filtered.length}개의 맛집 발견 🎯</p>
          <div className="list">
            {filtered.length === 0 && (
              <div className="empty">검색 결과가 없어요 😅</div>
            )}
            {filtered.map(r => (
              <RestaurantCard
                key={r.id}
                r={r}
                selected={selected?.id === r.id}
                onSelect={() => setSelected(r)}
              />
            ))}
          </div>
        </aside>

        {/* Right: Map */}
        <main className="map-panel">
          <MapArea selected={selected} />
          {selected && (
            <div className="detail-bar">
              <div>
                <strong>{selected.name}</strong>
                <span className="detail-bar__phone">{selected.phone}</span>
              </div>
              <button
                className="detail-bar__btn"
                onClick={() => {
                  const url = `https://map.naver.com/v5/directions/-/-/${encodeURIComponent(selected.name)},${selected.location.lat},${selected.location.lng},,,ADDRESS_ALL/walk`
                  window.open(url, '_blank')
                }}
              >
                네이버 지도에서 길찾기 ↗
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
