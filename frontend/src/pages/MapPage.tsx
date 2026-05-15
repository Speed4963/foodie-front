// ============================================================
// src/pages/MapPage.tsx
// 마커 클릭 → 사이드바 상세정보 (네이버 지도 스타일)
// 백엔드: GET /api/restaurants, GET /api/restaurants/{id}
// ============================================================
import { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import type { Restaurant } from '../types/restaurant'

// ─── API 클라이언트 ──────────────────────────────────────────
const api = axios.create({ baseURL: '/api' })

const restaurantApi = {
  // 전체 목록 (목록용 — lat/lng 포함된 기본 DTO)
  getList: (category?: string, keyword?: string, page = 0, size = 100) => {
    if (category && category !== 'ALL') {
      return api.get<{ content: Restaurant[] }>(`/restaurants/category/${category}`, {
        params: { page, size }
      })
    }
    return api.get<{ content: Restaurant[] }>('/restaurants', {
      params: { searchKeyword: keyword, page, size }
    })
  },
  // 단건 상세 (메뉴, 이미지, 태그 포함)
  getDetail: (id: number) =>
    api.get<Restaurant>(`/restaurants/${id}`)
}

// ─── 카테고리 탭 ─────────────────────────────────────────────
const CAT_TABS = [
  { label: '전체',      value: 'ALL' },
  { label: '🥩 고기',   value: 'MEAT' },
  { label: '🍲 국밥',   value: 'SOUP' },
  { label: '🍺 포차',   value: 'BIZARRE' },
  { label: '☕ 카페',   value: 'CULTURE' },
  { label: '🍣 일식',   value: 'EXOTIC' },
  { label: '⭐ 미슐랭', value: 'MICHELIN' },
  { label: '👨‍🍳 셰프',   value: 'FAMOUS_CHEF' },
]

// ─── 별점 ────────────────────────────────────────────────────
function Stars({ rating = 4.5, size = 12 }: { rating?: number; size?: number }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: size }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#FAB700' : '#E0E0E0' }}>★</span>
      ))}
    </span>
  )
}

// ─── 마커 HTML ───────────────────────────────────────────────
function makeMarkerHtml(name: string, active: boolean) {
  const bg     = active ? '#E8272A' : '#FFFFFF'
  const color  = active ? '#FFFFFF' : '#E8272A'
  const border = active ? '#B01E20' : '#E8272A'
  const shadow = active ? '0 4px 14px rgba(232,39,42,.5)' : '0 2px 8px rgba(0,0,0,.2)'
  const scale  = active ? 'scale(1.12)' : 'scale(1)'
  return `
    <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;transform:${scale};transition:transform .15s">
      <div style="
        background:${bg};color:${color};border:2px solid ${border};
        border-radius:20px;padding:5px 11px;
        font-size:12px;font-weight:700;
        font-family:'Noto Sans KR',sans-serif;
        white-space:nowrap;max-width:130px;overflow:hidden;text-overflow:ellipsis;
        box-shadow:${shadow};
      ">${name}</div>
      <div style="width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:6px solid ${border};margin-top:-1px"></div>
    </div>`
}

// ─── 네이버 지도 ─────────────────────────────────────────────
interface NaverMapProps {
  restaurants: Restaurant[]
  selectedId: number | null
  onMarkerClick: (r: Restaurant) => void
}

function NaverMap({ restaurants, selectedId, onMarkerClick }: NaverMapProps) {
  const containerRef   = useRef<HTMLDivElement>(null)
  const mapRef         = useRef<any>(null)
  const markersRef     = useRef<Record<number, any>>({})
  const infoWindowRef  = useRef<any>(null)
  const readyRef       = useRef(false)

  // 지도 초기화 (1회)
  useEffect(() => {
    if (readyRef.current) return
    let count = 0
    const t = setInterval(() => {
      count++
      const naver = (window as any).naver
      if (naver?.maps && containerRef.current) {
        clearInterval(t)
        readyRef.current = true
        mapRef.current = new naver.maps.Map(containerRef.current, {
          center: new naver.maps.LatLng(37.5560, 126.9720),
          zoom: 13,
          mapTypeControl: false,
          scaleControl: true,
        })
      } else if (count > 60) clearInterval(t)
    }, 100)
    return () => clearInterval(t)
  }, [])

  // 마커 갱신 (restaurants 변경 시)
  useEffect(() => {
    const naver = (window as any).naver
    if (!naver?.maps || !mapRef.current) return

    // 기존 마커 제거
    Object.values(markersRef.current).forEach((m: any) => m.marker.setMap(null))
    markersRef.current = {}

    restaurants.forEach(r => {
      if (!r.lat || !r.lng) return

      const isActive = r.restId === selectedId
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(Number(r.lat), Number(r.lng)),
        map: mapRef.current,
        icon: {
          content: makeMarkerHtml(r.name, isActive),
          anchor: new naver.maps.Point(65, 44),
        },
        zIndex: isActive ? 200 : 100,
      })

      naver.maps.Event.addListener(marker, 'click', () => {
        onMarkerClick(r)
      })

      markersRef.current[r.restId] = { marker }
    })
  }, [restaurants])

  // 선택 마커 강조 업데이트
  useEffect(() => {
    const naver = (window as any).naver
    if (!naver?.maps || !mapRef.current) return

    restaurants.forEach(r => {
      const m = markersRef.current[r.restId]
      if (!m) return
      const isActive = r.restId === selectedId
      m.marker.setIcon({
        content: makeMarkerHtml(r.name, isActive),
        anchor: new naver.maps.Point(65, 44),
      })
      m.marker.setZIndex(isActive ? 200 : 100)
    })

    // 선택 식당으로 지도 이동
    if (selectedId) {
      const r = restaurants.find(x => x.restId === selectedId)
      if (r && mapRef.current) {
        if (infoWindowRef.current) { infoWindowRef.current.close(); infoWindowRef.current = null }
        mapRef.current.panTo(new naver.maps.LatLng(Number(r.lat), Number(r.lng)), { duration: 300 })
      }
    }
  }, [selectedId, restaurants])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}

// ─── 식당 목록 카드 ──────────────────────────────────────────
function RestaurantCard({ r, active, onClick }: {
  r: Restaurant; active: boolean; onClick: () => void
}) {
  const thumb = r.images?.[0]?.thumbUrl || r.images?.[0]?.imgUrl
  return (
    <div className={`mp-card ${active ? 'mp-card--active' : ''}`} onClick={onClick}>
      <div className="mp-card__thumb">
        {thumb
          ? <img src={thumb} alt={r.name} />
          : <div className="mp-card__thumb-empty">🍽️</div>
        }
      </div>
      <div className="mp-card__body">
        <div className="mp-card__name">{r.name}</div>
        <div className="mp-card__cat">{r.category}</div>
        <div className="mp-card__addr">{r.address}</div>
        {r.avgPrice > 0 && (
          <div className="mp-card__price">평균 {r.avgPrice?.toLocaleString()}원</div>
        )}
        <div className="mp-card__footer">
          <Stars size={11} />
        </div>
      </div>
    </div>
  )
}

// ─── 식당 상세 패널 (사이드바 안에 표시) ─────────────────────
function DetailPanel({ r, onBack }: { r: Restaurant; onBack: () => void }) {
  const navUrl = `https://map.naver.com/v5/directions/-/-/${encodeURIComponent(r.name)},${r.lat},${r.lng},,,ADDRESS_ALL/walk`

  return (
    <div className="mp-detail-side">
      {/* 헤더 */}
      <div className="mp-detail-side__header">
        <button className="mp-detail-side__back" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          목록으로
        </button>
      </div>

      {/* 이미지 */}
      {r.images && r.images.length > 0 ? (
        <div className="mp-detail-side__imgs">
          {r.images.slice(0, 3).map((img, i) => (
            <img key={i} src={img.imgUrl} alt={`${r.name} ${i+1}`} />
          ))}
        </div>
      ) : (
        <div className="mp-detail-side__no-img">🍽️</div>
      )}

      {/* 기본 정보 */}
      <div className="mp-detail-side__body">
        <div className="mp-detail-side__name">{r.name}</div>
        <div className="mp-detail-side__cat">{r.category}</div>

        <div className="mp-detail-side__stars">
          <Stars size={14} />
          <span className="mp-detail-side__rating">4.5</span>
        </div>

        <div className="mp-detail-side__divider" />

        <div className="mp-detail-side__info">
          <div className="mp-detail-side__info-row">
            <span className="mp-detail-side__icon">📍</span>
            <span>{r.address}</span>
          </div>
          {r.avgPrice > 0 && (
            <div className="mp-detail-side__info-row">
              <span className="mp-detail-side__icon">💰</span>
              <span>평균 {r.avgPrice?.toLocaleString()}원</span>
              {r.minPrice && r.maxPrice && (
                <span className="mp-detail-side__price-range">
                  ({r.minPrice?.toLocaleString()}~{r.maxPrice?.toLocaleString()}원)
                </span>
              )}
            </div>
          )}
        </div>

        {/* 메뉴 */}
        {r.menus && r.menus.length > 0 && (
          <div className="mp-detail-side__section">
            <div className="mp-detail-side__section-title">메뉴</div>
            <div className="mp-detail-side__menu-list">
              {r.menus.filter(m => m.menuId).map(m => (
                <div key={m.menuId} className="mp-detail-side__menu-row">
                  <span className="mp-detail-side__menu-name">
                    {m.isRepresentative && (
                      <span className="mp-detail-side__rep">대표</span>
                    )}
                    {m.pname || (m as any).pName}
                  </span>
                  <span className="mp-detail-side__menu-price">
                    {m.price?.toLocaleString()}원
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 태그 */}
        {r.tags && r.tags.length > 0 && (
          <div className="mp-detail-side__section">
            <div className="mp-detail-side__section-title">태그</div>
            <div className="mp-detail-side__tags">
              {r.tags.map((t, i) => (
                <span key={i} className="mp-detail-side__tag">
                  {t.customTag || `#${t.customTag}`}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 길찾기 버튼 */}
        <button
          className="mp-detail-side__nav-btn"
          onClick={() => window.open(navUrl, '_blank')}
        >
          <svg width="13" height="17" viewBox="0 0 44 56" fill="none">
            <path d="M22 2C11.5 2 3 10.5 3 21c0 14 19 33 19 33S41 35 41 21C41 10.5 32.5 2 22 2z" fill="white"/>
          </svg>
          네이버 지도로 길찾기 ↗
        </button>
      </div>
    </div>
  )
}

// ─── MapPage ─────────────────────────────────────────────────
export default function MapPage() {
  const [restaurants, setRestaurants]   = useState<Restaurant[]>([])
  const [detail, setDetail]             = useState<Restaurant | null>(null)  // 상세 (API 조회)
  const [selectedId, setSelectedId]     = useState<number | null>(null)
  const [category, setCategory]         = useState('ALL')
  const [search, setSearch]             = useState('')
  const [loading, setLoading]           = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)
  const [listOpen, setListOpen]         = useState(false)  // 모바일

  // ─── 목록 조회 ───────────────────────────────────────────
  useEffect(() => {
    setLoading(true)
    setDetail(null)
    setSelectedId(null)
    restaurantApi.getList(category, search)
      .then(res => {
        // Spring Page 응답: { content: [...] }
        const data = res.data
        const list = Array.isArray(data) ? data : (data as any).content ?? []
        setRestaurants(list)
      })
      .catch(err => console.error('목록 조회 실패:', err))
      .finally(() => setLoading(false))
  }, [category])

  // ─── 검색 (엔터/버튼) ────────────────────────────────────
  const handleSearch = useCallback(() => {
    setLoading(true)
    setDetail(null)
    setSelectedId(null)
    restaurantApi.getList('ALL', search)
      .then(res => {
        const data = res.data
        const list = Array.isArray(data) ? data : (data as any).content ?? []
        setRestaurants(list)
      })
      .catch(err => console.error('검색 실패:', err))
      .finally(() => setLoading(false))
  }, [search])

  // ─── 마커 / 카드 클릭 → 상세 조회 ───────────────────────
  const handleSelect = useCallback((r: Restaurant) => {
    // 같은 식당 클릭 시 닫기
    if (selectedId === r.restId) {
      setSelectedId(null)
      setDetail(null)
      return
    }
    setSelectedId(r.restId)
    setDetail(null)
    setDetailLoading(true)
    setListOpen(false)

    // 상세 API 호출 (메뉴, 이미지, 태그 포함)
    restaurantApi.getDetail(r.restId)
      .then(res => setDetail(res.data))
      .catch(() => {
        // 상세 조회 실패 시 목록 데이터로 대체
        setDetail(r)
      })
      .finally(() => setDetailLoading(false))
  }, [selectedId])

  const handleBack = useCallback(() => {
    setDetail(null)
    setSelectedId(null)
  }, [])

  // 필터된 목록 (검색어 기준 클라이언트 필터)
  const filtered = restaurants.filter(r =>
    !search ||
    r.name?.includes(search) ||
    r.address?.includes(search)
  )

  // ─── 사이드바 내용 결정 ──────────────────────────────────
  // 상세가 열려있으면 DetailPanel, 아니면 목록
  const showDetail = !!(detail || detailLoading) && selectedId !== null

  return (
    <div className="mp-root">
      {/* ── 검색 + 카테고리 탭 ── */}
      <div className="mp-topbar">
        <div className="mp-search-row">
          <div className="mp-search-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              className="mp-search-input"
              placeholder="식당 이름, 주소 검색"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
            {search && (
              <button className="mp-search-clear" onClick={() => { setSearch(''); handleSearch() }}>✕</button>
            )}
          </div>
          <button className="mp-search-btn" onClick={handleSearch}>검색</button>
          <div className="mp-count-badge">{filtered.length}개</div>
        </div>
        <div className="mp-cat-tabs">
          {CAT_TABS.map(tab => (
            <button
              key={tab.value}
              className={`mp-cat-tab ${category === tab.value ? 'on' : ''}`}
              onClick={() => setCategory(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── 본문 ── */}
      <div className="mp-body">

        {/* 왼쪽 사이드바 */}
        <aside className={`mp-list-panel ${listOpen ? 'open' : ''}`}>
          <div className="mp-list-handle" onClick={() => setListOpen(v => !v)} />

          {/* 상세 패널 (마커/카드 클릭 시) */}
          {showDetail ? (
            detailLoading ? (
              <div className="mp-loading" style={{ paddingTop: 60 }}>
                <div className="mp-loading-spinner" />
                <span>식당 정보 불러오는 중...</span>
              </div>
            ) : detail ? (
              <DetailPanel r={detail} onBack={handleBack} />
            ) : null
          ) : (
            /* 목록 */
            <>
              <div className="mp-list-head">
                <span className="mp-list-title">주변 맛집</span>
                <span className="mp-list-cnt">{filtered.length}개</span>
              </div>
              <div className="mp-list">
                {loading && (
                  <div className="mp-loading">
                    <div className="mp-loading-spinner" />
                    <span>맛집 불러오는 중...</span>
                  </div>
                )}
                {!loading && filtered.length === 0 && (
                  <div className="mp-empty">검색 결과가 없어요 😅</div>
                )}
                {!loading && filtered.map(r => (
                  <RestaurantCard
                    key={r.restId}
                    r={r}
                    active={selectedId === r.restId}
                    onClick={() => handleSelect(r)}
                  />
                ))}
              </div>
            </>
          )}
        </aside>

        {/* 지도 */}
        <main className="mp-map">
          <NaverMap
            restaurants={filtered}
            selectedId={selectedId}
            onMarkerClick={handleSelect}
          />

          {/* 내 위치 버튼 */}
          <div className="mp-map-controls">
            <button
              className="mp-map-btn"
              title="내 위치"
              onClick={() => {
                navigator.geolocation?.getCurrentPosition(pos => {
                  const naver = (window as any).naver
                  const map = (window as any).__eatpickMap
                  if (naver?.maps && map) {
                    map.panTo(new naver.maps.LatLng(pos.coords.latitude, pos.coords.longitude))
                  }
                })
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v4M12 19v4M1 12h4M19 12h4"/>
              </svg>
            </button>
          </div>

          {/* 모바일 목록 토글 */}
          <button className="mp-mobile-toggle" onClick={() => setListOpen(v => !v)}>
            {listOpen
              ? '지도 보기 🗺'
              : showDetail
                ? `${detail?.name ?? '상세정보'} 보기`
                : `목록 보기 (${filtered.length})`
            }
          </button>
        </main>
      </div>
    </div>
  )
}
