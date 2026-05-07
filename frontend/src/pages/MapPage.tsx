// ============================================================
// src/pages/MapPage.tsx — 지도 + 리스트 + 실시간 리뷰 (3패널)
// 네이버 지도 SDK 연동 버전
// ============================================================
import React, { useState, useEffect, useRef, useCallback } from 'react'

// ─── Types ───────────────────────────────────────────────────
interface Restaurant {
  id: number; name: string; category: string; address: string
  phone: string; ratingAvg: number; location: { lat: number; lng: number }
  distance?: string; tag?: string; tagColor?: string
}
interface Review {
  id: number; userId: number; placeId: number; stars: number
  text: string; time: string; tag?: string
}

// ─── Mock Data ───────────────────────────────────────────────
const RESTAURANTS: Restaurant[] = [
  { id:1, name:'을지로 골뱅이',   category:'안주·포차',   address:'을지로3가 을지로 152',     phone:'02-2264-0123', ratingAvg:4.8, location:{lat:37.5665,lng:126.9920}, distance:'350m',  tag:'인기',   tagColor:'#E53E3E' },
  { id:2, name:'광장시장 빈대떡', category:'전통·분식',   address:'종로구 창경궁로 88',        phone:'02-2267-0621', ratingAvg:4.6, location:{lat:37.5699,lng:126.9994}, distance:'720m',  tag:'맛집',   tagColor:'#D69E2E' },
  { id:3, name:'해방촌 이탈리안', category:'양식·파스타', address:'용산구 신흥로 83',           phone:'02-790-4231',  ratingAvg:4.5, location:{lat:37.5468,lng:126.9890}, distance:'1.2km', tag:'신규',   tagColor:'#2F855A' },
  { id:4, name:'마포 돼지갈비',   category:'고기·구이',   address:'마포구 마포대로 155',        phone:'02-714-8877',  ratingAvg:4.7, location:{lat:37.5500,lng:126.9500}, distance:'2.1km', tag:'인기',   tagColor:'#E53E3E' },
  { id:5, name:'연남동 브런치',   category:'카페·브런치', address:'마포구 연남로 3',             phone:'02-334-2200',  ratingAvg:4.4, location:{lat:37.5598,lng:126.9220}, distance:'3.0km', tag:'힙',     tagColor:'#6B46C1' },
  { id:6, name:'용산 순대국밥',   category:'국밥·탕',     address:'용산구 한강대로 23',          phone:'02-792-0001',  ratingAvg:4.9, location:{lat:37.5326,lng:126.9644}, distance:'1.8km', tag:'찐맛집', tagColor:'#C05621' },
]

const SEED_REVIEWS: Review[] = [
  { id:1, userId:0, placeId:1, stars:5, text:'골뱅이무침이 진짜 예술이에요 🔥 소주 한잔이랑 최고', time:'방금',    tag:'인기'   },
  { id:2, userId:1, placeId:6, stars:5, text:'순대국밥 국물이 깊고 진해요. 해장에 최고!',           time:'1분 전',  tag:'찐맛집' },
  { id:3, userId:2, placeId:2, stars:4, text:'빈대떡 바삭바삭 ㅠㅠ 막걸리랑 조합 완벽',            time:'3분 전',  tag:'맛집'   },
  { id:4, userId:3, placeId:4, stars:5, text:'돼지갈비 양도 많고 맛도 대박 👍👍',                   time:'5분 전',  tag:'인기'   },
  { id:5, userId:4, placeId:3, stars:4, text:'분위기 너무 예쁘고 파스타 맛있어요 데이트 추천!',     time:'8분 전',  tag:'신규'   },
  { id:6, userId:5, placeId:5, stars:4, text:'연남동 감성 뿜뿜 🥐 브런치 메뉴 다양해요',            time:'12분 전', tag:'힙'     },
]

const FAKE_REVIEWS = [
  { text:'진짜 맛있어요 ㅠㅠ 또 올 것 같아요',  stars:5, tag:'인기'   },
  { text:'웨이팅 있지만 기다릴 만해요!',          stars:4, tag:'맛집'   },
  { text:'양이 너무 많아서 배터짐 😆',            stars:5, tag:'찐맛집' },
  { text:'가성비 최고예요 강추합니다',            stars:5, tag:'인기'   },
  { text:'친절하고 깔끔해요 자주 올게요',         stars:4, tag:'힙'     },
  { text:'국물이 시원하고 진해서 좋아요',         stars:5, tag:'찐맛집' },
]

const USERS   = ['김민준','이서연','박지호','최유진','정다은','강민서','윤하늘','송지우','임채원','한소희']
const AVATARS = ['#E53E3E','#D69E2E','#2F855A','#6B46C1','#C05621','#185FA5','#C53030','#276749']
const CATS    = ['전체','고기·구이','국밥·탕','안주·포차','전통·분식','양식·파스타','카페·브런치']
const TAG_COLORS: Record<string,string> = { '인기':'#E53E3E','찐맛집':'#C05621','맛집':'#D69E2E','신규':'#2F855A','힙':'#6B46C1' }

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

// ─── Naver Map ───────────────────────────────────────────────
const NaverMap: React.FC<{
  restaurants: Restaurant[]
  selected: Restaurant | null
  onSelect: (r: Restaurant) => void
}> = ({ restaurants, selected, onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef       = useRef<any>(null)
  const markersRef   = useRef<Record<number, any>>({})

  // 지도 초기화
  useEffect(() => {
    const naver = (window as any).naver
    if (!naver?.maps || !containerRef.current) return

    mapRef.current = new naver.maps.Map(containerRef.current, {
      center: new naver.maps.LatLng(37.5560, 126.9720),
      zoom: 13,
    })

    restaurants.forEach(r => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(r.location.lat, r.location.lng),
        map: mapRef.current,
        title: r.name,
      })

      const infoWindow = new naver.maps.InfoWindow({
        content: `
          <div style="padding:10px 14px;min-width:150px;font-family:'Noto Sans KR',sans-serif">
            <div style="font-weight:700;font-size:13px;margin-bottom:3px;color:#0D0D0D">${r.name}</div>
            <div style="font-size:11px;color:#6B6560;margin-bottom:4px">${r.category}</div>
            <div style="font-size:11px;color:#F59E0B">${'★'.repeat(Math.round(r.ratingAvg))}<span style="color:#999;margin-left:3px">${r.ratingAvg.toFixed(1)}</span></div>
          </div>
        `,
        borderWidth: 0,
        borderRadius: '8px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
      })

      naver.maps.Event.addListener(marker, 'click', () => {
        // 기존 열린 인포윈도우 닫기
        Object.values(markersRef.current).forEach((m: any) => {
          if (m._infoWindow?.getMap()) m._infoWindow.close()
        })
        infoWindow.open(mapRef.current, marker)
        onSelect(r)
      })

      marker._infoWindow = infoWindow
      markersRef.current[r.id] = marker
    })
  }, [])

useEffect(() => {
  // SDK 로드 대기 (최대 3초)
  const tryInit = (retry = 0) => {
    const naver = (window as any).naver
    if (naver?.maps && containerRef.current) {
      mapRef.current = new naver.maps.Map(containerRef.current, {
        center: new naver.maps.LatLng(37.5560, 126.9720),
        zoom: 13,
      })
      // 마커 등록 코드...
      restaurants.forEach(r => {
        const marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(r.location.lat, r.location.lng),
          map: mapRef.current,
          title: r.name,
        })
        naver.maps.Event.addListener(marker, 'click', () => onSelect(r))
        markersRef.current[r.id] = marker
      })
    } else if (retry < 30) {
      // 100ms마다 재시도
      setTimeout(() => tryInit(retry + 1), 100)
    }
  }
  tryInit()
}, [])

  // 선택된 식당으로 지도 이동
  // useEffect(() => {
  //   const naver = (window as any).naver
  //   if (!naver?.maps || !mapRef.current || !selected) return
  //   const pos = new naver.maps.LatLng(selected.location.lat, selected.location.lng)
  //   mapRef.current.panTo(pos)
  //   mapRef.current.setZoom(16, true)
  // }, [selected])

  const hasSDK = !!(window as any).naver?.maps

  return (
    <div className="map-wrapper">
      <div
        ref={containerRef}
        className="naver-map-container"
        style={{ display: hasSDK ? 'block' : 'none' }}
      />
      {!hasSDK && (
        <div className="map-fallback">
          <div className="map-pin-bounce">
            <svg width="40" height="52" viewBox="0 0 44 56" fill="none">
              <ellipse cx="22" cy="53" rx="7" ry="2.5" fill="#ccc" opacity="0.4"/>
              <path d="M22 2C11.5 2 3 10.5 3 21c0 14 19 33 19 33S41 35 41 21C41 10.5 32.5 2 22 2z" fill="#E8272A" stroke="#B01E20" strokeWidth="1.5"/>
              <circle cx="22" cy="21" r="7" fill="white" opacity="0.9"/>
            </svg>
          </div>
          {selected
            ? <div className="map-info">
                <p className="map-info__name">{selected.name}</p>
                <p className="map-info__addr">{selected.address}</p>
              </div>
            : <p className="map-hint">식당을 선택하면 위치가 표시돼요</p>
          }
          <span className="map-sdk-badge">index.html에 네이버 API 키를 넣어주세요</span>
        </div>
      )}
    </div>
  )
}

// ─── Review Chat ─────────────────────────────────────────────
type ChatFilter = '전체' | '인기' | '신규' | '나'
let reviewId = SEED_REVIEWS.length + 1

const ReviewChat: React.FC<{
  reviews: Review[]
  selectedId: number | null
  onSend: (text: string) => void
}> = ({ reviews, selectedId, onSend }) => {
  const [filter, setFilter] = useState<ChatFilter>('전체')
  const [input, setInput]   = useState('')
  const feedRef             = useRef<HTMLDivElement>(null)

  const filtered = reviews.filter(rv => {
    if (filter === '인기') return ['인기','찐맛집','맛집'].includes(rv.tag ?? '')
    if (filter === '신규') return ['신규','힙'].includes(rv.tag ?? '')
    if (filter === '나')   return rv.placeId === selectedId
    return true
  })

  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight
  }, [filtered.length])

  const handleSend = () => {
    if (!input.trim()) return
    onSend(input.trim()); setInput('')
  }

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <div className="chat-title">실시간 리뷰 <span className="live-badge">LIVE</span></div>
        <div className="chat-sub">방금 올라온 생생한 후기</div>
      </div>
      <div className="chat-filter-bar">
        {(['전체','인기','신규','나'] as ChatFilter[]).map(f => (
          <button key={f} className={`cf-chip ${filter===f?'on':''}`} onClick={() => setFilter(f)}>
            {f === '나' ? '선택 식당' : f === '인기' ? '인기 맛집' : f}
          </button>
        ))}
      </div>
      <div className="chat-feed" ref={feedRef}>
        {filtered.length === 0 && <p className="chat-empty">아직 리뷰가 없어요 😅</p>}
        {filtered.map(rv => {
          const place = RESTAURANTS.find(r => r.id === rv.placeId)
          const name  = USERS[rv.userId % USERS.length]
          const bg    = AVATARS[rv.userId % AVATARS.length]
          return (
            <div key={rv.id} className={`review-card ${selectedId && rv.placeId === selectedId ? 'highlight' : ''}`}>
              <div className="rv-top">
                <div className="rv-user">
                  <div className="rv-avatar" style={{ background: bg }}>{name[0]}</div>
                  <span className="rv-name">{name}</span>
                  {rv.tag && <span className="rv-tag" style={{ background: TAG_COLORS[rv.tag] ?? '#888' }}>{rv.tag}</span>}
                </div>
                <span className="rv-time">{rv.time}</span>
              </div>
              <div className="rv-place">{place?.name} · {'★'.repeat(rv.stars)}</div>
              <div className="rv-text">{rv.text}</div>
            </div>
          )
        })}
      </div>
      <div className="chat-input-row">
        <input
          className="chat-input"
          placeholder="리뷰를 남겨보세요..."
          value={input}
          maxLength={60}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button className="send-btn" onClick={handleSend}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

// ─── MapPage ─────────────────────────────────────────────────
export default function MapPage() {
  const [selected, setSelected] = useState<Restaurant | null>(null)
  const [category, setCategory] = useState('전체')
  const [search, setSearch]     = useState('')
  const [reviews, setReviews]   = useState<Review[]>(SEED_REVIEWS)
  const [listOpen, setListOpen] = useState(false) // 모바일 바텀시트

  const filtered = RESTAURANTS.filter(r =>
    (category === '전체' || r.category === category) &&
    (r.name.includes(search) || r.address.includes(search))
  )

  const handleSelect = useCallback((r: Restaurant) => {
    setSelected(prev => prev?.id === r.id ? null : r)
    setListOpen(false)
  }, [])

  const handleSend = useCallback((text: string) => {
    const target = selected ?? RESTAURANTS[Math.floor(Math.random() * RESTAURANTS.length)]
    setReviews(prev => [{
      id: reviewId++,
      userId: Math.floor(Math.random() * USERS.length),
      placeId: target.id, stars: 5, text, time: '방금', tag: target.tag ?? '',
    }, ...prev])
  }, [selected])

  // 5초마다 가짜 리뷰
  useEffect(() => {
    const t = setInterval(() => {
      const fake  = FAKE_REVIEWS[Math.floor(Math.random() * FAKE_REVIEWS.length)]
      const place = RESTAURANTS[Math.floor(Math.random() * RESTAURANTS.length)]
      setReviews(prev => prev.length >= 40 ? prev : [{
        id: reviewId++,
        userId: Math.floor(Math.random() * USERS.length),
        placeId: place.id, stars: fake.stars, text: fake.text, time: '방금', tag: fake.tag,
      }, ...prev])
    }, 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="map-page">
      {/* 검색 + 카테고리 */}
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
            <button key={cat} className={`cat-chip ${category===cat?'on':''}`} onClick={() => setCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3패널 바디 */}
      <div className="map-body">
        {/* Left: 식당 리스트 */}
        <aside className={`list-panel ${listOpen ? 'open' : ''}`} onClick={e => {
          // 모바일 바텀시트 핸들 클릭
          if ((e.target as HTMLElement).classList.contains('list-panel')) setListOpen(v => !v)
        }}>
          <p className="list-meta">{filtered.length}개 발견됨</p>
          <div className="list">
            {filtered.length === 0 && <div className="empty">검색 결과가 없어요 😅</div>}
            {filtered.map(r => (
              <div
                key={r.id}
                className={`card ${selected?.id===r.id?'card--active':''}`}
                onClick={() => handleSelect(r)}
              >
                <div className="card__top">
                  <div className="card__title-row">
                    <span className="card__name">{r.name}</span>
                    {r.tag && <span className="card__tag" style={{ background: r.tagColor }}>{r.tag}</span>}
                  </div>
                  <span className="card__dist">{r.distance}</span>
                </div>
                <div className="card__cat">{r.category} · {r.address.slice(0,11)}…</div>
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

        {/* Center: 네이버 지도 */}
        <main className="map-panel">
          <NaverMap restaurants={filtered} selected={selected} onSelect={handleSelect} />
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
          {/* 모바일 리스트 토글 버튼 */}
          <button
            className="mobile-list-toggle"
            onClick={() => setListOpen(v => !v)}
          >
            {listOpen ? '지도 보기 🗺' : `목록 보기 (${filtered.length})`}
          </button>
        </main>

        {/* Right: 실시간 리뷰 */}
        <ReviewChat reviews={reviews} selectedId={selected?.id ?? null} onSend={handleSend} />
      </div>
    </div>
  )
}
