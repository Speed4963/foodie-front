// ============================================================
// src/pages/MapPage.tsx
// 마커 클릭 → 사이드바 상세정보 (네이버 지도 스타일)
// 백엔드: GET /api/restaurants, GET /api/restaurants/{id}
// ============================================================
import { useState, useEffect, useRef, useCallback } from 'react'
import axios from 'axios'
import type { Restaurant } from '../types/restaurant'
import '../assets/css/MapPage.css'

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

type UserLocation = {
  lat: number
  lng: number
}

function normalizeRestaurantCoords(r: Pick<Restaurant, 'lat' | 'lng'>): UserLocation | null {
  const lat = Number(r.lat)
  const lng = Number(r.lng)
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null

  if (lat >= 33 && lat <= 39 && lng >= 124 && lng <= 132) {
    return { lat, lng }
  }

  // 백엔드에서 lng/lat 순서로 내려온 경우 보정
  if (lng >= 33 && lng <= 39 && lat >= 124 && lat <= 132) {
    return { lat: lng, lng: lat }
  }

  return null
}

function getDistanceKm(from: UserLocation | null, to: Pick<Restaurant, 'lat' | 'lng'>) {
  const target = normalizeRestaurantCoords(to)
  if (!from || !target) return null
  const rad = (value: number) => value * Math.PI / 180
  const earthKm = 6371
  const dLat = rad(target.lat - from.lat)
  const dLng = rad(target.lng - from.lng)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(from.lat)) * Math.cos(rad(target.lat)) *
    Math.sin(dLng / 2) ** 2

  return earthKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function formatDistance(km: number | null) {
  if (km === null) return null
  if (km < 1) return `${Math.round(km * 1000)}m`
  return `${km.toFixed(km < 10 ? 1 : 0)}km`
}

function buildNaverDirectionUrl(r: Restaurant, userLocation: UserLocation | null) {
  const target = normalizeRestaurantCoords(r)
  const destination = target
    ? `${target.lng},${target.lat},${r.name}`
    : `${r.address || r.name},${r.name}`
  const origin = userLocation
    ? `${userLocation.lng},${userLocation.lat},내 위치`
    : '-'

  return `https://map.naver.com/p/directions/${encodeURIComponent(origin)}/${encodeURIComponent(destination)}/-/walk`
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
function escapeMarkerText(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function makeMarkerHtml(name: string, active: boolean) {
  const safeName = escapeMarkerText(name)
  return `
    <div class="mp-restaurant-marker ${active ? 'is-active' : ''}">
      <span class="mp-restaurant-marker__pin"></span>
      <span class="mp-restaurant-marker__label">${safeName}</span>
    </div>`
}

// ─── 네이버 지도 ─────────────────────────────────────────────
interface NaverMapProps {
  restaurants: Restaurant[]
  selectedId: number | null
  userLocation: UserLocation | null
  onMarkerClick: (r: Restaurant) => void
}

function NaverMap({ restaurants, selectedId, userLocation, onMarkerClick }: NaverMapProps) {
  const containerRef   = useRef<HTMLDivElement>(null)
  const mapRef         = useRef<any>(null)
  const markersRef     = useRef<Record<number, any>>({})
  const userMarkerRef  = useRef<any>(null)
  const infoWindowRef  = useRef<any>(null)
  const readyRef       = useRef(false)
  const [mapReady, setMapReady] = useState(false)
  const [geocodedCoords, setGeocodedCoords] = useState<Record<number, UserLocation>>({})

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
          center: new naver.maps.LatLng(userLocation?.lat ?? 37.5560, userLocation?.lng ?? 126.9720),
          zoom: 13,
          mapTypeControl: false,
          scaleControl: true,
        })
        setMapReady(true)
      } else if (count > 60) clearInterval(t)
    }, 100)
    return () => clearInterval(t)
  }, [userLocation])

  // 내 위치 마커 및 첫 화면 위치 이동
  useEffect(() => {
    const naver = (window as any).naver
    if (!mapReady || !naver?.maps || !mapRef.current || !userLocation) return

    const position = new naver.maps.LatLng(userLocation.lat, userLocation.lng)
    if (!userMarkerRef.current) {
      userMarkerRef.current = new naver.maps.Marker({
        position,
        map: mapRef.current,
        icon: {
          content: `
            <div class="mp-user-marker">
              <span class="mp-user-marker__pulse"></span>
              <span class="mp-user-marker__dot"></span>
            </div>
          `,
          anchor: new naver.maps.Point(18, 18),
        },
        zIndex: 300,
      })
    } else {
      userMarkerRef.current.setPosition(position)
    }
    mapRef.current.panTo(position, { duration: 300 })
  }, [mapReady, userLocation])

  // lat/lng가 없는 식당은 주소를 좌표로 변환해서 지도 표시에 사용
  useEffect(() => {
    const naver = (window as any).naver
    if (!mapReady || !naver?.maps?.Service?.geocode) return

    restaurants.forEach(r => {
      if (normalizeRestaurantCoords(r) || geocodedCoords[r.restId] || !r.address) return

      naver.maps.Service.geocode({ query: r.address }, (status: any, response: any) => {
        if (status !== naver.maps.Service.Status.OK) return

        const first = response?.v2?.addresses?.[0]
        const lng = Number(first?.x)
        const lat = Number(first?.y)
        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return

        setGeocodedCoords(prev => ({
          ...prev,
          [r.restId]: { lat, lng },
        }))
      })
    })
  }, [mapReady, restaurants, geocodedCoords])

  // 마커 갱신 (restaurants 변경 시)
  useEffect(() => {
    const naver = (window as any).naver
    if (!mapReady || !naver?.maps || !mapRef.current) return

    // 기존 마커 제거
    Object.values(markersRef.current).forEach((m: any) => m.marker.setMap(null))
    markersRef.current = {}

    const coordCounts: Record<string, number> = {}
    restaurants.forEach(r => {
      const position = normalizeRestaurantCoords(r) ?? geocodedCoords[r.restId]
      if (!position) return

      const coordKey = `${position.lat.toFixed(6)},${position.lng.toFixed(6)}`
      const overlapIndex = coordCounts[coordKey] ?? 0
      coordCounts[coordKey] = overlapIndex + 1
      const offset = overlapIndex * 0.00006
      const isActive = r.restId === selectedId
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(position.lat + offset, position.lng + offset),
        map: mapRef.current,
        icon: {
          content: makeMarkerHtml(r.name, isActive),
          anchor: new naver.maps.Point(18, 44),
        },
        zIndex: isActive ? 200 : 100,
      })

      naver.maps.Event.addListener(marker, 'click', () => {
        onMarkerClick(r)
      })

      markersRef.current[r.restId] = { marker }
    })
  }, [mapReady, restaurants, selectedId, onMarkerClick, geocodedCoords])

  // 선택 마커 강조 업데이트
  useEffect(() => {
    const naver = (window as any).naver
    if (!mapReady || !naver?.maps || !mapRef.current) return

    const coordCounts: Record<string, number> = {}
    restaurants.forEach(r => {
      const m = markersRef.current[r.restId]
      if (!m) return
      const position = normalizeRestaurantCoords(r) ?? geocodedCoords[r.restId]
      if (!position) return
      const coordKey = `${position.lat.toFixed(6)},${position.lng.toFixed(6)}`
      const overlapIndex = coordCounts[coordKey] ?? 0
      coordCounts[coordKey] = overlapIndex + 1
      const offset = overlapIndex * 0.00006
      const isActive = r.restId === selectedId
      m.marker.setPosition(new naver.maps.LatLng(position.lat + offset, position.lng + offset))
      m.marker.setIcon({
        content: makeMarkerHtml(r.name, isActive),
        anchor: new naver.maps.Point(18, 44),
      })
      m.marker.setZIndex(isActive ? 200 : 100)
    })

    // 선택 식당으로 지도 이동
    if (selectedId) {
      const r = restaurants.find(x => x.restId === selectedId)
      if (r && mapRef.current) {
        const position = normalizeRestaurantCoords(r) ?? geocodedCoords[r.restId]
        if (!position) return
        if (infoWindowRef.current) { infoWindowRef.current.close(); infoWindowRef.current = null }
        mapRef.current.panTo(new naver.maps.LatLng(position.lat, position.lng), { duration: 300 })
      }
    }
  }, [mapReady, selectedId, restaurants, geocodedCoords])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}

// ─── 식당 목록 카드 ──────────────────────────────────────────
function RestaurantCard({ r, active, distance, onClick }: {
  r: Restaurant; active: boolean; distance: string | null; onClick: () => void
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
        <div className="mp-card__meta">
          <span className="mp-card__cat">{r.category}</span>
          {distance && <span className="mp-card__distance">{distance}</span>}
        </div>
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
function DetailPanel({ r, userLocation, onBack }: { r: Restaurant; userLocation: UserLocation | null; onBack: () => void }) {
  const navUrl = buildNaverDirectionUrl(r, userLocation)
  const distance = formatDistance(getDistanceKm(userLocation, r))

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
        {distance && <div className="mp-detail-side__distance">내 위치에서 약 {distance}</div>}

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
          {userLocation ? '내 위치에서 길찾기 ↗' : '네이버 지도로 길찾기 ↗'}
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
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationStatus('error')
      return
    }

    setLocationStatus('loading')
    navigator.geolocation.getCurrentPosition(
      pos => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
        setLocationStatus('success')
      },
      err => {
        console.warn('위치 조회 실패:', err)
        setLocationStatus('error')
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    )
  }, [])

  // 첫 진입 시 GPS 권한을 요청해 내 위치를 지도 첫 화면에 표시
  useEffect(() => {
    requestLocation()
  }, [requestLocation])

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
              <DetailPanel r={detail} userLocation={userLocation} onBack={handleBack} />
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
                    distance={formatDistance(getDistanceKm(userLocation, r))}
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
            userLocation={userLocation}
            onMarkerClick={handleSelect}
          />

          <div className={`mp-location-status mp-location-status--${locationStatus}`}>
            <span className="mp-location-status__dot" />
            {locationStatus === 'loading' && '내 위치 찾는 중'}
            {locationStatus === 'success' && '내 위치 기준으로 표시 중'}
            {locationStatus === 'error' && '위치 권한을 허용하면 길찾기가 정확해져요'}
            {locationStatus === 'idle' && '내 위치를 사용할 수 있어요'}
          </div>

          {/* 내 위치 버튼 */}
          <div className="mp-map-controls">
            <button
              className="mp-map-btn"
              title="내 위치"
              onClick={requestLocation}
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
